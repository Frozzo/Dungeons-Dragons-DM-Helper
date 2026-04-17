@echo off
setlocal

echo Chiusura processi su porte 4173 e 5173...

for %%P in (4173 5173) do (
  for /f "tokens=5" %%A in ('netstat -ano ^| findstr :%%P ^| findstr LISTENING') do (
    echo Terminazione PID %%A sulla porta %%P
    taskkill /F /PID %%A >nul 2>nul
  )
)

echo Operazione completata.
pause

endlocal
