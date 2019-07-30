#!/bin/sh

set -e

source /home/ec2-user/.bash_profile
cd /home/ec2-user/Troumaca-web-server
#sudo mv properties.file ..
~/.nvm/versions/node/v10.4.0/bin/forever start server.js
