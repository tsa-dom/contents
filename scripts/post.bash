file=$1
v1='<!---'; v2='--->'
headers=$(eval sed -n '/$v1/,/$v2/p' $file)
title="$(echo $headers | grep -o -P '(?<=<title>).*(?=</title>)')"
description="$(echo $headers | grep -o -P '(?<=<description>).*(?=</description>)')"
keywords="$(echo $headers | grep -o -P '(?<=<keywords>).*(?=</keywords>)')"
author="$(echo $headers | grep -o -P '(?<=<author>).*(?=</author>)')"
fileName="$(echo $file | grep -o -P '(?<=./articles/).*(?=.md)')"

html=$(cat << EOF

    <title>$title</title>
    <meta
      name="description"
      content="$description"
      data-rh="true"
    />
    <meta
      name="keywords"
      content="$keywords"
    >
    <meta
      name="author"
      content="$author"
    >
EOF
)
echo $file
name="$(echo $file | grep -o -P '(?<=./articles/).*(?=.md)').html"
generated=$(eval node generate.js $file)
start=$(cat << EOF
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
EOF
)
end=$(cat << EOF

    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script takes the current url and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new url with only a query string and hash fragment,
      // e.g. https://www.foo.tld/one/two?a=b&c=d#qwe, becomes
      // https://www.foo.tld/?/one/two&a=b~and~c=d#qwe
      // Note: this 404.html file must be at least 512 bytes for it to work
      // with Internet Explorer (it is currently > 512 bytes)

      // If you're creating a Project Pages site and NOT using a custom domain,
      // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
      // This way the code will only replace the route part of the path, and not
      // the real directory in which the app resides, for example:
      // https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
      // https://username.github.io/repo-name/?/one/two&a=b~and~c=d#qwe
      // Otherwise, leave pathSegmentsToKeep as 0.
      var pathSegmentsToKeep = 1;

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );

    </script>
  </head>
  <body>
    <noscript>
      <div id="menu-nav">
        <a class="menu-link" href="https://tsa-dom.github.io">Home</a>
        <a class="menu-link" href="https://tsa-dom.github.io/blog">Blog</a>
        <a class="menu-link" href="https://tsa-dom.github.io/pages/contributors">Contributors</a>
      </div>
      <div id="container">
        $generated
      </div>
      <style>
        #container {
          margin: auto;
          max-width: 700px;
          font-size: 20px;
          margin-top: 30px;
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
      </style>
    </noscript>
  </body>
</html>
EOF
)

cd $2
if [[ $3 != "" ]]
then
  cd $3

  cd ..
fi
echo "$start$html$end" > $name
cd ..

if [[ $3 != "" ]]
then
  node dump.js "blog/"$3 "$fileName" "$title" "$description" "$file" "$keywords" "$author"
else
  node dump.js "blog" "$fileName" "$title" "$description" "$file" "$keywords" "$author"
fi