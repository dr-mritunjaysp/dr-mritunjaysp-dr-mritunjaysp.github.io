@echo off
set "FLIPNEST_FILE=%~dp0Flip Clock.scr"
powershell -NoProfile -Command "$p=[Diagnostics.ProcessStartInfo]::new($env:FLIPNEST_FILE,'/c'); $p.UseShellExecute=$false; [Diagnostics.Process]::Start($p) | Out-Null"
