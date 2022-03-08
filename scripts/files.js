const fs = require('fs').promises
const blog = require('../config/blog.json')

// Generates an index file used to list blogs
const writeBlogIndexFile = async () => {
  const head = await fs.readFile('./assets/articles/index-head.txt', 'utf-8')
  const footer = await fs.readFile('./assets/articles/index-footer.txt', 'utf-8')
  let data = ''
  for (post of blog) {
    if (post.file.includes('test')) continue
    data += `
      <div>
        <strong>${post.title}</strong>
        <div>${post.description}</div>
        <a href="https://tsa-dom.github.io/blog/${post.file}">Read</a>
        <hr>
      </div>
  `
  }
  const indexFile = `${head}${data}${footer}`
  await fs.writeFile('./blog/index.html', indexFile)
}

writeBlogIndexFile()