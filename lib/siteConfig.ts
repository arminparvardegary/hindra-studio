// Site-wide configuration for dynamic data
// This file serves as the single source of truth for all dynamic content

export const siteConfig = {
    // Company Info
    company: {
        name: "Hindra Studio",
        tagline: "Your Brand, Our Mission",
        foundedYear: 2017,
        location: "New Jersey, USA",
        email: "hello@hindra.studio",
    },

    // Stats - Update these to reflect current numbers
    stats: {
        liveProducts: 1,
        foundedYear: 2017,
        happyCustomers: 500,
        projectsCompleted: 50,
        yearsOfExperience: new Date().getFullYear() - 2017,
    },

    // Own Products (built by Hindra)
    ownProducts: [
        {
            id: "scriptra",
            name: "Scriptra",
            description: "AI-powered content creation platform",
            fullDescription: "The ultimate AI tool for creators, marketers, and brands to generate high-converting hooks, captions, and viral content.",
            url: "https://scriptra.space",
            image: "/images/portfolio/scriptra-hero.png",
            color: "#6366f1",
            tags: ["AI Platform", "SaaS", "Content Creation"],
        },
    ],

    // Client Projects (built for clients)
    clients: [
        {
            id: "rush-photos",
            name: "Rush Photos",
            description: "Product photography from $25",
            fullDescription: "Professional product photography service with 3-5 day delivery and unlimited revisions.",
            url: "https://rush.photos",
            image: "/images/rush-photos-hero.jpg",
            color: "#DCDFFF",
            tags: ["Product Photography", "E-commerce"],
        },
        {
            id: "rush-video",
            name: "Rush Video",
            description: "AI product videos",
            fullDescription: "AI-powered product video service creating cinematic videos that convert.",
            url: "https://rush.video",
            image: "/images/rush-video-hero.jpg",
            color: "#E9DCC8",
            tags: ["AI Video", "Product Videos"],
        },
        {
            id: "rush-boxes",
            name: "Rush Boxes",
            description: "Custom packaging solutions",
            fullDescription: "Custom packaging solutions for brands with instant quotes and fast delivery.",
            url: "https://rushboxes.com",
            image: "/images/portfolio/rush-boxes-hero.png",
            color: "#f59e0b",
            tags: ["Custom Packaging", "E-commerce", "B2B"],
        },
    ],

    // Social Links
    socials: [
        { name: "LinkedIn", url: "https://linkedin.com/company/hindra-studio", icon: "/linkedin.svg", hoverColor: "hover:bg-blue-100" },
        { name: "YouTube", url: "https://youtube.com/@hindrastudio", icon: "/youtube.svg", hoverColor: "hover:bg-red-100" },
        { name: "Instagram", url: "https://instagram.com/hindrastudio", icon: "/instagram.svg", hoverColor: "hover:bg-pink-100" },
        { name: "Behance", url: "https://behance.net/hindrastudio", icon: "/behance.svg", hoverColor: "hover:bg-blue-100" },
        { name: "Dribbble", url: "https://dribbble.com/hindrastudio", icon: "/dribbble.svg", hoverColor: "hover:bg-pink-100" },
        { name: "X", url: "https://twitter.com/hindrastudio", icon: null, hoverColor: "hover:bg-gray-200" },
    ],

    // FAQs
    faqs: [
        {
            question: "What is Hindra Studio?",
            answer: "Hindra Studio is a creative digital agency that builds innovative products. We create SaaS platforms, e-commerce services, and digital solutions.",
        },
        {
            question: "What products have you built?",
            answer: "We've built Scriptra, an AI-powered content creation platform. We also work with clients like Rush Photos, Rush Video, and Rush Boxes.",
        },
        {
            question: "Where are you located?",
            answer: "We're based in New Jersey, USA, but serve customers worldwide through our digital products.",
        },
        {
            question: "How can I work with you?",
            answer: "Get in touch through our contact page. We'll discuss your project requirements and create a custom solution for your needs.",
        },
    ],

    // Services
    services: [
        {
            title: "Web Design",
            description: "Beautiful, responsive websites that convert visitors into customers.",
        },
        {
            title: "Web Development",
            description: "Full-stack development with modern technologies like Next.js and React.",
        },
        {
            title: "UI/UX Design",
            description: "User-centered design that creates intuitive and engaging experiences.",
        },
        {
            title: "Branding",
            description: "Complete brand identity including logos, colors, and guidelines.",
        },
        {
            title: "SaaS Development",
            description: "End-to-end SaaS product development from idea to launch.",
        },
        {
            title: "AI Integration",
            description: "Integrate AI capabilities into your products and workflows.",
        },
    ],

    // Team Members
    team: [
        {
            name: "Armin Parvardegary",
            role: "Founder, Project Manager",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            links: {
                linkedin: "https://linkedin.com/in/armin",
                twitter: "https://twitter.com/armin",
            }
        },
        {
            name: "Moein Abdollahi",
            role: "Co-Founder & AI Developer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            links: {
                linkedin: "https://linkedin.com/in/moein",
                twitter: "https://twitter.com/moein",
            }
        },
        {
            name: "Mehdi Saharkhiz",
            role: "Creative Director",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
            links: {
                linkedin: "https://linkedin.com/in/mehdi",
                twitter: "https://twitter.com/mehdi",
            }
        },
        {
            name: "Mojtaba Esparipour",
            role: "Developer",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
            links: {
                linkedin: "https://linkedin.com/in/mojtaba",
                twitter: "https://twitter.com/mojtaba",
            }
        },
    ],
};

// Helper functions
export function getStats() {
    return siteConfig.stats;
}

export function getOwnProducts() {
    return siteConfig.ownProducts;
}

export function getClients() {
    return siteConfig.clients;
}

export function getAllProjects() {
    return [...siteConfig.ownProducts, ...siteConfig.clients];
}

export function getProjectById(id: string) {
    return getAllProjects().find(p => p.id === id);
}

export function getSocials() {
    return siteConfig.socials;
}

export function getFaqs() {
    return siteConfig.faqs;
}

export function getServices() {
    return siteConfig.services;
}

export default siteConfig;
