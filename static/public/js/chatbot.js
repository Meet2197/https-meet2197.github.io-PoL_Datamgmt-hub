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
// Function to call the Gemini API (mocked for preview)
async function callGeminiAPI(prompt) {
    // This is a mock implementation for the preview.
    // In a real scenario, this would make a fetch call to the Gemini API.
    // For the preview, it just returns a generic response or a simple echo.
    console.log("Mock API call with prompt:", prompt);
    let responseText = "I'm a chatbot for the PoL Data Management Corner. I can answer questions based on the information provided on this website. What would you like to know?";

    // Normalize input for better matching, handling common variations and punctuation
    const lowerCasePrompt = prompt.toLowerCase().replace(/[?!.,;']/g, '').trim();

    // --- General Greetings and Introduction ---
    if (lowerCasePrompt.includes("hello") || lowerCasePrompt.includes("hi") || lowerCasePrompt.includes("hey") || lowerCasePrompt.includes("hallo")) {
        responseText = "Hello! I'm your PoL Data Management Corner AI assistant. What's on your mind?";
    } else if (lowerCasePrompt.includes("who are you") || lowerCasePrompt.includes("what can you do") || lowerCasePrompt.includes("what is your purpose")) {
        responseText = "I am the AI chatbot for the PoL Data Management Corner. I can provide information on data management regulations, storage, sharing, archiving, upcoming events, and relevant tools mentioned on this website. Just ask me a question!";
    } else if (lowerCasePrompt.includes("what is this site about") || lowerCasePrompt.includes("purpose of this website") || lowerCasePrompt.includes("about this site")) {
        responseText = "This website, the PoL Data Management Corner at Physics of Life (PoL) and TU Dresden (TUD).How can I help you?";
    }

    // --- "What is..." questions (expanded) ---
    else if (lowerCasePrompt.includes("what is pol data management corner") || lowerCasePrompt.includes("what is pol dmc") || lowerCasePrompt.includes("what is po l dmc")) {
        responseText = "The PoL Data Management Corner is a central hub for research data management at Physics of Life (PoL) and TU Dresden (TUD). It offers guides, best practices, and tools for the entire research data lifecycle. Visit the <a href='./index.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>homepage</a> for more.";
    } else if (lowerCasePrompt.includes("what is a dmp") || lowerCasePrompt.includes("what is data management plan") || lowerCasePrompt.includes("what dmp is")) {
        responseText = "A Data Management Plan (DMP) is a document outlining how data will be handled throughout a research project, covering aspects like collection, storage, sharing, and archiving. It's a key consideration under EU & German Data Regulations. Learn more on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Management Regulations page</a>.";
    } else if (lowerCasePrompt.includes("what are fair principles") || lowerCasePrompt.includes("what fair")) {
        responseText = "The FAIR Principles ensure data is Findable, Accessible, Interoperable, and Reusable. Adhering to these principles is crucial for effective data sharing and archiving. Find details on the <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a>.";
    } else if (lowerCasePrompt.includes("what is zenodo") || lowerCasePrompt.includes("info on zenodo") || lowerCasePrompt.includes("about zenodo")) {
        responseText = "Zenodo is a general-purpose open-access repository by CERN, providing persistent identifiers (DOIs) for research data. It's recommended for data sharing and archiving. Official website: <a href='https://zenodo.org/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://zenodo.org/</a>. More info: <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-sharing-archiving.html</a>.";
    } else if (lowerCasePrompt.includes("what is figshare") || lowerCasePrompt.includes("info on figshare") || lowerCasePrompt.includes("about figshare")) {
        responseText = "Figshare is an online repository for researchers to publish data, figures, and research outputs with DOIs. Official website: <a href='https://figshare.com/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://figshare.com/</a>. It's a recommended tool for data sharing and archiving: <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-sharing-archiving.html</a>.";
    } else if (lowerCasePrompt.includes("what is owncloud tud") || lowerCasePrompt.includes("owncloud for tud") || lowerCasePrompt.includes("tud cloud storage")) {
        responseText = "OwnCloud TUD is a recommended tool for secure cloud storage specifically for TU Dresden users. It offers benefits like accessibility and syncing. Find more details on the <a href='./data-storage-backup.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Storage & Backup page</a>.";
    } else if (lowerCasePrompt.includes("what are the latest llm tools") || lowerCasePrompt.includes("latest llm") || lowerCasePrompt.includes("new llm tools")) {
        responseText = "The 'What's New' page highlights Recent 2025 LLM Tools. You can find more information and links on this topic here: <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>whats-new.html</a> (e.g., <a href='https://datacamp.com/blog/llmops-tools' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>datacamp.com/blog/llmops-tools</a>).";
    } else if (lowerCasePrompt.includes("what is gdpr for research") || lowerCasePrompt.includes("gdpr research") || lowerCasePrompt.includes("gdpr and research")) {
        responseText = "GDPR for Research refers to the General Data Protection Regulation's application to scientific research, outlining the legal framework for processing personal data. It's covered under EU & German Data Regulations: <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-management-regulations.html</a>.";
    } else if (lowerCasePrompt.includes("what are big data open source tools") || lowerCasePrompt.includes("open source big data tools")) {
        responseText = "The 'What's New' page features information on Big Data Open Source Tools. You can explore relevant resources and links on this topic: <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>whats-new.html</a> (e.g., <a href='https://opensource.com/resources/big-data' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>opensource.com/resources/big-data</a>).";
    } else if (lowerCasePrompt.includes("what is opara") || lowerCasePrompt.includes("what is op ara")) {
        responseText = "OpARA is the open-access data repository at TU Dresden, recommended for data sharing and archiving. You can find it mentioned on the <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a>. For TU Dresden's official OpARA site, you might check the <a href='https://tu-dresden.de/forschung/services-forschende/forschungsdatenmanagement' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>TU Dresden Research Data Management page</a>.";
    } else if (lowerCasePrompt.includes("what are interoperability standards") || lowerCasePrompt.includes("interoperability standards")) {
        responseText = "Interoperability standards like FHIR, UCUM, LOINC, and SNOMED CT are crucial for consistent data exchange and management, especially in specific fields like health data. They are discussed on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>EU & German Data Regulations page</a>.";
    } else if (lowerCasePrompt.includes("what is the 3-2-1 backup strategy") || lowerCasePrompt.includes("3-2-1 backup")) {
        responseText = "The 3-2-1 backup strategy is a robust approach mentioned on the <a href='./data-storage-backup.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Storage & Backup page</a>. It recommends having at least 3 copies of your data, stored on 2 different types of media, with 1 copy off-site for disaster recovery.";
    } else if (lowerCasePrompt.includes("what are the main resources") || lowerCasePrompt.includes("main resources")) {
        responseText = "The main resources provided by the PoL Data Management Corner include Data Management Regulations, Data Storage & Backup, and Data Sharing & Archiving. You can explore them on the <a href='./resources.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Resources page</a>.";
    } else if (lowerCasePrompt.includes("what is metadata management") || lowerCasePrompt.includes("metadata")) {
        responseText = "Metadata Management is crucial for making data Findable and Interoperable (part of FAIR Principles). It involves creating and maintaining descriptive information about your data. This is covered in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' section</a>.";
    } else if (lowerCasePrompt.includes("what is image data management") || lowerCasePrompt.includes("image data")) {
        responseText = "Image Data Management is a specific topic addressed under EU & German Data Regulations, highlighting best practices for handling image-based research data. You can find more details here: <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-management-regulations.html</a>.";
    } else if (lowerCasePrompt.includes("what is fhir")) {
        responseText = "FHIR (Fast Healthcare Interoperability Resources) is an interoperability standard mentioned in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a>, primarily for health data exchange.";
    } else if (lowerCasePrompt.includes("what is ucum")) {
        responseText = "UCUM (Unified Code for Units of Measure) is an interoperability standard mentioned in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a>, used for consistent measurement units.";
    } else if (lowerCasePrompt.includes("what is loinc")) {
        responseText = "LOINC (Logical Observation Identifiers Names and Codes) is an interoperability standard mentioned in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a>, used for medical lab results.";
    } else if (lowerCasePrompt.includes("what is snomed ct")) {
        responseText = "SNOMED CT is a globally recognized clinical terminology for electronic health records, covered under the interoperability standards in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a>.";
    } else if (lowerCasePrompt.includes("what is the pol exc")) {
        responseText = "PoL EXC refers to the Physics of Life Excellence Cluster at TU Dresden. The PoL Data Management Corner provides dedicated resources for data management within this cluster and the broader TU Dresden community. You can find more about PoL on their official website: <a href='https://physics-of-life.tu-dresden.de/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://physics-of-life.tu-dresden.de/</a>.";
    }

    // --- "How can I..." questions (expanded) ---
    else if (lowerCasePrompt.includes("how can i store my data") || lowerCasePrompt.includes("how to store data") || lowerCasePrompt.includes("storing data")) {
        responseText = "You have several options for data storage: Cloud Storage (for accessibility), Local Backup (for control), or a Hybrid Approach (combining both). OwnCloud TUD is a recommended tool for TU Dresden users. Details are on the <a href='./data-storage-backup.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Storage & Backup page</a>.";
    } else if (lowerCasePrompt.includes("how can i share my data") || lowerCasePrompt.includes("how to share data") || lowerCasePrompt.includes("sharing data")) {
        responseText = "To share your data effectively, consider using recommended repositories like Zenodo (<a href='https://zenodo.org/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://zenodo.org/</a>), OpARA (TU Dresden's repository), or Figshare (<a href='https://figshare.com/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://figshare.com/</a>). Adhering to FAIR Principles is also key. More guidance is on the <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a>.";
    } else if (lowerCasePrompt.includes("how can i archive my data") || lowerCasePrompt.includes("how to archive data") || lowerCasePrompt.includes("archiving data")) {
        responseText = "For long-term data preservation, you should follow data archiving policies. Repositories like Zenodo (<a href='https://zenodo.org/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://zenodo.org/</a>) and Figshare (<a href='https://figshare.com/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://figshare.com/</a>) are suitable for archiving. The <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a> provides more details.";
    } else if (lowerCasePrompt.includes("how to create a dmp") || lowerCasePrompt.includes("how to make dmp") || lowerCasePrompt.includes("creating a dmp")) {
        responseText = "While this chatbot doesn't create DMPs directly, the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a> highlights developing a Data Management Plan as a key consideration for researchers. This page will guide you on the important aspects to include.";
    } else if (lowerCasePrompt.includes("how to find open source information") || lowerCasePrompt.includes("open source info") || lowerCasePrompt.includes("where to get open source data")) {
        responseText = "For open-source information related to data science tools, you can often find resources on platforms like GitHub or dedicated open-source communities. For example, the 'What's New' page links to 'Big Data Open Source Tools' on <a href='https://opensource.com/resources/big-data' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>opensource.com</a>: <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>whats-new.html</a>. Always check the official project websites or GitHub repositories for specific tools.";
    } else if (lowerCasePrompt.includes("how to get help with data management") || lowerCasePrompt.includes("who to contact for data management")) {
        responseText = "You can get in touch with the data management team for assistance. Please refer to the contact information usually found on the <a href='./index.html#contact' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>main page's contact section</a>.";
    } else if (lowerCasePrompt.includes("how to comply with gdpr")) {
        responseText = "Complying with GDPR involves understanding regulations around data processing, anonymization, and ethical clearances. The <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a> provides key considerations for researchers.";
    }

    // --- "Where can I..." questions (expanded) ---
    else if (lowerCasePrompt.includes("where can i find upcoming events") || lowerCasePrompt.includes("where are events") || lowerCasePrompt.includes("upcoming events")) {
        responseText = "You can find a list of upcoming data science and genomics events on the <a href='./Events.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'Events' page</a>. This includes workshops, seminars, and talks.";
    } else if (lowerCasePrompt.includes("where can i find data regulations") || lowerCasePrompt.includes("where are regulations") || lowerCasePrompt.includes("data regulation info")) {
        responseText = "Information on EU & German Data Regulations, including GDPR for Research and DFG Guidelines, is available on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'Data Management Regulations' page</a>.";
    } else if (lowerCasePrompt.includes("where can i learn about ai usage in python") || lowerCasePrompt.includes("ai in python learning")) {
        responseText = "The <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'What's New' page</a> provides links and information on AI Usage in Python, such as resources from <a href='https://koshurai.medium.com/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>koshurai.medium.com</a>. You can check that page for more.";
    } else if (lowerCasePrompt.includes("where is pol dmc located") || lowerCasePrompt.includes("pol dmc location")) {
        responseText = "The PoL Data Management Corner is a central hub for research data management at Physics of Life (PoL) and TU Dresden. While the website provides resources, for physical location or direct contact, please refer to the contact information on the <a href='./index.html#contact' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>main page's contact section</a>.";
    } else if (lowerCasePrompt.includes("where can i find tud policies") || lowerCasePrompt.includes("tud data policies")) {
        responseText = "For official TU Dresden data policies, you should refer to the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a> which covers relevant guidelines. You can also visit the official TU Dresden website for research data management: <a href='https://tu-dresden.de/forschung/services-forschende/forschungsdatenmanagement' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://tu-dresden.de/forschung/services-forschende/forschungsdatenmanagement</a>.";
    } else if (lowerCasePrompt.includes("where can i find cmcb resources")) {
        responseText = "While this site focuses on PoL and TU Dresden, general data management principles apply. For specific CMCB resources, you might consult their official website or direct data management contacts. A general link for CMCB is <a href='https://www.tu-dresden.de/cmcb' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://www.tu-dresden.de/cmcb</a>.";
    }

    // --- "Why..." questions (expanded) ---
    else if (lowerCasePrompt.includes("why is data management important") || lowerCasePrompt.includes("importance of data management") || lowerCasePrompt.includes("why data management")) {
        responseText = "Effective data management is crucial for ensuring the integrity, accessibility, and reusability of research data throughout its lifecycle. It helps comply with regulations, promotes reproducibility, and maximizes the impact of your research.";
    } else if (lowerCasePrompt.includes("why use zenodo") || lowerCasePrompt.includes("benefits of zenodo") || lowerCasePrompt.includes("why zenodo")) {
        responseText = "Zenodo provides persistent identifiers (DOIs) for your research data, making it citable and discoverable. It's a general-purpose open-access repository, suitable for a wide range of research outputs, ensuring long-term access. Official website: <a href='https://zenodo.org/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://zenodo.org/</a>.";
    } else if (lowerCasePrompt.includes("why are fair principles important") || lowerCasePrompt.includes("why fair")) {
        responseText = "FAIR Principles are important because they make data Findable, Accessible, Interoperable, and Reusable. This enhances the value of research data, promotes collaboration, and allows for greater scientific discovery and reproducibility. See <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-sharing-archiving.html</a> for more.";
    } else if (lowerCasePrompt.includes("why is a dmp needed")) {
        responseText = "A DMP is needed to systematically plan how your research data will be handled, ensuring compliance with regulations, promoting data quality, and facilitating future reuse. It's a requirement for many funding bodies. More on <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-management-regulations.html</a>.";
    }

    // --- "When..." questions (expanded) ---
    else if (lowerCasePrompt.includes("when are the next events") || lowerCasePrompt.includes("when is the next workshop") || lowerCasePrompt.includes("next events")) {
        responseText = "Upcoming events are listed on the <a href='./Events.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'Events' page</a>. For example, in August 2025, there are events on 'Drosophila genetics and genomics' and 'Light sheet microscopy'. The 'Cytodata Symposium' is in November 2025.";
    } else if (lowerCasePrompt.includes("when was this site updated") || lowerCasePrompt.includes("site update date")) {
        responseText = "The 'What's New' section provides updates on advancements in data science, AI, and research tools, indicating ongoing updates to the content and information provided on the site: <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>whats-new.html</a>.";
    } else if (lowerCasePrompt.includes("when should i create a dmp")) {
        responseText = "It's best to create a DMP at the beginning of your research project, often as part of the grant application process. This ensures data management is planned from the outset. Refer to <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-management-regulations.html</a> for more.";
    }

    // --- "Who..." questions (expanded) ---
    else if (lowerCasePrompt.includes("who is this chatbot for") || lowerCasePrompt.includes("target audience") || lowerCasePrompt.includes("who can use this chatbot")) {
        responseText = "This chatbot is designed to assist students, researchers, professors, and heads of departments at PoL EXC TU Dresden with their data management queries.";
    } else if (lowerCasePrompt.includes("who can i contact for help") || lowerCasePrompt.includes("contact person for data management")) {
        responseText = "You can get in touch with the data management team for assistance. Please refer to the contact information usually found on the <a href='./index.html#contact' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>main page's contact section</a>.";
    } else if (lowerCasePrompt.includes("who is responsible for data management at tud")) {
        responseText = "At TU Dresden, responsibility for data management often lies with individual researchers and research groups, supported by central services and guidelines provided by the university and initiatives like the PoL Data Management Corner. For official guidelines, see <a href='https://tu-dresden.de/forschung/services-forschende/forschungsdatenmanagement' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>TU Dresden Research Data Management</a>.";
    }

    // --- "Which..." questions (expanded) ---
    else if (lowerCasePrompt.includes("which tools are recommended for storage") || lowerCasePrompt.includes("recommended storage tools") || lowerCasePrompt.includes("best storage options")) {
        responseText = "For data storage, OwnCloud TUD is a recommended tool for secure cloud storage for TU Dresden users. You can find more details on the <a href='./data-storage-backup.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Storage & Backup page</a>.";
    } else if (lowerCasePrompt.includes("which repositories for sharing") || lowerCasePrompt.includes("recommended data repositories") || lowerCasePrompt.includes("best repositories")) {
        responseText = "Recommended data repositories for sharing and archiving include Zenodo (<a href='https://zenodo.org/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://zenodo.org/</a>), OpARA (TU Dresden's open-access data repository), and Figshare (<a href='https://figshare.com/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://figshare.com/</a>). More details are on the <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a>.";
    } else if (lowerCasePrompt.includes("which regulations apply to research data") || lowerCasePrompt.includes("what regulations")) {
        responseText = "The <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a> covers regulations like GDPR for Research and DFG General Guidelines that apply to research data management.";
    } else if (lowerCasePrompt.includes("which events are upcoming")) {
        responseText = "You can find a list of upcoming data science and genomics events on the <a href='./Events.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'Events' page</a>. This includes workshops, seminars, and talks for August, October, and November 2025.";
    }

    // --- TU Dresden / PoL / CMCB specific queries ---
    else if (lowerCasePrompt.includes("data management at tud") || lowerCasePrompt.includes("tud data management") || lowerCasePrompt.includes("tu dresden data management")) {
        responseText = "The PoL Data Management Corner serves as a central hub for research data management at TU Dresden (TUD) and Physics of Life (PoL). It provides guides, tools, and addresses regulations relevant to TUD researchers. You can find more information on the <a href='./index.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>main page</a> or under <a href='./resources.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Resources</a>. Also, check the official TU Dresden Research Data Management page: <a href='https://tu-dresden.de/forschung/services-forschende/forschungsdatenmanagement' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://tu-dresden.de/forschung/services-forschende/forschungsdatenmanagement</a>.";
    } else if (lowerCasePrompt.includes("cmcb data management") || lowerCasePrompt.includes("data management for cmcb") || lowerCasePrompt.includes("cmcb data")) {
        responseText = "While the site focuses on PoL and TU Dresden, the principles of data management, regulations like GDPR, and recommended tools for storage and sharing (like Zenodo and Figshare) are broadly applicable. For specific CMCB guidelines, you might need to consult their internal resources or contact the PoL Data Management team directly via the <a href='./index.html#contact' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>contact section</a> on the main page. A general link for CMCB is <a href='https://www.tu-dresden.de/cmcb' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://www.tu-dresden.de/cmcb</a>.";
    } else if (lowerCasePrompt.includes("pol exc data management") || lowerCasePrompt.includes("data management at pol exc") || lowerCasePrompt.includes("pol exc data")) {
        responseText = "The PoL Data Management Corner is specifically designed as a central resource for research data management at Physics of Life (PoL) and TU Dresden (TUD), including PoL EXC. All the information on regulations, storage, sharing, and tools is directly relevant to researchers within PoL EXC. Start exploring from the <a href='./index.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>main page</a>. You can find more about PoL on their official website: <a href='https://physics-of-life.tu-dresden.de/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://physics-of-life.tu-dresden.de/</a>.";
    }

    // --- Open-ended questions / More general topics ---
    else if (lowerCasePrompt.includes("tell me about data science") || lowerCasePrompt.includes("data science info") || lowerCasePrompt.includes("what is data science")) {
        responseText = "Data science involves extracting knowledge and insights from data. The PoL Data Management Corner keeps you updated on advancements in data science, AI, and research tools in its <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'What's New!?' section</a>. You can also find upcoming data science events on the <a href='./Events.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Events page</a>.";
    } else if (lowerCasePrompt.includes("ethical considerations for data") || lowerCasePrompt.includes("data ethics")) {
        responseText = "Ethical Clearances are a key consideration under EU & German Data Regulations. This involves ensuring data collection and usage adhere to ethical guidelines and privacy standards. More details can be found on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Management Regulations page</a>.";
    } else if (lowerCasePrompt.includes("data anonymization") || lowerCasePrompt.includes("anonymize data")) {
        responseText = "Data Anonymization is an important aspect of data protection, especially under regulations like GDPR. It involves removing or modifying personally identifiable information from datasets. This topic is covered in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' section</a>.";
    } else if (lowerCasePrompt.includes("dfg guidelines") || lowerCasePrompt.includes("about dfg")) {
        responseText = "The DFG General Guidelines (German Research Foundation) are important regulations for data management in Germany, including principles like the 3Rs for animal data. These are detailed on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a>.";
    } else if (lowerCasePrompt.includes("animal data guidelines") || lowerCasePrompt.includes("3rs principle")) {
        responseText = "Animal Data Guidelines, specifically referencing DFG's 3Rs principle (Replacement, Reduction, Refinement), are part of the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations'</a> to ensure ethical handling of animal-related research data.";
    } else if (lowerCasePrompt.includes("open access repositories") || lowerCasePrompt.includes("public data repositories")) {
        responseText = "For open access to research data, recommended repositories include Zenodo (<a href='https://zenodo.org/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://zenodo.org/</a>), OpARA (TU Dresden's open-access data repository), and Figshare (<a href='https://figshare.com/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://figshare.com/</a>). More details are on the <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a>.";
    } else if (lowerCasePrompt.includes("how to get youtube videos on data management")) {
        responseText = "While this site doesn't host YouTube videos directly, you can find many educational videos on data management, data science, and specific tools on YouTube by searching for terms like 'research data management tutorial', 'FAIR data principles explained', or 'Zenodo guide'. Look for content from reputable universities or organizations.";
    } else if (lowerCasePrompt.includes("what is the structure of research data lifecycle")) {
        responseText = "The research data lifecycle typically includes planning, collection, processing, analysis, preservation, sharing, and reuse. The PoL Data Management Corner provides comprehensive guides for this entire lifecycle. See the <a href='./index.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>homepage</a> for an overview.";
    }

    // --- Fallback for general or unhandled queries ---
    else {
        responseText = "I'm designed to provide information from the PoL Data Management Corner website. Could you please ask about specific topics like 'data storage options', 'upcoming events', 'data regulations', 'data sharing', or tools like 'Zenodo' or 'Figshare'?";
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
