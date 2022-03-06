// This script generates paths for all hosted files

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
    const path = dir.path.split('.html')[0].split('html/')
    if (path.length - 1) {
      files.push(`pages/${path[1]}`)
    } else {
      files.push(path[0])
    }
  }
}

getPaths(blogTree)
getPaths(pagesTree)
console.log(files)

fs.writeFile('./config/files.json', JSON.stringify(files), () => {})