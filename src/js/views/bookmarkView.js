import View from "./View";
import icons from '../../img/icons.svg'

class BookmarksView extends View {
    _parentEl = document.querySelector('.bookmarks__list')
    _errorMessage = 'No Recipes bookmarked yet, please add your favourite ones'   
    _messageSuccess = 'Complete'

     addHandlerRender = (handler) => {
       window.addEventListener('load', handler)
     }


    _generateMarkup(){
        const id = window.location.hash.slice(1)
        
        return this._data.map((item) =>{
            const {image, publisher, title} = item
            return`
            <li class="preview">
            <a class="preview__link ${item.id === id ? 'preview__link--active' : ''}" href="#${id}">
              <figure class="preview__fig">
                <img src=${image} alt=${title} />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${title}</h4>       
                <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                  <svg>
                   <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>             
             </a>
           </li>
             `
        }).join('')      
    }
}


export default new BookmarksView()