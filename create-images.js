const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Создаем папки
const folders = [
    'images',
    'images/products',
    'images/social'
];

folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});

// Создаем изображения
const images = [
    { name: 'logo.jpg', text: 'ПЕРСПЕКТИВА ТЦ', bg: '#1a3a8f', textColor: '#fff', size: 400 },
    { name: 'hero-bg.jpg', bg: '#2a4ba8', size: 1200 },
    { name: 'service-domofon.jpg', text: 'ДОМОФОНЫ', bg: '#1a3a8f', size: 600 },
    { name: 'service-camera.jpg', text: 'ВИДЕОНАБЛЮДЕНИЕ', bg: '#1a3a8f', size: 600 },
    { name: 'service-shlagbaum.jpg', text: 'ШЛАГБАУМЫ', bg: '#1a3a8f', size: 600 },
    { name: 'portfolio-1.jpg', text: 'ЖК "Солнечный"', bg: '#2a4ba8', size: 800 },
    { name: 'portfolio-2.jpg', text: 'Бизнес-центр', bg: '#2a4ba8', size: 800 },
    { name: 'team-1.jpg', text: 'Евгений', bg: '#1a3a8f', size: 400, round: true },
    { name: 'team-2.jpg', text: 'Алексей', bg: '#1a3a8f', size: 400, round: true },
    { name: 'team-3.jpg', text: 'Мария', bg: '#1a3a8f', size: 400, round: true },
    { name: 'team-4.jpg', text: 'Ольга', bg: '#1a3a8f', size: 400, round: true }
];

// Продукты
const products = [
    { name: 'domofon1.jpg', text: 'Домофонная система', bg: '#f86604', size: 400 },
    { name: 'domofon2.jpg', text: 'IP Контроллер', bg: '#1a3a8f', size: 400 },
    { name: 'camera1.jpg', text: 'Камера 4MP', bg: '#f86604', size: 400 },
    { name: 'camera2.jpg', text: 'Купольная камера', bg: '#1a3a8f', size: 400 },
    { name: 'shlagbaum1.jpg', text: 'Шлагбаум 4м', bg: '#f86604', size: 400 },
    { name: 'controller1.jpg', text: 'Контроллер доступа', bg: '#1a3a8f', size: 400 }
];

function createImage(filename, options) {
    const canvas = createCanvas(options.size, options.size);
    const ctx = canvas.getContext('2d');
    
    if (options.round) {
        // Круглое изображение
        ctx.beginPath();
        ctx.arc(options.size/2, options.size/2, options.size/2, 0, Math.PI * 2);
        ctx.fillStyle = options.bg;
        ctx.fill();
        
        if (options.text) {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(options.text, options.size/2, options.size/2);
        }
    } else {
        // Прямоугольное изображение
        ctx.fillStyle = options.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (options.text) {
            ctx.fillStyle = options.textColor || '#fff';
            ctx.font = 'bold 32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(options.text, canvas.width/2, canvas.height/2);
        }
    }
    
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join('images', filename), buffer);
    console.log(`✅ Создано: ${filename}`);
}

// Создаем все изображения
console.log('🖼️ Создаем placeholder изображения...\n');

images.forEach(img => createImage(img.name, img));
products.forEach(prod => createImage(`products/${prod.name}`, prod));

// Создаем SVG иконки
const svgIcons = {
    'vk.svg': `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#0077FF" d="M12.65 17.48c-4.5 0-7.15-3.47-7.3-9.23h2.5c.1 4.08 1.9 5.83 3.05 6.2V8.25h2.35v3.62c1.15-.13 2.35-1.72 2.75-3.62h2.35c-.3 2.28-1.55 3.97-2.65 4.65.9.68 2.35 2.22 2.9 4.58h-2.6c-.45-1.65-1.6-2.93-2.9-3.13v3.13h-.3z"/></svg>`,
    'telegram.svg': `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#0088cc" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.17-.04-.24-.02-.1.02-1.79 1.14-5.06 3.35-.48.33-.92.49-1.31.48-.43-.01-1.27-.24-1.89-.44-.76-.24-1.36-.37-1.31-.78.03-.24.37-.48 1-.73z"/></svg>`,
    'whatsapp.svg': `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#25D366" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm5.25 13.91c-.25.71-1.31 1.36-1.8 1.44-.5.08-.84.25-2.92-.56-2.57-1.01-4.23-3.54-4.36-3.7-.13-.16-1.04-1.38-1.04-2.64 0-1.26.63-1.88.87-2.14.23-.25.5-.31.67-.31h.63c.21 0 .42.01.61.29.19.29.67.99.72 1.06.06.07.1.15.01.3-.09.15-.13.25-.26.4-.13.16-.28.35-.4.47-.13.13-.27.27-.12.52.15.25.67 1.08 1.44 1.75 1.01.88 1.86 1.15 2.11 1.28.25.13.4.11.55-.07.15-.18.64-.75.81-1.01.17-.26.34-.22.57-.13.23.09 1.44.68 1.69.8.25.13.42.19.48.31.07.12.07.69-.18 1.4z"/></svg>`
};

Object.entries(svgIcons).forEach(([filename, svg]) => {
    fs.writeFileSync(path.join('images/social', filename), svg);
    console.log(`✅ Создано: social/${filename}`);
});

console.log('\n🎉 Все изображения созданы! Загрузите папку images/ на GitHub.');