# 🚀 Deploying GATEPrep Nexus for 100% Free Forever

Since GATEPrep Nexus runs entirely client-side (using Vite + React + browser `localStorage` persistence), there is **absolute zero cost for hosting, databases, or API maintenance**. You can host the entire webapp free of charge forever.

Here are the two simplest ways to deploy your app in 5 minutes:

---

## Option 1: Vercel (Recommended — Simplest & Fastest)

Vercel is the creator of Next.js and has premium, high-speed free hosting for Vite React applications.

### Step 1: Create a Free Vercel Account
1. Go to [Vercel.com](https://vercel.com) and click **Sign Up**.
2. Select the **Hobby** (Free) plan.
3. Sign in using your **GitHub**, **GitLab**, or **Bitbucket** account (or standard email).

### Step 2: Push your code to GitHub
If you haven't uploaded your project to GitHub yet:
1. Initialize a git repository locally:
   ```bash
   git init
   git add .
   git commit -m "Initialize GATEPrep Nexus App"
   ```
2. Create a new repository on [GitHub.com](https://github.com) called `gateprep-nexus`.
3. Connect your local project to GitHub and push it:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gateprep-nexus.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy on Vercel in 1 Click
1. In the Vercel Dashboard, click the **Add New...** dropdown and select **Project**.
2. Select your GitHub account and click **Import** next to the `gateprep-nexus` repository.
3. Leave all configure settings as default! Vercel automatically detects Vite + React and configures:
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. Click the **Deploy** button.
5. In **under 60 seconds**, your application will be live with a secure, premium SSL URL (e.g. `https://gateprep-nexus.vercel.app`)!

---

## Option 2: Netlify (Great Alternative)

Netlify is another top-tier free cloud hosting provider with robust performance.

### Step 1: Link via Netlify Dashboard
1. Sign up for a free account at [Netlify.com](https://www.netlify.com).
2. Click **Add new site** and select **Import an existing project**.
3. Choose **GitHub** and authorize Netlify.
4. Select your `gateprep-nexus` repository.

### Step 2: Configure & Deploy
1. Netlify will automatically pre-fill your build settings:
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
2. Click **Deploy gateprep-nexus**.
3. Your app is now live! You can customize the site name in the Netlify settings for free (e.g. `https://my-gate-prep.netlify.app`).

---

## 🔒 Security & Persistence Check
* **What happens to my study progress?** Since all syllabus checklist progress, notice sticky notes, study logs, custom parameters, and mock test scores are saved in the user's local browser storage (`localStorage`), they will persist perfectly even when hosted online. 
* **Zero database risk:** Because there is no backend server or hosted database, your site will never crash due to database traffic spikes, and you will **never** receive any unexpected hosting bills. It is 100% free, secure, and fast forever.
