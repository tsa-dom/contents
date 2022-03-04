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
  echo $file
  name="$(echo $file | grep -o -P '(?<=./pages/).*(?=.md)').html"
  generated=$(eval node generate.js $file)
  start=$(cat << EOF
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
EOF
)
  end=$(cat << EOF

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
  cd html
  echo "$start$html$end" > $name
  cd ..

  fileName="$(echo $file | grep -o -P '(?<=./pages/).*(?=.md)')"
  
  group="$(echo $headers | grep -o -P '(?<=<group>).*(?=</group>)')"
  name="$(echo $headers | grep -o -P '(?<=<name>).*(?=</name>)')"
  priority="$(echo $headers | grep -o -P '(?<=<priority>).*(?=</priority>)')"

  node dump.js "pages" "$fileName" "$title" "$description" "$file" "$name" "$group" "$priority"
done
