require('dotenv').config()
const axios = require('axios')
const blog = require('../config/blog.json')
const pages = require('../config/pages.json')
const groups = Object(require('../config/groups.json'))
const resources = Object(require('../config/resources.json'))
const fs = require('fs').promises

const API_URL = 'https://api.github.com/repos/tsa-dom/contents/commits?path='
const HEADERS = { headers: { 'Authorization': `token ${process.env.API_TOKEN}` } }

// Users GitHub Api to fetch commits related to a specific file path
const getCommits = async (path) => (await axios.get(`${API_URL}${path}`, HEADERS)).data

const dump = async (data, fields) => {
  const commits = await getCommits(data.path)
  const sorted = commits
    .map(d => ({ 
      date: d.commit.author.date,
      user: d.committer.login,
      avatar_url: d.committer.avatar_url
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  data['created'] = new Date(sorted[sorted.length - 1].date).toISOString()
  data['modified'] = new Date(sorted[0].date).toISOString()
  const committers = []
  sorted.map(d => committers.find(c => c.user === d.user)
    ? undefined
    : d.user === 'web-flow' ? committers.push({
      user: 'tsa-dom',
      avatar_url: 'https://avatars.githubusercontent.com/tsa-dom'
    }) : committers.push({ user: d.user, avatar_url: d.avatar_url })
  )
  data['committers'] = committers
  
  const values = {}
  fields.map(f => values[f] = data[f])
  return values
}

// Dumps pages with specific data to repo
const dumpPages = async (data) => {
  if (!data.group) return
  const page = await dump(data, ['title', 'description', 'file', 'group', 'created', 'modified'])
  await fs.writeFile('./config/pages.json', JSON.stringify(Object(pages).concat(page)))

  const { name: title, priority, group, file } = data
  const fileConfig = { file, title, priority: Number(priority) }
  groups[group] ? groups[group].push(fileConfig) : groups[group] = [{ ...fileConfig }]
  await fs.writeFile('./config/groups.json', JSON.stringify(groups))
}

// Dumps blog posts with specific data to repo
const dumpBlog = async (data) => {
  const page = await dump(data, ['title', 'description', 'file', 'author', 'keywords', 'created', 'modified', 'committers'])
  await fs.writeFile('./config/blog.json', JSON.stringify(Object(blog).concat(page)))
  
  const { title, file } = data
  if (file.includes("/")) {
    const group = file.split("/")[0]
    const resource = { file, title }
    resources[group] ? resources[group].push(resource) : resources[group] = [{ ...resource }]
  }
  await fs.writeFile('./config/resources.json', JSON.stringify(resources))
}

module.exports = { dumpPages, dumpBlog }