document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });

            // Smooth scrolling for nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if(targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }

                    // Close mobile menu on link click
                    if (!mobileMenu.classList.contains('hidden')) {
                         mobileMenu.classList.add('hidden');
                    }
                });
            });

            // Carousel functionality
            function setupCarousel(carouselId) {
                const carousel = document.getElementById(carouselId);
                if (!carousel) return;

                const track = carousel.querySelector('.carousel-track');
                const items = Array.from(track.children);
                const nextButton = carousel.querySelector('.next');
                const prevButton = carousel.querySelector('.prev');
                
                if (!track || !nextButton || !prevButton || items.length === 0) return;

                let itemWidth = items[0].getBoundingClientRect().width;
                let currentIndex = 0;
                
                function getVisibleItems() {
                    // Recalculate itemWidth inside this function to handle resize correctly
                    itemWidth = items[0].getBoundingClientRect().width;
                    if (itemWidth === 0) return 1; // Avoid division by zero
                    return Math.floor(carousel.offsetWidth / itemWidth);
                }

                function updateCarousel() {
                    const visibleItems = getVisibleItems();
                    const newTransform = -currentIndex * itemWidth;
                    track.style.transform = 'translateX(' + newTransform + 'px)';

                    // Hide/show buttons
                     prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
                     nextButton.style.display = (currentIndex >= items.length - visibleItems) ? 'none' : 'block';
                }

                nextButton.addEventListener('click', () => {
                    const visibleItems = getVisibleItems();
                    if (currentIndex < items.length - visibleItems) {
                        currentIndex++;
                        updateCarousel();
                    }
                });

                prevButton.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                });
                
                 window.addEventListener('resize', () => {
                    // Recalculate and update
                    itemWidth = items[0].getBoundingClientRect().width;
                    updateCarousel();
                });
                
                // Initial setup
                updateCarousel();
            }

            setupCarousel('company-carousel');
            setupCarousel('testimonial-carousel');

            // Accordion functionality for plans
            const accordions = document.querySelectorAll('.accordion');
            accordions.forEach(accordion => {
                accordion.addEventListener('click', function() {
                    // Close other accordions
                    accordions.forEach(otherAcc => {
                        if (otherAcc !== this && otherAcc.classList.contains('active')) {
                            otherAcc.classList.remove('active');
                            otherAcc.nextElementSibling.style.maxHeight = null;
                        }
                    });

                    // Toggle current accordion
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

            chatbotIcon.addEventListener('click', () => {
                chatbotWindow.classList.toggle('open');
            });

            closeChatbotBtn.addEventListener('click', () => {
                chatbotWindow.classList.remove('open');
            });

            const addMessage = (message, sender) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message', `${sender}-message`);
                
                // Simple markdown for bold text
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

            chatbotSendBtn.addEventListener('click', handleSendMessage);
            chatbotInputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSendMessage();
                }
            });
        });