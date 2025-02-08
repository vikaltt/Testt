import React from 'react';
import { Recipe } from '../types/Recipe';
import { Plus, Trash2 } from 'lucide-react';  // Импортируем иконку для удаления

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe | null) => void;
  onDeleteRecipe: (recipeId: string) => void;  // Функция для удаления рецепта
}

export function RecipeList({ recipes, onSelectRecipe, onDeleteRecipe }: RecipeListProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-transparent shadow-none">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Рецепты</h2>
      <div className="space-y-2">
        <button
          onClick={() => onSelectRecipe(null)}
          className="w-full p-3 text-left bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Новый рецепт</span>
        </button>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex items-center justify-between">
            <button
              onClick={() => onSelectRecipe(recipe)}
              className="w-full p-3 text-left bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {recipe.name}
            </button>
            <button
              onClick={() => onDeleteRecipe(recipe.id)}  // Вызываем функцию удаления
              className="ml-2 text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
