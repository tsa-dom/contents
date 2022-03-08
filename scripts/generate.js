const fs = require('fs').promises
const { marked } = require('marked')
const groups = require('../tmp/groups.json')
const pages = require('../tmp/pages.json')

const mdToHtml = async (path) => {
  try {
    let data = await fs.readFile(path, 'utf-8')
    const rx = new RegExp("<!---[\\d\\D]*?\--->")
    while (data.includes('<!---')) data = data.replace(rx, '')
    const html = marked.parse(data)
    if (path.includes('./pages/')) {
      const file = path.split('./pages/')[1].split('.md')[0]
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
        return `${itemsHtml}${html}`
      } return html
    } else html
  } catch (err) { return undefined }
}

module.exports = { mdToHtml }