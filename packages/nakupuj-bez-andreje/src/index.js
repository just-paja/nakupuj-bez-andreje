const agrofert = require("agrofert-list");

const brandList = agrofert.map(brand => brand.brandName.toLowerCase());

const replacementImageUrl =
  typeof chrome != "undefined"
    ? chrome.extension.getURL("web-bez-andreje.png")
    : safari.extension.baseURI + "web-bez-andreje.png";

function replaceRohlik() {
  // Autocomplete
  replaceImages("img.Whisperer_image");
  replaceImages(".whisperer-product__img img");

  // Catalog / Cart "Don't forget" / Cart "Help us save ..."
  replaceImages("img.productCard__img");

  // Favorites / Side cart
  replaceImages(
    "img.grocery-image-placeholder",
    "div.products-table__product",
    ".products-table__name"
  );

  // Side cart
  replaceImages("img.itemImage");

  // Cart - list of purchased items
  replaceImages("span img.image");

  // Detail
  replaceImages(
    "#productDetail .clickable div span img",
    "#productDetail",
    ".redirect_link.active"
  );
}

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

function replaceOnKosik(node) {
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

function initializeKosik() {
  console.log("initialize kosik");
  observeAll("body", () => {
    observeAll(".product-box", replaceOnKosik);
    observeAll(".basket__product__wrapper", replaceOnKosik);
  });
}

function initialize() {
  initializeKosik();
}

initialize();
