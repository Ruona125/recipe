import axios from "axios";
import { useEffect, useState } from "react";
import {useGetUserID} from "../hooks/useGetUserId"

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const userId = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipies");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
  }, []);

  if (!recipes) return null;

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:8000/recipies", {
        recipeId,
        userId,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe, i) => (
          <li key={i}>
            <div>
              <h3>{recipe.name}</h3>
              <button onClick={() => saveRecipe(recipe._id)}>Save</button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (min)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
