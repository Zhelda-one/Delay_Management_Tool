 **리눅스용 / 윈도우 PowerShell용**

* **리눅스 서버 IP**: `10.48.238.180`
* **윈도우 PC IP**: `192.168.1.237`
* **Dashboard 포트**: `5000`
* **Timing Tool 포트**: `5001`

---

# 1. 리눅스에서 실행할 때

작업 폴더:

```bash
/home/sungpark/DelayManagementTool
```

## 1-1) 폴더 이동 + 가상환경 활성화

```bash
cd /home/sungpark/DelayManagementTool
source .venv/bin/activate
```

## 1-2) 패키지 설치

```bash
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

통합 설치가 필요하면:

```bash
pip install flask streamlit pandas numpy openpyxl reportlab svglib cairosvg
```

---

## 1-3) 포트 사용 여부 확인

```bash
ss -lntp | grep -E "5000|5001"
```

특정 포트만:

```bash
ss -lntp | grep 5000
ss -lntp | grep 5001
```

어떤 프로세스가 쓰는지:

```bash
lsof -i :5000
lsof -i :5001
```

---

## 1-4) Timing Tool 실행

```bash
cd /home/sungpark/DelayManagementTool
source .venv/bin/activate
nohup .venv/bin/streamlit run app.py --server.address 0.0.0.0 --server.port 5001 > streamlit_timing.log 2>&1 &
```

확인:

```bash
ss -lntp | grep 5001
curl -I http://127.0.0.1:5001
```

---

## 1-5) Dashboard 실행

```bash
cd /home/sungpark/DelayManagementTool
source .venv/bin/activate
export FLASK_SECRET_KEY='change-this-secret'
export TIMING_APP_URL='http://10.48.238.180:5001'
nohup .venv/bin/python app_unified.py > flask_dashboard.log 2>&1 &
```

확인:

```bash
ss -lntp | grep 5000
curl -I http://127.0.0.1:5000
```

---

## 1-6) 두 개 한 번에 실행

```bash
cd /home/sungpark/DelayManagementTool
source .venv/bin/activate

nohup .venv/bin/streamlit run app.py --server.address 0.0.0.0 --server.port 5001 > streamlit_timing.log 2>&1 &

export FLASK_SECRET_KEY='change-this-secret'
export TIMING_APP_URL='http://10.48.238.180:5001'
nohup .venv/bin/python app_unified.py > flask_dashboard.log 2>&1 &
```

---

## 1-7) 로그 확인

```bash
tail -f streamlit_timing.log
tail -f flask_dashboard.log
```

---

## 1-8) 종료

```bash
pkill -f "streamlit run app.py"
pkill -f "python app_unified.py"
```

특정 PID 종료:

```bash
kill <PID>
kill -9 <PID>
```

---

## 1-9) 방화벽 오픈

Ubuntu UFW:

```bash
sudo ufw allow 5000/tcp
sudo ufw allow 5001/tcp
sudo ufw reload
sudo ufw status
```

---

# 2. 윈도우 PowerShell에서 실행할 때

작업 폴더:

```powershell
C:\Users\ssangpipark\Documents\DelayManagementTool
```

## 2-1) 폴더 이동 + 가상환경 활성화

```powershell
cd C:\Users\ssangpipark\Documents\DelayManagementTool
.\.venv\Scripts\Activate.ps1
```

---

## 2-2) 패키지 설치

```powershell
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

필요시:

```powershell
pip install flask streamlit pandas numpy openpyxl reportlab svglib cairosvg
```

---

## 2-3) 포트 확인

```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :5001
```

---

## 2-4) Timing Tool 실행

```powershell
cd C:\Users\ssangpipark\Documents\DelayManagementTool
.\.venv\Scripts\Activate.ps1
streamlit run app.py --server.address 0.0.0.0 --server.port 5001
```

---

## 2-5) Dashboard 실행

```powershell
cd C:\Users\ssangpipark\Documents\DelayManagementTool
.\.venv\Scripts\Activate.ps1
$env:FLASK_SECRET_KEY="change-this-secret"
$env:TIMING_APP_URL="http://192.168.1.237:5001"
python app_unified.py
```

---

## 2-6) 각각 새 창으로 실행

### Timing Tool

```powershell
Start-Process powershell -ArgumentList '-NoExit','-Command','cd "C:\Users\ssangpipark\Documents\DelayManagementTool"; .\.venv\Scripts\Activate.ps1; streamlit run app.py --server.address 0.0.0.0 --server.port 5001'
```

### Dashboard

```powershell
Start-Process powershell -ArgumentList '-NoExit','-Command','$env:FLASK_SECRET_KEY="change-this-secret"; $env:TIMING_APP_URL="http://192.168.1.237:5001"; cd "C:\Users\ssangpipark\Documents\DelayManagementTool"; .\.venv\Scripts\Activate.ps1; python app_unified.py'
```

---

## 2-7) PowerShell 실행 정책 문제 해결

현재 창에서만 임시 허용:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

현재 사용자에 대해 허용:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

스크립트 차단 해제:

```powershell
Unblock-File .\start_timing.ps1
Unblock-File .\start_dashboard.ps1
Unblock-File .\start_all.ps1
```

---

## 2-8) 프로세스 종료

포트로 PID 확인:

```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :5001
```

PID 종료:

```powershell
taskkill /PID <PID> /F
```

또는:

```powershell
Stop-Process -Id <PID> -Force
```

프로세스 보기:

```powershell
Get-Process python,streamlit -ErrorAction SilentlyContinue
```

---

# 3. `.streamlit/config.toml` 만들기

## 3-1) 리눅스

```bash
mkdir -p .streamlit
cat > .streamlit/config.toml <<'EOF'
[server]
headless = true
address = "0.0.0.0"
port = 5001
enableCORS = false
enableXsrfProtection = false

[browser]
gatherUsageStats = false
EOF
```

확인:

```bash
cat .streamlit/config.toml
```

---

## 3-2) 윈도우 PowerShell

```powershell
mkdir .streamlit -ErrorAction SilentlyContinue

@"
[server]
headless = true
address = "0.0.0.0"
port = 5001
enableCORS = false
enableXsrfProtection = false

[browser]
gatherUsageStats = false
"@ | Set-Content .streamlit\config.toml
```

확인:

```powershell
Get-Content .streamlit\config.toml
```

---

# 4. 주소/라우트 확인용 명령

## 4-1) `/timing/` 라우트가 코드에 있는지

윈도우 PowerShell:

```powershell
Select-String -Path .\app_unified.py -Pattern '@app.route\("/timing/"\)|def timing_index'
```

리눅스:

```bash
grep -nE '@app.route\("/timing/"\)|def timing_index' app_unified.py
```

---

## 4-2) wrapper HTML 안에 실제 URL이 무엇인지

리눅스:

```bash
curl -s http://10.48.238.180:5000/timing/ | grep -i "iframe\|5001\|127.0.0.1\|192.168\|10.48"
```

윈도우:

```powershell
curl http://127.0.0.1:5000/timing/
```

---

## 4-3) 코드 안에 localhost 하드코딩 찾기

리눅스:

```bash
grep -R "127.0.0.1" -n .
grep -R "localhost" -n .
```

윈도우:

```powershell
Select-String -Path .\start_all.ps1, .\start_timing.ps1, .\start_dashboard.ps1, .\app_unified.py, .\.streamlit\config.toml -Pattern "0\.0\.0\.1|0\.0\.0\.0|127\.0\.0\.1|192\.168\."
```

---

# 5. 직접 접속 테스트

## 리눅스

```bash
curl -I http://127.0.0.1:5000
curl -I http://127.0.0.1:5001
curl -I http://10.48.238.180:5000
curl -I http://10.48.238.180:5001
```

## 윈도우

```powershell
curl http://127.0.0.1:5000
curl http://127.0.0.1:5001
```

---

# 6. 추천 최종 실행 시나리오

## 리눅스 서버에서 둘 다 실행

```bash
cd /home/sungpark/DelayManagementTool
source .venv/bin/activate

nohup .venv/bin/streamlit run app.py --server.address 0.0.0.0 --server.port 5001 > streamlit_timing.log 2>&1 &

export FLASK_SECRET_KEY='change-this-secret'
export TIMING_APP_URL='http://10.48.238.180:5001'
nohup .venv/bin/python app_unified.py > flask_dashboard.log 2>&1 &
```

접속:

* Dashboard: `http://10.48.238.180:5000`
* Timing: `http://10.48.238.180:5001`

---

## 윈도우에서 둘 다 실행

창 1:

```powershell
cd C:\Users\ssangpipark\Documents\DelayManagementTool
.\.venv\Scripts\Activate.ps1
streamlit run app.py --server.address 0.0.0.0 --server.port 5001
```

창 2:

```powershell
cd C:\Users\ssangpipark\Documents\DelayManagementTool
.\.venv\Scripts\Activate.ps1
$env:FLASK_SECRET_KEY="change-this-secret"
$env:TIMING_APP_URL="http://192.168.1.237:5001"
python app_unified.py
```

접속:

* Dashboard: `http://192.168.1.237:5000`
* Timing: `http://192.168.1.237:5001`

---

# 7. 핵심 포인트만 짧게 정리

* `streamlit`과 `dashboard`는 **포트만 다르면 같이 실행 가능**
* `127.0.0.1`는 **그 브라우저가 있는 PC 자기 자신**
* 원격 접속이면 `TIMING_APP_URL`은 반드시 **실제 서버 IP** 사용
* 리눅스에서는 `export`, `pkill`
* 윈도우 PowerShell에서는 `$env:...`, `taskkill`, `Stop-Process`

원하시면 다음 단계로 **리눅스용 `start_all.sh` / `stop_all.sh`와 윈도우용 `start_all.ps1` / `stop_all.ps1`를 최종본으로 한 번에** 만들어드릴게요.
