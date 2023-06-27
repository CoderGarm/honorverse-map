#!/bin/bash

# run it on build system

rm -f honorverse-map.tar.gz
tar -czf honorverse-map.tar.gz dist/
scp honorverse-map.tar.gz scripts/htaccess medusa:uploadTarget/
rm -rf dist/
rm -f honorverse-map.tar.gz
