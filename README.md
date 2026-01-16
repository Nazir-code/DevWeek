# 🚀 DEVWEEK – La Semaine des Développeurs

## Overview
DEVWEEK is a modern, fully responsive event website for "The Developer's Week" - a premier tech event featuring hackathons, workshops, expert talks, and community networking.

**Tagline:** Code • Learn • Build • Connect

---

## 📁 Project Structure

```
TCC devweek/
├── index.html              # Homepage
├── programs.html           # Hackathon programs & tracks
├── speakers.html           # Featured speakers
├── events.html            # Event calendar
├── contact.html           # Contact form & info
├── inscription.html       # Registration form
│
├── css/
│   ├── devweek.css        # Main modern CSS (dark/gradient theme)
│   └── style.css          # Legacy CSS (for reference)
│
├── js/
│   ├── devweek.js         # Main JavaScript (interactions & animations)
│   └── main.js            # Legacy JS (for reference)
│
└── README.md              # This file
```

---

## 🎨 Design & Features

### Dark/Gradient Theme
- **Primary Colors:** Indigo (#6366f1) & Purple (#8b5cf6)
- **Background:** Dark navy (#0f172a) with subtle gradient overlays
- **Accent:** Pink (#ec4899) for CTAs and highlights

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet) & 480px (mobile)
- Hamburger menu for mobile navigation

### Animations & Interactions
- **Scroll Animations:** Elements fade & slide into view using IntersectionObserver
- **Hover Effects:** Cards lift with shadows, color shifts
- **Staggered Delays:** Sequential animations for visual interest
- **Reduced Motion Support:** Respects user's motion preferences

### Components
- **Navigation Bar:** Fixed header with hamburger menu
- **Hero Section:** Full-viewport welcome with gradient background
- **Feature Cards:** Modern card layouts with icons & descriptions
- **Program Cards:** Structured hackathon track information
- **Speaker Profiles:** Avatar-based speaker cards with expertise
- **Event Listings:** Upcoming & past events with dates/times
- **Contact Form:** Validation & localStorage integration
- **Footer:** Multi-column layout with social links

---

## 🛠 Technical Stack

### Frontend
- **HTML5:** Semantic markup
- **CSS3:** Grid, Flexbox, Custom Properties, Animations
- **JavaScript:** Vanilla ES6+ (No frameworks)
- **APIs Used:**
  - IntersectionObserver API (scroll animations)
  - localStorage API (form data persistence)
  - Window/Document APIs (navigation, events)

### Performance Features
- CSS variables for maintainable theming
- Optimized animations with GPU acceleration
- Mobile-optimized viewport settings
- Accessible color contrasts & form labels

---

## 📄 Pages & Content

### 1. **index.html** - Homepage
- Hero section with DEVWEEK branding
- About DEVWEEK (3-card layout)
- Feature highlights (4 cards)
- Statistics (participants, speakers, workshops, days)
- CTA for registration
- Footer with links & social

### 2. **programs.html** - Hackathon Programs
- 6 developer-focused tracks:
  - Développement Web (Frontend/Backend/Full-Stack)
  - Développement Mobile (Flutter/React Native)
  - IA & Apprentissage Machine (Python/TensorFlow/PyTorch)
  - Cybersécurité (CTF - Capture The Flag)
  - Analyse de Données (Python/SQL/Visualization)
  - Cloud & DevOps (Docker/Kubernetes/AWS)
- Participation steps (4 phases)
- CTA section

### 3. **speakers.html** - Featured Experts
- Speaker profile cards with avatars
- Name, role, expertise tags
- Hover animations
- Grid layout

### 4. **events.html** - Event Calendar
- Upcoming events section
- Past events archive
- Event cards with:
  - Date & time
  - Location
  - Description

### 5. **contact.html** - Contact Form
- Contact form with validation
- Error messages for invalid inputs
- Contact information cards
- Social media links
- Success confirmation

### 6. **inscription.html** - Registration (Legacy)
- Registration form with fields:
  - Name, Email, WhatsApp
  - Experience Level
  - Interests (checkboxes)
  - Motivation (textarea)
- Form validation
- localStorage for submissions
- Success page with participant count

---

## 🚀 Getting Started

### Opening the Website
1. Open `index.html` in your web browser
2. Navigate between pages using the top navigation menu
3. Test on mobile using browser DevTools (F12 → Mobile view)

### Keyboard Navigation
- **Tab:** Navigate through links & form fields
- **Escape:** Close hamburger menu on mobile
- **Enter:** Submit forms, activate buttons

### Mobile Menu
- Click the hamburger icon (☰) on screens < 768px
- Click links to navigate
- Menu closes automatically after selection

---

## 📝 Form Validation

### Contact & Registration Forms
- **Required Fields:** Name, Email, Subject/Message
- **Email Validation:** Uses regex pattern to verify format
- **Error Display:** Red border + error message below field
- **Success State:** Form replaced with success message
- **localStorage:** Saves submissions for persistence

### Error Messages
- English: "This field is required"
- French: "Ce champ est obligatoire"
- Email: "Adresse email invalide"

---

## 🎬 Animations

### Built-in Animation Classes
```css
.fade-in          /* Opacity: 0 → 1 */
.slide-up         /* Y: 30px → 0px */
.slide-down       /* Y: -30px → 0px */
.slide-in-left    /* X: -30px → 0px */
.bounce           /* Bouncing effect */
.pulse            /* Opacity pulse */
.glow             /* Shadow glow effect */
```

### Animation Timing
- **Default:** 0.6s ease
- **Slow:** 0.5s ease (--transition-slow)
- **Stagger:** Uses `--delay` CSS variable (0.1s increments)

### Trigger Methods
1. **Scroll-based:** IntersectionObserver detects elements
2. **Auto-animate:** Classes applied in HTML with delay
3. **Hover:** Card hover effects on buttons & cards

---

## 🎯 CSS Variables Reference

### Colors
```css
--primary: #6366f1              /* Main brand color */
--secondary: #8b5cf6            /* Secondary purple */
--accent: #ec4899               /* Pink highlights */
--success: #10b981              /* Green for success */
--danger: #ef4444               /* Red for errors */
--bg-dark: #0f172a              /* Main background */
--bg-card: #1e293b              /* Card background */
--text-primary: #f1f5f9         /* Main text */
--text-secondary: #cbd5e1       /* Secondary text */
```

### Spacing
```css
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 1.5rem
--spacing-lg: 2rem
--spacing-xl: 3rem
--spacing-2xl: 4rem
```

### Shadows & Effects
```css
--shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05)
--shadow-glow: 0 0 20px rgba(99,102,241,0.3)
--gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6)
```

---

## 🔧 Customization Guide

### Change Brand Color
Edit CSS variables in `css/devweek.css`:
```css
:root {
    --primary: #YOUR_COLOR;
    --secondary: #YOUR_COLOR_2;
}
```

### Update Navigation Links
Edit the nav in each HTML file:
```html
<a href="your-page.html" class="nav-link">Your Link</a>
```

### Modify Animation Timing
Change delay in HTML:
```html
<div class="card slide-up" style="--delay: 0.2s">
```

Or in CSS:
```css
.fade-in {
    animation-duration: 0.8s;  /* Default is 0.6s */
}
```

### Add New Feature Cards
Copy this template and update content:
```html
<div class="feature-card slide-up" style="--delay: 0.7s">
    <div class="card-header">
        <div class="feature-icon">🎯</div>
        <h3 class="card-title">Your Title</h3>
    </div>
    <div class="card-body">
        <p class="card-description">Your description</p>
        <div class="card-tags">
            <span class="tag">Tag 1</span>
            <span class="tag">Tag 2</span>
        </div>
    </div>
</div>
```

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ⚠️ No  |

---

## 🔍 SEO Considerations

- Semantic HTML5 elements (nav, section, article, footer)
- Descriptive page titles
- Meta viewport for responsive design
- Heading hierarchy (h1, h2, h3)
- Image alt attributes (when used)
- Open Graph meta tags (recommended to add)

---

## 📦 File Sizes

```
css/devweek.css     ~45 KB (with comments)
js/devweek.js       ~15 KB (with comments)
HTML files          ~4-8 KB each
```

---

## 🎓 Learning Highlights

This project demonstrates:
- ✅ Modern CSS Grid & Flexbox layouts
- ✅ CSS Custom Properties (variables) for theming
- ✅ CSS Animations & Keyframes
- ✅ Responsive design with mobile-first approach
- ✅ Vanilla JavaScript without frameworks
- ✅ IntersectionObserver API for scroll animations
- ✅ Form validation & error handling
- ✅ localStorage for data persistence
- ✅ Accessibility best practices
- ✅ Professional design patterns

---

## 🚦 Troubleshooting

### Navigation Not Working
- Check file paths in href attributes
- Ensure HTML files are in the same directory
- Clear browser cache (Ctrl+Shift+Delete)

### Animations Not Playing
- Check browser supports CSS animations (all modern browsers do)
- Verify `css/devweek.css` is properly linked
- Check if user has "prefers-reduced-motion" enabled

### Form Not Validating
- Ensure `js/devweek.js` is linked and loaded
- Check browser console for errors (F12)
- Verify form field names match validation logic

### Responsive Issues
- Test in browser DevTools (F12 → Toggle Device Toolbar)
- Check viewport meta tag in HTML head
- Clear cache and refresh

---

## 📧 Contact Information

**DEVWEEK – La Semaine des Développeurs**
- Email: info@devweek.com
- Phone: +33 1 23 45 67 89
- Location: Paris, France

---

## 📄 License

This is a student project. Feel free to use, modify, and distribute as needed.

---

## ✨ Credits

Built with ❤️ for the DEVWEEK developer community.

**Technologies Used:**
- HTML5, CSS3, JavaScript (Vanilla)
- No dependencies, fully self-contained
- Modern web standards & best practices

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
