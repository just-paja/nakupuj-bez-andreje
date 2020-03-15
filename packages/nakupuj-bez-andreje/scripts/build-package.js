const config = require("dotenv").config();
const fs = require("fs");
const ChromeExtension = require("crx");
const package = require("../package.json");
const path = require("path");
const webpack = require("../webpack.config.js");

const mainIcon = "main.png";

const rootPath = path.resolve(__dirname, "..");
const mainIconSrc = path.join(rootPath, "icons", mainIcon);
const bundlePath = webpack.output.path;
const distPath = path.resolve(bundlePath, "..");
const packagePath = path.join(distPath, `${package.name}.ctx`);
const manifestPath = path.join(bundlePath, "manifest.json");
const mainIconPath = path.join(bundlePath, mainIcon);

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
  permissions: [
    "*://*.kosik.cz/*",
    "*://*.rohlik.cz/*",
    "*://kosik.cz/*",
    "*://rohlik.cz/*"
  ],
  content_scripts: [
    {
      matches: ["https://www.kosik.cz/*", "https://www.rohlik.cz/*"],
      js: ["main.js"],
      run_at: "document_end"
    }
  ],
  web_accessible_resources: [mainIcon]
};

function createManifest() {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  fs.copyFileSync(mainIconSrc, mainIconPath);
}

async function createPackage() {
  const crx = new ChromeExtension({
    privateKey: process.env.PACKAGE_KEY
  });
  await crx.load(bundlePath);
  const buffer = await crx.pack();
  process.stderr.write(`Creating package in ${packagePath}\n`);
  fs.writeFileSync(packagePath, buffer);
}

createManifest();
createPackage().catch(e => {
  console.error(e);
  process.exit(255);
});
