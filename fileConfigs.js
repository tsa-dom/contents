const dirTree = require("directory-tree")
const blogTree = dirTree("./blog")
const pagesTree = dirTree("./html")
const files = []
const fs = require('fs')

const getPaths = (dir) => {
  if (dir.children) {
    for (child of dir.children) {
      getPaths(child)
    }
  } else {
    files.push(dir.path.split('.')[0])
  }
}

getPaths(blogTree)
getPaths(pagesTree)

fs.writeFile('./config/files.json', JSON.stringify(files), () => {})