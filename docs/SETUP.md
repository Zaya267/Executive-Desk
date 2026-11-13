# Executive Desk: Setup Guide

Follow the parts in order and stop when you have what you need.

- **Part 1** gets you started in 2 minutes. Everyone does this.
- **Part 2** puts the app online so you can open it from a web address.
- **Part 3** brings your calendar in by file. Easy, no technical setup.
- **Part 4** makes your calendar update by itself. Optional, about 20 minutes. Best done by an IT person, or with Zaydien's help.

Words used in this guide:
- **Browser:** the program you use to visit websites (Chrome, Edge, Safari, Firefox).
- **Host:** a service that keeps your file online so it has a web address.
- **Relay:** a small helper that fetches your calendar for the app (Part 4 only).

Your information is saved in your own browser on your own device. It is not sent to anyone. Each device or browser keeps its own separate copy.

---

## Part 1: Try it (2 minutes)

1. Unzip the download. Find the file called **index.html**.
2. Double-click **index.html**. It opens in your browser.
3. Click **Setup** in the menu at the top.
4. Type your name or company in **Desk name**. Click **Upload logo** and choose your logo (a small image file). Pick your **Accent colour**.
5. Scroll down to **Demo and reset** and click **Load demo data** to look around.
6. When you are ready to start for real, click **Erase everything**, then click it again to confirm.

If your browser does not remember your information when you open the file this way, use Part 2 instead.

---

## Part 2: Put it online (10 minutes)

1. On your computer, make a new folder called **executive-desk**. Copy **index.html** into it.
2. In your browser, search for **Netlify Drop** and open it. If it asks you to sign up, make a free account so your site is kept.
3. Drag the **executive-desk** folder onto the page. Wait a moment.
4. Netlify shows a web address that ends in **.netlify.app**. Open it. You should see your Executive Desk.
5. Bookmark the address. This is your Executive Desk.
6. Do Part 1 steps 3 to 6 on this address (name, logo, colour).

Good to know: the address is the app only. Your meetings and notes are never uploaded, so they stay on your device. To use it on a second device, open the same address there and set it up again, or use **Export backup** and **Restore from box** (Setup, Backup and restore) to copy your information across.

---

## Part 3: Bring your calendar in by file

1. Export your calendar as a **.ics** file:
   - **Google Calendar:** Settings, Import and export, Export. Unzip the file you receive.
   - **Outlook (desktop):** File, Save Calendar.
   - **Apple Calendar:** File, Export, Export.
   Menu names change sometimes. If you cannot find it, search your calendar's help for "export calendar".
2. In Executive Desk, open **Setup**, then **Connect any calendar**.
3. Click **Choose .ics files** and select your file.
4. Open **Today** or **Meetings** to see your meetings.
5. Repeat whenever you want fresh meetings. Meetings you already have are not duplicated.

---

## Part 4: Automatic calendar updates (optional)

This makes the app read your calendar by itself every few minutes. You need Part 2 finished first.

### A. Make a free Cloudflare account
1. Search for **Cloudflare** and sign up for a free account.
2. Open **Workers and Pages** from the left menu.

### B. Create the relay
1. Click **Create**, then **Create Worker**. Name it **executive-desk-relay** and click **Deploy**.
2. Click **Edit code**. Delete everything in the editor.
3. Open the file **relay/worker.js** from your download, copy all of it, and paste it into the editor.
4. Click **Deploy**.
5. Copy the Worker address shown on the page. It ends in **.workers.dev**.

### C. Add the two settings
1. Open your Worker, then **Settings**, then **Variables and Secrets**.
2. Add a variable named **ACCESS_KEY**. For the value, type about 30 random letters and numbers (a password manager can make one). Keep a copy.
3. Add a variable named **ALLOWED_ORIGIN**. For the value, paste your Executive Desk address from Part 2. It must match exactly, and must not end with a slash.
4. Save and deploy.

### D. Get your private calendar link
- **Google Calendar:** Settings, click your calendar, Integrate calendar, copy **Secret address in iCal format**.
- **Outlook:** Settings, Calendar, Shared calendars, Publish a calendar, then copy the **ICS** link.

Treat this link like a password. Anyone who has it can read that calendar.

### E. Connect it
1. In Executive Desk, open **Setup**, then **Live calendar feeds**.
2. Paste the Worker address into **Relay address**.
3. Paste your ACCESS_KEY into **Access key**.
4. Paste the calendar link into **Calendar link** and click **Add calendar**.
5. Click **Refresh now**. You should see "Calendar updated", and the Today page shows when it was last updated.

### If it does not work
- **"Could not refresh":** check that the Relay address starts with https:// and the Access key is exactly the same as in Cloudflare.
- **Still failing:** check that ALLOWED_ORIGIN is exactly your Executive Desk address with no slash at the end.
- **The calendar link fails:** copy it again from your calendar. Some company accounts do not allow publishing, so ask your IT team.
- **Changes show up late:** Google and Microsoft decide how often their links update, which can take hours. This is normal.
- **Remove access:** in Setup, remove the calendar. If the link leaks, reset it in your calendar settings.

## Need help?
Email **zaydien@gmail.com**.
