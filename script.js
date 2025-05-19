// Старт в стиле 90-х
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== WELCOME TO BRAINROT REALM ===");
    console.log(">>> LOADING CHAOS ENGINE...");
    console.log(">>> INITIALIZATION COMPLETE!");
    
    // Звуковые эффекты (имитация)
    playDoomSound();
    
    // Инициализация всех компонентов
    initDeathCounter();
    initPortal();
    initCountryButtons();
    initGuestbook();
    updateVisitorCounter();
    initChaosBar();
    initScrollEffects();
    initStatisticsButton();
});

// Имитация звука Doom
function playDoomSound() {
    // В реальности здесь был бы код для проигрывания звука
    console.log("*DOOM SOUND EFFECT*");
}

// Счетчик смертей
function initDeathCounter() {
    const counter = document.querySelector('.blood-counter');
    let deaths = 666666;
    
    setInterval(() => {
        deaths += Math.floor(Math.random() * 10);
        counter.textContent = deaths.toLocaleString();
        
        // Эффект крови при каждой 100й смерти
        if (deaths % 100 === 0) {
            counter.style.fontSize = '16px';
            setTimeout(() => {
                counter.style.fontSize = '12px';
            }, 200);
        }
    }, 1000);
}

// Портал входа
function initPortal() {
    const portal = document.querySelector('.portal-image');
    
    portal.addEventListener('click', function() {
        // Эффект вхождения в портал
        portal.style.transform = 'scale(10) rotate(720deg)';
        portal.style.opacity = '0';
        
        setTimeout(() => {
            alert('ДОБРО ПОЖАЛОВАТЬ В АД!\n\nТы вошел в мир BrainRot...');
            portal.style.transform = 'scale(1) rotate(0deg)';
            portal.style.opacity = '1';
        }, 1000);
    });
    
    // Эффект пульсации
    setInterval(() => {
        portal.style.filter = `brightness(${1 + Math.random() * 0.5})`;
    }, 500);
}

// Кнопки стран
function initCountryButtons() {
    const buttons = document.querySelectorAll('.enter-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('.country-row');
            const countryName = row.querySelector('.country-name').textContent;
            const danger = row.querySelector('.danger-bar').textContent.length;
            
            if (danger > 8) {
                if (confirm(`ПРЕДУПРЕЖДЕНИЕ!\n\n${countryName} - КРАЙНЕ ОПАСНАЯ ЗОНА!\n\nТы уверен, что хочешь войти?`)) {
                    enterCountry(countryName);
                }
            } else {
                enterCountry(countryName);
            }
        });
    });
}

// Вход в страну
function enterCountry(country) {
    document.body.style.backgroundColor = '#ff0000';
    setTimeout(() => {
        document.body.style.backgroundColor = '#000000';
        showCountryInfo(country);
    }, 100);
}

// Информация о стране
function showCountryInfo(country) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1a0000;
        border: 5px ridge #ff0000;
        padding: 30px;
        color: #ffff00;
        font-family: "Courier New", monospace;
        text-align: center;
        z-index: 9999;
        box-shadow: 0 0 50px #ff0000;
    `;
    
    modal.innerHTML = `
        <h2 style="color: #ff0000;">ВХОД В ${country}</h2>
        <p style="color: #888888;">Загрузка территории...</p>
        <p style="color: #00ff00;">Сканирование угроз...</p>
        <p style="color: #ff8800;">Активация защиты...</p>
        <br>
        <button onclick="this.parentElement.remove()" style="
            background: #ff0000;
            color: #000;
            border: 3px outset #ff0000;
            padding: 10px 20px;
            font-weight: bold;
            cursor: pointer;
        ">ЗАКРЫТЬ</button>
    `;
    
    document.body.appendChild(modal);
}

// Гостевая книга
function initGuestbook() {
    const form = document.querySelector('.guestbook-form');
    const entries = document.querySelector('.guest-entries');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('.guest-input').value;
        const message = form.querySelector('.guest-message').value;
        
        if (name && message) {
            const entry = document.createElement('p');
            entry.className = 'guest-entry';
            entry.innerHTML = `<strong>${name}:</strong> ${message}`;
            
            entries.insertBefore(entry, entries.firstChild);
            
            // Эффект добавления
            entry.style.backgroundColor = '#ff0000';
            setTimeout(() => {
                entry.style.backgroundColor = 'transparent';
            }, 500);
            
            // Очистка формы
            form.reset();
            
            alert('ЗАПИСЬ ДОБАВЛЕНА В КНИГУ ПРОКЛЯТЫХ!');
        }
    });
}

// Счетчик посетителей
function updateVisitorCounter() {
    const counter = document.querySelector('.visitor-counter');
    let visitors = parseInt(localStorage.getItem('brainrot_visitors') || '1337666');
    visitors++;
    localStorage.setItem('brainrot_visitors', visitors);
    counter.textContent = `Посетителей: ${visitors.toLocaleString()}`;
}

// Анимация хаос-бара
function initChaosBar() {
    const chaosFill = document.querySelector('.chaos-fill');
    let chaos = 75;
    
    setInterval(() => {
        chaos += (Math.random() - 0.5) * 10;
        chaos = Math.max(30, Math.min(100, chaos));
        chaosFill.style.width = chaos + '%';
        
        // Критический уровень хаоса
        if (chaos > 90) {
            chaosFill.style.background = 'linear-gradient(to right, #ff0000, #ff00ff)';
            document.body.style.animation = 'shake 0.1s infinite';
        } else {
            chaosFill.style.background = 'linear-gradient(to right, #ff0000, #ffff00)';
            document.body.style.animation = 'none';
        }
    }, 2000);
}

// Эффекты при скролле
function initScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Паралакс эффект для заголовка
        const header = document.querySelector('.doom-header');
        header.style.transform = `translateY(${currentScrollY * 0.5}px)`;
        
        // Эффект крови при скролле вниз
        if (currentScrollY > lastScrollY) {
            document.body.style.borderTop = '3px solid #ff0000';
        } else {
            document.body.style.borderTop = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Добавляем эффект встряски
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        50% { transform: translateX(2px); }
        75% { transform: translateX(-2px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Пасхалка - код Doom
let konamiCode = [];
const doomCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === doomCode.join(',')) {
        activateBerserkMode();
    }
});

// Режим берсерка
function activateBerserkMode() {
    document.body.style.filter = 'hue-rotate(180deg) saturate(3)';
    
    const berserk = document.createElement('div');
    berserk.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 72px;
        color: #ff0000;
        text-shadow: 0 0 20px #ff0000;
        z-index: 99999;
        pointer-events: none;
    `;
    berserk.textContent = 'BERSERK MODE!';
    document.body.appendChild(berserk);
    
    setTimeout(() => {
        berserk.remove();
        document.body.style.filter = 'none';
    }, 3000);
}

// Эффект печатной машинки для текста
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
}

// Глитч эффект для заголовков
setInterval(() => {
    const titles = document.querySelectorAll('.section-title');
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    if (randomTitle) {
        const originalText = randomTitle.textContent;
        randomTitle.style.textShadow = '2px 2px 0 #ff0000, -2px -2px 0 #00ff00';
        
        setTimeout(() => {
            randomTitle.style.textShadow = '3px 3px 6px #000000';
        }, 100);
    }
}, 5000);

// MIDI-подобная фоновая музыка (имитация)
console.log('♪♫ Playing DOOM E1M1 Theme ♫♪');

// Инициализация кнопки статистики для открытия чата
function initStatisticsButton() {
    const statsBox = document.querySelector('.stats-box');
    const statsTitle = statsBox.querySelector('.box-title');
    
    // Делаем заголовок кликабельным
    statsTitle.style.cursor = 'pointer';
    statsTitle.style.transition = 'all 0.3s';
    
    statsTitle.addEventListener('click', function() {
        if (typeof encryptedChat === 'undefined') {
            // Загружаем чат скрипты
            loadChatScripts();
        } else {
            // Открываем чат
            encryptedChat.open();
        }
    });
    
    // Добавляем визуальный эффект при наведении
    statsTitle.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px #ff0000';
        this.style.transform = 'scale(1.05)';
    });
    
    statsTitle.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
        this.style.transform = 'scale(1)';
    });
}

// Загрузка скриптов чата
function loadChatScripts() {
    // Загружаем стили чата
    const chatStyles = document.createElement('link');
    chatStyles.rel = 'stylesheet';
    chatStyles.href = 'chat-styles.css';
    document.head.appendChild(chatStyles);
    
    // Загружаем HTML чата
    fetch('chat.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const chatContainer = doc.getElementById('chat-container');
            document.body.appendChild(chatContainer);
            
            // Загружаем скрипты
            const cryptoScript = document.createElement('script');
            cryptoScript.src = 'chat-crypto.js';
            cryptoScript.onload = () => {
                const chatScript = document.createElement('script');
                chatScript.src = 'chat-script.js';
                chatScript.onload = () => {
                    // Инициализируем и открываем чат
                    encryptedChat = new EncryptedChat();
                    encryptedChat.open();
                };
                document.body.appendChild(chatScript);
            };
            document.body.appendChild(cryptoScript);
        });
}