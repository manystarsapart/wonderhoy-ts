# ~/.config/fish/config.fish

if status is-interactive
# Commands to run in interactive sessions can go here

fish_add_path ~/.local/bin

# general
abbr -a c clear 
abbr -a l ls -lha
abbr -a lr ls -lhaR
abbr -a copy --position anywhere --set-cursor "% | xclip -selection clipboard"
abbr -a fp 'fish --private -C "clear && set_color brred; echo \"Started fish in private mode.\"; set_color normal"'

# greeting
abbr -a fg 'fish_greeting'

set_color normal
echo "Private mode: fp; Help: commands"
 


function fish_greeting
    echo -e "\n"
    set_color yellow

    set gmt_offset 8
    
    # current hour
    set -l hour (math (date +%H) + $gmt_offset)
    
    # STANDARD
    set -l standardA "星藏点雪 月隐晦明 拙山枯水大江行" "雪落无声 内存不染" "山棱崩摧处 正是重构时" "云山万行 终归终端" "青铜鼎铭文 恰似注释生"
    
    set -l standardB "开发者，舟已泊岸" "开发者，可续前卷" "航图在此，请执罗盘" "迷局终有解，请续前因" "节点皆在线，共识待签" "终端候君久矣" "观测者模式就绪" "开发者，可启新栈" "沙盘已重置，请落子"
    
    # INIT TIME-SPECIFIC LITS
    set -l timeA
    set -l timeB
    
    # ge: >=
    # lt: <
    
    # morning (0500-0900)
    if test $hour -ge 5 -a $hour -lt 9 
        set timeA "城市霓虹渐熄" "昨夜梦的残影正被神经网路解析" "雾散千山显 依赖已解析" "朝雀鸣林间 线程初唤醒" "曦光拂日志 昨夜无异常"
        set timeB "破晓时分，请执新钥" "朝云初卷，待君提交" "新日升，可重构山河" "愿君今日有新枝" "早上好喵！今天也要元气满满的喵！"
    
    # midday (0900-1700)
    else if test $hour -ge 9 -a $hour -lt 17
        set timeA "行云过千峰 数据汇江海" "柱立激流 主键镇八荒" "浮生半日无bug" "落花浮水 指针自流转"
        set timeB "开发者，正午当优化" "开发者，请执刻刀" "烈日当空，请覆写冗余" "代码田园待耕耘" "加油加油！要相信自己喔 ☆"
    
    # evening (1700-2000)
    else if test $hour -ge 17 -a $hour -lt 20
        set timeA "黄昏的天空，在我看来，像一扇窗户，一盏灯火，灯火背后的一次等待。" "归鸟栖金枝 闭包纳余晖" "暮霭染层林 缓存镀暖色" "冷却塔呼出蔷薇色蒸汽" "所有委屈可兑换星辰"
        set timeB "开发者，暮色宜合卷" "建议执行精神垃圾回收" "一起看看窗外的夕阳吧 ♡"
    
    # night (2000-0500)
    else
        set timeA "梦如人生 梦入长卷" "山峰如群儿之喧嚷，举起他们的双臂，想去捉天上的星星。" "月照空潭 日志无涟漪" "旧城烟雨里 遗留系统眠" "寒星缀穹顶 指针巡天轨" "神经网络的星云缓慢旋转" "猫的脚步踩过静音的城市"
        set timeB "子夜清寂，待启新程" "梦的服务器向所有人开放" "夜航者，星河可导航" "开发者，静夜宜深潜" "星图浩瀚，君执观测镜" "烛影摇红，待破解谜题" "（哈欠）有点困了喵。你也早点休息喵。"
    end
    
 
 
    set -l combinedA $standardA $timeA
    set -l combinedB $standardB $timeB
    
    set -l chosenA (random choice $combinedA)
    set -l chosenB (random choice $combinedB)
    
    if test "$argv[1]" = "-la"
        echo "Standard List A:"
        for item in $standardA
            echo "  $item"
        end
        echo -e "\nTime-specific List A (current time):"
        for item in $timeA
            echo "  $item"
        end
        echo -e "\nStandard List B:"
        for item in $standardB
            echo "  $item"
        end
        echo -e "\nTime-specific List B (current time):"
        for item in $timeB
            echo "  $item"
        end
    else 
	echo -e "$chosenA\n          —— $chosenB"
        echo -e "\n"
    end
end
end