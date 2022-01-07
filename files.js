const fs = require('fs')
const blog = require('./config/blog.json')

const generateBlogContainer = () => {
  let html = ''
  for (post of blog) {
    html = html + `
      <div>
        <strong>${post.title}</strong>
        <div>${post.description}</div>
        <a href="https://tsa-dom.github.io/blog/${post.file}">Read</a>
        <hr>
      </div>
  `
  }
  return html
}

const blogContainer = generateBlogContainer()

const indexFile = `
<!DOCTYPE html>

<html>
  <head>
      <title></title>
    </head>
  <body>
    <noscript>
      <div id="menu-nav">
        <a class="menu-link" href="https://tsa-dom.github.io">Home</a>
        <a class="menu-link" href="https://tsa-dom.github.io/blog">Blog</a>
        <a class="menu-link" href="https://tsa-dom.github.io/pages/contributors">Contributors</a>
      </div>
      <div id="container">
        ${blogContainer}
      </div>
  
      <div id="footer">
        <img id="footer-img" src="https://raw.githubusercontent.com/tsa-dom/contents/main/images/noscriptnotification.png"> </img>
      </div>
      <style>
        #container {
          margin: auto;
          max-width: 700px;
          font-size: 30px;
          margin-top: 30px;
          max-height: 75vh;
          overflow: auto;
        }
        body {
          margin: 0;
          font-family: sans-serif;
        }
        #menu-nav {
          width: 100%;
          min-height: 50px;
          background-color: black;
          color: white;
          text-align: center;
          font-size: 30px;
          padding-top: 10px;
        }
        .menu-link {
          padding: 20px;
          color: white !important;
        }
        .menu-link:hover {
          color: grey !important
        }
        #footer {
          bottom: 0;
          position: absolute;
          font-size: 30px;
          margin: 20px;
          color: red;
          font-weight: bold;
        }
        #footer-img {
          width: 100%;
        }
      </style>
    </noscript>
  </body>
</html>
`

fs.writeFile('./blog/index.html', indexFile, (err) => console.log(err))