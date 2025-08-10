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
function loadJobs(filters = {}) {
    const jobsGrid = document.getElementById('jobs-grid');
    let filteredJobs = [...sampleJobs];
    
    // Apply filters
    if (filters.jobType) {
        filteredJobs = filteredJobs.filter(job => job.type.toLowerCase().includes(filters.jobType.toLowerCase()));
    }
    if (filters.experience) {
        filteredJobs = filteredJobs.filter(job => job.experience === filters.experience);
    }
    if (filters.salary) {
        const minSalary = parseInt(filters.salary.replace('k', '000'));
        filteredJobs = filteredJobs.filter(job => job.salary.min >= minSalary);
    }
    if (filters.query) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.query.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(filters.query.toLowerCase()))
        );
    }
    if (filters.location) {
        filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
    }
    if (filters.remote) {
        filteredJobs = filteredJobs.filter(job => job.remote);
    }
    
    if (filteredJobs.length === 0) {
        jobsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }
    
    jobsGrid.innerHTML = filteredJobs.map(job => `
        <div class="job-card" onclick="showJobDetails(${job.id})">
            <div class="job-header">
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <div class="company">${job.company}</div>
                </div>
                <div class="company-logo" style="background: ${getCompanyColor(job.company)}">
                    ${job.company.charAt(0)}
                </div>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                <span><i class="fas fa-clock"></i> ${job.posted}</span>
                ${job.remote ? '<span class="remote-badge"><i class="fas fa-home"></i> Remote</span>' : ''}
            </div>
            <div class="job-description">
                ${truncateText(job.description, 120)}
            </div>
            <div class="job-skills">
                ${job.skills.slice(0, 4).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                ${job.skills.length > 4 ? `<span class="skill-tag">+${job.skills.length - 4} more</span>` : ''}
            </div>
            <div class="job-footer">
                <div class="salary">${formatSalary(job.salary.min, job.salary.max)}</div>
                <button class="apply-btn" onclick="event.stopPropagation(); applyToJob(${job.id})">
                    Apply Now
                </button>
            </div>
        </div>
    `).join('');
}

function showJobDetails(jobId) {
    const job = sampleJobs.find(j => j.id === jobId);
    if (!job) return;
    
    alert(`Job Details:\n\n${job.title} at ${job.company}\n\nDescription: ${job.description}\n\nSkills: ${job.skills.join(', ')}\n\nSalary: ${formatSalary(job.salary.min, job.salary.max)}\n\nLocation: ${job.location}`);
}

function applyToJob(jobId) {
    const job = sampleJobs.find(j => j.id === jobId);
    if (!job) return;
    
    alert(`Great choice! You're applying for ${job.title} at ${job.company}.\n\nIn a real application, this would open the application form or redirect to the company's careers page.`);
}

// Company Functions
function loadCompanies() {
    const companiesGrid = document.getElementById('companies-grid');
    
    companiesGrid.innerHTML = sampleCompanies.map(company => `
        <div class="company-card" onclick="showCompanyDetails(${company.id})">
            <div class="company-header">
                <div class="company-logo-large" style="background: ${getCompanyColor(company.name)}">
                    ${company.name.charAt(0)}
                </div>
                <div class="company-details">
                    <h3>${company.name}</h3>
                    <div class="industry">${company.industry}</div>
                </div>
            </div>
            <div class="company-description">
                ${truncateText(company.description, 100)}
            </div>
            <div class="company-meta">
                <span><i class="fas fa-users"></i> ${company.size} employees</span>
                <span><i class="fas fa-briefcase"></i> ${company.openJobs} open jobs</span>
            </div>
        </div>
    `).join('');
}

function showCompanyDetails(companyId) {
    const company = sampleCompanies.find(c => c.id === companyId);
    if (!company) return;
    
    alert(`Company Details:\n\n${company.name}\n\nIndustry: ${company.industry}\n\nDescription: ${company.description}\n\nSize: ${company.size} employees\n\nLocations: ${company.locations.join(', ')}\n\nOpen Jobs: ${company.openJobs}`);
}

// Career Path Functions
function loadCareerPaths() {
    const careerPathsGrid = document.querySelector('.career-paths-grid');
    
    careerPathsGrid.innerHTML = sampleCareerPaths.map(path => `
        <div class="career-path-card">
            <div class="career-path-header">
                <div class="career-path-title">
                    <i class="${path.icon}"></i>
                    <h3>${path.title}</h3>
                </div>
                <button class="expand-btn" onclick="toggleCareerPath(${path.id})">
                    <i class="fas fa-chevron-right" id="expand-icon-${path.id}"></i>
                </button>
            </div>
            <div class="career-path-description">
                ${path.description}
            </div>
            <div class="career-path-details" id="details-${path.id}">
                <div class="detail-item">
                    <strong>Skill gap analysis:</strong> ${path.skillGap}
                </div>
                <div class="detail-item">
                    <strong>Learning recommendations:</strong> ${path.learningRecommendations}
                </div>
                <div class="detail-item">
                    <strong>Industry trends:</strong> ${path.industryTrends}
                </div>
                <div class="detail-item">
                    <strong>Career progression:</strong> ${path.careerProgression}
                </div>
                <div class="detail-item">
                    <strong>Growth potential:</strong>
                    <span class="growth-badge ${path.growthPotential.toLowerCase().replace(' ', '-')}">${path.growthPotential}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleCareerPath(pathId) {
    const details = document.getElementById(`details-${pathId}`);
    const icon = document.getElementById(`expand-icon-${pathId}`);
    
    if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        icon.className = 'fas fa-chevron-right';
    } else {
        details.classList.add('expanded');
        icon.className = 'fas fa-chevron-up';
    }
}

// Search and Filter Functions
function performJobSearch() {
    const jobTitle = document.getElementById('job-search').value;
    const location = document.getElementById('location-search').value;
    const remote = document.getElementById('remote').checked;
    const fulltime = document.getElementById('fulltime').checked;
    const entry = document.getElementById('entry').checked;
    
    const filters = {};
    if (jobTitle) filters.query = jobTitle;
    if (location) filters.location = location;
    if (remote) filters.remote = true;
    if (fulltime) filters.jobType = 'Full-time';
    if (entry) filters.experience = 'entry';
    
    // Show jobs page and apply filters
    showPage('jobs');
    loadJobs(filters);
}

function setupJobFilters() {
    const jobTypeFilter = document.getElementById('job-type-filter');
    const experienceFilter = document.getElementById('experience-filter');
    const salaryFilter = document.getElementById('salary-filter');
    
    const applyFilters = () => {
        const filters = {};
        if (jobTypeFilter.value) filters.jobType = jobTypeFilter.value;
        if (experienceFilter.value) filters.experience = experienceFilter.value;
        if (salaryFilter.value) filters.salary = salaryFilter.value;
        
        loadJobs(filters);
    };
    
    jobTypeFilter.addEventListener('change', applyFilters);
    experienceFilter.addEventListener('change', applyFilters);
    salaryFilter.addEventListener('change', applyFilters);
}

// Form Handling
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate login process
            const submitBtn = loginForm.querySelector('.login-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Signing In...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Welcome back! You have been successfully signed in.
                `;
                
                loginForm.insertBefore(successDiv, loginForm.firstChild);
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successDiv.remove();
                }, 3000);
                
            }, 2000);
        });
    }
    
    // Handle social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const linkedinBtn = document.querySelector('.linkedin-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google OAuth login would be implemented here in a real application.');
        });
    }
    
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', function() {
            alert('LinkedIn OAuth login would be implemented here in a real application.');
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });
    
    // Search functionality
    document.querySelector('.search-btn').addEventListener('click', performJobSearch);
    
    // Search on Enter key
    document.getElementById('job-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performJobSearch();
        }
    });
    
    document.getElementById('location-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performJobSearch();
        }
    });
    
    // Setup filters when jobs page is loaded
    setupJobFilters();
    
    // Setup login form
    setupLoginForm();
    
    // Setup resume upload
    setupResumeUpload();
    
    // Setup new homepage functionality
    setupNewHomePage();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Load initial content for home page
    showPage('home');
});

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 10px 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
    
    .growth-badge {
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .growth-badge.very-high {
        background: #dcfce7;
        color: #166534;
    }
    
    .growth-badge.high {
        background: #fef3c7;
        color: #92400e;
    }
    
    .remote-badge {
        background: #e0f2fe;
        color: #0369a1;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
    }
`;
document.head.appendChild(style);

// Resume Upload Functions
function setupResumeUpload() {
    const resumeUpload = document.getElementById('resume-upload');
    const uploadBtn = document.querySelector('.upload-resume-btn');
    
    if (resumeUpload) {
        resumeUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleResumeUpload(file);
            }
        });
    }
}

function handleResumeUpload(file) {
    const uploadBtn = document.querySelector('.upload-resume-btn');
    const originalContent = uploadBtn.innerHTML;
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file.');
        return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
    }
    
    // Show uploading state
    uploadBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        Uploading Resume...
    `;
    uploadBtn.disabled = true;
    
    // Get upload URL from server
    fetch('/api/resumes/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        // Upload file to object storage using presigned URL
        return fetch(data.uploadURL, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            }
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        
        // Show AI analysis state
        uploadBtn.innerHTML = `
            <i class="fas fa-brain"></i>
            AI Analyzing Resume...
        `;
        
        // Simulate AI analysis time
        setTimeout(() => {
            // Show success and redirect to jobs with AI matches
            uploadBtn.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Resume Uploaded Successfully!
            `;
            
            // Show success message
            showUploadSuccess(file.name);
            
            // Reset button after delay
            setTimeout(() => {
                uploadBtn.innerHTML = originalContent;
                uploadBtn.disabled = false;
                // Navigate to jobs page with AI matching filter
                showPage('jobs');
                loadJobsWithAIMatching();
            }, 2000);
            
        }, 2000);
    })
    .catch(error => {
        console.error('Error uploading resume:', error);
        uploadBtn.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Upload Failed
        `;
        
        setTimeout(() => {
            uploadBtn.innerHTML = originalContent;
            uploadBtn.disabled = false;
        }, 3000);
        
        alert('Upload failed. Please try again.');
    });
}

function showUploadSuccess(fileName) {
    const searchBar = document.querySelector('.search-bar');
    const successDiv = document.createElement('div');
    successDiv.className = 'upload-success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <div class="success-text">
                <strong>Resume uploaded successfully!</strong>
                <p>${fileName} has been analyzed by our AI. Showing personalized job matches...</p>
            </div>
        </div>
    `;
    
    searchBar.appendChild(successDiv);
    
    // Remove success message after showing
    setTimeout(() => {
        successDiv.remove();
    }, 4000);
}

function loadJobsWithAIMatching() {
    // Load jobs with AI matching indicator
    const aiMatchedJobs = sampleJobs.map(job => ({
        ...job,
        aiMatch: Math.floor(Math.random() * 30) + 70, // Random match percentage 70-99%
        isAIRecommended: true
    })).sort((a, b) => b.aiMatch - a.aiMatch); // Sort by highest match first
    
    const jobsGrid = document.getElementById('jobs-grid');
    
    jobsGrid.innerHTML = `
        <div class="ai-match-header" style="grid-column: 1 / -1; margin-bottom: 20px;">
            <div class="ai-match-info">
                <i class="fas fa-brain" style="color: var(--accent-blue); margin-right: 10px;"></i>
                <span style="color: var(--primary-blue); font-weight: 600;">AI-Powered Job Matches Based on Your Resume</span>
            </div>
        </div>
    ` + aiMatchedJobs.map(job => `
        <div class="job-card ai-recommended" onclick="showJobDetails(${job.id})">
            <div class="ai-match-badge">
                <i class="fas fa-brain"></i>
                ${job.aiMatch}% Match
            </div>
            <div class="job-header">
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <div class="company">${job.company}</div>
                </div>
                <div class="company-logo" style="background: ${getCompanyColor(job.company)}">
                    ${job.company.charAt(0)}
                </div>
            </div>
            <div class="job-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                <span><i class="fas fa-clock"></i> ${job.posted}</span>
                ${job.remote ? '<span class="remote-badge"><i class="fas fa-home"></i> Remote</span>' : ''}
            </div>
            <div class="job-description">
                ${truncateText(job.description, 120)}
            </div>
            <div class="job-skills">
                ${job.skills.slice(0, 4).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                ${job.skills.length > 4 ? `<span class="skill-tag">+${job.skills.length - 4} more</span>` : ''}
            </div>
            <div class="job-footer">
                <div class="salary">${formatSalary(job.salary.min, job.salary.max)}</div>
                <button class="apply-btn ai-apply" onclick="event.stopPropagation(); applyToJob(${job.id})">
                    Apply Now
                </button>
            </div>
        </div>
    `).join('');
}
// New Homepage Functions
function setupNewHomePage() {
    // Setup tab switching
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            tabBtns.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            
            const tab = this.dataset.tab;
            const mainSearch = document.getElementById("main-search");
            if (mainSearch) {
                if (tab === "companies") {
                    mainSearch.placeholder = "Company name or industry";
                } else {
                    mainSearch.placeholder = "Job, skill, or company";
                }
            }
        });
    });
    
    // Setup suggestion tag clicks
    const suggestionTags = document.querySelectorAll(".suggestion-tag");
    suggestionTags.forEach(tag => {
        tag.addEventListener("click", function() {
            const mainSearch = document.getElementById("main-search");
            if (mainSearch) {
                mainSearch.value = this.textContent;
                performSearch(this.textContent);
            }
        });
    });
    
    // Setup search functionality
    const searchJobsBtn = document.querySelector(".search-jobs-btn");
    const searchJobsAdvanced = document.querySelector(".search-jobs-advanced");
    const getStartedBtn = document.querySelector(".get-started-btn");
    
    if (searchJobsBtn) {
        searchJobsBtn.addEventListener("click", function() {
            const mainSearch = document.getElementById("main-search");
            const locationSearch = document.getElementById("location-search");
            const searchTerm = mainSearch ? mainSearch.value : "";
            const location = locationSearch ? locationSearch.value : "";
            performSearch(searchTerm, location);
        });
    }
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", function() {
            showPage("jobs");
        });
    }
    
    // Setup main search enter key
    const mainSearch = document.getElementById("main-search");
    if (mainSearch) {
        mainSearch.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                const locationSearch = document.getElementById("location-search");
                const location = locationSearch ? locationSearch.value : "";
                performSearch(this.value, location);
            }
        });
    }
}

function performSearch(searchTerm, location = "") {
    showPage("jobs");
    
    const jobSearchInput = document.getElementById("job-title-filter");
    if (jobSearchInput) {
        jobSearchInput.value = searchTerm;
    }
    
    const locationFilter = document.getElementById("location-filter");
    if (locationFilter && location) {
        locationFilter.value = location;
    }
    
    applyJobFilters();
    window.scrollTo(0, 0);
}
