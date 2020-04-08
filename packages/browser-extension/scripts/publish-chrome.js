const createWebstoreClient = require("chrome-webstore-upload");
const fs = require("fs");
const path = require("path");

const { archiveName } = require("../paths");

const webstore = createWebstoreClient({
  clientId: process.env.CHROME_API_CLIENT_ID,
  clientSecret: process.env.CHROME_API_CLIENT_SECRET,
  extensionId: process.env.CHROME_API_UUID,
  refreshToken: process.env.CHROME_API_REFRESH_TOKEN,
});

async function publishChromeExtension() {
  const archive = fs.createReadStream(
    path.resolve(__dirname, "..", "dist", archiveName)
  );
  const { itemError } = await webstore.uploadExisting(archive);
  if (itemError && itemError.length > 0) {
    for (const err in itemError) {
      console.error(err);
    }
    throw new Error("Failed to upload zip file");
  }
}

publishChromeExtension();
