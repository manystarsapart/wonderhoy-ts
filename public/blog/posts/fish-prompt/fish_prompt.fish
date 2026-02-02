# ~/.config/fish/functions/fish_prompt.fish

# ========================================================

function fish_prompt --description 'prompt for dev'

	# ====================================
	# SETUP

    # return status of prev. command
    set -l last_pipestatus $pipestatus
    set -lx __fish_last_status $status # export: __fish_print_pipestatus

	# ====================================
    # EXEC TIME (PROCESSES LONGER THAN 3S)

    set -l exec_time_info
    if test -n "$CMD_DURATION"
        if test $CMD_DURATION -gt 3000  
            set -l duration (math $CMD_DURATION / 1000)
            set exec_time_info (set_color yellow)" Exec Time: $duration"s(set_color normal)
        end
    end
    
	# ====================================
    # GIT (BRANCH & STATUS)

    set -l git_branch
    set -l git_status
    if git rev-parse --git-dir >/dev/null 2>&1
        set git_branch (git branch --show-current 2>/dev/null)
        if test -z "$git_branch"
            set git_branch (git rev-parse --short HEAD 2>/dev/null)
        end
        
        # status indicators
        set -l git_dirty ""
        if not git diff --quiet 2>/dev/null
            set git_dirty "*"  # modified
        end
        if not git diff --cached --quiet 2>/dev/null
            set git_dirty "$git_dirty+"  # staged
        end
        if test (git status --porcelain 2>/dev/null | grep "^??" | wc -l) -gt 0
            set git_dirty "$git_dirty?"  # untracked
        end
        
        if test -n "$git_branch"
            set git_status (set_color yellow)" git:("(set_color green)"$git_branch"(set_color red)"$git_dirty"(set_color yellow)")"(set_color normal)
        end
    end
    
    # ====================================
    # NODE VERSION 

    set -l node_info
    if test -f package.json # checks for package.json
        if command -v node >/dev/null 2>&1
            set -l node_version (node --version 2>/dev/null | string replace 'v' '')
            set node_info (set_color cyan)" node:$node_version"(set_color normal)
        end
    end
    
    # ====================================
    # PYTHON VENV

    set -l venv_info
    if test -n "$VIRTUAL_ENV" # checks for var
        set -l venv_name (basename "$VIRTUAL_ENV")
        set venv_info (set_color magenta)" venv:$venv_name"(set_color normal)
    end
    
    # ====================================
    # DOCKER 

    set -l docker_info
    if command -v docker >/dev/null 2>&1
        set -l docker_context (docker context show 2>/dev/null)
        if test "$docker_context" != "default"
            set docker_info (set_color blue)" docker:$docker_context"(set_color normal)
        end
    end

    # ====================================
    # JOBS IN BACKGROUND

    set -l jobs_info
    set -l job_count (jobs | wc -l | string trim)
    if test $job_count -gt 0
        set jobs_info (set_color red)" [$job_count job"(test $job_count -gt 1; and echo "s"; or echo)"]"(set_color normal)
    end
    
    # ====================================
    # ALERT DISK SPACE

    set -l disk_info
    # last line of df --> 5th field (% of disk space) 
    set -l disk_usage (df . 2>/dev/null | tail -1 | awk '{print $5}' | string replace '%' '') 
    if test -n "$disk_usage" -a $disk_usage -gt 90
        set disk_info (set_color red)" disk:$disk_usage%"(set_color normal)
    end
    
    # ====================================
    # CHECK IF DIR IS READ ONLY

    set -l write_info
    if not test -w .
        set write_info (set_color red)" (read-only)"(set_color normal)
    end
    
    # ====================================
    # PROMPT SYMBOLS (BASED ON CONTEXT)

    set -l prompt_symbol ">"
    if git rev-parse --git-dir >/dev/null 2>&1 # git
        set prompt_symbol "±" 
    else if test -f package.json # node
        set prompt_symbol "⬢"
    else if test -f requirements.txt -o -f setup.py -o -f pyproject.toml # py
        set prompt_symbol "🐍" 
    end
    
    # ====================================
    # DIR PATH GRADIENT

    function get_gradient_colour --argument depth
        switch $depth
            case 1 2
                echo "22c55e"  # gren
            case 3
                echo "65d855"  # light green
            case 4
                echo "a8e852"  # yellow green
            case 5
                echo "eab308"  # yellow
            case 6
                echo "f59e0b"  # orange
            case '*' # depth >= 7
                echo "ef4444"  # red
        end
    end
    
    function format_gradient_path
        set -l path_parts (string split '/' $PWD)
        set -l non_empty_parts
        
        # remove empty
        for part in $path_parts
            if test -n "$part"
                set non_empty_parts $non_empty_parts $part
            end
        end
        
        if test (count $non_empty_parts) -gt 5 # depth >5
            set -l formatted_path ""
            set -l depth 1
            set -l num_to_shorten (math (count $non_empty_parts) - 5)
            
            for i in (seq 1 $num_to_shorten) # first letter of shortened dirs
                set -l part $non_empty_parts[$i]
                set -l first_letter (string sub -l 1 $part)
                set -l colour (get_gradient_colour $depth)
                set formatted_path "$formatted_path"(set_color 6b7280)"/"(set_color normal)(set_color $colour)"$first_letter"(set_color normal)
                set depth (math $depth + 1)
            end
            
            for i in (seq (math $num_to_shorten + 1) (count $non_empty_parts)) # last 5 dirs (full)
                set -l part $non_empty_parts[$i]
                set -l colour (get_gradient_colour $depth)
                set formatted_path "$formatted_path"(set_color 6b7280)"/"(set_color normal)(set_color $colour)"$part"(set_color normal)
                set depth (math $depth + 1)
            end
            
            echo $formatted_path
        else
            set -l formatted_path ""
            set -l depth 1
            
            for part in $non_empty_parts
                set -l colour (get_gradient_colour $depth)
                set formatted_path "$formatted_path"(set_color 6b7280)"/"(set_color normal)(set_color $colour)"$part"(set_color normal)
                set depth (math $depth + 1)
            end
            
            if test "$PWD" = "/" # root
                set formatted_path (set_color 22c55e)"/"(set_color normal)
            else if test -z "$formatted_path"
                set formatted_path (set_color 22c55e)"/"(set_color normal)
            end
            
            echo $formatted_path
        end
    end

    set -l gradient_path (format_gradient_path)
    
    # ====================================
    # CONTEXT LINE

    set -l context_line
    if test -n "$git_status$node_info$venv_info$docker_info$k8s_info$jobs_info$disk_info$write_info$exec_time_info"
        set context_line "$git_status$node_info$venv_info$docker_info$k8s_info$jobs_info$disk_info$write_info$exec_time_info"
    end
    
    if functions -q fish_is_root_user; and fish_is_root_user # colour change if root
        printf '%s@%s %s# ' $USER (prompt_hostname) $gradient_path
    else
        set -l status_colour (set_color $fish_colour_status)
        set -l statusb_colour (set_color --bold $fish_colour_status)
        set -l pipestatus_string (__fish_print_pipestatus "[" "]" "|" "$status_colour" "$statusb_colour" $last_pipestatus)
        
        # Error: [status code] instead of just [status code]
        if test $__fish_last_status -ne 0
            set pipestatus_string (set_color red)"Error: "(set_color normal)$pipestatus_string
        end
        
        # prints context line if context line
        if test -n "$context_line"
            printf '%s%s%s\n' (set_color --dim)"├─"(set_color normal) $context_line
        end
        
        # MAIN PROMPT LINE
        printf '[%s] %s%s@%s %s %s%s \n%s ' (date "+%H:%M:%S") (set_color brblue) \
            $USER (prompt_hostname) $gradient_path (set_color normal) $pipestatus_string \
            (set_color normal) $prompt_symbol
    end
end

# ========================================================