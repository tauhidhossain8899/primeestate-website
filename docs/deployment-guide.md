# Deployment Guide
## Environment Variables
Set these in your hosting platform:
VITE_PUBLIC_SUPABASE_URL=your_supabase_url
VITE_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key


## Build Commands
- Install: `npm install`
- Build: `npm run build`
- Output: `dist/` folder
## Hosting Platforms
### Vercel
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically
### Netlify<br>
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables
### Custom Domain
1. Add custom domain in hosting platform
2. Update Supabase auth settings
3. Update any hardcoded URLs
