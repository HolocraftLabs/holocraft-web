# BootstrapMade — Interactions

## Navigation

### Sticky Navbar
The navbar is the most consistently implemented component across all BootstrapMade templates. Behavior:

1. **Initial state (at top of page)**: transparent background, white or colored text/logo — creates impression of hero section extending behind nav
2. **Scrolled state (after 100px)**: white `#ffffff` background appears with `box-shadow: 0 2px 20px rgba(0,0,0,0.1)`, text changes to dark `#212529`
3. **Transition**: `background-color 0.4s ease, box-shadow 0.4s ease`
4. **Position**: `position: fixed; top: 0; left: 0; right: 0; z-index: 1000`
5. **Height**: `64px` desktop, `56px` mobile

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 14px 0;
  transition: background-color 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease;
  background-color: transparent;
}

.navbar.scrolled {
  background-color: #ffffff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 10px 0;    /* nav "shrinks" on scroll */
}
```

### Hamburger Menu (Mobile)
- Trigger breakpoint: `992px` (`lg`) — nav collapses below this
- Hamburger: Bootstrap's `.navbar-toggler` with 3-line icon
- Menu opens: Bootstrap collapse animation, `height: 0 → auto`, `transition: height 0.35s ease`
- Mobile menu: full-width dropdown, white background, links stacked vertically, `padding: 12px 16px`
- Close: tap outside or tap X (if custom toggle added)

### Dropdown Menus
```css
.dropdown-menu {
  border: none;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 8px 0;
  min-width: 200px;
  animation: dropdownFade 0.2s ease;
}

.dropdown-item {
  font-size: 14px;
  color: #212529;
  padding: 8px 20px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #3498db;
}
```

### Scroll Spy
Active nav link highlights as user scrolls through sections. Bootstrap's built-in ScrollSpy:
```html
<body data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="80">
```
Active link receives `color: #3498db` and optional underline indicator.

## Back to Top Button

Appears after scrolling 100px down. Standard implementation across all templates.

```css
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #3498db;
  color: #ffffff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease;
  z-index: 999;
  box-shadow: 0 2px 15px rgba(52, 152, 219, 0.4);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background-color: #2980b9;
}
```

```javascript
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.back-to-top');
  btn.classList.toggle('visible', window.scrollY > 100);
});

document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

## Buttons

### Primary Button States
```css
.btn-primary {
  background-color: #3498db;
  border: 2px solid #3498db;
  color: #ffffff;
  padding: 10px 28px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.35);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
  background-color: #2471a3;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.35);   /* accessibility focus ring */
}
```

### Outline Button
```css
.btn-outline {
  background-color: transparent;
  border: 2px solid #3498db;
  color: #3498db;
  padding: 10px 28px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: #3498db;
  color: #ffffff;
}
```

## Forms

### Input States
```css
.form-control {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 15px;
  color: #212529;
  background-color: #ffffff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
  outline: none;
}

.form-control.is-invalid {
  border-color: #dc3545;
  box-shadow: none;
}

.form-control.is-valid {
  border-color: #28a745;
  box-shadow: none;
}
```

### Floating Labels (Bootstrap 5 pattern)
```html
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="email" placeholder="name@example.com">
  <label for="email">Email address</label>
</div>
```
Label floats above the field on focus and when value is present.

### Validation Messages
```html
<div class="invalid-feedback">Please enter a valid email address.</div>
<div class="valid-feedback">Looks good!</div>
```
`font-size: 13px`, `color: #dc3545` for invalid, `color: #28a745` for valid.

### Contact Form Submit State
```css
/* Loading state — button shows spinner */
.btn-loading {
  pointer-events: none;
  opacity: 0.7;
}

/* Success state */
.form-success-message {
  background-color: #d4edda;
  border: 1px solid #28a745;
  color: #155724;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 15px;
  display: none;
}

.form-success-message.visible {
  display: block;
}
```

## Gallery and Portfolio

### Isotope Grid Filtering
JavaScript library for animated grid filtering. Filter buttons:
```html
<ul class="portfolio-filters">
  <li data-filter="*" class="filter-active">All</li>
  <li data-filter=".filter-web">Web</li>
  <li data-filter=".filter-brand">Branding</li>
</ul>
```
Filtering animation: items scale out and new items scale in, `duration: 400ms`. Active filter button gets primary color styling.

### Swiper Carousels
Used for testimonials, client logos, portfolio hero images:
```javascript
new Swiper('.testimonial-slider', {
  loop: true,
  speed: 600,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 30 },
    992: { slidesPerView: 3, spaceBetween: 30 },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
```

## Accordion FAQ

Built on Bootstrap's collapse component:
```html
<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button"
              data-bs-toggle="collapse" data-bs-target="#faq1">
        Question text here
      </button>
    </h2>
    <div id="faq1" class="accordion-collapse collapse show">
      <div class="accordion-body">Answer text here</div>
    </div>
  </div>
</div>
```

```css
.accordion-button:not(.collapsed) {
  color: #3498db;
  background-color: rgba(52, 152, 219, 0.05);
  box-shadow: none;
}

.accordion-button::after {
  /* Bootstrap's default chevron, colored via filter */
  filter: invert(0) sepia(1) saturate(2) hue-rotate(185deg);
}
```
Collapse animation: `height 0.35s ease`.

## Lightbox — GLightbox

Used for image galleries, video popups, portfolio detail views:
```javascript
GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
  autoplayVideos: true,
  openEffect: 'zoom',      // zoom in from thumbnail
  closeEffect: 'zoom',
  slideEffect: 'slide',    // slide between images
});
```
Overlay: `background: rgba(0, 0, 0, 0.92)`. Navigation arrows: white, positioned at vertical center.

## Preloader

Many templates include a full-page preloader that fades out when the page is ready:
```css
#preloader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease;
}

#preloader.loaded {
  opacity: 0;
  pointer-events: none;
}
```
```javascript
window.addEventListener('load', () => {
  document.querySelector('#preloader').classList.add('loaded');
});
```

## Tooltip and Popover
Bootstrap's Tooltip for icon labels, form field hints:
```javascript
const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltips.forEach(el => new bootstrap.Tooltip(el));
```
`placement: 'top'` default, `delay: { show: 200, hide: 100 }`.
