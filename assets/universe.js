/* Night-sky layer: particle field in the hero, scroll reveals, header state,
   and the light beams that wire nodes into a core. No dependencies.
   Everything here is decoration: content is complete without it, and it
   stands down under prefers-reduced-motion, off-screen and on hidden tabs. */
(() => {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const SVG = "http://www.w3.org/2000/svg";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Reveal on scroll */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduced.matches) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add("in-view"));

  /* Header gains a glass background once the page scrolls */
  const header = $(".site-header");
  const onScroll = () =>
    header.classList.toggle("is-scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hero titles: cross-fade one at a time; under reduced motion CSS shows all */
  const rotator = $("[data-rotator]");
  if (rotator && !reduced.matches) {
    const titles = [...rotator.children];
    let current = 0;
    setInterval(() => {
      if (document.hidden) return;
      titles[current].classList.remove("is-active");
      current = (current + 1) % titles.length;
      titles[current].classList.add("is-active");
    }, 3200);
  }

  /* Particle universe: a slowly turning cloud of points with mouse parallax */
  const canvas = $(".universe");
  const hero = $(".hero");
  const ctx = canvas?.getContext?.("2d");
  if (ctx) {
    const small = matchMedia("(max-width: 760px)").matches;
    const COUNT = small ? 700 : 1600;
    const points = new Float32Array(COUNT * 4);
    for (let i = 0; i < COUNT; i++) {
      points[i * 4] = (Math.random() - 0.5) * 15;
      points[i * 4 + 1] = (Math.random() - 0.5) * 15;
      points[i * 4 + 2] = (Math.random() - 0.5) * 15;
      points[i * 4 + 3] = Math.random();
    }
    let width = 0,
      height = 0,
      dpr = 1,
      focal = 1,
      running = false,
      visible = true,
      frame = 0,
      start = performance.now(),
      rotX = 0,
      rotY = 0,
      mouseX = 0,
      mouseY = 0;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      focal = height / 2 / Math.tan((75 / 2) * (Math.PI / 180));
      if (!running) draw(performance.now());
    };

    const draw = (now) => {
      const t = (now - start) / 1000;
      rotY += (t * 0.05 + mouseX * 0.0006 - rotY) * 0.05;
      rotX += (mouseY * 0.0004 - rotX) * 0.05;
      const sy = Math.sin(rotY),
        cy = Math.cos(rotY),
        sx = Math.sin(rotX),
        cx = Math.cos(rotX),
        bob = Math.sin(t * 0.5) * 0.1,
        halfW = width / 2,
        halfH = height / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < COUNT; i++) {
        const o = i * 4;
        const x0 = points[o],
          y0 = points[o + 1] + bob,
          z0 = points[o + 2];
        const x1 = x0 * cy + z0 * sy;
        const z1 = -x0 * sy + z0 * cy;
        const y2 = y0 * cx - z1 * sx;
        const z2 = y0 * sx + z1 * cx;
        const depth = 3 - z2;
        if (depth < 0.15) continue;
        const scale = focal / depth;
        const px = halfW + x1 * scale;
        const py = halfH - y2 * scale;
        if (px < -4 || px > width + 4 || py < -4 || py > height + 4) continue;
        const size = Math.max(0.6, 0.03 * scale * (0.55 + points[o + 3] * 0.45));
        const alpha = Math.min(0.85, 0.25 + 1.6 / depth) * (0.5 + points[o + 3] * 0.5);
        ctx.fillStyle =
          points[o + 3] > 0.93
            ? `rgba(66, 220, 180, ${alpha})`
            : `rgba(99, 102, 241, ${alpha})`;
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduced.matches || document.hidden || !visible) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType !== "mouse") return;
        mouseX = event.clientX - innerWidth / 2;
        mouseY = event.clientY - innerHeight / 2;
      },
      { passive: true },
    );
    new ResizeObserver(resize).observe(hero);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? play() : pause();
    }).observe(hero);
    document.addEventListener("visibilitychange", () =>
      document.hidden ? pause() : play(),
    );
    reduced.addEventListener("change", () => {
      if (reduced.matches) {
        pause();
        draw(performance.now());
      } else play();
    });
    resize();
    requestAnimationFrame(() => canvas.classList.add("is-ready"));
    play();
  }

  /* Beams: soft base line plus a travelling pulse, computed from real boxes */
  let filterId = 0;
  const beam = (svg, d, color, dashed, duration, delay, pulseColor = "#eef0ff") => {
    let filter = svg.querySelector("filter");
    if (!filter) {
      const defs = document.createElementNS(SVG, "defs");
      defs.innerHTML = `<filter id="beam-blur-${filterId++}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5"/></filter>`;
      svg.appendChild(defs);
      filter = defs.firstChild;
    }
    const glow = document.createElementNS(SVG, "path");
    glow.setAttribute("d", d);
    glow.setAttribute("class", `beam-glow${dashed ? " dashed" : ""}`);
    glow.setAttribute("stroke", color);
    glow.setAttribute("filter", `url(#${filter.id})`);
    const base = document.createElementNS(SVG, "path");
    base.setAttribute("d", d);
    base.setAttribute("class", `beam-base${dashed ? " dashed" : ""}`);
    base.setAttribute("stroke", color);
    const pulse = document.createElementNS(SVG, "path");
    pulse.setAttribute("d", d);
    pulse.setAttribute("class", "beam-pulse");
    pulse.setAttribute("pathLength", "100");
    pulse.style.animationDuration = `${duration}s`;
    pulse.style.animationDelay = `${delay}s`;
    pulse.setAttribute("stroke", pulseColor);
    svg.append(glow, base, pulse);
  };
  const clear = (svg) => {
    svg.replaceChildren();
    const box = svg.parentElement.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    return box;
  };
  const curve = (sx, sy, ex, ey, vertical = false) => {
    if (vertical) {
      const my = (sy + ey) / 2;
      return `M${sx} ${sy}C${sx} ${my} ${ex} ${my} ${ex} ${ey}`;
    }
    const mx = (sx + ex) / 2;
    return `M${sx} ${sy}C${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`;
  };

  const hub = $("[data-hub]");
  const drawHub = () => {
    const svg = $(".hub-beams", hub);
    if (!svg || getComputedStyle(svg).display === "none") return;
    const box = clear(svg);
    const core = $(".core-disc", hub).getBoundingClientRect();
    const coreX = core.left + core.width / 2 - box.left;
    const coreY = core.top + core.height / 2 - box.top;
    const radius = core.width / 2 + 6;
    $$("[data-beam]", hub).forEach((tile, i) => {
      const r = tile.getBoundingClientRect();
      const left = tile.dataset.beam === "left";
      const sx = (left ? r.right + 10 : r.left - 10) - box.left;
      const sy = r.top + r.height / 2 - box.top;
      const ex = coreX + (left ? -radius : radius);
      const ey = coreY + (sy < coreY ? -10 : 10);
      const dashed = tile.dataset.beamStyle === "dashed";
      const color = dashed ? "#e879f9" : "#818cf8";
      beam(svg, curve(sx, sy, ex, ey), color, dashed, dashed ? 4.6 : 3.2, i * 0.7, getComputedStyle(tile).color);
    });
  };

  const converge = $("[data-converge]");
  const drawConverge = () => {
    const svg = $(".converge-beams", converge);
    if (!svg || getComputedStyle(svg).display === "none") return;
    const box = clear(svg);
    const orb = $(".hub-orb", converge).getBoundingClientRect();
    const ex = orb.left + orb.width / 2 - box.left;
    const ey = orb.top - box.top - 4;
    const cards = $$(".career", converge);
    /* Each beam drops straight from its card to a shared baseline under the
       tallest card, then curves into the hub, so none passes behind a card. */
    const baseline =
      Math.max(...cards.map((c) => c.getBoundingClientRect().bottom)) - box.top + 24;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const sx = r.left + r.width / 2 - box.left;
      const sy = r.bottom - box.top + 4;
      const my = (baseline + ey) / 2;
      const d = `M${sx} ${sy}V${baseline}C${sx} ${my} ${ex} ${my} ${ex} ${ey}`;
      const tone = getComputedStyle(card).getPropertyValue("--tone").trim() || "#818cf8";
      beam(svg, d, tone, false, 3.8 + i * 0.4, i * 0.5);
    });
  };

  const redraw = () => {
    if (hub) drawHub();
    if (converge) drawConverge();
  };
  let pending = 0;
  const schedule = () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(redraw);
  };
  [hub, converge].forEach((el) => {
    if (!el) return;
    new ResizeObserver(schedule).observe(el);
    el.addEventListener("transitionend", (event) => {
      if (event.propertyName === "transform") schedule();
    });
  });
  document.fonts?.ready.then(schedule);
  document.addEventListener("langchange", () => setTimeout(schedule, 50));
  /* Reveal transforms shift boxes slightly; redraw once they settle. */
  setTimeout(schedule, 1300);
})();
