// Стандартный список ингредиентов
const defaultIngredients = [
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

// Функция для получения стандартного списка ингредиентов
export const getDefaultIngredients = () => {
  return defaultIngredients;
};

// Функция для добавления нового ингредиента
export const addNewIngredient = (ingredient: string, currentIngredients: string[]) => {
  const trimmedIngredient = ingredient.trim();
  
  if (!currentIngredients.includes(trimmedIngredient)) {
    const newList = [...currentIngredients, trimmedIngredient];
    return newList;
  }

  return currentIngredients;
};
