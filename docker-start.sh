#!/bin/sh
#docker run -itd --name hyperlane-warp-ui-template -p 3000:3000 -v /data/mainnet-browser/hyperlane-warp-ui-template:/data node:20.15.1-alpine3.20 sh /data/docker-start.sh
set -x
cd /data/
#yarn install
#yarn run build
yarn start