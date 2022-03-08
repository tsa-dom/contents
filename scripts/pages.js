const { dumpPages, dumpBlog } = require('./dump')
const { mdToHtml } = require('./generate')
const fs = require('fs').promises
const path = process.argv[2]
console.log(path)

const getValue = (head, field) => head.includes(`<${field}>`) ? head.split(`<${field}>`)[1].split(`</${field}>`)[0] : undefined

const getData = async () => {
  const file = await fs.readFile(path, 'utf-8')
  const head = file.split('<!---')[1].split('--->')[0]
  const title = getValue(head, 'title')
  const description = getValue(head, 'description')
  const group = getValue(head, 'group')
  const name = getValue(head, 'name')
  const priority = getValue(head, 'priority')
  const author = getValue(head, 'author')
  const keywords = getValue(head, 'keywords')

  return { title, description, group, name, priority, path, author, keywords }
}

const generatePageContent = (data) => {
  const { title, description } = data
  return `
    <title>${title}</title>
    <meta
      name="description"
      content="${description}"
      data-rh="true"
    />
    <link rel="icon" href="%PUBLIC_URL%/../favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="google-site-verification" content="sGo3V_g8qjmhW-tRL3VFR4q_sFXWointhBROBAAZpNw" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/../logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/../manifest.json" />
  `
}

const generatePageHtml = async () => {
  const fileName = path.split('/')[path.split('/').length - 1].split('.')[0]
  const data = await getData()
  const head = await fs.readFile('./assets/pages/head.txt', 'utf-8')
  const footerStart = await fs.readFile('./assets/pages/footer-start.txt', 'utf-8')
  const footerEnd = await fs.readFile('./assets/pages/footer-end.txt', 'utf-8')
  const content = generatePageContent(data)
  const generated = await mdToHtml(path)
  const html = `${head}${content}${footerStart}${generated}${footerEnd}`
  await fs.writeFile(`./html/${fileName}.html`, html)
  await dumpPages(fileName, data)
}

const generateBlogContent = (data) => {
  const { title, description, author, keywords } = data
  
  return `
    <title>${title}</title>
    <meta
      name="description"
      content="${description}"
      data-rh="true"
    />
    <meta
      name="keywords"
      content="${keywords}"
    >
    <meta
      name="author"
      content="${author}"
    >
    <link rel="icon" href="%PUBLIC_URL%/../favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="google-site-verification" content="sGo3V_g8qjmhW-tRL3VFR4q_sFXWointhBROBAAZpNw" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/../logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/../manifest.json" />
  `
}

const generateBlogHtml = async () => {
  const fileName = path.split('./articles/')[1].split('.')[0]
  const data = await getData()
  const head = await fs.readFile('./assets/blog/head.txt')
  const footerStart = await fs.readFile('./assets/blog/footer-start.txt', 'utf-8')
  const footerEnd = await fs.readFile('./assets/blog/footer-end.txt', 'utf-8')
  const content = generateBlogContent(data)
  const generated = await mdToHtml(path)
  const html = `${head}${content}${footerStart}${generated}${footerEnd}`
  await fs.writeFile(path.replace('/articles', '/blog').replace('.md', '.html'), html)
  await dumpBlog(fileName, data)
}

if (path.includes('articles')) {
  generateBlogHtml()
} else if (path.includes('pages')) {
  generatePageHtml()
}