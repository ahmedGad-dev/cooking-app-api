import View from "./View";

class ResultsView extends View {
    _parentEl = document.querySelector('.results')
    _errorMessage = 'No Recipes found for your search, please try again'   
    _messageSuccess = 'Complete'


    _generateMarkup(){
      const locationId = window.location.hash.slice(1)

        return this._data.map((item) =>{
            const {image, publisher, title, id} = item
            return`
            <li class="preview">
             <a class= "preview__link ${locationId === id? "preview__link--active" : ""} " href="#${id}">
               <figure class="preview__fig">
                 <img src=${image} alt="${title}" />
               </figure>
               <div class="preview__data">
                 <h4 class="preview__title">${title}</h4>
                 <p class="preview__publisher">${publisher}</p>
                 <div class="preview__user-generated">
                   <svg>
                     <use href="src/img/icons.svg#icon-user"></use>
                   </svg>
                 </div>
               </div>
             </a>
            </li>
             `
        }).join('')      
    }
}


export default new ResultsView()