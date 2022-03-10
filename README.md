# Contents

This repository contains the necessary files needed for my website to function.

# How to build files?
You need to install Node on your local machine to build files. Some build scripts don't function as expected if you are using Windows. You need to run the following commands at the root of the cloned repository:
```
$ npm install
$ bash build.bash
```

# File structure

## articles
Blog posts are stored here as markdown files. 

## assets
"Build scripts" are using Html pieces defined here to construct Html files.

## blog
Html files for blog posts.

## config
JSON format configurations.

## html
Html files for pages.

## images
Images used by blog posts.

## pages
Pages are stored here as markdown files. 

## scripts
Scripts for automating the Html files build process. Used to deliver files to gh-pages.
