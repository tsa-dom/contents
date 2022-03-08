// This script generates paths for all hosted files

const dirTree = require("directory-tree")
const blogTree = dirTree("./blog")
const pagesTree = dirTree("./html")
const files = []
const fs = require('fs')

// Iterates trough dir tree and dumps file paths to config file
const getPaths = (dir) => {
  if (dir.children) for (child of dir.children) getPaths(child)
  else {
    const path = dir.path.split('.html')[0].split('html/')
    path.length - 1 ? files.push(`pages/${path[1]}`) : files.push(path[0])
  }
}

getPaths(blogTree)
getPaths(pagesTree)

fs.writeFile('./config/files.json', JSON.stringify(files), () => {})