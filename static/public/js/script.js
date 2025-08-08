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
    const toolData = [
        { name: 'Zenodo', link: 'https://zenodo.org/', logo: 'static/images/logos/zenodo_logologo.png', description: 'A general-purpose open-access repository for research data, software, publications, and more.', documentation: 'https://help.zenodo.org/docs/', join: 'https://zenodo.org/signup/' },
        { name: 'Figshare', link: 'https://figshare.com/', logo: 'static/images/logos/imagesc-logo.png', description: 'An online repository to share, publish, and discover research data, figures, and other scholarly outputs.', documentation: 'https://knowledge.figshare.com/', join: 'https://figshare.com/account/login' },
        { name: 'elabftw', link: 'https://elab.cmcb.tu-dresden.de/', logo: 'static/images/logos/elabftw-logo.png', description: 'An open-source electronic lab notebook for recording and managing experimental data.', documentation: 'https://doc.elabftw.net/', join: 'https://elab.cmcb.tu-dresden.de/login.php' },
        { name: 'Gitlab TUD', link: 'https://gitlab.mn.tu-dresden.de/', logo: 'static/images/logos/gitlab-logo.png', description: 'TU Dresden\'s platform for Git-based version control, code collaboration, and CI/CD.', documentation: 'https://tu-dresden.de/mn/der-bereich/it-kompetenz-und-servicezentrum/gitlab-dienst', join: 'https://gitlab.mn.tu-dresden.de/users/sign_in' },
        { name: 'OpARA TUD', link: 'https://opara.zih.tu-dresden.de/home', logo: 'static/images/logos/opara-logo.png', description: 'TU Dresden\'s institutional repository for publications and research data, ensuring long-term accessibility.', documentation: 'https://opara.zih.tu-dresden.de/collections/1b788b1c-9c5f-402c-8c5b-74eb38f69bb0', join: 'https://opara.zih.tu-dresden.de/login' },
        { name: 'BioImage Archieve', link: 'https://www.ebi.ac.uk/bioimage-archive/help-policies/', logo: 'static/images/logos/bioimage-archive-logo.png', description: 'EMBL supported Large-scale, centralised data resource to host reference imaging data.', documentation: 'https://www.ebi.ac.uk/about/', join: 'https://www.ebi.ac.uk/biostudies/submissions/signin' },
        { name: 'Proteomics IDEntifications Database' , link: 'https://www.ebi.ac.uk/pride/', logo: 'static/images/logos/pride_logo.png', description: 'PRoteomics Archive database is data repository for mass spectrometry proteomics data.', documentation: 'https://www.ebi.ac.uk/pride/markdownpage/citationpage', join: 'https://www.ebi.ac.uk/pride/login'},
    ];


    // --- DOM Elements ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const mobileMenuToggle = document.getElementById('menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mainSearchInput = document.getElementById('main-search');
    const mobileSearchInput = document.getElementById('mobile-search');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsSection = document.getElementById('search-results-section');
    const mainContentSections = document.getElementById('main-content-sections');
    const toolsContainer = document.getElementById('sharing-archiving-tools-container');

    // Get all content cards for search
    const allContentCards = Array.from(document.querySelectorAll('.resource-card'));

    // Function to render the tool carousel
    const renderTools = () => {
        toolsContainer.innerHTML = '';
        toolData.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex-shrink-0 w-64 shadow-md transition-transform transform hover:scale-105 duration-300 cursor-pointer';
            toolCard.setAttribute('data-tool-name', tool.name);
            toolCard.setAttribute('data-tool-desc', tool.description);
            toolCard.setAttribute('data-tool-logo', tool.logo);
            toolCard.setAttribute('data-tool-docs', tool.documentation);
            toolCard.setAttribute('data-tool-join', tool.join);
            
            toolCard.innerHTML = `
                <div class="flex items-center mb-2">
                    <img src="${tool.logo}" alt="${tool.name} logo" class="w-8 h-8 object-contain mr-3">
                    <h5 class="text-md font-semibold">${tool.name}</h5>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">${tool.description}</p>
            `;
            toolsContainer.appendChild(toolCard);
            allContentCards.push(toolCard); // Add new cards to the search array
        });
    };
    
    // --- Initial setup ---
    renderTools();

    // Set initial theme based on localStorage or system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
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
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenuBackdrop.classList.remove('hidden');
    });
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBackdrop.classList.add('hidden');
    });
    mobileMenuBackdrop.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBackdrop.classList.add('hidden');
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
