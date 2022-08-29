import { async } from "regenerator-runtime"
import {API_URL} from './config.js'
import {getJson} from './helpers'

export const state = {
    recipe: {},
}

export const loadRecipe = async(id) => {
    try {
        const data = await getJson(`${API_URL}/${id}`)

        const {recipe} = data.data
        console.log(recipe)

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publihser:recipe.publihser,
            sourceUrl:recipe.sourceUrl,
            image:recipe.image_url,
            servings:recipe.servings, 
            ingredients:recipe.ingredients,
            cookingTime:recipe.cooking_time 
        } 

    } catch (error) {
        console.error(error)
    }
}