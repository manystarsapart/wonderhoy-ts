# ~/.config/fish/functions/fish_prompt.fish

# ========================================================

function fish_prompt --description 'prompt for dev ON IPHONE LOL'

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
    # JOBS IN BACKGROUND

    set -l jobs_info
    set -l job_count (jobs | wc -l | string trim)
    if test $job_count -gt 0
        set jobs_info (set_color red)" [$job_count job"(test $job_count -gt 1; and echo "s"; or echo)"]"(set_color normal)
    end
    
    # ====================================
    # CHECK IF DIR IS READ ONLY

    set -l write_info
    if not test -w .
        set write_info (set_color red)" (read-only)"(set_color normal)
    end
    
    # ====================================
    # PROMPT SYMBOL

    set -l prompt_symbol ">"
    
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
    if test -n "$jobs_info$write_info$exec_time_info"
        set context_line "$jobs_info$write_info$exec_time_info"
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