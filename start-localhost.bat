@echo off
setlocal
cd /d "%~dp0"
set PORT=8000

echo ========================================
echo        CyberSafe - Servidor local
echo ========================================
echo.
echo Pasta do projeto: %CD%
echo URL: http://127.0.0.1:%PORT%/
echo.
echo Mantenha esta janela aberta enquanto usar o site.
echo Para encerrar o servidor, pressione Ctrl+C.
echo.

where py >nul 2>&1
if %errorlevel%==0 goto PYLAUNCHER

where python >nul 2>&1
if %errorlevel%==0 goto PYTHON

echo ERRO: Python nao foi encontrado no Windows.
echo Instale Python 3 e marque a opcao "Add Python to PATH".
pause
exit /b 1

:PYLAUNCHER
start "CyberSafe HTTP Server" cmd /k "cd /d "%~dp0" && py -m http.server %PORT% --bind 127.0.0.1"
goto OPEN

:PYTHON
start "CyberSafe HTTP Server" cmd /k "cd /d "%~dp0" && python -m http.server %PORT% --bind 127.0.0.1"

goto OPEN

:OPEN
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:%PORT%/"
exit /b 0
