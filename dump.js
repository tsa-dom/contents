const blog = require('./config/blog.json')
const pages = require('./config/pages.json')
const fs = require('fs')

const data = JSON.parse(process.argv[6])
  .map(d => d.commit.author).sort((a, b) => new Date(b.date) - new Date(a.date))

const body = {
  file: process.argv[3],
  title: process.argv[4],
  description: process.argv[5],
  modified: new Date(data[0].date).toISOString(),
  created: new Date(data[data.length - 1].date).toISOString()
}

const post = {
  keywords: process.argv[7],
  author: process.argv[8],
  ...body
}
const page = {
  group: process.argv[7].replaceAll('-', ' '),
  ...body
}

if (process.argv[2] === "blog") {
  fs.writeFile('./config/blog.json', JSON.stringify(Object(blog).concat(post)), err => console.log(err))
} else if (process.argv[2] === "pages") {
  fs.writeFile('./config/pages.json', JSON.stringify(Object(pages).concat(page)), err => console.log(err))
}
