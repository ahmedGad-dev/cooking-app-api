import { async } from "regenerator-runtime"
import {API_URL, RESULTS_PER_PAGE} from './config.js'
import {getJson} from './helpers'

export const state = {
    recipe: {},
    search: {
        query : '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1
    }
}

export const loadRecipe = async(id) => {
    try {
        const data = await getJson(`${API_URL}${id}`)
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
        throw error   // Throwing error here ion order to propagate it to the controller
    }
}


export const loadSreachResults = async(query) => {
    try {
        state.search.query = query
        const data = await getJson(`${API_URL}?search=${query}&key=e4db81ef-099e-4a7c-807b-91cec76aeb35`)
        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image:recipe.image_url,
            }
        })
    } catch (error) {
        throw error
    }
}


// this function serves for pagination
export const getSearchResultsPage = (page = state.search.page) => {
    state.search.page = page
    const start = (page - 1 ) * state.search.resultsPerPage  //start from 1  (0* 10) = 0
    const end = page * state.search.resultsPerPage    //start from 1 (1 * 10) = 1

    return state.search.results.slice(start, end)
}


