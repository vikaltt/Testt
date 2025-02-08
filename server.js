import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5001;

// Разрешаем кросс-доменные запросы
app.use(cors({
  origin: 'http://localhost:5173',  // Убедитесь, что это URL вашего фронтенда
}));

// Настроим заголовки CSP для разрешения inline-скриптов и внешних источников
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3--5001--d20a0a75.local-credentialless.webcontainer-api.io; style-src 'self' 'unsafe-inline';");
  next();
});

// Парсим JSON
app.use(bodyParser.json());

// Храним список ингредиентов в памяти
let ingredientsList = [
  'Пшенная мука',
  'Нутовая мука',
  'Крахмал Тапиоковый',
  'Крахмал кукурузный',
  'Крахмал картофельный',
  'Амарантовая мука',
  'Рисовая цельнозерновая',
  'Ксантановая камедь',
  'Льняная мука',
  'Псиллиум',
  'Рисовая мука',
  'Кукурузная мука',
  'Цельнозерновая из зеленой гречки мука',
  'Из бурого риса мука',
  'Смесь для выпечки темная',
  'Смесь для выпечки светлая',
  'Здравичка',
  'Универсальная',
  'Семена чиа',
  'Семена белого льна',
  'Семена льна',
  'Дрожжи прессованые',
  'Яйца',
  'Молоко',
  'Какао',
  'Соль',
  'Сахар',
  'Разрыхлитель',
  'Сода'
];

// Получаем список ингредиентов
app.get('/ingredients', (req, res) => {
  console.log('Ingredients list requested');
  res.json(ingredientsList); // Возвращаем список ингредиентов
});

// Добавляем новый ингредиент
app.post('/ingredients', (req, res) => {
  const { ingredient } = req.body;

  console.log('Received ingredient:', ingredient);

  // Проверка на пустой ингредиент
  if (!ingredient) {
    return res.status(400).json({ message: 'Ингредиент не указан' });
  }

  // Проверка на уже существующий ингредиент
  if (ingredientsList.includes(ingredient.trim())) {
    return res.status(400).json({ message: 'Ингредиент уже существует' });
  }

  ingredientsList.push(ingredient.trim()); // Добавляем новый ингредиент в список
  console.log('Updated ingredients list:', ingredientsList);

  return res.json(ingredientsList); // Отправляем обновленный список обратно
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Сервер работает на порту http://localhost:${port}`);
});
