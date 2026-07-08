---
title: 'Firefox paste pop-up is disrupting my workflow!'
pubDate: 2026-07-08
description: 'Fret not. There is always an extension for everything.'
author: 'msa'
license: 'CC BY-NC-SA 4.0'
image:
    url: '/blog/posts/firefox-paste-dialogue/dialogue.png'
    alt: 'Paste dialogue box'
tags: ["Tech-Journal"]
---

# Firefox paste pop-up is disrupting my workflow!

## Context

I use Firefox. 

This issue started some time ago. I am unsure how long ago it was, but I remember having to deal with this for a few months at the very least.

At work, I use the shortcut `Ctrl` + `Shift` + `V` very often (for the Macbook users, `Ctrl` --> `Cmd`), as I need sanitised clean plain text most of the time when I copy from one source to another. This shortcut does just that: **Paste text without formatting**. 

However, lately, I realised this little pop-up appeared every time I tried to perform my `Ctrl` + `Shift` + `V` manoeuvre in any of my documents online. This includes in Google Sheets, Docs and whatever else the Google ecosystem includes.

![Pop-up paste dialogue](/blog/posts/firefox-paste-dialogue/dialogue.png)

Naturally, as someone who gives the mouse way less love than the keyboard, it pained me every time because I had to take my hands off the keyboard, move my mouse to the pop-up, wait for it to turn clickable, click it, then reset my hands onto the keyboard.

## Finding the fix

I first chanced upon some Reddit posts. The top answers ask you to go to `about:config` and set `dom.events.testing.asyncClipboard` to `True` from `False`. But numerous replies refute by saying "This is very bad advice. This allows any web page to steal your data in the clipboard! Don't do this."

They made it sound like a risk that one must take in order to enjoy a normal workflow again, but I figured there definitely existed a way to fix this.

Then I found this [post](https://www.reddit.com/r/firefox/comments/1dofgd2/pasting_into_web_outlook_popping_up_little_paste/), also on Reddit, after digging deeper. Going into the [recommended solution page](https://support.mozilla.org/mk/questions/1411533#answer-1579497), the chosen (top) solution recommended that I flip some settings to true inside `about:config`.

![Mozilla solution](/blog/posts/firefox-paste-dialogue/mozilla-solution.png)

However, my `about:config` lacked such options. This is a no-go.

![about:config lacking such options](/blog/posts/firefox-paste-dialogue/about-config.png)

## The fix

I searched `dom.events.testing.asyncClipboard` online and found this Github issue (https://github.com/coder/code-server/issues/1106) for the `code-server` repository. At the end of the issue thread, someone mentioned [this extension](https://addons.mozilla.org/en-US/firefox/addon/grant-clipboard/). And this was all I needed. If not for the Github issue, I would not have looked this way and found the exact extension for it. Thank you `easrng` for being the coal in my blizzard. 

![Extension install page](/blog/posts/firefox-paste-dialogue/extension-page.png)
![Extension details](/blog/posts/firefox-paste-dialogue/extension-details.png)
![Extension preferences](/blog/posts/firefox-paste-dialogue/extension-preferences.png)


## Final words

I still have not figured out why I started to have this dialogue box. Seems like everyone got this at different timings from 2023 till now, 2026. If I find out the root cause of it, I will update this blog post.

---

☆———

---

© 2026 msa - CC BY-NC-SA 4.0

---