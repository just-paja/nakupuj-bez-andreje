const agrofert = require("agrofert-list");

const brandList = agrofert.map(brand => brand.brandName.toLowerCase());
const mainIcon = "main.png";

const replacementImageUrl =
  typeof chrome != "undefined"
    ? chrome.extension.getURL(mainIcon)
    : safari.extension.baseURI + mainIcon;

function replaceElementImages(node) {
  const images = node.querySelectorAll("img");
  for (const image of images) {
    if (image.src !== replacementImageUrl) {
      image.src = replacementImageUrl;
    }
    if (image.srcset) {
      image.removeAttribute("srcset");
    }
  }
}

function replaceByTextContent(node) {
  if (containsBlacklistedBrand(node.textContent)) {
    replaceElementImages(node);
  }
}

function containsBlacklistedBrand(str) {
  const clean = str
    .trim()
    .replace(/[\s]+/g, " ")
    .toLowerCase();
  return brandList.some(brand => clean.includes(brand));
}

function throttle(callback, node) {
  let mutationTimeout = null;
  return function mutationCallback(mutationList) {
    const shouldAct = mutationList.some(
      mutation =>
        mutation.type === "attributes" || mutation.type === "childList"
    );
    if (shouldAct) {
      if (mutationTimeout) {
        clearTimeout(mutationTimeout);
        mutationTimeout = null;
      }
      mutationTimeout = setTimeout(function() {
        callback(node);
      }, 500);
    }
  };
}

let observedNodes = [];

function observe(node, callback) {
  if (!observedNodes.includes(node)) {
    observedNodes.push(node);
    const observer = new MutationObserver(throttle(callback, node));
    observer.observe(node, {
      attributes: true,
      childList: true,
      subtree: true
    });
    callback(node);
  }
}

function observeAll(selector, callback) {
  return Array.prototype.map.call(document.querySelectorAll(selector), node =>
    observe(node, callback)
  );
}

function setupKosik() {
  if (document.location.href.includes("kosik")) {
    observeAll("body", () => {
      observeAll(".product-box", replaceByTextContent);
      observeAll(".basket__product__wrapper", replaceByTextContent);
    });
  }
}

function setupRohlik() {
  if (document.location.href.includes("rohlik")) {
    observeAll("body", () => {
      observeAll(".productCard__wrapper", replaceByTextContent);
    });
  }
}

function initialize() {
  setupKosik();
  setupRohlik();
}

initialize();
