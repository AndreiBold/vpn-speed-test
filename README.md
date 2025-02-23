# 🚀 VPN Speed Test Project

The **VPN Speed Test Project** measures internet speed **with and without a VPN**, using:

- **Download & Upload Speed (Mbps)**
- **Ping Latency (ms)**
- **VPN Connection Time (sec)**

The project integrates with **ExpressVPN** and uses **Speedtest CLI** to perform speed tests across different VPN locations.

---

## Setup & Installation

### **1️⃣ Enable Virtualization (BIOS)**

Enabled **virtualization** from my **BIOS settings** to support **WSL2**.

### **2️⃣ Configure WSL2 (Windows Subsystem for Linux)**

#### **Installed WSL2 with Ubuntu 24.04.1 LTS (from PowerShell as Administrator)**

```powershell
wsl --install -d Ubuntu
```

#### **Created Ubuntu User**

#### **Updated Ubuntu Packages**

```bash
sudo apt update && sudo apt upgrade -y
```

---

### **3️⃣ Install Node.js (Using NVM)**

#### **Installed NVM**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc  # Reload shell configuration
```

#### **Installed Node.js (Version 20)**

```bash
nvm install 20.13.0
nvm use 20.13.0
```

---

### **4️⃣ Install ExpressVPN**

#### **Created an ExpressVPN Account**

1. **Subscribed** on the [ExpressVPN website](https://www.expressvpn.com/)
2. **Obtained an activation code** from my account.

#### **Downloaded and Installed ExpressVPN CLI for Linux**

1. Downloaded the `.run` installation file from the ExpressVPN website.
2. Moved it to the WSL environment:
   ```bash
   mv /mnt/c/Users/YOUR_USER/Downloads/expressvpn-linux-universal-X.X.X.run ~/
   ```
3. Changed ownership (needed in my case):
   ```bash
   sudo chown $USER:$USER expressvpn-linux-universal-X.X.X.run
   ```
4. Granted execution permissions:
   ```bash
   chmod +x expressvpn-linux-universal-X.X.X.run
   ```
5. Installed ExpressVPN:
   ```bash
   ./expressvpn-linux-universal-X.X.X.run
   ```

#### **Activate ExpressVPN**

1. **Created a token file with my activation code:**
   ```bash
   echo "MY_ACTIVATION_CODE" > xvtokenfile
   ```
2. **Login using the token:**
   ```bash
   expressvpnctl login xvtokenfile
   ```

#### **Connect & Disconnect via CLI**

- **Connect to a VPN location:**
  ```bash
  expressvpnctl connect some_location
  ```
- **Disconnect VPN:**
  ```bash
  expressvpnctl disconnect
  ```

---

### **5️⃣ Install Project Dependencies**

#### **Clone my repo**

```bash
git clone https://github.com/AndreiBold/vpn-speed-test.git
cd vpn-speed-test
```

#### **Install Dependencies**

```bash
npm install
```

#### **Install Speedtest CLI**

```bash
sudo apt install curl
curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | sudo bash
sudo apt install speedtest
```

---

## **Running the VPN Speed Test**

1️⃣ **Configured `locations.json`:**

```json
{
  "locations": [
    { "country": "Netherlands", "city": "Amsterdam" },
    { "country": "Romania", "city": "Bucharest" },
    { "country": "Canada", "city": "Toronto" }
  ]
}
```

2️⃣ **Scripts:**

```bash
npm run start ## start app
```

```bash
npm run test ## test app
```

```bash
npm run build ## build app
```

```bash
npm run lint ## lint againts TS compile errors
```

3️⃣ **Test results in `results.json`:**

```bash
cat results.json
```

---

## **Development Considerations**

**To improve accuracy, I had to include:**  
**Retries if Speedtest CLI fails** (due to network fluctuation, DNS errors, slow responses).  
**A small delay before retrying to avoid immediate repeated failures.**  
**Increased timeout for VPN connections** (some locations like Canada take longer to connect).  
**Verification that the VPN is actually connected before running the test.** (expressvpnctl status)

Thanks for taking an interest into my profile and work! 😊
