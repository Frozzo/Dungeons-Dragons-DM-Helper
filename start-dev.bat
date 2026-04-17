@echo off
setlocal

set "NODE_DIR=C:\Program Files\nodejs"
set "PATH=%NODE_DIR%;%PATH%"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js non trovato. Installa Node LTS e riprova.
  pause
  exit /b 1
)

echo Avvio dev server Vite su http://127.0.0.1:5173 ...
start "" http://127.0.0.1:5173
call npm run dev -- --host 127.0.0.1 --port 5173

endlocal
