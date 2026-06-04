import os
import smtplib
from email.message import EmailMessage
from datetime import datetime

# Read from env, but provide fallbacks (though they won't work if they are fake)
GMAIL_USER = os.getenv("GMAIL_USER", "")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")

def send_verification_email(to_email: str, otp: str):
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print(f"[{datetime.now()}] WARNING: GMAIL_USER or GMAIL_APP_PASSWORD not set. OTP for {to_email} is {otp}. Email NOT sent.")
        # We can either raise an exception or silently fail for dev.
        # Since the user might not have set it up yet, let's just log it to console.
        return False

    msg = EmailMessage()
    msg.set_content(f"""\
Hello,

Your verification code for Smart Crop Assistant is: {otp}

Please enter this code in the application to verify your account.

Thanks,
Smart Crop Assistant Team
""")

    msg['Subject'] = "Smart Crop Assistant - Email Verification"
    msg['From'] = f"Smart Crop Assistant <{GMAIL_USER}>"
    msg['To'] = to_email

    try:
        # Use Gmail's SMTP server
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"[{datetime.now()}] Successfully sent verification email to {to_email}")
        return True
    except Exception as e:
        print(f"[{datetime.now()}] Error sending email to {to_email}: {e}")
        return False

def send_login_notification(user_email: str, user_name: str, role: str):
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        return False

    admin_email = os.getenv("ADMIN_EMAIL", "bonaman353@gmail.com")
    msg = EmailMessage()
    msg.set_content(f"""\
Hello Admin,

A user has just logged in to Smart Crop Assistant.

User Details:
Name: {user_name}
Email: {user_email}
Role: {role}
Time: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

Best,
Smart Crop Assistant System
""")

    msg['Subject'] = f"New Login Alert: {user_name} ({role})"
    msg['From'] = f"Smart Crop Assistant <{GMAIL_USER}>"
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
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        return {"status": "error", "detail": "GMAIL_USER or GMAIL_APP_PASSWORD environment variables are missing."}
    
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.quit()
        return {"status": "success", "detail": f"Successfully authenticated as {GMAIL_USER}"}
    except Exception as e:
        return {"status": "error", "detail": f"SMTP Authentication failed: {str(e)}"}
