const sharingArchivingTools = [
    { name: 'Zenodo', link: 'https://zenodo.org/', logo: '📚', description: 'A general-purpose open-access repository for research data, software, publications, and more.', documentation: 'https://help.zenodo.org/', join: 'https://zenodo.org/signup/' },
    { name: 'Figshare', link: 'https://figshare.com/', logo: '📊', description: 'An online repository to share, publish, and discover research data, figures, and other scholarly outputs.', documentation: 'https://knowledge.figshare.com/', join: 'https://figshare.com/signup' },
    { name: 'Datashare TUD', link: 'https://datashare.tu-dresden.de/', logo: '☁️', description: 'The institutional data repository of TU Dresden for publishing and archiving research data.', documentation: 'https://datashare.tu-dresden.de/help/', join: 'https://datashare.tu-dresden.de/login' },
    { name: 'elabftw', link: 'https://elab.cmcb.tu-dresden.de/', logo: '🧪', description: 'An open-source electronic lab notebook for recording and managing experimental data.', documentation: 'https://elabftw.readthedocs.io/en/latest/', join: 'https://elab.cmcb.tu-dresden.de/login' },
    { name: 'Gitlab TUD', link: 'https://gitlab.mn.tu-dresden.de/', logo: '🦊', description: 'TU Dresden\'s platform for Git-based version control, code collaboration, and CI/CD.', documentation: 'https://docs.gitlab.com/', join: 'https://gitlab.mn.tu-dresden.de/users/sign_in' },
    { name: 'OpARA TUD', link: 'https://opara.zih.tu-dresden.de/home', logo: '🏛️', description: 'TU Dresden\'s institutional repository for publications and research data, ensuring long-term accessibility.', documentation: 'https://opara.zih.tu-dresden.de/help', join: 'https://opara.zih.tu-dresden.de/login' },
];

const sharingArchivingToolsContainer = document.getElementById('sharing-archiving-tools-container');
const modal = document.getElementById('toolModal');
const closeModalButton = document.querySelector('.close-button');
const modalLogo = document.getElementById('modalLogo');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const documentationLink = document.getElementById('documentationLink');
const joinToolLink = document.getElementById('joinToolLink');

// Get references to the new buttons
const getStartedBtn = document.getElementById('getStartedBtn');
const viewGuidelinesBtn = document.getElementById('viewGuidelinesBtn');

// Data for the new buttons' pop-ups
const getStartedInfo = {
    name: 'Get Started with PoL Data Management',
    logo: '🚀',
    description: 'Welcome! This section will guide you through the initial steps of managing your research data at PoL. You will find introductory resources, essential checklists, and information on how to access core services.',
    documentation: '#', // Placeholder link
    join: '#', // Placeholder link
    buttonText: 'Explore Onboarding', // Custom text for the "Join Tool" link
};

const viewGuidelinesInfo = {
    name: 'PoL Data Management Guidelines',
    logo: '📜',
    description: 'Dive deep into our comprehensive guidelines covering best practices for data collection, organization, documentation, storage, sharing, and archiving. Ensure your research complies with institutional and ethical standards.',
    documentation: '#', // Placeholder link
    join: '#', // Placeholder link
    buttonText: 'View Full Guidelines', // Custom text for the "Join Tool" link
};

// Dynamically add tools to the "Data Sharing & Archiving" section
sharingArchivingTools.forEach(tool => {
    const toolItem = document.createElement('div');
    toolItem.classList.add('tool-item');
    toolItem.dataset.toolName = tool.name; // Store tool name for easy access

    toolItem.innerHTML = `
        <span class="logo-placeholder">${tool.logo}</span>
        <div>
            <h5>${tool.name}</h5>
            <p>${tool.description}</p>
        </div>
    `;
    sharingArchivingToolsContainer.appendChild(toolItem);

    // Add click event listener to each tool item
    toolItem.addEventListener('click', () => {
        showToolPopup(tool);
    });
});

// Function to display the modal with given content
function showToolPopup(data) {
    modalLogo.textContent = data.logo;
    modalTitle.textContent = data.name;
    modalDescription.textContent = data.description;
    documentationLink.href = data.documentation;
    joinToolLink.href = data.join;
    // Set custom text for the "Join Tool" button if provided, otherwise default to "Join Tool"
    joinToolLink.textContent = data.buttonText || 'Join Tool';
    modal.style.display = 'block';
}

// Add event listeners for the header buttons
if (getStartedBtn) { // Check if element exists before adding listener
    getStartedBtn.addEventListener('click', () => {
        showToolPopup(getStartedInfo);
    });
}

if (viewGuidelinesBtn) { // Check if element exists before adding listener
    viewGuidelinesBtn.addEventListener('click', () => {
        showToolPopup(viewGuidelinesInfo);
    });
}

// When the user clicks on <span> (x), close the modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
