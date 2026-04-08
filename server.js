const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Railway автоматично видає порт через змінну середовища PORT. 
// Якщо запускаємо локально на комп'ютері — буде 3000.
const PORT = process.env.PORT || 3000;

// Дозволяємо запити з будь-яких сайтів (CORS), щоб браузер не блокував картинки
app.use(cors());

// Головний маршрут (API), який віддає фотографії
app.get('/api/photos', (req, res) => {
    try {
        // Читаємо дані з файлу photos.json
        const filePath = path.join(__dirname, 'photos.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        
        // Перетворюємо текст на масив
        const photos = JSON.parse(fileData);
        
        // Відправляємо масив на сайт
        res.json(photos);
    } catch (error) {
        console.error('Помилка читання файлу photos.json:', error);
        res.status(500).json({ error: 'Не вдалося завантажити фотографії' });
    }
});

// Тестовий маршрут (щоб перевірити, чи сервер взагалі "живий" після деплою)
app.get('/', (req, res) => {
    res.send('API Фотогалереї працює! Щоб отримати фото, перейдіть на /api/photos');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер успішно запущено на порту ${PORT}`);
});
