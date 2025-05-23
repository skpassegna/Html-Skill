// Modern Interactions for MoneyFlow

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeFormInteractions();
    initializeScrollEffects();
    initializeParallaxEffects();
    initializeCurrencyExchange();
    initializeDeliveryOptions();
    initializeMobileMenu();
    initializeAccessibility();
});

// Initialize Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.group');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-fade-in');
    });
}

// Form Interactions
function initializeFormInteractions() {
    // Currency swap functionality
    const swapButton = document.querySelector('.fa-exchange-alt')?.parentElement;
    if (swapButton) {
        swapButton.addEventListener('click', function(e) {
            e.preventDefault();
            swapCurrencies();
        });
    }

    // Real-time amount calculation
    const amountInputs = document.querySelectorAll('input[type="text"]');
    amountInputs.forEach(input => {
        input.addEventListener('input', debounce(calculateExchange, 300));
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Form validation
    const form = document.querySelector('form') || document.querySelector('.backdrop-blur-xl');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Enhanced select interactions
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            this.classList.add('selected');
            calculateExchange();
        });
    });
}

// Currency Exchange Functions
function swapCurrencies() {
    const fromSelect = document.querySelector('select');
    const toSelect = document.querySelectorAll('select')[1];
    const fromInput = document.querySelector('input[type="text"]');
    const toInput = document.querySelectorAll('input[type="text"]')[1];

    if (fromSelect && toSelect && fromInput && toInput) {
        // Swap select values
        const tempValue = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = tempValue;

        // Swap input values
        const tempInputValue = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = tempInputValue;

        // Add animation class
        const swapIcon = document.querySelector('.fa-exchange-alt');
        if (swapIcon) {
            swapIcon.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                swapIcon.style.transform = 'rotate(0deg)';
            }, 300);
        }

        // Recalculate exchange
        calculateExchange();
    }
}

function calculateExchange() {
    const fromInput = document.querySelector('input[type="text"]');
    const toInput = document.querySelectorAll('input[type="text"]')[1];
    const fromSelect = document.querySelector('select');
    const toSelect = document.querySelectorAll('select')[1];

    if (fromInput && toInput && fromSelect && toSelect) {
        const amount = parseFloat(fromInput.value.replace(/[^0-9.]/g, '')) || 0;
        const rate = getExchangeRate(fromSelect.value, toSelect.value);
        const convertedAmount = (amount * rate).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        toInput.value = convertedAmount;
        updateExchangeRateDisplay(fromSelect.value, toSelect.value, rate);
    }
}

function getExchangeRate(from, to) {
    // Mock exchange rates - in real app, this would be an API call
    const rates = {
        'EUR-UAH': 26.90,
        'EUR-JPY': 158.50,
        'EUR-XOF': 655.96,
        'USD-UAH': 24.50,
        'USD-JPY': 144.20,
        'USD-XOF': 597.45,
        'GBP-UAH': 30.80,
        'GBP-JPY': 182.30,
        'GBP-XOF': 753.20
    };
    
    const key = `${from}-${to}`;
    const reverseKey = `${to}-${from}`;
    
    if (rates[key]) {
        return rates[key];
    } else if (rates[reverseKey]) {
        return 1 / rates[reverseKey];
    }
    
    return 1; // Default rate
}

function updateExchangeRateDisplay(from, to, rate) {
    const rateDisplay = document.querySelector('.bg-primary-50');
    if (rateDisplay) {
        const rateText = rateDisplay.querySelector('.font-semibold');
        if (rateText) {
            rateText.textContent = `1 ${from} = ${rate.toFixed(2)} ${to}`;
        }
    }
}

// Delivery Options
function initializeDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('.cursor-pointer');
    deliveryOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected state from all options
            deliveryOptions.forEach(opt => {
                opt.classList.remove('from-primary-50', 'to-primary-100', 'border-primary-200');
                opt.classList.add('bg-white/50', 'border-white/30');
            });
            
            // Add selected state to clicked option
            this.classList.remove('bg-white/50', 'border-white/30');
            this.classList.add('from-primary-50', 'to-primary-100', 'border-primary-200');
            
            // Add selection animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('nav');
        
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('backdrop-blur-xl', 'bg-white/90');
                navbar.classList.remove('bg-white/80');
            } else {
                navbar.classList.remove('backdrop-blur-xl', 'bg-white/90');
                navbar.classList.add('bg-white/80');
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Parallax Effects
function initializeParallaxEffects() {
    const floatingElements = document.querySelectorAll('.animate-float');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.createElement('div');
    
    if (mobileMenuButton) {
        mobileMenu.className = 'fixed inset-0 z-50 bg-white/95 backdrop-blur-lg transform translate-x-full transition-transform duration-300 md:hidden';
        mobileMenu.innerHTML = `
            <div class="flex flex-col h-full">
                <div class="flex justify-between items-center p-4 border-b">
                    <span class="text-xl font-bold">MoneyFlow</span>
                    <button class="close-menu p-2">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <nav class="flex-1 p-4">
                    <ul class="space-y-4">
                        <li><a href="#" class="block py-2 text-lg font-medium">Features</a></li>
                        <li><a href="#" class="block py-2 text-lg font-medium">Business</a></li>
                        <li><a href="#" class="block py-2 text-lg font-medium">Support</a></li>
                        <li><a href="#" class="block py-2 text-lg font-medium">Sign In</a></li>
                        <li><a href="#" class="block py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg text-center font-medium">Get Started</a></li>
                    </ul>
                </nav>
            </div>
        `;
        
        document.body.appendChild(mobileMenu);
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
        
        mobileMenu.querySelector('.close-menu').addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
        
        // Close on outside click
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
            }
        });
    }
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitButton = document.querySelector('button[type="submit"], .w-full.bg-gradient-to-r');
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Success!';
            submitButton.classList.add('from-green-500', 'to-green-600');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('from-green-500', 'to-green-600');
            }, 2000);
        }, 2000);
    }
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.cursor-pointer, button, select, input');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.classList.contains('cursor-pointer')) {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, send to error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // In production, send to error tracking service
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        swapCurrencies,
        calculateExchange,
        getExchangeRate,
        debounce,
        throttle
    };
}