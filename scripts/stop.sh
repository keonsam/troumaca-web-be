#!/bin/sh

source /home/ec2-user/.bash_profile
cd /home/ec2-user/troumaca-web-be-server
#~/.nvm/versions/node/v10.4.0/bin/forever stopall

pm2 stop all