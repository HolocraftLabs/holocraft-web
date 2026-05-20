# Behance — Interactions

## Project Grid

### Hover State
The project feed is the primary interaction surface on Behance. Hover states are critical because they reveal metadata while the user scans.

```css
/* Card container */
.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 2px;        /* extremely subtle rounding — almost square */
  background: #f0f0f0;       /* placeholder color while image loads */
  cursor: pointer;
}

/* Thumbnail image */
.project-card__image {
  width: 100%;
  display: block;
  transform-origin: center;
  transform: scale(1);
  transition: transform 0.4s ease;
}

.project-card:hover .project-card__image {
  transform: scale(1.02);
}

/* Gradient overlay — hidden by default */
.project-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0) 40%,
    rgba(0,0,0,0.65) 100%
  );
  opacity: 0;
  transition: opacity 0.25s ease;
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

/* Overlay content */
.project-card__info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px 16px;
  transform: translateY(6px);
  opacity: 0;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.project-card:hover .project-card__info {
  transform: translateY(0);
  opacity: 1;
}

/* Title inside overlay */
.project-card__title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 4px;
}

/* Category inside overlay */
.project-card__category {
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

### Appreciate Button on Card Hover
When a project card is hovered, an "Appreciate" icon also appears (top-right or bottom-right corner of overlay). It has its own hover state:
```css
.project-card__appreciate-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.25s ease, background 0.2s ease, transform 0.15s ease;
}

.project-card:hover .project-card__appreciate-btn {
  opacity: 1;
}

.project-card__appreciate-btn:hover {
  background: rgba(255,255,255,0.25);
  transform: scale(1.1);
}
```

## Profile Header

### Layout
```
[Cover Image — 100vw × 220px]
[Container max-w-5xl mx-auto]
  [Avatar — 120×120px circular, border-4 border-white, -mt-16 relative]
  [Name — text-2xl font-bold]
  [Tagline — text-sm text-slate-500]
  [Buttons row — "Follow" + "Message" + "Share"]
  [Stats strip — Followers · Following · Project Views · Appreciations]
```

### Stats Strip Interaction
```css
.profile-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.profile-stat:hover {
  background-color: #f0f0f0;
}

.profile-stat__count {
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1d;
}

.profile-stat__label {
  font-size: 12px;
  font-weight: 400;
  color: #9c9c9c;
  letter-spacing: 0.04em;
}
```

### Cover Image Upload Interaction
On the user's own profile: hover over cover image reveals "Update Cover Image" overlay, semi-transparent dark overlay with camera icon centered.

## Appreciation (Like) Interaction

The platform's primary engagement action — clicking the Appreciate button on a project:

```tsx
// React implementation of the Appreciate interaction
function AppreciateButton({ initialCount, initialApprecia ted }: Props) {
  const [appreciated, setAppreciated] = useState(initialApprecia ted);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleClick() {
    setIsAnimating(true);
    if (appreciated) {
      setCount(c => c - 1);
      setAppreciated(false);
    } else {
      setCount(c => c + 1);
      setAppreciated(true);
    }
    setTimeout(() => setIsAnimating(false), 400);
    // API call to update appreciation
  }

  return (
    <button
      onClick={handleClick}
      className={`appreciate-btn ${appreciated ? 'appreciated' : ''} ${isAnimating ? 'animating' : ''}`}
    >
      <HeartIcon filled={appreciated} />
      <span>{count.toLocaleString()}</span>
    </button>
  );
}
```

```css
/* Pop spring animation on appreciate */
.appreciate-btn.animating .icon {
  animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}

/* Color states */
.appreciate-btn .icon {
  color: #9c9c9c;
  fill: none;
  transition: color 0.2s ease, fill 0.2s ease;
}

.appreciate-btn.appreciated .icon {
  color: #e84c3d;    /* red heart when appreciated */
  fill: #e84c3d;
}
```

## Image Viewer (Project Image Navigation)

When viewing a project page, images can often be opened in a full-screen lightbox viewer. Left/right navigation is available.

### Keyboard Support
```javascript
document.addEventListener('keydown', (e) => {
  if (!lightboxOpen) return;
  switch (e.key) {
    case 'ArrowLeft':
      navigatePrev();
      break;
    case 'ArrowRight':
      navigateNext();
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
});
```

### Navigation Arrow Buttons
```css
.lightbox-nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  z-index: 1001;
}

.lightbox-nav-btn:hover {
  background: rgba(255,255,255,0.2);
}

.lightbox-nav-btn.prev { left: 24px; }
.lightbox-nav-btn.next { right: 24px; }

.lightbox-nav-btn:active {
  transform: translateY(-50%) scale(0.92);
}
```

## Tags / Tools Chips

Below projects and in filter interfaces:

```css
.tag-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: transparent;
  border: 1px solid #e7e7e7;
  border-radius: 100px;    /* pill */
  font-size: 12px;
  font-weight: 500;
  color: #5e5e5e;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
}

.tag-chip:hover {
  border-color: #1769ff;
  color: #1769ff;
  background-color: rgba(23, 105, 255, 0.04);
}

.tag-chip.active {
  background-color: #1769ff;
  border-color: #1769ff;
  color: #ffffff;
}
```

## Comments Section

Behance's comment system supports threaded replies:

```
[Top-level comment]
  [Avatar] [Author name — bold] [timestamp — grey]
  [Comment text]
  [Reply link] [Like count]

  [Nested reply — indented 40px]
    [Avatar] [Author name] [timestamp]
    [Reply text]
    [Reply link]
```

```css
.comment-thread {
  border-left: 2px solid #f0f0f0;
  margin-left: 52px;      /* avatar width (40px) + gap (12px) */
  padding-left: 20px;
  margin-top: 12px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-author {
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1d;
}

.comment-timestamp {
  font-size: 12px;
  color: #9c9c9c;
  margin-left: 8px;
}

.comment-text {
  font-size: 14px;
  color: #1d1d1d;
  line-height: 1.6;
  margin-top: 6px;
}

.comment-actions {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.comment-action-btn {
  font-size: 12px;
  font-weight: 600;
  color: #9c9c9c;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.comment-action-btn:hover {
  color: #1769ff;
}
```

## Filter / Category Navigation

Project feed filtering by category:

```css
.filter-nav {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #e7e7e7;
  overflow-x: auto;           /* horizontal scroll on mobile */
  scrollbar-width: none;      /* hide scrollbar on Firefox */
  -webkit-overflow-scrolling: touch;
}

.filter-nav-item {
  font-size: 14px;
  font-weight: 600;
  color: #5e5e5e;
  padding: 12px 16px;
  white-space: nowrap;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.filter-nav-item:hover {
  color: #1d1d1d;
}

.filter-nav-item.active {
  color: #1769ff;
  border-bottom-color: #1769ff;
}
```

Active tab has a `2px` bottom border in platform blue — a standard but effective tab indicator pattern.
