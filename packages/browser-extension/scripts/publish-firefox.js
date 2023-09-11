const path = require('path')

const { cmd } = require('web-ext')

async function publishFirefoxExtension () {
  try {
    const res = await cmd.sign({
      apiKey: process.env.FIREFOX_API_KEY,
      apiSecret: process.env.FIREFOX_API_SECRET,
      artifactsDir: path.resolve(__dirname, '..', 'dist'),
      channel: 'listed',
      id: process.env.FIREFOX_API_UUID,
      sourceDir: path.resolve(__dirname, '..', 'dist', 'package')
    })
    // rome-ignore lint/nursery/noConsoleLog: Printing response is good enough
    console.log(res)
  } catch (e) {
    if (e.message === 'The extension could not be signed') {
      // rome-ignore lint/nursery/noConsoleLog: Printing using console is good enough 
      console.log(
        'The extension could not be signed, but it was probably published. Please see the logs. Firefox API is not really clear about this.'
      )
    } else {
      console.error(e)
      process.exit(1)
    }
  }
}

publishFirefoxExtension()
