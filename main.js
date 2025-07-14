// Typed.js for dynamic text
const typed = new Typed('.multiple-text', {
    strings: [
        'Full Stack Engineer', 'AI | Cloud Enthusiast',
        'Frontend Developer'
    ],
    typeSpeed: 60,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|', // Cursor remains a pipe for visual effect
});

// ScrollReveal for smooth animations
ScrollReveal({
    reset: false, // Prevents elements from resetting on scroll up for a smoother feel
    distance: '60px', // Slightly less distance for a more subtle reveal
    duration: 1500, // Faster duration for a snappier feel
    delay: 150, // Slightly less delay
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)', // Custom easing for smooth animation
});

// Applying reveals to elements
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-container', { origin: 'bottom' });
ScrollReveal().reveal('.about-heading', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

// Optional: More granular reveals for a layered effect
ScrollReveal().reveal('.about-card', { interval: 100, origin: 'bottom' });
ScrollReveal().reveal('.services-box', { interval: 100, origin: 'bottom' });
ScrollReveal().reveal('.portfolio-layer img', { interval: 50, origin: 'bottom' });


// Mobile Navigation Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('sidebar');
const closeMenuBtn = document.getElementById('close-menu-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay-html'); // Get existing overlay from HTML

// CRITICAL CHANGE: Media query listener to control pointer-events based on screen size
const mobileMediaQuery = window.matchMedia('(max-width: 768px)'); // Matches your CSS breakpoint

function handleMobileNavPointerEvents(mediaQuery) {
    if (mediaQuery.matches) {
        // On mobile: Default overlay/navbar to none, will be 'auto' when 'active' class is added
        sidebarOverlay.style.pointerEvents = 'none';
        navbar.style.pointerEvents = 'none'; // Controlled by JS for mobile active state
    } else {
        // On desktop: Always auto.
        sidebarOverlay.style.pointerEvents = 'none'; // Overlay should always be non-clickable on desktop
        navbar.style.pointerEvents = 'auto'; // Navbar is always clickable on desktop (handled by CSS, but good to ensure)

        // Ensure mobile menu is fully closed if resizing from mobile to desktop
        navbar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }
}

// Attach listener and run once on load
mobileMediaQuery.addEventListener('change', handleMobileNavPointerEvents);
handleMobileNavPointerEvents(mobileMediaQuery); // Run once on initial load

// Function to open the mobile menu (only effective on mobile due to CSS/JS combined logic)
function openMobileMenu() {
    if (mobileMediaQuery.matches) { // Only allow opening on mobile screens
        navbar.classList.add('active');
        sidebarOverlay.classList.add('active');
        sidebarOverlay.style.pointerEvents = 'auto'; // Overlay itself is clickable to close
        navbar.style.pointerEvents = 'auto'; // Navbar links are clickable
    }
}

// Function to close the mobile menu (reusable)
function closeMobileMenu() {
    navbar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    
    // Delay setting pointer-events to 'none' to allow CSS transition to complete
    setTimeout(() => {
        if (mobileMediaQuery.matches) { // Only apply 'none' if still on mobile
            sidebarOverlay.style.pointerEvents = 'none';
            navbar.style.pointerEvents = 'none';
        }
    }, 300); // Matches CSS transition duration (0.3s)
}

// Event Listeners for menu toggle
menuIcon.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
sidebarOverlay.addEventListener('click', closeMobileMenu);


// Close the sidebar when a navigation link is clicked AND scroll smoothly
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
        
        // Only close if on a mobile screen
        if (mobileMediaQuery.matches) {
            closeMobileMenu(); 
        }
    });
});


// Active Navigation Link Highlighting on Scroll
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("#sidebar a");

    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    function addActiveClass(id) {
        removeActiveClasses();
        const targetLink = document.querySelector(`#sidebar a[href="#${id}"]`);
        if (targetLink) {
            targetLink.classList.add("active");
        }
    }

    function handleScroll() {
        const sections = document.querySelectorAll("section");
        let scrollPos = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const offset = document.querySelector('.header').offsetHeight + 50; 
            if (scrollPos >= section.offsetTop - offset && scrollPos < section.offsetTop + section.offsetHeight - offset) {
                const sectionId = section.getAttribute("id");
                addActiveClass(sectionId);
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on load
});