// ============================================
// Tab Navigation for "Who We Empower" Section
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content cards
    const tabs = document.querySelectorAll('.empower__tab');
    const cards = document.querySelectorAll('.empower__card');

    // Add click event listeners to all tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the data-tab attribute value
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all cards
            cards.forEach(card => {
                card.classList.remove('active');
            });

            // Show the corresponding card
            const targetCard = document.querySelector(`.empower__card[data-content="${targetTab}"]`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });

    // Optional: Keyboard navigation for accessibility
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            let nextIndex;

            // Arrow right - move to next tab
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextIndex = index + 1 < tabs.length ? index + 1 : 0;
                tabs[nextIndex].focus();
                tabs[nextIndex].click();
            }

            // Arrow left - move to previous tab
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                nextIndex = index - 1 >= 0 ? index - 1 : tabs.length - 1;
                tabs[nextIndex].focus();
                tabs[nextIndex].click();
            }

            // Home key - move to first tab
            if (e.key === 'Home') {
                e.preventDefault();
                tabs[0].focus();
                tabs[0].click();
            }

            // End key - move to last tab
            if (e.key === 'End') {
                e.preventDefault();
                tabs[tabs.length - 1].focus();
                tabs[tabs.length - 1].click();
            }
        });
    });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or a modal trigger
        if (href === '#' || href.startsWith('#signup') || href.startsWith('#learn') || href.startsWith('#certified')) {
            e.preventDefault();
            console.log('Button clicked:', href);
            // Here you can add modal or form logic in the future
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Header Scroll Effect (Optional)
// ============================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// Future Enhancement Placeholder
// ============================================

// TODO: You can customize the card content for each tab
// Example structure for dynamic content:
const tabContent = {
    'buyers-agents': {
        label: "BUYER'S AGENTS",
        title: "Give your buyers the certainty of cash",
        description: "Waive common contingencies, including the home-sale contingency, to allow your buyers to make their strongest offer in any market.",
        image: "images/buyer_agents.png"
    },
    'buyers': {
        label: "BUYERS",
        title: "Make your strongest offer",
        description: "Get the power to waive contingencies and compete with cash buyers in any market.",
        image: "images/buyer_agents.png"
    },
    'listing-agents': {
        label: "LISTING AGENTS",
        title: "Close deals faster",
        description: "Help your sellers accept offers with confidence knowing the deal will close.",
        image: "images/buyer_agents.png"
    },
    'sellers': {
        label: "SELLERS",
        title: "Sell with certainty",
        description: "Accept offers knowing they're backed by cash and guaranteed to close.",
        image: "images/buyer_agents.png"
    },
    'loan-officers': {
        label: "LOAN OFFICERS",
        title: "Empower your clients",
        description: "Give your clients the competitive edge they need in any market.",
        image: "images/buyer_agents.png"
    }
};

// Uncomment and modify this function to dynamically update card content
/*
function updateCardContent(tabId) {
    const content = tabContent[tabId];
    const card = document.querySelector(`.empower__card[data-content="${tabId}"]`);
    
    if (card && content) {
        card.querySelector('.empower__label').textContent = content.label;
        card.querySelector('.empower__card-title').textContent = content.title;
        card.querySelector('.empower__card-description').textContent = content.description;
        card.querySelector('.empower__img').src = content.image;
    }
}
*/

// ============================================
// Solutions Carousel Navigation
// ============================================

let currentSlideIndex = 0;
const solutionSlides = document.querySelectorAll('.solutions__slide');
const solutionTabs = document.querySelectorAll('.solutions__tab');
const solutionDots = document.querySelectorAll('.solutions__dot');
const arrowLeft = document.querySelector('.solutions__arrow--left');
const arrowRight = document.querySelector('.solutions__arrow--right');

// Function to show specific slide
function showSlide(index) {
    // Wrap around if index is out of bounds
    if (index >= solutionSlides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = solutionSlides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Hide all slides
    solutionSlides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all tabs
    solutionTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all dots
    solutionDots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide
    solutionSlides[currentSlideIndex].classList.add('active');
    solutionTabs[currentSlideIndex].classList.add('active');
    solutionDots[currentSlideIndex].classList.add('active');
}

// Arrow navigation
if (arrowLeft) {
    arrowLeft.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
    });
}

if (arrowRight) {
    arrowRight.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
    });
}

// Tab navigation
solutionTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        showSlide(index);
    });
});

// Dot navigation
solutionDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showSlide(currentSlideIndex - 1);
    } else if (e.key === 'ArrowRight') {
        showSlide(currentSlideIndex + 1);
    }
});

// Optional: Auto-play carousel (uncomment to enable)
/*
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Start autoplay
startAutoplay();

// Pause on hover
const solutionsCarousel = document.querySelector('.solutions__carousel');
if (solutionsCarousel) {
    solutionsCarousel.addEventListener('mouseenter', stopAutoplay);
    solutionsCarousel.addEventListener('mouseleave', startAutoplay);
}
*/
