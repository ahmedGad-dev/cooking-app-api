import View from "./View";
import icons from 'url:../../img/icons.svg'
class PaginationView extends View {
    _parentEl = document.querySelector('.pagination')
    //_errorMessage = 'No Recipes found for your search, please try again'   
    // _messageSuccess = 'Complete'
    
     
    addHandlerPaginate = (handler) => {
      this._parentEl.addEventListener('click', (e) =>{
        const btn = e.target.closest('.btn--inline')
        if(!btn) return

        const goToPage = +(btn.dataset.goto);
        handler(goToPage)
      })
    }

    _generateMarkup(){
        const curPage = this._data.page
        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage) //Math.ceil to round the decimal to next integer
       

          //first page and there are otheres
        if(curPage === 1 && numOfPages > 1 ) {
            return`
              <button class="btn--inline btn-current-page" disabled='true'>         
                <span>page ${curPage}</span>
              </button>

              <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button> 
                `
        }

        // total pages are 1 page only
        if(numOfPages === 1){
            return`
              <button data-goto="${curPage + 1}"  class="btn--inline pagination__btn--prev">
               <svg class="search__icon">
                 <use href="src/img/icons.svg#icon-arrow-left"></use>
               </svg>
               <span>1</span>
              </button>
            `
        }

        //last page
        if(curPage === numOfPages && numOfPages > 1) {  //page 6 of 6 for example
          return`
          <button data-goto="${curPage - 1}"  class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
           </svg>         
          </button>

          <button class='btn--inline btn-current-page' disabled='true'>
           <span>page ${curPage} </span>
          </button>
        `         
        }

        //pages after first and before last
        if(curPage < numOfPages){
              return`
              <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>

            <button class="btn--inline btn-current-page" disabled='true'>         
              <span>${curPage}</span>
            </button>

            <button data-goto="${curPage + 1}"  class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button> 
              `
        }
      return '';      
    }
}


export default new PaginationView()