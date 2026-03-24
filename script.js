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
