#!/usr/bin/env fish
echo "Uses imagemagick."

set -l images public/featured
set -l watermark public/icons/mstile-70x70.png
set -l outputDir public/og/featured

mkdir tmp/
mkdir -p $outputDir

convert $watermark -resize x120 -gravity center -background transparent tmp/watermark.png

for i in $images/*.jpg
    set -l image (basename $i)
    # resize image
    convert $i \( -clone 0 -blur 0x9 -resize 1200x630\! \) \( -clone 0 -resize 1200x \) \
-delete 0 -gravity center -compose over -composite tmp/$image
    # add watermark
    composite -gravity SouthEast -geometry +10+10 tmp/watermark.png tmp/$image -quality 92 $outputDir/$image
    echo "Generated $outputDir/$image"
end

rm -rf tmp/
