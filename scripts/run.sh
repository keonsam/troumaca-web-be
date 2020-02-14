#!/bin/sh

set -e

source /home/ec2-user/.bash_profile
cd /home/ec2-user/troumaca-web-be-server
#~/.nvm/versions/node/v10.4.0/bin/forever start dist/server.js
pm2 start dist/server.js
pm2 set pm2:autodump true