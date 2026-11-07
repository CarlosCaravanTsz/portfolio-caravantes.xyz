(() => {
  "use strict";
  const projects = window.PORTFOLIO_PROJECTS;
  const { t, localize, area: areaName } = window.I18N;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();
  const pad = (n) => String(n).padStart(2, "0");
  const icon = (name) =>
    `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const isPro = (p) => p.kind === "pro";
  let type = "all";
  let area = "all";
  let view = "cards";
  let query = "";
  let activeProject = null;
  let walkTimer = null;
  let returnHash = "#proyectos";
  let trigger = null;
  const dialog = $("#project-dialog");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const projectMap = new window.ProjectMap($("#project-map"), projects);

  /* Illustrations for professional cases. Labels are aria-hidden decoration. */
  function art(project) {
    /* Tones match the CSS: emerald (data), indigo (AI), rose (integration). */
    const tones = {
      green: ["#6ee7b7", "#0b1f19", "#0f3a2c", "#145a43", "#1d7a5a", "#0c2a21"],
      purple: ["#a5b4fc", "#0f0f22", "#1b1d44", "#262a66", "#343a8c", "#16183a"],
      blue: ["#fda4af", "#200d12", "#3d1720", "#5c2230", "#7a2d40", "#2c1219"],
    };
    const [color, panel, f1, f2, f3, deep] = tones[project.color] || tones.purple;
    const text = (x, y, label, size = 12) =>
      `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${size}" font-family="JetBrains Mono, monospace">${label}</text>`;
    const box = (x, y, w, h, label) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${panel}" stroke="${color}" stroke-opacity=".6"/>${text(x + w / 2, y + h / 2 + 4, label)}`;
    let drawing;
    if (project.art === "lakehouse") {
      drawing = `<g transform="translate(180 128)"><path d="M-95 32 0-14 95 32 0 78Z" fill="${f1}" stroke="${color}" stroke-opacity=".35"/><path d="M-95 7 0-39 95 7 0 53Z" fill="${f2}" stroke="${color}" stroke-opacity=".5"/><path d="M-95-18 0-64 95-18 0 28Z" fill="${f3}" stroke="${color}"/><path d="M-95-18V-8L0 38 95-8V-18L0 28Z" fill="${deep}" stroke="${color}" stroke-opacity=".55"/><path d="M-63-18 0-49 63-18 0 13Z" fill="none" stroke="${color}" stroke-opacity=".6"/>${text(0, -14, "LAKEHOUSE", 13)}<path d="M-105 14H-135V-27M105 14H135V-27" fill="none" stroke="${color}" stroke-dasharray="3 4"/><circle cx="-135" cy="-30" r="4" fill="${color}"/><circle cx="135" cy="-30" r="4" fill="${color}"/></g>`;
    } else if (project.art === "agents") {
      drawing = `<g fill="none" stroke="${color}" stroke-opacity=".5"><path d="M88 82H122V130H148M88 175H122V130M212 130H244V82H270M244 130V175H270"/><circle cx="180" cy="130" r="46" stroke-dasharray="2 7"/></g>${box(14, 64, 76, 36, "CHANNELS")}${box(14, 157, 76, 36, "CONTEXT")}${box(270, 64, 76, 36, "TOOLS")}${box(270, 157, 76, 36, "RESPONSE")}<rect x="151" y="101" width="58" height="58" rx="16" fill="${f2}" stroke="${color}"/><g fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"><path d="M180 116v28M166 130h28M170 120l20 20M190 120l-20 20"/></g>`;
    } else {
      drawing = `<g fill="none" stroke="${color}" stroke-opacity=".5"><path d="M92 126H132M224 126H262M300 94V77H180V100M300 160V186H180V152" stroke-dasharray="4 4"/></g>${box(14, 106, 78, 40, "SOURCE")}${box(132, 98, 92, 56, "SERVICES")}${box(262, 59, 84, 34, "AIRFLOW")}${box(262, 109, 84, 34, "NIFI")}${box(262, 159, 84, 34, "TARGETS")}<circle cx="112" cy="126" r="3" fill="${color}"/><circle cx="243" cy="126" r="3" fill="${color}"/>`;
    }
    return `<svg viewBox="0 0 360 240" aria-hidden="true">${drawing}</svg>`;
  }

  function matches(p) {
    const local = localize(p);
    const haystack = [
      local.title,
      local.description,
      ...local.tech,
      ...p.areas.map((a) => window.PORTFOLIO_AREAS[a].es),
      ...p.areas.map((a) => window.PORTFOLIO_AREAS[a].en),
      local.type,
      local.context,
    ].join(" ");
    return (
      (type === "all" || (type === "pro") === isPro(p)) &&
      (area === "all" || p.areas.includes(area)) &&
      normalize(haystack).includes(normalize(query.trim()))
    );
  }

  function card(source) {
    const p = localize(source);
    const pro = isPro(p);
    const action = t(pro ? "card.openCase" : "card.openLab");
    const tags = p.tech
      .slice(0, pro ? 3 : 2)
      .map(
        (tech) =>
          `<li><button class="tag-button" data-tech="${escape(tech)}" aria-label="${escape(t("card.searchTech", { tech }))}">${escape(tech)}</button></li>`,
      )
      .join("");
    const meta = `<span class="kind-badge kind-${p.kind}">${escape(t(`kind.${p.kind}`))}</span>`;
    return `<article class="project-card ${pro ? "is-pro" : "is-explore"} ${p.color}">${
      pro
        ? `<div class="project-art ${p.color}"><div class="art-meta">${meta}</div>${art(p)}</div>`
        : ""
    }<div class="project-body"><h3>${escape(p.title)}</h3><p class="project-kicker">${p.areas.map((a) => escape(areaName(a))).join(" · ")}</p><p class="project-description">${escape(p.description)}</p><ul class="tags">${tags}</ul><div class="project-footer"><span class="project-context">${pro ? "" : meta}${escape(p.context)}</span><button class="project-open" data-project="${p.id}" aria-label="${escape(`${action}: ${p.title}`)}">${escape(action)} ${icon("arrow-right")}</button></div></div></article>`;
  }

  function group(kind, items) {
    if (!items.length) return "";
    return `<section class="project-group group-${kind}" aria-labelledby="group-${kind}"><div class="group-heading"><h3 id="group-${kind}">${escape(t(`group.${kind}.title`))}</h3><p>${escape(t(`group.${kind}.note`))}</p></div><div class="project-cards">${items.map(card).join("")}</div></section>`;
  }

  function updateCounts() {
    const counts = {
      all: projects.length,
      pro: projects.filter(isPro).length,
      explore: projects.filter((p) => !isPro(p)).length,
    };
    $(".nav-count").textContent = pad(counts.all);
    $$("[data-count]").forEach((el) => {
      el.textContent = pad(counts[el.dataset.count]);
    });
    $$("[data-evidence]").forEach((el) => {
      const key = el.dataset.evidence;
      el.textContent =
        key === "explore"
          ? t("evidence.explore", {
              labs: projects.filter((p) => p.kind === "lab").length,
              personal: projects.filter((p) => p.kind === "personal").length,
            })
          : t("evidence.pro", {
              n: projects.filter((p) => isPro(p) && p.areas.includes(key))
                .length,
            });
    });
  }

  function render() {
    const results = projects.filter(matches);
    $("#result-count").textContent = t("results", { n: results.length });
    const chip = $("#area-chip");
    chip.hidden = area === "all";
    if (area !== "all") {
      chip.innerHTML = `${escape(t("areaChip.label", { area: areaName(area) }))} ${icon("close")}`;
      chip.setAttribute("aria-label", t("areaChip.aria", { area: areaName(area) }));
    }
    $("#empty-state").hidden = !!results.length;
    $("#project-grid").hidden = view !== "cards" || !results.length;
    $("#project-map").hidden = view !== "map" || !results.length;
    $("#project-grid").innerHTML =
      group("pro", results.filter(isPro)) +
      group("explore", results.filter((p) => !isPro(p)));
    projectMap.update(results, view === "map" && results.length > 0);
    $$(".filter").forEach((button) => {
      const selected = button.dataset.type === type;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", selected);
    });
    $$("[data-view]").forEach((button) => {
      const selected = button.dataset.view === view;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", selected);
    });
  }

  function scrollToProjects() {
    $("#proyectos").scrollIntoView({
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
    $("#projects-title").focus({ preventScroll: true });
  }

  function setFilters(next, scroll = false) {
    ({ type = "all", area = "all" } = next);
    query = "";
    $("#project-search").value = "";
    render();
    if (scroll) scrollToProjects();
  }

  function stopWalk() {
    clearInterval(walkTimer);
    walkTimer = null;
    const button = $("#walk-flow");
    if (button) button.innerHTML = `${escape(t("dialog.walk"))} ${icon("arrow-right")}`;
  }

  function selectNode(index) {
    const node = activeProject.nodes[index];
    $$(".architecture-node", dialog).forEach((button, i) => {
      button.classList.toggle("active", i === index);
      button.setAttribute("aria-pressed", i === index);
    });
    $("#node-detail").innerHTML =
      `<h4>${pad(index + 1)} · ${escape(node.name)} <span>${escape(node.tech)}</span></h4><p>${escape(node.detail)}</p>`;
  }

  function openProject(id, keepNode = false) {
    const source = projects.find((p) => p.id === id);
    if (!source) return;
    const current = keepNode
      ? Number($(".architecture-node.active", dialog)?.dataset.node || 0)
      : 0;
    stopWalk();
    const p = localize(source);
    activeProject = p;
    $("#dialog-content").innerHTML =
      `<div class="case-title-row"><h2 id="dialog-title">${escape(p.title)}</h2><button class="share-button" id="share-project">${escape(t("dialog.share"))} ${icon("external")}</button></div><p class="case-meta">${escape(t(`kind.${p.kind}`))} · ${escape(p.context)}</p><div class="share-status" id="share-status" role="status"></div><p class="case-lead">${escape(p.subtitle)} ${escape(p.description)}</p><ul class="tags">${p.tech.map((tech) => `<li>${escape(tech)}</li>`).join("")}</ul><p class="case-disclosure">${escape(p.disclosure)}</p><div class="case-overview"><div><h3>${escape(t("dialog.problem"))}</h3><p>${escape(p.problem)}</p></div><div><h3>${escape(t("dialog.role"))}</h3><p>${escape(p.contribution)}</p></div></div><section class="architecture-panel" aria-label="${escape(t("dialog.archAria"))}"><div class="architecture-heading"><div><h3>${escape(t("dialog.archTitle"))}</h3><p>${escape(t("dialog.archHint"))}</p></div><button class="walk-button" id="walk-flow">${escape(t("dialog.walk"))} ${icon("arrow-right")}</button></div><div class="architecture-nodes">${p.nodes.map((node, i) => `${i ? `<span class="flow-arrow" aria-hidden="true">${icon("arrow-right")}</span>` : ""}<button class="architecture-node${i === 0 ? " active" : ""}" data-node="${i}" aria-pressed="${i === 0}"><span>${pad(i + 1)}</span>${escape(node.name)}<small>${escape(node.tech)}</small></button>`).join("")}</div><div class="node-detail" id="node-detail" aria-live="polite"></div></section>${p.demo ? labMarkup(p.demo) : ""}<div class="case-results"><div><h3>${escape(t("dialog.decisions"))}</h3><ul>${p.decisions.map((d) => `<li>${escape(d)}</li>`).join("")}</ul></div><div><h3>${escape(t("dialog.outcomes"))}</h3><p>${escape(p.outcomes)}</p><h3>${escape(t("dialog.learning"))}</h3><p>${escape(p.learning)}</p></div></div>`;
    selectNode(Math.min(current, p.nodes.length - 1));
    if (p.demo) setupLab(p.demo);
    if (!dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      $("#close-dialog").focus({ preventScroll: true });
    }
  }

  function labMarkup(kind) {
    const header = `<section class="lab-panel" aria-label="${escape(t("lab.aria"))}"><div class="lab-heading"><h3>${escape(t("lab.title"))}</h3><span class="lab-badge">${escape(t("lab.badge"))}</span></div>`;
    if (kind === "classification")
      return (
        header +
        `<p>${escape(t("class.intro"))}</p><div class="lab-controls"><label for="threshold">${escape(t("class.threshold"))} <input id="threshold" type="range" min="0" max="100" value="50"><output id="threshold-value" for="threshold">0.50</output></label></div><div id="classification-dots" class="classification-dots" role="group" aria-label="${escape(t("class.dots"))}"></div><div class="lab-metrics" aria-live="polite"><div><strong id="precision-value"></strong><span>${escape(t("class.precision"))}</span></div><div><strong id="recall-value"></strong><span>${escape(t("class.recall"))}</span></div><div><strong id="errors-value"></strong><span>${escape(t("class.errors"))}</span></div></div><p class="lab-legend">${escape(t("class.legend"))}</p></section>`
      );
    if (kind === "network")
      return (
        header +
        `<p>${escape(t("net.intro"))}</p><div class="network-demo"><div class="network-source">${escape(t("net.producer"))}</div><span aria-hidden="true">${icon("arrow-right")}</span><div class="network-queue">${escape(t("net.queue"))} <strong id="queue-count">0</strong></div><span aria-hidden="true">${icon("arrow-right")}</span><div class="network-workers">${[0, 1, 2].map((i) => `<div class="worker" id="worker-${i}">${escape(t("net.node", { n: pad(i + 1) }))} · <span>0</span></div>`).join("")}</div></div><div class="lab-controls"><button class="button button-glass" id="send-batch">${escape(t("net.send"))} ${icon("arrow-right")}</button><button class="button button-glass" id="toggle-worker" aria-pressed="false">${escape(t("net.nodeOff"))}</button><button class="button button-glass" id="toggle-all" aria-pressed="false">${escape(t("net.allOff"))}</button><button class="button button-glass" id="reset-network">${escape(t("net.reset"))}</button></div><div class="lab-log" id="network-log" role="status">${escape(t("net.ready"))}</div></section>`
      );
    return (
      header +
      `<p>${escape(t("vision.intro"))}</p><svg class="vision-scene" viewBox="0 0 600 280" role="img" aria-label="${escape(t("vision.scene"))}"><path d="M30 245 130 45H470L570 245Z" fill="#0b0b14" stroke="#2c2f55"/><g stroke="#1a1c33"><path d="M30 245H570M55 195H545M80 145H520M105 95H495M130 45 110 245M215 45 205 245M300 45V245M385 45 395 245M470 45 490 245"/></g><rect class="vision-zone" id="vision-zone" x="310" y="85" width="170" height="150"/><text x="319" y="106" fill="#a5b4fc" font-size="13">${escape(t("vision.zone"))}</text><g id="vision-object" transform="translate(120 0)"><g class="vision-person"><circle cx="0" cy="144" r="10"/><path d="M-11 159H11L16 185H8V215H1V188H-1V215H-8V185H-16Z"/></g><rect id="vision-box" class="vision-box" x="-22" y="128" width="44" height="92"/><circle cx="0" cy="215" r="3" fill="#42dcb4"/></g><text x="35" y="270" fill="#a3a3b8" font-size="13">${escape(t("vision.caption"))}</text></svg><div class="lab-controls"><label for="object-position">${escape(t("vision.position"))} <input id="object-position" type="range" min="70" max="530" value="120"><output id="position-value" for="object-position">120</output></label><button class="button button-glass" id="toggle-zone" aria-pressed="true">${escape(t("vision.zoneOff"))}</button></div><div class="vision-event" id="vision-event" role="status">${escape(t("vision.outside"))}</div></section>`
    );
  }

  function setupLab(kind) {
    if (kind === "classification") {
      const scores = [
        0.04, 0.12, 0.18, 0.23, 0.29, 0.33, 0.37, 0.41, 0.46, 0.49, 0.53, 0.58,
        0.62, 0.66, 0.71, 0.76, 0.81, 0.86, 0.92, 0.97,
      ];
      const labels = [
        0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
      ];
      const update = () => {
        const threshold = Number($("#threshold").value) / 100;
        let tp = 0,
          fp = 0,
          fn = 0;
        $("#threshold-value").value = threshold.toFixed(2);
        $("#classification-dots").innerHTML = scores
          .map((score, i) => {
            const predicted = score >= threshold;
            if (predicted && labels[i]) tp++;
            if (predicted && !labels[i]) fp++;
            if (!predicted && labels[i]) fn++;
            const wrong = Number(predicted) !== labels[i];
            const label = t("class.sample", {
              i: i + 1,
              score,
              real: labels[i],
              predicted,
              wrong,
            });
            return `<span class="sample-dot${predicted ? " predicted" : ""}${wrong ? " wrong" : ""}" role="img" aria-label="${escape(label)}" title="${escape(label)}">${labels[i] ? "+" : "−"}</span>`;
          })
          .join("");
        $("#precision-value").textContent =
          tp + fp ? `${Math.round((tp / (tp + fp)) * 100)}%` : t("class.na");
        $("#recall-value").textContent =
          `${Math.round((tp / (tp + fn)) * 100)}%`;
        $("#errors-value").textContent = fp + fn;
      };
      $("#threshold").addEventListener("input", update);
      update();
    } else if (kind === "network") {
      let enabled = [true, true, true],
        counts = [0, 0, 0],
        queued = 0,
        cursor = 0;
      const update = (message) => {
        enabled.forEach((on, i) => {
          $(`#worker-${i}`).classList.toggle("offline", !on);
          $(`#worker-${i} span`).textContent =
            `${counts[i]}${on ? "" : ` · ${t("net.offline")}`}`;
        });
        $("#queue-count").textContent = queued;
        $("#toggle-worker").textContent = t(
          enabled[1] ? "net.nodeOff" : "net.nodeOn",
        );
        $("#toggle-worker").setAttribute("aria-pressed", !enabled[1]);
        const allOff = enabled.every((on) => !on);
        $("#toggle-all").textContent = t(allOff ? "net.allOn" : "net.allOff");
        $("#toggle-all").setAttribute("aria-pressed", allOff);
        $("#network-log").textContent = message;
      };
      $("#send-batch").addEventListener("click", () => {
        queued += 6;
        const available = enabled
          .map((on, i) => (on ? i : -1))
          .filter((i) => i !== -1);
        if (!available.length) {
          update(t("net.pending", { n: queued }));
          return;
        }
        const batch = queued;
        while (queued > 0) {
          counts[available[cursor % available.length]]++;
          cursor++;
          queued--;
        }
        update(
          t("net.processed", {
            batch,
            n: available.length,
            total: counts.reduce((a, b) => a + b, 0),
          }),
        );
      });
      $("#toggle-worker").addEventListener("click", () => {
        enabled[1] = !enabled[1];
        update(t("net.nodeToggled", { on: enabled[1] }));
      });
      $("#toggle-all").addEventListener("click", () => {
        const restore = enabled.every((on) => !on);
        enabled = [restore, restore, restore];
        update(t(restore ? "net.restored" : "net.allDown"));
      });
      $("#reset-network").addEventListener("click", () => {
        enabled = [true, true, true];
        counts = [0, 0, 0];
        queued = 0;
        cursor = 0;
        update(t("net.resetDone"));
      });
    } else {
      let zone = true;
      const update = () => {
        const x = Number($("#object-position").value);
        const inside = zone && x >= 310 && x <= 480;
        $("#vision-object").setAttribute("transform", `translate(${x} 0)`);
        $("#position-value").value = x;
        $("#vision-zone").style.opacity = zone ? 1 : 0.15;
        $("#vision-box").classList.toggle("alert", inside);
        $("#vision-event").textContent = t(
          !zone ? "vision.paused" : inside ? "vision.inside" : "vision.outside",
        );
        $("#toggle-zone").textContent = t(
          zone ? "vision.zoneOff" : "vision.zoneOn",
        );
        $("#toggle-zone").setAttribute("aria-pressed", zone);
      };
      $("#object-position").addEventListener("input", update);
      $("#toggle-zone").addEventListener("click", () => {
        zone = !zone;
        update();
      });
      update();
    }
  }

  function closeProject() {
    stopWalk();
    dialog.close();
    activeProject = null;
    history.replaceState(
      null,
      "",
      location.pathname + location.search + returnHash,
    );
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    else $("#projects-title").focus({ preventScroll: true });
  }

  document.addEventListener("click", async (event) => {
    const projectButton = event.target.closest("[data-project]");
    if (projectButton) {
      trigger = projectButton;
      returnHash = location.hash.startsWith("#project/")
        ? "#proyectos"
        : location.hash || "#proyectos";
      location.hash = `project/${projectButton.dataset.project}`;
      return;
    }
    const areaLink = event.target.closest("[data-area]");
    if (areaLink) {
      event.preventDefault();
      setFilters({ area: areaLink.dataset.area }, true);
      return;
    }
    const typeLink = event.target.closest("[data-type-filter]");
    if (typeLink) {
      event.preventDefault();
      setFilters({ type: typeLink.dataset.typeFilter }, true);
      return;
    }
    const filter = event.target.closest("[data-type]");
    if (filter) {
      type = filter.dataset.type;
      render();
      return;
    }
    if (event.target.closest("#area-chip")) {
      area = "all";
      render();
      $(".filter.active").focus();
      return;
    }
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      view = viewButton.dataset.view;
      render();
      return;
    }
    const tech = event.target.closest("[data-tech]");
    if (tech) {
      type = "all";
      area = "all";
      query = tech.dataset.tech;
      $("#project-search").value = query;
      render();
      $("#project-search").focus({ preventScroll: true });
      return;
    }
    const node = event.target.closest("[data-node]");
    if (node) {
      stopWalk();
      selectNode(Number(node.dataset.node));
      return;
    }
    if (event.target.closest("#walk-flow")) {
      if (walkTimer) {
        stopWalk();
        return;
      }
      if (reducedMotion.matches) {
        // Reduced motion uses explicit steps instead of an automatic sequence.
        const current = Number($(".architecture-node.active").dataset.node);
        selectNode((current + 1) % activeProject.nodes.length);
        $("#walk-flow").innerHTML = `${escape(t("dialog.walkNext"))} ${icon("arrow-right")}`;
        return;
      }
      let index = 0;
      selectNode(index);
      $("#walk-flow").textContent = t("dialog.walkPause");
      walkTimer = setInterval(() => {
        index++;
        if (index >= activeProject.nodes.length) {
          stopWalk();
          return;
        }
        selectNode(index);
      }, 2300);
    }
    if (event.target.closest("#share-project")) {
      try {
        await navigator.clipboard.writeText(location.href);
        $("#share-status").textContent = t("dialog.shareDone");
      } catch {
        $("#share-status").textContent = t("dialog.shareFallback", {
          url: location.href,
        });
      }
    }
  });

  $("#project-search").addEventListener("input", (event) => {
    query = event.target.value;
    render();
  });
  $("#reset-filters").addEventListener("click", () => {
    setFilters({});
    $(".filter.active").focus();
  });
  $("#close-dialog").addEventListener("click", closeProject);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProject();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      closeProject();
  });
  dialog.addEventListener("close", stopWalk);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopWalk();
  });
  reducedMotion.addEventListener("change", stopWalk);
  const syncHash = () => {
    if (location.hash.startsWith("#project/")) {
      const id = location.hash.slice(9);
      if (projects.some((p) => p.id === id)) openProject(id);
      else {
        if (dialog.open) dialog.close();
        history.replaceState(
          null,
          "",
          location.pathname + location.search + "#proyectos",
        );
        $("#proyectos").scrollIntoView();
      }
    } else if (dialog.open) {
      stopWalk();
      dialog.close();
      activeProject = null;
    }
  };
  window.addEventListener("hashchange", syncHash);

  const menuButton = $(".menu-toggle");
  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", open);
    menuButton.setAttribute("aria-label", t(open ? "menu.close" : "menu.open"));
    $("#navigation").classList.toggle("open", open);
  };
  menuButton.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  $$("#navigation a").forEach((link) =>
    link.addEventListener("click", () => setMenu(false)),
  );
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      menuButton.focus();
    }
    if (
      event.key === "/" &&
      !dialog.open &&
      !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) &&
      !document.activeElement.isContentEditable
    ) {
      event.preventDefault();
      $("#project-search").focus();
    }
  });

  $("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("#contact-name").value.trim(),
      message = $("#contact-message").value.trim();
    if (!name || !message) {
      const field = !name ? $("#contact-name") : $("#contact-message");
      field.setCustomValidity(t(!name ? "form.nameMissing" : "form.messageMissing"));
      field.reportValidity();
      return;
    }
    window.open(
      `https://wa.me/523221117525?text=${encodeURIComponent(t("form.whatsapp", { name, message }))}`,
      "_blank",
      "noopener,noreferrer",
    );
  });
  $$("#contact-form input, #contact-form textarea").forEach((input) =>
    input.addEventListener("input", () => input.setCustomValidity("")),
  );

  document.addEventListener("langchange", () => {
    updateCounts();
    render();
    projectMap.relabel();
    setMenu(menuButton.getAttribute("aria-expanded") === "true");
    if (dialog.open && activeProject) openProject(activeProject.id, true);
  });

  $("#year").textContent = new Date().getFullYear();
  $("#projects-title").tabIndex = -1;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          $$("#navigation a").forEach((link) => {
            const selected = link.hash === `#${entry.target.id}`;
            link.classList.toggle("active", selected);
            if (selected) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      }
    },
    { rootMargin: "-15% 0px -65% 0px" },
  );
  $$("main section[id]")
    .filter((section) =>
      ["proyectos", "experiencia", "formacion", "sobre-mi"].includes(
        section.id,
      ),
    )
    .forEach((section) => observer.observe(section));
  updateCounts();
  render();
  syncHash();
})();
