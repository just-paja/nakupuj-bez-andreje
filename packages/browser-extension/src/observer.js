function throttle (node, callback) {
  let mutationTimeout = null
  return function mutationCallback (mutationList) {
    const shouldAct = mutationList.some(
      mutation =>
        mutation.type === 'attributes' || mutation.type === 'childList'
    )
    if (shouldAct) {
      if (mutationTimeout) {
        clearTimeout(mutationTimeout)
        mutationTimeout = null
      }
      mutationTimeout = setTimeout(function () {
        callback(node)
      }, 500)
    }
  }
}

let observedNodes = []
let observers = []

function observeNode (node, callback) {
  const matchingNode = observedNodes.find(n => n === node)
  if (!matchingNode) {
    observedNodes.push(node)
    const observer = new MutationObserver(throttle(node, callback))
    observers.push(observer)
    observer.observe(node, {
      attributes: true,
      childList: true,
      subtree: true
    })
    callback(node)
  }
}

function observe (selector, callback) {
  return Array.prototype.map.call(document.querySelectorAll(selector), node =>
    observeNode(node, callback)
  )
}

function clearObservers () {
  observers.forEach(observer => observer.disconnect())
  observers = []
  observedNodes = []
}

module.exports = {
  clearObservers,
  observe
}
