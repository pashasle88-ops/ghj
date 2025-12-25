// Главная функция инициализации всего
function initAllFunctions() {
    console.log('Инициализация всех модулей сайта...');
    
    // Основные функции
    initSmoothScroll();
    initContactForm();
    initPhoneMask();
    initScrollToTop();
    initNavHighlight();
    initAnimations();
    
    // Дополнительные модули
    if (typeof initFAQAccordion === 'function') initFAQAccordion();
    if (typeof initFormTypeDetection === 'function') initFormTypeDetection();
    if (typeof initSupportWidget === 'function') initSupportWidget();
    if (typeof initMapSection === 'function') initMapSection();
    if (typeof initAnalytics === 'function') initAnalytics();
    if (typeof setupCallTracking === 'function') setupCallTracking();
    
    // Системы
    if (typeof PriceCalculator !== 'undefined') {
        const calculator = new PriceCalculator();
        calculator.init();
        window.priceCalculator = calculator;
    }
    
    if (typeof AdminPanel !== 'undefined') {
        const adminPanel = new AdminPanel();
        window.adminPanel = adminPanel;
    }
    
    if (typeof HiddenAdmin !== 'undefined') {
        const hiddenAdmin = new HiddenAdmin();
        window.hiddenAdmin = hiddenAdmin;
    }
    
    if (typeof ReviewsSystem !== 'undefined') {
        window.reviewsSystem = new ReviewsSystem();
    }
    
    if (typeof ProductCalculatorIntegration !== 'undefined') {
        new ProductCalculatorIntegration();
    }
    
    console.log('Все модули инициализированы!');
}

// Добавьте в конец proekt.js
document.addEventListener('DOMContentLoaded', function() {
    // Если контент уже загружен (при прямом открытии proekt.html)
    if (document.querySelector('section.hero')) {
        initAllFunctions();
    }
    // Если используется index.html, он вызовет initAllFunctions сам
});

// Сделаем функции глобальными для доступа из index.html
window.initAllFunctions = initAllFunctions;

// DOMContentLoaded - ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    
    // Инициализация всех функций
    initSmoothScroll();
    initContactForm();
    initPhoneMask();
    initScrollToTop();
    initNavHighlight();
    initAnimations();
});

// 1. Плавная прокрутка к якорям
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Учитываем высоту фиксированного header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем активный пункт меню
                updateActiveNav(this);
            }
        });
    });
}

// 2. Обработка контактной формы
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидация формы
        if (!validateForm()) {
            return;
        }
        
        // Получаем данные формы
        const formData = getFormData();
        
        // Показываем индикатор загрузки
        showLoading(true);
        
        // Имитируем отправку на сервер (задержка 1.5 секунды)
        setTimeout(() => {
            // В реальном приложении здесь будет отправка данных на сервер
            sendFormToServer(formData);
            
            // Показываем сообщение об успехе
            showSuccessMessage();
            // Добавляем кнопку выхода в админ-панель
this.addLogoutButtonToPanel();
            // Очищаем форму
            contactForm.reset();
            
            // Скрываем индикатор загрузки
            showLoading(false);
        }, 1500);
    });
}

// Валидация формы
function validateForm() {
    let isValid = true;
    
    // Проверка имени
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Пожалуйста, введите ваше имя');
        isValid = false;
    } else {
        clearError(nameInput);
    }
    
    // Проверка телефона
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        showError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
        isValid = false;
    } else {
        clearError(phoneInput);
    }
    
    // Проверка email
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

// Получение данных формы
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

// Имитация отправки на сервер
function sendFormToServer(formData) {
    console.log('Данные формы для отправки на сервер:');
    console.log(formData);
    
    // В реальном приложении здесь будет fetch запрос
    // Пример для отправки на Formspree:
    /*
    fetch('https://formspree.io/f/ваш_ид_формы', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Форма успешно отправлена');
        } else {
            throw new Error('Ошибка отправки формы');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        showErrorMessage();
    });
    */
    
    // Для демонстрации отправки на почту можно использовать EmailJS:
    /*
    emailjs.send('service_id', 'template_id', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    */
}

// Показать сообщение об успехе
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'flex';
        
        // Автоматически скрыть через 5 секунд
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Прокрутить к сообщению
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Показать сообщение об ошибке
function showErrorMessage() {
    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или позвоните нам.');
}

// Показать/скрыть индикатор загрузки
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

// Показать ошибку поля
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    // Удаляем старую ошибку
    clearError(input);
    
    // Добавляем новую ошибку
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
    input.style.borderColor = '#dc3545';
}

// Очистить ошибку поля
function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    input.style.borderColor = '#ddd';
}

// 3. Маска для телефона
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
    
    // Сохраняем значение при фокусе
    phoneInput.addEventListener('focus', function() {
        if (!this.value) {
            this.value = '+7 (';
        }
    });
    
    // Валидация при потере фокуса
    phoneInput.addEventListener('blur', function() {
        if (this.value === '+7 (') {
            this.value = '';
        }
    });
}

// 4. Кнопка "Наверх"
function initScrollToTop() {
    // Создаем кнопку
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Показываем/скрываем кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Обработчик клика
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 5. Подсветка активного пункта меню
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

// Обновление активного пункта меню при клике
function updateActiveNav(clickedLink) {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// 6. Анимации при прокрутке
function initAnimations() {
    // Создаем наблюдатель для анимаций
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
    
    // Наблюдаем за элементами для анимации
    const animateElements = document.querySelectorAll('.service-card, .info-item, .team-member');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// 7. Дополнительные функции
// Отправка данных формы на реальный email сервис
function setupEmailService() {
    // Для использования EmailJS (бесплатно до 200 писем в месяц):
    // 1. Зарегистрируйтесь на https://www.emailjs.com/
    // 2. Создайте сервис и шаблон письма
    // 3. Добавьте этот код в initContactForm():
    
    /*
    // Инициализация EmailJS с вашим Public Key
    emailjs.init("YOUR_PUBLIC_KEY");
    
    // В функции sendFormToServer:
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            showSuccessMessage();
        }, function(error) {
            console.log("FAILED...", error);
            showErrorMessage();
        });
    */
    
    // Для использования Formspree (бесплатно):
    // 1. Зарегистрируйтесь на https://formspree.io/
    // 2. Создайте новую форму
    // 3. Замените URL в fetch запросе на ваш URL от Formspree
}

// Обработка заявки на обратный звонок
function setupCallBack() {
    const callBackBtn = document.querySelector('.btn[href="#contact"]');
    if (callBackBtn && callBackBtn.textContent.includes('Заказать звонок')) {
        callBackBtn.addEventListener('click', function(e) {
            // Можно автоматически заполнить поле "Сообщение"
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = 'Прошу перезвонить для консультации';
            }
            
            // Прокрутка к форме
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
// 9. Инициализация карты
function initMap() {
    const mapWrapper = document.querySelector('.map-wrapper');
    const mapIframe = mapWrapper?.querySelector('iframe');
    
    if (!mapIframe) return;
    
    // Показываем состояние загрузки
    mapWrapper.classList.add('loading');
    
    // Обработка загрузки карты
    mapIframe.addEventListener('load', function() {
        mapWrapper.classList.remove('loading');
        console.log('Карта успешно загружена');
        
        // Добавляем кнопки управления
        addMapControls();
    });
    
    // Обработка ошибок загрузки
    mapIframe.addEventListener('error', function() {
        mapWrapper.classList.remove('loading');
        mapWrapper.classList.add('error');
        console.log('Ошибка загрузки карты');
    });
    
    // Функция для открытия карты в отдельном окне
    function openMapInNewWindow() {
        const mapUrl = "https://yandex.ru/maps/?text=Москва, Сумский проезд 8к 3";
        window.open(mapUrl, '_blank');
    }
    
    // Функция для построения маршрута
    function buildRoute() {
        const routeUrl = "https://yandex.ru/maps/?rtext=~Москва, Сумский проезд 8к 3&rtt=auto";
        window.open(routeUrl, '_blank');
    }
    
    // Добавление кнопок управления на карту
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
    
    // Функция полноэкранного режима для карты
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
    
    // Обработчик выхода из полноэкранного режима
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

// Добавьте вызов функции в DOMContentLoaded:
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    
    // Инициализация всех функций
    initSmoothScroll();
    initContactForm();
    initPhoneMask();
    initScrollToTop();
    initNavHighlight();
    initAnimations();
    initServiceCards();
    setupCallBack();
    initMap(); // <-- ДОБАВЬТЕ ЭТУ СТРОЧКУ
});
// 10. Инициализация карты
function initMapSection() {
    const mapWrapper = document.querySelector('.map-wrapper');
    if (!mapWrapper) return;
    
    const mapIframe = mapWrapper.querySelector('iframe');
    if (!mapIframe) return;
    
    // Показываем индикатор загрузки
    mapWrapper.classList.add('loading');
    
    // Убираем индикатор после загрузки
    mapIframe.addEventListener('load', function() {
        mapWrapper.classList.remove('loading');
        console.log('Карта успешно загружена');
    });
    
    // Если ошибка загрузки
    mapIframe.addEventListener('error', function() {
        mapWrapper.classList.remove('loading');
        console.log('Ошибка загрузки карты');
        showMapFallback();
    });
    
    // Функция для отображения запасного варианта
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

// Добавьте вызов функции в DOMContentLoaded (если у вас уже есть обработчик DOMContentLoaded, просто добавьте initMapSection внутрь него)
// Если у вас уже есть обработчик, просто добавьте initMapSection() внутрь него:

// Или создайте отдельный обработчик, если нужно:
document.addEventListener('DOMContentLoaded', function() {
    // ... ваш существующий код ...
    
    // Добавьте эту строку в конце:
    initMapSection();
});
// 11. Кнопка поддержки
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
    
    // Открытие/закрытие попапа поддержки
    supportBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        supportPopup.classList.toggle('show');
        
        // Закрываем чат если открыт
        if (miniChat.classList.contains('show')) {
            miniChat.classList.remove('show');
        }
    });
    
    // Закрытие попапа
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            supportPopup.classList.remove('show');
        });
    }
    
    // Закрытие при клике вне попапа
    document.addEventListener('click', function(e) {
        if (!supportPopup.contains(e.target) && !supportBtn.contains(e.target)) {
            supportPopup.classList.remove('show');
        }
    });
    
    // Открытие чата
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            supportPopup.classList.remove('show');
            
            // Показываем чат с задержкой
            setTimeout(() => {
                miniChat.classList.add('show');
                
                // Фокус на поле ввода
                setTimeout(() => {
                    if (chatInput) chatInput.focus();
                }, 300);
            }, 300);
        });
    }
    
    // Закрытие чата
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            miniChat.classList.remove('show');
        });
    }
    
    // Отправка сообщения в чате
    if (sendBtn && chatInput) {
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Добавляем сообщение пользователя
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
            
            // Очищаем поле ввода
            chatInput.value = '';
            
            // Прокручиваем к новому сообщению
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Имитируем ответ оператора
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
                
                // Прокручиваем к новому сообщению
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Имитация печати оператора
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
        
        // Отправка по клику
        sendBtn.addEventListener('click', sendMessage);
        
        // Отправка по Enter
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Анимация кнопки поддержки при скролле
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Прячем кнопку при скролле вниз
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            supportBtn.style.transform = 'translateY(100px)';
            supportBtn.style.opacity = '0';
        } else {
            supportBtn.style.transform = 'translateY(0)';
            supportBtn.style.opacity = '1';
        }
        lastScrollTop = scrollTop;
    });
    
    // Закрытие попапа по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            supportPopup.classList.remove('show');
            if (miniChat) miniChat.classList.remove('show');
        }
    });
    
    // Добавляем эффект наведения на кнопку
    supportBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.animation = 'none';
    });
    
    supportBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.animation = 'pulse 2s infinite';
    });
}

// Добавьте вызов в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    
    // ... ваш существующий код ...
    
    initSupportWidget();
});
// 8. FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// 9. Form Type Detection
function initFormTypeDetection() {
    const formLinks = document.querySelectorAll('[data-form-type]');
    
    formLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const formType = this.getAttribute('data-form-type');
            
            // Set form message based on type
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
                
                // Auto-select service based on context
                const serviceSelect = document.getElementById('service');
                if (serviceSelect && window.location.hash.includes('services')) {
                    // Could auto-select based on current page section
                }
            }
        });
    });
}

// 10. SEO Schema Markup
function addSchemaMarkup() {
    // Add LocalBusiness schema
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

// 11. Analytics and Marketing
function initAnalytics() {
    // Track form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // Track conversion in GA4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-123456789/AbC-D_EFghIJKLMNOPQRS',
                    'value': 1.0,
                    'currency': 'RUB'
                });
            }
            
            // Track in Yandex.Metrika
            if (typeof ym !== 'undefined') {
                ym(12345678, 'reachGoal', 'form_submission');
            }
        });
    }
    
    // Track phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof ym !== 'undefined') {
                ym(12345678, 'reachGoal', 'phone_click');
            }
        });
    });
}

// 12. Call Tracking Setup
function setupCallTracking() {
    // Example for Calltouch or аналоги
    const phoneElements = document.querySelectorAll('.phone');
    
    phoneElements.forEach(element => {
        // В реальном проекте здесь будет код Calltouch
        // Например, замена номера телефона в зависимости от источника
        /*
        fetch('https://api.calltouch.ru/calls-service/RestAPI/numbers/...')
            .then(response => response.json())
            .then(data => {
                element.textContent = data.phoneNumber;
            });
        */
        
        // For demo purposes, just log
        element.addEventListener('click', () => {
            console.log('Call tracking event for:', element.textContent);
        });
    });
}

// 13. Dynamic Content for Geo-targeting
function setupGeoTargeting() {
    // Get user's city from IP or URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city') || 'Москва';
    
    // Update page content based on city
    if (city && city !== 'Москва') {
        const cityElements = document.querySelectorAll('[data-geo]');
        cityElements.forEach(el => {
            const originalText = el.getAttribute('data-original') || el.textContent;
            el.setAttribute('data-original', originalText);
            
            // Replace geo-specific text
            const newText = originalText
                .replace(/в Москве/g, `в ${city}`)
                .replace(/Москвы/g, city)
                .replace(/Москве/g, city);
            
            if (newText !== originalText) {
                el.textContent = newText;
            }
        });
        
        // Update page title if needed
        if (document.title.includes('Москве')) {
            document.title = document.title.replace('Москве', city);
        }
        
        // Update h1 if exists
        const h1 = document.querySelector('h1');
        if (h1 && h1.textContent.includes('Москве')) {
            h1.textContent = h1.textContent.replace('Москве', city);
        }
    }
}

// 14. Sitemap and SEO
function generateSitemapLink() {
    // Add sitemap link in footer
    const copyrightDiv = document.querySelector('.copyright');
    if (copyrightDiv) {
        const sitemapLink = document.createElement('a');
        sitemapLink.href = '/sitemap.xml';
        sitemapLink.textContent = 'Карта сайта';
        sitemapLink.style.marginLeft = '15px';
        
        copyrightDiv.querySelector('p').appendChild(sitemapLink);
    }
}

// 15. Blog/Articles Functionality
function initBlog() {
    // Simple blog functionality
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
    
    // Can be used to dynamically populate blog section
    // In real project, this would come from backend
}

// 16. Reviews Slider
function initReviewsSlider() {
    const reviewsContainer = document.querySelector('.reviews-slider');
    if (!reviewsContainer) return;
    
    // Simple manual slider
    let currentReview = 0;
    const reviews = reviewsContainer.querySelectorAll('.review-item');
    
    function showReview(index) {
        reviews.forEach((review, i) => {
            review.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Auto-rotate reviews
    setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }, 5000);
    
    // Initial show
    showReview(0);
}

// 17. Price Calculator (basic)
function initPriceCalculator() {
    const calcBtn = document.querySelector('[data-form-type="calculation"]');
    if (calcBtn) {
        calcBtn.addEventListener('click', function(e) {
            // Open modal or redirect to calculator page
            // For now, just pre-fill form
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = 'Прошу рассчитать стоимость следующих услуг:\n\n1. Домофонная система: ___ квартир\n2. Видеонаблюдение: ___ камер\n3. Шлагбаум: ___ шт.\n\nПожалуйста, предоставьте коммерческое предложение.';
            }
        });
    }
}

// Initialize all new functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize new functions
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
    
    // Add meta tags for SEO
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Обслуживание домофонов, видеонаблюдения и шлагбаумов в Москве и МО. 25 лет опыта. Гарантия 12 месяцев. Круглосуточная поддержка.';
    document.head.appendChild(metaDescription);
    
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'домофоны, видеонаблюдение, шлагбаумы, обслуживание, ремонт, Москва, установка, системы безопасности';
    document.head.appendChild(metaKeywords);
    
    // Add Open Graph tags for social media
    const ogTitle = document.createElement('meta');
    ogTitle.property = 'og:title';
    ogTitle.content = 'Перспектива ТЦ - Обслуживание систем безопасности';
    document.head.appendChild(ogTitle);
    
    const ogDescription = document.createElement('meta');
    ogDescription.property = 'og:description';
    ogDescription.content = 'Эксперты в системах безопасности с 25-летним опытом. Обслуживание домофонов, камер видеонаблюдения и шлагбаумов.';
    document.head.appendChild(ogDescription);
    
    // Add canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href;
    document.head.appendChild(canonicalLink);
    
    console.log('Все дополнительные модули инициализированы');
});
// Advertising Conversions Tracking
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
        // Track form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', () => {
                this.trackConversion('form_submission');
            });
        });
        
        // Track phone clicks
        const phoneLinks = document.querySelectorAll('[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('phone_call');
            });
        });
        
        // Track consultation requests
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
        
        // Google Ads
        if (conversion.google && typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': conversion.google,
                'value': 1.0,
                'currency': 'RUB'
            });
        }
        
        // Yandex.Direct
        if (conversion.yandex && typeof ym !== 'undefined') {
            ym(12345678, 'reachGoal', conversion.yandex);
        }
    }
    
    setupRemarketing() {
        // Google Remarketing
        if (typeof gtag !== 'undefined') {
            gtag('config', 'AW-XXXXXXXXX', {
                'phone_conversion_label': 'YYYYYYYYYYYYYYYYYYYYYY'
            });
        }
        
        // Yandex.Retargeting
        const yaParams = window.yaParams || {};
        yaParams.retargeting = true;
        window.yaParams = yaParams;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const adsTracker = new AdsConversions();
    adsTracker.init();
});
// A/B Testing Module
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
        // Assign consistent variations based on visitor ID
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
        // Apply CTA color
        if (this.variations.cta_color) {
            const color = this.variations.cta_color.value;
            document.documentElement.style.setProperty('--secondary-color', color);
            
            // Update CSS variables
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
        
        // Apply button text
        if (this.variations.button_text) {
            const buttons = document.querySelectorAll('.hero-btn');
            buttons.forEach(btn => {
                btn.textContent = this.variations.button_text.value;
            });
        }
        
        // Apply hero title
        if (this.variations.hero_title) {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                heroTitle.textContent = this.variations.hero_title.value;
            }
        }
    }
    
    setupTracking() {
        // Track which variation converts better
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
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ab_test_conversion', variationData);
        }
    }
    
    getVisitorId() {
        // Generate or retrieve visitor ID
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
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}

// Initialize A/B testing
document.addEventListener('DOMContentLoaded', () => {
    // Only run on production
    if (!window.location.hostname.includes('localhost')) {
        const abTest = new ABTesting();
        abTest.init();
    }
});
// Website Monitoring and Alerting
class WebsiteMonitor {
    constructor() {
        this.checks = [];
        this.interval = 300000; // 5 minutes
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
        }, this.interval);
        
        // Initial check
        setTimeout(() => this.runChecks(), 5000);
    }
    
    runChecks() {
        this.checks.forEach(check => {
            if (!check.check()) {
                this.sendAlert(check.alert);
            }
        });
        
        // Performance check
        this.checkPerformance();
    }
    
    checkPerformance() {
        const perf = window.performance;
        if (perf && perf.timing) {
            const loadTime = perf.timing.loadEventEnd - perf.timing.navigationStart;
            
            if (loadTime > 3000) { // More than 3 seconds
                this.sendAlert(`Медленная загрузка страницы: ${loadTime}мс`);
            }
        }
    }
    
    sendAlert(message) {
        console.warn('Website Alert:', message);
        
        // Send to monitoring service (Sentry, etc.)
        if (typeof Sentry !== 'undefined') {
            Sentry.captureMessage(message);
        }
        
        // Send to Telegram
        this.sendToTelegram(`🚨 ${message}\nURL: ${window.location.href}`);
    }
    
    async sendToTelegram(message) {
        // Implementation depends on your Telegram bot setup
        // Example using fetch to your bot endpoint
    }
    
    setupErrorTracking() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.logError(event.error || event.message);
        });
        
        // Promise rejection handler
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
        
        // Send to error tracking service
        console.error('Website Error:', errorData);
    }
}

// Initialize monitoring
if (window.location.hostname !== 'localhost') {
    document.addEventListener('DOMContentLoaded', () => {
        new WebsiteMonitor();
    });
}
// products.js - Каталог товаров
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

// Сохранение в localStorage при изменении
function saveProductsData() {
    localStorage.setItem('perspektiva-products', JSON.stringify(productsData));
}

// Загрузка из localStorage
function loadProductsData() {
    const saved = localStorage.getItem('perspektiva-products');
    if (saved) {
        Object.assign(productsData, JSON.parse(saved));
    }
}

// Инициализация
loadProductsData();

// Экспорт данных
window.productsData = productsData;
window.saveProductsData = saveProductsData;
// calculator.js - Калькулятор стоимости
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
        // Создаем кнопку калькулятора
        const calcBtn = document.createElement('button');
        calcBtn.id = 'calculator-btn';
        calcBtn.innerHTML = '<i class="fas fa-calculator"></i> Калькулятор';
        calcBtn.className = 'calculator-btn';
        
        // Добавляем стили
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
        
        // Добавляем кнопку на страницу
        document.body.appendChild(calcBtn);
        
        // Создаем оверлей и модальное окно
        this.createCalculatorModal();
    }
    
    createCalculatorModal() {
        // Оверлей
        const overlay = document.createElement('div');
        overlay.className = 'calculator-overlay';
        overlay.id = 'calculator-overlay';
        document.body.appendChild(overlay);
        
        // Модальное окно
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
        // Кнопка открытия калькулятора
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
        
        // Обработка изменения количества
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const productId = e.target.dataset.productId;
                const quantity = parseInt(e.target.value) || 0;
                this.updateCart(productId, quantity);
            }
        });
        
        // Кнопки увеличения/уменьшения количества
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
        // Добавляем продукт в корзину
        this.updateCart(productId, 1);
        
        // Прокручиваем к корзине
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
        
        // Группируем товары по категориям
        const categories = {};
        productsData.categories.forEach(cat => {
            categories[cat.id] = {
                ...cat,
                products: []
            };
        });
        
        // Распределяем товары по категориям
        productsData.products.forEach(product => {
            if (categories[product.categoryId]) {
                categories[product.categoryId].products.push(product);
            }
        });
        
        // Рендерим категории и товары
        Object.values(categories).forEach(category => {
            if (category.products.length > 0) {
                // Заголовок категории
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category.name;
                categoryTitle.style.gridColumn = '1 / -1';
                categoryTitle.style.marginTop = '20px';
                categoryTitle.style.color = 'var(--primary-color)';
                container.appendChild(categoryTitle);
                
                // Товары категории
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
        // Находим товар
        const product = productsData.products.find(p => p.id == productId);
        if (!product) return;
        
        // Обновляем или удаляем из корзины
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
        
        // Обновляем отображение
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
        
        // Даем время на загрузку перед печатью
        setTimeout(() => {
            printWindow.print();
        }, 1000);
    }
}

// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new PriceCalculator();
    calculator.init();
    window.priceCalculator = calculator;
});
// admin-panel.js - Админ-панель для управления товарами
class AdminPanel { 
    constructor() {
        this.isAdmin = localStorage.getItem('perspektiva-admin') === 'true';
        this.adminPassword = 'admin123'; // Пароль для доступа
        this.init();
    }
    
    init() {
        this.createAdminButton();
        this.setupEventListeners();
        
        // Если админ уже вошел
        if (this.isAdmin) {
            this.showAdminPanel();
        }
    }
    
    createAdminButton() {
        // Кнопка входа в админку
        const adminBtn = document.createElement('button');
        adminBtn.id = 'admin-access-btn';
        adminBtn.innerHTML = '<i class="fas fa-cog"></i>';
        adminBtn.className = 'admin-access-btn';
        
        // Стили для админ-кнопки
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
        
        // Создаем панель администратора
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
        // Кнопка входа в админку
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
        
        // Обработка импорта файлов
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
        
        // Обновляем select
        select.innerHTML = '<option value="">Выберите категорию</option>';
        productsData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
        
        // Обновляем список
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
        
        // Генерируем новый ID
        const newId = Math.max(...productsData.products.map(p => p.id), 0) + 1;
        
        // Добавляем товар
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
        
        // Сохраняем
        saveProductsData();
        
        // Обновляем отображение
        this.renderProducts();
        
        // Очищаем форму
        document.getElementById('add-product-form').reset();
        
        alert('Товар успешно добавлен!');
        
        // Обновляем калькулятор если он открыт
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
        
        // Генерируем новый ID
        const newId = Math.max(...productsData.categories.map(c => c.id), 0) + 1;
        
        // Добавляем категорию
        productsData.categories.push({
            id: newId,
            name: name,
            description: description
        });
        
        // Сохраняем
        saveProductsData();
        
        // Обновляем отображение
        this.renderCategories();
        
        // Очищаем форму
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
            
            // Обновляем калькулятор
            if (window.priceCalculator) {
                window.priceCalculator.cart = window.priceCalculator.cart.filter(item => item.id !== productId);
                window.priceCalculator.updateCartDisplay();
                window.priceCalculator.updateCartBadge();
            }
        }
    }
    
    deleteCategory(categoryId) {
        // Проверяем, есть ли товары в категории
        const productsInCategory = productsData.products.filter(p => p.categoryId === categoryId);
        
        if (productsInCategory.length > 0) {
            if (!confirm(`В этой категории ${productsInCategory.length} товаров. Удалить категорию и все товары?`)) {
                return;
            }
            
            // Удаляем товары категории
            productsData.products = productsData.products.filter(p => p.categoryId !== categoryId);
        }
        
        // Удаляем категорию
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
        
        // Заполняем форму данными товара
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.categoryId;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-unit').value = product.unit;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-features').value = product.features.join('\n');
        
        // Прокручиваем к форме
        document.querySelector('#add-product-form').scrollIntoView({ behavior: 'smooth' });
        
        // Меняем кнопку на "Обновить"
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
        
        // Обновляем товар
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
        
        // Возвращаем кнопку в исходное состояние
        const submitBtn = document.querySelector('#add-product-form button[type="submit"]');
        submitBtn.textContent = 'Добавить товар';
        submitBtn.onclick = null;
        
        // Очищаем форму
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
                
                // Проверяем структуру данных
                if (data.categories && data.products) {
                    Object.assign(productsData, data);
                    saveProductsData();
                    
                    // Обновляем отображение
                    this.renderCategories();
                    this.renderProducts();
                    
                    // Обновляем калькулятор
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

// Инициализация админ-панели
document.addEventListener('DOMContentLoaded', () => {
    const adminPanel = new AdminPanel();
    window.adminPanel = adminPanel;
});
// product-calculator-integration.js - Интеграция калькулятора с существующей страницей
class ProductCalculatorIntegration {
    constructor() {
        this.init();
    }
    
    init() {
        this.addCalculatorButtonsToServices();
        this.setupProductLinks();
    }
    
    addCalculatorButtonsToServices() {
        // Находим карточки услуг и добавляем кнопки калькулятора
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            const content = card.querySelector('.service-content');
            if (!content) return;
            
            // Определяем тип услуги по индексу или содержимому
            let productIds = [];
            
            switch(index) {
                case 0: // Домофоны
                    productIds = [101, 102];
                    break;
                case 1: // Видеонаблюдение
                    productIds = [201, 202];
                    break;
                case 2: // Шлагбаумы
                    productIds = [301, 302];
                    break;
            }
            
            // Добавляем кнопку калькулятора
            const calcBtn = document.createElement('button');
            calcBtn.className = 'product-calculator-btn';
            calcBtn.innerHTML = '<i class="fas fa-calculator"></i> Рассчитать стоимость';
            calcBtn.dataset.productIds = productIds.join(',');
            
            calcBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (window.priceCalculator) {
                    // Добавляем первый товар из категории
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
        // Создаем скрытый блок с товарами (для SEO и быстрого доступа)
        const productsSection = document.createElement('section');
        productsSection.className = 'section';
        productsSection.id = 'products';
        productsSection.style.display = 'none'; // Скрываем, но оставляем в DOM
        
        productsSection.innerHTML = `
            <div class="container">
                <div class="section-title">
                    <h2>Каталог оборудования</h2>
                    <p>Сертифицированное оборудование от ведущих производителей</p>
                </div>
                
                <div class="products-catalog" id="products-catalog"></div>
            </div>
        `;
        
        // Добавляем после существующего контента
        const footer = document.querySelector('footer');
        footer.parentNode.insertBefore(productsSection, footer);
        
        // Рендерим товары
        this.renderProductsCatalog();
    }
    
    renderProductsCatalog() {
        const container = document.getElementById('products-catalog');
        if (!container) return;
        
        // Группируем по категориям
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
        
        // Добавляем обработчики кнопок
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

// Инициализация интеграции
document.addEventListener('DOMContentLoaded', () => {
    new ProductCalculatorIntegration();
});
// hidden-admin.js - Упрощенная система скрытой админ-кнопки
class HiddenAdmin {hideAdminPanelByDefault() {
    // Скрываем админ-панель и кнопку доступа при загрузке
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
        this.password = '123'; // Простой пароль
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
        this.init();
    }
    
init() {
    this.createHiddenButton();
    this.createLoginForm();
    this.checkAdminStatus();
    
    // Скрываем админ-панель по умолчанию
    setTimeout(() => {
        this.hideAdminPanelByDefault();
    }, 500);
}
    createHiddenButton() {
        // Создаем невидимую кнопку в углу экрана
        const hiddenBtn = document.createElement('div');
        hiddenBtn.id = 'hidden-admin-access';
        hiddenBtn.innerHTML = '⚙️'; // Маленький значок шестеренки
        
        // Стили для невидимой кнопки
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
        
        // При наведении чуть видна
        hiddenBtn.onmouseover = () => {
            hiddenBtn.style.opacity = '0.5';
            hiddenBtn.style.background = 'rgba(0,0,0,0.2)';
        };
        
        hiddenBtn.onmouseout = () => {
            hiddenBtn.style.opacity = '0.3';
            hiddenBtn.style.background = 'rgba(0,0,0,0.1)';
        };
        
        // При клике показываем форму входа
        hiddenBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showLoginForm();
        };
        
        document.body.appendChild(hiddenBtn);
    }
    
    createLoginForm() {
        // Создаем форму для ввода пароля
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
        
        // Обработчики кнопок формы
        document.getElementById('admin-login-btn').onclick = () => this.checkPassword();
        document.getElementById('admin-cancel-btn').onclick = () => this.hideLoginForm();
        
        // Ввод пароля по Enter
        document.getElementById('admin-pass-input').onkeypress = (e) => {
            if (e.key === 'Enter') this.checkPassword();
        };
        
        // Клик вне формы скрывает её
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
            // Правильный пароль
            this.isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
            this.hideLoginForm();
            this.showAdminButton();
            this.showSuccessMessage('Вы вошли как администратор');
        } else {
            // Неправильный пароль
            error.style.display = 'block';
            input.value = '';
            input.focus();
            
            // Анимация ошибки
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
    // Показываем основную кнопку админа
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
        // Скрываем основную кнопку админа
        const adminBtn = document.getElementById('admin-access-btn');
        if (adminBtn) {
            adminBtn.style.display = 'none';
        }
    }
    
    showSuccessMessage(text) {
        // Простое сообщение об успехе
        alert(text);
    }
    
    // Метод для выхода (можно вызвать из админ-панели)
    logout() {
    this.isAdmin = false;
    localStorage.removeItem('isAdmin');
    this.hideAdminButton();
    
    // Удаляем кнопку выхода если существует
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.remove();
    }
    
    this.showSuccessMessage('Вы вышли из аккаунта администратора');
}
}

// Добавляем анимацию для ошибки
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

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const hiddenAdmin = new HiddenAdmin();
    window.hiddenAdmin = hiddenAdmin;
});
// reviews.js - Система отзывов

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
        // Пример начальных отзывов
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
        // Форма добавления отзыва
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addReview();
            });
        }
        
        // Фильтрация отзывов
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterReviews(btn.dataset.filter);
                
                // Обновляем активную кнопку
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
            approved: this.isAdmin, // Если админ, сразу публикуем
            moderatorComment: ''
        };
        
        this.reviews.push(newReview);
        this.saveReviews();
        
        // Очищаем форму
        document.getElementById('reviewForm').reset();
        
        // Показываем сообщение об успехе
        const successMsg = document.getElementById('reviewSuccess');
        successMsg.style.display = 'flex';
        
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
        
        // Обновляем отображение
        this.updateStatistics();
        this.renderReviews();
        
        // Уведомление админа
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
        
        // Сортируем по дате (новые первые)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return filtered;
    }
    
    renderReviews() {
        const container = document.getElementById('reviewsGrid');
        const pagination = document.getElementById('reviewsPagination');
        
        if (!container) return;
        
        const filteredReviews = this.getFilteredReviews();
        const totalPages = Math.ceil(filteredReviews.length / this.reviewsPerPage);
        
        // Вычисляем отзывы для текущей страницы
        const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        const pageReviews = filteredReviews.slice(startIndex, endIndex);
        
        // Рендерим отзывы
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
        
        // Рендерим пагинацию
        this.renderPagination(pagination, totalPages);
    }
    
    createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.dataset.id = review.id;
        
        // Создаем звезды рейтинга
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= review.rating ? '★' : '☆';
        }
        
        // Название услуги
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
        
        // Кнопка "Назад"
        html += `
            <button class="page-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="reviewsSystem.changePage(${this.currentPage - 1})" 
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Номера страниц
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
        
        // Кнопка "Вперед"
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
    
    // Админские функции
    setupAdminControls() {
        if (this.isAdmin) {
            // Добавляем вкладку в админ-панель
            this.addAdminTab();
            
            // Добавляем кнопку выхода
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
            
            // Обновляем отображение
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
                // Можно сохранить или удалить, в зависимости от политики
                this.reviews = this.reviews.filter(r => r.id !== id);
                this.saveReviews();
                
                alert('Отзыв отклонен');
                
                // Обновляем отображение
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
            
            // Обновляем отображение
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
            // Можно реализовать уведомление на email или в Telegram
            console.log('Новый отзыв требует модерации:', newReview);
            
            // Пример уведомления в консоль админа
            if (window.adminPanel) {
                alert('Новый отзыв добавлен и ожидает модерации');
            }
        }
    }
    
    // Вспомогательные методы
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

// Инициализация системы отзывов
document.addEventListener('DOMContentLoaded', () => {
    window.reviewsSystem = new ReviewsSystem();
});
// В конце proekt.js добавьте:
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Перспектива ТЦ" загружен');
    
    // Основные функции
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
    
    // Инициализация калькулятора
    if (window.PriceCalculator) {
        const calculator = new PriceCalculator();
        calculator.init();
        window.priceCalculator = calculator;
    }
    
    // Инициализация админ-панели
    if (window.AdminPanel) {
        const adminPanel = new AdminPanel();
        window.adminPanel = adminPanel;
    }
    
    // Инициализация скрытой админ-панели (упрощенной)
    if (window.HiddenAdmin) {
        const hiddenAdmin = new HiddenAdmin();
        window.hiddenAdmin = hiddenAdmin;
    }
    
    // Инициализация системы отзывов
    if (window.ReviewsSystem) {
        window.reviewsSystem = new ReviewsSystem();
    }
    
    console.log('Все модули инициализированы');
});
function initAnalytics() {
    // Track form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // Google Ads конверсия (замените AW-123456789/AbC-D_EFghIJKLMNOPQRS на ваш ID)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-123456789/AbC-D_EFghIJKLMNOPQRS', // ВАШ ID
                    'value': 1.0,
                    'currency': 'RUB'
                });
            }
            
            // Yandex.Metrika цель
            if (typeof ym !== 'undefined') {
                ym(12345678, 'reachGoal', 'form_submission');
            }
        });
    }
}
// crm-integration.js
class CRMIntegration {
    constructor() {
        this.crmUrl = 'https://ваша-crm.ru/api/webhook'; // URL вашей CRM
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
    
    // Интеграция с Bitrix24, AmoCRM и др.
    sendToBitrix24(data) {
        // Пример для Bitrix24
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
        
        // Отправка...
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.crm = new CRMIntegration();
    
    // Интеграция с формой
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            // После успешной валидации формы
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
    // Отправка в CRM
    if (window.crm && window.crm.sendLead) {
        window.crm.sendLead(formData);
    }
    
    // Уведомление в Telegram
    if (window.telegramBot && window.telegramBot.sendNewLead) {
        window.telegramBot.sendNewLead(formData);
    }
    
    // Отправка на email (через Formspree или аналоги)
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