@echo off
cd /d "%~dp0"
echo Starting UST NJ local preview at http://localhost:8080
echo Press Ctrl+C to stop.
start "" "http://localhost:8080"
python -m http.server 8080
if errorlevel 1 (
  echo Python not found. Opening index.html directly...
  start "" "%~dp0index.html"
  pause
)
