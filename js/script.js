// Replace these placeholders with your own details. Leave a value empty to keep that link hidden.
const siteConfig = {
  ownerName: "Catarina Maresyembun",
  contactEmail: "catarinamaresyembun@gmail.com",
  cvUrl: "",
  socialLinks: {
    github: "https://github.com/Yelicodes",
    linkedin: "https://www.linkedin.com/in/catarina-maresyembun-9ab3a9354",
    whatsapp: "https://wa.me/6281369882669"
  }
};

const projects = [
  {
    title: "Personal Portfolio Website",
    category: "Web design & development",
    description: "A clean, responsive portfolio concept for introducing a creative professional and sharing selected work.",
    image: "assets/images/Personal Portofolio.png",
    imageAlt: "Illustrated dark portfolio website preview with purple accents",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://yelicodes.github.io/Freelance-Portofolio/",
    repoUrl: "https://github.com/Yelicodes/Freelance-Portofolio",
    note: "Live demo and source code are available through the links above."
  },
  {
    title: "Tech Digital",
    category: "Business website",
    description: "A company website concept focused on clear information, confident visuals, and a straightforward contact journey.",
    image: "assets/images/NovaTech Digital.png",
    imageAlt: "Illustrated company website preview with a bold blue hero and content cards",
    technologies: ["HTML5", "CSS3", "Bootstrap"],
    liveUrl: "https://yelicodes.github.io/NovaTech-Digital/",
    repoUrl: "https://github.com/Yelicodes/NovaTech-Digital",
    note: "Live demo and source code are available through the links above."
  },
  {
    title: "Generasi Muda Bersatu",
    category: "Community & organization",
    description: "A welcoming organization website concept for sharing programs, updates, and useful community information.",
    image: "assets/images/Community Organisasi.jpg",
    imageAlt: "Illustrated organization website preview with warm coral and cream colors",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    note: "Live demo and source code are available through the links above."
  },
  {
    title: "StudentHub — Student Management System.",
    category: "Web application",
    description: "An in-progress dashboard concept for organizing student records and common administrative tasks.",
    image: "assets/images/StudentHub.jpg",
    imageAlt: "Illustrated student management dashboard with a sidebar and student records",
    technologies: ["PHP", "MySQL", "Bootstrap"],
    note: "Project in development. The interface and functionality are demonstrative; there is no live system or public repository yet."
  },
  {
    title: "PHP & MySQL CRUD Application",
    category: "Database application",
    description: "A demonstration of a simple create, read, update, and delete workflow with a PHP and MySQL foundation.",
    image: "assets/images/preview-crud.svg",
    imageAlt: "Illustrated database application preview showing a data table and create action",
    technologies: ["PHP", "MySQL", "CSS3"],
    note: "Demonstration project. This concept is still in development; no live demo or public source repository is available yet."
  },
  {
    title: "Presentation Design",
    category: "PowerPoint & visual design",
    description: "A presentation design concept exploring a consistent visual system for clear, memorable slides.",
    image: "assets/images/presentasi.png",
    imageAlt: "Illustrated presentation slides with a purple and lavender visual system",
    technologies: ["PowerPoint", "Layout", "Typography"],
    note: "Demonstration project. This concept is still in development; no finished presentation or public source file is available yet."
  }
];

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#primary-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const projectGrid = document.querySelector("#project-grid");
const projectDialog = document.querySelector("#project-dialog");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

document.documentElement.classList.add("js");

function configurePersonalDetails() {
  const pageTitle = `${siteConfig.ownerName} — Freelance Developer & Digital Designer`;
  document.title = pageTitle;
  document.querySelector('meta[property="og:title"]').content = pageTitle;

  document.querySelectorAll("[data-owner]").forEach((element) => {
    element.textContent = siteConfig.ownerName;
  });
  document.querySelectorAll(".brand").forEach((brand) => {
    brand.setAttribute("aria-label", `${siteConfig.ownerName} home`);
  });

  const cvLink = document.querySelector("[data-cv]");
  if (siteConfig.cvUrl) {
    cvLink.href = siteConfig.cvUrl;
    cvLink.hidden = false;
  } else {
    cvLink.hidden = true;
  }

  const emailLink = document.querySelector("[data-contact-email]");
  if (siteConfig.contactEmail) {
    emailLink.href = `mailto:${siteConfig.contactEmail}`;
    emailLink.textContent = siteConfig.contactEmail;
    emailLink.hidden = false;
    document.querySelector("[data-contact-direct]").hidden = false;
  }

  let hasSocialLink = false;
  Object.entries(siteConfig.socialLinks).forEach(([network, url]) => {
    const link = document.querySelector(`[data-social="${network}"]`);
    if (!url) return;
    link.href = url;
    link.hidden = false;
    hasSocialLink = true;
  });
  document.querySelector("[data-social-links]").hidden = !hasSocialLink;
}

function renderProjects() {
  projectGrid.innerHTML = projects.map((project, index) => `
    <article class="project-card" data-project-index="${index}">
      <div class="project-image-wrap">
        <img class="project-image" src="${project.image}" alt="${project.imageAlt}" loading="lazy" width="640" height="386">
        ${project.liveUrl || project.repoUrl ? "" : `<span class="project-badge">Demo concept · In progress</span>`}
      </div>
      <div class="project-body">
        <p class="project-kicker">${project.category}</p>
        <h3>${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="tech-list" aria-label="Technologies">
          <div class="project-actions">
            <button class="project-details" type="button" data-project-details="${index}" aria-label="View details for ${project.title}">View details <span aria-hidden="true">↗</span></button>
            ${project.liveUrl ? `<a class="project-link" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live demo</a>` : ""}
            ${project.repoUrl ? `<a class="project-link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
            ${!project.liveUrl && !project.repoUrl ? `<span class="project-unavailable">Demo in progress</span>` : ""}
          </div>
      </div>
    </article>
  `).join("");

  observeReveals(projectGrid.querySelectorAll(".project-card"));
}

function closeMobileMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navMenu.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navMenu.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    form.elements.namedItem("projectType").value = link.dataset.service;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.hash === `#${entry.target.id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 })
  : null;

function observeReveals(elements = document.querySelectorAll("[data-reveal]")) {
  elements.forEach((element) => {
    if (element.closest(".hero")) element.classList.add("is-revealed");
    else if (revealObserver) revealObserver.observe(element);
    else element.classList.add("is-revealed");
  });
}

projectGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-details]");
  if (!button) return;
  const project = projects[Number(button.dataset.projectDetails)];
  if (!project) return;

  projectDialog.querySelector(".dialog-links").innerHTML = [
  project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live demo</a>` : "",
  project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""
  ].join("");
  
  projectDialog.querySelector("#dialog-title").textContent = project.title;
  projectDialog.querySelector(".dialog-description").textContent = project.description;
  projectDialog.querySelector(".dialog-note").textContent = project.note;
  projectDialog.querySelector(".dialog-tech").innerHTML = project.technologies
    .map((technology) => `<span class="tech-chip">${technology}</span>`)
    .join("");
  projectDialog.showModal();
});

projectDialog.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

const fieldRules = [
  { name: "name", validate: (value) => value.trim().length >= 2, message: "Please enter your name (at least 2 characters)." },
  { name: "email", validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()), message: "Enter a valid email address, such as you@example.com." },
  { name: "projectType", validate: (value) => value.trim() !== "", message: "Please choose a project type." },
  { name: "description", validate: (value) => value.trim().length >= 10, message: "Please add a short description (at least 10 characters)." }
];

function clearFieldError(field) {
  field.removeAttribute("aria-invalid");
  document.querySelector(`#${field.id}-error`).textContent = "";
}

fieldRules.forEach((rule) => {
  const field = form.elements.namedItem(rule.name);
  field.addEventListener("input", () => clearFieldError(field));
  field.addEventListener("change", () => clearFieldError(field));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.classList.remove("is-error");

  let firstInvalidField = null;
  fieldRules.forEach((rule) => {
    const field = form.elements.namedItem(rule.name);
    if (!rule.validate(field.value)) {
      field.setAttribute("aria-invalid", "true");
      document.querySelector(`#${field.id}-error`).textContent = rule.message;
      if (!firstInvalidField) firstInvalidField = field;
    } else {
      clearFieldError(field);
    }
  });

  if (firstInvalidField) {
    formStatus.textContent = "Please check the highlighted fields.";
    formStatus.classList.add("is-error");
    firstInvalidField.focus();
    return;
  }

  if (siteConfig.contactEmail) {
    const data = new FormData(form);
    const subject = encodeURIComponent(`Project inquiry: ${data.get("projectType")}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Project type: ${data.get("projectType")}`,
      `Budget: ${data.get("budget") || "Not specified"}`,
      "",
      "Project description:",
      data.get("description")
    ].join("\n"));
    formStatus.textContent = "Your email app will open with the message prepared. It has not been sent until you choose to send it there.";
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
    return;
  }

  formStatus.textContent = "Your message has not been sent or saved because this form is not connected to a message service.";
});

const backToTop = document.querySelector(".floating-top");
const updateBackToTop = () => backToTop.classList.toggle("is-visible", window.scrollY > 500);
window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop.addEventListener("click", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});
document.querySelector("#current-year").textContent = new Date().getFullYear();

configurePersonalDetails();
renderProjects();
observeReveals();
updateBackToTop();
