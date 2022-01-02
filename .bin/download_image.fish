#!/usr/bin/env fish
set -l url $argv[1]
set -l ext .(string split -r -f2 -m1 '.' (basename $url))
set -l out_path './public/images/'(echo -n $url | md5sum | cut -d\  -f1)
set -l chrome_ua "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.114 Safari/537.36" # set User-Agent to Chrome, because image hosts are evil
curl -A $chrome_ua $url --output $out_path
set -l dim (identify -ping -format '%wx%h|' $out_path | cut -d\| -f1)
set -l new_path $out_path"_"$dim""$ext
mv $out_path $new_path
set out_path $new_path
set -l public_path (echo -n $out_path | sed 's/^\.\/public//')
echo -n $public_path | pbcopy
echo $public_path
