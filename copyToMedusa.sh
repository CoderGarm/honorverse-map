#!/bin/bash

# run it on build system

rm -f dist.tar.gz
tar -czf dist.tar.gz dist/
scp dist.tar.gz medusa:uploadTarget/honorverse-map.tar.gz
rm -rf dist/
rm -f dist.tar.gz
