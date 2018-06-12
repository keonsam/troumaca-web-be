#!/bin/sh

set -e

source /home/ec2-user/.bash_profile

cd /home/ec2-user/app
/usr/local/bin/npm install > /home/ec2-user/npm_install.log
/usr/local/bin/forever start server.js