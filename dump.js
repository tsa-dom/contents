const blogs = require('./config/blogs.json')
const fs = require('fs')

const data = JSON.parse(process.argv[7])

const blog = {
  file: process.argv[2],
  title: process.argv[3],
  description: process.argv[4],
  keywords: process.argv[5],
  author: process.argv[6],
  modified: new Date(data[0]["commit"]["author"]["date"]).toISOString()
}

fs.writeFile('./config/blogs.json', JSON.stringify(Object(blogs).concat(blog)), err => console.log(err))
