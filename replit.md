# Malta Startup Space - Frontend Website

## Overview
The frontend website for maltastartupspace.com - Malta's premier startup ecosystem connecting 1,000+ founders online and soon offline. Built according to detailed brand guidelines with a focus on community engagement and WhatsApp conversion.

## Brand Identity
- **Core Message**: Malta Startup Space transforms an online community into a physical ecosystem where founders connect, build, and scale from the Mediterranean's strategic center
- **Brand Promise**: Where Islands Become Ecosystems

## Technology Stack
- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript
- Google Fonts (Montserrat, Inter)
- http-server for development

## Visual Design
### Color Palette
- **Valletta Gold** (#D4A574) - CTAs, accents
- **Mediterranean Deep** (#0A2463) - Headers, text
- **Startup White** (#FDFBF7) - Background
- **Energy Coral** (#FF6B6B) - Icons, hover states

### Typography
- Headers: Montserrat (600-700)
- Body: Inter (400-500)
- Responsive sizing with mobile optimization

## Page Structure
1. **Hero Section** - "Launch from the Center" with stats
2. **Malta Advantage** - 3 key benefits
3. **Community to Ecosystem** - Online & offline spaces
4. **Built for Builders** - Target audience segments
5. **Island Effect** - Strategic positioning
6. **Community Proof** - Testimonials
7. **Ready to Launch** - WhatsApp CTA
8. **Footer** - Links and contact

## Features
- Sticky navigation with mobile hamburger menu
- Smooth scrolling to sections
- Scroll animations and micro-interactions
- Mobile-first responsive design
- WhatsApp community focus
- Performance optimized

## Development
- Runs on port 5000
- Cache disabled for development
- Mobile breakpoint: 768px
- Tablet breakpoint: 1024px

## Deployment
Configured for autoscale deployment with Node.js Express server handling both static files and API endpoints.

## Recent Changes
- **2025-10-25**: Dark mode theme implementation, production fixes & image optimization
  - Updated hero section with black overlay (70% opacity)
  - Changed footer to pure black (#000000)
  - Updated stat cards to sleek black with slate silver grey borders
  - Converted Island Effect section to black overlay theme
  - Added 2 community videos (converted from .mov to MP4 format)
  - Installed ffmpeg for video processing
  - Complete dark theme across all sections
  - Implemented 8-section layout with brand copy
  - Added visual identity system (colors, typography)
  - Created responsive design with mobile optimization
  - Fixed mobile stat cards display (all 3 tiles now visible)
  - Added animations and micro-interactions
  - Integrated WhatsApp CTAs throughout
  - Fixed production deployment to run Express server (not static files)
  - Added trust proxy setting for Replit deployment
  - Updated CORS configuration for production
  - Set secure cookies for production environment
  - **Optimized all images to WebP format** - reduced total size from 28MB to 3.7MB (87% reduction!)

## Authentication System
- Users must submit their details before accessing WhatsApp join link
- Form collects: Name, Email, Company (optional), Website (optional)
- User data stored in PostgreSQL database
- Session-based tracking with 30-day cookie lifetime
- Protected `/join` page shows WhatsApp link only after form submission

### WhatsApp Community:
- **Link**: https://chat.whatsapp.com/HSgdX3T1jH4AIhuoo9VrVb
- **QR Code**: whatsapp-qr.png (displayed on /join page after login)

### Social Media Links:
- **Instagram**: https://www.instagram.com/maltastartupspace/
- **Facebook Group**: https://www.facebook.com/groups/maltastartupspace/
- **Facebook Page**: https://www.facebook.com/malta.startup.space
- **LinkedIn**: https://www.linkedin.com/company/maltastartupspace

## Notes
- All "Join WhatsApp" buttons redirect to the details collection form
- User data is securely stored in PostgreSQL
- No passwords required - simple one-step form
- Returning users can resubmit to update their information
- WhatsApp link is configured in server.js (line 188)