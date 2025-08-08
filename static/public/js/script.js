document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Check for user's preferred theme in localStorage or system preference
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        // Toggle dark and light mode icons
        themeToggleLightIcon.classList.toggle('hidden');
        themeToggleDarkIcon.classList.toggle('hidden');

        // Toggle dark mode class on the html element
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });

    // --- Modals Logic ---
    const modals = document.querySelectorAll('.modal-wrapper');
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-modal-close]');

    // Function to open a specific modal
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    };

    // Function to close a specific modal
    const closeModal = (modal) => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    };

    // Add click listeners to open modals
    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = button.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    // Add click listeners to close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = button.getAttribute('data-modal-close');
            const modal = document.getElementById(modalId);
            closeModal(modal);
        });
    });

    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModalElement = document.querySelector('.modal-wrapper[style*="flex"]');
            if (openModalElement) {
                closeModal(openModalElement);
            }
        }
    });
    
    // --- Dynamic Slider for Sharing & Archiving Tools ---
    const toolsData = [
        { name: 'Zenodo', link: 'https://zenodo.org/', logo: 'static/images/logos/omero-logo.png', description: 'A general-purpose open-access repository for research data, software, publications, and more.', documentation: 'https://help.zenodo.org/docs/', join: 'https://zenodo.org/signup/' },
        { name: 'Figshare', link: 'https://figshare.com/', logo: 'static/images/logos/imagesc-logo.png', description: 'An online repository to share, publish, and discover research data, figures, and other scholarly outputs.', documentation: 'https://knowledge.figshare.com/', join: 'https://figshare.com/account/login' },
        { name: 'elabftw', link: 'https://elab.cmcb.tu-dresden.de/', logo: 'static/images/logos/elabftw-logo.png', description: 'An open-source electronic lab notebook for recording and managing experimental data.', documentation: 'https://doc.elabftw.net/', join: 'https://elab.cmcb.tu-dresden.de/login.php' },
        { name: 'Gitlab TUD', link: 'https://gitlab.mn.tu-dresden.de/', logo: 'static/images/logos/gitlab-logo.png', description: 'TU Dresden\'s platform for Git-based version control, code collaboration, and CI/CD.', documentation: 'https://tu-dresden.de/mn/der-bereich/it-kompetenz-und-servicezentrum/gitlab-dienst', join: 'https://gitlab.mn.tu-dresden.de/users/sign_in' },
        { name: 'OpARA TUD', link: 'https://opara.zih.tu-dresden.de/home', logo: 'static/images/logos/opara-logo.png', description: 'TU Dresden\'s institutional repository for publications and research data, ensuring long-term accessibility.', documentation: 'https://opara.zih.tu-dresden.de/collections/1b788b1c-9c5f-402c-8c5b-74eb38f69bb0', join: 'https://opara.zih.tu-dresden.de/login' },
        { name: 'BioImage Archieve', link: 'https://www.ebi.ac.uk/bioimage-archive/help-policies/', logo: 'static/images/logos/bioimage-archive-logo.png', description: 'EMBL supported Large-scale, centralised data resource to host reference imaging data.', documentation: 'https://www.ebi.ac.uk/about/', join: 'https://www.ebi.ac.uk/biostudies/submissions/signin' },
        { name: 'Proteomics IDEntifications Database' , link: 'https://www.ebi.ac.uk/pride/', logo: 'static/images/logos/pride_logo.png', description: 'PRoteomics Archive database is data repository for mass spectrometry proteomics data.', documentation: 'https://www.ebi.ac.uk/pride/markdownpage/citationpage', join: 'https://www.ebi.ac.uk/pride/login'},
        ];

    const sliderContainer = document.getElementById('sharing-archiving-tools-container');
    const leftArrow = document.getElementById('sharing-archiving-slider-left');
    const rightArrow = document.getElementById('sharing-archiving-slider-right');
    const cardWidth = 216; // 200px width + 16px gap
    let currentPosition = 0;
    
    // Function to populate and open the tool details modal
    const openToolDetailsModal = (tool) => {
        const modal = document.getElementById('tool-details-modal');
        const modalContent = document.querySelector('#tool-details-modal .modal-content-container');
        
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

        // Animate the modal opening
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Dynamically create slider cards
    const renderSliderCards = () => {
        sliderContainer.innerHTML = '';
        toolsData.forEach(tool => {
            const card = document.createElement('div');
            card.className = "slider-card-item cursor-pointer bg-light-bg dark:bg-dark-card rounded-lg shadow-sm p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[200px]";
            card.innerHTML = `
                <img src="${tool.logo}" alt="${tool.name} logo" class="w-10 h-10 object-contain mb-2">
                <h5 class="font-bold text-base mb-1">${tool.name}</h5>
                <p class="text-xs text-gray-600 dark:text-gray-400">${tool.description}</p>
            `;
            
            // Add click event listener to each card
            card.addEventListener('click', () => {
                openToolDetailsModal(tool);
            });
            
            sliderContainer.appendChild(card);
        });
    };

    // Initial render
    renderSliderCards();

    // Slider navigation logic
    const updateSlider = () => {
        sliderContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
        leftArrow.disabled = currentPosition === 0;
        rightArrow.disabled = currentPosition >= toolsData.length - 1;
    };

    leftArrow.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateSlider();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentPosition < toolsData.length - 1) {
            currentPosition++;
            updateSlider();
        }
    });

    // Initial state
    updateSlider();

    // --- Button Actions ---
    const getStartedBtn = document.getElementById('getStartedBtn');
    const viewGuidelinesBtn = document.getElementById('viewGuidelinesBtn');
    const emailUsBtn = document.getElementById('emailUsBtn');

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            openModal('about-modal');
        });
    }

    if (viewGuidelinesBtn) {
        viewGuidelinesBtn.addEventListener('click', () => {
            openModal('resources-modal');
        });
    }

    if (emailUsBtn) {
        emailUsBtn.addEventListener('click', () => {
            openModal('contact-modal');
        });
    }

    // Form submission (prevents default behavior and shows a confirmation message)
    const contactForm = document.getElementById('contact-form');
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