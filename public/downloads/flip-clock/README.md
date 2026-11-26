# Flip Clock for Windows

Flip Clock is a native Windows screensaver. It needs no Python runtime or additional packages.

## Install

Double-click `Flip Clock Setup.exe`. It asks for an optional display name, installs the clock, icon, license, and terms in `%LOCALAPPDATA%\FlipNest`, creates desktop shortcuts for the clock and settings, selects Flip Clock with a five-minute timeout, and opens Windows Screen Saver Settings. Choose Flip Clock and click **Apply**. The setup executable is self-contained; no other distribution files are needed during installation.

The install folder contains the screensaver, settings and launch helpers, readme, license, terms, previews, icon, and uninstall script. Run `Uninstall Flip Clock.ps1` from that folder to remove the app and its shortcuts.

## Settings

Use Windows Screen Saver Settings > Settings or the desktop **Flip Clock Settings** shortcut to customize 12/24-hour time, portrait orientation, brightness, flip cards, clock size, digit and text font size, seconds, displays, name color, and whether the date, name, and quote are shown. The date includes the year; one of 100 quotes changes hourly. The name is optional and editable later in settings.

Double-click `Flip Clock.scr` in the install folder to run immediately. Mouse movement or any key exits. The screensaver supports `/s` (run), `/c` (settings), and `/p` (embedded preview). Preferences are saved under `HKCU\Software\FlipNest`. The clock shows hours, minutes, and seconds by default; the seconds card cycles through accent colors.

See [LICENSE.txt](LICENSE.txt) and [TERMS.txt](TERMS.txt). This is an independent implementation; the Fliqlo executable is not modified or redistributed.
