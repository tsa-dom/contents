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

# Running additional scripts
./scripts/articles.bash
./scripts/pages.bash
node files.js
node fileConfigs.js

# Deleting temp folder
rm -rf tmp