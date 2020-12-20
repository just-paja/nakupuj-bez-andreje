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
  const inputs = document.querySelectorAll('[type=checkbox]')
  for (const input of inputs) {
    connectInput(config, input)
  }

  return () => {}
}

configure(setupPopup)
