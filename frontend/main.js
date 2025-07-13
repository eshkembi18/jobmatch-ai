// AI Job Board - Job Posting JavaScript functionality

class JobPosting {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('jobPostingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitJobPosting();
        });

        // Real-time validation
        const requiredFields = ['jobTitle', 'company', 'location', 'contactEmail', 'jobType', 'jobDescription', 'jobRequirements'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
            }
        });

        // Salary validation
        document.getElementById('salaryMin').addEventListener('input', () => this.validateSalaryRange());
        document.getElementById('salaryMax').addEventListener('input', () => this.validateSalaryRange());

        // Skills input enhancement
        this.setupSkillsInput();
    }

    setupFormValidation() {
        // Add Bootstrap validation classes
        const form = document.getElementById('jobPostingForm');
        form.classList.add('needs-validation');
    }

    setupSkillsInput() {
        const skillsInput = document.getElementById('skillsTags');
        
        // Add placeholder suggestions
        const commonSkills = [
            'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'SQL', 'Git',
            'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'HTML', 'CSS', 'Vue.js',
            'Angular', 'Express.js', 'Flask', 'Django', 'Spring Boot', 'GraphQL', 'REST API'
        ];

        // Create skills suggestions dropdown
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'skills-suggestions mt-2';
        suggestionsContainer.innerHTML = `
            <small class="text-muted">Popular skills:</small><br>
            ${commonSkills.slice(0, 10).map(skill => 
                `<span class="badge bg-light text-dark me-1 mb-1 skill-suggestion" style="cursor: pointer;">${skill}</span>`
            ).join('')}
        `;
        
        skillsInput.parentNode.appendChild(suggestionsContainer);

        // Add click listeners to skill suggestions
        suggestionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('skill-suggestion')) {
                const skill = e.target.textContent;
                const currentSkills = skillsInput.value.split(',').map(s => s.trim()).filter(s => s);
                
                if (!currentSkills.includes(skill)) {
                    currentSkills.push(skill);
                    skillsInput.value = currentSkills.join(', ');
                    this.highlightAddedSkill(e.target);
                }
            }
        });
    }

    highlightAddedSkill(element) {
        element.classList.remove('bg-light', 'text-dark');
        element.classList.add('bg-success', 'text-white');
        setTimeout(() => {
            element.classList.remove('bg-success', 'text-white');
            element.classList.add('bg-light', 'text-dark');
        }, 1000);
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }

        // Specific validations
        switch (field.id) {
            case 'contactEmail':
                if (value && !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
                break;
            case 'jobTitle':
                if (value && value.length < 3) {
                    isValid = false;
                    errorMessage = 'Job title must be at least 3 characters long.';
                }
                break;
            case 'jobDescription':
                if (value && value.length < 50) {
                    isValid = false;
                    errorMessage = 'Job description should be at least 50 characters long.';
                }
                break;
            case 'jobRequirements':
                if (value && value.length < 20) {
                    isValid = false;
                    errorMessage = 'Requirements should be at least 20 characters long.';
                }
                break;
        }

        this.displayFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    validateSalaryRange() {
        const minSalary = parseInt(document.getElementById('salaryMin').value) || 0;
        const maxSalary = parseInt(document.getElementById('salaryMax').value) || 0;

        if (minSalary > 0 && maxSalary > 0 && minSalary >= maxSalary) {
            this.displayFieldValidation(
                document.getElementById('salaryMax'), 
                false, 
                'Maximum salary must be higher than minimum salary.'
            );
            return false;
        }

        // Clear any previous errors
        this.clearFieldError(document.getElementById('salaryMin'));
        this.clearFieldError(document.getElementById('salaryMax'));
        return true;
    }

    displayFieldValidation(field, isValid, errorMessage) {
        // Remove existing validation classes and messages
        field.classList.remove('is-valid', 'is-invalid');
        this.removeErrorMessage(field);

        if (!isValid) {
            field.classList.add('is-invalid');
            this.addErrorMessage(field, errorMessage);
        } else if (field.value.trim()) {
            field.classList.add('is-valid');
        }
    }

    addErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid');
        this.removeErrorMessage(field);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm() {
        const requiredFields = [
            'jobTitle', 'company', 'location', 'contactEmail', 
            'jobType', 'jobDescription', 'jobRequirements'
        ];

        let isFormValid = true;

        // Validate all required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        // Validate salary range
        if (!this.validateSalaryRange()) {
            isFormValid = false;
        }

        return isFormValid;
    }

    async submitJobPosting() {
        // Show loading state
        const submitBtn = document.querySelector('#jobPostingForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Posting Job...';
        submitBtn.disabled = true;

        try {
            // Validate form
            if (!this.validateForm()) {
                throw new Error('Please fix the validation errors before submitting.');
            }

            // Collect form data
            const formData = this.collectFormData();

            // Submit to API
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                this.showSuccessModal();
                this.resetForm();
            } else {
                throw new Error(data.error || 'Failed to post job');
            }

        } catch (error) {
            console.error('Error posting job:', error);
            this.showError(error.message);
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    collectFormData() {
        const skills = document.getElementById('skillsTags').value
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0);

        return {
            title: document.getElementById('jobTitle').value.trim(),
            company: document.getElementById('company').value.trim(),
            location: document.getElementById('location').value.trim(),
            contact_email: document.getElementById('contactEmail').value.trim(),
            job_type: document.getElementById('jobType').value,
            experience_level: document.getElementById('experienceLevel').value,
            is_remote: document.getElementById('isRemote').checked,
            salary_min: parseInt(document.getElementById('salaryMin').value) || null,
            salary_max: parseInt(document.getElementById('salaryMax').value) || null,
            description: document.getElementById('jobDescription').value.trim(),
            requirements: document.getElementById('jobRequirements').value.trim(),
            skills: skills
        };
    }

    resetForm() {
        document.getElementById('jobPostingForm').reset();
        
        // Clear validation classes
        document.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
        });

        // Remove error messages
        document.querySelectorAll('.invalid-feedback').forEach(error => {
            error.remove();
        });
    }

    showSuccessModal() {
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
    }

    showError(message) {
        // Create error alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            <strong>Error:</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert at top of form
        const form = document.getElementById('jobPostingForm');
        form.insertBefore(alertDiv, form.firstChild);

        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 10000);
    }

    showSuccess(message) {
        // Create success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success:</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert at top of form
        const form = document.getElementById('jobPostingForm');
        form.insertBefore(alertDiv, form.firstChild);

        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize job posting functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JobPosting();
});

// Add character counters for text areas
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('div');
            counter.className = 'form-text text-end';
            counter.innerHTML = `<span class="char-count">0</span>/${maxLength} characters`;
            textarea.parentNode.appendChild(counter);

            textarea.addEventListener('input', () => {
                const count = textarea.value.length;
                const countSpan = counter.querySelector('.char-count');
                countSpan.textContent = count;
                
                if (count > maxLength * 0.9) {
                    countSpan.classList.add('text-warning');
                } else {
                    countSpan.classList.remove('text-warning');
                }
            });
        }
    });
});