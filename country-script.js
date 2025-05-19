// Скрипты для детальных страниц стран
document.addEventListener('DOMContentLoaded', function() {
    console.log(">>> ENTERING RESTRICTED ZONE <<<");
    initCountryEffects();
    initProgressBars();
    initClassifiedInfo();
    initAsciiAnimations();
    initChatIntegration();
});

// Эффекты для страны
function initCountryEffects() {
    // Мерцание эмблемы
    const emblem = document.querySelector('.country-emblem-large');
    if (emblem) {
        setInterval(() => {
            emblem.style.transform = `scale(${1 + Math.random() * 0.1})`;
        }, 2000);
    }

    // Глитч эффект для заголовка
    const title = document.querySelector('.country-title');
    if (title) {
        setInterval(() => {
            title.style.textShadow = `
                ${Math.random() * 5}px ${Math.random() * 5}px 20px #ff0000,
                ${-Math.random() * 5}px ${-Math.random() * 5}px 40px #ff0000
            `;
        }, 3000);
    }

    // Эффект статики для фона
    const sections = document.querySelectorAll('.country-section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.filter = 'brightness(1.1)';
        });
        section.addEventListener('mouseleave', () => {
            section.style.filter = 'brightness(1)';
        });
    });
}

// Анимация прогресс-баров
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Секретная информация
function initClassifiedInfo() {
    const classified = document.querySelector('.classified');
    if (!classified) return;

    let accessAttempts = 0;

    classified.addEventListener('click', () => {
        accessAttempts++;
        
        if (accessAttempts === 3) {
            alert('ПРЕДУПРЕЖДЕНИЕ: ПОПЫТКА НЕСАНКЦИОНИРОВАННОГО ДОСТУПА ЗАФИКСИРОВАНА');
        } else if (accessAttempts === 5) {
            alert('ТРЕВОГА: АКТИВИРОВАНА СИСТЕМА ЗАЩИТЫ');
            document.body.style.backgroundColor = '#ff0000';
            setTimeout(() => {
                document.body.style.backgroundColor = '#000000';
            }, 100);
        } else if (accessAttempts === 7) {
            // Пасхалка - показать секретную информацию
            const reveal = classified.querySelector('.reveal-on-hover');
            reveal.style.opacity = '1';
            reveal.style.color = '#ff0000';
            reveal.textContent = 'ПРОЕКТ "СИНГУЛЯРНОСТЬ": АКТИВАЦИЯ ЧЕРЕЗ 666 ДНЕЙ...';
        }
    });
}

// ASCII анимации
function initAsciiAnimations() {
    // Анимация карты
    const map = document.querySelector('.ascii-map');
    if (map) {
        const originalContent = map.innerHTML;
        let glitchActive = false;
        
        setInterval(() => {
            if (!glitchActive && Math.random() < 0.1) {
                glitchActive = true;
                // Глитч эффект
                map.innerHTML = originalContent.replace(/[▓░▒]/g, () => {
                    return ['▓', '░', '▒'][Math.floor(Math.random() * 3)];
                });
                
                setTimeout(() => {
                    map.innerHTML = originalContent;
                    glitchActive = false;
                }, 200);
            }
        }, 2000);
    }

    // Анимация портрета правителя
    const portrait = document.querySelector('.ascii-portrait');
    if (portrait) {
        portrait.addEventListener('mouseenter', () => {
            portrait.style.color = '#ff0000';
            portrait.style.textShadow = '0 0 10px #ff0000';
        });
        
        portrait.addEventListener('mouseleave', () => {
            portrait.style.color = '#ffff00';
            portrait.style.textShadow = 'none';
        });
    }
}

// Эффект печатной машинки для описаний
const descriptions = document.querySelectorAll('.country-description p');
descriptions.forEach((desc, index) => {
    const text = desc.textContent;
    desc.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            desc.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 20);
});

// Интерактивная таблица военной мощи
const militaryRows = document.querySelectorAll('.military-table tr:not(.table-header)');
militaryRows.forEach(row => {
    row.addEventListener('click', () => {
        const unit = row.cells[0].textContent;
        const threat = row.cells[3].textContent;
        
        if (threat === 'ЭКСТРЕМАЛЬНАЯ') {
            alert(`ВНИМАНИЕ: ${unit} представляет максимальную угрозу!`);
            row.style.backgroundColor = '#ff0000';
            setTimeout(() => {
                row.style.backgroundColor = 'transparent';
            }, 1000);
        }
    });
});

// Эффект для дипломатических отношений
const relationsRows = document.querySelectorAll('.relations-table tr:not(.table-header)');
relationsRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        const relation = row.cells[1].className;
        if (relation.includes('hostile')) {
            row.style.backgroundColor = '#3a0000';
            row.style.boxShadow = '0 0 10px #ff0000';
        } else if (relation.includes('tense')) {
            row.style.backgroundColor = '#3a2200';
            row.style.boxShadow = '0 0 10px #ff8800';
        }
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = 'transparent';
        row.style.boxShadow = 'none';
    });
});

// Звуковые эффекты (имитация)
function playCountrySound(type) {
    switch(type) {
        case 'tech':
            console.log('*DIGITAL BEEPING*');
            break;
        case 'war':
            console.log('*EXPLOSION SOUND*');
            break;
        case 'secret':
            console.log('*MYSTERIOUS WHISPER*');
            break;
    }
}

// Случайные события на странице
setInterval(() => {
    const randomEvent = Math.random();
    
    if (randomEvent < 0.05) {
        // Глитч всей страницы
        document.body.style.filter = 'invert(1)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 100);
    } else if (randomEvent < 0.1) {
        // Предупреждение о вторжении
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff0000;
            color: #000000;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
            z-index: 9999;
            animation: blink 0.5s infinite;
        `;
        warning.textContent = '⚠️ ОБНАРУЖЕНО ВТОРЖЕНИЕ ⚠️';
        document.body.appendChild(warning);
        
        setTimeout(() => {
            warning.remove();
        }, 3000);
    }
}, 10000);

// Пасхалка - секретный код страны
let secretCode = '';
document.addEventListener('keypress', (e) => {
    secretCode += e.key;
    
    if (secretCode.includes('neuropia')) {
        // Активация режима Нейропии
        document.body.style.filter = 'hue-rotate(180deg)';
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #00ff00;
            color: #000000;
            padding: 20px;
            font-size: 18px;
            z-index: 9999;
        `;
        message.textContent = 'НЕЙРОСЕТЬ АКТИВИРОВАНА';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.style.filter = 'none';
        }, 5000);
        
        secretCode = '';
    }
});

// Интеграция чата со статистикой страны
function initChatIntegration() {
    // Находим секцию обзора с таблицей информации
    const overviewSection = document.querySelector('#overview');
    if (!overviewSection) return;
    
    // Добавляем кнопку для открытия чата к заголовку секции
    const sectionTitle = overviewSection.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.style.cursor = 'pointer';
        sectionTitle.style.transition = 'all 0.3s';
        
        // Создаем подсказку
        const hint = document.createElement('span');
        hint.style.cssText = `
            font-size: 12px;
            color: #888;
            margin-left: 10px;
            font-style: italic;
        `;
        hint.textContent = '(Нажмите для секретного чата)';
        sectionTitle.appendChild(hint);
        
        sectionTitle.addEventListener('click', function() {
            if (typeof encryptedChat === 'undefined') {
                loadChatScripts();
            } else {
                encryptedChat.open();
            }
        });
        
        // Визуальные эффекты
        sectionTitle.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px #00ff00';
            this.style.transform = 'scale(1.05)';
        });
        
        sectionTitle.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.transform = 'scale(1)';
        });
    }
}

// Загрузка скриптов чата (копия функции из основного скрипта)
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