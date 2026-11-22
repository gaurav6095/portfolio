/**
 * GAURAV CHAUHAN - RETRO-BRUTALIST ENGINEERING PORTFOLIO JAVASCRIPT
 * Target: Windows Server Administrator | Microsoft 365 Administrator | IT Infrastructure & Cloud Support Engineer
 * Features:
 * - Interactive PowerShell CLI Terminal with custom command interpreter
 * - Quick-run terminal buttons
 * - Dynamic Capability Map filtering across 7 core IT domains
 * - Interactive Project Inspection modal with full architecture breakdowns for 6 real-world projects
 * - One-click Email copy with toast notification
 * - Web Audio API synthesized retro key clicks
 */

document.addEventListener('DOMContentLoaded', () => {
  initTerminal();
  initCapabilityFilters();
  initProjectModals();
  initEmailCopy();
});

// ============================================================================
// 1. INTERACTIVE POWERSHELL TERMINAL
// ============================================================================
function initTerminal() {
  const terminalBody = document.getElementById('terminalBody');
  const termInput = document.getElementById('termInput');
  const termChips = document.querySelectorAll('.term-chip-btn');

  if (!termInput || !terminalBody) return;

  // Command History tracking
  const commandHistory = [];
  let historyIndex = -1;

  // Sound generator using Web Audio API for retro key clicks
  let audioCtx = null;
  function playBeep(freq = 600, duration = 0.04, type = 'square') {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  }

  // Handle Input submission
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = termInput.value.trim();
      if (rawCmd) {
        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;
        executeCommand(rawCmd);
        playBeep(750, 0.05);
      }
      termInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        termInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        termInput.value = '';
      }
    } else {
      playBeep(440, 0.02);
    }
  });

  // Handle Quick Chips
  termChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
        playBeep(880, 0.06);
      }
    });
  });

  function appendOutput(html) {
    const line = document.createElement('div');
    line.className = 'term-output-line';
    line.innerHTML = html;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeCommand(cmd) {
    // Print prompt line
    appendOutput(`<span class="term-prompt">PS C:\\Users\\Gaurav&gt;</span> <span class="term-cmd">${escapeHtml(cmd)}</span>`);

    const cleanCmd = cmd.toLowerCase().trim();

    if (cleanCmd === 'cls' || cleanCmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (cleanCmd === 'help') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div class="term-val">AVAILABLE POWERSHELL COMMANDS:</div>
          <div><span class="term-cmd">Get-Summary</span> - Display engineer profile and current status</div>
          <div><span class="term-cmd">Get-Capabilities</span> - Enumerate 7 core technical domains and stack</div>
          <div><span class="term-cmd">Get-Projects</span> - List 6 real-world infrastructure projects</div>
          <div><span class="term-cmd">Get-Tools</span> - List tools: Windows Server, M365, IIS, MSSQL, MariaDB...</div>
          <div><span class="term-cmd">Get-Experience</span> - Show career background at CloudTechtiq Technologies</div>
          <div><span class="term-cmd">Get-Certifications</span> - List MS-102, CEH Master, CND, Plesk credentials</div>
          <div><span class="term-cmd">Get-Contact</span> - Retrieve contact info &amp; verified email address</div>
          <div><span class="term-cmd">whoami</span> - Inspect active session identity</div>
          <div><span class="term-cmd">ping [host]</span> - Test latency and connectivity</div>
          <div><span class="term-cmd">cls</span> - Clear terminal buffer</div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'get-summary' || cleanCmd === 'summary') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div><span class="term-var">Title</span>      = <span class="term-val">"Windows Server Administrator | Microsoft 365 Administrator"</span></div>
          <div><span class="term-var">Specialization</span> = <span class="term-val">"IT Infrastructure &amp; Cloud Support Engineer"</span></div>
          <div><span class="term-var">Company</span>    = <span class="term-val">"CloudTechtiq Technologies · Jaipur"</span></div>
          <div><span class="term-var">Servers</span>    = <span class="term-val">"Windows Server 2016 / 2019 / 2022 / Active Directory / IIS / RDP"</span></div>
          <div><span class="term-var">Cloud</span>      = <span class="term-val">"Microsoft 365 / Exchange Online / Google Workspace"</span></div>
          <div><span class="term-var">Databases</span>  = <span class="term-val">"MSSQL / MariaDB / MySQL / Backups / Connectivity"</span></div>
          <div><span class="term-var">Automation</span> = <span class="term-val">"PowerShell Scripting / WinRM / Service Automation"</span></div>
          <div><span class="term-var">Status</span>     = <span class="term-success">"OPERATIONAL &amp; AVAILABLE"</span></div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'get-capabilities' || cleanCmd === 'skills' || cleanCmd === 'capabilities') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div class="term-success">=== TECHNICAL CAPABILITY MAP (7 CORE DOMAINS) ===</div>
          <div><span class="term-var">[1. WINDOWS SERVER]</span> 2016/2019/2022, AD DS, User Mgmt, Services, RDP, SMB, Firewall</div>
          <div><span class="term-var">[2. MICROSOFT 365]</span> Tenant Mgmt, Exchange Online, Licenses, Domain Verification, MFA, Graph PS</div>
          <div><span class="term-var">[3. GOOGLE WORKSPACE]</span> Gmail &amp; Drive Admin, User Groups, Migrations, MX Records, Routing</div>
          <div><span class="term-var">[4. IIS &amp; HOSTING]</span> App Pools, Bindings, Reverse Proxy, ARR, URL Rewrite, Node.js, .NET, Plesk</div>
          <div><span class="term-var">[5. DATABASES]</span> MSSQL, MariaDB, MySQL, Backup &amp; Restore, SQL Troubleshooting, Migration</div>
          <div><span class="term-var">[6. NETWORKING &amp; SEC]</span> DNS, TCP/IP, Port Connectivity, Firewall, SSL/TLS, Ping, Tracert, Telnet</div>
          <div><span class="term-var">[7. AUTOMATION]</span> PowerShell Scripting, Service Automation, Deployment Scripts, CLI</div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'get-projects' || cleanCmd === 'projects') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div class="term-success">=== 6 REAL-WORLD SHOWCASE PROJECTS ===</div>
          <div>1. <span class="term-cmd">Windows Server Infrastructure Management</span> (Configuration, Services, AD DS, Monitoring)</div>
          <div>2. <span class="term-cmd">Microsoft 365 Tenant Migration</span> (User Migration, Mailbox, DNS &amp; Licensing)</div>
          <div>3. <span class="term-cmd">IIS &amp; Node.js Deployment</span> (Reverse Proxy, ARR, URL Rewrite, Next.js, .NET)</div>
          <div>4. <span class="term-cmd">MSSQL &amp; MariaDB Management</span> (Backup, Restore, Maintenance, Connectivity)</div>
          <div>5. <span class="term-cmd">SSL Certificate Deployment</span> (CSR, PFX Generation, Chain Validation, OpenSSL)</div>
          <div>6. <span class="term-cmd">Server Automation Using PowerShell</span> (Service Management, Scheduled Tasks, Admin CLI)</div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'get-tools' || cleanCmd === 'tools') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div class="term-success">TOOLS &amp; TECHNOLOGIES:</div>
          <div>Windows Server &middot; Microsoft 365 &middot; PowerShell &middot; IIS &middot; MSSQL &middot; MariaDB &middot; Plesk &middot; Google Workspace &middot; NSSM &middot; Proxmox &middot; SSL/TLS &middot; DNS</div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'get-experience' || cleanCmd === 'experience') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div class="term-val">CURRENT ROLE: Windows Server Administrator</div>
          <div><span class="term-var">Organization:</span> CloudTechtiq Technologies · Jaipur</div>
          <div><span class="term-var">Timeline:</span> JULY 2025 — PRESENT</div>
          <div><span class="term-dim">Enterprise Windows Server (2016/2019/2022) administration, Active Directory (AD DS), Group Policy Objects (GPO), Microsoft 365, IIS web hosting & reverse proxy, MSSQL/MariaDB, and PowerShell automation.</span></div>
          <div style="margin-top: 8px;" class="term-val">PREVIOUS ROLE: Desktop Support Engineer</div>
          <div><span class="term-var">Organization:</span> IT Infrastructure Support</div>
          <div><span class="term-var">Timeline:</span> NOV 2023 — JULY 2025</div>
          <div><span class="term-dim">End-user computing support, computer hardware & OS troubleshooting, network connectivity, user provisioning in Active Directory, and IT service desk ticket resolution.</span></div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'get-certifications' || cleanCmd === 'certs') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div class="term-success">VERIFIED CERTIFICATIONS &amp; CREDENTIALS:</div>
          <div>[✔] Microsoft 365 Administrator Expert (MS-102)</div>
          <div>[✔] Certified Ethical Hacker (CEH Master) - EC-Council</div>
          <div>[✔] Certified Network Defender (CND) - EC-Council</div>
          <div>[✔] Plesk Obsidian Professional</div>
          <div>[✔] Acronis Cloud Tech Associate</div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'get-contact' || cleanCmd === 'contact') {
      appendOutput(`
        <div style="margin: 6px 0;">
          <div class="term-success">CONTACT SPECIFICATIONS:</div>
          <div><span class="term-var">Email:</span> <span class="term-val">gc6072@gmail.com</span></div>
          <div><span class="term-var">GitHub:</span> <a href="https://github.com/gauravchauhan2202-prog" target="_blank" style="color:#38bdf8;">github.com/gauravchauhan2202-prog</a></div>
          <div><span class="term-var">Location:</span> Jaipur, Rajasthan, India</div>
        </div>
      `);
      return;
    }

    if (cleanCmd === 'whoami') {
      appendOutput(`<div>cloudtechtiq\\gaurav (Windows Server Administrator &amp; Infrastructure Support Engineer)</div>`);
      return;
    }

    if (cleanCmd.startsWith('ping')) {
      const host = cmd.split(' ')[1] || '103.152.79.155';
      appendOutput(`
        <div>Pinging ${escapeHtml(host)} with 32 bytes of data:</div>
        <div>Reply from ${escapeHtml(host)}: bytes=32 time=3ms TTL=128</div>
        <div>Reply from ${escapeHtml(host)}: bytes=32 time=4ms TTL=128</div>
        <div>Reply from ${escapeHtml(host)}: bytes=32 time=3ms TTL=128</div>
        <div class="term-success">Ping statistics: 3 packets transmitted, 3 received, 0% packet loss.</div>
      `);
      return;
    }

    if (cleanCmd.startsWith('write-host') || cleanCmd.startsWith('echo')) {
      const msg = cmd.replace(/^(write-host|echo)\s*/i, '').replace(/["']/g, '');
      appendOutput(`<div>${escapeHtml(msg)}</div>`);
      return;
    }

    // Default error
    appendOutput(`
      <div style="color: #ef4444;">
        ${escapeHtml(cmd)} : The term '${escapeHtml(cmd)}' is not recognized as the name of a cmdlet or function.
        Type <span class="term-cmd">help</span> for valid commands.
      </div>
    `);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

// ============================================================================
// 2. CAPABILITY MAP FILTERING
// ============================================================================
function initCapabilityFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const capabilityCards = document.querySelectorAll('.capability-card');

  if (!filterPills.length || !capabilityCards.length) return;

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const category = pill.getAttribute('data-category');

      capabilityCards.forEach((card) => {
        if (category === 'all') {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          const cardCat = card.getAttribute('data-category') || '';
          if (cardCat.includes(category)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

// ============================================================================
// 3. PROJECT INSPECTION MODAL (Detailed Architecture & Real Scripts)
// ============================================================================
const PROJECT_DATABASE = {
  'win-infra': {
    title: 'Windows Server Infrastructure Management',
    category: '01 · INFRASTRUCTURE MANAGEMENT',
    tags: ['Windows Server 2022', 'Active Directory', 'RDP', 'SMB Permissions', 'Firewall'],
    description: 'Full-lifecycle server configuration, service health management, resource capacity monitoring, and system troubleshooting across Windows Server 2016, 2019, and 2022. Encompasses Active Directory Domain Services (AD DS) user/group administration, Group Policy Objects (GPO), Remote Desktop Services (RDP), NTFS and SMB share permission auditing, and Windows Defender Firewall hardening.',
    architecture: `
[Corporate Network / Remote Branches]
       │ (RDP Port 3389 / VPN Tunnel)
       ▼
[Edge Perimeter & Windows Defender Firewall]
       ├── Port Management: Whitelisting 80, 443, 5985 (WinRM), 3389 (RDP)
       └── Stateful Network Location Awareness (Domain / Private / Public)
       │
       ▼
[Windows Server 2019/2022 Domain Controller & Member Servers]
       ├── Active Directory DS: User Onboarding, OU Hierarchy, GPO Security
       ├── File Server Services: SMB Shares, Access-Based Enumeration, Quotas
       ├── Windows Services Management: Automatic recovery on failure
       └── Performance Monitoring: Event Viewer (System/Security), Task Manager, WMI
    `,
    codeSnippet: `# Audit Windows Services and restart critical stopped dependencies
$CriticalServices = @("W3SVC", "MSSQLSERVER", "LanmanServer", "TermService", "WinRM")
foreach ($Svc in $CriticalServices) {
    $Status = Get-Service -Name $Svc -ErrorAction SilentlyContinue
    if ($Status -and $Status.Status -ne "Running") {
        Write-Warning "Service $Svc is NOT running (State: $($Status.Status)). Initiating restart..."
        Start-Service -Name $Svc
        Start-Sleep -Seconds 2
        Write-Host "Service $Svc restarted successfully." -ForegroundColor Green
    } else {
        Write-Host "[OK] Service $Svc is running." -ForegroundColor Cyan
    }
}`
  },

  'm365-migration': {
    title: 'Microsoft 365 Tenant Migration',
    category: '02 · CLOUD MIGRATION',
    tags: ['Microsoft 365', 'Exchange Online', 'Microsoft Graph', 'DNS & MX', 'MFA'],
    description: 'Complete cloud identity, mailbox, and licensing migration from on-premise systems and external mail platforms to Microsoft 365. Highlights domain verification, MX and SPF/DKIM/DMARC routing reconfiguration, batch mailbox cutovers, automated license assignment, and MFA security enforcement with Microsoft Graph PowerShell.',
    architecture: `
[Source Mail Platform / Legacy Exchange / IMAP]
       │
       ▼
[Tenant Staging & Pre-Migration Assessment]
       ├── User & Mailbox Inventory via CSV Manifests
       ├── Microsoft 365 Tenant Setup & Custom Domain Verification
       └── Microsoft Graph API App Registration (OAuth 2.0 Credentials)
       │
       ▼
[Migration Orchestration & DNS Cutover]
       ├── Exchange Online Migration Batches (Initial Sync & Delta Syncs)
       ├── Public DNS Transition: MX -> mail.protection.outlook.com
       ├── SPF/DKIM/DMARC Validation & Autodiscover CNAME Pointing
       └── Post-Cutover: Automated E3/Business Premium License Assignment & MFA
    `,
    codeSnippet: `# Verify DNS MX and SPF configuration for M365 tenant cutover
$Domain = "companydomain.com"
Write-Host "Verifying MX Records for $Domain..." -ForegroundColor Yellow
$Mx = Resolve-DnsName -Name $Domain -Type MX
$Mx | Select-Object NameExchange, Preference | Format-Table -AutoSize

Write-Host "Verifying SPF TXT Record..." -ForegroundColor Yellow
$Txt = Resolve-DnsName -Name $Domain -Type TXT | Where-Object { $_.Strings -match "v=spf1" }
Write-Host "Active SPF: $($Txt.Strings)" -ForegroundColor Green`
  },

  'iis-nodejs': {
    title: 'IIS & Node.js Deployment',
    category: '03 · WEB & APPLICATION HOSTING',
    tags: ['IIS', 'Node.js', 'Next.js', 'Reverse Proxy', 'ARR', 'URL Rewrite', 'NSSM'],
    description: 'Production hosting and reverse proxy configuration of modern Node.js, Next.js, and .NET web applications on Windows Server using IIS. Leverages Application Request Routing (ARR) and URL Rewrite modules to seamlessly proxy incoming port 80/443 traffic to backend daemon processes managed by NSSM (Non-Sucking Service Manager).',
    architecture: `
[Client HTTPS Request: port 443]
       │ (SNI / SSL Certificate Binding)
       ▼
[IIS Web Server (Internet Information Services)]
       ├── URL Rewrite Module: Rewrites inbound paths -> backend target
       ├── Application Request Routing (ARR): Reverse Proxy enabled
       └── Application Pools: Isolated memory limits & 64-bit worker processes
       │ (Loopback Reverse Proxy: http://127.0.0.1:3000)
       ▼
[Node.js / Next.js / .NET Backend Service]
       ├── Managed as Windows Background Service via NSSM
       ├── Automatic restart on memory exhaustion or application crash
       └── High performance local socket connectivity
    `,
    codeSnippet: `<!-- IIS web.config Reverse Proxy Configuration for Node.js Application -->
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="ReverseProxyToNodeJS" stopProcessing="true">
          <match url="(.*)" />
          <action type="Rewrite" url="http://127.0.0.1:3000/{R:1}" />
        </rule>
      </rules>
    </rewrite>
    <httpErrors existingResponse="PassThrough" />
  </system.webServer>
</configuration>`
  },

  'db-management': {
    title: 'MSSQL & MariaDB Management',
    category: '04 · DATABASE OPERATIONS',
    tags: ['MSSQL', 'MariaDB', 'MySQL', 'Automated Backups', 'Transaction Logs'],
    description: 'Comprehensive database administration covering Microsoft SQL Server (MSSQL), MariaDB, and MySQL. Implements automated full and differential backup strategies, transaction log management to prevent volume exhaustion, disaster recovery point-in-time restore drills, and SQL connectivity and TCP port troubleshooting.',
    architecture: `
[Production Applications: Web Portals & Enterprise ERP]
       │ (TCP Port 1433 for MSSQL | TCP Port 3306 for MariaDB)
       ▼
[Database Engines: SQL Server & MariaDB Instances]
       ├── Connection Pool Optimization & SQL Authentication Hardening
       ├── Transaction Log Truncation & Auto-Growth Governance
       └── Memory Allocation & Storage Volume I/O Segregation
       │
       ▼
[Automated Backup & Disaster Recovery Pipeline]
       ├── Daily Full Backups + Hourly Transaction Log Backups
       ├── Checksum verification & compression enabled
       └── Automated retention purging older than 14 days
    `,
    codeSnippet: `# Automated MSSQL Full Database Backup with Compression & Timestamp
$SqlInstance = "localhost"
$DbName = "EnterpriseDB"
$BackupDir = "D:\\SQL_Backups"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupFile = "$BackupDir\\$($DbName)_$($Timestamp).bak"

$Query = @"
BACKUP DATABASE [$DbName] 
TO DISK = N'$BackupFile' 
WITH NOFORMAT, NOINIT, NAME = N'$DbName-Full Backup', 
SKIP, NOREWIND, NOUNLOAD, COMPRESSION, CHECKSUM, STATS = 10;
"@

Invoke-Sqlcmd -ServerInstance $SqlInstance -Query $Query
Write-Host "Database backup completed successfully to $BackupFile" -ForegroundColor Green`
  },

  'ssl-deployment': {
    title: 'SSL Certificate Deployment',
    category: '05 · SECURITY & CRYPTOGRAPHY',
    tags: ['SSL/TLS', 'OpenSSL', 'PFX Generation', 'IIS Bindings', 'Plesk'],
    description: 'End-to-end SSL/TLS certificate deployment, certificate chain reconstruction, and PKI validation across enterprise web servers. Covers Certificate Signing Request (CSR) generation, intermediate CA bundle assembly, password-protected PFX container compilation, HTTPS binding configuration in IIS and Plesk, and OpenSSL chain verification.',
    architecture: `
[Certificate Authority: DigiCert / Let's Encrypt / Sectigo]
       │ (Issues: Leaf Certificate + Intermediate CAs + Root CA)
       ▼
[OpenSSL Certificate Reconstruction Engine]
       ├── Validates Subject Alternative Names (SAN) & Expiry
       ├── Assembles complete unbroken chain: Leaf -> Intermediate -> Root
       └── Generates PKCS#12 (.pfx) bundle with private key
       │
       ▼
[Production Web Server: IIS & Plesk Web Host]
       ├── Imports PFX into LocalMachine\\My Certificate Store
       ├── Binds HTTPS Port 443 with SNI (Server Name Indication)
       └── Enforces TLS 1.2 / TLS 1.3 protocol standards
    `,
    codeSnippet: `# OpenSSL commands to verify certificate chain integrity
# 1. Inspect cert and dates
openssl x509 -in leaf_cert.crt -text -noout | grep -E "Subject:|Issuer:|Not After"

# 2. Build password-protected PFX container for IIS import
openssl pkcs12 -export -out website_bundle.pfx \\
  -inkey private.key -in leaf_cert.crt \\
  -certfile ca_bundle.crt -passout pass:SecurePfxPass!2026

# 3. Verify TLS handshake against live server
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com`
  },

  'server-automation': {
    title: 'Server Automation Using PowerShell',
    category: '06 · AUTOMATION & SCRIPTING',
    tags: ['PowerShell Scripting', 'WinRM', 'Scheduled Tasks', 'Administration CLI'],
    description: 'Development of robust PowerShell administration scripts to automate repetitive system tasks, scheduled event monitoring, user provisioning, disk space alerting, and multi-server service management. Utilizes WinRM for remote server orchestration without manual RDP sessions.',
    architecture: `
[Administrator Management Workstation]
       │ (PowerShell 7 / WinRM Remote Execution)
       ▼
[Automated Script Engine & Task Scheduler]
       ├── Scheduled Maintenance: Temp file cleanup & IIS log archival
       ├── Storage Watchdog: Alerts when free volume falls below 15%
       ├── Service Supervisor: Monitors critical services and auto-restarts
       └── Reporting: Compiles formatted HTML status emails to sysadmins
       │
       ▼
[Target Windows Infrastructure Nodes]
       └── Executes consistently across Server 2016, 2019, and 2022
    `,
    codeSnippet: `# PowerShell Storage Capacity Watchdog Script
$ThresholdPercent = 15
$Drives = Get-CimInstance Win32_LogicalDisk | Where-Object { $_.DriveType -eq 3 }
foreach ($Drive in $Drives) {
    $FreeGB = [math]::Round($Drive.FreeSpace / 1GB, 2)
    $TotalGB = [math]::Round($Drive.Size / 1GB, 2)
    $PercentFree = [math]::Round(($Drive.FreeSpace / $Drive.Size) * 100, 2)
    
    if ($PercentFree -lt $ThresholdPercent) {
        Write-Warning "LOW DISK SPACE on Drive $($Drive.DeviceID) ($PercentFree% free, $FreeGB GB of $TotalGB GB)"
    } else {
        Write-Host "Drive $($Drive.DeviceID) healthy: $PercentFree% free ($FreeGB GB / $TotalGB GB)" -ForegroundColor Green
    }
}`
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalArchitecture = document.getElementById('modalArchitecture');
  const modalCode = document.getElementById('modalCode');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const projectInspectBtns = document.querySelectorAll('.inspect-project-btn');

  if (!modalBackdrop) return;

  projectInspectBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = PROJECT_DATABASE[projKey];
      if (data) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDescription.textContent = data.description;
        modalArchitecture.textContent = data.architecture.trim();
        modalCode.textContent = data.codeSnippet.trim();
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

// ============================================================================
// 4. ONE-CLICK EMAIL COPY & TOAST NOTIFICATION
// ============================================================================
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-action');
  const toast = document.getElementById('toastNotice');
  const emailAddress = 'gc6072@gmail.com';

  if (!toast) return;

  function showToast(message) {
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailAddress).then(() => {
          showToast(`COPIED TO CLIPBOARD: ${emailAddress}`);
        }).catch(() => {
          window.location.href = `mailto:${emailAddress}`;
        });
      } else {
        window.location.href = `mailto:${emailAddress}`;
      }
    });
  });
}
