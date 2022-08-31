import View from "./View";

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination')
  //  _errorMessage = 'No Recipes found for your search, please try again'   
   // _messageSuccess = 'Complete'


    _generateMarkup(){
        return`
           <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button> -->
        `
    }

}


export default new ResultsView()