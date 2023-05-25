import axios from "axios";
import { useState } from "react"
import { useGetUserID } from "../hooks/useGetUserId";
import {useNavigate} from "react-router-dom"
export const CreateRecipe = () => {

    const userID = useGetUserID();
    
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID
    })

   const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value})
    }

    const handleIngredientChange = (event, idx) => {
        const { value} = event.target;
        const ingredients = recipe.ingredients
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients})
       
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:8000/recipies", recipe);
            alert("recipe created")
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="create-recipe">
           <h2>Create Recipe</h2>
           <form onSubmit={onSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={handleChange}/>
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, idx) => (
                 <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, idx)}/>
            ))}
            <button onClick={addIngredient} type="button">Add ingredient</button>
            
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" onChange={handleChange} name="instructions"></textarea>
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" onChange={handleChange} id="imageUrl" name="imageUrl" />
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input type="number" onChange={handleChange} id="cookingTime" name="cookingTime" />
            <button type="submit">Create Recipe</button>
           </form>
        </div>
    )
} 