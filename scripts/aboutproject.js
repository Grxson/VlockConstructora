// 1. Capturamos todas las imágenes dentro de la galería
const galleryImages = document.querySelectorAll('#gallery-grid .gallery-image img');

// 2. Creamos un array solo con sus src
const images = Array.from(galleryImages).map(img => img.src);

// 3. Referencias al modal y sus controles
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const leftBtn = document.querySelector('#image-modal button.left-btn');
const rightBtn = document.querySelector('#image-modal button.right-btn');

let currentIndex = 0;

// 4. Función para abrir modal
function openModal(imageSrc) {
    currentIndex = images.indexOf(imageSrc);
    if (currentIndex === -1) currentIndex = 0; // fallback

    modalImage.src = images[currentIndex];
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// 5. Función para cerrar modal
function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// 6. Cambiar imagen al anterior
function showPrevious() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex];
}

// 7. Cambiar imagen al siguiente
function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex];
}

// 8. Eventos para botones, con stopPropagation para que no se cierre modal
leftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevious();
});
rightBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
});

// 9. Evento para cerrar modal al hacer clic en overlay
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// 10. Hacemos globales las funciones para el onclick inline
window.openModal = openModal;
window.closeModal = closeModal;
