---
title: 'Firefox paste pop-up is disrupting my workflow!'
pubDate: 2026-07-08
description: 'Security security security security security. Ugh.'
author: 'msa'
license: 'CC BY-NC-SA 4.0'
image:
    url: '/blog/posts/firefox-paste-dialogue/dialogue.png'
    alt: 'Paste dialogue box'
tags: ["Tech-Journal", "Linux"]
---

# Firefox paste pop-up is disrupting my workflow!

## Preface

TL;DR, I use Firefox, and lately my `Ctrl+Shift+V` (for the Macbook users, `Ctrl` --> `Cmd`) shortcut which is integral to my workflow has an issue that I cannot yet fix.

I need sanitised clean plain text most of the time when I copy from one source to another. This shortcut does just that: **Paste text without formatting**. This saves me the trouble of doing `Ctrl+V`, then `Ctrl+\` to clear the formatting.

## The problem

It started at least a few months ago. 

I realised this little pop-up appeared every time I tried to perform my `Ctrl+Shift+V` manoeuvre in any of my documents online. This includes in Google Sheets, Docs and whatever else the Google ecosystem includes.

![Pop-up paste dialogue](/blog/posts/firefox-paste-dialogue/dialogue.png)

Naturally, as someone who gives the mouse way less love than the keyboard, it pained me every time because I had to take my hands off the keyboard, move my mouse to the pop-up, wait one second (more like an eternity) for it to turn clickable, click it, then reset my hands onto the keyboard.

### The exact problem

The exact issue I am running into is described in the [Mozilla web documentation](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API#security_considerations). I only started having a complete grasp after much research. The information below is the consolidation of knowledge gained from my attempts.

From the documentation:

> Firefox & Safari:

> - If a read isn't allowed by the spec but transient user activation is still met, it **triggers a user prompt in the form of an ephemeral context menu with a single "Paste" option (which becomes enabled after 1 second)** and succeeds if the user chooses the option.

> - Writing requires transient activation.

> - The paste-prompt is suppressed if reading same-origin clipboard content, but not cross-origin content.

> - The clipboard-read and clipboard-write permissions are not supported (and not planned to be supported) by Firefox or Safari.

So the big idea is that there are **two types of clipboard APIs**. 

1. **Paste event** (`Ctrl+V`): 
    - Browser dispatches a `paste` event
    - Clipboard contents get attached to the event
    - No permission prompt ("ephremeral context menu") necessary
2. **Async Clipboard API** (`navigator.clipboard.read()`)
    - Website actively asks Firefox to read the clipboard
    - Firefox does not allow that. Shows native "Paste" context menu
    - Triggered by `Ctrl+Shift+V`

And Google apps use the latter. Custom MIME types can be more reliably used with the async API, allowing for lossless copy-paste between its own tabs. **This also is the very thing disrupting my seamless workflow.**

### Attempt 1

I first chanced upon some Reddit posts. The top answers ask you to go to `about:config` and set the preference `dom.events.testing.asyncClipboard` from `False` to `True`. 

![Unsafe setting of about:config](/blog/posts/firefox-paste-dialogue/about-config-workaround.png)

But numerous replies refuted, stating it was a very bad idea. Quoting Sky Schubert `[:skyschub]` on Bugzilla, 

> "**This is a fundamentally bad idea**. This pref was meant for automated testing, and bypasses all security/permission checks on clipboard access. **If you toggle this pref, any site has full access to your clipboard all the time without asking you or you even noticing**, do not touch that pref."

After all, this solution was the closest to solving the issue, since it did work and gave back my instant unformatted paste. But the safety compromise was not one that I was willing to sit with. 

### Attempt 2

Then I found this [post](https://www.reddit.com/r/firefox/comments/1dofgd2/pasting_into_web_outlook_popping_up_little_paste/), also on Reddit, after digging deeper. Going into the [recommended solution page](https://support.mozilla.org/mk/questions/1411533#answer-1579497), the chosen (top) solution recommended that I flip some settings to true inside `about:config`.

![Mozilla solution](/blog/posts/firefox-paste-dialogue/mozilla-solution.png)

![Mozilla solution in detail](/blog/posts/firefox-paste-dialogue/recommended.png)

However, my `about:config` lacked such options, because it seems that Mozilla had bundled these options away. This is a no-go. 

![about:config lacking such options](/blog/posts/firefox-paste-dialogue/about-config.png)

### Attempt 3

I searched `dom.events.testing.asyncClipboard` online and found this Github issue (https://github.com/coder/code-server/issues/1106) for the `code-server` repository. At the end of the issue thread, someone mentioned [this extension](https://addons.mozilla.org/en-US/firefox/addon/grant-clipboard/). This did not help, however. The extension could not bypass Firefox's security, because they cannot grant a website access to the clipboard. 

![Extension install page](/blog/posts/firefox-paste-dialogue/extension-page.png)

### Attempt 4

I read on another post:

> Interesting, for me I do get the issue even when I copy content from Google Sheets and paste it (in the same browser, in the same tab) with Ctrl+Shift+V. Well, after testing some more, it's a bit inconsistent. If I have something on my system clipboard, I get the issue every time I Ctrl+Shift+V. **If I clear the system clipboard with "xclip -selection clipboard /dev/null" (on Linux) and then copy something from Google Sheets, I can Ctrl+Shift+V safely.** If I copy again without clearing my clipboard with "xclip -selection clipboard /dev/null" though, then I start getting the pop-up again.

Seems promising, but again this is a hassle to do every time. I cannot imagine having to run a separate keyboard shortcut before pressing my `Ctrl+Shift+V` anyway. That would defeat the purpose and I could have just gone for the original `Ctrl+V` & `Ctrl+\` method.


### Attempt 5

Outlook users experienced this issue as well, and [raised it in their bug reports](https://bugzilla.mozilla.org/show_bug.cgi?id=1815733#c13). Eventually this got fixed on the Outlook side. But users worked around it by overriding the `navigator.clipboard.read()` function on the Outlook webcompat side itself. I certainly do not want to go through such trouble. If you are reading this and you are proficient in patching Firefox or Google's `navigator.clipboard.read()` calls, please feel free to try. 


## Final words

**There is hope**. 

User `hsandt` recently [made a suggestion](https://connect.mozilla.org/t5/ideas/permission-to-read-clipboard-or-dom-events-testing/idi-p/124420) on Mozilla Connect's Ideas forum, petitioning for per-domain permission granting for external `Ctrl+Shift+V` pastes. Maybe the underpaid Mozilla intern will see this one day and decide to realise it.

Before that happens, all of us will have to suck it up, it seems. 

I will update this blog if there are any news.

## References

- 
- https://www.reddit.com/r/firefox/comments/1keb006/annoying_paste_dialog/
- https://www.reddit.com/r/firefox/comments/1qk7ca0/how_to_prevent_the_paste_context_menu_when_using/
- https://phabricator.services.mozilla.com/D217702#7478546 
- https://hg-edge.mozilla.org/integration/autoland/rev/ffc943892e26
- https://clipboardinspector.com/blog/clipboard-api-vs-paste-event/
-

---

☆———

---

© 2026 msa - CC BY-NC-SA 4.0

---