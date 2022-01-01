const axios = require('axios')
const blog = require('./config/blog.json')
const pages = require('./config/pages.json')
const groups = Object(require('./config/groups.json'))
const fs = require('fs')
require('dotenv').config()

const getCommit = async () => {
  const res = await axios.get(`https://api.github.com/repos/tsa-dom/contents/commits?path=${process.argv[6]}`, {
    headers: {
      'Authorization': `token ${process.env.API_TOKEN}`
    }
  })
  return res.data
}

const createFiles = async () => {
  const file = process.argv[2]

  if (["blog", "pages"].includes(file)) {
    const commit = await getCommit()
    const data = commit.map(d => d.commit.author).sort((a, b) => new Date(b.date) - new Date(a.date))
    const body = {
      file: process.argv[3],
      title: process.argv[4],
      description: process.argv[5],
      modified: new Date(data[0].date).toISOString(),
      created: new Date(data[data.length - 1].date).toISOString()
    }

    if (process.argv[2] === "blog") {
      const post = {
        keywords: process.argv[7],
        author: process.argv[8],
        ...body
      }
      fs.writeFile('./config/blog.json', JSON.stringify(Object(blog).concat(post)), () => {})
    }
    
    if (process.argv[2] === "pages") {
      const group = process.argv[8]
      if (group === "") return
      const file = {
        file: process.argv[3],
        title: process.argv[7]
      }
      const page = {
        group: process.argv[8],
        ...body
      }
      fs.writeFile('./config/pages.json', JSON.stringify(Object(pages).concat(page)), () => {})
      if (groups[group]) {
        groups[group].push(file)
      } else {
        groups[group] = [{ ...file }]
      }
      fs.writeFile('./config/groups.json', JSON.stringify(groups), () => {})
    }
  }  
}

createFiles()