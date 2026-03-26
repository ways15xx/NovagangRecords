function setupPageTransitions() {
  const internalLinks = document.querySelectorAll("a[href]");

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });

  internalLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("http") || link.target === "_blank") {
      return;
    }

    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      document.body.classList.add("is-leaving");

      window.setTimeout(() => {
        window.location.href = href;
      }, 180);
    });
  });
}

function setupMobileNav() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const inner = header.querySelector(".hdr-inner");
  const primaryLinks = Array.from(header.querySelectorAll(".nav-primary a"));
  const secondaryLinks = Array.from(header.querySelectorAll(".nav-secondary a"));
  const allLinks = primaryLinks.concat(secondaryLinks);

  if (!inner || !allLinks.length || header.querySelector(".mobile-nav-toggle")) {
    return;
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "mobile-nav-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  toggle.textContent = "Menu";

  const overlay = document.createElement("div");
  overlay.className = "mobile-nav-overlay";

  const panel = document.createElement("nav");
  panel.className = "mobile-nav-panel";
  panel.setAttribute("aria-label", "Mobile navigation");

  const list = document.createElement("div");
  list.className = "mobile-nav-list";

  allLinks.forEach((link) => {
    const mobileLink = document.createElement("a");
    mobileLink.className = "mobile-nav-link";
    mobileLink.href = link.getAttribute("href") || "#";
    mobileLink.target = link.target || "";
    mobileLink.rel = link.rel || "";
    mobileLink.textContent = link.textContent.trim();

    if (link.classList.contains("active")) {
      mobileLink.classList.add("active");
    }

    list.appendChild(mobileLink);
  });

  panel.appendChild(list);
  inner.appendChild(toggle);
  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  const closeMenu = () => {
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    overlay.classList.remove("is-open");
    panel.classList.remove("is-open");
    document.body.classList.remove("mobile-nav-open");
  };

  const openMenu = () => {
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    overlay.classList.add("is-open");
    panel.classList.add("is-open");
    document.body.classList.add("mobile-nav-open");
  };

  toggle.addEventListener("click", () => {
    if (panel.classList.contains("is-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  panel.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (clickedLink) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

setupMobileNav();
setupPageTransitions();
