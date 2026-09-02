---
title: 'Introducing SkySynth'
pubDate: 2026-09-02
description: "I built a tool that emulates Sky: CoTL's music system, but with many more features."
author: 'msa'
license: 'CC BY-NC-SA 4.0'
image:
    url: '/blog/posts/skysynth-1/thumbnail.jpeg'
    alt: 'Group picture of author & friends'
tags: ["SkySynth", "Entertainment", "Tech-Journal"]
---

# Introduction

## What is Skysynth?

I built a tool that emulates the game Sky: Children of the Light's music system, but with many more features. I called it SkySynth.

![SkySynth Player](/blog/posts/skysynth-1/player.png "SkySynth Player interface.")

## What does the music system look like in Sky: CoTL?

![Native Sky Music 1](/blog/posts/skysynth-1/sky-native-1.png "15-key interface.")

![Native Sky Music 2](/blog/posts/skysynth-1/sky-native-2.png "A chord being played.")

You see, the music system is neat. It is as bare-bones as a video-game music system can get. I styled my SkySynth player to resemble the one in-game as much as possible. 

## What features does SkySynth have? Why were they implemented?

While playing music using the native Sky music interface, I encountered some frustrations:
- After pressing a key, there is a **long delay** before the note rings out. I estimate this to be around 50ms. Greatly limits playing, to the point where I had to mute the game while playing fast.
- **Lack of accidentals** (See below).  
- There is **limited accompaniment** that can be played on the 15 keys. Particularly, when my right hand is playing the main melody, my slightly more inflexible left hand needs to play *Twister™* in order to do any accompaniment at all.
- It is difficult to find & play in certain keys (due to the key only varying based on location).

#### Regarding lack of accidentals
![Why no accidentals?](/blog/posts/skysynth-1/accidentals.png "Translated by Official Sky Discord. Originally from https://twitter.com/otto_yuzame/status/1221821089304563712.")

### Existing Solutions

The current tools available on the web (as of September 2026) include but are not exclusive to:

- [Specy's Sky Music Nightly](https://sky-music.specy.app/)
- [McbeEringi's Sky Instrument Practice](https://mcbeeringi.github.io/sky/instr.html)
- [Sky Music Heroku App](https://sky-music.herokuapp.com/)

They work wonders. That is until you want to play on more than one keyboard. I previously opened four tabs of McbeEringi's music tool in order to play my songs (with accidentals), but ever since my touchscreen laptop stopped working, I knew I had to make something that suited my own style of playing.

<figure class="post-figure">
  <div class="video-embed">
    <iframe 
      src="https://www.youtube.com/embed/76b-fVC1lSA" 
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>
  </div>
  <figcaption>My setup before the touchscreen broke. Wonder why it broke.</figcaption>
</figure>


### My Solutions

Hence, in January 2025, I made the app with my frustrations in mind. Here's what I aimed to do (and ultimately did do):

- **Instant noteplaying**
- **Dualwielding keyboards** (two keyboards, L & R, with different configurations available - switch using backspace)
- **Accidentals** (Play note while holding `Shift` / either `Alt` to play one semitone higher!)
- **Instant key change** (Number keys)
- **Instant Octave shift** (Arrow keys)
- **Temporary Octave-up** (`Space`)
- Toggle for whether to **stop audio when key is released** (`Caps Lock`)
- **Custom instruments** (In Menu)
- **Custom effects** (e.g. Reverb, in Menu, experimental)
- **Recording of a playing session** (In Menu)

<figure class="post-figure">
  <video 
    controls
    preload="metadata">
    <source src="/blog/posts/skysynth-1/letter-in-orange-demo.mp4" type="video/mp4">
    Sorry, your browser doesn't support embedded videos...
  </video>
  <figcaption>SkySynth demo, recorded on 14 Aug 2026. Song: Letter in Orange (Arknights EP)</figcaption>
</figure>


Now that you have an idea of what SkySynth is roughly about, will you [give it a go](https://www.skysynth.space/player/)?

## Devlogs

The process. 

### 18 Jan 2025

<figure class="post-figure">
  <video 
    controls
    preload="metadata">
    <source src="/blog/posts/skysynth-1/dev_180125.mp4" type="video/mp4">
    Sorry, your browser doesn't support embedded videos...
  </video>
  <figcaption>春日影. Purely a byproduct of playing around on my new domain.</figcaption>
</figure>

### 23 Jan 2025

<figure class="post-figure">
  <video 
    controls
    preload="metadata">
    <source src="/blog/posts/skysynth-1/dev_230125.mp4" type="video/mp4">
    Sorry, your browser doesn't support embedded videos...
  </video>
  <figcaption>Night of Knights. Figured this could actually work as a good player.</figcaption>
</figure>

### 28 Jan 2025

<figure class="post-figure">
  <video 
    controls
    preload="metadata">
    <source src="/blog/posts/skysynth-1/dev_280125.mp4" type="video/mp4">
    Sorry, your browser doesn't support embedded videos...
  </video>
  <figcaption>Flower Dance. With added visual indicators of notes played.</figcaption>
</figure>


### 9 Apr 2025

<figure class="post-figure">
  <video 
    controls
    preload="metadata">
    <source src="/blog/posts/skysynth-1/dev_090425.mp4" type="video/mp4">
    Sorry, your browser doesn't support embedded videos...
  </video>
  <figcaption>Orange. After a major feature + UI/UX update.</figcaption>
</figure>

## What's Next?

- As of September 2026, Specy has already developed the Sustain function on Sky Music Nightly. Impressive. I want to figure that out too, once I am no longer too scared to deal with raw audio components. 
- A style revamp?
- A codebase revamp? Hopefully to get rid of clunkiness
- One day I will rewrite the entire thing in Svelte.

## Closing words

Developing SkySynth was an incredibly fun journey. This started out as a simple summer project on a whim, but it has grown on me.

Moving on, devlogs for SkySynth will be logged in my blog. Do stay tuned.

## Files

- https://github.com/manystarsapart/skysynth
- Deployed on https://www.skysynth.space/ as of publishing date.

---

☆———

---

© 2026 msa - CC BY-NC-SA 4.0

---