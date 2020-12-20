function getStorage () {
  return window.storage || chrome.storage
}

const configPath = 'config'
const defaultConfig = {
  replaceWithLogo: true
}

async function readConfig () {
  return new Promise(resolve =>
    getStorage(configPath).local.get(data =>
      resolve({ ...defaultConfig, ...(data || {}) })
    )
  )
}

async function setConfig (key, value) {
  return new Promise(async resolve =>
    getStorage(configPath).local.set(
      {
        ...(await readConfig()),
        [key]: value
      },
      resolve
    )
  )
}

async function initialize (onCreate) {
  return onCreate(await readConfig())
}

async function configure (onCreate) {
  let onDestroy = await initialize(onCreate)
  getStorage().onChanged.addListener(async () => {
    await onDestroy()
    onDestroy = await initialize(onCreate)
  })
}

module.exports = { configure, setConfig }
