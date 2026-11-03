# 🚀 MediCare Deployment Guide: Production Setup & Step-by-Step Instructions

This guide provides beginner-friendly, step-by-step instructions to deploy the complete **MediCare** application (React + Vite frontend, Node.js + Express backend, and MongoDB database) to production.

---

## 📋 Architecture Overview

You can deploy MediCare in one of two production setups:

| Setup | Description | Best For | Recommended Hosting |
| :--- | :--- | :--- | :--- |
| **Option A (Decoupled - Recommended)** | Frontend and Backend deployed as separate, dedicated services. | Scalability, fast CDN delivery, free tier hosting. | **Frontend:** Vercel / Netlify<br>**Backend:** Render / Railway<br>**Database:** MongoDB Atlas |
| **Option B (Unified Single-Service)** | Backend builds and serves the compiled frontend static assets (`dist`) alongside API routes. | Simplicity, single custom domain, zero CORS configuration needed. | Render Web Service / Railway / DigitalOcean / Heroku / Docker |

---

## 🛠️ Step 1: Set Up MongoDB Atlas (Cloud Database)

1. **Create an Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and register or log in.
2. **Create a Free Cluster:**
   - Choose **Build a Database** → Select the **M0 Free** cluster tier.
   - Choose your nearest cloud provider region (e.g., AWS us-east-1 or ap-south-1).
   - Click **Create**.
3. **Create Database User Credentials:**
   - In the left sidebar, navigate to **Security** → **Database Access**.
   - Click **Add New Database User**.
   - Authentication Method: **Password**.
   - Enter a username (e.g., `medicare_admin`) and a secure password.
   - User Privileges: Select **Read and write to any database**.
   - Click **Add User**.
4. **Configure Network Access (Crucial for Cloud Hosting):**
   - In the left sidebar, navigate to **Security** → **Network Access**.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`).
     > *Note:* Cloud platforms (Render, Vercel, Railway) use dynamic outbound IPs, so `0.0.0.0/0` is required so your backend can connect.
   - Click **Confirm**.
5. **Obtain your Connection String:**
   - Click **Deployment** → **Database**.
   - Click the **Connect** button on your cluster card.
   - Select **Drivers** (Node.js).
   - Copy the connection string. It will look like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Replace `<username>` and `<password>` with your database user credentials.
   - Specify the database name before the `?` query parameter:
     ```
     mongodb+srv://medicare_admin:YourPassword123@cluster0.xxxxx.mongodb.net/medicare?retryWrites=true&w=majority
     ```
   - Keep this URL ready for your backend environment variables (`MONGO_URI`).

---

## 🔐 Step 2: Push Code to GitHub (Excluding Secrets)

MediCare is pre-configured with a `.gitignore` that excludes `.env` files, `node_modules`, and local build outputs.

1. **Verify Ignored Files:**
   Run the following in your terminal to ensure `.env` is ignored:
   ```bash
   git status
   ```
   You should only see code files and `.env.example` templates, **never** real `.env` files.

2. **Commit and Push:**
   ```bash
   git add .
   git commit -m "chore: prepare MediCare for production deployment"
   git push origin main
   ```

---

## ⚙️ Step 3: Deploy Backend (Render Web Service)

1. Go to [Render.com](https://render.com/) and sign in with GitHub.
2. Click **New +** → **Web Service**.
3. Connect your MediCare GitHub repository.
4. Fill in the service configuration:
   - **Name:** `medicare-backend` (or your chosen name)
   - **Region:** Choose the region nearest to your MongoDB Atlas cluster.
   - **Branch:** `main` (or `master`)
   - **Root Directory:** *(leave blank for root, or set `backend` if deploying backend folder only)*
   - **Runtime:** `Node`
   - **Build Command:**
     - If Root Directory is blank: `npm install`
     - If Root Directory is `backend`: `npm install`
   - **Start Command:**
     - If Root Directory is blank: `npm run start --workspace=backend`
     - If Root Directory is `backend`: `npm start`
5. **Add Environment Variables:**
   Click **Advanced** → **Add Environment Variable** and enter:
   | Key | Value | Notes |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production optimizations |
   | `PORT` | `10000` | Render assigns this automatically |
   | `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string from Step 1 |
   | `JWT_SECRET` | *Your strong 64-char key* | Generated secret for JWT token signing |
   | `JWT_EXPIRE` | `30d` | Token session validity |
   | `CLIENT_URL` | `http://localhost:5173` | Set temporarily; update in Step 4 with your live frontend URL |
   | `ADMIN_NAME` | `MediCare Administrator` | Seed admin account name |
   | `ADMIN_EMAIL` | `admin@medicare.com` | Seed admin email address |
   | `ADMIN_PASSWORD` | `YourSecureAdminPass!` | Seed admin account password |
6. Click **Create Web Service**.
7. Wait 2-3 minutes for Render to finish building and deploying.
8. Once live, note your backend URL (e.g. `https://medicare-backend.onrender.com`).
9. **Test the Backend:**
   Open `https://medicare-backend.onrender.com/api/health` in your browser. You should receive:
   ```json
   {
     "status": "online",
     "service": "MediCare API Server",
     "environment": "production",
     "database": "connected"
   }
   ```

---

## 🌐 Step 4: Deploy Frontend (Vercel or Netlify)

### Option 4A: Deploy to Vercel (Recommended)
1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** → **Project**.
3. Select your MediCare repository.
4. Configure Project Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** Click **Edit** and choose `frontend`.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. **Environment Variables:**
   - Key: `VITE_API_BASE_URL`
   - Value: `https://medicare-backend.onrender.com/api` *(your Render backend URL + `/api`)*
6. Click **Deploy**.
7. Once deployed, Vercel gives you a production URL (e.g., `https://medicare-frontend.vercel.app`).
8. **Update Backend CORS (`CLIENT_URL`):**
   - Go back to **Render Dashboard** → `medicare-backend` → **Environment**.
   - Update `CLIENT_URL` to:
     ```
     https://medicare-frontend.vercel.app,http://localhost:5173
     ```
   - Render will automatically re-deploy with your live frontend URL whitelisted.

---

### Option 4B: Deploy to Netlify
1. Go to [Netlify](https://www.netlify.com/) and sign in.
2. Click **Add new site** → **Import an existing project**.
3. Choose GitHub and select your MediCare repository.
4. Set Build Settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Set Environment Variables:
   - Add `VITE_API_BASE_URL` with value `https://medicare-backend.onrender.com/api`.
6. Click **Deploy Site**.
7. MediCare includes `frontend/public/_redirects` which automatically ensures React Router client-side routing works on Netlify without 404 errors.
8. Update `CLIENT_URL` in your backend environment variables to include your Netlify site URL.

---

## 📦 Step 5: Seed the Production Database

To populate your production MongoDB Atlas cluster with the complete 325-medicine catalog and admin account:

Run this command from your local machine, passing your production `MONGO_URI`:
```bash
MONGO_URI="mongodb+srv://medicare_admin:YourPassword123@cluster0.xxxxx.mongodb.net/medicare?retryWrites=true&w=majority" npm run seed
```
*(On Windows PowerShell):*
```powershell
$env:MONGO_URI="mongodb+srv://medicare_admin:YourPassword123@cluster0.xxxxx.mongodb.net/medicare?retryWrites=true&w=majority"; npm run seed
```

---

## 🚢 Option B (Alternative): Single-Service Unified Deployment

If you prefer to deploy everything as a **single unified service** on Render or Railway:
1. In Render, create a Web Service pointing to the root directory.
2. **Build Command:** `npm run install:all && npm run build`
3. **Start Command:** `npm start`
4. **Environment Variables:**
   - `NODE_ENV=production`
   - `MONGO_URI=mongodb+srv://...`
   - `JWT_SECRET=your_secret_key`
   - `CLIENT_URL=*`
5. Because Express is configured to serve `frontend/dist` automatically in production mode, your single Render URL serves both the React application and the API endpoints.

---

## ✅ Post-Deployment Testing Checklist

| Step | Verification Task | Expected Result |
| :--- | :--- | :--- |
| 1 | Navigate to `https://<backend-domain>/api/health` | Status 200 with `status: "online"` and `database: "connected"`. |
| 2 | Open your frontend URL | MediCare homepage loads with navbar, categories, and medicine cards. |
| 3 | Navigate to `/shop` and refresh the browser | Page loads without a 404 error (verifies SPA redirect rules). |
| 4 | Test User Registration & Login | User receives a JWT token and profile displays in the navigation bar. |
| 5 | Test Admin Login | Login using admin credentials (`admin@medicare.com`), verify redirect to `/admin`. |
| 6 | Test Medicine Search & Filtering | Real-time search by medicine name and category filter functions correctly. |
| 7 | Test Cart & Order Placement | Add medicine to cart, proceed to checkout, verify order appears in customer orders. |
| 8 | Test Prescription Upload | Upload an image or prescription document from the customer portal. |
