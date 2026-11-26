$ErrorActionPreference = 'Stop'
$installDir = Join-Path $env:LOCALAPPDATA 'FlipNest'
$desktop = [Environment]::GetFolderPath('Desktop')
$clock = Join-Path $installDir 'Flip Clock.scr'
$current = (Get-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name SCRNSAVE.EXE -ErrorAction SilentlyContinue).'SCRNSAVE.EXE'
if ($current -and $current -ieq $clock) {
    Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name SCRNSAVE.EXE -Value ''
    Set-ItemProperty -Path 'HKCU:\Control Panel\Desktop' -Name ScreenSaveActive -Value '0'
}
foreach ($name in @('Flip Clock.lnk','Flip Clock Settings.lnk')) {
    Remove-Item -LiteralPath (Join-Path $desktop $name) -Force -ErrorAction SilentlyContinue
}
if (Test-Path $installDir) { Remove-Item -LiteralPath $installDir -Recurse -Force }
Write-Host 'Flip Clock has been removed. Your settings remain under HKCU\Software\FlipNest.'
