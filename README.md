# Chroma Server Setup

This guide explains how to set up and run a Chroma server in a Python virtual environment on Linux or Windows.

## Prerequisites
- Python 3.7+
- Linux: Install `libsqlite3-dev build-essential`:
  ```bash
  sudo apt update && sudo apt install libsqlite3-dev build-essential -y
  ```
- Windows: Ensure Python and `pip` are installed.

## Setup Instructions

1. **Create Virtual Environment**
   ```bash
   python3 -m venv venv
   python -m venv venv
   ```

2. **Activate Virtual Environment**
   - Linux:
     ```bash
     source venv/bin/activate
     ```
   - Windows:
     ```bash
     venv\Scripts\activate
     ```

3. **Install Chroma**
   ```bash
   pip install chromadb
   pip freeze > requirements.txt
   ```

4. **Run Chroma Server**
   ```bash
   chroma run --path ./chroma
   ```
   Server runs on `http://localhost:8000`. Verify:
   ```bash
   curl http://localhost:8000/api/v1
   ```