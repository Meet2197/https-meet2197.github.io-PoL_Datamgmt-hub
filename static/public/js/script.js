document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration and Data ---
    const tailwindConfig = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    // Retaining the original color scheme as requested
                    'primary-blue': '#1a237e',
                    'secondary-violet': '#6a47a8',
                    'secondary-red': '#ef4444',
                    'light-bg': '#f4f7f9',
                    'dark-bg': '#121212',
                    'dark-surface': '#1e1e1e',
                    'dark-card': '#2a2a2a',
                    // Ensuring the gray color palette is available for text
                    'gray': {
                        100: '#f3f4f6',
                        200: '#e5e7eb',
                        300: '#d1d5db',
                        400: '#9ca3af',
                        500: '#6b7280',
                        600: '#4b5563',
                        700: '#374151',
                        800: '#1f2937',
                        900: '#111827',
                    }
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                },
            },
        },
    };
    tailwind.config = tailwindConfig;

    // The list of tools for the carousel, as provided by the user.
    const toolsData = [
        { name: 'Zenodo', link: 'https://zenodo.org/', logo: 'static/images/logos/omero-logo.png', description: 'A general-purpose open-access repository for research data, software, publications, and more.', documentation: 'https://help.zenodo.org/docs/', join: 'https://zenodo.org/signup/' },
        { name: 'Figshare', link: 'https://figshare.com/', logo: 'static/images/logos/imagesc-logo.png', description: 'An online repository to share, publish, and discover research data, figures, and other scholarly outputs.', documentation: 'https://knowledge.figshare.com/', join: 'https://figshare.com/account/login' },
        { name: 'elabftw', link: 'https://elab.cmcb.tu-dresden.de/', logo: 'static/images/logos/elabftw-logo.png', description: 'An open-source electronic lab notebook for recording and managing experimental data.', documentation: 'https://doc.elabftw.net/', join: 'https://elab.cmcb.tu-dresden.de/login.php' },
        { name: 'Gitlab TUD', link: 'https://gitlab.mn.tu-dresden.de/', logo: 'static/images/logos/gitlab-logo.png', description: 'TU Dresden\'s platform for Git-based version control, code collaboration, and CI/CD.', documentation: 'https://tu-dresden.de/mn/der-bereich/it-kompetenz-und-servicezentrum/gitlab-dienst', join: 'https://gitlab.mn.tu-dresden.de/users/sign_in' },
        { name: 'OpARA TUD', link: 'https://opara.zih.tu-dresden.de/home', logo: 'static/images/logos/opara-logo.png', description: 'TU Dresden\'s institutional repository for publications and research data, ensuring long-term accessibility.', documentation: 'https://opara.zih.tu-dresden.de/collections/1b788b1c-9c5f-402c-8c5b-74eb38f69bb0', join: 'https://opara.zih.tu-dresden.de/login' },
        { name: 'BioImage Archive', link: 'https://www.ebi.ac.uk/bioimage-archive/help-policies/', logo: 'static/images/logos/bioimage-archive-logo.png', description: 'EMBL supported Large-scale, centralised data resource to host reference imaging data.', documentation: 'https://www.ebi.ac.uk/about/', join: 'https://www.ebi.ac.uk/biostudies/submissions/signin' },
        { name: 'PRIDE Database', link: 'https://www.ebi.ac.uk/pride/', logo: 'static/images/logos/pride_logo.png', description: 'PRoteomics Archive database is data repository for mass spectrometry proteomics data.', documentation: 'https://www.ebi.ac.uk/pride/markdownpage/citationpage', join: 'https://www.ebi.ac.uk/pride/login'},
    ];
    
    const sliderContainer = document.getElementById('sharing-archiving-tools-container');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const sliderDots = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    let toolsPerSlide = 2; // Default for mobile
    let totalSlides = 0;
    
    // Function to determine tools per slide based on screen size
    const updateToolsPerSlide = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
            toolsPerSlide = 3; // Desktop
        } else if (width >= 768) {
            toolsPerSlide = 2; // Tablet
        } else {
            toolsPerSlide = 1; // Mobile
        }
        totalSlides = Math.ceil(toolsData.length / toolsPerSlide);
    };
    
    // Function to populate and open the tool details modal
    const openToolDetailsModal = (tool) => {
        const modal = document.getElementById('tool-details-modal');
        
        const modalLogo = document.getElementById('tool-modal-logo');
        const modalName = document.getElementById('tool-modal-name');
        const modalDescription = document.getElementById('tool-modal-description');
        const modalDocBtn = document.getElementById('tool-modal-doc-btn');
        const modalJoinBtn = document.getElementById('tool-modal-join-btn');
        
        modalLogo.src = tool.logo;
        modalLogo.alt = `${tool.name} logo`;
        modalName.textContent = tool.name;
        modalDescription.textContent = tool.description;
        modalDocBtn.href = tool.documentation;
        modalJoinBtn.href = tool.join;
    
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    // Function to render slider cards
    const renderSliderCards = () => {
        sliderContainer.innerHTML = '';
        
        toolsData.forEach((tool, index) => {
            const card = document.createElement('div');
            card.className = "slider-card-item cursor-pointer bg-light-bg dark:bg-dark-card rounded-lg shadow-sm p-3 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex-shrink-0";
            card.style.width = `calc(${100 / toolsPerSlide}% - ${(toolsPerSlide - 1) * 12 / toolsPerSlide}px)`;
            
            card.innerHTML = `
                <div class="flex flex-col items-center text-center h-full">
                    <img src="${tool.logo}" alt="${tool.name} logo" class="w-10 h-10 object-contain mb-2">
                    <h5 class="font-bold text-sm mb-1">${tool.name}</h5>
                    <p class="text-xs text-gray-600 dark:text-gray-400 flex-grow">${tool.description.substring(0, 60)}${tool.description.length > 60 ? '...' : ''}</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                openToolDetailsModal(tool);
            });
            
            sliderContainer.appendChild(card);
        });
    };
    
    // Function to render pagination dots
    const renderDots = () => {
        sliderDots.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-colors duration-200 ${i === currentSlide ? 'bg-secondary-violet' : 'bg-gray-300 dark:bg-gray-600'}`;
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }
    };
    
    // Function to update slider position
    const updateSlider = () => {
        const translateX = -(currentSlide * 100);
        sliderContainer.style.transform = `translateX(${translateX}%)`;
        
        // Update button states
        sliderPrev.disabled = currentSlide === 0;
        sliderNext.disabled = currentSlide >= totalSlides - 1;
        
        // Update button opacity
        sliderPrev.style.opacity = currentSlide === 0 ? '0.5' : '1';
        sliderNext.style.opacity = currentSlide >= totalSlides - 1 ? '0.5' : '1';
        
        // Update dots
        const dots = sliderDots.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = `w-2 h-2 rounded-full transition-colors duration-200 ${i === currentSlide ? 'bg-secondary-violet' : 'bg-gray-300 dark:bg-gray-600'}`;
        }
    };
    
    // Function to go to specific slide
    const goToSlide = (slideIndex) => {
        currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
        updateSlider();
    };
    
    // Function to go to next slide
    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    };
    
    // Function to go to previous slide
    const prevSlide = () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    };
    
    // Initialize slider
    const initSlider = () => {
        updateToolsPerSlide();
        renderSliderCards();
        renderDots();
        updateSlider();
    };
    
    // Event listeners
    if (sliderPrev) {
        sliderPrev.addEventListener('click', prevSlide);
    }
    
    if (sliderNext) {
        sliderNext.addEventListener('click', nextSlide);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const oldToolsPerSlide = toolsPerSlide;
        updateToolsPerSlide();
        
        if (oldToolsPerSlide !== toolsPerSlide) {
            currentSlide = 0; // Reset to first slide when layout changes
            initSlider();
        }
    });
    
    // Auto-slide functionality (optional)
    let autoSlideInterval;
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            if (currentSlide >= totalSlides - 1) {
                goToSlide(0);
            } else {
                nextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    };
    
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };
    
    // Start auto-slide and pause on hover
    if (sliderContainer) {
        initSlider();
        
        // Optional: Enable auto-slide
        // startAutoSlide();
        
        // sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        // sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
    
        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
    
        sliderContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
            }
        });
    }

    // --- Event Listeners ---

    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    });

    // Mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navbar = document.getElementById('navbar');
    const body = document.body;

    // Track menu state
    let isMenuOpen = false;

    // Function to open mobile menu
    function openMobileMenu() {
        if (!isMenuOpen) {
            isMenuOpen = true;
            mobileMenu.classList.add('open');
            menuToggle.classList.add('active');
            body.classList.add('menu-open');
            
            // Ensure navbar background stays visible
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.classList.contains('dark')) {
                navbar.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
            }
        }
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Reset navbar background
            navbar.style.backgroundColor = '';
        }
    }

    // Event listeners for menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (isMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close button event listener
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close menu when clicking on navigation links
    const mobileNavLinks = mobileMenu?.querySelectorAll('.nav-link');
    mobileNavLinks?.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        themeToggleDarkIcon?.classList.add('hidden');
        themeToggleLightIcon?.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleDarkIcon?.classList.remove('hidden');
        themeToggleLightIcon?.classList.add('hidden');
    }
// Theme toggle event listener
themeToggleBtn?.addEventListener('click', () => {
    themeToggleLightIcon?.classList.toggle('hidden');
    themeToggleDarkIcon?.classList.toggle('hidden');

    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }

    // Update navbar background if menu is open
    if (isMenuOpen) {
        if (document.documentElement.classList.contains('dark')) {
            navbar.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Enhanced Modal Logic
const modals = document.querySelectorAll('.modal-wrapper');
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-modal-close]');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        body.style.overflow = 'hidden';
        
        // Close mobile menu if open
        if (isMenuOpen) {
            closeMobileMenu();
        }
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
    }
}
// Modal event listeners
openModalButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = button.getAttribute('data-modal-target');
        openModal(modalId);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = button.getAttribute('data-modal-close');
        const modal = document.getElementById(modalId);
        closeModal(modal);
    });
});

// Close modals when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('modal-backdrop')) {
            closeModal(modal);
        }
    });
});
            
    // Search functionality
    const handleSearch = (query) => {
        const normalizedQuery = query.trim().toLowerCase();
        if (normalizedQuery.length > 0) {
            const filteredCards = allContentCards.filter(card => {
                const textContent = card.textContent.toLowerCase();
                return textContent.includes(normalizedQuery);
            });
            
            searchResultsContainer.innerHTML = '';
            if (filteredCards.length > 0) {
                filteredCards.forEach(card => {
                    const clonedCard = card.cloneNode(true);
                    searchResultsContainer.appendChild(clonedCard);
                });
                searchResultsSection.classList.remove('hidden');
                mainContentSections.classList.add('hidden');
            } else {
                searchResultsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">No results found.</p>';
                searchResultsSection.classList.remove('hidden');
                mainContentSections.classList.add('hidden');
            }
        } else {
            searchResultsSection.classList.add('hidden');
            mainContentSections.classList.remove('hidden');
        }
    };
    
    mainSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    mobileSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));

    // Modal handling
    const modalWrappers = document.querySelectorAll('.modal-wrapper');
    const openModal = (modalElement) => {
        modalElement.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = (modalElement) => {
        modalElement.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };
    
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    document.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-close');
            const modal = document.getElementById(modalId);
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Tool card click to open details modal
    toolsContainer.addEventListener('click', (e) => {
        const toolCard = e.target.closest('.tool-card');
        if (toolCard) {
            const modal = document.getElementById('tool-details-modal');
            const name = toolCard.getAttribute('data-tool-name');
            const desc = toolCard.getAttribute('data-tool-desc');
            const logoUrl = toolCard.getAttribute('data-tool-logo');
            const docsUrl = toolCard.getAttribute('data-tool-docs');
            const joinUrl = toolCard.getAttribute('data-tool-join');
            
            document.getElementById('tool-modal-name').textContent = name;
            document.getElementById('tool-modal-description').textContent = desc;
            document.getElementById('tool-modal-logo').src = logoUrl;
            document.getElementById('tool-modal-logo').alt = `${name} logo`;
            
            const docBtn = document.getElementById('tool-modal-doc-btn');
            docBtn.href = docsUrl;
            docBtn.classList.toggle('hidden', docsUrl === '#');

            const joinBtn = document.getElementById('tool-modal-join-btn');
            joinBtn.href = joinUrl;
            joinBtn.classList.toggle('hidden', joinUrl === '#');
            
            openModal(modal);
        }
    });

    // Handle form submission for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // A custom modal or message box would be better, but this is for demonstration.
            alert('Your message has been sent!');
            closeModal(document.getElementById('contact-modal'));
            contactForm.reset();
        });
    }

});
