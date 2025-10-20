# Portfolio Website - Complete Setup Guide 🚀

This comprehensive guide will help you set up, customize, and deploy your portfolio website.

## 📋 Prerequisites

Before you begin, make sure you have:
- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **Git** installed ([Download](https://git-scm.com/))
- **MongoDB** account ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Free tier available)
- **Cloudinary** account ([Sign up](https://cloudinary.com/) - Free tier available)

## 🛠️ Installation Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose password authentication
   - Save username and password
4. Whitelist all IPs:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
5. Get connection string:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your desired database name (e.g., `portfolio`)

### Step 3: Set Up Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy these values:
   - Cloud Name
   - API Key
   - API Secret

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your values:

   ```env
   # MongoDB - Paste your connection string from MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

   # NextAuth - Generate a secret key
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # Admin Credentials
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=YourSecurePassword123!

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. Generate a secure NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```
   Or use an online generator like [generate-secret.now.sh](https://generate-secret.now.sh/32)

### Step 5: Initialize Admin User

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit this URL in your browser:
   ```
   http://localhost:3000/api/auth/setup
   ```

3. You should see a success message with your admin email.

### Step 6: Log In to Admin Dashboard

1. Go to: `http://localhost:3000/admin/login`
2. Enter the admin credentials from your `.env.local` file
3. You'll be redirected to the admin dashboard!

## 🎨 Customizing Your Portfolio

### Adding Your Content

Once logged in to the admin dashboard, you can manage all your content:

#### 1. **About Section**
- Navigate to "About" in the sidebar
- Add your name, tagline, and description
- Upload your profile photo
- Upload your resume (PDF)

#### 2. **Experience**
- Click "Experience" in the sidebar
- Click "Add Experience"
- Fill in job title, company, dates, description
- Upload company logos

#### 3. **Education**
- Go to "Education"
- Add your degrees and schools
- Include CGPA, coursework, descriptions
- Upload school logos

#### 4. **Skills**
- Navigate to "Skills"
- Add skills and categorize them:
  - Programming Languages
  - Tools & Technologies
  - Spoken Languages
  - Other Skills
- Set proficiency levels (1-5)

#### 5. **Projects**
- Go to "Projects"
- Add project title and description
- List tech stack (comma-separated)
- Add GitHub and live demo URLs
- Mark featured projects

#### 6. **Certifications**
- Click "Certifications"
- Add certificate name and issuer
- Set issue date
- Add credential URL
- Upload badge images

#### 7. **Awards**
- Navigate to "Awards"
- Add award title and issuer
- Set date and description
- Upload award icons

#### 8. **Events**
- Go to "Events"
- Add hackathons, conferences, etc.
- Specify your role (participant, speaker, etc.)
- Upload event logos

#### 9. **Contact Information**
- Click "Contact"
- Add your email
- Add social media links:
  - LinkedIn
  - GitHub
  - Twitter/X
  - Personal website

### Customizing Colors and Styling

#### Changing Brand Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... customize all shades
    900: '#0c4a6e',
  },
  secondary: {
    // ... your secondary colors
  },
}
```

#### Customizing Fonts

Edit `app/layout.tsx` to change the Google Font:

```typescript
import { Roboto } from "next/font/google";

const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ["latin"] 
});
```

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Initialize git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure your project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

### Step 3: Add Environment Variables

In Vercel project settings, add all environment variables from `.env.local`:

```
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourSecurePassword123!
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Important:** Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your Vercel domain!

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Set Up Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update environment variables with your custom domain

### Step 6: Initialize Admin on Production

Visit: `https://your-domain.vercel.app/api/auth/setup`

## 📱 Testing Your Site

### Local Testing

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

### Production Testing

1. Check public site: `https://your-domain.vercel.app`
2. Test admin login: `https://your-domain.vercel.app/admin/login`
3. Add content through admin dashboard
4. Verify changes appear on public site

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error:** "MongooseServerSelectionError"
- Check your MongoDB connection string
- Verify database user credentials
- Ensure IP whitelist includes 0.0.0.0/0

### Cloudinary Upload Issues

**Error:** "Upload failed"
- Verify Cloudinary credentials
- Check API key and secret
- Ensure cloud name is correct

### Authentication Issues

**Error:** "Invalid credentials"
- Verify admin email and password in `.env.local`
- Run setup endpoint again: `/api/auth/setup`
- Clear browser cookies and try again

### Build Failures

**Error during build:**
```bash
npm run build
```
- Check for TypeScript errors
- Verify all environment variables are set
- Ensure all dependencies are installed

### Image Upload Issues

**Large images not uploading:**
- Cloudinary free tier has file size limits
- Compress images before uploading
- Use JPEG instead of PNG for photos

## 📊 Monitoring and Analytics

### Adding Google Analytics (Optional)

1. Create a Google Analytics account
2. Get your Measurement ID
3. Add to `app/layout.tsx`:

```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use strong passwords** for admin accounts
3. **Rotate credentials** periodically
4. **Enable 2FA** on MongoDB Atlas and Cloudinary
5. **Monitor logs** in Vercel dashboard
6. **Keep dependencies updated**: `npm update`

## 🎯 Next Steps

### Enhance Your Portfolio

1. **Add more projects** with screenshots
2. **Write detailed descriptions** for experiences
3. **Upload certificates** with badges
4. **Add blog section** (optional - requires additional development)
5. **Implement contact form** with email notifications

### SEO Optimization

1. Update `app/layout.tsx` metadata with your information
2. Add relevant keywords
3. Submit sitemap to Google Search Console
4. Add meta descriptions to pages

### Performance Optimization

1. Optimize images before uploading
2. Use WebP format when possible
3. Monitor Core Web Vitals in Vercel
4. Enable caching for static assets

## 💡 Tips for Success

1. **Keep content updated** - Regularly add new projects and achievements
2. **Professional photos** - Use high-quality profile pictures
3. **Concise descriptions** - Keep text clear and scannable
4. **Mobile-first** - Test on mobile devices
5. **Share your portfolio** - Add link to resume, LinkedIn, GitHub
6. **Collect feedback** - Ask friends/colleagues for input

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review error messages carefully
3. Check Vercel deployment logs
4. Verify all environment variables
5. Test locally first before deploying

## 🎉 Congratulations!

Your portfolio website is now live! Keep it updated, and use it to showcase your amazing work to potential employers and collaborators.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

