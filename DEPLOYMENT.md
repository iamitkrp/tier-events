# 🚀 Vercel Deployment Guide

## Prerequisites

- ✅ **Production build tested** - `npm run build` passes
- ✅ **Environment variables configured**
- ✅ **Supabase database set up**
- ✅ **Clerk authentication configured**

## Step-by-Step Deployment

### 1. **Push to GitHub**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "🚀 Initial commit - Tier Events App ready for deployment"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/tier-events.git

# Push to GitHub
git push -u origin main
```

### 2. **Deploy to Vercel**

#### Option A: Vercel Dashboard (Recommended)
1. **Go to**: https://vercel.com/dashboard
2. **Click "New Project"**
3. **Import from GitHub**: Select your `tier-events` repository
4. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: **/** (leave default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Your account)
# - Link to existing project? No  
# - Project name: tier-events
# - Directory: ./
```

### 3. **Configure Environment Variables**

In your **Vercel Dashboard** → **Project Settings** → **Environment Variables**, add:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWxsb3dlZC1tYWNhcXVlLTk5LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_ye6QuQWOCZ4UEoUeJaZyF9bICKE47IeaGYxyerVyQC

# Supabase Database  
NEXT_PUBLIC_SUPABASE_URL=https://tbyxrnybqrqmieadoqwu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRieXhybnlicXJxbWllYWRvcXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTA0MjgsImV4cCI6MjA2OTc4NjQyOH0.yKbxgNUPcKBYMag2mmQbvP2vq0vS7gD0hcqU9XE3u7c
```

**Important**: Make sure all environment variables are set to **Production**, **Preview**, and **Development** environments.

### 4. **Update Clerk Settings**

In your **Clerk Dashboard**:

1. **Go to**: https://dashboard.clerk.com/
2. **Select your application**
3. **Go to**: **Configure** → **Domains**
4. **Add your Vercel domain**:
   - Production: `https://your-app-name.vercel.app`
   - Add to both **Authorized origins** and **Authorized redirect URLs**

5. **Update redirect URLs**:
   - Sign-in redirect: `https://your-app-name.vercel.app/dashboard`
   - Sign-up redirect: `https://your-app-name.vercel.app/dashboard`

### 5. **Verify Database Connection**

Your Supabase database should work automatically since you're using the same credentials.

**Test the connection**: Visit `https://your-app-name.vercel.app/api/seed`

### 6. **Test the Deployment**

1. **Visit your deployed site**: `https://your-app-name.vercel.app`
2. **Test authentication**: Sign up/sign in
3. **Test tier functionality**: Upgrade between tiers
4. **Verify events**: Check that all events display correctly

## 🔧 Troubleshooting

### Common Issues:

**1. Environment Variables Not Loading**
- Check all variables are set in Vercel dashboard
- Ensure they're enabled for all environments (Production, Preview, Development)
- Redeploy after adding variables

**2. Clerk Authentication Issues**
- Verify domain is added to Clerk dashboard
- Check redirect URLs match your deployed domain
- Ensure publishable key is correct

**3. Supabase Connection Issues**
- Verify Supabase URL and anon key are correct
- Check database has the events table and data
- Test the `/api/seed` endpoint

**4. Build Failures**
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript types are correct

### Useful Commands:

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Redeploy
vercel --prod

# Remove deployment
vercel rm [project-name]
```

## 🎯 Post-Deployment Checklist

- [ ] ✅ **Site loads** - Homepage displays correctly
- [ ] ✅ **Authentication works** - Can sign up/sign in
- [ ] ✅ **Dashboard loads** - Events display based on tier
- [ ] ✅ **Tier upgrades work** - Can upgrade between tiers
- [ ] ✅ **Database connection** - Events load from Supabase
- [ ] ✅ **Mobile responsive** - Works on mobile devices
- [ ] ✅ **Performance** - Site loads quickly
- [ ] ✅ **SEO** - Meta tags and titles correct

## 🚀 Success!

Your **Tier-Based Event Showcase** is now live on Vercel! 

### Next Steps:
1. **Share your app** - Send the link to others to test
2. **Monitor usage** - Check Vercel analytics
3. **Add custom domain** (optional) - Configure in Vercel settings
4. **Scale as needed** - Vercel automatically handles traffic

---

**Congratulations! 🎉 Your full-stack Next.js application is successfully deployed and ready for the world to see!**