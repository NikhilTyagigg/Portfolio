# Deployment Guide

This portfolio is designed to be deployed on:
- **Frontend**: [Vercel](https://vercel.com) (free tier)
- **Backend**: [Render](https://render.com) (free tier)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)

## Prerequisites

1. GitHub account (already have it)
2. Vercel account (free, linked to GitHub)
3. Render account (free)
4. MongoDB Atlas account (free)

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create a MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up with your email or GitHub
- Create a new organization and project

### 1.2 Create a Free Cluster
- Click "Create" for a new cluster
- Select **M0 (free tier)**
- Choose your preferred region
- Click "Create Cluster" (takes 2-3 minutes)

### 1.3 Create Database User
- In the left sidebar, go to **Security > Database Access**
- Click **Add New Database User**
- Username: `admin`
- Password: Generate a strong password, copy it
- Database User Privileges: **Atlas Admin**
- Click **Add User**

### 1.4 Whitelist IP Address
- Go to **Security > Network Access**
- Click **Add IP Address**
- Select **Allow Access from Anywhere** (0.0.0.0/0)
- Click **Confirm**

### 1.5 Get Connection String
- Click "Connect" on your cluster
- Select "Drivers" (Node.js)
- Copy the connection string
- Replace `<password>` with your database user password
- Save this as `MONGODB_URI`

Example format:
```
mongodb+srv://admin:your_password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend on Render

### 2.1 Push to GitHub
Make sure your portfolio is pushed to GitHub with all the latest changes:
```bash
cd C:\Users\Admin\Desktop\portfoloio
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2.2 Create Render Web Service
- Go to https://render.com
- Sign up with GitHub
- Click **New +** > **Web Service**
- Select your **Portfolio** repository
- Configure:
  - **Name**: `portfolio-server` (or any name)
  - **Environment**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: Free (select this)

### 2.3 Set Environment Variables
In the Render dashboard, add these environment variables:

```
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here
GITHUB_TOKEN=
GITHUB_USERNAME=NikhilTyagigg
ADMIN_EMAIL=admin@portfolio.local
ADMIN_PASSWORD=your_secure_password
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
PORT=5000
```

### 2.4 Deploy
- Click **Create Web Service**
- Render will build and deploy automatically
- Wait for the green "Live" status
- Save your backend URL (e.g., `https://portfolio-server.onrender.com`)

> **Note**: Free tier services on Render spin down after 15 minutes of inactivity. First request will take 30 seconds.

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Import Project to Vercel
- Go to https://vercel.com
- Click **Add New** > **Project**
- Select your **Portfolio** repository from GitHub
- Click **Import**

### 3.2 Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- Root Directory: `./client` (or set manually if not detected)

### 3.3 Set Environment Variables
In the Vercel dashboard, under **Settings > Environment Variables**, add:

```
VITE_API_URL=https://portfolio-server.onrender.com/api
```

### 3.4 Deploy
- Click **Deploy**
- Wait for build and deployment (2-3 minutes)
- Your portfolio will be live at a Vercel URL
- You can add a custom domain if desired

---

## Step 4: Update Configuration

After deployment, update these files locally and push:

### Update `client/.env.production`
```env
VITE_API_URL=https://portfolio-server.onrender.com/api
```

### Update `server/.env`
```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here
ADMIN_EMAIL=admin@portfolio.local
ADMIN_PASSWORD=your_secure_password
CLIENT_URL=https://your-vercel-url.vercel.app
```

Then push:
```bash
git add .
git commit -m "Update production environment variables"
git push origin main
```

---

## Step 5: Test the Live Portfolio

1. Visit your Vercel frontend URL
2. Test the GitHub dashboard (should show live data)
3. Go to **Admin** page
4. Log in with:
   - Email: `admin@portfolio.local`
   - Password: (the one you set in Render)
5. Upload a resume PDF
6. Visit the **Resume** page to verify it displays

---

## Troubleshooting

### Backend won't start on Render
- Check logs: Go to Render dashboard > Logs
- Common issues:
  - MongoDB connection string invalid
  - Missing environment variables
  - Node version mismatch

### Frontend can't reach backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check backend is running (green status on Render)
- Open browser DevTools > Network > check API requests

### Admin login fails
- Verify `JWT_SECRET` is set in Render
- Check MongoDB database exists and is accessible
- Try the direct API test: `curl https://portfolio-server.onrender.com/api/health`

---

## Maintenance

### Update Production Code
```bash
cd C:\Users\Admin\Desktop\portfoloio
git add .
git commit -m "Your changes"
git push origin main
```
Vercel and Render will automatically rebuild and redeploy.

### Monitor Performance
- Vercel: Dashboard shows build times and analytics
- Render: Dashboard shows uptime and resource usage
- MongoDB Atlas: Monitor your database usage (free tier: 512MB)

---

## Next Steps

1. Follow the steps above to deploy
2. Share your live portfolio URL with others
3. Update your resume with the portfolio link
4. Monitor the live site for any issues

**Happy deploying! 🚀**
