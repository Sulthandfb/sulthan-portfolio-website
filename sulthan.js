document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       LUCIDE ICONS
    =============================== */
    if (window.lucide) {
        lucide.createIcons();
    }

    /* ===============================
       HERO SECTION (ON LOAD)
    =============================== */
    const heroTitle = document.querySelector(".hero-title");
    const floatingLeft = document.querySelector(".floating-left");
    const floatingRight = document.querySelector(".floating-right");
    const heroImage = document.querySelector(".hero-image");
    const scrollIndicator = document.querySelector(".scroll-indicator");

    setTimeout(() => heroTitle?.classList.add("animate-in"), 100);
    setTimeout(() => heroImage?.classList.add("animate-in"), 300);
    setTimeout(() => floatingLeft?.classList.add("animate-in"), 400);
    setTimeout(() => floatingRight?.classList.add("animate-in"), 600);
    setTimeout(() => scrollIndicator?.classList.add("animate-in"), 800);

    /* ===============================
       SCROLL REVEAL SECTIONS
    =============================== */
    const sectionObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    document
        .querySelectorAll(".about, .skills, .projects, .certificates, .gallery, .footer")
        .forEach(section => sectionObserver.observe(section));

    /* ===============================
       UNIVERSAL INFINITE MARQUEE
    =============================== */
    function initInfiniteMarquee({
        container,
        track,
        speed = 0.5,
        pauseOnHover = true
    }) {
        if (!container || !track) return;

        // Prevent double initialization
        if (track.dataset.duplicated) return;
        track.dataset.duplicated = "true";

        // Duplicate content
        track.innerHTML += track.innerHTML;

        let paused = false;

        function animate() {
            if (!paused) {
                container.scrollLeft += speed;

                if (container.scrollLeft >= track.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }
            requestAnimationFrame(animate);
        }

        animate();

        if (pauseOnHover) {
            container.addEventListener("mouseenter", () => paused = true);
            container.addEventListener("mouseleave", () => paused = false);
        }
    }

    /* ===============================
       CERTIFICATES MARQUEE
    =============================== */
    initInfiniteMarquee({
        container: document.getElementById("marqueeContainer"),
        track: document.getElementById("imgbox"),
        speed: 0.5
    });

    /* ===============================
       SKILLS MARQUEE
    =============================== */
    initInfiniteMarquee({
        container: document.getElementById("skillMarqueeContainer"),
        track: document.getElementById("skillMarqueeTrack"),
        speed: 0.8
    });

    /* ===============================
       CERTIFICATE CARD REVEAL
    =============================== */
    const certObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.3 }
    );

    document.querySelectorAll(".cert-card").forEach(card => {
        certObserver.observe(card);
    });

});
