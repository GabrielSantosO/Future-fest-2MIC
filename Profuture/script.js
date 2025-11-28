document.addEventListener('DOMContentLoaded', function() {
    // THEME TOGGLE LOGIC
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // LOGIN & AUTH LOGIC
    const loginModal = document.getElementById('login-modal');
    const navLoginBtn = document.getElementById('nav-login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const closeLoginBtn = document.getElementById('close-login');
    
    // Views
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const linkToRegister = document.getElementById('link-to-register');
    const linkToLogin = document.getElementById('link-to-login');

    // Inputs (Login)
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const btnLoginSubmit = document.getElementById('btn-login-submit');
    const loginEmailError = document.getElementById('login-email-error');

    // Inputs (Register)
    const regNameInput = document.getElementById('reg-name');
    const regEmailInput = document.getElementById('reg-email');
    const regPasswordInput = document.getElementById('reg-password');
    const btnRegisterSubmit = document.getElementById('btn-register-submit');
    
    const regNameError = document.getElementById('reg-name-error');
    const regEmailError = document.getElementById('reg-email-error');

    // Password Requirements (Register only)
    const reqLength = document.getElementById('req-length');
    const reqUpper = document.getElementById('req-upper');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');

    // User Profile Displays
    const headerUserProfile = document.getElementById('header-user-profile');
    const userDisplayName = document.getElementById('user-display-name'); 
    const mobileUserSection = document.getElementById('mobile-user-section');
    const mobileUserName = document.getElementById('mobile-user-name'); 
    
    // Avatar Elements
    const headerAvatarInitial = document.getElementById('header-avatar-initial');
    const headerAvatarImg = document.getElementById('header-avatar-img');
    const mobileAvatarInitial = document.getElementById('mobile-avatar-initial');
    const mobileAvatarImg = document.getElementById('mobile-avatar-img');

    // DASHBOARD LOGIC
    const userDashboard = document.getElementById('user-dashboard');
    const closeDashboardBtn = document.getElementById('close-dashboard');
    
    // Dashboard Avatar
    const dashboardAvatarDisplay = document.getElementById('dashboard-avatar-display');
    const dashboardAvatarInitial = document.getElementById('dashboard-avatar-initial');
    const dashboardAvatarImg = document.getElementById('dashboard-avatar-img');
    const avatarInput = document.getElementById('avatar-input');
    const avatarUploadContainer = document.querySelector('.avatar-upload-container');

    const dashboardName = document.getElementById('dashboard-name'); 
    const dashboardEmail = document.getElementById('dashboard-email');
    const logoutBtn = document.getElementById('logout-btn');
    const resumeUpload = document.getElementById('resume-upload');
    const resumeFilename = document.getElementById('resume-filename');
    const diplomaUpload = document.getElementById('diploma-upload');
    const diplomaFilename = document.getElementById('diploma-filename');
    const matchCarouselPrev = document.getElementById('match-prev');
    const matchCarouselNext = document.getElementById('match-next');

    let currentUserData = {
        name: '',
        email: '',
        avatar: null // Store avatar URL
    };

    // Functions
    function openLogin() {
        loginModal.classList.add('active');
        document.body.style.overflowY = 'hidden';
        showLoginView();
    }

    function closeLogin() {
        loginModal.classList.remove('active');
        document.body.style.overflowY = 'auto';
    }

    function showRegisterView() {
        loginView.style.display = 'none';
        registerView.style.display = 'block';
    }

    function showLoginView() {
        registerView.style.display = 'none';
        loginView.style.display = 'block';
    }

    function openDashboard() {
        if(!currentUserData.email) return; 
        
        userDashboard.classList.remove('hidden');
        document.body.style.overflowY = 'hidden';
        
        // Init dashboard data
        if(dashboardName) dashboardName.textContent = currentUserData.name;
        dashboardEmail.textContent = currentUserData.email;
        
        updateDashboardAvatarUI();

        // Initialize Dashboard Carousel (Needs timeout for display:block to take effect)
        setTimeout(() => {
            setupCarousel('match-carousel', matchCarouselPrev, matchCarouselNext);
        }, 100);
    }

    function closeDashboard() {
        userDashboard.classList.add('hidden');
        document.body.style.overflowY = 'auto';
    }

    function updateDashboardAvatarUI() {
        if(currentUserData.avatar) {
            dashboardAvatarInitial.style.display = 'none';
            dashboardAvatarImg.src = currentUserData.avatar;
            dashboardAvatarImg.classList.remove('hidden');
        } else {
            dashboardAvatarInitial.style.display = 'block';
            dashboardAvatarInitial.textContent = currentUserData.name.charAt(0).toUpperCase();
            dashboardAvatarImg.classList.add('hidden');
        }
    }

    function updateGlobalAvatarUI() {
        // Update Header
        if(currentUserData.avatar) {
            headerAvatarInitial.style.display = 'none';
            headerAvatarImg.src = currentUserData.avatar;
            headerAvatarImg.classList.remove('hidden');
        } else {
            headerAvatarInitial.style.display = 'block';
            headerAvatarInitial.textContent = currentUserData.name.charAt(0).toUpperCase();
            headerAvatarImg.classList.add('hidden');
        }

        // Update Mobile
        if(currentUserData.avatar) {
            mobileAvatarInitial.style.display = 'none';
            mobileAvatarImg.src = currentUserData.avatar;
            mobileAvatarImg.classList.remove('hidden');
        } else {
            mobileAvatarInitial.style.display = 'block';
            mobileAvatarInitial.textContent = currentUserData.name.charAt(0).toUpperCase();
            mobileAvatarImg.classList.add('hidden');
        }
    }

    // Event Listeners for Opening/Closing/Toggling
    if(navLoginBtn) navLoginBtn.addEventListener('click', openLogin);
    if(mobileLoginBtn) mobileLoginBtn.addEventListener('click', openLogin);
    if(closeLoginBtn) closeLoginBtn.addEventListener('click', closeLogin);
    
    if(linkToRegister) linkToRegister.addEventListener('click', showRegisterView);
    if(linkToLogin) linkToLogin.addEventListener('click', showLoginView);

    // Dashboard Events
    headerUserProfile.addEventListener('click', openDashboard);
    closeDashboardBtn.addEventListener('click', closeDashboard);
    
    // Avatar Upload
    if(avatarUploadContainer) {
        avatarUploadContainer.addEventListener('click', () => {
            avatarInput.click();
        });
    }

    if(avatarInput) {
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentUserData.avatar = e.target.result;
                    updateDashboardAvatarUI();
                    updateGlobalAvatarUI();
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Logout
    logoutBtn.addEventListener('click', () => {
        closeDashboard();
        currentUserData = { name: '', email: '', avatar: null };
        headerUserProfile.classList.add('hidden');
        headerUserProfile.style.display = 'none';
        mobileUserSection.style.display = 'none';
        navLoginBtn.style.display = 'block';
        if(mobileLoginBtn) mobileLoginBtn.style.display = 'block';
    });

    // File Upload Mock Feedback
    resumeUpload.addEventListener('change', (e) => {
        if(e.target.files.length > 0) {
            resumeFilename.textContent = `Arquivo selecionado: ${e.target.files[0].name}`;
            resumeFilename.classList.add('text-custom-blue');
        }
    });

    diplomaUpload.addEventListener('change', (e) => {
        if(e.target.files.length > 0) {
            diplomaFilename.textContent = `${e.target.files.length} arquivo(s) selecionado(s)`;
            diplomaFilename.classList.add('text-custom-blue');
        }
    });


    // Password Validation Logic (Register Only - Real-time)
    if(regPasswordInput) {
        regPasswordInput.addEventListener('input', () => {
            const val = regPasswordInput.value;
            
            if(val.length >= 8) reqLength.classList.add('req-valid');
            else reqLength.classList.remove('req-valid');

            if(/[A-Z]/.test(val)) reqUpper.classList.add('req-valid');
            else reqUpper.classList.remove('req-valid');

            if(/[0-9]/.test(val)) reqNumber.classList.add('req-valid');
            else reqNumber.classList.remove('req-valid');

            if(/[!@#$%^&*(),.?":{}|<>]/.test(val)) reqSpecial.classList.add('req-valid');
            else reqSpecial.classList.remove('req-valid');
        });
    }

    // --- LOGIN SUBMIT LOGIC ---
    if(btnLoginSubmit) {
        btnLoginSubmit.addEventListener('click', () => {
            const emailVal = loginEmailInput.value.trim();
            const passVal = loginPasswordInput.value;
            let isValid = true;

            if(!emailVal.endsWith('@gmail.com')) {
                loginEmailError.style.display = 'block';
                isValid = false;
            } else {
                loginEmailError.style.display = 'none';
            }

            if(passVal.length === 0) {
                loginPasswordInput.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                loginPasswordInput.style.borderColor = '#444';
            }

            if(isValid) {
                const namePart = emailVal.split('@')[0];
                const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                
                updateUserProfile(displayName, emailVal);
                closeLogin();
                
                loginEmailInput.value = '';
                loginPasswordInput.value = '';
            }
        });
    }

    // --- REGISTER SUBMIT LOGIC ---
    if(btnRegisterSubmit) {
        btnRegisterSubmit.addEventListener('click', () => {
            let isValid = true;
            const nameVal = regNameInput.value.trim();
            const emailVal = regEmailInput.value.trim();
            const passVal = regPasswordInput.value;

            if(nameVal.length === 0) {
                regNameError.style.display = 'block';
                isValid = false;
            } else {
                regNameError.style.display = 'none';
            }

            if(!emailVal.endsWith('@gmail.com')) {
                regEmailError.style.display = 'block';
                isValid = false;
            } else {
                regEmailError.style.display = 'none';
            }

            if(!reqLength.classList.contains('req-valid') ||
               !reqUpper.classList.contains('req-valid') ||
               !reqNumber.classList.contains('req-valid') ||
               !reqSpecial.classList.contains('req-valid')) {
                isValid = false;
                regPasswordInput.style.borderColor = '#ff6b6b';
            } else {
                regPasswordInput.style.borderColor = '#444';
            }

            if(isValid) {
                const firstName = nameVal.split(' ')[0]; // Just first name for display
                
                updateUserProfile(firstName, emailVal, nameVal); // Store full name too
                closeLogin();
                
                regNameInput.value = '';
                regEmailInput.value = '';
                regPasswordInput.value = '';
            }
        });
    }

    function updateUserProfile(displayName, email, fullName) {
        currentUserData.name = fullName || displayName; // Use full name if available from register
        currentUserData.email = email;

        if(userDisplayName) userDisplayName.textContent = displayName; // Restored
        if(mobileUserName) mobileUserName.textContent = displayName; // Restored
        
        updateGlobalAvatarUI();

        headerUserProfile.style.display = 'flex';
        headerUserProfile.classList.remove('hidden');
        
        mobileUserSection.style.display = 'flex';
        
        navLoginBtn.style.display = 'none';
        if(mobileLoginBtn) mobileLoginBtn.style.display = 'none';
    }


    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if (!mobileMenu.classList.contains('hidden')) {
                 mobileMenu.classList.add('hidden');
            }
        });
    });

    // Carousel functionality (Modified to support multiple carousels and resizing)
    function setupCarousel(carouselId, customPrevBtn, customNextBtn) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const items = Array.from(track.children);
        
        // Determine buttons: use custom if provided, else find within container
        const nextButton = customNextBtn || carousel.querySelector('.next');
        const prevButton = customPrevBtn || carousel.querySelector('.prev');
        
        if (!track || !nextButton || !prevButton || items.length === 0) return;

        let currentIndex = 0;
        
        function getVisibleItems() {
            const itemWidth = items[0].getBoundingClientRect().width;
            if (itemWidth === 0) return 1; // Avoid division by zero
            return Math.floor(carousel.offsetWidth / itemWidth);
        }

        function updateCarousel() {
            // Recalculate item width here to ensure it's correct on resize
            const itemWidth = items[0].getBoundingClientRect().width;
            const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
            const newTransform = -currentIndex * itemWidth;
            track.style.transform = 'translateX(' + newTransform + 'px)';

            // Logic for bounds check
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevButton.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
            
            // Prevent overscrolling
            const maxIndex = Math.max(0, items.length - visibleItems);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
                track.style.transform = 'translateX(' + (-currentIndex * itemWidth) + 'px)';
            }

            nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextButton.style.cursor = currentIndex >= maxIndex ? 'default' : 'pointer';
        }

        // Cloning buttons to remove previous event listeners if setup is called multiple times
        const newNext = nextButton.cloneNode(true);
        const newPrev = prevButton.cloneNode(true);
        nextButton.parentNode.replaceChild(newNext, nextButton);
        prevButton.parentNode.replaceChild(newPrev, prevButton);

        newNext.addEventListener('click', () => {
            const itemWidth = items[0].getBoundingClientRect().width;
            const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
            const maxIndex = Math.max(0, items.length - visibleItems);
            
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        newPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
         window.addEventListener('resize', () => {
            updateCarousel();
        });
        
        // Initial setup
        // Use setTimeout to allow browser render cycle if hidden previously
        setTimeout(updateCarousel, 50);
    }

    // Init Main Page Carousels
    setupCarousel('company-carousel');
    setupCarousel('testimonial-carousel');

    // Accordion functionality for plans
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            accordions.forEach(otherAcc => {
                if (otherAcc !== this && otherAcc.classList.contains('active')) {
                    otherAcc.classList.remove('active');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });

            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // Chatbot functionality
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInputField = document.getElementById('chatbot-input-field');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');

    if(chatbotIcon) {
        chatbotIcon.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });
    }

    if(closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });
    }

    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageElement.innerHTML = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };
    
    const showTypingIndicator = () => {
        const typingElement = document.createElement('div');
        typingElement.classList.add('chat-message', 'bot-message', 'typing-indicator');
        typingElement.innerHTML = `<span></span><span></span><span></span>`;
        typingElement.id = 'typing-indicator';
        chatbotMessages.appendChild(typingElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const hideTypingIndicator = () => {
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    };

    const callGeminiAPI = async (userMessage) => {
        showTypingIndicator();
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        const systemPrompt = `Você é um assistente prestativo para o site ProFuture. A ProFuture é uma plataforma que facilita o acesso ao mercado de trabalho com cursos rápidos e acessíveis, conecta empresas e candidatos, e oferece certificados digitais sustentáveis. Sua função é responder a perguntas dos usuários sobre os serviços oferecidos, a missão da empresa e como a plataforma funciona. Seja conciso e amigável. As informações que você tem são:
        - Serviços: Cursos Online Rápidos e Acessíveis, Conexão entre Empresas e Candidatos, Certificados Digitais Sustentáveis, Planos Pagos e Parcerias Estratégicas.
        - Diferenciais: Equipe de Especialistas, Abordagem Personalizada, Foco em Inovação, Compromisso com o Sucesso do Cliente, Suporte Dedicado.
        - Contato: email: ProFuture@gmail.com, CEL: 551195797-0004.
        Responda em português brasileiro.`;

        const payload = {
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const result = await response.json();
            const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui processar sua pergunta. Tente novamente.";
            
            hideTypingIndicator();
            addMessage(botResponse, 'bot');

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            hideTypingIndicator();
            addMessage("Ops! Tivemos um problema de conexão. Por favor, tente novamente mais tarde.", 'bot');
        }
    };

    const handleSendMessage = () => {
        const message = chatbotInputField.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInputField.value = '';
            callGeminiAPI(message);
        }
    };

    if(chatbotSendBtn) chatbotSendBtn.addEventListener('click', handleSendMessage);
    if(chatbotInputField) chatbotInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
});