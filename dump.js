const axios = require('axios')
const blog = require('./config/blog.json')
const pages = require('./config/pages.json')
const groups = Object(require('./config/groups.json'))
const resources = Object(require('./config/resources.json'))
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
  const fileName = process.argv[3]
  const title = process.argv[4]

  const commit = await getCommit()
  const data = commit.map(d => d.commit.author).sort((a, b) => new Date(b.date) - new Date(a.date))
  const body = {
    file: fileName,
    title,
    description: process.argv[5],
    modified: new Date(data[0].date).toISOString(),
    created: new Date(data[data.length - 1].date).toISOString()
  }

  if (file.includes('blog')) {
    const post = {
      keywords: process.argv[7],
      author: process.argv[8],
      ...body
    }
    fs.writeFile('./config/blog.json', JSON.stringify(Object(blog).concat(post)), () => {})
    if (fileName.includes("/")) {
      const group = fileName.split("/")[0]
      const resource = {
        file: fileName,
        title
      }
      if (resources[group]) {
        resources[group].push(resource)
      } else {
        resources[group] = [{ ...resource }]
      }
    }
    fs.writeFile('./config/resources.json', JSON.stringify(resources), () => {})
  }
  
  if (file === "pages") {
    const group = process.argv[8]
    if (group === "") return
    const file = {
      file: process.argv[3],
      title: process.argv[7],
      priority: Number(process.argv[9])
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

createFiles()