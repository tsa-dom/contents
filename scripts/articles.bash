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
      bash ./scripts/post.bash $dirFile "blog" $dirName
    done
  else
    bash ./scripts/post.bash $file "blog"
  fi
done