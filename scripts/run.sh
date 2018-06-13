#!/bin/sh

cd /home/ec2-user/Troumaca-web-server
mv properties.file ../
/usr/local/lib/node_modules/forever/bin/forever start server.js