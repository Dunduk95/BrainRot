class EncryptedChat {
    constructor() {
        this.currentRoom = 'public1';
        this.username = null;
        this.messages = {
            public1: [],
            public2: [],
            private1: [],
            private2: []
        };
        this.privateRoomUsers = {
            private1: [],
            private2: []
        };
        
        this.initElements();
        this.attachEventListeners();
        this.generateRoomKey();
    }
    
    initElements() {
        this.chatContainer = document.getElementById('chat-container');
        this.usernameInput = document.getElementById('username');
        this.setUsernameBtn = document.getElementById('set-username');
        this.chatContent = document.getElementById('chat-content');
        this.messagesDiv = document.getElementById('messages');
        this.messageInput = document.getElementById('message-input');
        this.sendButton = document.getElementById('send-message');
        this.closeBtn = document.getElementById('close-chat');
        this.roomTabs = document.querySelectorAll('.room-tab');
        this.usernameSection = document.querySelector('.username-section');
    }
    
    attachEventListeners() {
        this.setUsernameBtn.addEventListener('click', () => this.setUsername());
        this.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.setUsername();
        });
        
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.closeBtn.addEventListener('click', () => this.close());
        
        this.roomTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchRoom(tab.dataset.room));
        });
    }
    
    generateRoomKey() {
        this.roomKeys = {};
        for (let room in this.messages) {
            this.roomKeys[room] = this.generateKey();
        }
    }
    
    generateKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }
    
    setUsername() {
        const name = this.usernameInput.value.trim();
        if (name) {
            this.username = name;
            this.usernameSection.style.display = 'none';
            this.chatContent.style.display = 'flex';
            this.messageInput.focus();
        }
    }
    
    switchRoom(room) {
        if (room.startsWith('private') && !this.canJoinPrivateRoom(room)) {
            alert('Эта приватная комната заполнена (максимум 2 пользователя)');
            return;
        }
        
        this.currentRoom = room;
        this.roomTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.room === room);
        });
        
        this.displayMessages();
        
        if (room.startsWith('private')) {
            this.joinPrivateRoom(room);
        }
    }
    
    canJoinPrivateRoom(room) {
        const users = this.privateRoomUsers[room];
        return users.length < 2 || users.includes(this.username);
    }
    
    joinPrivateRoom(room) {
        const users = this.privateRoomUsers[room];
        if (!users.includes(this.username) && users.length < 2) {
            users.push(this.username);
        }
    }
    
    sendMessage() {
        const text = this.messageInput.value.trim();
        if (!text || !this.username) return;
        
        const message = {
            username: this.username,
            text: text,
            timestamp: Date.now(),
            encrypted: true
        };
        
        const encrypted = this.encrypt(JSON.stringify(message), this.roomKeys[this.currentRoom]);
        
        this.messages[this.currentRoom].push(encrypted);
        this.messageInput.value = '';
        
        this.displayMessages();
        this.scrollToBottom();
    }
    
    displayMessages() {
        this.messagesDiv.innerHTML = '';
        
        const messages = this.messages[this.currentRoom];
        messages.forEach(encryptedMsg => {
            try {
                const decrypted = this.decrypt(encryptedMsg, this.roomKeys[this.currentRoom]);
                const message = JSON.parse(decrypted);
                this.addMessageToDisplay(message);
            } catch (e) {
                console.error('Failed to decrypt message:', e);
            }
        });
    }
    
    addMessageToDisplay(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message' + (message.username === this.username ? ' own' : '');
        
        messageEl.innerHTML = `
            <div class="username">${message.username}</div>
            <div class="text">${message.text}</div>
        `;
        
        this.messagesDiv.appendChild(messageEl);
    }
    
    encrypt(text, key) {
        // Преобразуем текст в base64 для корректной работы с юникодом
        const textBase64 = btoa(unescape(encodeURIComponent(text)));
        let result = '';
        for (let i = 0; i < textBase64.length; i++) {
            const charCode = textBase64.charCodeAt(i);
            const keyChar = key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode ^ keyChar);
        }
        return btoa(result);
    }
    
    decrypt(encrypted, key) {
        const text = atob(encrypted);
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const keyChar = key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode ^ keyChar);
        }
        // Декодируем обратно из base64 для восстановления юникода
        return decodeURIComponent(escape(atob(result)));
    }
    
    scrollToBottom() {
        this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
    }
    
    open() {
        this.chatContainer.classList.add('active');
        if (this.username) {
            this.messageInput.focus();
        } else {
            this.usernameInput.focus();
        }
    }
    
    close() {
        this.chatContainer.classList.remove('active');
        
        this.messages = {
            public1: [],
            public2: [],
            private1: [],
            private2: []
        };
        this.privateRoomUsers = {
            private1: [],
            private2: []
        };
        
        this.username = null;
        this.usernameInput.value = '';
        this.messageInput.value = '';
        this.usernameSection.style.display = 'flex';
        this.chatContent.style.display = 'none';
        
        this.generateRoomKey();
    }
}

let encryptedChat = null;

document.addEventListener('DOMContentLoaded', () => {
    encryptedChat = new EncryptedChat();
});