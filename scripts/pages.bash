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
    <link rel="icon" href="%PUBLIC_URL%/../favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="google-site-verification" content="sGo3V_g8qjmhW-tRL3VFR4q_sFXWointhBROBAAZpNw" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/../logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/../manifest.json" />
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
    <div id="root"></div>
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
