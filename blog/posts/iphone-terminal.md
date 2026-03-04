---
title: 'iPhone Terminal'
pubDate: 2025-09-24
description: 'Why would anyone want a sandboxed terminal on the iPhone that can access nothing?'
author: 'msa'
license: 'CC BY-NC-SA 4.0'
image:
    url: '/blog/posts/iphone-terminal/img/neofetch.png'
    alt: 'Neofetch command on the iPhone terminal'
tags: ["iOS", "Terminal", "Tech-Journal"]
---

# iPhone Terminal

Purely for fun. Also to show off my hackerman-ness to my peers on the fly. I haven't found a real use for it yet.

![`neofetch`](/blog/posts/iphone-terminal/img/neofetch.png)

## Preface

I chanced upon the genius [iSH Project](https://github.com/ish-app/ish), which is:

>  A project to get a Linux shell running on iOS, using usermode x86 emulation and syscall translation.

Big words. All I know is that I can run a terminal on my iPhone!

## Install & My Customisation Steps

1. Install iSH from the App Store or the Altstore if you are feeling fancy.
2. Open the app.
3. Run some installation commands to install cool packages. For me, I ran:

```bash
apk add fish # fish terminal!!!!!!!!
apk add neofetch # system info (although it is really wrong for the iphone)
apk add asciiquarium # colourful ascii aquarium
```

4. Now fish needs some customisation. I modified my previous projects' fish scripts into: [`config.fish`](/blog/posts/iphone-terminal/config.fish) as well as [`fish_prompt.fish`](/blog/posts/iphone-terminal/fish_prompt.fish), cutting out the unnecessary commands and only leaving the ones that actually work (Note: `bryellow` seems to break, so I changed it to just `yellow`).
5. Move these files into the `root` folder using the iPhone native Files app. I chose to copy the text and paste them manually:

![Root Directory Paste](/blog/posts/iphone-terminal/img/root.png)

![Text.txt](/blog/posts/iphone-terminal/img/text.png)

6. Rename the pasted files to their correct names. I did this inside the native Files app, but you can also do it in the iSH terminal itself using `mv`.

![Change Extension](/blog/posts/iphone-terminal/img/changeext.png)

7. Now, move these files from `~` (which is `/root`, home directory, by default) to `~/.config/fish` (for `config.fish`) and `~/.config/fish/functions` (for `fish_prompt.fish`) separately. Create directories using `mkdir` if necessary.

```bash
mv ~/config.fish ~/.config/fish
mkdir ~/.config/fish/functions
mv ~/fish_prompt.fish ~/.config/fish/functions
```

8. This sets up the fish commands nicely. Now, I also wanted fish to be the default shell, as Alpine uses `ash` as the default shell. This is done through creating a [`.profile`](/blog/posts/iphone-terminal/.profile) config file in `~`, which runs any commands inside it every time iSH boots up (and hence booting up `ash`). 

```bash
# checks for presence of "i" flag (interactive session) inside shell flags. if yes, starts fish
# because the default greeting text in iSH still shows after exec'ing fish, i also added the clear command to clear the CLI before fish starts up. hence the clear.

case "$-" in
  *i*) [ -x /usr/bin/fish ] && clear && exec /usr/bin/fish ;;
esac
```

> [!WARNING] 
> Do not simply include `exec /usr/bin/fish` in `~/.profile`! **This will hang iSH**. This means the shell doesn't care if it is in interactive mode and just goes into a loop or simply breaks.

9. And here we have it! Reboot by removing iSH from background apps, and launch into iSH again. 

## Limitations

- Date & Prompt symbol does not seem to work for the prompt function. Date is just missing, while prompt symbol defaults to `#`.
- On closer inspection: `echo (date "+%H:%M:%S")` returns `09:41` when the time now for me (GMT+8) is `17:41:30`. Notice the seconds missing (probably an iPhone issue), and the time is in GMT. This is fixed in [`config.fish`](/blog/posts/iphone-terminal/config.fish) as well: `set -l hour (math (date +%H) + $gmt_offset)`.
- Most packages do not work due to lacking dependencies. This is an iPhone after all.


## Additional Demo

![`ls -lhaR`](/blog/posts/iphone-terminal/img/lr.png)

![`asciiquarium`](/blog/posts/iphone-terminal/img/asciiquarium.png)

## Files

[`.profile`](/blog/posts/iphone-terminal/.profile) (~/.profile)

[`config.fish`](/blog/posts/iphone-terminal/config.fish) (~/.config/fish/config.fish)

[`fish_prompt.fish`](/blog/posts/iphone-terminal/fish_prompt.fish) (~/.config/fish/functions/fish_prompt.fish)


## Final Words

This was a very simple project, if you can even call it one. It was mostly dealing with the lack of actually-linux things on the iPhone, and wow I wonder why. Bless the developers for iSH though, one really needs to scrape the bottom of the barrel when it comes to things like this. Moving forward, I will pen more things down once I find more uses for this terminal inside my phone.

## References

- <https://ipadlinux.org/#about> (I originally chanced upon this while browsing iPad linux options)
- <https://github.com/ish-app/ish/wiki>
- <https://fishshell.com/docs/current/>
- <https://wiki.alpinelinux.org/wiki/Shell_management>
- <https://unix.stackexchange.com/a/26557>
- <https://unix.stackexchange.com/a/26827>

---

© 2025 msa - CC BY-NC-SA 4.0

---