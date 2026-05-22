/** Lightweight scroll reveals — no GSAP (opacity/transform only). */
export function initScrollReveal(): void {
  if (document.documentElement.classList.contains("page-loader-active")) return;

  const root = document.getElementById("main-content");
  if (!root) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealTargets = root.querySelectorAll<HTMLElement>(
    "section:not(#hero), article, .project-card, .blog-card, .education-card, .experience-card, .contact-info-card",
  );

  const titleTargets = root.querySelectorAll<HTMLElement>(
    ".about-title, .skills-title, .experience-title, .education-title, .projects-title, .blog-title, .contact-title",
  );

  if (reduced) {
    revealTargets.forEach((el) => {
      el.classList.add("scroll-reveal-visible");
    });
    titleTargets.forEach((el) => {
      el.classList.add("scroll-reveal-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add("scroll-reveal-visible");
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  revealTargets.forEach((el, i) => {
    const noStagger = Boolean(el.closest(".experience-container"));
    el.classList.add("scroll-reveal");
    if (!noStagger) {
      el.style.setProperty("--reveal-delay", `${Math.min(i * 20, 120)}ms`);
    }
    observer.observe(el);
  });

  titleTargets.forEach((el) => {
    el.classList.add("scroll-reveal", "scroll-reveal-title");
    observer.observe(el);
  });

  const hero = root.querySelector("#hero");
  if (hero) {
    hero.querySelectorAll<HTMLElement>(".hero-cta").forEach((cta, i) => {
      cta.classList.add("scroll-reveal", "hero-cta-reveal");
      cta.style.setProperty("--reveal-delay", `${720 + i * 80}ms`);
      requestAnimationFrame(() => cta.classList.add("scroll-reveal-visible"));
    });
  }
}
