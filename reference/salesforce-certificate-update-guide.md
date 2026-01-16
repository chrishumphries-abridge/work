# Salesforce Certificate Update - Action Required by February 5, 2026

## What's Happening

Salesforce is updating its security certificates to use **DigiCert Global Root G2**. If your Python scripts or Jupyter notebooks connect to Salesforce, you need to verify your environment trusts this certificate.

**If you don't take action**, your scripts will fail with SSL/certificate errors after February 5, 2026.

---

## Quick Check: Are You Affected?

Run this in your terminal or a notebook cell:

```python
import ssl
import socket

def check_salesforce_connection():
    try:
        context = ssl.create_default_context()
        with socket.create_connection(("login.salesforce.com", 443), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname="login.salesforce.com") as ssock:
                cert = ssock.getpeercert()
                print("Connection successful!")
                print(f"Certificate issued to: {cert.get('subject')}")
                return True
    except ssl.SSLCertVerificationError as e:
        print(f"SSL Certificate Error: {e}")
        return False
    except Exception as e:
        print(f"Connection Error: {e}")
        return False

check_salesforce_connection()
```

**If this succeeds**, you're likely fine. Continue to the verification steps below to confirm.

**If this fails**, follow the remediation steps.

---

## Verification Steps

### Step 1: Check Your Python's Certificate Bundle

Run this to see which certificate bundle Python is using:

```python
import certifi
print(f"Certificate bundle location: {certifi.where()}")
```

Then check the bundle version:

```bash
pip show certifi
```

**Certifi version 2022.12.7 or later** includes DigiCert Global Root G2.

### Step 2: Check for DigiCert Global Root G2

Run this to verify the certificate is in your trust store:

```python
import certifi

def check_for_digicert_g2():
    with open(certifi.where(), 'r') as f:
        content = f.read()
        if 'DigiCert Global Root G2' in content:
            print("DigiCert Global Root G2 is present in your certificate bundle.")
            return True
        else:
            print("WARNING: DigiCert Global Root G2 NOT FOUND in your certificate bundle.")
            return False

check_for_digicert_g2()
```

---

## Remediation Steps

### Option 1: Update certifi (Recommended)

```bash
pip install --upgrade certifi
```

For conda environments:

```bash
conda update certifi
```

Then restart your Python kernel/notebook and re-run the verification steps.

### Option 2: Update Your Entire Environment

If you're using an older Python environment, consider updating everything:

```bash
pip install --upgrade pip setuptools
pip install --upgrade certifi requests urllib3
```

For conda:

```bash
conda update --all
```

### Option 3: Virtual Environments

If you use virtual environments, update certifi in **each environment**:

```bash
# Activate your environment first
source /path/to/venv/bin/activate  # or conda activate myenv

# Then update
pip install --upgrade certifi
```

List all your environments and check each one:

```bash
# For conda
conda env list

# For venv, check common locations
ls ~/venvs/
ls ~/.virtualenvs/
```

---

## Common Salesforce Libraries

If you use any of these libraries, they rely on your Python certificate bundle:

| Library | Notes |
|---------|-------|
| `simple-salesforce` | Uses `requests`, which uses `certifi` |
| `salesforce-bulk` | Uses `requests` |
| `aiosfstream` | Uses system SSL |
| Direct `requests` calls to Salesforce APIs | Uses `certifi` |

Updating `certifi` will fix certificate issues for all of these.

---

## Jupyter-Specific Notes

### JupyterHub / Shared Environments

If you use a shared JupyterHub, contact your administrator to update the base environment.

### Local Jupyter

If you run Jupyter locally, update the environment where Jupyter is installed:

```bash
pip install --upgrade certifi
```

Then restart the Jupyter server (not just the kernel).

### Multiple Kernels

If you have multiple Jupyter kernels, each kernel's Python environment needs `certifi` updated separately.

Check which Python a kernel uses:

```python
import sys
print(sys.executable)
```

---

## Troubleshooting

### SSL: CERTIFICATE_VERIFY_FAILED

If you see this error after February 5, 2026:

```
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed
```

1. Update certifi: `pip install --upgrade certifi`
2. Restart your Python process
3. Try again

### Custom CA Bundle

If your scripts use a custom CA bundle (check for `REQUESTS_CA_BUNDLE` or `SSL_CERT_FILE` environment variables):

```python
import os
print(os.environ.get('REQUESTS_CA_BUNDLE', 'Not set'))
print(os.environ.get('SSL_CERT_FILE', 'Not set'))
```

If these are set, you'll need to add the DigiCert G2 root certificate to that custom bundle, or remove the environment variable to use the default certifi bundle.

### macOS: Python from python.org

If you installed Python from python.org on macOS, run the certificate installer:

```bash
/Applications/Python\ 3.x/Install\ Certificates.command
```

(Replace `3.x` with your Python version)

---

## Verification Checklist

Before February 5, 2026, confirm:

- [ ] Ran the connection test successfully
- [ ] Verified DigiCert Global Root G2 is in your certificate bundle
- [ ] Updated certifi in all virtual environments you use
- [ ] Tested your actual Salesforce scripts/notebooks

---

## Questions?

Contact [YOUR TEAM/EMAIL HERE] if you encounter issues or need assistance.

---

*Last updated: January 2026*
