// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            icon.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-adjust';
            icon.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
}

// Project Description Management
class ProjectManager {
    constructor() {
        this.init();
    }

    init() {
        const descButtons = document.querySelectorAll('.desc-btn');
        descButtons.forEach(button => {
            button.addEventListener('click', (e) => this.toggleDescription(e));
        });
    }

    toggleDescription(event) {
        const button = event.currentTarget;
        const projectId = button.getAttribute('data-project');
        const description = document.getElementById(`${projectId}-desc`);
        
        if (!description) return;

        const isExpanded = description.classList.contains('expanded');
        
        if (!isExpanded) {
            description.classList.add('expanded');
            if (projectId === 'research') {
                button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide';
            } else {
                button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide';
            }
        } else {
            description.classList.remove('expanded');
            if (projectId === 'research') {
                button.innerHTML = '<i class="fas fa-info-circle"></i> Abstract';
            } else {
                button.innerHTML = '<i class="fas fa-info-circle"></i> Desc';
            }
        }
    }

    closeAllDescriptions() {
        const descriptions = document.querySelectorAll('.project-description');
        const buttons = document.querySelectorAll('.desc-btn');
        
        descriptions.forEach(desc => {
            desc.classList.remove('expanded');
        });
        
        buttons.forEach(btn => {
            // Check if this is the research button
            if (btn.getAttribute('data-project') === 'research') {
                btn.innerHTML = '<i class="fas fa-info-circle"></i> Abstract';
            } else {
                btn.innerHTML = '<i class="fas fa-info-circle"></i> Desc';
            }
        });
    }
}

// Smooth Scrolling for Navigation
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Performance and Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        // Add keyboard navigation support
        this.addKeyboardSupport();
        
        // Add focus management
        this.addFocusManagement();
        
        // Add reduced motion support
        this.handleReducedMotion();
    }

    addKeyboardSupport() {
        // Allow theme toggle with Enter key
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    themeToggle.click();
                }
            });
        }

        // Allow project description toggle with Enter key
        document.querySelectorAll('.desc-btn').forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    addFocusManagement() {
        // Add focus indicators for better accessibility
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--accent-primary)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    handleReducedMotion() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--transition', 'none');
        }
    }
}

// Analytics and Performance Monitoring
class AnalyticsManager {
    constructor() {
        this.init();
    }

    init() {
        // Track page views
        this.trackPageView();
        
        // Track theme changes
        this.trackThemeChanges();
        
        // Track project interactions
        this.trackProjectInteractions();
    }

    trackPageView() {
        // Simple page view tracking
        const page = window.location.pathname;
        console.log(`Page viewed: ${page}`);
        
        // You can integrate with Google Analytics or other analytics services here
        if (typeof gtag !== 'undefined') {
            gtag('config', 'G-DZVLQ4YQ5E', {
                page_path: page
            });
        }
    }

    trackThemeChanges() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                console.log(`Theme changed to: ${document.documentElement.getAttribute('data-theme')}`);
                
                // Track theme change in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'theme_change', {
                        event_category: 'User Interaction',
                        event_label: document.documentElement.getAttribute('data-theme')
                    });
                }
            });
        }
    }

    trackProjectInteractions() {
        // Track project description toggles
        document.querySelectorAll('.desc-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const projectId = e.currentTarget.getAttribute('data-project');
                console.log(`Project description toggled: ${projectId}`);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'project_interaction', {
                        event_category: 'User Interaction',
                        event_label: projectId
                    });
                }
            });
        });

        // Track external link clicks
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const linkText = e.currentTarget.textContent.trim();
                console.log(`External link clicked: ${linkText}`);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'external_link_click', {
                        event_category: 'User Interaction',
                        event_label: linkText
                    });
                }
            });
        });
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new ProjectManager();
    new NavigationManager();
    new AccessibilityManager();
    new AnalyticsManager();
    new ErrorHandler();

    // Add loading animation
    document.body.classList.add('loaded');
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any animations or heavy operations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible again
        document.body.classList.remove('page-hidden');
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 