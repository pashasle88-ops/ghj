// Основная конфигурация
const CONFIG = {
    companyName: "Перспектива ТЦ",
    companyTagline: "Обслуживание систем безопасности",
    phone: "+7 (495) 316-77-27",
    email: "info@perspektiva-tc.ru",
    address: "г. Москва, Сумский проезд 8к 3, 10 офис, 1 этаж",
    yearsOfExperience: "25 лет на рынке"
};

// Основные данные страницы
const PAGE_DATA = {
    navigation: [
        { id: 'home', text: 'Главная', icon: 'fa-home' },
        { id: 'services', text: 'Услуги', icon: 'fa-tools' },
        { id: 'about', text: 'О компании', icon: 'fa-building' },
        { id: 'portfolio', text: 'Наши объекты', icon: 'fa-project-diagram' },
        { id: 'reviews', text: 'Отзывы', icon: 'fa-star' },
        { id: 'team', text: 'Наша команда', icon: 'fa-users' },
        { id: 'contact', text: 'Контакты', icon: 'fa-phone' }
    ],
    
    services: [
        {
            id: 1,
            title: "Обслуживание домофонов",
            description: "Ремонт, установка и настройка домофонных систем любой сложности. Гарантия на работы 12 месяцев.",
            image: "../проект 2/2.jpg",
            productIds: [101, 102]
        },
        {
            id: 2,
            title: "Камеры видеонаблюдения",
            description: "Монтаж, настройка и обслуживание систем видеонаблюдения. Современное оборудование и профессиональный подход.",
            image: "../проект 2/4.jpg",
            productIds: [201, 202]
        },
        {
            id: 3,
            title: "Обслуживание шлагбаумов",
            description: "Ремонт и техническое обслуживание автоматических шлагбаумов, ворот и систем контроля доступа.",
            image: "../проект 2/3.jpg",
            productIds: [301, 302]
        }
    ],
    
    teamMembers: [
        {
            name: "Евгений Боцман",
            position: "Специалист по домофонам",
            photo: "../проект 2/7.jpg",
            experience: "Опыт работы 15 лет"
        },
        {
            name: "Алексей Котлов",
            position: "Специалист по видеонаблюдению",
            photo: "../проект 2/8.jpg",
            experience: "Опыт работы 12 лет"
        },
        {
            name: "Мария Ранек",
            position: "Специалист по шлагбаумам",
            photo: "../проект 2/6.jpg",
            experience: "Опыт работы 10 лет"
        },
        {
            name: "Ольга Давенко",
            position: "Менеджер по клиентам",
            photo: "../проект 2/9.jpg",
            experience: "Опыт работы 8 лет"
        }
    ]
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "' + CONFIG.companyName + '" загружается');
    
    // Сначала загружаем основные компоненты
    loadHeader();
    loadHeroSection();
    loadServices();
    loadFooter();
    
    // Затем загружаем остальные компоненты
    setTimeout(() => {
        loadAboutSection();
        loadPortfolio();
        loadFAQ();
        loadTeam();
        loadContactForm();
        loadWidgets();
        initializeScripts();
    }, 100);
});

// Функция загрузки шапки
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    
    const headerHTML = `
        <header>
            <div class="container header-content">
                <div class="logo">
                    <div class="logo-img-placeholder">
                        <img src="../проект 2/1.jpg" alt="${CONFIG.companyName} - логотип">
                    </div>
                    <div>
                        <div class="logo-text">${CONFIG.companyName.toUpperCase()}</div>
                        <div class="logo-subtext">${CONFIG.companyTagline}</div>
                    </div>
                </div>
                
                <nav>
                    <ul>
                        ${PAGE_DATA.navigation.map(item => `
                            <li><a href="#${item.id}" class="${item.id === 'home' ? 'active' : ''}">
                                <i class="fas ${item.icon}"></i> ${item.text}
                            </a></li>
                        `).join('')}
                    </ul>
                </nav>
                
                <div class="contact-info">
                    <a href="tel:${CONFIG.phone.replace(/\s/g, '')}" class="phone">
                        ${CONFIG.phone}
                    </a>
                    <a href="#contact" class="btn">Заказать звонок</a>
                </div>
            </div>
        </header>
    `;
    
    headerContainer.innerHTML = headerHTML;
}

// Функция загрузки героя
function loadHeroSection() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    const heroHTML = `
        <section class="hero" id="home">
            <div class="container">
                <div class="years-badge">${CONFIG.yearsOfExperience}</div>
                <h1>Обслуживание домофонов, камер видеонаблюдения и шлагбаумов</h1>
                <p>Эксперты в системах безопасности с многолетним опытом работы. Гарантия качества и надежности.</p>
                <a href="#contact" class="btn hero-btn">Получить консультацию</a>
            </div>
        </section>
    `;
    
    // Очищаем контейнер и добавляем героя
    mainContent.innerHTML = heroHTML;
}

// Функция загрузки услуг
function loadServices() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    const servicesHTML = `
        <section class="section" id="services">
            <div class="container">
                <div class="section-title">
                    <h2>Наши услуги</h2>
                    <p>Мы предлагаем полный спектр услуг по обслуживанию и ремонту систем безопасности</p>
                </div>
                
                <div class="services-grid">
                    ${PAGE_DATA.services.map(service => `
                        <div class="service-card">
                            <img src="${service.image}" alt="${service.title}" class="service-img">
                            <div class="service-content">
                                <h3>${service.title}</h3>
                                <p>${service.description}</p>
                                <button class="product-calculator-btn" data-product-ids="${service.productIds.join(',')}">
                                    <i class="fas fa-calculator"></i> Рассчитать стоимость
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="company-info">
                    <div class="info-item">
                        <i class="fas fa-calendar-check"></i>
                        <h3>${CONFIG.yearsOfExperience.split(' ')[0]} лет на рынке</h3>
                        <p>Многолетний опыт работы</p>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-user-check"></i>
                        <h3>5000+ клиентов</h3>
                        <p>Довольных клиентов</p>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Гарантия качества</h3>
                        <p>Гарантия на все работы</p>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <h3>Круглосуточно</h3>
                        <p>Работаем 24/7</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    mainContent.insertAdjacentHTML('beforeend', servicesHTML);
}

// Функция загрузки подвала
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    const footerHTML = `
        <footer>
            <div class="container">
                <div class="footer-content">
                    <div>
                        <div class="footer-logo">${CONFIG.companyName.toUpperCase()}</div>
                        <p class="footer-about">Обслуживание домофонов, камер видеонаблюдения и шлагбаумов. ${CONFIG.yearsOfExperience}. Эксперты в системах безопасности.</p>
                        <div class="contact-details">
                            <p><i class="fas fa-phone"></i> ${CONFIG.phone}</p>
                            <p><i class="fas fa-envelope"></i> ${CONFIG.email}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${CONFIG.address}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="footer-title">Услуги</h3>
                        <ul class="footer-links">
                            ${PAGE_DATA.services.map(service => `
                                <li><a href="#services">${service.title}</a></li>
                            `).join('')}
                            <li><a href="#services">Ремонт систем безопасности</a></li>
                            <li><a href="#services">Установка оборудования</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="footer-title">Компания</h3>
                        <ul class="footer-links">
                            <li><a href="#about">О нас</a></li>
                            <li><a href="#team">Наша команда</a></li>
                            <li><a href="#portfolio">Наши объекты</a></li>
                            <li><a href="#contact">Контакты</a></li>
                            <li><a href="#contact">Заявка на обслуживание</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="copyright">
                    <p>&copy; ${new Date().getFullYear()} "${CONFIG.companyName}". Все права защищены.</p>
                    <p class="footer-note">Сайт разработан в рамках производственной практики ГБПОУ МГКЭИТ</p>
                </div>
            </div>
        </footer>
    `;
    
    footerContainer.innerHTML = footerHTML;
}

// Остальные функции загрузки секций
function loadAboutSection() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    const aboutHTML = `
        <section class="section about" id="about">
            <div class="container">
                <div class="section-title">
                    <h2>История компании</h2>
                    <p>Наш путь начался в далёком 2001 году и мы продолжаем помогать гражданам с ремонтом вот уж 25 лет</p>
                </div>
                
                <div class="about-content">
                    <div class="about-text">
                        <h2>Наша миссия — обеспечивать высокий уровень сервиса для клиентов</h2>
                        <p>Мы ценим ваш комфорт и верность нам. За 25 лет работы мы накопили огромный опыт в обслуживании и ремонте систем безопасности, что позволяет нам решать задачи любой сложности.</p>
                        <p>Наша команда состоит из высококвалифицированных специалистов, которые регулярно проходят обучение и повышают свою квалификацию. Мы используем только современное оборудование и качественные материалы.</p>
                        <p>Мы гордимся тем, что многие наши клиенты рекомендуют нас своим друзьям и знакомым. Для нас важно не просто выполнить работу, а сделать это так, чтобы клиент остался доволен и чувствовал себя в безопасности.</p>
                        
                        <div class="about-btn-container">
                            <a href="#contact" class="btn">Связаться с нами</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    mainContent.insertAdjacentHTML('beforeend', aboutHTML);
}

function initializeScripts() {
    initSmoothScroll();
    initContactForm();
    initPhoneMask();
    initScrollToTop();
    initNavHighlight();
    initAnimations();
    initFAQAccordion();
    initSupportWidget();
    
    console.log('Все компоненты загружены и инициализированы');
}

function initSmoothScroll() {
}

function initContactForm() {
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    initSmoothScroll();
    initContactForm();
    initPhoneMask();
    initScrollToTop();
    initNavHighlight();
    initAnimations();
});
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                updateActiveNav(this);
            }
        });
    });
}
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const formData = getFormData();
        showLoading(true);
        setTimeout(() => {
            sendFormToServer(formData);
            showSuccessMessage();
this.addLogoutButtonToPanel();
            contactForm.reset();
            showLoading(false);
        }, 1500);
    });
}
function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Пожалуйста, введите ваше имя');
        isValid = false;
    } else {
        clearError(nameInput);
    }
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        showError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
        isValid = false;
    } else {
        clearError(phoneInput);
    }
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Пожалуйста, введите корректный email');
        isValid = false;
    } else {
        clearError(emailInput);
    }
    
    return isValid;
}
function getFormData() {
    return {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString(),
        page: window.location.href
    };
}
function sendFormToServer(formData) {
    console.log('Данные формы для отправки на сервер:');
    console.log(formData);
}
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'flex';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
function showErrorMessage() {
    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или позвоните нам.');
}
function showLoading(show) {
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;
    
    if (show) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
    } else {
        submitBtn.innerHTML = 'Отправить заявку';
        submitBtn.disabled = false;
    }
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    clearError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
    input.style.borderColor = '#dc3545';
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.style.borderColor = '#ddd';
}
function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 1) {
                value = '+7 (' + value;
            } else if (value.length <= 4) {
                value = '+7 (' + value.substring(1, 4);
            } else if (value.length <= 7) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
            } else if (value.length <= 9) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
            } else {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
            }
        }
        
        this.value = value;
    });
    
    phoneInput.addEventListener('focus', function() {
        if (!this.value) {
            this.value = '+7 (';
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        if (this.value === '+7 (') {
            this.value = '';
        }
    });
}

function initScrollToTop() {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveNav(clickedLink) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.service-card, .info-item, .team-member');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

function setupEmailService() {
}
function setupCallBack() {
    const callBackBtn = document.querySelector('.btn[href="#contact"]');
    if (callBackBtn && callBackBtn.textContent.includes('Заказать звонок')) {
        callBackBtn.addEventListener('click', function(e) {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = 'Прошу перезвонить для консультации';
            }
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}
function initMap() {
    const mapWrapper = document.querySelector('.map-wrapper');
    const mapIframe = mapWrapper?.querySelector('iframe');
    
    if (!mapIframe) return;
    mapWrapper.classList.add('loading');
    
    mapIframe.addEventListener('load', function() {
        mapWrapper.classList.remove('loading');
        console.log('Карта успешно загружена');
        
        addMapControls();
    });
    
    mapIframe.addEventListener('error', function() {
        mapWrapper.classList.remove('loading');
        mapWrapper.classList.add('error');
        console.log('Ошибка загрузки карты');
    });
    
    function openMapInNewWindow() {
        const mapUrl = "https://yandex.ru/maps/?text=Москва, Сумский проезд 8к 3";
        window.open(mapUrl, '_blank');
    }
    
    function buildRoute() {
        const routeUrl = "https://yandex.ru/maps/?rtext=~Москва, Сумский проезд 8к 3&rtt=auto";
        window.open(routeUrl, '_blank');
    }
    
    function addMapControls() {
        const controlsHtml = `
            <div class="map-controls">
                <button class="map-btn" title="Открыть в Яндекс.Картах" onclick="window.open('https://yandex.ru/maps/?text=Москва, Сумский проезд 8к 3', '_blank')">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="map-btn" title="Построить маршрут" onclick="window.open('https://yandex.ru/maps/?rtext=~Москва, Сумский проезд 8к 3&rtt=auto', '_blank')">
                    <i class="fas fa-route"></i>
                </button>
                <button class="map-btn" title="Полноэкранный режим" onclick="toggleFullScreen()">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        `;
        
        mapWrapper.insertAdjacentHTML('beforeend', controlsHtml);
    }
    
    window.toggleFullScreen = function() {
        const iframe = mapWrapper.querySelector('iframe');
        
        if (!document.fullscreenElement) {
            if (mapWrapper.requestFullscreen) {
                mapWrapper.requestFullscreen();
            } else if (mapWrapper.webkitRequestFullscreen) {
                mapWrapper.webkitRequestFullscreen();
            } else if (mapWrapper.msRequestFullscreen) {
                mapWrapper.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);
    
    function handleFullScreenChange() {
        const fullscreenBtn = mapWrapper.querySelector('.fa-expand');
        if (fullscreenBtn) {
            if (document.fullscreenElement) {
                fullscreenBtn.className = 'fas fa-compress';
            } else {
                fullscreenBtn.className = 'fas fa-expand';
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    
    initSmoothScroll();
    initContactForm();
    initPhoneMask();
    initScrollToTop();
    initNavHighlight();
    initAnimations();
    initServiceCards();
    setupCallBack();
    initMap();
});
function initMapSection() {
    const mapWrapper = document.querySelector('.map-wrapper');
    if (!mapWrapper) return;
    
    const mapIframe = mapWrapper.querySelector('iframe');
    if (!mapIframe) return;
    mapWrapper.classList.add('loading');
    mapIframe.addEventListener('load', function() {
        mapWrapper.classList.remove('loading');
        console.log('Карта успешно загружена');
    });
    mapIframe.addEventListener('error', function() {
        mapWrapper.classList.remove('loading');
        console.log('Ошибка загрузки карты');
        showMapFallback();
    });
    function showMapFallback() {
        const fallbackHTML = `
            <div class="map-fallback">
                <div class="fallback-content">
                    <i class="fas fa-map-marked-alt"></i>
                    <h4>Наш адрес</h4>
                    <p>г. Москва, Сумский проезд 8к 3</p>
                    <p>10 офис, 1 этаж</p>
                    <div class="fallback-actions">
                        <a href="https://yandex.ru/maps/213/moscow/?text=Москва, Сумский проезд 8к 3" 
                           target="_blank" 
                           class="btn">
                            <i class="fas fa-external-link-alt"></i> Открыть карту
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        mapWrapper.insertAdjacentHTML('beforeend', fallbackHTML);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    initMapSection();
});
function initSupportWidget() {
    const supportBtn = document.getElementById('supportButton');
    const supportPopup = document.getElementById('supportPopup');
    const popupClose = supportPopup?.querySelector('.popup-close');
    const chatBtn = document.querySelector('.chat-btn');
    const miniChat = document.getElementById('miniChat');
    const chatClose = miniChat?.querySelector('.chat-close');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = miniChat?.querySelector('.send-btn');
    
    if (!supportBtn || !supportPopup) return;
    
    supportBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        supportPopup.classList.toggle('show');
        
        if (miniChat.classList.contains('show')) {
            miniChat.classList.remove('show');
        }
    });
    
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            supportPopup.classList.remove('show');
        });
    }
    
    document.addEventListener('click', function(e) {
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
    });
    
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            supportPopup.classList.remove('show');
            
            setTimeout(() => {
                miniChat.classList.add('show');
                
                setTimeout(() => {
                    if (chatInput) chatInput.focus();
                }, 300);
            }, 300);
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            miniChat.classList.remove('show');
        });
    }
    
    if (sendBtn && chatInput) {
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            const chatMessages = document.querySelector('.chat-messages');
            const userMessage = document.createElement('div');
            userMessage.className = 'message';
            userMessage.innerHTML = `
                <div class="message-content" style="background-color: var(--primary-color); color: white; margin-left: auto;">
                    <p>${message}</p>
                </div>
                <div class="message-time" style="text-align: right;">сейчас</div>
            `;
            chatMessages.appendChild(userMessage);
            
            chatInput.value = '';
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            setTimeout(() => {
                const operatorMessage = document.createElement('div');
                operatorMessage.className = 'message operator';
                operatorMessage.innerHTML = `
                    <div class="message-content">
                        <p>Сообщение получено. Оператор свяжется с вами в ближайшее время.</p>
                    </div>
                    <div class="message-time">сейчас</div>
                `;
                chatMessages.appendChild(operatorMessage);
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                setTimeout(() => {
                    const typingMessage = document.createElement('div');
                    typingMessage.className = 'message operator';
                    typingMessage.innerHTML = `
                        <div class="message-content">
                            <p>В рабочее время (Пн-Пт 8:00-20:00) мы отвечаем в течение 5 минут. В другое время - в течение 30 минут.</p>
                        </div>
                        <div class="message-time">сейчас</div>
                    `;
                    chatMessages.appendChild(typingMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }, 1000);
        }
        
        sendBtn.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            supportBtn.style.transform = 'translateY(100px)';
            supportBtn.style.opacity = '0';
        } else {
            supportBtn.style.transform = 'translateY(0)';
            supportBtn.style.opacity = '1';
        }
        lastScrollTop = scrollTop;
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            supportPopup.classList.remove('show');
            if (miniChat) miniChat.classList.remove('show');
        }
    });
    
    supportBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.animation = 'none';
    });
    
    supportBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.animation = 'pulse 2s infinite';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    
    initSupportWidget();
});
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
}

function initFormTypeDetection() {
    const formLinks = document.querySelectorAll('[data-form-type]');
    
    formLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const formType = this.getAttribute('data-form-type');
            
            const messageField = document.getElementById('message');
            if (messageField) {
                let defaultMessage = '';
                
                switch(formType) {
                    case 'calculation':
                        defaultMessage = 'Прошу рассчитать стоимость обслуживания/установки системы безопасности. Пожалуйста, свяжитесь со мной для уточнения деталей.';
                        break;
                    case 'master':
                        defaultMessage = 'Прошу срочного выезда мастера для диагностики/ремонта системы безопасности. Готов(а) принять специалиста в течение дня.';
                        break;
                    case 'commercial':
                        defaultMessage = 'Прошу выслать коммерческое предложение для ТСЖ/управляющей компании на обслуживание систем безопасности.';
                        break;
                }
                
                messageField.value = defaultMessage;
                
                const serviceSelect = document.getElementById('service');
                if (serviceSelect && window.location.hash.includes('services')) {
                }
            }
        });
    });
}
function addSchemaMarkup() {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Перспектива ТЦ - Обслуживание систем безопасности",
        "description": "Обслуживание домофонов, камер видеонаблюдения и шлагбаумов в Москве и МО. 25 лет на рынке.",
        "url": window.location.href,
        "telephone": "+74953167727",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Сумский проезд 8к 3, 10 офис, 1 этаж",
            "addressLocality": "Москва",
            "postalCode": "115280",
            "addressCountry": "RU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "55.6616",
            "longitude": "37.6276"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "priceRange": "₽₽",
        "image": "https://perspektiva-tc.ru/logo.jpg",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "124"
        }
    });
    
    document.head.appendChild(schemaScript);
}
function initAnalytics() {

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {

            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-123456789/AbC-D_EFghIJKLMNOPQRS',
                    'value': 1.0,
                    'currency': 'RUB'
                });
            }
            if (typeof ym !== 'undefined') {
                ym(12345678, 'reachGoal', 'form_submission');
            }
        });
    }
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof ym !== 'undefined') {
                ym(12345678, 'reachGoal', 'phone_click');
            }
        });
    });
}

function setupCallTracking() {
    const phoneElements = document.querySelectorAll('.phone');
    
    phoneElements.forEach(element => {
        /*
        fetch('https://api.calltouch.ru/calls-service/RestAPI/numbers/...')
            .then(response => response.json())
            .then(data => {
                element.textContent = data.phoneNumber;
            });
        */
        
        element.addEventListener('click', () => {
            console.log('Call tracking event for:', element.textContent);
        });
    });
}

function setupGeoTargeting() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city') || 'Москва';
    
    if (city && city !== 'Москва') {
        const cityElements = document.querySelectorAll('[data-geo]');
        cityElements.forEach(el => {
            const originalText = el.getAttribute('data-original') || el.textContent;
            el.setAttribute('data-original', originalText);
            
            const newText = originalText
                .replace(/в Москве/g, `в ${city}`)
                .replace(/Москвы/g, city)
                .replace(/Москве/g, city);
            
            if (newText !== originalText) {
                el.textContent = newText;
            }
        });
        
        if (document.title.includes('Москве')) {
            document.title = document.title.replace('Москве', city);
        }
        
        const h1 = document.querySelector('h1');
        if (h1 && h1.textContent.includes('Москве')) {
            h1.textContent = h1.textContent.replace('Москве', city);
        }
    }
}
function generateSitemapLink() {
    const copyrightDiv = document.querySelector('.copyright');
    if (copyrightDiv) {
        const sitemapLink = document.createElement('a');
        sitemapLink.href = '/sitemap.xml';
        sitemapLink.textContent = 'Карта сайта';
        sitemapLink.style.marginLeft = '15px';
        
        copyrightDiv.querySelector('p').appendChild(sitemapLink);
    }
}
function initBlog() {
    const articles = [
        {
            id: 1,
            category: 'Советы для ТСЖ',
            title: 'Как выбрать домофон для многоквартирного дома',
            excerpt: 'Руководство по выбору оптимальной домофонной системы...',
            date: '15.12.2024'
        },
        {
            id: 2,
            category: 'Обзоры оборудования',
            title: 'Сравнение систем видеонаблюдения Hikvision и Dahua',
            excerpt: 'Анализ двух популярных брендов систем безопасности...',
            date: '10.12.2024'
        }
    ];
}
function initReviewsSlider() {
    const reviewsContainer = document.querySelector('.reviews-slider');
    if (!reviewsContainer) return;
    let currentReview = 0;
    const reviews = reviewsContainer.querySelectorAll('.review-item');
    
    function showReview(index) {
        reviews.forEach((review, i) => {
            review.style.display = i === index ? 'block' : 'none';
        });
    }
    setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }, 5000);
    showReview(0);
}
function initPriceCalculator() {
    const calcBtn = document.querySelector('[data-form-type="calculation"]');
    if (calcBtn) {
        calcBtn.addEventListener('click', function(e) {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = 'Прошу рассчитать стоимость следующих услуг:\n\n1. Домофонная система: ___ квартир\n2. Видеонаблюдение: ___ камер\n3. Шлагбаум: ___ шт.\n\nПожалуйста, предоставьте коммерческое предложение.';
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    initFAQAccordion();
    initFormTypeDetection();
    addSchemaMarkup();
    initAnalytics();
    setupCallTracking();
    setupGeoTargeting();
    generateSitemapLink();
    initBlog();
    initReviewsSlider();
    initPriceCalculator();
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Обслуживание домофонов, видеонаблюдения и шлагбаумов в Москве и МО. 25 лет опыта. Гарантия 12 месяцев. Круглосуточная поддержка.';
    document.head.appendChild(metaDescription);
    
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'домофоны, видеонаблюдение, шлагбаумы, обслуживание, ремонт, Москва, установка, системы безопасности';
    document.head.appendChild(metaKeywords);
    const ogTitle = document.createElement('meta');
    ogTitle.property = 'og:title';
    ogTitle.content = 'Перспектива ТЦ - Обслуживание систем безопасности';
    document.head.appendChild(ogTitle);
    
    const ogDescription = document.createElement('meta');
    ogDescription.property = 'og:description';
    ogDescription.content = 'Эксперты в системах безопасности с 25-летним опытом. Обслуживание домофонов, камер видеонаблюдения и шлагбаумов.';
    document.head.appendChild(ogDescription);
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href;
    document.head.appendChild(canonicalLink);
    
    console.log('Все дополнительные модули инициализированы');
});
class AdsConversions {
    constructor() {
        this.conversions = {
            'form_submission': {
                google: 'AW-XXXXXXXXX/YYYYYYYYYYYYYYYYYYYYYY',
                yandex: 'form_submission'
            },
            'phone_call': {
                google: 'AW-XXXXXXXXX/ZZZZZZZZZZZZZZZZZZZZZZ',
                yandex: 'phone_call'
            },
            'consultation': {
                google: 'AW-XXXXXXXXX/AAAAAAAAAAAAAAAAAAAAAA',
                yandex: 'consultation_request'
            }
        };
    }
    
    init() {
        this.setupConversionTracking();
        this.setupRemarketing();
    }
    
    setupConversionTracking() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', () => {
                this.trackConversion('form_submission');
            });
        });
        const phoneLinks = document.querySelectorAll('[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('phone_call');
            });
        });
        const consultBtns = document.querySelectorAll('.btn[href="#contact"]');
        consultBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackConversion('consultation');
            });
        });
    }
    
    trackConversion(type) {
        const conversion = this.conversions[type];
        if (!conversion) return;
        if (conversion.google && typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': conversion.google,
                'value': 1.0,
                'currency': 'RUB'
            });
        }
        if (conversion.yandex && typeof ym !== 'undefined') {
            ym(12345678, 'reachGoal', conversion.yandex);
        }
    }
    
    setupRemarketing() {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'AW-XXXXXXXXX', {
                'phone_conversion_label': 'YYYYYYYYYYYYYYYYYYYYYY'
            });
        }
        const yaParams = window.yaParams || {};
        yaParams.retargeting = true;
        window.yaParams = yaParams;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const adsTracker = new AdsConversions();
    adsTracker.init();
});
class ABTesting {
    constructor() {
        this.tests = {
            'cta_color': ['#ff6b00', '#1a3a8f', '#e05a00'],
            'button_text': ['Получить консультацию', 'Заказать звонок', 'Бесплатная диагностика'],
            'hero_title': [
                'Обслуживание систем безопасности',
                'Эксперты по домофонам и видеонаблюдению',
                '25 лет на страже вашей безопасности'
            ]
        };
        
        this.variations = {};
    }
    
    init() {
        this.assignVariations();
        this.applyVariations();
        this.setupTracking();
    }
    
    assignVariations() {
        const visitorId = this.getVisitorId();
        
        Object.keys(this.tests).forEach(test => {
            const options = this.tests[test];
            const hash = this.hashCode(visitorId + test);
            const variationIndex = Math.abs(hash) % options.length;
            
            this.variations[test] = {
                index: variationIndex,
                value: options[variationIndex]
            };
        });
    }
    
    applyVariations() {
        if (this.variations.cta_color) {
            const color = this.variations.cta_color.value;
            document.documentElement.style.setProperty('--secondary-color', color);
            const style = document.createElement('style');
            style.textContent = `
                .btn, .years-badge, .hero-btn:hover {
                    background-color: ${color} !important;
                }
                nav ul li a:hover, .info-item:hover i {
                    color: ${color} !important;
                }
            `;
            document.head.appendChild(style);
        }
        if (this.variations.button_text) {
            const buttons = document.querySelectorAll('.hero-btn');
            buttons.forEach(btn => {
                btn.textContent = this.variations.button_text.value;
            });
        }
        if (this.variations.hero_title) {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                heroTitle.textContent = this.variations.hero_title.value;
            }
        }
    }
    
    setupTracking() {
        const trackableElements = document.querySelectorAll('.btn, form, [href^="tel:"]');
        
        trackableElements.forEach(element => {
            element.addEventListener('click', () => {
                this.trackConversion();
            });
        });
    }
    
    trackConversion() {
        const variationData = {};
        Object.keys(this.variations).forEach(test => {
            variationData[test] = this.variations[test].index;
        });
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ab_test_conversion', variationData);
        }
    }
    
    getVisitorId() {
        let visitorId = localStorage.getItem('ab_test_visitor_id');
        if (!visitorId) {
            visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('ab_test_visitor_id', visitorId);
        }
        return visitorId;
    }
    
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hostname.includes('localhost')) {
        const abTest = new ABTesting();
        abTest.init();
    }
});
class WebsiteMonitor {
    constructor() {
        this.checks = [];
        this.interval = 300000;
        this.init();
    }
    
    init() {
        this.setupChecks();
        this.startMonitoring();
        this.setupErrorTracking();
    }
    
    setupChecks() {
        this.checks = [
            {
                name: 'form_submission',
                check: () => document.getElementById('contactForm') !== null,
                alert: 'Контактная форма отсутствует на странице'
            },
            {
                name: 'phone_display',
                check: () => document.querySelector('.phone') !== null,
                alert: 'Телефон не отображается'
            },
            {
                name: 'css_loaded',
                check: () => {
                    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
                    return links.some(link => link.sheet && link.sheet.cssRules.length > 0);
                },
                alert: 'CSS не загружен'
            },
            {
                name: 'analytics_loaded',
                check: () => typeof gtag !== 'undefined' || typeof ym !== 'undefined',
                alert: 'Аналитика не загружена'
            }
        ];
    }
    
    startMonitoring() {
        setInterval(() => {
            this.runChecks();
        }, this.interval)
        setTimeout(() => this.runChecks(), 5000);
    }
    
    runChecks() {
        this.checks.forEach(check => {
            if (!check.check()) {
                this.sendAlert(check.alert);
            }
        });
        this.checkPerformance();
    }
    
    checkPerformance() {
        const perf = window.performance;
        if (perf && perf.timing) {
            const loadTime = perf.timing.loadEventEnd - perf.timing.navigationStart;
            
            if (loadTime > 3000) {
                this.sendAlert(`Медленная загрузка страницы: ${loadTime}мс`);
            }
        }
    }
    
    sendAlert(message) {
        console.warn('Website Alert:', message);
        if (typeof Sentry !== 'undefined') {
            Sentry.captureMessage(message);
        }
        this.sendToTelegram(`🚨 ${message}\nURL: ${window.location.href}`);
    }
    
    async sendToTelegram(message) {
    }
    
    setupErrorTracking() {

        window.addEventListener('error', (event) => {
            this.logError(event.error || event.message);
        });
        window.addEventListener('unhandledrejection', (event) => {
            this.logError(event.reason);
        });
    }
    
    logError(error) {
        const errorData = {
            message: error.message || error,
            stack: error.stack,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        console.error('Website Error:', errorData);
    }
}
if (window.location.hostname !== 'localhost') {
    document.addEventListener('DOMContentLoaded', () => {
        new WebsiteMonitor();
    });
}
const productsData = {
    categories: [
        {
            id: 1,
            name: "Домофонные системы",
            description: "Комплекты домофонных систем для многоквартирных домов"
        },
        {
            id: 2,
            name: "Камеры видеонаблюдения",
            description: "IP и аналоговые камеры различного типа"
        },
        {
            id: 3,
            name: "Шлагбаумы и контроллеры",
            description: "Автоматические шлагбаумы и системы управления доступом"
        },
        {
            id: 4,
            name: "Комплектующие",
            description: "Расходные материалы и комплектующие для систем безопасности"
        }
    ],
    
    products: [
        {
            id: 101,
            categoryId: 1,
            name: "Домофонная система Vizit на 100 абонентов",
            description: "Полный комплект для многоквартирного дома",
            price: 45000,
            unit: "шт",
            image: "../proekt/products/domofon1.jpg",
            features: ["Цифровая система", "100 квартир", "Цветной монитор"]
        },
        {
            id: 102,
            categoryId: 1,
            name: "Домофонный контроллер с поддержкой IP",
            description: "Центральный контроллер для IP-домофонов",
            price: 12000,
            unit: "шт",
            image: "../proekt/products/domofon2.jpg",
            features: ["Поддержка IP", "256 абонентов", "Резервное питание"]
        },
        {
            id: 201,
            categoryId: 2,
            name: "IP камера Hikvision 4MP",
            description: "Уличная IP камера с ИК-подсветкой",
            price: 8500,
            unit: "шт",
            image: "../proekt/products/camera1.jpg",
            features: ["4MP разрешение", "ИК-подсветка 30м", "IP67"]
        },
        {
            id: 202,
            categoryId: 2,
            name: "Купольная IP камера",
            description: "Внутренняя купольная камера для помещений",
            price: 5500,
            unit: "шт",
            image: "../proekt/products/camera2.jpg",
            features: ["2MP", "Встроенный микрофон", "WDR"]
        },
        {
            id: 301,
            categoryId: 3,
            name: "Автоматический шлагбаум 4м",
            description: "Шлагбаум с автоматическим приводом",
            price: 32000,
            unit: "шт",
            image: "../proekt/products/shlagbaum1.jpg",
            features: ["Длина 4 метра", "Автоматический привод", "Пульт ДУ"]
        },
        {
            id: 302,
            categoryId: 3,
            name: "Контроллер доступа",
            description: "Контроллер для управления шлагбаумом",
            price: 15000,
            unit: "шт",
            image: "../proekt/products/controller1.jpg",
            features: ["Считыватель карт", "Блок управления", "Резервный аккумулятор"]
        }
    ]
};
function saveProductsData() {
    localStorage.setItem('perspektiva-products', JSON.stringify(productsData));
}
function loadProductsData() {
    const saved = localStorage.getItem('perspektiva-products');
    if (saved) {
        Object.assign(productsData, JSON.parse(saved));
    }
}
loadProductsData();
window.productsData = productsData;
window.saveProductsData = saveProductsData;
class PriceCalculator {
    constructor() {
        this.cart = [];
        this.total = 0;
        this.isCalculatorOpen = false;
        this.calculatorWindow = null;
    }
    
    init() {
        this.createCalculatorButton();
        this.setupEventListeners();
        this.createCartBadge();
    }
    
    createCalculatorButton() {
        const calcBtn = document.createElement('button');
        calcBtn.id = 'calculator-btn';
        calcBtn.innerHTML = '<i class="fas fa-calculator"></i> Калькулятор';
        calcBtn.className = 'calculator-btn';
        const style = document.createElement('style');
        style.textContent = `
            .calculator-btn {
                position: fixed;
                bottom: 30px;
                right: 100px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                padding: 15px 25px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 9999;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .calculator-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            }
            
            .calculator-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background: #ff4757;
                color: white;
                font-size: 12px;
                min-width: 20px;
                height: 20px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 5px;
            }
            
            .product-calculator-btn {
                background: var(--secondary-color);
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                margin-top: 10px;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            
            .product-calculator-btn:hover {
                background: #e05a00;
                transform: translateY(-2px);
            }
            
            .calculator-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                border-radius: 15px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                z-index: 10000;
                display: none;
                overflow: hidden;
            }
            
            .calculator-header {
                background: linear-gradient(135deg, var(--primary-color), #2a4ba8);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .calculator-content {
                padding: 20px;
                max-height: 70vh;
                overflow-y: auto;
            }
            
            .calculator-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                z-index: 9999;
                display: none;
            }
            
            .close-calculator {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 5px;
            }
            
            .products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            
            .calculator-product {
                border: 1px solid #eee;
                border-radius: 10px;
                padding: 15px;
                transition: all 0.3s ease;
            }
            
            .calculator-product:hover {
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .product-img {
                width: 100%;
                height: 150px;
                background: #f8f9fa;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #999;
                margin-bottom: 10px;
            }
            
            .quantity-controls {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 10px;
            }
            
            .quantity-btn {
                width: 30px;
                height: 30px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 5px;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .quantity-input {
                width: 50px;
                text-align: center;
                padding: 5px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            
            .cart-summary {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin-top: 30px;
                border: 2px solid var(--primary-color);
            }
            
            .cart-item {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
            
            .cart-total {
                font-size: 24px;
                font-weight: bold;
                color: var(--primary-color);
                text-align: right;
                margin-top: 20px;
            }
            
            .print-btn {
                background: var(--secondary-color);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 20px;
                width: 100%;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(calcBtn);
        this.createCalculatorModal();
    }
    
    createCalculatorModal() {
        const overlay = document.createElement('div');
        overlay.className = 'calculator-overlay';
        overlay.id = 'calculator-overlay';
        document.body.appendChild(overlay);
        const modal = document.createElement('div');
        modal.className = 'calculator-modal';
        modal.id = 'calculator-modal';
        
        modal.innerHTML = `
            <div class="calculator-header">
                <h2>Калькулятор стоимости оборудования</h2>
                <button class="close-calculator">&times;</button>
            </div>
            <div class="calculator-content">
                <div class="products-grid" id="calculator-products"></div>
                <div class="cart-summary">
                    <h3>Ваш расчет</h3>
                    <div id="cart-items"></div>
                    <div class="cart-total" id="cart-total">0 ₽</div>
                    <button class="print-btn" id="print-estimate">
                        <i class="fas fa-print"></i> Распечатать смету
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#calculator-btn')) {
                this.openCalculator();
            }
            
            if (e.target.closest('.close-calculator') || 
                e.target.closest('#calculator-overlay')) {
                this.closeCalculator();
            }
            
            if (e.target.closest('.product-calculator-btn')) {
                const productId = e.target.closest('.product-calculator-btn').dataset.productId;
                this.openCalculatorWithProduct(productId);
            }
            
            if (e.target.closest('#print-estimate')) {
                this.printEstimate();
            }
        });
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const productId = e.target.dataset.productId;
                const quantity = parseInt(e.target.value) || 0;
                this.updateCart(productId, quantity);
            }
        });
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-decrease')) {
                const productId = e.target.dataset.productId;
                const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
                let value = parseInt(input.value) || 0;
                if (value > 0) {
                    input.value = value - 1;
                    this.updateCart(productId, value - 1);
                }
            }
            
            if (e.target.classList.contains('quantity-increase')) {
                const productId = e.target.dataset.productId;
                const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
                let value = parseInt(input.value) || 0;
                input.value = value + 1;
                this.updateCart(productId, value + 1);
            }
        });
    }
    
    createCartBadge() {
        const btn = document.querySelector('#calculator-btn');
        const badge = document.createElement('div');
        badge.className = 'calculator-badge';
        badge.id = 'cart-badge';
        badge.textContent = '0';
        btn.appendChild(badge);
    }
    
    openCalculator() {
        document.getElementById('calculator-overlay').style.display = 'block';
        document.getElementById('calculator-modal').style.display = 'block';
        this.renderProducts();
        this.updateCartDisplay();
    }
    
    openCalculatorWithProduct(productId) {
        this.openCalculator();
        this.updateCart(productId, 1);
        setTimeout(() => {
            document.querySelector('.cart-summary').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }
    
    closeCalculator() {
        document.getElementById('calculator-overlay').style.display = 'none';
        document.getElementById('calculator-modal').style.display = 'none';
    }
    
    renderProducts() {
        const container = document.getElementById('calculator-products');
        container.innerHTML = '';
        const categories = {};
        productsData.categories.forEach(cat => {
            categories[cat.id] = {
                ...cat,
                products: []
            };
        });
        productsData.products.forEach(product => {
            if (categories[product.categoryId]) {
                categories[product.categoryId].products.push(product);
            }
        });
        Object.values(categories).forEach(category => {
            if (category.products.length > 0) {
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category.name;
                categoryTitle.style.gridColumn = '1 / -1';
                categoryTitle.style.marginTop = '20px';
                categoryTitle.style.color = 'var(--primary-color)';
                container.appendChild(categoryTitle);
                category.products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.className = 'calculator-product';
                    productElement.innerHTML = `
                        <div class="product-img">
                            <img src="${product.image}" alt="${product.name}" style="max-width:100%;max-height:100%;object-fit:cover;">
                        </div>
                        <h4>${product.name}</h4>
                        <p style="color: #666; font-size: 14px; margin: 10px 0;">${product.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-size: 20px; font-weight: bold; color: var(--secondary-color);">
                                    ${product.price.toLocaleString()} ₽
                                </div>
                                <div style="font-size: 12px; color: #999;">за ${product.unit}</div>
                            </div>
                            <div class="quantity-controls">
                                <button class="quantity-btn quantity-decrease" data-product-id="${product.id}">-</button>
                                <input type="number" 
                                       class="quantity-input" 
                                       data-product-id="${product.id}" 
                                       value="${this.getProductQuantity(product.id)}" 
                                       min="0">
                                <button class="quantity-btn quantity-increase" data-product-id="${product.id}">+</button>
                            </div>
                        </div>
                    `;
                    container.appendChild(productElement);
                });
            }
        });
    }
    
    updateCart(productId, quantity) {
        const product = productsData.products.find(p => p.id == productId);
        if (!product) return;
        const existingIndex = this.cart.findIndex(item => item.id == productId);
        
        if (quantity > 0) {
            if (existingIndex >= 0) {
                this.cart[existingIndex].quantity = quantity;
            } else {
                this.cart.push({
                    ...product,
                    quantity: quantity
                });
            }
        } else {
            if (existingIndex >= 0) {
                this.cart.splice(existingIndex, 1);
            }
        }
        this.updateCartDisplay();
        this.updateCartBadge();
    }
    
    getProductQuantity(productId) {
        const item = this.cart.find(item => item.id == productId);
        return item ? item.quantity : 0;
    }
    
    updateCartDisplay() {
        const container = document.getElementById('cart-items');
        const totalElement = document.getElementById('cart-total');
        
        if (this.cart.length === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">Корзина пуста</p>';
            totalElement.textContent = '0 ₽';
            return;
        }
        
        let html = '';
        let total = 0;
        
        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>${item.quantity} × ${item.price.toLocaleString()} ₽</small>
                    </div>
                    <div style="font-weight: bold; color: var(--secondary-color);">
                        ${itemTotal.toLocaleString()} ₽
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        totalElement.textContent = `${total.toLocaleString()} ₽`;
        this.total = total;
    }
    
    updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    printEstimate() {
        const printWindow = window.open('', '_blank');
        
        let html = `
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Смета - Перспектива ТЦ</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .logo { font-size: 24px; font-weight: bold; color: #1a3a8f; }
                    .date { color: #666; margin-top: 10px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background: #f8f9fa; }
                    .total { font-size: 20px; font-weight: bold; text-align: right; margin-top: 20px; }
                    .footer { margin-top: 50px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">ПЕРСПЕКТИВА ТЦ</div>
                    <div>Обслуживание систем безопасности</div>
                    <div class="date">${new Date().toLocaleDateString('ru-RU')}</div>
                </div>
                
                <h2>Расчет стоимости оборудования</h2>
                
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Наименование</th>
                            <th>Кол-во</th>
                            <th>Ед. изм.</th>
                            <th>Цена за ед.</th>
                            <th>Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        this.cart.forEach((item, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>${item.price.toLocaleString()} ₽</td>
                    <td>${(item.price * item.quantity).toLocaleString()} ₽</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
                
                <div class="total">
                    Итого: ${this.total.toLocaleString()} ₽
                </div>
                
                <div class="footer">
                    <p>Смета сформирована автоматически. Для заказа свяжитесь с нами:</p>
                    <p>Телефон: +7 (495) 316-77-27</p>
                    <p>Email: info@perspektiva-tc.ru</p>
                    <p>Срок действия сметы: 14 дней</p>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 1000);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new PriceCalculator();
    calculator.init();
    window.priceCalculator = calculator;
});
class AdminPanel { 
    init() {
        this.createAdminButton();
        this.setupEventListeners();
        if (this.isAdmin) {
            this.showAdminPanel();
        }
    }
    
    createAdminButton() {
        const adminBtn = document.createElement('button');
        adminBtn.id = 'admin-access-btn';
        adminBtn.innerHTML = '<i class="fas fa-cog"></i>';
        adminBtn.className = 'admin-access-btn';
        const style = document.createElement('style');
        style.textContent = `
            }
            
            .admin-access-btn:hover {
                background: var(--primary-color);
                transform: scale(1.1);
            }
            
            .admin-panel {
                position: fixed;
                top: 0;
                right: -400px;
                width: 400px;
                height: 100vh;
                background: white;
                box-shadow: -5px 0 25px rgba(0,0,0,0.1);
                z-index: 10001;
                transition: right 0.3s ease;
                overflow-y: auto;
                display: none;
            }
            
            .admin-panel.open {
                right: 0;
                display: block;
            }
            
            .admin-header {
                background: var(--primary-color);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .admin-content {
                padding: 20px;
            }
            
            .admin-section {
                margin-bottom: 30px;
                padding: 20px;
                border: 1px solid #eee;
                border-radius: 10px;
            }
            
            .admin-input {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            
            .admin-textarea {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ddd;
                border-radius: 5px;
                min-height: 100px;
                resize: vertical;
            }
            
            .admin-btn {
                background: var(--secondary-color);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin: 5px;
            }
            
            .admin-btn.secondary {
                background: #6c757d;
            }
            
            .product-list-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                border: 1px solid #eee;
                border-radius: 5px;
                margin: 5px 0;
            }
            
            .login-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10002;
                display: none;
            }
            
            .login-modal.open {
                display: block;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(adminBtn);
        this.createAdminPanel();
        this.createLoginModal();
    }
    
    createAdminPanel() {
        const panel = document.createElement('div');
        panel.className = 'admin-panel';
        panel.id = 'admin-panel';
        
        panel.innerHTML = `
            <div class="admin-header">
                <h3>Панель администратора</h3>
                <button class="admin-btn secondary" id="close-admin">&times;</button>
            </div>
            <div class="admin-content">
                <div class="admin-section">
                    <h4>Добавить новый товар</h4>
                    <form id="add-product-form">
                        <input type="text" class="admin-input" id="product-name" placeholder="Название товара" required>
                        <select class="admin-input" id="product-category" required>
                            <option value="">Выберите категорию</option>
                        </select>
                        <input type="number" class="admin-input" id="product-price" placeholder="Цена" required>
                        <input type="text" class="admin-input" id="product-unit" placeholder="Единица измерения (шт, м, кг)" required>
                        <textarea class="admin-textarea" id="product-description" placeholder="Описание товара"></textarea>
                        <input type="text" class="admin-input" id="product-image" placeholder="URL изображения">
                        <textarea class="admin-textarea" id="product-features" placeholder="Характеристики (каждая с новой строки)"></textarea>
                        <button type="submit" class="admin-btn">Добавить товар</button>
                    </form>
                </div>
                
                <div class="admin-section">
                    <h4>Текущие товары</h4>
                    <div id="products-list"></div>
                </div>
                
                <div class="admin-section">
                    <h4>Добавить категорию</h4>
                    <form id="add-category-form">
                        <input type="text" class="admin-input" id="category-name" placeholder="Название категории" required>
                        <textarea class="admin-textarea" id="category-description" placeholder="Описание категории"></textarea>
                        <button type="submit" class="admin-btn">Добавить категорию</button>
                    </form>
                    <div id="categories-list" style="margin-top: 20px;"></div>
                </div>
                
                <div class="admin-section">
                    <h4>Экспорт/Импорт данных</h4>
                    <button class="admin-btn" id="export-data">Экспорт данных</button>
                    <button class="admin-btn secondary" id="import-data">Импорт данных</button>
                    <input type="file" id="import-file" accept=".json" style="display: none;">
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }
    
    createLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.id = 'login-modal';
        
        modal.innerHTML = `
            <h3>Вход в панель администратора</h3>
            <input type="password" class="admin-input" id="admin-password" placeholder="Пароль">
            <button class="admin-btn" id="login-btn">Войти</button>
        `;
        
        document.body.appendChild(modal);
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#admin-access-btn')) {
                if (this.isAdmin) {
                    this.showAdminPanel();
                } else {
                    this.showLoginModal();
                }
            }
            
            if (e.target.closest('#close-admin')) {
                this.hideAdminPanel();
            }
            
            if (e.target.closest('#login-btn')) {
                this.handleLogin();
            }
            
            if (e.target.closest('#export-data')) {
                this.exportData();
            }
            
            if (e.target.closest('#import-data')) {
                document.getElementById('import-file').click();
            }
            
            if (e.target.closest('#add-product-form')) {
                e.preventDefault();
                if (e.target.tagName === 'BUTTON') {
                    this.addProduct();
                }
            }
            
            if (e.target.closest('#add-category-form')) {
                e.preventDefault();
                if (e.target.tagName === 'BUTTON') {
                    this.addCategory();
                }
            }
        });
        document.getElementById('import-file')?.addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
    }
    
    showLoginModal() {
        document.getElementById('login-modal').classList.add('open');
    }
    
    hideLoginModal() {
        document.getElementById('login-modal').classList.remove('open');
        document.getElementById('admin-password').value = '';
    }
    
    handleLogin() {
        const password = document.getElementById('admin-password').value;
        
        if (password === this.adminPassword) {
            this.isAdmin = true;
            localStorage.setItem('perspektiva-admin', 'true');
            this.hideLoginModal();
            this.showAdminPanel();
            alert('Успешный вход в панель администратора!');
        } else {
            alert('Неверный пароль!');
        }
    }
    
    showAdminPanel() {
        document.getElementById('admin-panel').classList.add('open');
        this.renderCategories();
        this.renderProducts();
    }
    
    hideAdminPanel() {
        document.getElementById('admin-panel').classList.remove('open');
    }
    
    renderCategories() {
        const select = document.getElementById('product-category');
        const list = document.getElementById('categories-list');
        select.innerHTML = '<option value="">Выберите категорию</option>';
        productsData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
        list.innerHTML = '';
        productsData.categories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'product-list-item';
            div.innerHTML = `
                <div>
                    <strong>${category.name}</strong>
                    <div style="font-size: 12px; color: #666;">${category.description}</div>
                </div>
                <button class="admin-btn secondary" onclick="adminPanel.deleteCategory(${category.id})">
                    Удалить
                </button>
            `;
            list.appendChild(div);
        });
    }
    
    renderProducts() {
        const list = document.getElementById('products-list');
        list.innerHTML = '';
        
        productsData.products.forEach(product => {
            const category = productsData.categories.find(c => c.id === product.categoryId);
            const div = document.createElement('div');
            div.className = 'product-list-item';
            div.innerHTML = `
                <div style="flex: 1;">
                    <strong>${product.name}</strong>
                    <div style="font-size: 12px; color: #666;">
                        ${category?.name || 'Без категории'} | 
                        ${product.price.toLocaleString()} ₽ за ${product.unit}
                    </div>
                    <div style="font-size: 12px; margin-top: 5px;">${product.description}</div>
                </div>
                <div>
                    <button class="admin-btn secondary" onclick="adminPanel.editProduct(${product.id})">
                        Редакт.
                    </button>
                    <button class="admin-btn secondary" onclick="adminPanel.deleteProduct(${product.id})">
                        Удалить
                    </button>
                </div>
            `;
            list.appendChild(div);
        });
    }
    
    addProduct() {
        const name = document.getElementById('product-name').value;
        const categoryId = parseInt(document.getElementById('product-category').value);
        const price = parseInt(document.getElementById('product-price').value);
        const unit = document.getElementById('product-unit').value;
        const description = document.getElementById('product-description').value;
        const image = document.getElementById('product-image').value;
        const features = document.getElementById('product-features').value
            .split('\n')
            .filter(f => f.trim())
            .map(f => f.trim());
        
        if (!name || !categoryId || !price || !unit) {
            alert('Заполните обязательные поля: название, категория, цена и единица измерения');
            return;
        }
        const newId = Math.max(...productsData.products.map(p => p.id), 0) + 1;
        productsData.products.push({
            id: newId,
            categoryId: categoryId,
            name: name,
            description: description,
            price: price,
            unit: unit,
            image: image || '../proekt/products/default.jpg',
            features: features
        });
        saveProductsData();
        this.renderProducts();
        document.getElementById('add-product-form').reset();
        
        alert('Товар успешно добавлен!');
        if (window.priceCalculator) {
            window.priceCalculator.renderProducts();
        }
    }
    
    addCategory() {
        const name = document.getElementById('category-name').value;
        const description = document.getElementById('category-description').value;
        
        if (!name) {
            alert('Введите название категории');
            return;
        }
        const newId = Math.max(...productsData.categories.map(c => c.id), 0) + 1;
        productsData.categories.push({
            id: newId,
            name: name,
            description: description
        });
        saveProductsData();
        this.renderCategories();
        document.getElementById('add-category-form').reset();
        
        alert('Категория успешно добавлена!');
    }
    
    deleteProduct(productId) {
        if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;
        
        const index = productsData.products.findIndex(p => p.id === productId);
        if (index >= 0) {
            productsData.products.splice(index, 1);
            saveProductsData();
            this.renderProducts();
            if (window.priceCalculator) {
                window.priceCalculator.cart = window.priceCalculator.cart.filter(item => item.id !== productId);
                window.priceCalculator.updateCartDisplay();
                window.priceCalculator.updateCartBadge();
            }
        }
    }
    
    deleteCategory(categoryId) {
        const productsInCategory = productsData.products.filter(p => p.categoryId === categoryId);
        
        if (productsInCategory.length > 0) {
            if (!confirm(`В этой категории ${productsInCategory.length} товаров. Удалить категорию и все товары?`)) {
                return;
            }
            productsData.products = productsData.products.filter(p => p.categoryId !== categoryId);
        }
        const index = productsData.categories.findIndex(c => c.id === categoryId);
        if (index >= 0) {
            productsData.categories.splice(index, 1);
            saveProductsData();
            this.renderCategories();
            this.renderProducts();
            
            alert('Категория удалена!');
        }
    }
    
    editProduct(productId) {
        const product = productsData.products.find(p => p.id === productId);
        if (!product) return;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.categoryId;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-unit').value = product.unit;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-features').value = product.features.join('\n');
        document.querySelector('#add-product-form').scrollIntoView({ behavior: 'smooth' });
        const form = document.getElementById('add-product-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Обновить товар';
        submitBtn.onclick = (e) => {
            e.preventDefault();
            this.updateProduct(productId);
        };
    }
    
    updateProduct(productId) {
        const index = productsData.products.findIndex(p => p.id === productId);
        if (index < 0) return;
        
        const name = document.getElementById('product-name').value;
        const categoryId = parseInt(document.getElementById('product-category').value);
        const price = parseInt(document.getElementById('product-price').value);
        const unit = document.getElementById('product-unit').value;
        const description = document.getElementById('product-description').value;
        const image = document.getElementById('product-image').value;
        const features = document.getElementById('product-features').value
            .split('\n')
            .filter(f => f.trim())
            .map(f => f.trim());
        productsData.products[index] = {
            ...productsData.products[index],
            name: name,
            categoryId: categoryId,
            price: price,
            unit: unit,
            description: description,
            image: image,
            features: features
        };
        
        saveProductsData();
        this.renderProducts();
        const submitBtn = document.querySelector('#add-product-form button[type="submit"]');
        submitBtn.textContent = 'Добавить товар';
        submitBtn.onclick = null;
        document.getElementById('add-product-form').reset();
        
        alert('Товар успешно обновлен!');
    }
    
    exportData() {
        const dataStr = JSON.stringify(productsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `products-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    importData(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.categories && data.products) {
                    Object.assign(productsData, data);
                    saveProductsData();
                    this.renderCategories();
                    this.renderProducts();
                    if (window.priceCalculator) {
                        window.priceCalculator.cart = [];
                        window.priceCalculator.renderProducts();
                        window.priceCalculator.updateCartDisplay();
                        window.priceCalculator.updateCartBadge();
                    }
                    
                    alert('Данные успешно импортированы!');
                } else {
                    alert('Неверный формат файла!');
                }
            } catch (error) {
                alert('Ошибка при чтении файла: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const adminPanel = new AdminPanel();
    window.adminPanel = adminPanel;
});
class ProductCalculatorIntegration {
    constructor() {
        this.init();
    }
    
    init() {
        this.addCalculatorButtonsToServices();
        this.setupProductLinks();
    }
    
    addCalculatorButtonsToServices() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            const content = card.querySelector('.service-content');
            if (!content) return;
            let productIds = [];
            
            switch(index) {
                case 0:
                    productIds = [101, 102];
                    break;
                case 1:
                    productIds = [201, 202];
                    break;
                case 2:
                    productIds = [301, 302];
                    break;
            }
            const calcBtn = document.createElement('button');
            calcBtn.className = 'product-calculator-btn';
            calcBtn.innerHTML = '<i class="fas fa-calculator"></i> Рассчитать стоимость';
            calcBtn.dataset.productIds = productIds.join(',');
            
            calcBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (window.priceCalculator) {
                    if (productIds.length > 0) {
                        window.priceCalculator.openCalculatorWithProduct(productIds[0]);
                    } else {
                        window.priceCalculator.openCalculator();
                    }
                }
            });
            
            content.appendChild(calcBtn);
        });
    }
    
    setupProductLinks() {

        const productsSection = document.createElement('section');
        productsSection.className = 'section';
        productsSection.id = 'products';
        productsSection.style.display = 'none';
        
        productsSection.innerHTML = `
            <div class="container">
                <div class="section-title">
                    <h2>Каталог оборудования</h2>
                    <p>Сертифицированное оборудование от ведущих производителей</p>
                </div>
                
                <div class="products-catalog" id="products-catalog"></div>
            </div>
        `;
        const footer = document.querySelector('footer');
        footer.parentNode.insertBefore(productsSection, footer);
        this.renderProductsCatalog();
    }
    
    renderProductsCatalog() {
        const container = document.getElementById('products-catalog');
        if (!container) return;
        const categories = {};
        productsData.categories.forEach(cat => {
            categories[cat.id] = {
                ...cat,
                products: []
            };
        });
        
        productsData.products.forEach(product => {
            if (categories[product.categoryId]) {
                categories[product.categoryId].products.push(product);
            }
        });
        
        let html = '';
        
        Object.values(categories).forEach(category => {
            if (category.products.length > 0) {
                html += `
                    <div class="product-category" style="margin-bottom: 40px;">
                        <h3 style="color: var(--primary-color); margin-bottom: 20px; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                            ${category.name}
                        </h3>
                        <div class="category-products" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                `;
                
                category.products.forEach(product => {
                    html += `
                        <div class="product-item" style="border: 1px solid #eee; border-radius: 10px; padding: 15px; background: white;">
                            <div class="product-img-placeholder" style="height: 150px; background: #f8f9fa; border-radius: 5px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; color: #999;">
                                <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%; object-fit: cover;">
                            </div>
                            <h4 style="margin-bottom: 10px; font-size: 16px;">${product.name}</h4>
                            <div style="color: var(--secondary-color); font-size: 18px; font-weight: bold; margin-bottom: 15px;">
                                ${product.price.toLocaleString()} ₽
                            </div>
                            <button class="product-calculator-btn" data-product-id="${product.id}" style="width: 100%;">
                                <i class="fas fa-calculator"></i> Добавить в расчет
                            </button>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            }
        });
        container.innerHTML = html;
        container.querySelectorAll('.product-calculator-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = btn.dataset.productId;
                if (window.priceCalculator && productId) {
                    window.priceCalculator.openCalculatorWithProduct(productId);
                }
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ProductCalculatorIntegration();
});
class HiddenAdmin {hideAdminPanelByDefault() {
    const adminPanel = document.getElementById('admin-panel');
    const adminAccessBtn = document.getElementById('admin-access-btn');
    
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
    
    if (adminAccessBtn) {
        adminAccessBtn.style.display = 'none';
    }
}
    constructor() {
        this.password = '123';
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
        this.init();
    }
    
init() {
    this.createHiddenButton();
    this.createLoginForm();
    this.checkAdminStatus();
    setTimeout(() => {
        this.hideAdminPanelByDefault();
    }, 500);
}
    createHiddenButton() {
        const hiddenBtn = document.createElement('div');
        hiddenBtn.id = 'hidden-admin-access';
        hiddenBtn.innerHTML = '⚙️';
        hiddenBtn.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            width: 30px;
            height: 30px;
            background: rgba(0,0,0,0.1);
            color: rgba(0,0,0,0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            cursor: pointer;
            z-index: 9997;
            opacity: 0.3;
            transition: all 0.3s;
            user-select: none;
        `;
        hiddenBtn.onmouseover = () => {
            hiddenBtn.style.opacity = '0.5';
            hiddenBtn.style.background = 'rgba(0,0,0,0.2)';
        };
        
        hiddenBtn.onmouseout = () => {
            hiddenBtn.style.opacity = '0.3';
            hiddenBtn.style.background = 'rgba(0,0,0,0.1)';
        };
        hiddenBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showLoginForm();
        };
        
        document.body.appendChild(hiddenBtn);
    }
    
    createLoginForm() {
        const form = document.createElement('div');
        form.id = 'admin-login-form';
        form.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.2);
            z-index: 9999;
            min-width: 300px;
            text-align: center;
        `;
        
        form.innerHTML = `
            <h3 style="margin-bottom: 20px; color: #333;">
                <i class="fas fa-lock"></i> Вход для администратора
            </h3>
            <input type="password" 
                   id="admin-pass-input" 
                   placeholder="Введите пароль"
                   style="
                       width: 100%;
                       padding: 12px;
                       margin: 10px 0;
                       border: 2px solid #ddd;
                       border-radius: 5px;
                       font-size: 16px;
                       box-sizing: border-box;
                   ">
            <div style="margin-top: 20px;">
                <button id="admin-login-btn" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-right: 10px;
                ">
                    <i class="fas fa-sign-in-alt"></i> Войти
                </button>
                <button id="admin-cancel-btn" style="
                    background: #f44336;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">
                    Отмена
                </button>
            </div>
            <div id="login-error" style="
                color: #f44336;
                margin-top: 15px;
                display: none;
                font-size: 14px;
            ">
                <i class="fas fa-exclamation-circle"></i> Неверный пароль
            </div>
        `;
        
        document.body.appendChild(form);
        document.getElementById('admin-login-btn').onclick = () => this.checkPassword();
        document.getElementById('admin-cancel-btn').onclick = () => this.hideLoginForm();
        document.getElementById('admin-pass-input').onkeypress = (e) => {
            if (e.key === 'Enter') this.checkPassword();
        };
        document.addEventListener('click', (e) => {
            if (e.target.id === 'admin-login-form' || 
               (e.target.closest && !e.target.closest('#admin-login-form') && 
                !e.target.closest('#hidden-admin-access'))) {
                this.hideLoginForm();
            }
        });
    }
    
    showLoginForm() {
        document.getElementById('admin-login-form').style.display = 'block';
        document.getElementById('admin-pass-input').focus();
        document.getElementById('login-error').style.display = 'none';
    }
    
    hideLoginForm() {
        document.getElementById('admin-login-form').style.display = 'none';
        document.getElementById('admin-pass-input').value = '';
    }
    
    checkPassword() {
        const input = document.getElementById('admin-pass-input');
        const error = document.getElementById('login-error');
        
        if (input.value === this.password) {
            this.isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
            this.hideLoginForm();
            this.showAdminButton();
            this.showSuccessMessage('Вы вошли как администратор');
        } else {
            error.style.display = 'block';
            input.value = '';
            input.focus();
            input.style.borderColor = '#f44336';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.borderColor = '#ddd';
                input.style.animation = '';
            }, 500);
        }
    }
    
    checkAdminStatus() {
        if (this.isAdmin) {
            this.showAdminButton();
        } else {
            this.hideAdminButton();
        }
    }
    
showAdminButton() {
    const adminBtn = document.getElementById('admin-access-btn');
    const adminPanel = document.getElementById('admin-panel');
    
    if (adminBtn) {
        adminBtn.style.display = 'flex';
    }
    
    if (adminPanel) {
        adminPanel.style.display = 'block';
    }
}
    hideAdminButton() {
        const adminBtn = document.getElementById('admin-access-btn');
        if (adminBtn) {
            adminBtn.style.display = 'none';
        }
    }
    
    showSuccessMessage(text) {
        alert(text);
    }
    logout() {
    this.isAdmin = false;
    localStorage.removeItem('isAdmin');
    this.hideAdminButton();
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.remove();
    }
    
    this.showSuccessMessage('Вы вышли из аккаунта администратора');
}
}
if (!document.querySelector('#shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}
document.addEventListener('DOMContentLoaded', () => {
    const hiddenAdmin = new HiddenAdmin();
    window.hiddenAdmin = hiddenAdmin;
});
class ReviewsSystem {
    constructor() {
        this.reviews = JSON.parse(localStorage.getItem('perspektiva-reviews')) || [];
        this.currentPage = 1;
        this.reviewsPerPage = 6;
        this.currentFilter = 'all';
        this.isAdmin = localStorage.getItem('perspektiva-admin') === 'true';
        this.init();
    }
    
    init() {
        this.loadReviews();
        this.setupEventListeners();
        this.updateStatistics();
        this.renderReviews();
        this.setupAdminControls();
    }
    
    loadReviews() {
        if (this.reviews.length === 0) {
            this.reviews = [
                {
                    id: 1,
                    name: "Иван Петров",
                    city: "Москва",
                    service: "domofon",
                    rating: 5,
                    text: "Отличная работа! Починили домофон быстро и качественно. Мастер приехал в течение часа. Рекомендую!",
                    date: "2024-01-15",
                    approved: true,
                    email: ""
                },
                {
                    id: 2,
                    name: "Мария Иванова",
                    city: "Химки",
                    service: "camera",
                    rating: 4,
                    text: "Установили систему видеонаблюдения в подъезде. Работают уже полгода без нареканий. Спасибо!",
                    date: "2024-01-10",
                    approved: true,
                    email: ""
                },
                {
                    id: 3,
                    name: "Алексей Смирнов",
                    city: "Подольск",
                    service: "shlagbaum",
                    rating: 5,
                    text: "Починили шлагбаум на въезде в наш ЖК. Работают профессионально, дали гарантию. Буем сотрудничать дальше.",
                    date: "2024-01-05",
                    approved: true,
                    email: ""
                }
            ];
            this.saveReviews();
        }
    }
    
    saveReviews() {
        localStorage.setItem('perspektiva-reviews', JSON.stringify(this.reviews));
    }
    
    setupEventListeners() {
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addReview();
            });
        }
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterReviews(btn.dataset.filter);
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    addReview() {
        const name = document.getElementById('reviewName').value.trim();
        const city = document.getElementById('reviewCity').value.trim();
        const email = document.getElementById('reviewEmail').value.trim();
        const service = document.getElementById('reviewService').value;
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const text = document.getElementById('reviewText').value.trim();
        
        if (!name || !rating || !text) {
            alert('Пожалуйста, заполните все обязательные поля (имя, оценка, текст отзыва)');
            return;
        }
        
        const newReview = {
            id: Date.now(),
            name: name,
            city: city || 'Москва',
            email: email,
            service: service,
            rating: parseInt(rating),
            text: text,
            date: new Date().toISOString().split('T')[0],
            approved: this.isAdmin,
            moderatorComment: ''
        };
        
        this.reviews.push(newReview);
        this.saveReviews();
        document.getElementById('reviewForm').reset();
        const successMsg = document.getElementById('reviewSuccess');
        successMsg.style.display = 'flex';
        
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
        this.updateStatistics();
        this.renderReviews();
        this.notifyAdmin(newReview);
    }
    
    filterReviews(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        this.renderReviews();
    }
    
    getFilteredReviews() {
        let filtered = this.reviews.filter(review => review.approved);
        
        if (this.currentFilter !== 'all') {
            if (['5', '4', '3', '2', '1'].includes(this.currentFilter)) {
                filtered = filtered.filter(review => review.rating == this.currentFilter);
            } else {
                filtered = filtered.filter(review => review.service === this.currentFilter);
            }
        }
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return filtered;
    }
    
    renderReviews() {
        const container = document.getElementById('reviewsGrid');
        const pagination = document.getElementById('reviewsPagination');
        
        if (!container) return;
        
        const filteredReviews = this.getFilteredReviews();
        const totalPages = Math.ceil(filteredReviews.length / this.reviewsPerPage);
        const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        const pageReviews = filteredReviews.slice(startIndex, endIndex);
        container.innerHTML = '';
        
        if (pageReviews.length === 0) {
            container.innerHTML = `
                <div class="no-reviews" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                    <h3>Пока нет отзывов</h3>
                    <p>Будьте первым, кто оставит отзыв!</p>
                </div>
            `;
        } else {
            pageReviews.forEach(review => {
                const reviewCard = this.createReviewCard(review);
                container.appendChild(reviewCard);
            });
        }
        this.renderPagination(pagination, totalPages);
    }
    
    createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.dataset.id = review.id;
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= review.rating ? '★' : '☆';
        }
        const serviceNames = {
            'domofon': 'Домофоны',
            'camera': 'Видеонаблюдение',
            'shlagbaum': 'Шлагбаумы',
            'other': 'Другие услуги'
        };
        
        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    ${review.city ? `<div class="review-city">${review.city}</div>` : ''}
                </div>
                <div class="review-date">${this.formatDate(review.date)}</div>
            </div>
            
            <div class="review-rating" title="${review.rating} из 5 звезд">
                ${stars}
            </div>
            
            <div class="review-text">
                ${this.escapeHtml(review.text)}
            </div>
            
            ${review.service ? `<div class="review-service">${serviceNames[review.service] || review.service}</div>` : ''}
            
            ${this.isAdmin ? `
                <div class="review-admin-controls">
                    ${!review.approved ? `
                        <button class="admin-btn btn-approve" onclick="reviewsSystem.approveReview(${review.id})">
                            <i class="fas fa-check"></i> Одобрить
                        </button>
                    ` : ''}
                    <button class="admin-btn btn-delete" onclick="reviewsSystem.deleteReview(${review.id})">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            ` : ''}
        `;
        
        return card;
    }
    
    renderPagination(container, totalPages) {
        if (!container || totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let html = '';
        html += `
            <button class="page-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="reviewsSystem.changePage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                html += `
                    <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                            onclick="reviewsSystem.changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                html += `<span class="page-dots">...</span>`;
            }
        }
        html += `
            <button class="page-btn ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    onclick="reviewsSystem.changePage(${this.currentPage + 1})" 
                    ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        container.innerHTML = html;
    }
    
    changePage(page) {
        const filteredReviews = this.getFilteredReviews();
        const totalPages = Math.ceil(filteredReviews.length / this.reviewsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderReviews();
        }
    }
    
    updateStatistics() {
        const approvedReviews = this.reviews.filter(r => r.approved);
        const total = approvedReviews.length;
        
        if (total > 0) {
            const average = (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1);
            const positive = Math.round((approvedReviews.filter(r => r.rating >= 4).length / total) * 100);
            
            document.getElementById('totalReviews').textContent = total;
            document.getElementById('averageRating').textContent = average;
            document.getElementById('positiveReviews').textContent = positive + '%';
        } else {
            document.getElementById('totalReviews').textContent = '0';
            document.getElementById('averageRating').textContent = '0';
            document.getElementById('positiveReviews').textContent = '0%';
        }
    }
    setupAdminControls() {
        if (this.isAdmin) {
            this.addAdminTab();
            this.addLogoutButtonToPanel();
        }
    }
    
    addAdminTab() {
        const adminPanel = document.querySelector('.admin-content');
        if (!adminPanel) return;
        
        const tabHtml = `
            <div class="admin-section">
                <h4>Модерация отзывов</h4>
                <div id="moderation-list"></div>
            </div>
        `;
        
        adminPanel.insertAdjacentHTML('beforeend', tabHtml);
        this.renderModerationList();
    }
    
    renderModerationList() {
        const container = document.getElementById('moderation-list');
        if (!container) return;
        
        const pendingReviews = this.reviews.filter(r => !r.approved);
        
        if (pendingReviews.length === 0) {
            container.innerHTML = '<p>Нет отзывов для модерации</p>';
            return;
        }
        
        let html = '';
        pendingReviews.forEach(review => {
            html += `
                <div class="moderation-item" style="border: 1px solid #eee; padding: 15px; margin: 10px 0; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong>${review.name}</strong>
                        <small>${review.date}</small>
                    </div>
                    <div style="color: #ffc107; margin: 5px 0;">${'★'.repeat(review.rating)}</div>
                    <p style="margin: 10px 0;">${this.escapeHtml(review.text)}</p>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button class="admin-btn btn-approve" onclick="reviewsSystem.approveReview(${review.id})">
                            Одобрить
                        </button>
                        <button class="admin-btn btn-reject" onclick="reviewsSystem.rejectReview(${review.id})">
                            Отклонить
                        </button>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    approveReview(id) {
        const review = this.reviews.find(r => r.id === id);
        if (review) {
            review.approved = true;
            review.moderatedAt = new Date().toISOString();
            this.saveReviews();
            alert('Отзыв одобрен и опубликован!');
            this.renderReviews();
            this.updateStatistics();
            this.renderModerationList();
        }
    }
    
    rejectReview(id) {
        const reason = prompt('Укажите причину отклонения отзыва:');
        if (reason !== null) {
            const review = this.reviews.find(r => r.id === id);
            if (review) {
                review.moderatorComment = reason;
                review.approved = false;
                this.reviews = this.reviews.filter(r => r.id !== id);
                this.saveReviews();
                
                alert('Отзыв отклонен');
                this.renderReviews();
                this.updateStatistics();
                this.renderModerationList();
            }
        }
    }
    
    deleteReview(id) {
        if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            this.reviews = this.reviews.filter(r => r.id !== id);
            this.saveReviews();
            this.renderReviews();
            this.updateStatistics();
            
            if (this.isAdmin) {
                this.renderModerationList();
            }
        }
    }
    
    addLogoutButtonToPanel() {
        const adminHeader = document.querySelector('.admin-header');
        if (adminHeader) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'admin-btn secondary';
            logoutBtn.id = 'admin-logout-btn';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Выйти';
            logoutBtn.onclick = () => {
                localStorage.removeItem('perspektiva-admin');
                location.reload();
            };
            adminHeader.appendChild(logoutBtn);
        }
    }
    
    notifyAdmin(newReview) {
        if (!this.isAdmin) {
            console.log('Новый отзыв требует модерации:', newReview);
            if (window.adminPanel) {
                alert('Новый отзыв добавлен и ожидает модерации');
            }
        }
    }
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    window.reviewsSystem = new ReviewsSystem();
});
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    initSmoothScroll();
    initContactForm();
    initPhoneMask();
    initScrollToTop();
    initNavHighlight();
    initAnimations();
    initServiceCards();
    setupCallBack();
    initMap();
    initSupportWidget();
    
    // Дополнительные модули
    initFAQAccordion();
    initFormTypeDetection();
    addSchemaMarkup();
    initAnalytics();
    setupCallTracking();
    setupGeoTargeting();
    generateSitemapLink();
    initBlog();
    initReviewsSlider();
    initPriceCalculator();
    if (window.PriceCalculator) {
        const calculator = new PriceCalculator();
        calculator.init();
        window.priceCalculator = calculator;
    }
    if (window.AdminPanel) {
        const adminPanel = new AdminPanel();
        window.adminPanel = adminPanel;
    }
    if (window.HiddenAdmin) {
        const hiddenAdmin = new HiddenAdmin();
        window.hiddenAdmin = hiddenAdmin;
    }
    if (window.ReviewsSystem) {
        window.reviewsSystem = new ReviewsSystem();
    }
    
    console.log('Все модули инициализированы');
});
function initAnalytics() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-123456789/AbC-D_EFghIJKLMNOPQRS',
                    'value': 1.0,
                    'currency': 'RUB'
                });
            }
            if (typeof ym !== 'undefined') {
                ym(12345678, 'reachGoal', 'form_submission');
            }
        });
    }
}
class CRMIntegration {
    constructor() {
        this.crmUrl = 'https://ваша-crm.ru/api/webhook';
        this.apiKey = 'ваш_api_ключ';
    }
    
    async sendLead(formData) {
        const leadData = {
            source: 'website',
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            message: formData.message,
            utm_source: this.getUTMParameter('utm_source'),
            utm_medium: this.getUTMParameter('utm_medium'),
            utm_campaign: this.getUTMParameter('utm_campaign'),
            timestamp: new Date().toISOString()
        };
        
        try {
            const response = await fetch(this.crmUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(leadData)
            });
            
            if (response.ok) {
                console.log('Lead sent to CRM successfully');
                return true;
            } else {
                console.error('CRM error:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Error sending to CRM:', error);
            return false;
        }
    }
    
    getUTMParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || '';
    }
    sendToBitrix24(data) {
        const bitrixUrl = 'https://ваш-портал.bitrix24.ru/rest/1/ваш-ключ/crm.lead.add.json';
        
        const bitrixData = {
            fields: {
                TITLE: `Заявка с сайта: ${data.service}`,
                NAME: data.name,
                PHONE: [{VALUE: data.phone, VALUE_TYPE: 'WORK'}],
                EMAIL: [{VALUE: data.email, VALUE_TYPE: 'WORK'}],
                COMMENTS: data.message,
                SOURCE_ID: 'WEB',
                UTM_SOURCE: data.utm_source,
                UTM_MEDIUM: data.utm_medium,
                UTM_CAMPAIGN: data.utm_campaign
            }
        };
        
    
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.crm = new CRMIntegration();
    

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {

            if (window.crm) {
                const formData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    service: document.getElementById('service').value,
                    message: document.getElementById('message').value
                };
                
                await window.crm.sendLead(formData);
            }
        });
    }
});
function sendFormToServer(formData) {
    if (window.crm && window.crm.sendLead) {
        window.crm.sendLead(formData);
    }
    
    if (window.telegramBot && window.telegramBot.sendNewLead) {
        window.telegramBot.sendNewLead(formData);
    }
    fetch('https://formspree.io/f/ваш_id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            showSuccessMessage();
        }
    });
}