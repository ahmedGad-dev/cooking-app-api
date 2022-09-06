import View from "./View";



class AddRecipeView extends View {
    _parentEl = document.querySelector('.upload')
    
    _window =  document.querySelector('.add-recipe-window') 
    _overlay = document.querySelector('.overlay')

    _openBtn = document.querySelector('.nav__btn--add-recipe')
    _closeBtn = document.querySelector('.btn--close-modal')


    _errorMessage = 'No Recipes bookmarked yet, please add your favourite ones'   
    _messageSuccess = 'Recipe was successfully uploaded'

    constructor(){
        super()
        this._addHandlerShowWindow()
        this._addHandlerHideWindow()
    }

    toggleWindowOverlay = () => {
      this._overlay.classList.toggle('hidden')
      this._window.classList.toggle('hidden')
    }

    _addHandlerShowWindow = () => {
       this._openBtn.addEventListener('click', this.toggleWindowOverlay.bind(this))  
    }

    _addHandlerHideWindow = () => {
        this._closeBtn.addEventListener('click', this.toggleWindowOverlay.bind(this))
        this._overlay.addEventListener('click', this.toggleWindowOverlay.bind(this))
    }

    addHandlerUpload = (handler) => {
        this._parentEl.addEventListener('submit', (e) => {
            e.preventDefault()
            const formInfo = new FormData(this._parentEl) //this will            
            const dataArray = [...formInfo] // will result an array of strings with all the form data
            const data = Object.fromEntries(dataArray) //opposite of Array.entries it takes an array and create an object from it
            handler(data)
        })
    }

    _generateMarkup(){}
  }

export default new AddRecipeView()