const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container', { origin: 'bottom' });
ScrollReveal().reveal('.about-heading', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('sidebar');
const sidebarOverlay = document.createElement('div');

sidebarOverlay.classList.add('sidebar-overlay');
document.body.appendChild(sidebarOverlay);

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
});

// Close the sidebar when a link is clicked
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("#sidebar a");

    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    function addActiveClass(id) {
        removeActiveClasses();
        document.querySelector(`#sidebar a[href="#${id}"]`).classList.add("active");
    }

    function handleScroll() {
        const sections = document.querySelectorAll("section");
        let scrollPos = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop - 50 && scrollPos < section.offsetTop + section.offsetHeight) {
                const sectionId = section.getAttribute("id");
                addActiveClass(sectionId);
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
});



