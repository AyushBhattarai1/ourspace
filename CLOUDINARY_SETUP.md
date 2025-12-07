# Cloudinary Setup Guide

Cloudinary is used for file uploads in production (Vercel doesn't support local file storage).

## Why Cloudinary?

- ✅ Free tier: 25GB storage + 25GB bandwidth/month
- ✅ Automatic image optimization
- ✅ CDN delivery (fast worldwide)
- ✅ Easy integration
- ✅ No credit card required for free tier

## Step-by-Step Setup

### 1. Create Cloudinary Account

1. Go to https://cloudinary.com
2. Click "Sign Up for Free"
3. Fill in your details (or sign up with Google/GitHub)
4. Verify your email

### 2. Get Your Credentials

1. After login, you'll see your Dashboard
2. Look for the "Account Details" section
3. You'll see three important values:
   - **Cloud Name**: e.g., `dxxxxx`
   - **API Key**: e.g., `123456789012345`
   - **API Secret**: e.g., `abcdefghijklmnopqrstuvwxyz` (click "eye" icon to reveal)

### 3. Add to Local Environment

Create/update your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Add to Vercel

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add three variables:
   - Name: `CLOUDINARY_CLOUD_NAME`, Value: your cloud name
   - Name: `CLOUDINARY_API_KEY`, Value: your API key
   - Name: `CLOUDINARY_API_SECRET`, Value: your API secret
4. Click "Save"
5. Redeploy your app

### 5. Test It Works

1. Login to your app
2. Go to Gallery
3. Try uploading a photo
4. Check Cloudinary Dashboard → Media Library
5. You should see your uploaded photo!

## How It Works

The app automatically detects if Cloudinary is configured:

```javascript
// Development (no Cloudinary credentials)
→ Uses local filesystem (uploads/ folder)

// Production (Cloudinary credentials set)
→ Uses Cloudinary (cloud storage)
```

## Features

### Automatic Image Optimization
- Images are automatically optimized for web
- Maximum size: 1200x1200px
- Quality: Auto (best balance of quality/size)

### Supported Formats
- JPG/JPEG
- PNG
- GIF
- WebP

### File Size Limit
- Maximum: 5MB per file
- Plenty for photos!

## Cloudinary Dashboard

Access your dashboard at: https://cloudinary.com/console

### Useful Features:
- **Media Library**: View all uploaded images
- **Transformations**: Edit images (crop, resize, etc.)
- **Usage**: Monitor storage and bandwidth
- **Settings**: Configure upload presets

## Troubleshooting

### Upload Fails with "No file uploaded"
- Check file size (must be < 5MB)
- Check file format (JPG, PNG, GIF, WebP only)
- Check browser console for errors

### Images Not Showing
- Verify Cloudinary credentials are correct
- Check Cloudinary dashboard for uploaded files
- Verify CORS settings in Cloudinary

### "Cloudinary credentials not found"
- Make sure all three env variables are set
- Restart your server after adding credentials
- Check for typos in variable names

## Free Tier Limits

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **API Calls**: Unlimited

**For a couple's app, this is more than enough!**

## Security Best Practices

1. ✅ Never commit credentials to Git
2. ✅ Use environment variables
3. ✅ Keep API Secret private
4. ✅ Enable signed uploads (optional, for extra security)
5. ✅ Set upload restrictions in Cloudinary dashboard

## Upgrade Options (if needed)

If you ever exceed free tier:

- **Plus Plan**: $89/month (75GB storage, 150GB bandwidth)
- **Advanced Plan**: $224/month (150GB storage, 300GB bandwidth)

But for personal use, free tier should be plenty!

## Alternative Solutions

If you prefer not to use Cloudinary:

1. **Vercel Blob Storage**
   - Integrated with Vercel
   - Pay as you go
   - More expensive than Cloudinary

2. **AWS S3**
   - More complex setup
   - Requires AWS account
   - Good for large scale

3. **Disable Photo Uploads**
   - Remove gallery feature
   - Text-only app

## Support

- Cloudinary Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com
- Community: https://community.cloudinary.com

## Summary

✅ Sign up at cloudinary.com
✅ Get your credentials from dashboard
✅ Add to .env and Vercel
✅ Upload photos and enjoy!

That's it! Your app now has production-ready file uploads. 🎉
