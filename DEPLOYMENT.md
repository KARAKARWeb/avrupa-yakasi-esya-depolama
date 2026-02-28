# Deployment Guide - Eşya Depolama

## 🚀 Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Domain (optional, Vercel provides free subdomain)

### Step 1: GitHub Repository
1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Vercel Setup
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Environment Variables
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
ADMIN_SECRET_KEY=your-very-secure-random-key

# SMTP (if using env vars instead of JSON)
SMTP_HOST=smtp.yandex.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@yourdomain.com
SMTP_PASS=your-yandex-app-password
SMTP_FROM=info@yourdomain.com
SMTP_TO=info@yourdomain.com

# Optional Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION=your-verification-code

# Node Environment
NODE_ENV=production
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at `your-project.vercel.app`

### Step 5: Custom Domain (Optional)
1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

---

## 📝 Important Configuration Files

### `/data/site-config.json`
Update with your actual domain:
```json
{
  "site": {
    "domain": "yourdomain.com",
    "url": "https://yourdomain.com"
  }
}
```

### `/data/homepage-settings.json`
SMTP settings are stored here. Update:
```json
{
  "smtpSettings": {
    "host": "smtp.yandex.com",
    "port": 465,
    "secure": true,
    "user": "info@yourdomain.com",
    "pass": "your-app-password"
  }
}
```

---

## ✅ Post-Deployment Checklist

- [ ] Test contact form (sends email)
- [ ] Test price quote form (sends email)
- [ ] Verify admin login works (`/admin`)
- [ ] Check all pages load correctly
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Verify images load from `/public/gallery`
- [ ] Test gallery upload in admin panel
- [ ] Check SEO meta tags (view page source)
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (if configured)

---

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run build` locally

### Email Not Sending
- Verify SMTP credentials in `homepage-settings.json`
- Check Yandex app password (not regular password)
- Test SMTP connection

### Admin Login Not Working
- Verify `ADMIN_SECRET_KEY` is set in Vercel env vars
- Check browser console for errors
- Clear browser cache and cookies

### Images Not Loading
- Ensure images are in `/public/gallery`
- Check Next.js image optimization settings
- Verify file permissions

---

## 🔄 Updating the Site

### Method 1: Git Push (Recommended)
```bash
git add .
git commit -m "Update content"
git push origin main
```
Vercel will auto-deploy on push.

### Method 2: Admin Dashboard
- Login to `/admin`
- Update content in "Sayfa Ayarları"
- Changes save to JSON files
- Redeploy in Vercel if needed

---

## 📊 Performance Optimization

Already configured:
- ✅ Next.js Image Optimization
- ✅ Compression enabled
- ✅ Cache headers for static assets
- ✅ WebP image format
- ✅ Security headers (X-Frame-Options, CSP, etc.)

---

## 🛡️ Security

- Admin panel protected with secret key
- SMTP credentials in environment variables
- Security headers configured
- XSS protection enabled
- CSRF protection via Next.js

---

## 📞 Support

For issues or questions:
- Check Vercel deployment logs
- Review Next.js documentation
- Contact: info@karakar.web.tr
