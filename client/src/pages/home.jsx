import axios from "axios";
import { useEffect, useState } from "react";
export const Home = () => {
  const [recipes, setRecipies] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipies");
        setRecipies(response.data);
        console.log(response.data[0].name)
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, []);
  if(!recipes) return null
  return (
    <div>
      <h2>Recipies</h2>
      <ul>
        {recipes.map((recipe, i) => {
          <li key={i}>
            <div>
              <h3>{recipe.name}</h3>
            </div>
            {/* <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (min)</p> */}
          </li>;
        })}
      </ul>
    </div>
  );
};
