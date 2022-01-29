def CWE78_OS_injection()
    puts "Enter command to execute:"
    cmd = gets
    system cmd
end


CWE78_OS_injection()
