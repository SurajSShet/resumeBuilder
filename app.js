// State management
let experienceCount = 0;
let educationCount = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add initial experience and education entries
    addExperience();
    addEducation();
    
    // Add event listeners for real-time preview updates
    setupEventListeners();
    
    // Load saved data from localStorage if available
    loadSavedData();
});

// Setup event listeners for all form inputs
function setupEventListeners() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });
}

// Add experience entry
function addExperience() {
    experienceCount++;
    const experienceList = document.getElementById('experienceList');
    
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-item';
    entryDiv.id = `experience-${experienceCount}`;
    entryDiv.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Experience #${experienceCount}</span>
            <button type="button" class="btn-remove" onclick="removeEntry('experience-${experienceCount}')">Remove</button>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Job Title *</label>
                <input type="text" class="exp-title" data-id="${experienceCount}" placeholder="Software Engineer" required>
            </div>
            <div class="input-group">
                <label>Company *</label>
                <input type="text" class="exp-company" data-id="${experienceCount}" placeholder="Tech Corp" required>
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Start Date</label>
                <input type="text" class="exp-start" data-id="${experienceCount}" placeholder="Jan 2020">
            </div>
            <div class="input-group">
                <label>End Date</label>
                <input type="text" class="exp-end" data-id="${experienceCount}" placeholder="Present">
            </div>
        </div>
        <div class="input-group">
            <label>Description</label>
            <textarea class="exp-description" data-id="${experienceCount}" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
    `;
    
    experienceList.appendChild(entryDiv);
    
    // Add event listeners to new inputs
    const newInputs = entryDiv.querySelectorAll('input, textarea');
    newInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    updatePreview();
}

// Add education entry
function addEducation() {
    educationCount++;
    const educationList = document.getElementById('educationList');
    
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-item';
    entryDiv.id = `education-${educationCount}`;
    entryDiv.innerHTML = `
        <div class="entry-header">
            <span class="entry-number">Education #${educationCount}</span>
            <button type="button" class="btn-remove" onclick="removeEntry('education-${educationCount}')">Remove</button>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Degree *</label>
                <input type="text" class="edu-degree" data-id="${educationCount}" placeholder="Bachelor of Science" required>
            </div>
            <div class="input-group">
                <label>Institution *</label>
                <input type="text" class="edu-institution" data-id="${educationCount}" placeholder="University Name" required>
            </div>
        </div>
        <div class="input-row">
            <div class="input-group">
                <label>Year</label>
                <input type="text" class="edu-year" data-id="${educationCount}" placeholder="2016 - 2020">
            </div>
            <div class="input-group">
                <label>GPA / Honors</label>
                <input type="text" class="edu-gpa" data-id="${educationCount}" placeholder="3.8 / Cum Laude">
            </div>
        </div>
    `;
    
    educationList.appendChild(entryDiv);
    
    // Add event listeners to new inputs
    const newInputs = entryDiv.querySelectorAll('input, textarea');
    newInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    updatePreview();
}

// Remove an entry (experience or education)
function removeEntry(entryId) {
    const entry = document.getElementById(entryId);
    if (entry) {
        entry.remove();
        updatePreview();
    }
}

// Update preview in real-time
function updatePreview() {
    // Update personal information
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const title = document.getElementById('title').value || 'Your Professional Title';
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const linkedin = document.getElementById('linkedin').value;
    const summary = document.getElementById('summary').value;
    
    document.getElementById('previewName').textContent = fullName;
    document.getElementById('previewTitle').textContent = title;
    
    // Update contact information
    const contactDiv = document.getElementById('previewContact');
    let contactHTML = '';
    if (email) contactHTML += `<span class="contact-item">📧 ${email}</span>`;
    if (phone) contactHTML += `<span class="contact-item">📱 ${phone}</span>`;
    if (location) contactHTML += `<span class="contact-item">📍 ${location}</span>`;
    if (linkedin) contactHTML += `<span class="contact-item">🔗 ${linkedin}</span>`;
    contactDiv.innerHTML = contactHTML;
    
    // Update summary
    const summarySection = document.getElementById('previewSummary');
    const summaryText = document.getElementById('previewSummaryText');
    if (summary) {
        summarySection.style.display = 'block';
        summaryText.textContent = summary;
    } else {
        summarySection.style.display = 'none';
    }
    
    // Update work experience
    updateExperiencePreview();
    
    // Update education
    updateEducationPreview();
    
    // Update skills
    updateSkillsPreview();
    
    // Save data to localStorage
    saveData();
}

// Update experience preview
function updateExperiencePreview() {
    const experienceSection = document.getElementById('previewExperience');
    const experienceList = document.getElementById('previewExperienceList');
    const expEntries = document.querySelectorAll('.exp-title');
    
    if (expEntries.length === 0) {
        experienceSection.style.display = 'none';
        return;
    }
    
    let hasContent = false;
    let html = '';
    
    expEntries.forEach((titleInput, index) => {
        const id = titleInput.dataset.id;
        const title = titleInput.value;
        const company = document.querySelector(`.exp-company[data-id="${id}"]`)?.value || '';
        const startDate = document.querySelector(`.exp-start[data-id="${id}"]`)?.value || '';
        const endDate = document.querySelector(`.exp-end[data-id="${id}"]`)?.value || '';
        const description = document.querySelector(`.exp-description[data-id="${id}"]`)?.value || '';
        
        if (title || company) {
            hasContent = true;
            const dateRange = (startDate || endDate) ? `${startDate}${startDate && endDate ? ' - ' : ''}${endDate}` : '';
            
            html += `
                <div class="experience-item">
                    <div class="item-header">
                        <div class="item-title">${title || 'Job Title'}</div>
                        ${dateRange ? `<div class="item-date">${dateRange}</div>` : ''}
                    </div>
                    ${company ? `<div class="item-subtitle">${company}</div>` : ''}
                    ${description ? `<div class="item-description">${description}</div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasContent) {
        experienceSection.style.display = 'block';
        experienceList.innerHTML = html;
    } else {
        experienceSection.style.display = 'none';
    }
}

// Update education preview
function updateEducationPreview() {
    const educationSection = document.getElementById('previewEducation');
    const educationList = document.getElementById('previewEducationList');
    const eduEntries = document.querySelectorAll('.edu-degree');
    
    if (eduEntries.length === 0) {
        educationSection.style.display = 'none';
        return;
    }
    
    let hasContent = false;
    let html = '';
    
    eduEntries.forEach((degreeInput, index) => {
        const id = degreeInput.dataset.id;
        const degree = degreeInput.value;
        const institution = document.querySelector(`.edu-institution[data-id="${id}"]`)?.value || '';
        const year = document.querySelector(`.edu-year[data-id="${id}"]`)?.value || '';
        const gpa = document.querySelector(`.edu-gpa[data-id="${id}"]`)?.value || '';
        
        if (degree || institution) {
            hasContent = true;
            
            html += `
                <div class="education-item">
                    <div class="item-header">
                        <div class="item-title">${degree || 'Degree'}</div>
                        ${year ? `<div class="item-date">${year}</div>` : ''}
                    </div>
                    ${institution ? `<div class="item-subtitle">${institution}</div>` : ''}
                    ${gpa ? `<div class="item-description">${gpa}</div>` : ''}
                </div>
            `;
        }
    });
    
    if (hasContent) {
        educationSection.style.display = 'block';
        educationList.innerHTML = html;
    } else {
        educationSection.style.display = 'none';
    }
}

// Update skills preview
function updateSkillsPreview() {
    const skillsSection = document.getElementById('previewSkills');
    const skillsList = document.getElementById('previewSkillsList');
    const skillsInput = document.getElementById('skills').value;
    
    if (!skillsInput.trim()) {
        skillsSection.style.display = 'none';
        return;
    }
    
    const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s);
    
    if (skills.length > 0) {
        skillsSection.style.display = 'block';
        skillsList.innerHTML = skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
    } else {
        skillsSection.style.display = 'none';
    }
}

// Clear all form data
function clearForm() {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        return;
    }
    
    // Clear all input fields
    document.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
    });
    
    // Remove all dynamic entries
    document.getElementById('experienceList').innerHTML = '';
    document.getElementById('educationList').innerHTML = '';
    
    // Reset counters
    experienceCount = 0;
    educationCount = 0;
    
    // Add initial entries
    addExperience();
    addEducation();
    
    // Clear localStorage
    localStorage.removeItem('resumeData');
    
    // Update preview
    updatePreview();
}

// Save data to localStorage
function saveData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        linkedin: document.getElementById('linkedin').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        experience: [],
        education: []
    };
    
    // Save experience entries
    document.querySelectorAll('.exp-title').forEach(titleInput => {
        const id = titleInput.dataset.id;
        data.experience.push({
            title: titleInput.value,
            company: document.querySelector(`.exp-company[data-id="${id}"]`)?.value || '',
            startDate: document.querySelector(`.exp-start[data-id="${id}"]`)?.value || '',
            endDate: document.querySelector(`.exp-end[data-id="${id}"]`)?.value || '',
            description: document.querySelector(`.exp-description[data-id="${id}"]`)?.value || ''
        });
    });
    
    // Save education entries
    document.querySelectorAll('.edu-degree').forEach(degreeInput => {
        const id = degreeInput.dataset.id;
        data.education.push({
            degree: degreeInput.value,
            institution: document.querySelector(`.edu-institution[data-id="${id}"]`)?.value || '',
            year: document.querySelector(`.edu-year[data-id="${id}"]`)?.value || '',
            gpa: document.querySelector(`.edu-gpa[data-id="${id}"]`)?.value || ''
        });
    });
    
    localStorage.setItem('resumeData', JSON.stringify(data));
}

// Load saved data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('resumeData');
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        
        // Load personal information
        if (data.fullName) document.getElementById('fullName').value = data.fullName;
        if (data.title) document.getElementById('title').value = data.title;
        if (data.email) document.getElementById('email').value = data.email;
        if (data.phone) document.getElementById('phone').value = data.phone;
        if (data.location) document.getElementById('location').value = data.location;
        if (data.linkedin) document.getElementById('linkedin').value = data.linkedin;
        if (data.summary) document.getElementById('summary').value = data.summary;
        if (data.skills) document.getElementById('skills').value = data.skills;
        
        // Load experience entries (skip the initial empty one)
        document.getElementById('experienceList').innerHTML = '';
        experienceCount = 0;
        if (data.experience && data.experience.length > 0) {
            data.experience.forEach((exp, index) => {
                addExperience();
                const id = experienceCount;
                document.querySelector(`.exp-title[data-id="${id}"]`).value = exp.title || '';
                document.querySelector(`.exp-company[data-id="${id}"]`).value = exp.company || '';
                document.querySelector(`.exp-start[data-id="${id}"]`).value = exp.startDate || '';
                document.querySelector(`.exp-end[data-id="${id}"]`).value = exp.endDate || '';
                document.querySelector(`.exp-description[data-id="${id}"]`).value = exp.description || '';
            });
        } else {
            addExperience();
        }
        
        // Load education entries
        document.getElementById('educationList').innerHTML = '';
        educationCount = 0;
        if (data.education && data.education.length > 0) {
            data.education.forEach((edu, index) => {
                addEducation();
                const id = educationCount;
                document.querySelector(`.edu-degree[data-id="${id}"]`).value = edu.degree || '';
                document.querySelector(`.edu-institution[data-id="${id}"]`).value = edu.institution || '';
                document.querySelector(`.edu-year[data-id="${id}"]`).value = edu.year || '';
                document.querySelector(`.edu-gpa[data-id="${id}"]`).value = edu.gpa || '';
            });
        } else {
            addEducation();
        }
        
        updatePreview();
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
}

// Generate PDF
function generatePDF() {
    // Validate required fields
    const fullName = document.getElementById('fullName').value;
    const title = document.getElementById('title').value;
    const email = document.getElementById('email').value;
    
    if (!fullName || !title || !email) {
        alert('Please fill in all required fields (Name, Title, and Email) before generating PDF.');
        return;
    }
    
    // Use browser's print functionality to create PDF
    window.print();
}
