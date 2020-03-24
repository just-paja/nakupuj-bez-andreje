const agrofert = require("agrofert-list");

function escapeRegexp(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

const brandList = agrofert.map((brand) => ({
  company: brand.name,
  name: brand.brandName,
  pattern: new RegExp(
    `(\\s|^)${escapeRegexp(brand.brandName.toLowerCase())}(\\s|$)`
  ),
}));

const mainIcon = "main.png";

function getReplacementUrl() {
  if (typeof chrome !== "undefined") {
    return chrome.extension.getURL(mainIcon);
  }
  if (typeof safari !== "undefined") {
    return `${safari.extension.baseURI}${mainIcon}`;
  }
  return mainIcon;
}

const replacementImageUrl = getReplacementUrl();

function getReplacementTitle(brand) {
  return `Product blacklisted because it matches: "${brand.name}" of "${brand.company}"`;
}

function replaceElementImages(node, matchingBrand) {
  const images = node.querySelectorAll("img");
  const matchTitle = getReplacementTitle(matchingBrand);
  for (const image of images) {
    if (image.src !== replacementImageUrl) {
      image.src = replacementImageUrl;
    }
    if (image.title !== matchTitle) {
      image.title = matchTitle;
    }
    if (image.srcset) {
      image.removeAttribute("srcset");
    }
  }
}

function matchBlacklistedBrand(str) {
  const clean = str.replace(/[\s]+/g, " ").trim().toLowerCase();
  return brandList.find((brand) => brand.pattern.test(clean)) || null;
}

function replaceByTextContent(textSource, contentWrapper) {
  const brand = matchBlacklistedBrand(textSource.textContent);
  if (brand) {
    replaceElementImages(contentWrapper || textSource, brand);
  }
}

function throttle(callback, node) {
  let mutationTimeout = null;
  return function mutationCallback(mutationList) {
    const shouldAct = mutationList.some(
      (mutation) =>
        mutation.type === "attributes" || mutation.type === "childList"
    );
    if (shouldAct) {
      if (mutationTimeout) {
        clearTimeout(mutationTimeout);
        mutationTimeout = null;
      }
      mutationTimeout = setTimeout(function () {
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
      subtree: true,
    });
    callback(node);
  }
}

function observeAll(selector, callback) {
  return Array.prototype.map.call(document.querySelectorAll(selector), (node) =>
    observe(node, callback)
  );
}

function setupKosik() {
  if (document.location.href.includes("kosik")) {
    observeAll("body", () => {
      observeAll(".product-box", replaceByTextContent);
      observeAll(".product-detail", replaceByTextContent);
      observeAll(".product-item", replaceByTextContent);
      observeAll(".basket__product__wrapper", replaceByTextContent);
    });
  }
}

function setupRohlik() {
  if (document.location.href.includes("rohlik")) {
    function replaceByRohlikContent(selector) {
      return function replaceOnRohlik(node) {
        const textSource = node.querySelector(selector);
        if (textSource) {
          replaceByTextContent(textSource, node);
        }
      };
    }
    observeAll("body", () => {
      observeAll(".productCard__wrapper", replaceByRohlikContent("h4"));
      observeAll("#productDetail > div", replaceByRohlikContent("h2"));
    });
  }
}

function initialize() {
  setupKosik();
  setupRohlik();
}

module.exports = {
  initialize,
  matchBlacklistedBrand,
};
