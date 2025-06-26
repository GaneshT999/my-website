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

// CRITICAL CHANGE: Get existing overlay from HTML, no longer create it
const sidebarOverlay = document.getElementById('sidebar-overlay-html'); 

// Set initial pointer-events state immediately after element selection
// This is crucial for load-time and ensuring no clicks are registered prematurely
sidebarOverlay.style.pointerEvents = 'none'; 
navbar.style.pointerEvents = 'none'; 


// Function to open the mobile menu
function openMobileMenu() {
    navbar.classList.add('active'); // Add active class to show navbar
    sidebarOverlay.classList.add('active'); // Show overlay
    
    // Explicitly set pointer-events to 'auto' when opening
    // This allows clicks on the overlay (to close) and on the navbar links
    sidebarOverlay.style.pointerEvents = 'auto'; 
    navbar.style.pointerEvents = 'auto'; 
}

// Function to close the mobile menu
function closeMobileMenu() {
    navbar.classList.remove('active'); // Remove active class to hide navbar
    sidebarOverlay.classList.remove('active'); // Hide overlay

    // IMPORTANT: Delay setting pointer-events to 'none'
    // This allows the CSS transition (opacity fade) to complete visually BEFORE clicks are disabled.
    // The delay should match your CSS transition duration for .sidebar-overlay (0.3s).
    setTimeout(() => {
        sidebarOverlay.style.pointerEvents = 'none'; // Disable clicks on overlay
        navbar.style.pointerEvents = 'none'; // Disable clicks on navbar when hidden
    }, 300); 
}

// Event Listeners
menuIcon.addEventListener('click', openMobileMenu); // Open menu
closeMenuBtn.addEventListener('click', closeMobileMenu); // Close menu with button
sidebarOverlay.addEventListener('click', closeMobileMenu); // Close menu by clicking overlay


// Close the sidebar when a navigation link is clicked AND scroll smoothly
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump
        const targetId = this.getAttribute('href').substring(1); // Get ID without '#'
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Scroll to the section, adjusting for the fixed header
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight - 20, // Header height + small offset
                behavior: 'smooth'
            });
        }
        
        closeMobileMenu(); // Close the menu after clicking a link
    });
});


// Active Navigation Link Highlighting on Scroll
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("#sidebar a"); // Select all links in the sidebar

    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    function addActiveClass(id) {
        removeActiveClasses();
        const targetLink = document.querySelector(`#sidebar a[href="#${id}"]`);
        if (targetLink) { // Check if the link exists
            targetLink.classList.add("active");
        }
    }

    function handleScroll() {
        const sections = document.querySelectorAll("section");
        let scrollPos = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            // Adjust the offset based on your fixed header height + some buffer
            const offset = document.querySelector('.header').offsetHeight + 50; 
            if (scrollPos >= section.offsetTop - offset && scrollPos < section.offsetTop + section.offsetHeight - offset) {
                const sectionId = section.getAttribute("id");
                addActiveClass(sectionId);
            }
        });
    }

    window.addEventListener("scroll", handleScroll);

    // Initial check on load to set the active link for the first visible section
    handleScroll();
});