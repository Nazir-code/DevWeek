# 🚀 DEVWEEK - Quick Start Guide

## ⚡ Get Started in 30 Seconds

### Step 1: Open the Website
1. Find your project folder: `TCC devweek`
2. Double-click **`index.html`**
3. Your browser opens automatically ✅

That's it! The website is now running.

---

## 🎮 What to Try

### Navigation
- Click links in the header to jump between pages
- Use hamburger menu (☰) on mobile
- Click DEVWEEK logo to go home

### Interactive Features
1. **Fill the Contact Form**
   - Try submitting with empty fields (see error messages)
   - Try invalid email (see validation)
   - Try correct data (see success message)

2. **View Responsive Design**
   - Press F12 to open DevTools
   - Click mobile device icon
   - Resize browser to see changes

3. **Explore Animations**
   - Scroll down the page
   - Watch cards fade and slide in
   - Hover over buttons to see glow effects

4. **Test Mobile Menu**
   - Resize to < 768px width
   - Click hamburger menu (☰)
   - Click links to navigate

---

## 📁 File Guide

### Must Know Files
```
✅ index.html         → Start here (homepage)
✅ css/devweek.css    → All styling & animations
✅ js/devweek.js      → All interactions & validation
```

### Other Pages
```
programs.html         → Hackathon tracks
speakers.html        → Speaker profiles
events.html          → Event calendar
contact.html         → Contact form
inscription.html     → Registration form
```

### Documentation
```
README.md            → Complete guide (40+ sections)
DESIGN_SYSTEM.md     → Component library & colors
PROJECT_SUMMARY.md   → Full project overview
QUICKSTART.md        → This file
```

---

## 🎨 Quick Customization

### Change Brand Color
Edit `css/devweek.css` line 7:
```css
--primary: #6366f1;  /* Change this color */
```

### Update Navigation Links
Edit `index.html` line 16-23:
```html
<a href="your-page.html" class="nav-link">Your Link</a>
```

### Update Footer Info
Edit `index.html` (bottom of file):
```html
<li><a href="mailto:your-email@devweek.com">your-email@devweek.com</a></li>
```

### Add New Feature Card
Copy this in `index.html`:
```html
<div class="feature-card slide-up" style="--delay: 0.4s">
    <div class="card-header">
        <div class="feature-icon">🎯</div>
        <h3 class="card-title">Your Card Title</h3>
    </div>
    <div class="card-body">
        <p class="card-description">Your description here</p>
    </div>
</div>
```

---

## 🔍 Testing Checklist

### ✅ Visual Check
- [ ] Page looks clean and modern
- [ ] Colors are appealing
- [ ] Text is readable
- [ ] Images/icons display correctly

### ✅ Functionality Check
- [ ] All links work
- [ ] Forms can be filled
- [ ] Buttons are clickable
- [ ] Menu opens/closes

### ✅ Responsive Check
- [ ] Desktop looks good
- [ ] Tablet looks good
- [ ] Mobile looks good
- [ ] No overlapping text

### ✅ Animation Check
- [ ] Scroll animations play
- [ ] Hover effects work
- [ ] Animations are smooth
- [ ] No lag or stuttering

---

## 🛠 Troubleshooting

### Problem: Page doesn't load
**Solution:** 
- Check file path is correct
- Ensure HTML file exists
- Try refreshing browser (Ctrl+R)

### Problem: Styling looks wrong
**Solution:**
- Ensure `css/devweek.css` is linked
- Clear browser cache (Ctrl+Shift+Delete)
- Try another browser

### Problem: Menu doesn't work
**Solution:**
- Check `js/devweek.js` is linked
- Open DevTools (F12) > Console
- Look for error messages

### Problem: Form won't validate
**Solution:**
- Fill all required fields
- Use valid email format
- Check console for errors (F12)

---

## 📱 Mobile Testing

### Test on Device
1. Find your computer's IP address
2. Share link: `http://YOUR_IP:8000`
3. Open on phone browser

### Test in Browser
1. Press **F12** to open DevTools
2. Click mobile icon (top left corner)
3. Resize to test different sizes

### Test Orientations
- Portrait: Width 375px
- Landscape: Width 812px

---

## ⌨️ Keyboard Shortcuts

```
Tab         → Navigate through links/buttons
Shift+Tab   → Navigate backward
Enter       → Click active button/link
Escape      → Close mobile menu
F12         → Open DevTools
Ctrl+R      → Refresh page
Ctrl+Shift+ → Clear cache
```

---

## 💡 Pro Tips

### Tip 1: Customize Colors Easily
All colors use CSS variables. Change one variable to update the whole site:
```css
:root {
    --primary: #YOUR_COLOR;
}
```

### Tip 2: Add Animations
Add animation classes to any element:
```html
<div class="fade-in slide-up" style="--delay: 0.2s">
```

### Tip 3: Adjust Spacing
Change spacing throughout:
```css
--spacing-lg: 2rem;  /* Increase for more space */
```

### Tip 4: Mobile First
Mobile styling is built-in. Desktop adjusts automatically.

### Tip 5: No Dependencies
Share HTML folder - works everywhere!

---

## 🎓 Learning Path

### Beginner
1. Read **README.md** for overview
2. Open each HTML file
3. Notice semantic structure
4. Explore DevTools (F12)

### Intermediate
1. Study **css/devweek.css** structure
2. Look at animation classes
3. Understand CSS variables
4. Test changes in browser

### Advanced
1. Read **js/devweek.js** comments
2. Modify JavaScript functions
3. Add new features
4. Deploy to production

---

## 🚀 Deployment

### Deploy to Web (Free Options)

**GitHub Pages:**
1. Create GitHub account
2. Upload files to new repository
3. Enable GitHub Pages
4. Site goes live at username.github.io

**Netlify:**
1. Drag & drop folder to Netlify
2. Get instant live link
3. No build process needed

**Vercel:**
1. Connect GitHub repo
2. Deploy with one click
3. Auto-redeploys on changes

---

## 📞 Quick Help

### Q: How do I change the website name?
A: Edit `<title>` tag in each HTML file's `<head>` section.

### Q: How do I add a new page?
A: Copy `contact.html`, rename it, change navigation links.

### Q: How do I change fonts?
A: Edit `font-family` in `css/devweek.css` line 65.

### Q: How do I add dark mode?
A: Create new CSS file with dark colors, switch with JavaScript.

### Q: How do I add a database?
A: You'll need a backend (Node.js, Python, etc.) - out of scope for this project.

---

## ✨ Next Steps

### Easy (30 minutes)
- [ ] Change colors to your brand
- [ ] Update text content
- [ ] Add your logo
- [ ] Customize footer

### Medium (1-2 hours)
- [ ] Add new pages
- [ ] Create new card layouts
- [ ] Modify animations
- [ ] Add images

### Advanced (3+ hours)
- [ ] Add backend server
- [ ] Connect to database
- [ ] Implement authentication
- [ ] Deploy to production

---

## 🎉 Celebrate Success!

Congrats! You now have a:
- ✅ Modern event website
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Fully functional
- ✅ Well documented
- ✅ Production ready

**The website is complete and ready to use!**

---

## 📚 Further Learning

### CSS Topics
- CSS Grid & Flexbox
- CSS Animations & Keyframes
- CSS Custom Properties
- Media Queries
- Responsive Design

### JavaScript Topics
- DOM Manipulation
- Event Listeners
- IntersectionObserver API
- localStorage API
- Form Validation

### Web Design Topics
- Color Theory
- Typography
- Accessibility (WCAG)
- Mobile-First Design
- User Experience (UX)

---

## 🆘 Getting Help

### Check These Files First
1. **README.md** - Comprehensive guide
2. **DESIGN_SYSTEM.md** - Component library
3. **Browser DevTools** - Debug problems

### Browser DevTools (F12)
- **Elements** - Inspect HTML structure
- **Console** - See JavaScript errors
- **Network** - Check file loading
- **Responsive** - Test mobile

### Common Issues
- Cache not clearing? Use Ctrl+Shift+Delete
- JavaScript not working? Check F12 > Console
- Styling wrong? Check file paths

---

## 🎯 Quick Reference

### Colors
```
Primary: #6366f1 (Indigo)
Secondary: #8b5cf6 (Purple)
Accent: #ec4899 (Pink)
Background: #0f172a (Dark)
```

### Spacing Scale
```
xs: 0.5rem    sm: 1rem      md: 1.5rem
lg: 2rem      xl: 3rem      2xl: 4rem
```

### Breakpoints
```
Mobile: < 480px
Tablet: 480px - 768px
Desktop: > 768px
```

### Key Classes
```
.btn           .fade-in       .card-grid
.slide-up      .hero          .container
.nav-menu      .cta-section   .footer
```

---

## 🎊 You're All Set!

Everything is ready to go. Open `index.html` and enjoy your new DEVWEEK website!

**Questions?** Check README.md or DESIGN_SYSTEM.md

**Want to customize?** Edit CSS colors or JavaScript functions

**Ready to deploy?** Use GitHub Pages, Netlify, or Vercel

---

**Happy coding! 🚀**

*DEVWEEK – La Semaine des Développeurs*
*Code • Learn • Build • Connect*
