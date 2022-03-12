const { dumpPages, dumpBlog } = require('./dump')
const { mdToHtml } = require('./generate')
const fs = require('fs').promises
const path = process.argv[2]
const test = process.argv[3]

const fields = ['title', 'description', 'group', 'name', 'priority', 'author', 'keywords']
const meta = ['title', 'description', 'author', 'keywords']

const getData = async (dir) => {
  const file = await fs.readFile(path, 'utf-8')
  const head = file.split('<!---')[1].split('--->')[0]
  const fileName = path.split(`./${dir}/`)[1].split('.')[0]
  const data = { path, file: fileName }
  fields.map(f => data[f] = head.includes(`<${f}>`) ? head.split(`<${f}>`)[1].split(`</${f}>`)[0] : undefined)
  return data
}

const generateContent = (data) => {
  let content = ''
  for (let d in data) {
    if (!data[d] || !meta.includes(d)) continue
    content += d === 'title' 
      ? `\t\t<title>${data[d]}</title>`
      : `\n\t\t\<meta\n\t\t\tname="${d}"\n\t\t\tcontent="${data[d]}"\n\t\t>`
  }
  return content
}

const generateHtml = async (dir, target) => {
  const data = await getData(dir)
  const head = await fs.readFile(`./assets/${dir}/head.txt`, 'utf-8')
  const footerStart = await fs.readFile(`./assets/${dir}/footer-start.txt`, 'utf-8')
  const footerEnd = await fs.readFile(`./assets/${dir}/footer-end.txt`, 'utf-8')
  const tags = await fs.readFile('./assets/tags.txt', 'utf-8')
  const content = generateContent(data)
  const generated = await mdToHtml(path)
  const html = `${head}${content}${tags}${footerStart}${generated}${footerEnd}`
  await fs.writeFile(path.replace(`./${dir}`, `./${target}`).replace('.md', '.html'), html)
  if (dir === 'articles') await dumpBlog(data)
  else if (dir === 'pages') await dumpPages(data)
}

if (!path || test) undefined
else if (path.includes('./articles')) generateHtml('articles', 'blog')
else if (path.includes('./pages')) generateHtml('pages', 'html')

module.exports = { getData, generateContent, generateHtml }