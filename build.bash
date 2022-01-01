rm -rf blog
rm -rf html
rm -rf config
mkdir blog
mkdir html
mkdir config

cd config
echo "[]" > blog.json
echo "[]" > pages.json
cd ..

for file in ./articles/*
do
  v1='<!---'; v2='--->'
  headers=$(eval sed -n '/$v1/,/$v2/p' $file)
  title="$(echo $headers | grep -o -P '(?<=<title>).*(?=</title>)')"
  description="$(echo $headers | grep -o -P '(?<=<description>).*(?=</description>)')"
  keywords="$(echo $headers | grep -o -P '(?<=<keywords>).*(?=</keywords>)')"
  author="$(echo $headers | grep -o -P '(?<=<author>).*(?=</author>)')"

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

  name="$(echo $file | grep -o -P '(?<=./articles/).*(?=.md)').html"
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
  </body>
</html>
EOF
)
  cd blog
  echo "$start$html$end" > $name
  cd ..

  fileName="$(echo $file | grep -o -P '(?<=./articles/).*(?=.md)')"
  commit=$(curl -s "https://api.github.com/repos/tsa-dom/contents/commits?path=$file")

  node dump.js "blog" "$fileName" "$title" "$description" "$commit" "$keywords" "$author"
done

# Yeah I know, this is copy paste but I see this as a technical debt.
for file in ./pages/*
do
  v1='<!---'; v2='--->'
  headers=$(eval sed -n '/$v1/,/$v2/p' $file)
  title="$(echo $headers | grep -o -P '(?<=<title>).*(?=</title>)')"
  description="$(echo $headers | grep -o -P '(?<=<description>).*(?=</description>)')"
  
  html=$(cat << EOF

    <title>$title</title>
    <meta
      name="description"
      content="$description"
      data-rh="true"
    />
EOF
)

  name="$(echo $file | grep -o -P '(?<=./pages/).*(?=.md)').html"
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
  </body>
</html>
EOF
)
  cd html
  echo "$start$html$end" > $name
  cd ..

  fileName="$(echo $file | grep -o -P '(?<=./pages/).*(?=.md)')"
  commit=$(curl -s "https://api.github.com/repos/tsa-dom/contents/commits?path=$file")
  group="$(echo $headers | grep -o -P '(?<=<group>).*(?=</group>)')"

  node dump.js "pages" "$fileName" "$title" "$description" "$commit" "$group"
done
