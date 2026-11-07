/* Interactive, in-memory project graph. No project data is modified.
   Text comes from window.I18N (assets/i18n.js). */
(() => {
  "use strict";
  const HUB = "atlas";
  const t = (key, vars) => window.I18N.t(key, vars);
  const areaName = (key) => window.I18N.area(key);
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
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const edgeKey = (a, b) => [a, b].sort().join("::");

  window.ProjectMap = class ProjectMap {
    constructor(host, projects) {
      this.host = host;
      this.projects = projects;
      this.positions = new Map();
      this.edges = projects.map((p) => ({ a: HUB, b: p.id }));
      this.history = [];
      this.results = [];
      this.drag = null;
      this.draft = null;
      this.selectedEdge = null;
      this.active = false;
      this.visible = false;
      this.motion = matchMedia("(prefers-reduced-motion: reduce)");
      this.particlesEnabled = true;
      this.particles = [];
      this.frame = null;
      this.lastPointer = null;
      this.route = "curves";
      this.layout = "orbit";
      this.defaultPositions();
      host.classList.add("interactive-map");
      host.innerHTML = `<div class="map-toolbar"><div class="map-mode-label"><span class="map-live-dot" aria-hidden="true"></span> <span data-i18n="map.mode">${t("map.mode")}</span></div><div class="map-tools" role="group" aria-label="${t("map.tools")}" data-i18n-attr="aria-label:map.tools"><button type="button" data-map-action="layout" title="${t("map.layoutTitle")}" data-i18n="map.layout" data-i18n-attr="title:map.layoutTitle">${t("map.layout")}</button><label class="map-route-label"><span data-i18n="map.route">${t("map.route")}</span> <select aria-label="${t("map.routeAria")}" data-i18n-attr="aria-label:map.routeAria" id="map-route"><option value="curves" data-i18n="map.curves">${t("map.curves")}</option><option value="straight" data-i18n="map.straight">${t("map.straight")}</option></select></label><button type="button" data-map-action="particles" aria-pressed="true" data-i18n="map.particles">${t("map.particles")}</button><button type="button" data-map-action="undo" disabled data-i18n="map.undo">${t("map.undo")}</button><button type="button" data-map-action="reset" title="${t("map.resetTitle")}" data-i18n="map.reset" data-i18n-attr="title:map.resetTitle">${t("map.reset")}</button></div></div><p class="map-instructions" id="map-instructions" data-i18n-html="map.instructions">${t("map.instructions")}</p><div class="map-viewport" tabindex="0" role="region" aria-label="${t("map.viewport")}" data-i18n-attr="aria-label:map.viewport" aria-describedby="map-instructions"><div class="map-world"><svg class="map-wires" role="group" aria-label="${t("map.wires")}" data-i18n-attr="aria-label:map.wires"></svg><svg class="map-draft-wire" aria-hidden="true"><path /></svg><div class="map-node-layer"></div><canvas class="map-particles" aria-hidden="true"></canvas></div></div><div class="map-footer"><span id="map-feedback" role="status" aria-live="polite">${t("map.feedback")}</span><button type="button" data-map-action="delete" disabled data-i18n="map.delete">${t("map.delete")}</button></div><details class="map-connections"><summary><span data-i18n="map.connections">${t("map.connections")}</span> <span id="map-edge-count">0</span><span class="map-touch-hint" data-i18n="map.touchHint">${t("map.touchHint")}</span></summary><ul class="map-connection-list"></ul></details>`;
      this.viewport = host.querySelector(".map-viewport");
      this.world = host.querySelector(".map-world");
      this.layer = host.querySelector(".map-node-layer");
      this.wires = host.querySelector(".map-wires");
      this.draftPath = host.querySelector(".map-draft-wire path");
      this.canvas = host.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.motion.addEventListener("change", () => {
        this.clearParticles();
        this.updateParticleButton();
      });
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.viewport);
      this.intersectionObserver = new IntersectionObserver((entries) => {
        this.visible = entries[0].isIntersecting;
        if (!this.visible) this.clearParticles();
      });
      this.intersectionObserver.observe(this.viewport);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.clearParticles();
          this.cancelInteraction();
        }
      });
      const dialog = document.getElementById("project-dialog");
      if (dialog)
        new MutationObserver(() => {
          if (dialog.open) {
            this.clearParticles();
            this.cancelInteraction();
          }
        }).observe(dialog, { attributes: true, attributeFilter: ["open"] });
      host.addEventListener("click", (e) => this.click(e));
      host.addEventListener("keydown", (e) => this.keydown(e));
      host.addEventListener("pointerdown", (e) => this.pointerdown(e));
      host.addEventListener("pointermove", (e) => this.pointermove(e));
      host.addEventListener("pointerup", (e) => this.pointerup(e));
      host.addEventListener("pointercancel", (event) => {
        // Native touch scrolling must preserve a connector selected with a tap.
        if (
          this.drag?.pointerId === event.pointerId ||
          this.draft?.pointerId === event.pointerId
        )
          this.cancelInteraction();
      });
      host.addEventListener("lostpointercapture", (e) => {
        if (
          this.drag?.pointerId === e.pointerId ||
          this.draft?.pointerId === e.pointerId
        )
          this.cancelInteraction();
      });
      this.viewport.addEventListener("pointerleave", () => {
        this.lastPointer = null;
      });
      this.viewport.addEventListener(
        "scroll",
        () => {
          this.lastPointer = null;
          if (this.draft && !this.draft.pointerId)
            this.draftPath.removeAttribute("d");
        },
        { passive: true },
      );
      host.querySelector("#map-route").addEventListener("change", (e) => {
        this.route = e.target.value;
        this.drawEdges();
      });
      this.updateParticleButton();
    }

    defaultPositions() {
      const fixed = [
        [0.2, 0.2],
        [0.5, 0.15],
        [0.8, 0.2],
        [0.83, 0.51],
        [0.74, 0.82],
        [0.26, 0.82],
        [0.17, 0.51],
      ];
      this.positions = new Map([[HUB, { x: 0.5, y: 0.51 }]]);
      this.projects.forEach((p, i) => {
        const angle = (i / this.projects.length) * Math.PI * 2 - Math.PI / 2;
        const [x, y] =
          this.projects.length <= 7
            ? fixed[i]
            : [0.5 + Math.cos(angle) * 0.34, 0.5 + Math.sin(angle) * 0.35];
        this.positions.set(p.id, { x, y });
      });
    }

    snapshot() {
      return {
        positions: [...this.positions].map(([id, p]) => [id, { ...p }]),
        edges: this.edges.map((e) => ({ ...e })),
        layout: this.layout,
      };
    }
    remember(snapshot = this.snapshot()) {
      this.history.push(snapshot);
      if (this.history.length > 30) this.history.shift();
      this.host.querySelector('[data-map-action="undo"]').disabled = false;
    }
    name(id) {
      return id === HUB
        ? "Caravantes AI"
        : this.projects.find((p) => p.id === id)?.title || id;
    }
    announce(message) {
      this.host.querySelector("#map-feedback").textContent = message;
    }

    update(results, active) {
      this.cancelInteraction();
      this.clearParticles();
      this.results = results;
      this.active = active;
      this.selectedEdge = null;
      if (!active) return;
      const port = (id) =>
        `<button type="button" class="map-port" data-port="${id}" aria-label="${escape(t("map.connect", { name: this.name(id) }))}" aria-pressed="false" title="${escape(t("map.portTitle"))}">+</button>`;
      this.layer.innerHTML = `<div class="map-hub map-node" data-map-node="${HUB}"><button type="button" class="map-drag-handle hub-handle" data-drag="${HUB}" aria-label="${escape(t("map.moveHub"))}" title="${escape(t("map.dragTitle"))}"><img src="assets/brand/caravantes-mark.svg" alt="" width="40" height="40"><span>Caravantes AI</span></button>${port(HUB)}</div>${results
        .map((source) => {
          const p = window.I18N.localize(source);
          return `<article class="map-card map-node kind-${p.kind}" data-map-node="${p.id}"><button type="button" class="map-drag-handle" data-drag="${p.id}" aria-label="${escape(t("map.move", { title: p.title }))}" title="${escape(t("map.dragTitle"))}"><span>${escape(t(`kindShort.${p.kind}`))}</span><span class="drag-grip" aria-hidden="true"></span></button><h3>${escape(p.title)}</h3><p>${p.areas.map((a) => escape(areaName(a))).join(" · ")}</p><button type="button" class="map-open-case" data-project="${p.id}" aria-label="${escape(t("map.open", { title: p.title }))}">${escape(t(p.kind === "pro" ? "card.openCase" : "card.openLab"))} <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"></use></svg></button>${port(p.id)}</article>`;
        })
        .join("")}`;
      this.resize();
      this.announce(t("map.ready"));
    }

    resize() {
      if (!this.active || this.host.hidden || !this.viewport.clientWidth)
        return;
      this.cancelInteraction();
      this.world.style.height =
        this.layout === "grid"
          ? `${Math.max(630, 200 + Math.ceil(this.projects.length / 3) * 185)}px`
          : "";
      this.width = this.world.clientWidth;
      this.height = this.world.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      this.canvas.width = Math.round(this.width * dpr);
      this.canvas.height = Math.round(this.height * dpr);
      if (this.ctx) this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.clearParticles();
      this.layoutNodes();
      this.drawEdges();
    }
    element(id) {
      return [...this.layer.children].find((el) => el.dataset.mapNode === id);
    }
    bounds(id) {
      const el = this.element(id);
      const pos = this.positions.get(id);
      return el && pos
        ? {
            x: pos.x * this.width,
            y: pos.y * this.height,
            w: el.offsetWidth,
            h: el.offsetHeight,
          }
        : null;
    }
    place(id, x, y) {
      const el = this.element(id);
      if (!el) return;
      const halfW = el.offsetWidth / 2 + 20,
        halfH = el.offsetHeight / 2 + 16;
      const pos = {
        x: clamp(x, halfW, this.width - halfW) / this.width,
        y: clamp(y, halfH, this.height - halfH) / this.height,
      };
      this.positions.set(id, pos);
      el.style.left = `${pos.x * 100}%`;
      el.style.top = `${pos.y * 100}%`;
    }
    layoutNodes() {
      for (const el of this.layer.children) {
        const p = this.positions.get(el.dataset.mapNode);
        this.place(el.dataset.mapNode, p.x * this.width, p.y * this.height);
      }
    }
    point(event) {
      const r = this.world.getBoundingClientRect();
      return { x: event.clientX - r.left, y: event.clientY - r.top };
    }
    boundary(a, b) {
      const dx = b.x - a.x,
        dy = b.y - a.y;
      if (!dx && !dy) return { x: a.x + a.w / 2, y: a.y };
      const scale =
        1 /
        Math.max(Math.abs(dx) / (a.w / 2 + 3), Math.abs(dy) / (a.h / 2 + 3));
      return { x: a.x + dx * scale, y: a.y + dy * scale };
    }
    path(a, b) {
      if (this.route === "straight") return `M${a.x} ${a.y}L${b.x} ${b.y}`;
      const dx = b.x - a.x,
        dy = b.y - a.y;
      if (Math.abs(dx) > Math.abs(dy))
        return `M${a.x} ${a.y}C${a.x + dx * 0.5} ${a.y},${b.x - dx * 0.5} ${b.y},${b.x} ${b.y}`;
      return `M${a.x} ${a.y}C${a.x} ${a.y + dy * 0.5},${b.x} ${b.y - dy * 0.5},${b.x} ${b.y}`;
    }
    visibleEdges() {
      const ids = new Set([HUB, ...this.results.map((p) => p.id)]);
      return this.edges.filter((e) => ids.has(e.a) && ids.has(e.b));
    }
    drawEdges() {
      if (!this.active || !this.width) return;
      this.wires.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
      this.host
        .querySelector(".map-draft-wire")
        .setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
      const edges = this.visibleEdges();
      this.wires.innerHTML = edges
        .map((edge) => {
          const a = this.bounds(edge.a),
            b = this.bounds(edge.b);
          if (!a || !b) return "";
          const d = this.path(this.boundary(a, b), this.boundary(b, a));
          return `<g class="map-edge${this.selectedEdge === edgeKey(edge.a, edge.b) ? " selected" : ""}" data-edge="${edgeKey(edge.a, edge.b)}" tabindex="0" role="button" aria-label="${escape(t("map.selectEdge", { a: this.name(edge.a), b: this.name(edge.b) }))}"><path class="map-edge-hit" d="${d}"/><path class="map-edge-line" d="${d}"/></g>`;
        })
        .join("");
      this.host.querySelector("#map-edge-count").textContent =
        t("map.edgeCount", {
          visible: edges.length,
          total: this.edges.length,
        });
      this.host.querySelector(".map-connection-list").innerHTML = edges.length
        ? edges
            .map(
              (edge) =>
                `<li><span>${escape(this.name(edge.a))} <b aria-hidden="true">↔</b> ${escape(this.name(edge.b))}</span><button type="button" data-remove-edge="${edgeKey(edge.a, edge.b)}" aria-label="${escape(t("map.removeAria", { a: this.name(edge.a), b: this.name(edge.b) }))}">${escape(t("map.remove"))}</button></li>`,
            )
            .join("")
        : `<li class="map-no-edges">${escape(t("map.noEdges"))}</li>`;
      this.host.querySelector('[data-map-action="delete"]').disabled =
        !this.selectedEdge;
    }
    selectEdge(key) {
      this.selectedEdge = key;
      this.wires
        .querySelectorAll(".map-edge")
        .forEach((el) =>
          el.classList.toggle("selected", el.dataset.edge === key),
        );
      this.host.querySelector('[data-map-action="delete"]').disabled = false;
      const edge = this.edges.find((e) => edgeKey(e.a, e.b) === key);
      if (edge)
        this.announce(
          t("map.edgeSelected", { a: this.name(edge.a), b: this.name(edge.b) }),
        );
    }
    removeEdge(key) {
      const edge = this.edges.find((e) => edgeKey(e.a, e.b) === key);
      if (!edge) return;
      this.remember();
      this.edges = this.edges.filter((e) => edgeKey(e.a, e.b) !== key);
      this.selectedEdge = null;
      this.drawEdges();
      this.host
        .querySelector('[data-map-action="undo"]')
        .focus({ preventScroll: true });
      this.announce(t("map.removed"));
    }
    connect(a, b) {
      this.cancelDraft();
      if (a === b) {
        this.announce(t("map.same"));
        return;
      }
      const key = edgeKey(a, b);
      if (this.edges.some((e) => edgeKey(e.a, e.b) === key)) {
        this.selectEdge(key);
        this.announce(t("map.exists"));
        return;
      }
      this.remember();
      this.edges.push({ a, b });
      this.selectedEdge = key;
      this.drawEdges();
      this.announce(t("map.connected", { a: this.name(a), b: this.name(b) }));
    }
    selectPort(id) {
      if (this.draft) {
        const from = this.draft.id;
        this.connect(from, id);
        return;
      }
      this.draft = { id };
      this.paintPorts();
      this.announce(t("map.origin", { name: this.name(id) }));
    }
    paintPorts() {
      this.host
        .querySelectorAll("[data-port]")
        .forEach((port) =>
          port.setAttribute(
            "aria-pressed",
            port.dataset.port === this.draft?.id,
          ),
        );
      this.world.classList.toggle("is-connecting", !!this.draft);
    }
    cancelDraft() {
      this.draft = null;
      this.draftPath.removeAttribute("d");
      this.paintPorts();
    }
    cancelInteraction() {
      const capture = this.drag || this.draft;
      if (this.drag) {
        this.positions.set(this.drag.id, this.drag.original);
        this.layoutNodes();
        this.drag.element.classList.remove("is-dragging");
        this.drag = null;
        this.drawEdges();
      }
      this.cancelDraft();
      if (
        capture?.pointerId !== undefined &&
        this.host.hasPointerCapture(capture.pointerId)
      )
        this.host.releasePointerCapture(capture.pointerId);
    }
    pointerdown(event) {
      if (
        event.button !== 0 ||
        !this.active ||
        this.drag ||
        this.draft?.pointerId !== undefined
      )
        return;
      const handle = event.target.closest("[data-drag]"),
        port = event.target.closest("[data-port]");
      if (!handle && !port) return;
      const p = this.point(event);
      if (handle) {
        this.cancelDraft();
        const id = handle.dataset.drag;
        const node = this.bounds(id);
        this.drag = {
          id,
          pointerId: event.pointerId,
          start: p,
          offset: { x: p.x - node.x, y: p.y - node.y },
          original: { ...this.positions.get(id) },
          snapshot: this.snapshot(),
          moved: false,
          element: handle.closest(".map-node"),
        };
        handle.focus({ preventScroll: true });
      } else {
        // An already selected connector uses click-to-connect instead of starting a second drag.
        if (this.draft) return;
        this.draft = {
          id: port.dataset.port,
          pointerId: event.pointerId,
          start: p,
          moved: false,
        };
        port.focus({ preventScroll: true });
        this.paintPorts();
      }
      this.host.setPointerCapture(event.pointerId);
    }
    pointermove(event) {
      const p = this.point(event);
      if (this.drag?.pointerId === event.pointerId) {
        if (Math.hypot(p.x - this.drag.start.x, p.y - this.drag.start.y) > 4)
          this.drag.moved = true;
        if (this.drag.moved) {
          event.preventDefault();
          this.drag.element.classList.add("is-dragging");
          this.place(
            this.drag.id,
            p.x - this.drag.offset.x,
            p.y - this.drag.offset.y,
          );
          this.drawEdges();
        }
      }
      if (this.draft) {
        if (
          this.draft.pointerId === event.pointerId &&
          Math.hypot(p.x - this.draft.start.x, p.y - this.draft.start.y) > 6
        )
          this.draft.moved = true;
        const from = this.bounds(this.draft.id);
        if (from)
          this.draftPath.setAttribute(
            "d",
            this.path(this.boundary(from, p), p),
          );
      }
      if (
        (event.pointerType !== "touch" &&
          this.viewport.contains(event.target)) ||
        this.drag ||
        this.draft?.moved
      )
        this.emit(p);
    }
    pointerup(event) {
      if (this.drag?.pointerId === event.pointerId) {
        const drag = this.drag;
        this.drag = null;
        drag.element.classList.remove("is-dragging");
        if (drag.moved) {
          this.remember(drag.snapshot);
          this.announce(t("map.moved", { name: this.name(drag.id) }));
        }
      } else if (this.draft?.pointerId === event.pointerId) {
        const draft = this.draft;
        if (draft.moved) {
          const target = document
            .elementFromPoint(event.clientX, event.clientY)
            ?.closest("[data-port], [data-map-node]");
          const id = target?.dataset.port || target?.dataset.mapNode;
          this.suppressPortClick = true;
          if (id && id !== draft.id) this.connect(draft.id, id);
          else {
            this.cancelDraft();
            this.announce(t("map.cancelled"));
          }
        } else {
          // Pointer capture may retarget click to the host; select explicitly.
          this.cancelDraft();
          this.selectPort(draft.id);
          this.suppressPortClick = true;
        }
      }
      if (this.host.hasPointerCapture(event.pointerId))
        this.host.releasePointerCapture(event.pointerId);
    }
    click(event) {
      const port = event.target.closest("[data-port]");
      if (this.suppressPortClick) {
        this.suppressPortClick = false;
        if (port && event.detail) return;
      }
      if (port) {
        this.selectPort(port.dataset.port);
        return;
      }
      const edge = event.target.closest("[data-edge]");
      if (edge) {
        this.selectEdge(edge.dataset.edge);
        return;
      }
      const remove = event.target.closest("[data-remove-edge]");
      if (remove) {
        this.removeEdge(remove.dataset.removeEdge);
        return;
      }
      const action =
        event.target.closest("[data-map-action]")?.dataset.mapAction;
      if (!action) return;
      this.cancelInteraction();
      if (action === "particles") {
        this.particlesEnabled = !this.particlesEnabled;
        this.clearParticles();
        this.updateParticleButton();
      }
      if (action === "delete" && this.selectedEdge)
        this.removeEdge(this.selectedEdge);
      if (action === "undo") {
        const previous = this.history.pop();
        if (!previous) return;
        this.positions = new Map(previous.positions);
        this.edges = previous.edges;
        this.layout = previous.layout;
        this.selectedEdge = null;
        this.resize();
        this.host.querySelector('[data-map-action="undo"]').disabled =
          !this.history.length;
        if (!this.history.length)
          this.host
            .querySelector('[data-map-action="reset"]')
            .focus({ preventScroll: true });
        this.announce(t("map.undone"));
      }
      if (action === "reset") {
        this.remember();
        this.defaultPositions();
        this.edges = this.projects.map((p) => ({ a: HUB, b: p.id }));
        this.layout = "orbit";
        this.selectedEdge = null;
        this.resize();
        this.announce(t("map.restored"));
      }
      if (action === "layout") {
        this.remember();
        this.layout = this.layout === "orbit" ? "grid" : "orbit";
        if (this.layout === "orbit") this.defaultPositions();
        else {
          const rows = Math.ceil(this.projects.length / 3);
          const height = Math.max(630, 200 + rows * 185);
          this.positions.set(HUB, { x: 0.5, y: 90 / height });
          this.projects.forEach((p, i) =>
            this.positions.set(p.id, {
              x: 0.18 + (i % 3) * 0.32,
              y: (240 + Math.floor(i / 3) * 185) / height,
            }),
          );
        }
        this.resize();
        this.announce(
          t("map.layoutApplied", { orbit: this.layout === "orbit" }),
        );
      }
    }
    keydown(event) {
      if (event.key === "Escape" && (this.drag || this.draft)) {
        event.preventDefault();
        this.cancelInteraction();
        this.announce(t("map.editCancelled"));
        return;
      }
      const handle = event.target.closest("[data-drag]");
      const delta = {
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
      }[event.key];
      if (handle && delta) {
        event.preventDefault();
        if (this.drag) this.cancelInteraction();
        this.remember();
        const id = handle.dataset.drag,
          p = this.positions.get(id),
          step = event.shiftKey ? 30 : 10;
        this.place(
          id,
          p.x * this.width + delta[0] * step,
          p.y * this.height + delta[1] * step,
        );
        this.drawEdges();
        this.announce(t("map.movedKey", { name: this.name(id) }));
        return;
      }
      const edge = event.target.closest("[data-edge]");
      if (edge && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        this.selectEdge(edge.dataset.edge);
      }
      if (edge && (event.key === "Delete" || event.key === "Backspace")) {
        event.preventDefault();
        this.removeEdge(edge.dataset.edge);
      }
    }

    updateParticleButton() {
      const button = this.host.querySelector('[data-map-action="particles"]');
      button.disabled = this.motion.matches || !this.ctx;
      button.setAttribute(
        "aria-pressed",
        this.particlesEnabled && !button.disabled,
      );
      button.title = this.motion.matches
        ? t("map.particlesReduced")
        : !this.ctx
          ? t("map.noCanvas")
          : t("map.particlesTitle");
    }
    /* Called after a language change; static chrome is handled by I18N.apply. */
    relabel() {
      this.updateParticleButton();
      this.announce(t("map.feedback"));
    }
    emit(p) {
      if (
        !this.active ||
        !this.visible ||
        !this.ctx ||
        !this.particlesEnabled ||
        this.motion.matches ||
        document.hidden ||
        document.querySelector("dialog[open]")
      )
        return;
      if (p.x < 0 || p.x > this.width || p.y < 0 || p.y > this.height) {
        this.lastPointer = null;
        return;
      }
      const last = this.lastPointer || p,
        dist = Math.hypot(p.x - last.x, p.y - last.y);
      if (this.lastPointer && dist < 5) return;
      const count = Math.min(14, Math.max(2, Math.ceil(dist / 7))),
        now = performance.now();
      for (let i = 1; i <= count; i++)
        this.particles.push({
          x: last.x + ((p.x - last.x) * i) / count,
          y: last.y + ((p.y - last.y) * i) / count,
          vx: (Math.random() - 0.5) * 24,
          vy: (Math.random() - 0.5) * 24,
          born: now,
          life: 450 + Math.random() * 350,
          radius: 0.8 + Math.random() * 1.8,
        });
      if (this.particles.length > 160)
        this.particles.splice(0, this.particles.length - 160);
      this.lastPointer = p;
      if (this.frame === null)
        this.frame = requestAnimationFrame((time) => this.paintParticles(time));
    }
    paintParticles(time) {
      this.frame = null;
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.particles = this.particles.filter((p) => time - p.born < p.life);
      for (const p of this.particles) {
        const age = time - p.born,
          t = age / 1000,
          alpha = 1 - age / p.life;
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(129,140,248,${alpha * 0.8})`;
        this.ctx.shadowColor = "#6366f1";
        this.ctx.shadowBlur = 7;
        this.ctx.arc(
          p.x + p.vx * t,
          p.y + p.vy * t,
          p.radius * alpha + 0.2,
          0,
          Math.PI * 2,
        );
        this.ctx.fill();
      }
      this.ctx.shadowBlur = 0;
      if (this.particles.length)
        this.frame = requestAnimationFrame((time) => this.paintParticles(time));
    }
    clearParticles() {
      if (this.frame !== null) cancelAnimationFrame(this.frame);
      this.frame = null;
      this.particles = [];
      this.lastPointer = null;
      if (this.ctx)
        this.ctx.clearRect(
          0,
          0,
          this.width || this.canvas.width,
          this.height || this.canvas.height,
        );
    }
  };
})();
