#!/bin/bash

echo "Coffee?"
if zenity --question --text "Would you like to have a cup of coffee?"; then
    # yes
    echo "Right away!"
    zenity --info --text "Please press Super + C"


else
    # no
    echo "No? That's alright, thank you."
    
fi
