# Nursing Council of the Bahamas - Official Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://same-bdnr1eob2as-latest.netlify.app)

Official website for the Nursing Council of the Commonwealth of the Bahamas. A comprehensive platform for nursing registration, licensing, education, and professional development.

🌐 **Live Website:** [https://same-bdnr1eob2as-latest.netlify.app](https://same-bdnr1eob2as-latest.netlify.app)

## 📋 About

The Nursing Council of the Bahamas website serves as the primary digital platform for:
- Nursing professional registration and licensing
- Educational requirements and training programs
- Committee information and governance
- News, updates, and announcements
- Contact and support services

Established in 1971, the Nursing Council serves as the regulatory body for nursing practice throughout the Commonwealth of The Bahamas.

## 🚀 Features

- **Multi-Page Application:** Home, About, Education & Registration, Committees, News & Updates, Contact
- **Mobile-Responsive Design:** Optimized for all devices
- **Hero Carousel:** Showcasing nursing graduation ceremonies
- **Service Cards:** Quick access to registration, license renewal, and education
- **News Section:** Latest announcements and updates with urgent tags
- **Contact Forms:** Professional contact management system
- **SEO Optimized:** Meta tags, Open Graph, and structured data
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support
- **Brand Consistency:** Navy blue (#000080) and gold (#ffc72c) color scheme

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.2 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Deployment:** Netlify (Dynamic Site)
- **Package Manager:** Bun

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/noviogroup/nursing-council-bahamas.git

# Navigate to project directory
cd nursing-council-bahamas

# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Build

```bash
# Create production build
bun run build

# Start production server
bun run start
```

## 📁 Project Structure

```
nursing-council-bahamas/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── about/             # About page
│   │   ├── committees/        # Committees page
│   │   ├── contact/           # Contact page
│   │   ├── education-registration/  # Education & Registration page
│   │   ├── news/              # News & Updates page
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Home page
│   │   ├── robots.ts          # Robots.txt configuration
│   │   └── sitemap.ts         # Sitemap configuration
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Header.tsx        # Navigation header
│   │   └── Footer.tsx        # Footer component
│   └── lib/                  # Utilities
├── public/
│   ├── assets/               # Images and media files
│   └── nursing-council-logo.png
├── netlify.toml              # Netlify configuration
└── package.json
```

## 🎨 Design System

### Colors
- **Primary (Navy):** `#000080`
- **Secondary (Teal):** `#0093d0`
- **Accent (Gold):** `#ffc72c`
- **Alert (Red):** `#d9182a`
- **Dark Gray:** `#1e293b`
- **Light Background:** `#f8fafc`

### Typography
- **Heading Font:** Montserrat
- **Body Font:** Open Sans

## 🔧 Configuration

### Environment Variables
No environment variables required for basic deployment.

### Netlify Configuration
The site is configured for dynamic deployment with Next.js plugin enabled. See `netlify.toml` for details.

## 📄 Pages

1. **Home (`/`)** - Hero carousel, service cards, about snippet, news, contact CTA
2. **About (`/about`)** - History, mission, council members
3. **Education & Registration (`/education-registration`)** - Requirements, registration process, renewals
4. **Committees (`/committees`)** - Committee information and structure
5. **News & Updates (`/news`)** - Latest announcements and news
6. **Contact (`/contact`)** - Contact form and information

## 🚀 Deployment

Deployed on Netlify as a dynamic Next.js application.

**Live URL:** [https://same-bdnr1eob2as-latest.netlify.app](https://same-bdnr1eob2as-latest.netlify.app)

## 🤝 Contributing

This is an official government website. For contributions or issues, please contact the Nursing Council of the Bahamas directly.

## 📧 Contact

**Nursing Council of the Bahamas**
- **Address:** Virginia & Augusta Streets, Nassau, Bahamas
- **Phone:** (242) 604-6015 / 6017
- **Email:** info@nursingcouncilbahamas.com
- **Hours:** Monday - Friday: 9:00am - 5:00pm

## 📝 License

© 2025 Nursing Council of the Bahamas. All rights reserved.

## 🔗 Links

- [Live Website](https://same-bdnr1eob2as-latest.netlify.app)
- [GitHub Repository](https://github.com/noviogroup/nursing-council-bahamas)

---

**Built with ❤️ for the Nursing Community of The Bahamas**
