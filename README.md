# Kai Zhi's Portfolio Website 💎

A stunning, interactive personal portfolio website with a powerful admin dashboard for easy content management.

## 🌟 Features

### Public Website
- **Modern Hero Section** - Eye-catching introduction with profile picture and tagline
- **About Me** - Detailed personal introduction
- **Experience Timeline** - Professional work history with company logos
- **Education** - Academic background with institution details
- **Skills Showcase** - Categorized skills with proficiency levels
- **Projects Gallery** - Portfolio of personal and team projects with screenshots
- **Certifications** - Professional certificates and badges
- **Awards & Achievements** - Recognition and milestones
- **Tech Events** - Hackathons, conferences, and workshops attended
- **Contact Section** - Social links and contact information
- **Smooth Animations** - Framer Motion powered transitions
- **Fully Responsive** - Works beautifully on all devices

### Admin Dashboard
- **Secure Authentication** - JWT-based login system
- **Content Management** - Easy-to-use panels for all sections
- **Image Upload** - Cloudinary integration for file management
- **Real-time Updates** - Changes reflect immediately
- **CRUD Operations** - Create, read, update, and delete all content
- **User-Friendly Interface** - Intuitive design for easy management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio\ Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your site URL (http://localhost:3000 for development)
   - `ADMIN_EMAIL` - Your admin email
   - `ADMIN_PASSWORD` - Your admin password
   - `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY` - Your Cloudinary API key
   - `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
   - `NEXT_PUBLIC_SITE_URL` - Your public site URL

4. **Set up the admin user**
   
   Run the development server and visit:
   ```
   http://localhost:3000/api/auth/setup
   ```
   
   This will create your admin account using the credentials from `.env.local`.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Public site: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login
   - Admin dashboard: http://localhost:3000/admin/dashboard

## 📁 Project Structure

```
├── app/
│   ├── admin/                 # Admin pages
│   │   ├── login/            # Login page
│   │   └── dashboard/        # Dashboard and management pages
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication
│   │   ├── about/           # About API
│   │   ├── experience/      # Experience API
│   │   └── ...              # Other API routes
│   ├── page.tsx             # Main landing page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Experience.tsx      # Experience section
│   ├── admin/              # Admin-specific components
│   └── ...                 # Other components
├── models/                  # MongoDB models
│   ├── User.ts             # User model
│   ├── About.ts            # About model
│   └── ...                 # Other models
├── lib/                     # Utility functions
│   ├── mongodb.ts          # Database connection
│   └── cloudinary.ts       # Image upload utilities
└── public/                  # Static files
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: {
    // Your primary color shades
  },
  secondary: {
    // Your secondary color shades
  },
}
```

### Content
All content can be managed through the admin dashboard at `/admin/dashboard`.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure environment variables**
   - Add all variables from `.env.local` to Vercel
   - Update `NEXTAUTH_URL` to your Vercel domain
   - Update `NEXT_PUBLIC_SITE_URL` to your Vercel domain

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be live at `https://your-project.vercel.app`

5. **Set up custom domain** (Optional)
   - Go to your project settings in Vercel
   - Add your custom domain (e.g., kai-zhi-portfolio.vercel.app)

6. **Initialize admin user**
   - Visit `https://your-domain.vercel.app/api/auth/setup`
   - This creates your admin account

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist all IP addresses (0.0.0.0/0) for Vercel
4. Get your connection string
5. Add it to your environment variables

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your environment variables

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Kai Zhi**
- Portfolio: https://kai-zhi-portfolio.vercel.app

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- All open-source contributors

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

