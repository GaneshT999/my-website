const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'Data Scientist', 'Cloud Engineer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay:200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container', { origin: 'bottom' });
ScrollReveal().reveal('.about-heading', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });