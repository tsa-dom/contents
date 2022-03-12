// This script generates paths for all hosted files

const dirTree = require("directory-tree")
const blogTree = dirTree("./blog")
const pagesTree = dirTree("./html")
const fs = require('fs')

// Iterates trough dir tree and dumps file paths to config file
const getPaths = (dir, files) => {
  if (dir.children) for (child of dir.children) getPaths(child, files)
  else {
    const path = dir.path.split('.html')[0].split('html/')
    path.length - 1 ? files.push(`pages/${path[1]}`) : files.push(path[0])
  }
}

const files = []
getPaths(blogTree, files)
getPaths(pagesTree, files)

fs.writeFile('./config/files.json', JSON.stringify(files), () => {})

module.exports = { getPaths }