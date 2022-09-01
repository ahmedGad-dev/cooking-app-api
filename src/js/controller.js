import * as model from './model';
import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import RecipeView from './views/receipeView.js';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';

// This is coming from parcel to save the state in the browser
if(module.hot){
  module.hot.accept()
}

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
  } catch(error) {
      RecipeView.renderError()
  }
}

const controlSearchResults = async(query) => {
  try {
      ResultsView.renderSpinner()
      const query = SearchView.getQuery()
      if(!query) return
         
      await model.loadSreachResults(query)
      SearchView.clear()
      ResultsView.render(model.getSearchResultsPage())

      PaginationView.render(model.state.search)
  } catch (error) {
     console.log(error)
  }
}


 const controlPagination = (goToPage) => {
  //the render method defined in the view overwrides everything previously in the view because it runs the clear method
  ResultsView.render(model.getSearchResultsPage(goToPage))
  PaginationView.render(model.state.search)
 }
   
  const controlServings = () => {
    //update Recipe servings
    model.updateServings(6)


    //update the recipe view
    RecipeView.render(model.state.recipe)
  }

// The fetch recipe controller function is passed to the handler render in the view as argument to listen to it's change as the publisher
const init = () => {
  RecipeView.addHandlerRender(fetchReciecpe)
  RecipeView.addHandlerUpdateService(controlServings)
  SearchView.addHandlerSearch(controlSearchResults)
  PaginationView.addHandlerPaginate(controlPagination)
}

init()




