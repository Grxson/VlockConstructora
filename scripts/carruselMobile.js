const carousel = document.getElementById("mobileCarousel");
const total = carousel.children.length;
let idx = 0;

const update = () => {
    carousel.style.transform = `translateX(-${idx * 100}%)`;
};

document.getElementById("mobileNext").addEventListener("click", () => {
    idx = (idx + 1) % total;
    update();
});

document.getElementById("mobilePrev").addEventListener("click", () => {
    idx = (idx - 1 + total) % total;
    update();
});

// Auto-slide cada 5 segundos
setInterval(() => {
    idx = (idx + 1) % total;
    update();
}, 5000);