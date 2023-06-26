#!/bin/bash

# run it at medusa
# deployment
## extract
cd /home/karsten/uploadTarget/ || exit
rm -rf /home/karsten/uploadTarget/dist/
tar -xf /home/karsten/uploadTarget/honorverse-map.tar.gz -C /home/karsten/uploadTarget/

## deploy
sudo rm -r /var/www/html/honorverse-map/
sudo cp -r /home/karsten/uploadTarget/dist/honorverse-map/ /var/www/html/
sudo cp /home/karsten/uploadTarget/htaccess /var/www/html/honorverse-map/.htaccess
sudo chown -R www-data:www-data /var/www/html/honorverse-map/
echo 'deployment of frontend done'
