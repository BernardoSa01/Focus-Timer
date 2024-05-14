// Criando os eventos da aplicação 
import state from './state.js'
import { controls } from "./elements.js";
import * as actions from './actions.js'
import * as el from './elements.js'
import { updateDisplay } from "./timer.js";

export function registerControls() {
  controls.addEventListener('click', function(event){
    const action = event.target.dataset.action
    if(typeof actions[action] != 'function') {
      return
    }

    actions[action]()
  })
}

export function setMinutes() {
  el.minutes.addEventListener('focus', function() {
    el.minutes.textContent = ''
  })

  // Validação para que o contador aceite apenas números 
  el.minutes.onkeypress = (event) => /\d/.test(event.key)

  // Criando evento para que sejam aceitos números somente até 60
  el.minutes.addEventListener('blur', (event) => {
    let time = event.currentTarget.textContent
    time = time > 60 ? 60 : time 

    state.minutes = time
    state.seconds = 0

    updateDisplay()
    el.minutes.removeAttribute('contenteditable')
  })
}