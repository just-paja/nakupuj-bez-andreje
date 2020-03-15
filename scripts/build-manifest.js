const path = require("path");
const fs = require("fs");
const package = require("../package.json");
const mainIcon = "web-bez-andreje.png";
const manifest = {
  manifest_version: 2,
  name: "Web bez Andreje",
  description: package.description,
  version: package.version,
  browser_action: {
    default_icon: mainIcon
  },
  icons: {
    "16": mainIcon,
    "48": mainIcon,
    "128": mainIcon
  },
  permissions: ["*://*.kosik.cz/*", "*://kosik.cz/*"],
  content_scripts: [
    {
      matches: ["https://www.kosik.cz/*"],
      js: ["main.js"],
      run_at: "document_end"
    }
  ],
  web_accessible_resources: [mainIcon]
};

const rootPath = path.resolve(__dirname, "..");
const distPath = path.resolve(rootPath, "dist", "package");
const manifestPath = path.join(distPath, "manifest.json");
const mainIconSrc = path.join(rootPath, "icons", "web-bez-andreje.png");
const mainIconPath = path.join(distPath, mainIcon);

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
fs.copyFileSync(mainIconSrc, mainIconPath);
