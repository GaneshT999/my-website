// Typed.js for dynamic text
// Updated strings to reflect your cloud/AI interest,
// and removed the pipe for smoother transitions
const typed = new Typed('.multiple-text', {
    strings: [
        'Full Stack Engineer' , 'AI | Cloud Enthusiast',
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
const closeMenuBtn = document.getElementById('close-menu-btn'); // Get the new close button
const sidebarOverlay = document.createElement('div'); // Create the overlay element

sidebarOverlay.classList.add('sidebar-overlay'); // Add class for styling
document.body.appendChild(sidebarOverlay); // Append to body

// Open menu logic
menuIcon.addEventListener('click', () => {
    navbar.classList.add('active'); // Use add for opening
    sidebarOverlay.classList.add('active'); // Show overlay
});

// Close menu function (reusable)
function closeMobileMenu() {
    navbar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
}

// Close menu logic for close button
closeMenuBtn.addEventListener('click', closeMobileMenu);

// Close menu logic when clicking the overlay
sidebarOverlay.addEventListener('click', closeMobileMenu);

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