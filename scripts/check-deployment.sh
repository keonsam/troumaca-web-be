#!/bin/sh

set -e

source /home/ec2-user/.bash_profile

PORT=8080

status=$(curl -L -s -o /dev/null -w "%{http_code}" localhost:$PORT)
if [ $status -ne 200 ]; then
    echo "Application not responding on port $PORT. Assuming this means that deployment failed"
    exit 1
fi

exit 0