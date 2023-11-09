#!/bin/bash

# run it on build system

rm -f honorverse-map.tar.gz
tar -czf honorverse-map.tar.gz dist/
scp honorverse-map.tar.gz scripts/htaccess scripts/google2cbaff394ce44864.html medusa:uploadTarget/
scp scripts/deployMap.sh medusa:
rm -rf dist/
rm -f honorverse-map.tar.gz
