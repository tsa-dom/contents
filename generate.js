const fs = require('fs')
const { marked } = require('marked')
const groups = require('./tmp/groups.json')
const pages = require('./tmp/pages.json')

try {
  let data = fs.readFileSync(process.argv[2], 'utf8')
  const rx = new RegExp("<!---[\\d\\D]*?\--->")
  while (data.includes('<!---')) data = data.replace(rx, '')
  const html = marked.parse(data)
  if (process.argv[2].includes('./pages/')) {
    const file = process.argv[2].split('./pages/')[1].split('.md')[0]
    const page = pages.find(p => p.file === file)
    if (page) {
      const items = groups[page.group]
      let itemsHtml = ''
      items.sort((a, b) => a.priority - b.priority).forEach(item => {
        itemsHtml += `
        <div>
          <a href="https://tsa-dom.github.io/pages/${item.file}">${item.title}</a>
        </div>
        `
      })
      console.log(itemsHtml, html)
    } else console.log(html)
  } else console.log(html)
} catch (err) {
  console.log(err)
}
