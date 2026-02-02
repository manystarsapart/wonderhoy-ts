---
title: 'Revitalising my old Macbook with Linux'
pubDate: 2025-09-03
description: 'XFCE versus 4GB soldered RAM!!!'
author: 'msa'
image:
    url: '/blog/posts/old-macbook/img/specs.png'
    alt: 'Emu Otori'
tags: ["Linux", "Tech-Journal"]
---

# Revitalising my old Macbook with Linux

## Preface

I have an old Macbook Air. I cannot remember when I had acquired it, but it runs on OS X 10.9.5 (13F1911). This machine is an 11-inch, early 2014 model and I have been using it for over ten years. It has even been bootcamped and also dualboots a Windows 7 system. Talk about retro.

![Macbook Specs](/blog/posts/old-macbook/img/specs.png)

Unfortunately, the battery has been degraded through the years of usage, meaning the machine can only be booted up if it is connected to the AC power source (at *just* the right angle, by the way – if the wire were to be twisted in any other way, the machine just stops). Furthermore, the native OS X is very outdated and supports virtually no modern app. The Windows 7 system can still run a bunch of things surprisingly well, but its limit is Minecraft 1.16, as it struggles to render anything but distorted polygons on 1.17 when I tested it with my buddies.

Enough said. Let's try to revitalise this good old friend of mine.

## Part I: Arch?

Originally, I had wanted to use Arch Linux and subsequently get the I-use-Arch-btw pass. However, I thought twice:

![Telegram Monologue](/blog/posts/old-macbook/img/backtrack.png)

The concern mostly lies in the rolling release aspect. I would love to not have to fix everything everywhere all at once, so maybe Arch next time.

## Part II: Not Entirely Cherry

From browsing online forums, I learnt of [MX Linux](https://mxlinux.org/) (I'm always locked out of their website for some reason though). Its Debian base coupled with its popularity among the old-computer-linux community appealed greatly to me and I was sold instantly. 

I checked to see if my old Macbook could run MX Linux, and chanced upon [Action Retro's video, in which he installed MX Linux on a Macbook Air that is as old as my own](https://youtu.be/E6bTVKXGfE0). If he could do it, I can do it.

I downloaded MX Linux's `.iso` file for Live USB (Version MX 23.6 "Libretto") from [Sourceforge](https://sourceforge.net/projects/mx-linux/), then etched it to one of my few remaining USB sticks using [balenaEtcher](https://github.com/balena-io/etcher) since I had no access to Rufus on my Ubuntu system. Initially, I was worried about whether my 4GB USB stick could be used, but the `.iso` file turned out to only be 2GB. Talk about lightweight distros.

Do note that apparently you need to install firmware updates and set the volume on your OS X to an acceptable volume (or mute) first before wiping it out entirely. Installing firmware updates was not really an option for me as there were few updates compatible with my computer remaining on the App Store. The volume carries through to determine the volume setting for the booting chime of your new system, so I adjusted it to around 50%.

## Part III: Partitioning

The Live USB successfully booted, and took a surprisingly short time to boot up MX Linux from the USB for my ancient machine.  

![MX Installation Screen](/blog/posts/old-macbook/img/MXinstall.png)

However, life is full of surprises; this time it is not a pleasant one. The MX Linux system apparently cannot detect my SSD at all, as observed from the `Regular install using the entire disk` option being greyed out in the Partition page. 

Using `sudo fdisk -l` only shows `sda1` and `sda2`, and both of them are the boot USB itself. I even booted to Ubuntu 24's live USB to check if it was the MX Linux system's issue. No luck either.



This seemed really concerning from a quick search online, as [one of the antiX forum users](https://www.antixforum.com/forums/topic/regular-install-using-the-entire-disk-is-grayed-out/) seemed to need to factory reset the entire computer and mess with BIOS settings and also remove Windows in order to fix it. I knew how to do none of these procedures.

Thankfully, after further digging, I chanced upon an [AskUbuntu forum post](https://askubuntu.com/questions/1212573/ubuntu-installer-wont-recognize-my-ssd-on-macbook-air) that deals with a Macbook Air instead. The previous forum post had been about a Lenovo Ideapad which had a different problem. For my issue, I simply had to add `intel_iommu=off` in the live CD kernel options, which was a much simpler procedure.

![antiX forum](/blog/posts/old-macbook/img/antiXforum.png)

![AskUbuntu forum](/blog/posts/old-macbook/img/askubuntu.png)

![The Solution](/blog/posts/old-macbook/img/iommusolution.png)

## Part IV: IOSYS + REIMU = IOMMU

I followed the instructions and added the aforementioned option. For those interested, here's the procedure:

1. Boot to the GRUB screen and press arrow keys to highlight the GRUB entry to edit.

2. Press `e`, which should bring you to the kernel options (some systems may require pressing tab / space before that first? `e` just works for me though).

3. Using arrow keys to navigate, move the cursor down to the `linux` row. Add `intel_iommu=off` at the back.

4. Press `ctrl` + `x` OR `F10` to boot using these options.

The machine booted up, and with bated breath I started the MX Linux installation process. The procedure had worked! I used 28GB (25%) for Root and the remaining 85GB (75%) for Home. There was more room than I had envisioned as I was used to having only effectively 30GB per system on that machine due to the dualboot settings.

![Partitioning Screen](/blog/posts/old-macbook/img/partitioning.png)

![Confirmation for Installation](/blog/posts/old-macbook/img/confirmation.png)

## Part V: OLD AGE OLD AGE OLD AGE 

Old is not always gold. Once I got past the previous screens, I was hit with yet another error, this time quite concerning:

  ```
  The disks with the partitions you selected for installation pass the
  SMART monitor test (smartctl), but the tests indicate it will have a
  higher than average failure rate in the near future.If unsure, 
  please exit the Installer and run GSmartControl for more 
  information.
  Do you want to continue?
  ```

Opening GSmartControl to check, it seems like my SSD has gone through its fair share of wear and tear (my Power_On_Hours is 6958... that averages to **around 2 hours of screen time every single day for ten years**! Gee...). I aborted the operation because the warning sounded quite frightening – `Reallocated Sector Count` was 1, meaning one bad sector has been found and remapped. The overall health seemed fine from [the report](/blog/posts/old-macbook/APPLE_SSD_TS0128F_74RS120ZT8VW_2025-09-02_1345.txt) though, so I proceeded to install MX Linux again after some consideration.

![Smartmon Warning](/blog/posts/old-macbook/img/smartmonwarning.png)

![GSmartControl General Info](/blog/posts/old-macbook/img/gsmartcontrol1.png)

![GSmartControl Details](/blog/posts/old-macbook/img/gsmartcontrol2.png)

![Abortion of Installation](/blog/posts/old-macbook/img/abortion.png)

![alt text](/blog/posts/old-macbook/img/rawdegradation.png)

> "Osmanthus wine tastes the same as I remember."

## Part VI: Installation

Let's install MX Linux for real!  

![Installation 11%](/blog/posts/old-macbook/img/install11.png)

![Installation 97%](/blog/posts/old-macbook/img/install97.png)

![Installation 100%](/blog/posts/old-macbook/img/installdone.png)

## Part VII: Making the System Mine

By mine I mean my own. Not mine BitCoin.

Now that MX Linux has been properly installed, I decided to follow the footsteps of (probably) every Linux user. Here are some things that I did to customise this machine, partly referencing [FOSSLinux](https://www.fosslinux.com/67840/mx-linux-review.htm):

1. Increase font size (to 11) (`settings > appearance`)
2. Set theme (`settings > appearance`)
3. Wallpaper & splash screen (`settings > desktop`)
4. Install [Caffeine](https://linuxmasterclub.com/caffeine/) 
5. Add items to panel in items menu & Customise the panel to look like the Ubuntu one I'm used to
6. Fix potential screen tearing (`mx tools > tweak > compositor > vblank: xpresent`)
7. Enable double click (`mx tools > tweak > config options > disable single click for both desktop & thunar`)
8. Customise the desktop clock widget (`mx tools > conky`)
9. Make booting to mxlinux 3s (`mx tools > boot options`)
10. Enable antiX adblock
11. Enable default firewall options
12. Install Fish shell & use my [fish config script](/blog/post.html?slug=fish-shell-init-script) (greatly cut down)
13. Install Spotify

Voila!

!["God Forbid I spend the next four hours ricing"](/blog/posts/old-macbook/img/rice.png)

![After the Customisations](/blog/posts/old-macbook/img/postrice.jpeg)

> Art source seems to be [阳_伞](https://space.bilibili.com/8522878) according to a video, but I cannot tell for sure.

## Part VIII: Webcam

Added 07/09/2025.

Today I entered a video call and realised the webcam could not be detected. Worry not, though, for I found the exact post (or rather string of posts) to solve my issue. It led me to a [script](https://gist.github.com/ukn/a2f85e3420ae7d0f64db2274a9bc106b) on Github that seems to work, so I tried it.

![Install Webcam Script](/blog/posts/old-macbook/img/installwebcamscript.png)

Here's what I did:

```bash
nano installwebcam.sh
# (pastes the script in)

sudo chmod +x ./installwebcam.sh
sudo ./installwebcam.sh
```

Unfortunately, I ran into some issues when I ran this script. An error popped up, saying:

> install: cannot change permissions of ‘//usr/lib/firmware/facetimehd’: No such file or directory

Sounds like an easy fix. I just made the directory and ran the script again:

```bash
sudo mkdir -p /usr/lib/firmware/facetimehd
sudo ./installwebcam.sh
```

Okay. This time it worked, albeit with some errors still:

> Warning: modules_install: missing 'System.map' file. Skipping depmod.

> modprobe: FATAL: Module bdc_pci not found.

These should be harmless as I do not have bdc_pci in my system anyway. For the depmod, I ran it manually:

```bash
sudo depmod -a
```

Now all that's left for us to do is to load the driver manually:

```bash
sudo modprobe facetimehd
dmesg | grep facetimehd

# and now to see if the driver is actually loaded:
v4l2-ctl --list-devices
```

![dmesg Information](/blog/posts/old-macbook/img/dmesgwebcam.jpg)

You can see that the webcam is indeed loaded. Wonderful!

Here's how it looks like. The other folks even say that this 720p camera appears clearer than that of my daily drive machine. I don't know what to think of that but guess Apple really was in its prime.

![Webcam Demo](/blog/posts/old-macbook/img/webcamdemo.png)

## Part IX: (Re)Webcam

Added 10/09/2025.

I upgraded my kernel from `6.1.0-38` to `6.1.0-39`. Guess what: the `facetimehd` module did not get carried over. Found this out when I tried to enter a video meeting but video camera did not get detected again. Let's fix this.

First I had to make sure the video camera was still working in the first place, lest anything broke in the few days for which I was gone. Let's rebuild this module according to the original script first. 

```bash
cd /tmp
git clone https://github.com/patjak/bcwc_pcie.git
cd bcwc_pcie/firmware
ls -lha
```

There was no make file! Following the original script, the next step was to `make` here. But there was only a `README` that reads:

> The firmware extraction tool is moved to a separate directory at: 
> https://github.com/patjak/facetimehd-firmware

I think if my original script had failed to build this particular firmware extractor, it means I already had the necessary firmware. Let's move on then. LOL

```bash
cd ..
make
sudo make install
```
```
make -C /lib/modules/6.1.0-39-amd64/build M=/tmp/bcwc_pcie modules_install
make[1]: Entering directory '/usr/src/linux-headers-6.1.0-39-amd64'
  INSTALL /lib/modules/6.1.0-39-amd64/extra/facetimehd.ko
  SIGN    /lib/modules/6.1.0-39-amd64/extra/facetimehd.ko
At main.c:171:
- SSL error:FFFFFFFF80000002:system library::No such file or directory: ../crypto/bio/bss_file.c:67
- SSL error:10000080:BIO routines::no such file: ../crypto/bio/bss_file.c:75
sign-file: /usr/src/linux-headers-6.1.0-39-common/output/signing_key.pem
  DEPMOD  /lib/modules/6.1.0-39-amd64
Warning: modules_install: missing 'System.map' file. Skipping depmod.
make[1]: Leaving directory '/usr/src/linux-headers-6.1.0-39-amd64'
```

SSL sign-file warnings seem harmless so I will not care about them. And depmod skipped again. Same fix.

```bash
sudo depmod -a
sudo modprobe facetimehd
v4l2-ctl --list-devices
```

```
Apple Facetime HD (PCI:0000:02:00.0):
      /dev/video0
```

Great!

Now I have to ensure I don't have to rebuild it every time I upgrade kernel in the future. Hello DKMS!

```bash
sudo apt update
sudo apt install dkms
sudo mkdir -p /usr/src/facetimehd-0.6.13
sudo cp -r /tmp/bcwc_pcie/* /usr/src/facetimehd-0.6.13/
sudo dkms add -m facetimehd -v 0.6.13
sudo nano /usr/src/facetimehd-0.6.13/dkms.conf
```

And overwrite the deprecated feature of `MODULES_CONF` that previously existed in the dated git repository:

```conf
PACKAGE_NAME="facetimehd"
PACKAGE_VERSION="0.6.13"
CLEAN="make clean"
MAKE[0]="make KERNELDIR=/lib/modules/${kernelver}/build"
BUILT_MODULE_NAME[0]="facetimehd"
BUILT_MODULE_LOCATION[0]="."
DEST_MODULE_LOCATION[0]="/updates/dkms"
AUTOINSTALL="yes"
```
Then adding it to DKMS should do the job:

```bash
sudo dkms add -m facetimehd -v 0.6.13
sudo dkms build -m facetimehd -v 0.6.13
sudo dkms install -m facetimehd -v 0.6.13
```

This should fix it for future kernel versions. Hopefully.


## Part X: Chinese & 小鹤双拼

Added 10/09/2025.

This part was surprisingly easy. First I installed `fcitx5`. Then I configured `fcitx5`. Then I went to `Fcitx Configuration > Addons > Classic User Interface > Font` to increase the font size because it was really small. There we go, Chinese!

P.S. I use Xiaohe Double Pinyin, btw. Configuring the input methods for that is really simple, actually:

1. Add a group.
2. Add the Shuangpin input method from the right column by double clicking `Shuangpin` after finding it through search.
3. Click Shuangpin on the left column to select it.
4. Press the Settings icon in the middle
5. Switch `Shuangpin Profile` to `Xiaohe`.

Finally I can type Chinese on the laptop after a week of having installed MX Linux. Bless.

![Pinyin Config](/blog/posts/old-macbook/img/xnheconfig.png)

![Pinyin Final Demo](/blog/posts/old-macbook/img/xnhedemo.png)

## Part XI: Backing Up

Added 22/09/2025.

I need to be safe. Let's back up the device. For this I used a live USB stick containing CloneZilla, and I chose expert mode this time since I needed CloneZilla to help rescue if anything went wrong. 

#### Booting

After plugging in both the CloneZilla and the storage (backup) USB sticks, I held down `option` while pressing the power button to boot into the live USB, as per usual procedure for the 2014 Macbook Air model, and selected the CloneZilla USB to boot into.

At the first selection menu, I used the default `VGA 800x600` version of CloneZilla, with one edit: I have mentioned above that all boot parameters in GRUB needed to include `intel_iommu=off` in order to detect my SSD drive on this machine, so booting from CloneZilla needed that as well. 

#### Cloning

Here's the TLDR: `/usr/sbin/ocs-sr -q2 -c -j2 -ntfs-ok -rescue -z9p -i 4096 -fsck-y -senc -plu -p poweroff savedisk 2025-09-21-21-img sda`. Of course, I picked these options separately in the TUI mode, but this is a more straightforward way to put forth the options.

Explanations:
- `ntfs-ok`: Skip ntfs integrity check.
- `rescue`: If disk blocks read errors, skip & continue the next one (failing SSD hence this).
- `fsck-y`: Checks & repairs file system before cloning
- `sda`: Clones `/dev/sda`. `sda1` is my root, `sda2` is home, and `sda3` should be swap.

I backed all of this up into a 128GB USB stick, which is plenty for my system since there has not been much usage in terms of storage. Thanks to using `device-image` backup, the size of the backup is only around 15GB. I renamed the backup folder to `2025-09-21-21-mxlinux-img` so as not to confuse with my Ubuntu backup. 

Wonderful. 

## Future Improvements & Final Words

The machine is still quite bare even after all the customisations, and I believe I will come to make many more modifications to it as I daily (or rather nightly) drive it. One day, I may get an SSD that is not starting to corrupt and transfer everything out (apparently the erosion snowballs), but that is only after I replace the battery as well. Let's not get ahead of ourselves here – this Macbook's power is still on life support. Here are some things on the future roadmap:

- REPLACE THE BATTERY
- REPLACE THE SSD
- ~~Chinese Pinyin using Fcitx (subsequently, FlyPY / Xiaohe Shuangpin)~~ DONE!
- Automation scripts?
- Power management with TLP

The computer is now capable of everyday tasks such as document editing and basic entertainment with Youtube and Bilibili, not to mention these are being done at lightning-fast speeds thanks to the XFCE desktop environment. The only pity is that there is only 4GB of memory, which is SOLDERED onto the logic board. Nonetheless, I am quite content with how this installation has turned out, and although I get somewhat sentimental thinking about the now-wiped Windows 7 system that has spent ten years with me, this breathing of new air into the Macbook Air (haha... get it...) is sure to bring us to new heights.

> Arch next time, btw.


![Arch meme](/blog/posts/old-macbook/img/iusearchbtw.png)