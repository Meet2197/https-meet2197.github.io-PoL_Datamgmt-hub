// chatbot.js

// Knowledge base compiled from all HTML files
// This array holds key information the chatbot can refer to.
// Each item is a string representing a piece of information from your site.
const KNOWLEDGE_BASE = [
    // From index.html
    "The PoL Data Management Corner is a central hub for research data management at Physics of Life (PoL) and TU Dresden (TUD).",
    "It provides comprehensive guides, best practices, and essential tools for the entire lifecycle of research data.",
    "Key resources include Data Management Regulations, Data Storage & Backup, and Data Sharing & Archiving.",
    "Recommended tools for data storage include OwnCloud TUD.",
    "Recommended tools for data sharing and archiving include Zenodo and Figshare.",
    "The 'What's New!?' section provides updates on advancements in data science, AI, and research tools.",
    "The 'Upcoming Data Science Events' section lists workshops, seminars, and talks.",
    "You can get in touch with the data management team for assistance.",

    // From whats-new.html
    "The 'What's New' page highlights AI Usage in Python, Recent 2025 LLM Tools, and Big Data Open Source Tools.",
    "It also features a 'Community Spotlight' on innovative research projects and data management success stories.",
    "Links are provided for 'AI Usage in Python' (koshurai.medium.com), 'Recent 2025 LLM Tools' (datacamp.com/blog/llmops-tools), and 'Big Data Open Source Tools' (opensource.com/resources/big-data).",

    // From resources.html
    "The 'Resources' page details Data Management Regulations, Data Storage & Backup, and Data Sharing & Archiving.",
    "OwnCloud TUD is a recommended tool for secure cloud storage for TU Dresden users.",
    "Zenodo is a general-purpose open-access repository by CERN, providing persistent identifiers (DOIs).",
    "Figshare is an online repository for researchers to publish data, figures, and research outputs with DOIs.",
    "The 'Resources' page also links to upcoming data science events.",

    // From Events.html
    "The 'Events' page lists upcoming events related to data science and genomics.",
    "Upcoming events in August 2025 include: 'Drosophila genetics and genomics' (EMBL Heidelberg, Aug 3-8), 'Light sheet microscopy' (Dresden, Aug 11-22), and 'FISHing for RNAs: classical to single molecule approaches' (EMBL Heidelberg, Aug 31 - Sep 5).",
    "An event in October 2025 is the 'EMBO | EMBL Symposium: Seeing is believing' (Heidelberg, Oct 8-11).",
    "An event in November 2025 is the 'Cytodata Symposium' (Berlin, Nov 20-21) focusing on morphological profiling and Cell Painting Data analysis.",

    // From data-storage-backup.html
    "The 'Data Storage & Backup' page covers Cloud Storage, Local Backup, and a Hybrid Approach.",
    "Cloud Storage offers access from anywhere, automatic syncing, and version history.",
    "Local Backup involves keeping sensitive data on-site with external drives or NAS for total control and fast retrieval.",
    "The Hybrid Approach combines local speed with cloud for disaster recovery, following a 3-2-1 backup strategy.",
    "This page also features a 'Data storage Spotlight' on innovative research projects and their data management.",

    // From data-sharing-archiving.html
    "The 'Data Sharing & Archiving' page provides guidelines for Data Sharing, Data Archiving, and the FAIR Principles.",
    "Data Sharing guidelines focus on making data accessible to the scientific community.",
    "Data Archiving policies cover long-term data preservation.",
    "The FAIR Principles ensure data is Findable, Accessible, Interoperable, and Reusable.",
    "Recommended data repositories include ZENODO, OpARA (open-access data repository at TU Dresden), and figshare.",

    // From data-management-regulations.html
    "The 'EU & German Data Regulations' page guides on data protection and management regulations.",
    "Key considerations for researchers include developing a Data Management Plan (DMP), Data Anonymization, Long-Term Archiving, and Ethical Clearances.",
    "Regulation topics include GDPR for Research, DFG General Guidelines, Animal Data Guidelines (DFG's 3Rs principle), Image Data Management, and Metadata Management.",
    "Interoperability standards mentioned are FHIR (Fast Healthcare Interoperability Resources) for health data exchange, UCUM (Unified Code for Units of Measure) for consistent measurement units, and LOINC (Logical Observation Identifiers Names and Codes) for medical lab results.",
    "SNOMED CT, a globally recognized clinical terminology for electronic health records, is also covered."
];

// Function to call the Gemini API (mocked for preview)
async function callGeminiAPI(prompt) {
    // This is a mock implementation for the preview.
    // In a real scenario, this would make a fetch call to the Gemini API.
    // For the preview, it just returns a generic response or a simple echo.
    console.log("Mock API call with prompt:", prompt);
    let responseText = "I'm a chatbot for the PoL Data Management Corner. I can answer questions based on the information provided on this website. What would you like to know?";

    const lowerCasePrompt = prompt.toLowerCase();

    if (lowerCasePrompt.includes("hello") || lowerCasePrompt.includes("hi")) {
        responseText = "Hello! I'm your PoL Data Management Corner assistant. I can help students, researchers, professors, and department heads at PoL EXC TU Dresden with questions about data management, tools, and regulations. What's on your mind?";
    } else if (lowerCasePrompt.includes("how to store data") || lowerCasePrompt.includes("data storage options")) {
        responseText = "For data storage, you have options like Cloud Storage (for accessibility and syncing), Local Backup (for control and speed), or a Hybrid Approach combining both. OwnCloud TUD is a recommended tool for secure cloud storage for TU Dresden users. You can find more details on the Data Storage & Backup page: data-storage-backup.html";
    } else if (lowerCasePrompt.includes("upcoming events") || lowerCasePrompt.includes("data science events")) {
        responseText = "The 'Events' page lists upcoming data science and genomics events. For example, in August 2025, there are events on 'Drosophila genetics and genomics' and 'Light sheet microscopy'. In November, the 'Cytodata Symposium' is scheduled. Check out the full list here: Events.html";
    } else if (lowerCasePrompt.includes("gdpr") || lowerCasePrompt.includes("data regulations")) {
        responseText = "The 'EU & German Data Regulations' page covers important topics like GDPR for Research, DFG General Guidelines, and Data Anonymization. It's crucial for understanding the legal framework for data processing. More information is available at: data-management-regulations.html";
    } else if (lowerCasePrompt.includes("share data") || lowerCasePrompt.includes("data sharing")) {
        responseText = "Data sharing guidelines focus on making your research data accessible to the scientific community. Recommended repositories include Zenodo (a general-purpose open-access repository by CERN: https://zenodo.org/), OpARA (TU Dresden's open-access data repository), and Figshare (for publishing data, figures, and research outputs: https://figshare.com/). You can explore these options on the Data Sharing & Archiving page: data-sharing-archiving.html";
    } else if (lowerCasePrompt.includes("archive data") || lowerCasePrompt.includes("data archiving")) {
        responseText = "Data archiving policies cover long-term data preservation. The FAIR Principles (Findable, Accessible, Interoperable, Reusable) are key to ensuring your archived data is usable. Repositories like Zenodo and Figshare also support archiving. More details are on the Data Sharing & Archiving page: data-sharing-archiving.html";
    } else if (lowerCasePrompt.includes("what's new") || lowerCasePrompt.includes("new tools")) {
        responseText = "The 'What's New' page highlights advancements in data science, AI, and research tools, including AI Usage in Python, Recent 2025 LLM Tools, and Big Data Open Source Tools. You can visit the page for specific links and details: whats-new.html";
    } else if (lowerCasePrompt.includes("resources")) {
        responseText = "The 'Resources' page provides comprehensive information on Data Management Regulations, Data Storage & Backup, and Data Sharing & Archiving. It's a great starting point for any data management queries: resources.html";
    } else if (lowerCasePrompt.includes("contact") || lowerCasePrompt.includes("get in touch")) {
        responseText = "You can get in touch with the data management team for assistance. Please refer to the contact section on the main page for details.";
    } else if (lowerCasePrompt.includes("dmp") || lowerCasePrompt.includes("data management plan")) {
        responseText = "Developing a Data Management Plan (DMP) is a key consideration for researchers under EU & German Data Regulations. It helps outline how data will be handled throughout a project. More on this: data-management-regulations.html";
    } else if (lowerCasePrompt.includes("interoperability standards")) {
        responseText = "The 'EU & German Data Regulations' page mentions interoperability standards like FHIR (Fast Healthcare Interoperability Resources), UCUM (Unified Code for Units of Measure), and LOINC (Logical Observation Identifiers Names and Codes) for consistent data exchange. SNOMED CT is also covered. Find details here: data-management-regulations.html";
    } else if (lowerCasePrompt.includes("owncloud tud")) {
        responseText = "OwnCloud TUD is a recommended tool for secure cloud storage for TU Dresden users, offering accessibility and syncing benefits. You can find more about it on the Data Storage & Backup page: data-storage-backup.html";
    } else if (lowerCasePrompt.includes("zenodo")) {
        responseText = "Zenodo is a general-purpose open-access repository by CERN, providing persistent identifiers (DOIs). It's a recommended tool for data sharing and archiving: https://zenodo.org/. See more on the Data Sharing & Archiving page: data-sharing-archiving.html";
    } else if (lowerCasePrompt.includes("figshare")) {
        responseText = "Figshare is an online repository for researchers to publish data, figures, and research outputs with DOIs: https://figshare.com/. It's listed as a recommended tool for data sharing and archiving. Check the Data Sharing & Archiving page for context: data-sharing-archiving.html";
    } else {
        // Fallback to a more helpful general response if no specific keyword is matched
        responseText = "I'm designed to provide information from the PoL Data Management Corner website. Could you please ask about specific topics like 'data storage', 'events', 'data regulations', or 'data sharing'? I can also guide you to relevant pages.";
    }

    // Simulate a slight delay for a more natural feel
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    return responseText;
}

// Function to initialize the chatbot UI and functionality
function initializeChatbot() {
    // Create chatbot button
    const chatbotButton = document.createElement('button');
    chatbotButton.id = 'chatbot-toggle-button';
    // Changed icon to 'fa-comments' and background to 'secondary-violet'
    chatbotButton.className = 'fixed bottom-4 right-4 bg-secondary-violet text-white rounded-full p-4 shadow-lg hover:bg-primary-blue transition-all duration-300 z-[1000] focus:outline-none focus:ring-2 focus:ring-secondary-violet focus:ring-offset-2';
    // Replaced Font Awesome icon with inline SVG for a 'Radar' icon
    chatbotButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radar">
            <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
            <path d="M17.66 6.34a8 8 0 0 0-11.32 0" />
            <path d="M16.24 7.76a6 6 0 0 0-8.48 0" />
            <path d="M14.83 9.17a4 4 0 0 0-5.66 0" />
            <path d="M12 2v20" />
            <path d="M22 12h-4" />
            <path d="M2 12h4" />
            <path d="M12 22V2" />
        </svg>
    `;
    document.body.appendChild(chatbotButton);

    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.className = 'fixed bottom-20 right-4 w-80 h-96 bg-white dark:bg-dark-surface rounded-xl shadow-2xl flex flex-col hidden z-[1000] border border-gray-200 dark:border-gray-700';
    chatbotContainer.style.transition = 'all 0.3s ease-in-out';
    chatbotContainer.style.transform = 'scale(0.9)';
    chatbotContainer.style.opacity = '0';

    chatbotContainer.innerHTML = `
        <div class="flex justify-between items-center bg-secondary-violet text-white p-4 rounded-t-xl shadow-md">
            <h3 class="font-bold text-lg">PoL Chatbot</h3>
            <button id="chatbot-close-button" class="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>
        <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto text-sm space-y-3 dark:text-gray-200 custom-scrollbar">
            <div class="flex justify-start items-start">
                <div class="flex-shrink-0 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radar text-secondary-violet dark:text-primary-blue">
                        <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
                        <path d="M17.66 6.34a8 8 0 0 0-11.32 0" />
                        <path d="M16.24 7.76a6 6 0 0 0-8.48 0" />
                        <path d="M14.83 9.17a4 4 0 0 0-5.66 0" />
                        <path d="M12 2v20" />
                        <path d="M22 12h-4" />
                        <path d="M2 12h4" />
                        <path d="M12 22V2" />
                    </svg>
                </div>
                <div class="bg-gray-200 dark:bg-dark-card p-3 rounded-r-xl rounded-bl-xl max-w-[85%] shadow-sm">Hello! I'm your PoL Data Management Corner assistant. How can I help you today?</div>
            </div>
        </div>
        <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center bg-white dark:bg-dark-surface rounded-b-xl">
            <input type="text" id="chatbot-input" placeholder="Ask me anything..." class="flex-1 p-2 rounded-lg border border-gray-300 dark:bg-dark-card dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary-violet text-sm">
            <button id="chatbot-send-button" class="ml-2 bg-secondary-violet text-white p-2.5 rounded-lg hover:bg-violet-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-violet focus:ring-offset-2">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    `;
    document.body.appendChild(chatbotContainer);

    const messagesContainer = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendButton = document.getElementById('chatbot-send-button');
    const chatbotCloseButton = document.getElementById('chatbot-close-button');

    let isChatbotOpen = false;

    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        isChatbotOpen = !isChatbotOpen;
        if (isChatbotOpen) {
            chatbotContainer.classList.remove('hidden');
            setTimeout(() => {
                chatbotContainer.style.transform = 'scale(1)';
                chatbotContainer.style.opacity = '1';
                chatbotInput.focus(); // Focus input when opened
            }, 10); // Small delay for transition
        } else {
            chatbotContainer.style.transform = 'scale(0.9)';
            chatbotContainer.style.opacity = '0';
            setTimeout(() => {
                chatbotContainer.classList.add('hidden');
            }, 300); // Match transition duration
        }
    });

    chatbotCloseButton.addEventListener('click', () => {
        isChatbotOpen = false;
        chatbotContainer.style.transform = 'scale(0.9)';
        chatbotContainer.style.opacity = '0';
        setTimeout(() => {
            chatbotContainer.classList.add('hidden');
        }, 300);
    });

    // Function to add a message to the chat window
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'user' ? 'justify-end items-start' : 'justify-start items-start'}`;

        let contentHtml = text;
        // Regex to find URLs and convert them to clickable links
        const urlRegex = /(https?:\/\/[^\s]+|\b\w+\.html\b)/g;
        contentHtml = contentHtml.replace(urlRegex, (match) => {
            // Prepend 'http://' if the link is a local .html file without a protocol
            const href = match.startsWith('http') ? match : `./${match}`;
            return `<a href="${href}" target="_blank" class="text-blue-500 dark:text-blue-300 hover:underline">${match}</a>`;
        });

        // Use the new Radar SVG for the bot icon
        const botIconSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radar text-secondary-violet dark:text-primary-blue">
                <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
                <path d="M17.66 6.34a8 8 0 0 0-11.32 0" />
                <path d="M16.24 7.76a6 6 0 0 0-8.48 0" />
                <path d="M14.83 9.17a4 4 0 0 0-5.66 0" />
                <path d="M12 2v20" />
                <path d="M22 12h-4" />
                <path d="M2 12h4" />
                <path d="M12 22V2" />
            </svg>
        `;
        const senderIcon = sender === 'user' ? '<i class="fa-solid fa-user-circle text-lg text-gray-600 dark:text-gray-400"></i>' : botIconSvg;
        const messageBubbleClass = sender === 'user' ? 'bg-primary-blue text-white rounded-l-xl rounded-tr-xl' : 'bg-gray-200 dark:bg-dark-card dark:text-gray-200 rounded-r-xl rounded-bl-xl';
        const iconMargin = sender === 'user' ? 'ml-2' : 'mr-2';

        messageDiv.innerHTML = `
            ${sender === 'user' ? '' : `<div class="flex-shrink-0 ${iconMargin}">${senderIcon}</div>`}
            <div class="${messageBubbleClass} p-3 max-w-[85%] shadow-sm">
                ${contentHtml}
            </div>
            ${sender === 'user' ? `<div class="flex-shrink-0 ${iconMargin}">${senderIcon}</div>` : ''}
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
    }

    // Handle sending messages
    async function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        chatbotInput.value = '';

        // Add a typing indicator
        const typingIndicatorDiv = document.createElement('div');
        typingIndicatorDiv.className = 'flex justify-start items-start';
        typingIndicatorDiv.innerHTML = `
            <div class="flex-shrink-0 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radar text-secondary-violet dark:text-primary-blue">
                    <path d="M19.07 4.93a10 10 0 0 0-14.14 0" />
                    <path d="M17.66 6.34a8 8 0 0 0-11.32 0" />
                    <path d="M16.24 7.76a6 6 0 0 0-8.48 0" />
                    <path d="M14.83 9.17a4 4 0 0 0-5.66 0" />
                    <path d="M12 2v20" />
                    <path d="M22 12h-4" />
                    <path d="M2 12h4" />
                    <path d="M12 22V2" />
                </svg>
            </div>
            <div class="bg-gray-200 dark:bg-dark-card dark:text-gray-200 p-3 rounded-r-xl rounded-bl-xl max-w-[85%] shadow-sm">
                <span class="animate-blink">Typing...</span>
            </div>
        `;
        messagesContainer.appendChild(typingIndicatorDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const aiResponse = await callGeminiAPI(userMessage);

        messagesContainer.removeChild(typingIndicatorDiv); // Remove typing indicator
        addMessage(aiResponse, 'ai');
    }

    chatbotSendButton.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add Tailwind CSS dark mode classes to the chatbot elements on initialization
    const htmlTag = document.documentElement;
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        htmlTag.classList.add('dark');
        // Ensure dynamically created elements also respect dark mode if needed
        // (already handled by dark: classes in innerHTML, but useful for direct manipulation)
    }
}

// Initialize the chatbot when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeChatbot);
