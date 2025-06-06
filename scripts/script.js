// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;
const icon = darkModeToggle.querySelector("i");

// Cargar preferencia al iniciar
if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
} else {
    html.classList.remove("dark");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
}

// Al hacer clic en el toggle
darkModeToggle.addEventListener("click", () => {
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});

// Hero slideshow
const heroSlides = document.querySelectorAll(".hero-slide");
const slideIndicators = document.querySelectorAll(".slide-indicator");
let currentSlide = 0;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
    });

    slideIndicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add("opacity-100");
            indicator.classList.remove("opacity-50");
        } else {
            indicator.classList.add("opacity-50");
            indicator.classList.remove("opacity-100");
        }
    });

    currentSlide = index;
}

// Auto slide change
setInterval(() => {
    const nextSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(nextSlide);
}, 5000);

// Manual slide change with indicators
slideIndicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
        const slideIndex = parseInt(indicator.getAttribute("data-slide"));
        showSlide(slideIndex);
    });
});

// Service tabs
const serviceTabs = document.querySelectorAll(".service-tab");
const serviceDetails = document.querySelectorAll(".service-detail");

serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const serviceId = tab.getAttribute("data-service");

        // Update active tab
        serviceTabs.forEach((t) => t.classList.remove("active-service"));
        tab.classList.add("active-service");

        // Update active content
        serviceDetails.forEach((detail) => {
            detail.classList.add("hidden");
            if (detail.getAttribute("data-service") === serviceId) {
                detail.classList.remove("hidden");
            }
        });
    });
});

// Portfolio modal
const projectModal = document.getElementById("projectModal");
const viewProjectButtons = document.querySelectorAll(".view-project");
const closeModalButton = document.getElementById("closeModal");
// START
viewProjectButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const projectId = button.getAttribute("data-project");
        const project = projects[projectId];
        if (!project) return;

        // Título y ubicación
        document.getElementById("modalProjectTitle").textContent = project.title;
        document.getElementById("modalProjectLocation").textContent = project.location;
        // Cargar imágenes dinámicamente (si tienes un carrusel o imágenes específicas)
        const mobileCarousel = document.getElementById("mobileCarousel");
        mobileCarousel.innerHTML = ''; // Limpiar imágenes previas

        project.images.forEach((image, index) => {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('min-w-full');
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Imagen del proyecto ${index + 1}`;
            img.classList.add('w-full', 'h-auto', 'rounded-lg');
            imageDiv.appendChild(img);
            mobileCarousel.appendChild(imageDiv);
        });

        // Cargar las imágenes estáticas en la versión de escritorio
        const desktopImagesContainer = document.querySelector(".hidden.lg\\:block");
        desktopImagesContainer.innerHTML = ''; // Limpiar imágenes previas

        project.images.forEach((image, index) => {
            const imageSlide = document.createElement('div');
            imageSlide.classList.add('project-image-slide');
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Imagen del proyecto ${index + 1}`;
            img.classList.add('w-full', 'h-auto', 'rounded-t-lg', 'lg:rounded-l-lg', 'lg:rounded-tr-none');
            imageSlide.appendChild(img);
            desktopImagesContainer.appendChild(imageSlide);
        });

        // Etiquetas
        const tagsContainer = document.createElement("div");
        tagsContainer.className = "flex flex-wrap gap-2 mb-6";
        project.tags.forEach((tag) => {
            const span = document.createElement("span");
            span.className = "bg-gray-100 dark:bg-dark px-3 py-1 rounded-full text-sm";
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
        const oldTags = document.querySelector("#modalProjectLocation").nextElementSibling;
        oldTags.replaceWith(tagsContainer);

        // Descripción
        document.getElementById("modalProjectDescription").textContent = project.description;

        // Detalles
        const detailGrid = document.createElement("div");
        detailGrid.className = "grid grid-cols-2 gap-4 mb-6";
        const labels = {
            area: "Área construida",
            duration: "Duración",
            investment: "Inversión",
            units: "Unidades"
        };
        for (const [key, value] of Object.entries(project.data)) {
            const box = document.createElement("div");
            box.className = "bg-gray-50 dark:bg-dark p-4 rounded-lg";

            const label = document.createElement("p");
            label.className = "text-sm text-gray-500 dark:text-gray-400";
            label.textContent = labels[key] || key;

            const val = document.createElement("p");
            val.className = "font-bold";
            val.textContent = value;

            box.appendChild(label);
            box.appendChild(val);
            detailGrid.appendChild(box);
        }
        const oldGrid = document.getElementById("modalProjectDescription").nextElementSibling;
        oldGrid.replaceWith(detailGrid);

        // Amenidades
        const amenidadesList = document.createElement("ul");
        amenidadesList.className = "grid grid-cols-1 md:grid-cols-2 gap-2 mb-6";
        project.amenities.forEach((item) => {
            const li = document.createElement("li");
            li.className = "flex items-center";

            const icon = document.createElement("i");
            icon.className = "fas fa-check text-primary mr-2";

            const span = document.createElement("span");
            span.textContent = item;

            li.appendChild(icon);
            li.appendChild(span);
            amenidadesList.appendChild(li);
        });
        const oldList = document.querySelector("ul.grid");
        oldList.replaceWith(amenidadesList);

        // Mostrar modal
        projectModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });
});
//END

closeModalButton.addEventListener("click", () => {
    projectModal.classList.add("hidden");
    document.body.style.overflow = "auto";
});

// Close modal when clicking outside
projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
        projectModal.classList.add("hidden");
        document.body.style.overflow = "auto";
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });

            // Close mobile menu if open
            mobileMenu.classList.add("hidden");
        }
    });
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        ".animate-fade-in, .animate-slide-up"
    );

    elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);





