---
title: 'Fish Shell Prompt'
pubDate: 2025-08-17
description: 'An attempt on further customising my terminal. Written for Fish, inspired by the inbuilt Informative style, but with some extra features.'
author: 'msa'
image:
    url: '/blog/posts/fish-prompt/gradientDemo.png'
    alt: 'Demo of the terminal prompt showing a colour gradient for current directory path'
tags: ["Linux", "Terminal", "Tech-Journal"]
---

# Fish Shell Prompt

An attempt on further customising my terminal. Written for Fish, inspired by the inbuilt Informative style, but with some extra features.

## Files

[fish_prompt.fish](/blog/posts/fish-prompt/fish_prompt.fish)

## Features

### Information

> Format: [Timestamp] ($USER) ($hostname) (directory path)

- Changes colour if user is root.

![Info Demo](/blog/posts/fish-prompt/info.png)


### Execution Time

> Shows time taken for a command to execute if more than 3s was used.

![executionTimeDemo](/blog/posts/fish-prompt/execTimeDemo.png)

### Directory Identification

> Relays relevant information in the context line & changes the prompt symbols based on identified directories.

- **Git**: Shows branch & current status.

- **Node**: Shows node version.

- **Python Venv**: Shows virtual environment name.

- **Docker**: Shows docker context.

![Git Demo](/blog/posts/fish-prompt/gitDemo.png)

![Venv Demo](/blog/posts/fish-prompt/venvDemo.png)

(Note that Git takes precedence over Venv for prompt symbols.)

### Background Jobs

> Shows background jobs (if any) taking place in the session.

![Background Job Demo](/blog/posts/fish-prompt/bgJobDemo.png)

### Disk Space

> Alerts if disk space used exceeds 90%.

(No demo. My disk space has yet to exceed 90%.)

### No Write Perms

> Alerts if user is in a directory that is read-only.

![Read Only Demo](/blog/posts/fish-prompt/readOnlyDemo.png)

### Directory Gradient

> As depth of directories increases, colour of directory increasingly becomes more red. Additionally, directory name is shortened to its first letter for directories >5 depth up from the working directory.

![Gradient Demo](/blog/posts/fish-prompt/gradientDemo.png)

## Final Words

This was a fun journey as I gradually learnt more about my machine. There are many more fun things that I can do, and I am thrilled to explore them when I have time. 

I consulted Claude for some of the more technical aspects of status detection, which helped me immensely in overcoming these hurdles. 

That is all. Thank you for reading till the end of this project. See you in the next one soon.