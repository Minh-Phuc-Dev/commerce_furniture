@echo off
cd Chroma || (
    echo Error: Chroma directory not found
    exit /b 1
)
call .\venv\Scripts\activate.bat || (
    echo Error: Failed to activate virtual environment
    exit /b 1
)
chroma run || (
    echo Error: Failed to run chroma
    exit /b 1
)