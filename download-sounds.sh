#!/bin/bash

# Create sounds directory if it doesn't exist
mkdir -p public/sounds

# Download sound effects
curl -o public/sounds/key-press.mp3 "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
curl -o public/sounds/correct.mp3 "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3"
curl -o public/sounds/incorrect.mp3 "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3"
curl -o public/sounds/win.mp3 "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3"
curl -o public/sounds/reveal.mp3 "https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3"