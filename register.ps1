$e   = 'C:\Users\demil\Documents\BlockCode\node_modules\.bin\electron.cmd'
$a   = 'C:\Users\demil\Documents\BlockCode'
$i   = 'C:\Users\demil\Documents\BlockCode\node_modules\electron\dist\electron.exe'
$cmd = "`"$e`" `"$a`" `"%1`""

function Write-Key($base, $cmdVal) {
    New-Item "$base\command" -Force | Out-Null
    Set-ItemProperty $base '(Default)' 'Open with BlockCode'
    Set-ItemProperty $base 'Icon' $i
    Set-ItemProperty "$base\command" '(Default)' $cmdVal
}

Write-Key 'Registry::HKEY_CURRENT_USER\Software\Classes\*\shell\BlockCode' $cmd
Write-Key 'HKCU:\Software\Classes\Directory\shell\BlockCode'               $cmd
Write-Key 'HKCU:\Software\Classes\Directory\Background\shell\BlockCode'    ($cmd -replace '%1','%V')

Write-Host 'Keys written. Restarting Explorer...'
Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
