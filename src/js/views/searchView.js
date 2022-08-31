
class SearchView {
   #parentEl =  document.querySelector('.search')
   
   getQuery() {
      return this.#parentEl.querySelector('.search__field').value
   }

   clear(){
      this.#parentEl.querySelector('.search__field').value = ''
   }

   addHandlerSearch = (handler) => {
      return this.#parentEl.addEventListener('submit', (e) => {
            e.preventDefault()   //didn't call the handler directly in call back because the submit event requires prevent default
            handler()
       })
   }


//   #generateMarkup

}


export default new SearchView()