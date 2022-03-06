cp -r ./config ./tmp

rm -rf blog
rm -rf html
rm -rf config
mkdir blog
mkdir html
mkdir config

cd config
echo "[]" > blog.json
echo "[]" > pages.json
echo "{}" > groups.json
echo "{}" > resources.json
echo "[]" > files.json
cd ..

./scripts/articles.bash
./scripts/pages.bash
node files.js
node fileConfigs.js

rm -rf tmp