---
title: 'Arknights on Waydroid'
pubDate: 2025-08-17
description: 'An attempt at running the game Arknights on Linux with native-ish methods.'
author: 'msa'
image:
    url: '/blog/posts/arknights-waydroid/duskthumb.jpeg'
    alt: 'Emu Otori'
tags: ["Entertainment","Android","Linux"]
---

# Arknights on Waydroid

![Waydroid & Arknights App Icons](/blog/posts/arknights-waydroid/thumbnail.png)

---

## Preface

I came across a [Waydroid](https://waydro.id/) demonstration video on Bilibili. It piqued enough of my curiosity to get me tinkering, so here is my journey.

I should probably have searched up a guide and saved some effort during the first few reinstallations though.

## The Process

> [*転生Waydroid。*](https://youtu.be/SvK3cTWDeRE)

### Part I: First Contact

1. I installed Waydroid from the official website.
2. I initialised Waydroid using **Vanilla** at first, but realised that in order to get Arknights from Google Play Store, I needed a **Google Play Store**.
3. This meant I needed an emulator that has **Google Apps**. and Vanilla did not cut it. Great.
4. Let's Reinstall.

![First Installation](/blog/posts/arknights-waydroid/part1.png)

### Part II: Google

1. Google Apps acquired! Now we boot into Waydroid!
2. Waydroid's documentation states we need to get this emulated device [certified by Google](https://docs.waydro.id/faq/google-play-certification) before we can do anything. This took around 20 minutes on Google's side.
2. Now let's head to the Play Store and download Ark... Oh. "Your device isn't compatible with this version."
3. I found [an essential script](https://github.com/casualsnek/waydroid_script?tab=readme-ov-file) to install, but I tinkered around and Waydroid eventually stopped booting. Congratulations. </3.
4. Let's Reinstall.

![Second Installation Homescreen](/blog/posts/arknights-waydroid/part2a.png)

![Second Installation Playstore](/blog/posts/arknights-waydroid/part2b.png)

<!-- let's see if github formats my md images properly. -->

### Part III: Escapologist

1. Now that I have installed again from the official source, I made sure to also clone the Waydroid Script directory and install libhoudini through the CLI installation.
2. The reason why libhoudini is needed is that Arknights is compiled to run on the `ARM` architecture. This means I cannot directly run Arknights on my `x86` laptop. There needs to be an ARM translation library in place, and what works best for Intel is apparently **libhoudini**.
3. Finally! After having downloaded libhoudini (and removing the nodataperm hack which caused black screens), I could download Arknights.
4. Installation done. I clicked the icon on the desktop. I boot to a black screen. Darn. Linux is full of surprises.
5. Let's Reinstall.

![Third Installation](/blog/posts/arknights-waydroid/part3.png)

### Part IV: Hope?

- Let's keep trying. This should be the right way to go, but I have not yet figured out what is stumping me. Some reference for future me:

- https://www.reddit.com/r/waydroid/comments/x988mk/installing_both_libhoudini_and_libdnk/
- https://blog.etineres.fr/posts/how-to-play-arknights-on-fedora-41-with-waydroid/
- https://blog.sww.moe/post/waydroid-arknights/

- worst case: apk

![The Reddit Thread](/blog/posts/arknights-waydroid/part4.png)

#### Preliminary Verdict

There has to be some way with which I can install and run Arknights smoothly on Waydroid. I will try some other methods in time to come. This war is not over until it is over. 

Presently it is getting late. I will call it a night for now, and hope the debugging solution comes to me in a dream.

### Part V: Resources

1. It has been a few days. I decided to try the `Vanilla` version of Waydroid & go the APK route. Let's see.
2. The apk I used to install the app is 100mb in size while the xapk on the same website is 1gb. I tried the xapk using `sudo app install Downloads/(xapk file)` but the app did not install at all. Guess xapk does not work.
3. Next, using the apk itself, the app installed. Woo! Let's open it.

![Fourth Installation 1](/blog/posts/arknights-waydroid/part5a.png)
![Fourth Installation 2](/blog/posts/arknights-waydroid/part5b.png)

### Part VI: ?

TBC. Maybe I will try again when the PC version of Arknights is out.

