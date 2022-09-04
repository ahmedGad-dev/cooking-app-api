import * as model from './model';
import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import RecipeView from './views/receipeView.js';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import BookmarksView from './views/bookmarkView';
import bookmarkView from './views/bookmarkView';

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
   
  const controlServings = (newServings) => {
    //update Recipe servings
    model.updateServings(newServings)

    //update the recipe view
    RecipeView.render(model.state.recipe)
  }

  const controlAddBookMark = () => {
    //add or remove bookmarks
    if(!model.state.recipe.bookmark) {
        model.addBookmark(model.state.recipe)
    } else {
      model.deleteBookmark(model.state.recipe.id)
    }
    //update recipe view
    RecipeView.render(model.state.recipe)

    //render the bookmarks
    BookmarksView.render(model.state.bookmarks)
  }

  const controlBookMarks = () => {
    BookmarksView.render(model.state.bookmarks)
  }

// The fetch recipe controller function is passed to the handler render in the view as argument to listen to it's change as the publisher
const init = () => {
  BookmarksView.addHandlerRender(controlBookMarks)
  RecipeView.addHandlerRender(fetchReciecpe)
  RecipeView.addHandlerUpdateService(controlServings)
  RecipeView.addBookMarkHandler(controlAddBookMark)
  SearchView.addHandlerSearch(controlSearchResults)
  PaginationView.addHandlerPaginate(controlPagination)
}

init()




