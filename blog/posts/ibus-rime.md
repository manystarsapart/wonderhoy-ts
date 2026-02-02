---
title: 'Expanding & Customising IBus Rime'
pubDate: 2025-09-20
description: 'I got to customising the looks of my input method (because the original font size was too small), and subsequently chanced upon the community-driven project of Rime word bank expansion.'
author: 'msa'
image:
    url: '/blog/posts/ibus-rime/img/lunaextended.png'
    alt: 'IBus Rime expansion bank'
tags: ["Linux", "Tech-Journal"]
---

# Expanding & Customising IBus Rime

## Preface

I have been typing in Chinese using double pinyin (双拼) for around one or two years now. When I first started using Ubuntu, I was pleasantly surprised to find good 小鹤双拼 (Flypy / Xiaohe Double Pinyin) integration in the [Rime](https://rime.im/) engine. However, **the word bank that came with rime seemed very small**. Despite all that, I persevered and simply used the suboptimal word bank for all this while.

This time however, I got to customising the looks of my input method (because the original font size was too small), and subsequently chanced upon the community-driven project of Rime word bank expansion. WOAHH.

## Part I: Style

This was pretty straightforward. I used the GNOME Extension [IBus Tweaker](https://extensions.gnome.org/extension/2820/ibus-tweaker/) and edited the style settings. I increased the font size, changed up the colour, and also increased the number of phrases each page from 5 to 7. This is done through navigating to [`~/.config/ibus/rime/default.custom.yaml`](/blog/posts/ibus-rime/yaml/default.custom.yaml) and setting `page_size` to `7`.

Here are my edits, with the images below showing the before & after of the customisation:

![IBus Tweaker Config](/blog/posts/ibus-rime/img/ibustweaker.png)

![Default Custom YAML](/blog/posts/ibus-rime/img/defautcustom.png)

#### Before 
![Before](/blog/posts/ibus-rime/img/before.jpg) 

#### After
![After](/blog/posts/ibus-rime/img/after.jpg) 

## Part II: Word Bank Extension

I based the Luna Pinyin Extension config file ([`luna_pinyin.extended.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.extended.dict.yaml)) off [zhangheng18's rime-dict repo](https://github.com/zhangheng18/rime-dict/), but made some edits. I had also included some YAMLs from [Iorest's rime-dict repo](https://github.com/Iorest/rime-dict) as it seemed to include more word banks. It even had an ACG word bank. Bless all contributors who made these word banks possible.

Additionally, I added my own yaml file ([`luna_pinyin.selfdefined.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.selfdefined.dict.yaml)) to define my own terms for easy access to these words. This should be quite convenient.

> [!NOTE]
> When defining your own dictionary, **do not include any comments** in the data section! 

If you are expanding your IBus Rime as well, do remember to redeploy Rime either by pressing redeploy (部署) in the input method settings OR running `ibus-daemon -drx`. I think that redeploys as well. Do note that the first redeploy job after putting these yamls in will take a little bit of time.

Here are the exact steps I took:

1. Add the `.yaml` files into the `~/.config/ibus/rime` directory.
2. Configure `luna_pinyin.extended.dict.yaml` to include / exclude the dictionaries you want / do not want to include.
3. If using double pinyin, add a `double_pinyin_(DOUBLE_PINYIN_NAME).custom.yaml`. For flypy, it would be `double_pinyin_flypy.custom.yaml`.
4. Redeploy using `rm ~/.config/ibus/rime/default.yaml && ibus-daemon -drx` and wait until the redeployment finishes.


### YAML Content

#### Luna Extended
![Luna Extended YAML](/blog/posts/ibus-rime/img/lunaextended.png)

## Files

1. [`default.custom.yaml`](/blog/posts/ibus-rime/yaml/default.custom.yaml)
2. [`double_pinyin_flypy.custom.yaml`](/blog/posts/ibus-rime/yaml/double_pinyin_flypy.custom.yaml)

---

3. [`luna_pinyin.extended.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.extended.dict.yaml) 

---

4. [`luna_pinyin.anime.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.anime.dict.yaml)
5. [`luna_pinyin.basis.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.basis.dict.yaml)
6. [`luna_pinyin.chat.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.chat.dict.yaml)
7. [`luna_pinyin.computer.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.computer.dict.yaml)
8. [`luna_pinyin.daily.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.daily.dict.yaml)
9. [`luna_pinyin.hanyu.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.hanyu.dict.yaml)
10. [`luna_pinyin.idiom.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.idiom.dict.yaml)
11. [`luna_pinyin.name.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.name.dict.yaml)
12. [`luna_pinyin.net.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.net.dict.yaml)
13. [`luna_pinyin.selfdefined.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.selfdefined.dict.yaml)
14. [`luna_pinyin.sougou.dict.yaml`](/blog/posts/ibus-rime/yaml/luna_pinyin.sougou.dict.yaml)


Here's my file structure for reference: [File Structure](/blog/posts/ibus-rime/filestructure.txt)


## Final Words & Future Steps

I'm surprised the extended dictionaries are in such a niche corner of the internet. Maybe every IBus Rime user is a power user and I am living under a rock, but now I am armed with a much larger arsenal of words. 

I saw in the documentation that Rime actually supports Suzhou-Pinyin (Soutzoe) typing. One day I will learn to use it. 


## References
- <https://github.com/Iorest/rime-dict>
- <https://github.com/zhangheng18/rime-dict/>
- <https://www.cnblogs.com/keatonlao/p/12983158.html>
- <https://blog.csdn.net/ken2232/article/details/144545853>
- <https://wiki.archlinux.org/title/Rime>
- <https://sspai.com/post/90068>
- <https://tieba.baidu.com/p/5602640654#>
