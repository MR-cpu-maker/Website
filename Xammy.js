// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
const scrollTopBtn = document.querySelector('.scroll-top');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectsGrid = document.querySelector('.projects-grid');
const projectModal = document.querySelector('.project-modal');
const closeModal = document.querySelector('.close-modal');
const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');
const skillProgress = document.querySelectorAll('.progress');

// Type animation text list
const textArray = ['Full Stack Developer', 'Mobile App Developer', 'UI/UX Designer', 'Problem Solver'];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

// Project Data
const projects = [
    {
        id: 1,
        title: 'Adoptihun - Adoption App',
        category: 'mobile',
        image: 'Adopt.jpg',
        description: 'A mobile application that serves as a medium between future parents and adoption agencies. Built with React Native, it includes profile matching, legal documentation assistance, and secure communication features.',
        tags: ['React Native', 'Firebase', 'Expo', 'Secure Messaging'],
        demoLink: 'https://www.tiktok.com/@xammy_huncho/video/7448335276801363206',
        codeLink: '#',
        date: 'April 2025',
        client: 'XammyTech Solutions.'
    },
    {
        id: 2,
        title: 'LawHub - AI-Powered Legal Assistant',
        category: 'mobile',
        image: 'lawhun.jpg',
        description: 'An Android application that integrates AI to assist with legal research, case tracking, and document generation. Features include AI-powered legal document creation, law databases, and consultation scheduling.',
        tags: ['Android', 'AI Integration', 'Firebase', 'Java'],
        demoLink: 'https://www.tiktok.com/@xammy_huncho/video/7441146240710020408',
        codeLink: '#',
        date: 'March 2025',
        client: 'XammyTech Solutions'
    },
    {
        id: 3,
        title: 'Neural Learn - AI Educational App',
        category: 'mobile',
        image: 'neural.jpg',
        description: 'An AI-powered educational app that provides personalized learning experiences. Features include AI-generated courses, progress tracking, quizzes, and interactive learning modules.',
        tags: ['React Native', 'AI', 'Firebase', 'Expo'],
        demoLink: 'https://www.tiktok.com/@xammy_huncho/video/7475018728342621445',
        codeLink: 'not allowed to view',
        date: 'February 2025',
        client: 'XammyTech Solutions'
    },
    {
        id: 4,
        title: 'CastlePrime- Movie Recommendation site',
        category: 'web',
        image:'castleprime.png',
        description: 'A smart movie recommendation app that suggests movies based on user preferences, watch history, and AI analysis. Includes filtering by genre, trending lists, and personalized watchlists.',
        tags: ['React Native', 'AI', 'Movie API', 'Firebase'],
        demoLink: 'https://castleprime.netlify.app/',
        codeLink: '#not allowed to view',
        date: 'January 2025',
        client: 'XammyTech Solutions'
    },{
        id: 4,
        title: 'Medihun- Medical & pharmacy site',
        category: 'mobile',
        image:'no image available view Demo video instead',
        description: 'A pharmaceutical app .',
        tags: ['Android', 'AI', 'Firebase'],
        demoLink: 'https://www.tiktok.com/@xammy_huncho/video/7441164374473002296',
        codeLink: '#not allowed to view',
        date: 'January 2025',
        client: 'XammyTech Solutions'
    }
];

// Type animation function
function type() {
    if (isWaiting) {
        setTimeout(type, 1500);
        isWaiting = false;
        return;
    }

    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        // Set delete to true
        isDeleting = true;
        // Wait before starting to delete
        typeSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next word
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        // Pause before typing next word
        isWaiting = true;
    }

    setTimeout(type, typeSpeed);
}

// Initialize typing effect
setTimeout(type, 1000);

// Add fixed navigation on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
        scrollTopBtn.classList.add('active');
    } else {
        navbar.classList.remove('scrolled');
        scrollTopBtn.classList.remove('active');
    }
    
    // Active nav item based on scroll position
    highlightNavItem();
    
    // Animate skills on scroll
    animateSkills();
});

// Initialize projects
function initProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <p class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    <a href="#" class="details-btn" data-id="${project.id}">View Details <i class="fas fa-arrow-right"></i></a>
                    <a href="${project.demoLink}" target="_blank">Live Demo</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Add event listeners to detail buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = parseInt(e.currentTarget.getAttribute('data-id'));
            openProjectModal(projectId);
        });
    });
}

// Filter projects
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Highlight active nav item based on scroll position
function highlightNavItem() {
    let scrollPosition = window.scrollY;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === sectionId) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        const modalBody = document.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="modal-project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <h2 class="modal-project-title">${project.title}</h2>
            <div class="modal-project-info">
                <div>
                    <i class="fas fa-calendar"></i>
                    <span>${project.date}</span>
                </div>
                <div>
                    <i class="fas fa-user"></i>
                    <span>${project.client}</span>
                </div>
                <div>
                    <i class="fas fa-folder"></i>
                    <span>${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                </div>
            </div>
            <p class="modal-project-description">${project.description}</p>
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="modal-project-links">
                <a href="${project.demoLink}" target="_blank" class="btn primary-btn">Live Demo <i class="fas fa-external-link-alt"></i></a>
                <a href="${project.codeLink}" target="_blank" class="btn secondary-btn">View Code <i class="fab fa-github"></i></a>
            </div>
        `;
        
        projectModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close project modal
function closeProjectModal() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Animate skills on scroll
function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillsSectionTop = skillsSection.getBoundingClientRect().top;
    
    if (skillsSectionTop < window.innerHeight - 100) {
        skillProgress.forEach(progress => {
            const width = progress.style.width;
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = width;
            }, 200);
        });
    }
}

// Mobile navigation toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile navigation when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Filter buttons click event
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-filter');
        filterProjects(category);
    });
});

// Close modal click events
closeModal.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Scroll to top button click event
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For demonstration, just log the data and show a success message
    console.log({ name, email, subject, message });
    
    // Reset form
    contactForm.reset();
    
    // Show success message (in a real implementation)
    alert('Message sent successfully!');
});

// Initialize on document load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize projects
    initProjects();
    
    // Set active nav item initially
    highlightNavItem();
    
    // Add scroll animation to sections
    sections.forEach(section => {
        section.classList.add('fadeInUp');
    });
    
    // AOS Animation initialization (if you decide to add it)
    // AOS.init();
});