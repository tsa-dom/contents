const blogs = require('./config/blogs.json')
const fs = require('fs')

const data = JSON.parse(process.argv[7])
  .map(d => d.commit.author).sort((a, b) => new Date(b.date) - new Date(a.date))

const blog = {
  file: process.argv[2],
  title: process.argv[3],
  description: process.argv[4],
  keywords: process.argv[5],
  author: process.argv[6],
  modified: new Date(data[0].date).toISOString(),
  created: new Date(data[data.length - 1].date).toISOString()
}

fs.writeFile('./config/blogs.json', JSON.stringify(Object(blogs).concat(blog)), err => console.log(err))
