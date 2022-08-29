import * as model from './model';
import RecipeView from './views/receipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const fetchReciecpe = async() => {
  try {
      const id = window.location.hash.slice(1)
      if(!id) return
       // The loading spinner
      RecipeView.renderSpinner()
      //Loading recipe
      await model.loadRecipe(id)
      RecipeView.render(model.state.recipe)
      
    //  recipeContainer.insertAdjacentHTML('afterbegin', reciepeHTML)
  } catch (error) {
      console.log(error)
  }
}

// The fetch recipe controller function is passed to the handler render in the view as argument to listen to it's change as the publisher
const init = () => {
  RecipeView.addHandlerRender(fetchReciecpe)
}

init()




