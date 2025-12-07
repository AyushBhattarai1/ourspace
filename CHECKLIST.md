# Pre-Deployment Checklist

## Before Deploying to Vercel

### 1. MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account
- [ ] Created a cluster (free tier M0)
- [ ] Created database user with password
- [ ] Whitelisted all IPs (0.0.0.0/0)
- [ ] Got connection string
- [ ] Tested connection locally

### 2. Cloudinary Setup (for file uploads)
- [ ] Created Cloudinary account (free tier)
- [ ] Got Cloud Name from dashboard
- [ ] Got API Key from dashboard
- [ ] Got API Secret from dashboard

### 3. Environment Variables
- [ ] Created `.env` file locally (not committed)
- [ ] Set MONGODB_URI
- [ ] Set JWT_SECRET (minimum 32 characters)
- [ ] Set NODE_ENV=production for production
- [ ] Set FRONTEND_URL (will be your Vercel URL)
- [ ] Set CLOUDINARY_CLOUD_NAME
- [ ] Set CLOUDINARY_API_KEY
- [ ] Set CLOUDINARY_API_SECRET

### 4. Code Repository
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` is in `.gitignore`
- [ ] `node_modules` is in `.gitignore`
- [ ] All dependencies in `package.json`

### 5. Database Seeding
- [ ] Run `npm run seed` to create Ayush and Neha accounts
- [ ] Verify users exist in MongoDB Atlas

### 6. Local Testing
- [ ] App runs locally without errors
- [ ] Can login as both users
- [ ] Can create entries in all modes
- [ ] Gallery works (note: will need Cloudinary for production)
- [ ] All CRUD operations work

## Vercel Deployment Steps

### 1. Import Project
- [ ] Go to vercel.com
- [ ] Click "New Project"
- [ ] Import your Git repository
- [ ] Select root directory: `./`

### 2. Configure Build Settings
- [ ] Framework Preset: Other
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `client/dist`
- [ ] Install Command: `npm install`

### 3. Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

- [ ] MONGODB_URI (from MongoDB Atlas)
- [ ] JWT_SECRET (strong random string)
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL (your Vercel URL, e.g., https://your-app.vercel.app)
- [ ] CLOUDINARY_CLOUD_NAME (from Cloudinary dashboard)
- [ ] CLOUDINARY_API_KEY (from Cloudinary dashboard)
- [ ] CLOUDINARY_API_SECRET (from Cloudinary dashboard)

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors

### 5. Post-Deployment Testing
- [ ] Visit your Vercel URL
- [ ] Test login with Ayush account
- [ ] Test login with Neha account
- [ ] Create a journal entry
- [ ] Switch between modes
- [ ] Test all features

## File Upload Configuration

✅ **File uploads are now configured with Cloudinary!**

The app automatically uses:
- **Cloudinary** when credentials are set (production)
- **Local storage** when credentials are not set (development)

**Cloudinary Free Tier:**
- 25 GB storage
- 25 GB bandwidth/month
- Perfect for a couple's app!

### Database
- MongoDB Atlas free tier: 512MB storage
- Should be plenty for a couple's app

### Bandwidth
- Vercel free tier: 100GB/month
- More than enough for personal use

## Troubleshooting

### Build Fails
1. Check Vercel build logs
2. Verify all dependencies are installed
3. Check Node version compatibility
4. Ensure `vercel.json` is correct

### Can't Connect to Database
1. Verify MONGODB_URI is correct
2. Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
3. Verify database user credentials
4. Check MongoDB Atlas cluster is running

### API Requests Fail
1. Check environment variables are set in Vercel
2. Verify CORS settings
3. Check Vercel function logs
4. Test `/api/health` endpoint

### Login Doesn't Work
1. Verify JWT_SECRET is set
2. Check users exist in database
3. Verify password hashing is working
4. Check browser console for errors

## Security Notes

- ✅ Never commit `.env` file
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ MongoDB user should have limited permissions
- ✅ CORS is configured
- ✅ Passwords are hashed with bcrypt
- ⚠️ Consider adding rate limiting for production
- ⚠️ Consider HTTPS-only cookies

## Performance Tips

1. Enable Vercel Analytics
2. Use MongoDB indexes (already configured)
3. Optimize images before upload
4. Enable caching headers
5. Monitor Vercel function execution time

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Check browser console
4. Review this checklist again

## Success Criteria

Your deployment is successful when:
- ✅ App loads at Vercel URL
- ✅ Can login as both users
- ✅ Can create and view entries
- ✅ Can switch between modes
- ✅ Data persists in MongoDB
- ✅ No console errors
