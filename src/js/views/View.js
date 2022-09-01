import icons from 'url:../../img/icons.svg';

export default class View {
    _data  // data is the results from calling the api in the controller
   
    render(data){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

        this._data = data
        const markup = this._generateMarkup()
        //makes it so that whenever we add new html to the page the parent element always cleared
        this._clear()
        this._parentEl.insertAdjacentHTML('afterbegin', markup)
    }

    _clear(){
        this._parentEl.innerHTML = ''
    }

    renderSpinner = () => {
        const markup = `
             <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `
        this._clear()
        this._parentEl.insertAdjacentHTML('afterbegin', markup)
      }

    addHandlerRender = (handler) => {
      ['hashchange', 'load'].forEach((event) => window.addEventListener(event, handler))
    }

    renderError(message = this._errorMessage){
      const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
         </div>`

         this._clear()
         this._parentEl.insertAdjacentHTML('afterbegin', markup )
    }

    renderSuccess(message = this._messageSuccess){
      const markup = `
         <div class="message">
           <div>
             <svg>
               <use href="${icons}#icon-smile"></use>
             </svg>
           </div>
          <p>${message}</p>
       </div>`

       this._clear()
       this._parentEl.insertAdjacentHTML('afterbegin', markup )
    }
}

