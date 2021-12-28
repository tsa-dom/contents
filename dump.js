const blogs = require('./config/blogs.json')
const fs = require('fs')
const blog = {
  title: process.argv[2],
  description: process.argv[3]
}

fs.writeFile('./config/blogs.json', JSON.stringify(Object(blogs).concat(blog)), err => console.log(err))
