const { configure, setConfig } = require('./config')

function storeCheckboxConfig (e) {
  const name = e.target.id
  const value = e.target.checked
  setConfig(name, value)
}

function connectInput (config, input) {
  const name = input.id
  input.checked = Boolean(config[name])
  input.addEventListener('change', storeCheckboxConfig)
}

function setupPopup (config) {
  const inputs = Array.prototype.slice.call(
    document.querySelectorAll('[type=checkbox]')
  )
  const any = inputs.some(input => config[input.id])
  for (const input of inputs) {
    connectInput(config, input)
  }

  const h1 = document.querySelector('h1')
  if (any) {
    h1.innerHTML = 'Nakupuješ bez Andreje'
    h1.style.backgroundColor = '#0f0'
  } else {
    h1.innerHTML = 'Nakupuješ s Andrejem'
    h1.style.backgroundColor = '#f00'
  }

  return () => {}
}

configure(setupPopup)
