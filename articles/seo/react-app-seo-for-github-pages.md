<!---
<title>React app SEO for Github pages</title>
<description>Here we are going to discuss how you can optimize SEO for your React app which is hosted in Github Pages.</description>
<keywords>SEO, React</keywords>
<author>Tapio Salonen</author>
--->
### React app SEO for Github pages

Pretty soon when I decided to create my blog platform using React there encountered a problem. How I can be sure that my app is SEO friendly and performs well in search engine results. Because React apps are single-page applications (SPA) therefore they suffer from poor SEO performance. This is because React apps work completely with pure JavaScript by default and search engine crawlers are well known for their weaknesses to crawl websites that contain a lot of JavaScript code. There are many different solutions to overcome these issues and I am going to cover ones that work for React apps hosted in Github Pages.

If you host your own React app in Github Pages, then you don't have a backend server for your app by default and therefore you are not able to use SEO technics like server-side rendering to your application. This was the case for my app so I needed to find a solution that works for me. I decided to create a multipage page application (MPA) alongside my React SPA app. My implementation was to create HTML pages for every existing URL path and when the pages were loaded on the client-side, then a user was redirected to the actual React app. I used the content of [this](https://github.com/rafgraph/spa-github-pages) repository to redirect users to the actual React app.

#### Titles and meta tags

There arose one problem in my app. How each of the pages of my app is shown on search engine results. According to [this](https://totheweb.com/learning_center/tool-test-google-title-meta-description-lengths/) website, not very well and the reason for that was the JavaScript. Titles and other meta information like descriptions of the page are gotten from the head tag of the HTML page and not by executing JavaScript and creating necessary tags with it. 

The basic structure of my app was that blog post contents are stored to [this](https://github.com/tsa-dom/contents) Github repository as markdown files and then the React app uses those files to render pages for users. On the top of each markdown file, I added a comment section where I stored all necessary metainformation.

```jsx
// I decided to use HTML like tags to determine all necessary meta information.
// Build scripts which are executed by Github Actions creates HTML pages using this information.
</!---
<title>React app SEO for Github pages</title>
<description>Here we are going to discuss how you can optimize SEO for you React app which is hosted in Github Pages.</description>
<keywords>SEO, React</keywords>
<author>Tapio Salonen</author>
---/>
// The blog post content...
```

I also added build scripts that extract the comment section of each markdown file and then generate HTML pages with titles and necessary meta-information based on them. I automated HTML page building with Github Actions and if there are any changes in the repository then those files are generated again. After the files are generated then they are automatically transferred to [here](https://github.com/tsa-dom/tsa-dom.github.io/tree/gh-pages). Now titles and descriptions should be shown properly on search engine results. I also added npm library [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) for changing meta information when the app is running and the URL path changes.

#### Noscript version

Even though I created MPA on top of SPA it's not enough. Search engine crawlers aren't great for indexing websites that rely on JavaScript especially if the website is not popular. That is the reason why I created a noscript version of the app. For getting benefits of the noscript version it should contain the same core functionality that the actual app contains. I also automated noscript version creation using especially [marked](https://www.npmjs.com/package/marked)-library for generating HTML within the build process.
