const path = require("path");

const { archiveName } = require("../paths");
const { cmd } = require("web-ext").default;

async function publishFirefoxExtension() {
  try {
    const res = await cmd.sign({
      apiKey: process.env.FIREFOX_API_KEY,
      apiSecret: process.env.FIREFOX_API_SECRET,
      artifactsDir: path.resolve(__dirname, "..", "dist"),
      channel: "listed",
      id: process.env.FIREFOX_API_UUID,
      sourceDir: path.resolve(__dirname, "..", "dist", "package"),
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

publishFirefoxExtension();
