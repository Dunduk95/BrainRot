class CryptoHelper {
    static async generateKey() {
        const key = await crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );
        return key;
    }
    
    static async exportKey(key) {
        const exported = await crypto.subtle.exportKey("jwk", key);
        return JSON.stringify(exported);
    }
    
    static async importKey(keyData) {
        const keyObj = JSON.parse(keyData);
        const key = await crypto.subtle.importKey(
            "jwk",
            keyObj,
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );
        return key;
    }
    
    static async encrypt(text, key) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        const encrypted = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            data
        );
        
        const encryptedArray = new Uint8Array(encrypted);
        const combined = new Uint8Array(iv.length + encryptedArray.length);
        combined.set(iv);
        combined.set(encryptedArray, iv.length);
        
        return this.bufferToBase64(combined);
    }
    
    static async decrypt(encryptedData, key) {
        const combined = this.base64ToBuffer(encryptedData);
        const iv = combined.slice(0, 12);
        const data = combined.slice(12);
        
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            data
        );
        
        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    }
    
    static bufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    
    static base64ToBuffer(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }
    
    static generateRoomId() {
        return 'room_' + Math.random().toString(36).substr(2, 9);
    }
    
    static generatePassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 32; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
}