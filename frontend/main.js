// Sample Data
const sampleJobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        type: "Full-time",
        experience: "senior",
        salary: { min: 120000, max: 180000 },
        description: "Join our innovative team building cutting-edge software solutions. We're looking for a senior developer with expertise in modern web technologies.",
        skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "AWS"],
        remote: true,
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Product Designer",
        company: "Design Studio",
        location: "New York, NY",
        type: "Full-time",
        experience: "mid",
        salary: { min: 80000, max: 120000 },
        description: "Create beautiful and intuitive user experiences for our growing product portfolio. Work with cross-functional teams to deliver exceptional designs.",
        skills: ["Figma", "Sketch", "Prototyping", "User Research", "Design Systems"],
        remote: false,
        posted: "1 day ago"
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "AI Innovations",
        location: "Remote",
        type: "Full-time",
        experience: "mid",
        salary: { min: 100000, max: 150000 },
        description: "Analyze complex datasets and build machine learning models to drive business insights and decision making.",
        skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
        remote: true,
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "Frontend Developer",
        company: "StartupXYZ",
        location: "Austin, TX",
        type: "Full-time",
        experience: "entry",
        salary: { min: 60000, max: 90000 },
        description: "Build responsive web applications using modern frontend frameworks. Great opportunity for growth in a dynamic startup environment.",
        skills: ["HTML", "CSS", "JavaScript", "Vue.js", "Tailwind CSS"],
        remote: true,
        posted: "1 week ago"
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudTech Solutions",
        location: "Seattle, WA",
        type: "Full-time",
        experience: "senior",
        salary: { min: 110000, max: 160000 },
        description: "Manage cloud infrastructure and deployment pipelines. Ensure high availability and scalability of our services.",
        skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
        remote: true,
        posted: "5 days ago"
    },
    {
        id: 6,
        title: "Marketing Manager",
        company: "Growth Marketing Co.",
        location: "Los Angeles, CA",
        type: "Full-time",
        experience: "mid",
        salary: { min: 70000, max: 100000 },
        description: "Lead marketing campaigns and strategies to drive customer acquisition and brand awareness. Work with creative and data teams.",
        skills: ["Digital Marketing", "Analytics", "Content Strategy", "SEO", "Social Media"],
        remote: false,
        posted: "4 days ago"
    }
];

const sampleCompanies = [
    {
        id: 1,
        name: "TechCorp Inc.",
        industry: "Technology",
        description: "Leading technology company focused on innovative software solutions for enterprises.",
        size: "1000-5000",
        locations: ["San Francisco, CA", "New York, NY", "Austin, TX"],
        openJobs: 45
    },
    {
        id: 2,
        name: "Design Studio",
        industry: "Design",
        description: "Creative design agency specializing in user experience and brand identity.",
        size: "50-200",
        locations: ["New York, NY", "Los Angeles, CA"],
        openJobs: 12
    },
    {
        id: 3,
        name: "AI Innovations",
        industry: "Artificial Intelligence",
        description: "Cutting-edge AI research and development company creating the future of technology.",
        size: "200-1000",
        locations: ["Remote", "San Francisco, CA"],
        openJobs: 28
    },
    {
        id: 4,
        name: "StartupXYZ",
        industry: "Fintech",
        description: "Fast-growing fintech startup revolutionizing digital payments and banking.",
        size: "10-50",
        locations: ["Austin, TX"],
        openJobs: 8
    },
    {
        id: 5,
        name: "CloudTech Solutions",
        industry: "Cloud Services",
        description: "Enterprise cloud infrastructure and services provider with global reach.",
        size: "500-1000",
        locations: ["Seattle, WA", "Portland, OR", "Denver, CO"],
        openJobs: 35
    },
    {
        id: 6,
        name: "Growth Marketing Co.",
        industry: "Marketing",
        description: "Full-service marketing agency helping businesses scale and grow their customer base.",
        size: "100-500",
        locations: ["Los Angeles, CA", "San Diego, CA"],
        openJobs: 15
    }
];

const sampleCareerPaths = [
    {
        id: 1,
        title: "Full Stack Development",
        icon: "fas fa-code",
        description: "Master both frontend and backend technologies to become a versatile developer",
        skillGap: "Focus on learning React, Node.js, and database management",
        learningRecommendations: "Complete full-stack bootcamp, build portfolio projects",
        industryTrends: "High demand for full-stack developers, especially with cloud experience",
        careerProgression: "Junior → Mid-level → Senior → Tech Lead → Engineering Manager",
        growthPotential: "Very High"
    },
    {
        id: 2,
        title: "Data Science & Analytics",
        icon: "fas fa-chart-line",
        description: "Transform data into actionable insights using statistical analysis and machine learning",
        skillGap: "Strengthen Python, statistics, and machine learning algorithms",
        learningRecommendations: "Data science certification, Kaggle competitions, statistics courses",
        industryTrends: "Explosive growth in AI/ML roles, high salaries",
        careerProgression: "Analyst → Data Scientist → Senior DS → Principal DS → Head of Data",
        growthPotential: "Very High"
    },
    {
        id: 3,
        title: "Product Management",
        icon: "fas fa-lightbulb",
        description: "Guide product strategy and work with cross-functional teams to deliver value",
        skillGap: "Develop strategic thinking, user research, and stakeholder management",
        learningRecommendations: "Product management courses, user research training, business analysis",
        industryTrends: "Strong demand for product managers in tech companies",
        careerProgression: "Associate PM → PM → Senior PM → Principal PM → VP Product",
        growthPotential: "High"
    },
    {
        id: 4,
        title: "UI/UX Design",
        icon: "fas fa-paint-brush",
        description: "Create intuitive and beautiful user experiences that delight customers",
        skillGap: "Master design tools, user research, and prototyping",
        learningRecommendations: "Design bootcamp, portfolio development, user psychology courses",
        industryTrends: "Growing emphasis on user experience across all industries",
        careerProgression: "Junior Designer → Mid-level → Senior → Lead → Design Director",
        growthPotential: "High"
    },
    {
        id: 5,
        title: "Cloud Engineering",
        icon: "fas fa-cloud",
        description: "Build and maintain scalable cloud infrastructure and services",
        skillGap: "Learn AWS/Azure/GCP, containerization, and infrastructure as code",
        learningRecommendations: "Cloud certifications, DevOps training, hands-on projects",
        industryTrends: "Massive shift to cloud, high demand for cloud expertise",
        careerProgression: "Cloud Engineer → Senior → Architect → Principal → CTO",
        growthPotential: "Very High"
    }
];

// Utility Functions
function getCompanyColor(name) {
    const colors = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        "linear-gradient(135deg, #ff8a80 0%, #ea4c89 100%)"
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}

function formatSalary(min, max) {
    if (!min || !max) return "Salary not disclosed";
    return `$${(min / 1000)}K - $${(max / 1000)}K`;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
}

// Navigation Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${pageId}"]`);
    if (activeLink && !activeLink.classList.contains('btn-primary')) {
        activeLink.classList.add('active');
    }
    
    // Load page-specific content
    if (pageId === 'jobs') {
        loadJobs();
    } else if (pageId === 'companies') {
        loadCompanies();
    } else if (pageId === 'career-advice') {
        loadCareerPaths();
    }
}