import React, { useState, useEffect, useRef } from 'react';
import { Plus, Save, ChevronDown, Minus } from 'lucide-react';

interface Ingredient {
  name: string;
  baseAmount: string;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

interface RecipeFormProps {
  initialRecipe?: Recipe;
  onSave: (recipe: Recipe) => void;
  onBack: () => void;
  ingredientsList: string[]; // Передаем список ингредиентов
  addNewIngredient: (ingredient: string) => void; // Функция для добавления нового ингредиента
}

export function RecipeForm({ initialRecipe, onSave, onBack, ingredientsList, addNewIngredient }: RecipeFormProps) {
  const [recipeName, setRecipeName] = useState(initialRecipe?.name || '');
  const [multiplier, setMultiplier] = useState('1');
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialRecipe?.ingredients || [{ name: '', baseAmount: '' }]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [newIngredient, setNewIngredient] = useState('');
  const [updatedIngredientsList, setUpdatedIngredientsList] = useState<string[]>(ingredientsList);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUpdatedIngredientsList(ingredientsList);
  }, [ingredientsList]);

  // Функция для добавления нового ингредиента
  const handleAddNewIngredient = async () => {
    if (newIngredient.trim()) {
      try {
        console.log('Sending ingredient:', newIngredient.trim());  // Логируем перед отправкой
        const response = await fetch('http://localhost:5000/ingredients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredient: newIngredient.trim() }),
        });

        const data = await response.json();
        console.log('Server response:', data);  // Логируем ответ от сервера

        if (response.ok) {
          setUpdatedIngredientsList(data); // Обновляем список ингредиентов
          setNewIngredient('');
        } else {
          alert(data.message || 'Ошибка при добавлении ингредиента');
        }
      } catch (error) {
        console.error('Error during ingredient addition:', error);  // Логируем ошибку
        alert('Произошла ошибка при добавлении ингредиента');
      }
    }
  };

  const handleSave = () => {
    if (!recipeName.trim()) {
      alert('Введите название рецепта');
      return;
    }

    const filteredIngredients = ingredients.filter(ing => ing.name && ing.baseAmount);
    if (filteredIngredients.length === 0) {
      alert('Добавьте хотя бы один ингредиент');
      return;
    }

    const recipe: Recipe = {
      id: Date.now().toString(),
      name: recipeName.trim(),
      ingredients: filteredIngredients.map(ing => ({
        ...ing,
        baseAmount: parseFloat(ing.baseAmount.toString()),
      })),
    };
    onSave(recipe);
  };

  // Добавить новый ингредиент
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', baseAmount: '' }]);
  };

  // Удалить ингредиент
  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // Обновить ингредиент
  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value,
    };
    setIngredients(newIngredients);
  };

  // Выбрать ингредиент
  const selectIngredient = (index: number, name: string) => {
    updateIngredient(index, 'name', name);
    setShowDropdown(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 md:max-w-md">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">
        ← Назад к списку
      </button>

      <div className="space-y-4">
        <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="Название рецепта" className="w-full p-2 border rounded text-base sm:text-sm lg:text-lg" />

        <div className="flex gap-2 items-center">
          <label className="whitespace-nowrap text-lg sm:text-md lg:text-white">Множитель:</label>
          <input type="text" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="w-14 p-2 border rounded text-center sm:text-xs lg:text-base" />
        </div>

        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="relative flex items-center gap-2">
              <button
                onClick={() => removeIngredient(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                <Minus size={10} />
              </button>

              <div className="flex-1 relative">
                <div className="flex">
                  <input type="text" value={ingredient.name} onChange={(e) => updateIngredient(index, 'name', e.target.value)} placeholder="Ингредиент" className="flex-1 p-2 border rounded-l text-sm" onClick={() => setShowDropdown(index)} />
                  <button className="px-2 border border-l-0 rounded-r bg-white opacity-100 hover:bg-gray-50" onClick={() => setShowDropdown(index)}>
                    <ChevronDown size={16} />
                  </button>
                </div>

                {showDropdown === index && (
                  <div ref={dropdownRef} className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {updatedIngredientsList.map((item, i) => (
                      <button key={i} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => selectIngredient(index, item)}>
                        {item}
                      </button>
                    ))}
                    <div className="flex items-center justify-between px-4 py-2 text-sm">
                      <input type="text" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} placeholder="Добавить ингредиент" className="w-3/4 p-1 border rounded" />
                      <button className="ml-2 text-blue-500" onClick={handleAddNewIngredient}>
                        Добавить
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <input type="text" value={ingredient.baseAmount} onChange={(e) => updateIngredient(index, 'baseAmount', e.target.value)} placeholder="Кол." className="w-12 p-2 border rounded text-center text-sm" />
              {multiplier !== '' && (
                <div className={`w-12 p-2 rounded text-center text-sm ${index % 2 === 0 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  {(parseFloat(ingredient.baseAmount) * parseFloat(multiplier) || 0).toFixed(1)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          <button onClick={addIngredient} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
            <Plus size={16} />
            Добавить ингредиент
          </button>

          <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            <Save size={16} />
            Сохранить рецепт
          </button>
        </div>
      </div>
    </div>
  );
}
