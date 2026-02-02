---
title: 'Fish shell init script'
pubDate: 2025-03-22
description: 'My fish config file. A simple piece of initialiser code to make the terminal more convenient for dev purposes.'
author: 'msa'
image:
    url: '/blog/posts/init-script/initScriptDemoMain.png'
    alt: 'Customised welcome message on fish shell'
tags: ["Linux", "Terminal", "Tech-Journal"]
---

# Fish shell init script
My fish config file. A simple piece of initialiser code to make the terminal more convenient for dev purposes.

Written for [fish shell](https://fishshell.com/).

![Init Script Demo Main](/blog/posts/init-script/initScriptDemoMain.png)

## Files 
- [config.fish](/blog/posts/init-script/config.fish)
- [commands_help.txt](1-initscript/commands_help.txt)

# Features

### Greeting message

Each time the terminal is launched, or when user runs `fp`, the terminal outputs a randomised personalised greeting message (in Chinese) from a curated list, with two parts:

1. Flavour text
2. Greeting message

See examples [here](#demos).

### Manual call

The command `fg` can also be run to manually call a randomised greeting. Additionally, use `fg -la` to list all available greetings in the greeting pool.

Edit 17/08/2025: there are now time-specific greetings. Likewise, you may check the greeting pool for the current time of the day using `fg -la`.


### Other abbreviations & commands 

(Updated 22/09/2025)

#### General

- `c` --> `clear`
- `l` --> `ls -lha`
- `lr` --> `ls -lhaR` (recursively lists all files in the dir)
- `s` --> `sudo`
- `fp` --> `fish --private` (launches fish in private mode)
- `copy` --> `| xclip -selection clipboard` (pipes output of command into clipboard)
- `commands` --> `cat ~/Documents/scripts/commands_help.txt | less` (shows [a guide](/blog/posts/init-script/commands_help.txt) to these abbreviated commands)

#### Settings & Debug

- `power-saver` --> `powerprofilesctl set power-saver`
- `balanced` --> `powerprofilesctl set balanced`
- `performance` --> `powerprofilesctl set performance`
- `cpufreq` --> `watch -n 0.5 "grep 'cpu MHz' /proc/cpuinfo | head -n $(nproc)"` (shows frequencies of all CPU cores)
- `sysinfo` --> `sudo -E ~/Documents/scripts/printsysinfo_new.sh | xclip -selection clipboard` (copies debug information to clipboard)
- `printsysinfo` --> `sudo -E ~/Documents/scripts/printsysinfo_new.sh` (prints debug information in terminal)

#### Package Management

- `sau` --> `sudo apt update`
- `sai` --> `sudo apt install`
- `saa` --> `sudo apt autoremove`

#### Git & Dev

- `gad` --> `git add .`
- `gc` --> `git commit -S -m "%"` where % becomes cursor location
- `gp` --> `git push`
- `gpl` --> `git pull`
- `nrd` --> `npm run dev` (vite)
- `nrb` --> `npm run build` (vite)
- `nrp` --> `npm run preview` (vite)


#### Apps & Misc

- `co` --> `codium` (launches codium)
- `ghidra` --> `~/ghidra_11.3.2_PUBLIC/ghidraRun` (launches ghidra)
- `autopsy` --> `~/autopsy/autopsy-4.22.1/bin/autopsy` (launches autopsy)

- `openseeface` --> `~/Documents/runOpenSeeFace.sh` (for [virtual avatar](/blog/post.html?slug=virtual-avatar))

### Additional notes
- This script also sets the Node.js version to the latest version as my machine defaults to using Node 12. This is probably due to a mismatch in $PATH, but the temporary fix using `nvm use latest` works, so I am sticking with that.

- This init script works in tandem with the [Fish prompt](#4-fish-shell-prompt) I wrote. Do check that one out as well if you are interested.


### Demos

(Updated 17/08/2025)

![Init Script Demo 1](/blog/posts/init-script/initScriptDemo1.png)
![Init Script Demo 2](/blog/posts/init-script/initScriptDemo2.png)
![Init Script Demo 3](/blog/posts/init-script/initScriptDemo3.png)
![Init Script Demo 4](/blog/posts/init-script/initScriptDemo4.png)
