document.addEventListener("DOMContentLoaded", function() {
    // Data for the tools slider
    const sharingArchivingTools = [
        { name: 'Zenodo', link: 'https://zenodo.org/', logo: '📚', description: 'A general-purpose open-access repository for research data, software, publications, and more.', documentation: 'https://help.zenodo.org/docs/', join: 'https://zenodo.org/signup/' },
        { name: 'Figshare', link: 'https://figshare.com/', logo: '📊', description: 'An online repository to share, publish, and discover research data, figures, and other scholarly outputs.', documentation: 'https://knowledge.figshare.com/', join: 'https://figshare.com/account/login' },
        { name: 'Datashare TUD', link: 'https://datashare.tu-dresden.de/', logo: '☁️', description: 'The institutional data repository of TU Dresden for publishing and archiving research data.', documentation: 'https://tu-dresden.de/zih/dienste/service-katalog/zusammenarbeiten-und-forschen/datenaustausch/index_1?set_language=en', join: 'https://datashare.tu-dresden.de/login' },
        { name: 'elabftw', link: 'https://elab.cmcb.tu-dresden.de/', logo: '🧪', description: 'An open-source electronic lab notebook for recording and managing experimental data.', documentation: 'https://doc.elabftw.net/', join: 'https://elab.cmcb.tu-dresden.de/login.php' },
        { name: 'Gitlab TUD', link: 'https://gitlab.mn.tu-dresden.de/', logo: '🦊', description: 'TU Dresden\'s platform for Git-based version control, code collaboration, and CI/CD.', documentation: 'https://tu-dresden.de/mn/der-bereich/it-kompetenz-und-servicezentrum/gitlab-dienst', join: 'https://gitlab.mn.tu-dresden.de/users/sign_in' },
        { name: 'OpARA TUD', link: 'https://opara.zih.tu-dresden.de/home', logo: '🏛️', description: 'TU Dresden\'s institutional repository for publications and research data, ensuring long-term accessibility.', documentation: 'https://opara.zih.tu-dresden.de/collections/1b788b1c-9c5f-402c-8c5b-74eb38f69bb0', join: 'https://opara.zih.tu-dresden.de/login' },
    ];

    // Get elements for the new nested slider and navigation
    const sliderContainer = document.getElementById('sharing-archiving-tools-container');
    const sliderLeftBtn = document.getElementById('sharing-archiving-slider-left');
    const sliderRightBtn = document.getElementById('sharing-archiving-slider-right');
    const toolModal = document.getElementById('toolModal');

    let currentSlide = 0;
    const gap = 15; // Corresponds to the CSS gap value

    // Check if the slider container and buttons exist before proceeding
    if (sliderContainer && sliderLeftBtn && sliderRightBtn) {
        // Function to generate and append tool cards to the slider
        function generateToolSliderCards() {
            sharingArchivingTools.forEach(tool => {
                const card = document.createElement('div');
                card.classList.add('slider-card-item');
                card.innerHTML = `
                    <span class="logo-placeholder">${tool.logo}</span>
                    <h5>${tool.name}</h5>
                `;
                // Add click event to each card to show the modal
                card.addEventListener('click', () => {
                    showToolPopup(tool);
                });
                sliderContainer.appendChild(card);
            });
        }

        // Function to calculate how many cards are visible based on screen size
        function getVisibleCardsCount() {
            if (window.innerWidth >= 1024) {
                return 3;
            } else if (window.innerWidth >= 768) {
                return 2;
            } else {
                return 1;
            }
        }
        
        // Function to update the slider position using CSS transform
        function updateSlider() {
            if (!sliderContainer.firstElementChild) return;

            const visibleCards = getVisibleCardsCount();
            // Get the width of the first card
            const cardWidth = sliderContainer.firstElementChild.getBoundingClientRect().width;
            
            // Calculate the total translation based on the current slide, card width, and gap
            const translateValue = -currentSlide * (cardWidth + gap);
            sliderContainer.style.transform = `translateX(${translateValue}px)`;
            updateSliderNavButtons();
        }

        // Function to show/hide navigation buttons based on current position
        function updateSliderNavButtons() {
            const visibleCards = getVisibleCardsCount();
            const maxSlides = sharingArchivingTools.length - visibleCards;
            
            sliderLeftBtn.disabled = (currentSlide <= 0);
            sliderRightBtn.disabled = (currentSlide >= maxSlides);
        }

        // Function to handle slider navigation
        function setupSliderNavigation() {
            sliderLeftBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });

            sliderRightBtn.addEventListener('click', () => {
                const visibleCards = getVisibleCardsCount();
                if (currentSlide < sharingArchivingTools.length - visibleCards) {
                    currentSlide++;
                    updateSlider();
                }
            });
        }

        // Recalculate slider position and buttons on window resize (debounced for performance)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateSlider();
            }, 250);
        });

        // Initial setup for the slider
        generateToolSliderCards();
        setupSliderNavigation();
        updateSlider(); // Call this initially to ensure correct positioning and button state
    } else {
        console.error('One or more slider elements were not found. Slider functionality is disabled.');
    }

    // Modal logic (unchanged)
    const closeModalButton = toolModal.querySelector('.close-button');
    closeModalButton.addEventListener('click', () => {
        toolModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === toolModal) {
            toolModal.style.display = 'none';
        }
    });

    function showToolPopup(data) {
        document.getElementById('modalLogo').textContent = data.logo;
        document.getElementById('modalTitle').textContent = data.name;
        document.getElementById('modalDescription').textContent = data.description;
        document.getElementById('documentationLink').href = data.documentation;
        document.getElementById('joinToolLink').href = data.join;
        document.getElementById('joinToolLink').textContent = data.buttonText || 'Join Tool';
        toolModal.style.display = 'flex';
    }

    // Handle navigation modals
    const navLinks = document.querySelectorAll('nav a[data-modal-target]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = e.target.dataset.modalTarget;
            document.getElementById(modalId).style.display = 'block';
        });
    });

    const modalCloseButtons = document.querySelectorAll('.modal .close-button');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.dataset.modalClose;
            if (modalId) {
                document.getElementById(modalId).style.display = 'none';
            } else {
                e.target.closest('.modal').style.display = 'none';
            }
        });
    });
    
    // Header buttons logic (unchanged)
    const getStartedBtn = document.getElementById('getStartedBtn');
    const viewGuidelinesBtn = document.getElementById('viewGuidelinesBtn');
    const emailUsBtn = document.getElementById('emailUsBtn');
    
    const getStartedInfo = {
        name: 'Get Started with PoL Data Management',
        logo: '🚀',
        description: 'Welcome! This section will guide you through the initial steps of managing your research data at PoL. You will find introductory resources, essential checklists, and information on how to access core services.',
        documentation: '#',
        join: '#',
        buttonText: 'Explore Onboarding',
    };
    
    const viewGuidelinesInfo = {
        name: 'PoL Data Management Guidelines',
        logo: '📜',
        description: 'Dive deep into our comprehensive guidelines covering best practices for data collection, organization, documentation, storage, sharing, and archiving. Ensure your research complies with institutional and ethical standards.',
        documentation: '#',
        join: '#',
        buttonText: 'View Full Guidelines',
    };
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            showToolPopup(getStartedInfo);
        });
    }

    if (viewGuidelinesBtn) {
        viewGuidelinesBtn.addEventListener('click', () => {
            showToolPopup(viewGuidelinesInfo);
        });
    }

    if (emailUsBtn) {
        emailUsBtn.addEventListener('click', () => {
            window.location.href = "mailto:meet_kaushal.bhatt@tu-dresden.de";
        });
    }
});
