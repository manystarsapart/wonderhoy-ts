---
title: 'Attempt on automating a Caffeine workflow'
pubDate: 2025-06-14
description: 'I tinker with a GNOME extension to stop my screen from dimming whenever I need it.'
author: 'msa'
image:
    url: '/assets/emu.png'
    alt: 'Emu Otori'
tags: ["Linux"]
---

# Attempt on automating a Caffeine workflow

I tinker with a GNOME extension to stop my screen from dimming whenever I need it.

TL;DR: My version of GNOME does not support it & I don't want to upgrade to Ubuntu 24.04 yet.

![Caffeine GNOME Extension](/blog/posts/automated-caffeine/caffeine.png)

Authored 14/06/2025.

---

## What and Why?

While using my laptop to study, I often leave the laptop on a single screen for a long time as I solve the problems on paper. However, the laptop wants to turn on screensaver and go to sleep. I chanced upon [Caffeine](https://github.com/eonpatapon/gnome-shell-extension-caffeine), a GNOME extension by eonpatapon, which solved my problem by providing me with a button to toggle between keeping the screen on persistently and going to sleep after a while. (*I want that for all of my devices now...*)

On some days, I keep forgetting to turn on caffeine when coming back to a suspended session (before you tell me, yes, I do know there is an option to persist across sessions but I do not want that behaviour). Hence, naturally as any lazy person would do, I set out to write a script to help with that.

## The core concept

1. The script would activate every time I start a desktop session.
2. The script would ask me if I wished to turn on Caffeine.
3. If yes, turn on Caffeine.
4. If no, Caffeine remains off. 

Simple. Easily done with a few lines of bash script, right?

## Part I: The Startup Prompt

Since I already have a [fish init script](#1-fish-shell-init-script) set up, I can simply run the script when that init script runs. No issue.

I explored [zenity](https://help.gnome.org/users/zenity/stable/) and its functionalities, and first tried using `notification`:

```bash
zenity --notification --text "Caffeine?"
```

But with zenity notifications there exist no way (as of now) to respond to that notification being clicked. Moreover, I am perpetually on Do Not Disturb mode, meaning I cannot see the notification on starting a session anyway.

(You may be thinking "What about notify-send?" Well, it could not respond to the notification being clicked either. DND problem is still there as well)

Let's try something else. Zenity has an `info` dialogue that I can use to run my Caffeine script after clicking "Ok":

```bash
if zenity --info --text "Caffeine?"; then
  # run caffeine
fi
```

But I wanted a way to opt out. No go.

Then I tried `question`: 

```bash
if zenity --question --text "Caffeine?"; then
    # yes
    echo "Yes"
else
    # no
    echo "No"
fi
```

Wow! This is exactly what I had wanted. We are basically set.

## Part II: One-Click Coffee Machine

Now that we have that handy script to prompt us each time, let's figure out how to turn on caffeine in the command line!

After having read through the Github README, I deduced Caffeine does not seem to support control through commands. I did not want to toggle the entire GNOME extension on and off either, as I still wanted the ability to turn on Caffeine later on in the session.

I explored Caffeine's settings again, and found that it has a hotkey option. We might be able to emulate a keypress in the script to activate Caffeine!

So I set the hotkey to `super` + `c`:

![Caffeine Hotkey Settings](/blog/posts/automated-caffeine/settings.png)

Great! One step closer.

## Part III: Wayland, Mutter and the Basket of Eggs

Now let's find a way to emulate `super` + `c`.

I know of [xdotool](https://github.com/jordansissel/xdotool), and wanted to use that to emulate my keypresses with something like this:

```bash
xdotool key super+c
```

However, **xdotool works for X11, not Wayland** (which I am comfortable with using, since Wayland is the default display server for my machine). I went on to look for alternatives for Wayland, and found [wtype](https://github.com/atx/wtype), [ydotool](https://github.com/ReimuNotMoe/ydotool), and [diowtype](https://github.com/DiogenesN/diowtype).

### wtype & ydotool

First let's try wtype. This was my idea:

1. Press and hold `super`
2. Press `c`
3. Release `super`

```bash
wtype -M win -k c -m win
```

This returns:

```
Compositor does not support the virtual keyboard protocol
```

Oh boy. After [digging](https://github.com/atx/wtype/issues/22#issuecomment-1113273742) and being led to the Mutter (GNOME's core window manager and compositor) [forum](https://gitlab.gnome.org/GNOME/mutter/-/issues/1974), apparently GNOME does not support the `virtual-keyboard-unstable-v1` Wayland protocol needed for these to work due to security reasons. This means **wtype and ydotool will not work** on my machine.

![Dev Discussion on Mutter](/blog/posts/automated-caffeine/mutterforum.png)

This forum also mentions **libei**, which sounds potentially promising. Let's set that aside for later use.

### diowtype

The thing about diowtype is despite the fact that it can indeed run on my machine, it only emulates one single keypress at a time, not combinations. Caffeine's settings do not accept single-keypress hotkeys, so I cannot use this either.

### libei

Then I looked into [libei](https://gitlab.freedesktop.org/libinput/libei/):

![Summary of libei](/blog/posts/automated-caffeine/libeisummary.png)

In fact, Mutter had actually integrated libei in the newer versions!

I was heartened until I realised **Mutter only supports libei from Ubuntu 24.04 onwards**, while I used my trusty 22.02 Jammy. 

Darn... **I was not ready to upgrade my system so I had to call it a day.**

To end this mildly disappointing section off on a slightly more lighthearted note, here is a section from [the creator's blog](https://who-t.blogspot.com/2020/08/libei-library-to-support-emulated-input.html) regarding libei:

> What does all this have to do with eggs? "Ei", "Eis", "Brei", and "Reis" are, respectively, the German words for "egg", "ice" or "ice cream", "mush" (think: porridge) and "rice". There you go, now you can go on holidays to a German speaking country and sustain yourself on a nutritionally imbalanced diet. 

## The product

In the end, I settled with everything I had up to Part II. There would be a prompt at startup asking if I wanted to activate Caffeine, and if I selected Yes, it would prompt me to use my hotkey (`super` + `c`) to activate it. This would serve more as a reminder rather than an automation process, but I will settle for this.

Final files can be found [here](#files-2).


## Afterthoughts

This was an interesting dive into an aspect that I have hardly come into contact with. It took two hours on a splendid Saturday morning that I could have spent studying.

Upgrading to Ubuntu 24.04 and trying to fix broken dependencies last year has left a fowl taste in my mouth. Maybe in the near future, when I can wield Linux better, I will do so and finally get my daily morning fix of virtual Caffeine.


## Update – 19 Jun 2025

Putting this script inside the fish startup prompt, I realised, was not convenient at all. I had two problems:

1. The script did not run on resuming a suspended session; and

2. The script always ran whenever I started my terminal.

Hence, I decided to look into startup prompts in order to truly give myself the experience I wanted. This time, I tried using an `autostart` desktop file for running the script on startup, as well as a user service to detect when the user logs back into a suspended session.

### Autostart

I created a file in `~/.config/autostart` named [caffeineReminder.desktop](/blog/posts/automated-caffeine/caffeineReminder.desktop).

I opted for `autostart` over putting the script inside `/etc/init.d/` or `update-rc.d` because this is, after all, a GUI prompt. I did not want to run it as root user as well.

### Systemd User Service (Attempt 1)

This part was slightly trickier. First, I made a [caffeine-on-resume.service](/blog/posts/automated-caffeine/caffeine-on-resume.service) file and put it inside `~/.config/systemd/user`. 

Then, the service needs to be enabled: 

```bash
systemctl --user enable caffeine-on-resume.service
```

This created the correct symlink and added my service as a dependency to a non-existent unit suspend.target.

HOWEVER. I realised **this is not how it works**. Apparently, this runs the script when I suspend the session itself (I believe this was the case?), not when I resume. Thus I removed it.

```bash
systemctl --user stop caffeine-on-resume.service
systemctl --user disable caffeine-on-resume.service
```

### Systemd User Service (Attempt 2)

Let's try this again. Digging again, I found a wonderful [guide](https://ubuntuhandbook.org/index.php/2024/10/custom-actions-waking-sleep/) by Ubuntuhandbook on this subject. Unfortunately, this seems to be running the script as root and I am unsure how to make the prompt work on this one. 

Maybe next time. For now, at least the startup script works.

## Update – 22 Sep 2025

I have also enabled Caffeine in my newly installed MX Linux system on my [Macbook Air](#6-revitalising-my-old-macbook-with-linux). I did not set up a customised script for it as there is no need for it, so Caffeine remains as it is, out of the box, on that machine.

## Files
[caffeineReminder.sh](/blog/posts/automated-caffeine/caffeineReminder.sh)

[caffeineReminder.desktop](/blog/posts/automated-caffeine/caffeineReminder.desktop)

[caffeine-on-resume.service](/blog/posts/automated-caffeine/caffeine-on-resume.service)
