# Deployment Guide - Vercel

## Prerequisites

1. MongoDB Atlas account (free tier)
2. Vercel account (free tier)
3. Git repository

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IPs (0.0.0.0/0) for Vercel access
5. Get your connection string

## Step 2: Prepare Your Repository

1. Push your code to GitHub/GitLab/Bitbucket
2. Make sure `.env` is in `.gitignore`

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `client/dist`

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Step 4: Set Up Cloudinary (for file uploads)

1. Go to https://cloudinary.com
2. Sign up for free account
3. Go to Dashboard
4. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret

## Step 5: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/couple_app
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Step 6: Seed the Database

After deployment, seed your database with initial users:

```bash
# Install Vercel CLI if not already
npm install -g vercel

# Run seed command
vercel env pull .env.local
npm run seed
```

Or manually create users in MongoDB Atlas.

## Step 7: Test Your Deployment

1. Visit your Vercel URL
2. Try logging in with:
   - Email: ayush@couple.app
   - Password: password123

## Important Notes

### File Uploads

✅ **File uploads are configured to use Cloudinary in production!**

The app automatically detects the environment:
- **Development**: Uses local filesystem (`uploads/` folder)
- **Production**: Uses Cloudinary (when credentials are set)

**Cloudinary Free Tier:**
- 25 GB storage
- 25 GB bandwidth/month
- More than enough for a couple's app!

**How it works:**
1. If Cloudinary credentials are set → uses Cloudinary
2. If not set → falls back to local storage (dev only)

### Environment Variables

Make sure all environment variables are set in Vercel:
- MONGODB_URI
- JWT_SECRET
- NODE_ENV
- FRONTEND_URL

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Database Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### API Not Working
- Check environment variables are set
- Verify CORS settings
- Check Vercel function logs

## Performance Optimization

1. **Enable Caching**
   - Add cache headers for static assets
   - Use Vercel's Edge Network

2. **Optimize Images**
   - Use Vercel Image Optimization
   - Compress images before upload

3. **Database Indexing**
   - Ensure indexes are created (already done in schema)

## Security Checklist

- ✅ Environment variables not in code
- ✅ JWT secret is strong (32+ characters)
- ✅ MongoDB user has limited permissions
- ✅ CORS configured properly
- ✅ Input validation on backend
- ✅ Password hashing with bcrypt
- ⚠️ Consider adding rate limiting
- ⚠️ Consider adding HTTPS-only cookies

## Monitoring

1. **Vercel Analytics**
   - Enable in Vercel dashboard
   - Monitor performance and errors

2. **MongoDB Atlas Monitoring**
   - Check database performance
   - Monitor connection usage

## Cost Considerations

**Free Tier Limits:**
- Vercel: 100GB bandwidth/month
- MongoDB Atlas: 512MB storage
- Vercel Functions: 100GB-hours/month

This should be sufficient for a couple's private app!

## Support

For issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Review browser console for frontend errors
