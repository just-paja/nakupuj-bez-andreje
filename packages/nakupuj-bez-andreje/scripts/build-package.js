const fs = require("fs");
const ChromeExtension = require("crx");
const package = require("../package.json");
const path = require("path");
const webpack = require("../webpack.config.js");

const sourcesPath = webpack.output.path;
const distPath = path.resolve(sourcesPath, "..");
const packagePath = path.join(distPath, `${package.name}.ctx`);

async function createPackage() {
  const crx = new ChromeExtension({
    codebase: "http://localhost:8000/web-bez-andreje.crx",
    privateKey: fs.readFileSync(
      path.resolve(__dirname, "..", "..", "web-bez-andreje.pem")
    )
  });
  await crx.load(sourcesPath);
  const buffer = await crx.pack();
  process.stderr.write(`Creating package in ${packagePath}\n`);
  fs.writeFileSync(packagePath, buffer);
}

createPackage().catch(e => {
  console.error(e);
  process.exit(255);
});
