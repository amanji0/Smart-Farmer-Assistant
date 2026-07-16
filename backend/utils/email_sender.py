import os
import smtplib
import requests
from email.message import EmailMessage
from datetime import datetime

# Environment Variables
GMAIL_USER = os.getenv("GMAIL_USER", "")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")
BREVO_API_KEY = os.getenv("BREVO_API_KEY", "")

def send_verification_email(to_email: str, otp: str):
    # Use Brevo API if key is provided (Bypasses Render's SMTP block)
    if BREVO_API_KEY:
        url = "https://api.brevo.com/v3/smtp/email"
        headers = {
            "accept": "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json"
        }
        sender_email = GMAIL_USER if GMAIL_USER else "noreply@smartfarmer.com"
        payload = {
            "sender": {"name": "Smart Farmer Assistant", "email": sender_email},
            "to": [{"email": to_email}],
            "subject": "Smart Farmer Assistant - Email Verification",
            "htmlContent": f"<html><body><p>Hello,</p><p>Your verification code for Smart Farmer Assistant is: <strong>{otp}</strong></p><p>Please enter this code in the application to verify your account.</p><p>Thanks,<br>Smart Farmer Assistant Team</p></body></html>"
        }
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=10)
            if response.status_code in [200, 201]:
                print(f"[{datetime.now()}] Successfully sent verification email to {to_email} via Brevo API")
                return True
            else:
                print(f"[{datetime.now()}] Error sending email via Brevo API: {response.text}")
                return False
        except Exception as e:
            print(f"[{datetime.now()}] Exception sending email via Brevo API: {e}")
            return False

    # Fallback to standard SMTP if Brevo is not configured
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print(f"[{datetime.now()}] WARNING: GMAIL_USER/APP_PASSWORD or BREVO_API_KEY not set. OTP for {to_email} is {otp}. Email NOT sent.")
        return False

    msg = EmailMessage()
    msg.set_content(f"""\
Hello,

Your verification code for Smart Farmer Assistant is: {otp}

Please enter this code in the application to verify your account.

Thanks,
Smart Farmer Assistant Team
""")

    msg['Subject'] = "Smart Farmer Assistant - Email Verification"
    msg['From'] = f"Smart Farmer Assistant <{GMAIL_USER}>"
    msg['To'] = to_email

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"[{datetime.now()}] Successfully sent verification email to {to_email} via SMTP")
        return True
    except Exception as e:
        print(f"[{datetime.now()}] Error sending email to {to_email} via SMTP: {e}")
        return False

def send_login_notification(user_email: str, user_name: str, role: str):
    admin_email = os.getenv("ADMIN_EMAIL", "bonaman353@gmail.com")
    
    if BREVO_API_KEY:
        url = "https://api.brevo.com/v3/smtp/email"
        headers = {
            "accept": "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json"
        }
        sender_email = GMAIL_USER if GMAIL_USER else "noreply@smartfarmer.com"
        payload = {
            "sender": {"name": "Smart Farmer Alert", "email": sender_email},
            "to": [{"email": admin_email}],
            "subject": f"New Login Alert: {user_name} ({role})",
            "htmlContent": f"<html><body><p>Hello Admin,</p><p>A user has just logged in.</p><p><strong>Name:</strong> {user_name}<br><strong>Email:</strong> {user_email}<br><strong>Role:</strong> {role}<br><strong>Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p></body></html>"
        }
        try:
            requests.post(url, json=payload, headers=headers, timeout=10)
            return True
        except Exception:
            return False

    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        return False

    msg = EmailMessage()
    msg.set_content(f"""\
Hello Admin,

A user has just logged in to Smart Farmer Assistant.

User Details:
Name: {user_name}
Email: {user_email}
Role: {role}
Time: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

Best,
Smart Farmer Assistant System
""")

    msg['Subject'] = f"New Login Alert: {user_name} ({role})"
    msg['From'] = f"Smart Farmer Assistant <{GMAIL_USER}>"
    msg['To'] = admin_email

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"[{datetime.now()}] Error sending login notification to admin: {e}")
        return False

def test_smtp_connection():
    if BREVO_API_KEY:
        url = "https://api.brevo.com/v3/account"
        headers = {"accept": "application/json", "api-key": BREVO_API_KEY}
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                return {"status": "success", "detail": "Successfully authenticated with Brevo API."}
            else:
                return {"status": "error", "detail": f"Brevo Authentication failed: {resp.text}"}
        except Exception as e:
            return {"status": "error", "detail": f"Brevo HTTP Error: {str(e)}"}

    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        return {"status": "error", "detail": "GMAIL_USER/GMAIL_APP_PASSWORD or BREVO_API_KEY environment variables are missing."}
    
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.quit()
        return {"status": "success", "detail": f"Successfully authenticated as {GMAIL_USER}"}
    except Exception as e:
        return {"status": "error", "detail": f"SMTP Authentication failed: {str(e)}"}
