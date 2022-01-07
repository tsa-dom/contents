const fs = require('fs')
const { marked } = require('marked')

try {
  let data = fs.readFileSync(process.argv[2], 'utf8')
  const rx = new RegExp("<!---[\\d\\D]*?\--->")
  while (data.includes('<!---')) data = data.replace(rx, '')
  const html = marked.parse(data)
  console.log(html)
} catch (err) {
  console.log("BUILD SCRIPTS FAILED TO CREATE THIS PAGE")
}
