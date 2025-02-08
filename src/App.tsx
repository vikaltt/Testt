import React, { useState, useEffect } from 'react';
import { Recipe } from './types/Recipe';
import { RecipeList } from './components/RecipeList';
import { RecipeForm } from './components/RecipeForm';
import { getDefaultIngredients, addNewIngredient } from './data/ingredients';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>(getDefaultIngredients());

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  const handleSaveRecipe = (recipe: Recipe) => {
    if (selectedRecipe) {
      setRecipes(recipes.map(r => r.id === recipe.id ? recipe : r));
    } else {
      setRecipes([...recipes, recipe]);
    }
    setSelectedRecipe(null);
    setIsEditing(false);
  };

  const handleSelectRecipe = (recipe: Recipe | null) => {
    setSelectedRecipe(recipe);
    setIsEditing(true);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
  };

  // Функция для добавления нового ингредиента
  const handleAddNewIngredient = (ingredient: string) => {
    const newList = addNewIngredient(ingredient, ingredients); // Обновляем список ингредиентов
    setIngredients(newList); // Обновляем состояние
  };

  return (
    <div className="min-h-screen bg-transparent">
      <ErrorBoundary>
        {!isEditing ? (
          <RecipeList
            recipes={recipes}
            onSelectRecipe={handleSelectRecipe}
            onDeleteRecipe={handleDeleteRecipe}
          />
        ) : (
          <RecipeForm
            initialRecipe={selectedRecipe}
            onSave={handleSaveRecipe}
            onBack={() => {
              setSelectedRecipe(null);
              setIsEditing(false);
            }}
            ingredientsList={ingredients} // Передаем список ингредиентов
            addNewIngredient={handleAddNewIngredient} // Функция для добавления нового ингредиента
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
