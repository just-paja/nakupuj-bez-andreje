const { archiveName } = require("../paths");

const config = require("dotenv").config();
const fs = require("fs");
const ChromeExtension = require("crx");
const package = require("../package.json");
const path = require("path");
const webpack = require("../webpack.config.js");
const archiver = require("archiver");
const Jimp = require("jimp");

const mainIconName = "web-bez-andreje";
const iconSizes = [16, 48, 128];

const mainIcon = `${mainIconName}.png`;
const mainIcon16 = `${mainIconName}-16.png`;
const mainIcon48 = `${mainIconName}-48.png`;
const mainIcon128 = `${mainIconName}-128.png`;

const rootPath = path.resolve(__dirname, "..");
const mainIconSrc = path.join(rootPath, "icons", "main.png");
const bundlePath = webpack.output.path;
const distPath = path.resolve(bundlePath, "..");
const packagePath = path.join(distPath, `${archiveName}.crx`);
const zipPath = path.join(distPath, `${archiveName}.zip`);
const manifestPath = path.join(bundlePath, "manifest.json");
const mainIconPath = path.join(bundlePath, mainIcon);

let icons = {};

function createManifest() {
  const manifest = {
    manifest_version: 2,
    name: "Nakupuj bez Andreje",
    description: package.description,
    version: package.version,
    browser_action: {
      default_icon: mainIcon,
    },
    icons,
    permissions: [
      "*://*.itesco.cz/*",
      "*://itesco.cz/*",
      "*://*.kosik.cz/*",
      "*://kosik.cz/*",
      "*://*.rohlik.cz/*",
      "*://rohlik.cz/*",
    ],
    content_scripts: [
      {
        matches: [
          "https://www.kosik.cz/*",
          "https://www.rohlik.cz/*",
          "https://nakup.itesco.cz/*",
        ],
        js: ["main.js"],
        run_at: "document_end",
      },
    ],
    web_accessible_resources: [mainIcon],
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  fs.copyFileSync(mainIconSrc, mainIconPath);
}

async function createIcons() {
  for (size of iconSizes) {
    const jimp = await Jimp.read(mainIconSrc);
    const iconName = `${mainIconName}-${size}.png`;
    jimp.resize(size, size).quality(99).write(path.join(bundlePath, iconName));
    icons[size] = iconName;
  }
}

async function createPackage() {
  const crx = new ChromeExtension({
    privateKey: process.env.PACKAGE_KEY,
  });
  await crx.load(bundlePath);
  const buffer = await crx.pack();
  fs.writeFileSync(packagePath, buffer);
  process.stderr.write(`Created package in ${packagePath}\n`);
}

async function createZip() {
  const archive = archiver("zip");
  const output = fs.createWriteStream(zipPath);

  await new Promise((resolve, reject) => {
    output.on("close", resolve);
    output.on("error", reject);
    archive.directory(bundlePath, false);
    archive.pipe(output);
    archive.finalize();
  });
  process.stderr.write(`Created package in ${zipPath}\n`);
}

async function compile() {
  await createIcons();
  createManifest();
  await createZip();
}

compile().catch((e) => {
  console.error(e);
  process.exit(255);
});
