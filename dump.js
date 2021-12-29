const blogs = require('./config/blogs.json')
const fs = require('fs')
const blog = {
  file: process.argv[2],
  title: process.argv[3],
  description: process.argv[4]
}

fs.writeFile('./config/blogs.json', JSON.stringify(Object(blogs).concat(blog)), err => console.log(err))
