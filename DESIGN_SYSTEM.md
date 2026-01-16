# DEVWEEK – Design System & Component Guide

## 🎨 Color Palette

### Primary Colors
```
Primary Blue:     #6366f1  (Indigo)
Primary Purple:   #8b5cf6  (Purple)
Accent Pink:      #ec4899  (Hot Pink)
Success Green:    #10b981  (Emerald)
Warning Orange:   #f59e0b  (Amber)
Error Red:        #ef4444  (Red)
```

### Dark Theme
```
Background:       #0f172a  (Dark Navy)
Surface:          #1e293b  (Slate)
Border:           rgba(99, 102, 241, 0.2)  (Subtle Indigo)
Text Primary:     #f1f5f9  (Near White)
Text Secondary:   #cbd5e1  (Light Gray)
Text Muted:       #94a3b8  (Muted Gray)
```

### Gradients
```
Primary Gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)
Hover Gradient:   linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)
Accent Gradient:  linear-gradient(135deg, #ec4899 0%, #f472b6 100%)
```

---

## 🧩 Component Library

### 1. BUTTONS

#### Primary Button
```html
<a href="#" class="btn btn-primary">S'inscrire Maintenant</a>
```
- Background: Gradient (Indigo → Purple)
- Color: White
- Glow Effect: Soft shadow

#### Outline Button
```html
<a href="#" class="btn btn-outline">Voir les Programmes</a>
```
- Background: Transparent
- Border: Indigo
- Hover: Background filled with accent color

#### Large Button
```html
<a href="#" class="btn btn-primary btn-large">Large CTA</a>
```
- Extra padding for prominence
- Used in hero sections

#### Small Button
```html
<button class="btn btn-sm">Learn More</button>
```
- Compact size for inline use

---

### 2. CARDS

#### Feature Card
```html
<div class="feature-card slide-up">
    <div class="card-header">
        <div class="feature-icon">💻</div>
        <h3 class="card-title">Title</h3>
    </div>
    <div class="card-body">
        <p class="card-description">Description</p>
        <div class="card-tags">
            <span class="tag">Tag</span>
        </div>
    </div>
</div>
```

#### Program Card
```html
<div class="program-card slide-up">
    <div class="card-header">
        <div class="feature-icon">🎯</div>
        <h3 class="card-title">Program Name</h3>
    </div>
    <div class="card-body">
        <p>Description...</p>
        <div class="card-tags">
            <span class="tag">Tech</span>
        </div>
    </div>
</div>
```

#### Speaker Card
```html
<div class="speaker-card slide-up">
    <div class="card-header">
        <div class="avatar">👤</div>
        <h3 class="card-title">Name</h3>
        <p class="speaker-role">Role/Title</p>
    </div>
    <div class="card-body">
        <p>Bio...</p>
        <div class="card-tags">
            <span class="tag">Expertise</span>
        </div>
    </div>
</div>
```

---

### 3. SECTIONS

#### Hero Section
```html
<section class="hero">
    <div class="gradient-animate"></div>
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title slide-down">Title</h1>
            <p class="hero-subtitle fade-in">Subtitle</p>
            <p class="hero-tagline fade-in">Tagline</p>
            <div class="hero-cta slide-up">
                <a href="#" class="btn btn-primary">Button 1</a>
                <a href="#" class="btn btn-outline">Button 2</a>
            </div>
        </div>
    </div>
</section>
```

#### Feature Section
```html
<section style="padding: var(--spacing-2xl) var(--spacing-md);">
    <div class="container">
        <div class="section-header fade-in">
            <h2>Section Title</h2>
            <p class="section-subtitle">Subtitle...</p>
        </div>
        <div class="card-grid">
            <!-- Cards here -->
        </div>
    </div>
</section>
```

#### CTA Section
```html
<section class="cta-section">
    <div class="container">
        <div class="cta-content slide-up">
            <h2>Ready?</h2>
            <p>Call to action message</p>
            <a href="#" class="btn btn-primary btn-large">Button</a>
        </div>
    </div>
</section>
```

---

### 4. FORMS

#### Input Field
```html
<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
    <div class="error-message"></div>
</div>
```

#### Textarea Field
```html
<div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" required></textarea>
    <div class="error-message"></div>
</div>
```

#### Select Field
```html
<div class="form-group">
    <label for="level">Level</label>
    <select id="level" name="level" required>
        <option value="">Choose...</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
    </select>
    <div class="error-message"></div>
</div>
```

---

### 5. NAVIGATION

#### Navigation Bar
```html
<nav>
    <div class="nav-container">
        <div class="logo">
            <span class="logo-text">DEVWEEK</span>
            <span class="logo-tagline">Code • Learn • Build • Connect</span>
        </div>
        <ul class="nav-menu">
            <li class="nav-item">
                <a href="index.html" class="nav-link active">Home</a>
            </li>
            <!-- More items -->
        </ul>
        <button class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</nav>
```

---

### 6. FOOTER

```html
<footer>
    <div class="footer-content">
        <div class="footer-section">
            <h3>DEVWEEK</h3>
            <p>Description...</p>
            <div class="social-links">
                <a href="#" class="social-link">𝕏</a>
                <a href="#" class="social-link">💬</a>
            </div>
        </div>
        <div class="footer-section">
            <h3>Links</h3>
            <ul class="footer-links">
                <li><a href="#">Home</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026 DEVWEEK. All rights reserved.</p>
    </div>
</footer>
```

---

## 🎬 Animation Classes

### Fade In
```html
<div class="fade-in">Content</div>
```
- Opacity: 0 → 1
- Duration: 0.6s
- Timing: ease

### Slide Up
```html
<div class="slide-up" style="--delay: 0.2s">Content</div>
```
- Transform: translateY(30px) → translateY(0)
- Opacity: 0 → 1
- Delay: via CSS variable

### Slide Down
```html
<div class="slide-down">Content</div>
```
- Transform: translateY(-30px) → translateY(0)
- Opacity: 0 → 1

### Bounce
```html
<div class="bounce">Content</div>
```
- Infinite bouncing animation
- Used for CTAs or attention-grabbing

### Pulse
```html
<div class="pulse">Content</div>
```
- Infinite opacity pulse
- Subtle attention effect

### Glow
```html
<div class="glow">Content</div>
```
- Shadow grows and shrinks
- Highlights interactive elements

---

## 📏 Spacing Scale

```
xs:   0.5rem   (8px)
sm:   1rem     (16px)
md:   1.5rem   (24px)
lg:   2rem     (32px)
xl:   3rem     (48px)
2xl:  4rem     (64px)
```

Usage:
```html
<div style="padding: var(--spacing-lg)">Content</div>
<div class="my">Margin top & bottom</div>
```

---

## 📐 Border Radius Scale

```
sm: 0.5rem   (8px)
md: 1rem     (16px)
lg: 1.5rem   (24px)
```

Applied to:
- Buttons: `var(--radius-md)`
- Cards: `var(--radius-lg)`
- Inputs: `var(--radius-md)`

---

## 🎓 Typography

### Heading Styles
```
h1: 3.5rem, 700 weight, Gradient text
h2: 2.5rem, 700 weight
h3: 1.875rem, 700 weight
```

### Body Text
```
p: 1rem, 400 weight, #cbd5e1 color
.text-muted: #94a3b8 color
.text-primary: #f1f5f9 color
```

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

---

## 🎪 Grid Layouts

### Card Grid (Auto-fit)
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg);">
    <!-- Cards -->
</div>
```

### 2-Column Grid
```html
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-lg);">
```

### Flexible Grid
```html
<div class="card-grid">
    <!-- Uses: repeat(auto-fill, minmax(250px, 1fr)) -->
</div>
```

---

## 🎯 Responsive Breakpoints

```css
/* Tablets & Down */
@media (max-width: 768px) {
    /* Mobile menu, adjusted layouts */
}

/* Mobile Only */
@media (max-width: 480px) {
    /* Single column, smaller fonts */
}
```

---

## 🎨 Using CSS Variables

### Define Global Theme
```css
:root {
    --primary: #6366f1;
    --spacing-lg: 2rem;
    --radius-md: 1rem;
}
```

### Use in Components
```css
.button {
    background: var(--primary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
}
```

### Override with Custom Properties
```html
<div style="--delay: 0.3s">Content</div>
```

---

## ✅ Accessibility Checklist

- ✅ Semantic HTML (nav, section, footer, main)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Form labels connected to inputs
- ✅ Color contrast ratios meet WCAG AA
- ✅ Focus states on interactive elements
- ✅ Alt text for images (when used)
- ✅ Reduced motion support
- ✅ Keyboard navigation working
- ✅ ARIA labels where needed

---

## 🚀 Performance Tips

1. **CSS Variables** - Easy theme changes without recompilation
2. **GPU Acceleration** - Transforms & opacity for smooth animations
3. **IntersectionObserver** - Efficient scroll-based triggers
4. **Mobile First** - Lighter base styles, progressive enhancement
5. **localStorage** - Client-side storage for forms (no backend needed)

---

## 🔗 Related Files

- `css/devweek.css` - Main stylesheet with all components
- `js/devweek.js` - JavaScript for interactions
- `index.html` - Homepage example
- `programs.html` - Program cards example
- `speakers.html` - Speaker cards example

---

**DEVWEEK Design System v1.0**
*Modern, Accessible, Developer-Friendly*
