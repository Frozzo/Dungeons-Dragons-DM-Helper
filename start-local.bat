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

echo [1/2] Build progetto...
call npm run build
if errorlevel 1 (
  echo [ERROR] Build fallita.
  pause
  exit /b 1
)

echo [2/2] Avvio server locale su http://127.0.0.1:4173 ...
start "" http://127.0.0.1:4173
call npm run serve:dist

endlocal