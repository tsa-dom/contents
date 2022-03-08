# Moves old configs to temp folder
cp -r ./config ./tmp

# Removing html files and configurations
rm -rf blog
rm -rf html
rm -rf config

# Creating new folders
mkdir blog
mkdir html
mkdir config

# Creating new configurations files
cd config
echo "[]" > blog.json
echo "[]" > pages.json
echo "{}" > groups.json
echo "{}" > resources.json
echo "[]" > files.json
cd ..

# Iteration trough all pages
for file in ./pages/*
do
  eval node scripts/pages.js $file
done

# Iterating trough all blog posts
for file in ./articles/*
do
  if [[ -d $file ]]
  then
    dirName="$(echo $file | grep -o -P '(?<=./articles/).*')"
    cd blog
    mkdir $dirName
    cd ..
    for dirFile in ./articles/$dirName/*
    do
      node scripts/pages.js $dirFile
    done
  else
    node scripts/pages.js $file
  fi
done

node scripts/files.js
node scripts/fileConfigs.js

# Deleting temp folder
rm -rf tmp