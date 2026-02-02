#!/bin/bash

set -e

echo "Initiating OpenSeeFace face tracking..."

cd ~/OpenSeeFace

source env/bin/activate

python facetracker.py -c 0 --discard-after 0 --scan-every 2 --no-3d-adapt 1 --max-feature-updates 900 --model 3 --faces 1


