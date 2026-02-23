# Zoho Mail settings — tippersbillofrights.com

Account: `dave@tippersbillofrights.com`

## IMAP (incoming)
- Host: `imappro.zoho.com`
- Port: `993`
- Encryption: **SSL/TLS**
- Username: `dave@tippersbillofrights.com`
- Password: **Zoho app-specific password** (TBD)

## SMTP (outgoing)
Preferred:
- Host: `smtppro.zoho.com`
- Port: `465`
- Encryption: **SSL/TLS**

Alternative:
- Host: `smtppro.zoho.com`
- Port: `587`
- Encryption: **STARTTLS / TLS**

Username: `dave@tippersbillofrights.com`
Password: **Zoho app-specific password** (TBD)

## Next step
When you send the app-specific password, tell me which tool you want to configure for IMAP/SMTP. Options:
- A local CLI sync tool (mbsync/isync or offlineimap)
- A specific mail client config file you already use
- Or we can store the creds and just use Zoho’s API instead (if IMAP isn’t required)
