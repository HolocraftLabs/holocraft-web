# Awwwards Motion System

## Motion Personality

**Avant-garde, theatrical, surprising, precise.**

Awwwards motion does not serve usability — it serves experience. Transitions are not about moving the user from A to B efficiently; they are about making the journey from A to B memorable. Every motion decision is a creative statement. Predictable animations are failures. Familiar easing curves are missed opportunities.

The reference point is not UI animation or film — it is performance art and choreography. Motion has intention, surprise, and consequence.

## Library Stack

| Purpose | Library | Usage Frequency |
|---------|---------|----------------|
| Complex timelines | **GSAP** | Near-universal — almost every SOTD winner |
| Text splitting | **GSAP SplitText** | SOTD signature — character/line reveals |
| Smooth scroll | **Lenis** | Standard, replacing custom implementations |
| React UI animation | **Framer Motion** | When building React-based SOTD sites |
| Page transitions | **GSAP + Barba.js** | Non-SPA multi-page sites |
| WebGL | **Three.js / custom GLSL** | Always custom — never template scenes |
| 2D canvas | **PIXI.js / Paper.js** | Alternative to Three.js for 2D effects |

## Easing Values

Awwwards sites use slower, more dramatic easing than MDX.

```js
// Awwwards easing vocabulary

// Standard entrance — very slow out, dramatic deceleration
const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)'; // Stronger than MDX expo.out

// Page transitions — full S-curve, theatrical
const easeInOut = 'cubic-bezier(0.76, 0, 0.24, 1)';

// Text reveal — quick acceleration, abrupt stop
const easeText = 'cubic-bezier(0.65, 0, 0.35, 1)';

// Elastic character — for playful moments
const easeElastic = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

// GSAP equivalents
const gsapDramatic = 'power4.out';
const gsapPageTrans = 'power3.inOut';
const gsapText = 'power2.inOut';
const gsapElastic = 'elastic.out(1, 0.3)';
```

## Duration Scale

Awwwards animations run 30–50% longer than MDX equivalents. Slower = more weight = more prestige.

| Category | Duration | Usage |
|----------|---------|-------|
| Micro | `150ms` | State changes |
| Hover | `400–600ms` | Card/link hover effects |
| Entrance | `800ms–1200ms` | Section and element reveals |
| Transition | `1000–1500ms` | Page transitions, curtain reveals |
| Epic | `1500–2500ms` | Scene establishes, loading exits |

## Page Transitions

The SOTD-class page transition is a defining creative statement. Common approaches:

### Curtain Wipe (Most Common)
A colored panel slides across the entire viewport, hiding the current page, then reveals the new page.

```js
// GSAP page transition — curtain wipe
const tl = gsap.timeline();

// Transition out
tl.set('.page-curtain', { scaleX: 0, transformOrigin: 'left center' })
  .to('.page-curtain', {
    scaleX: 1,
    duration: 0.7,
    ease: 'power3.inOut',
  })
  .call(() => {
    // Navigate to new page (SPA router change)
    router.push(nextUrl);
  })
  .set('.page-curtain', { transformOrigin: 'right center' })
  .to('.page-curtain', {
    scaleX: 0,
    duration: 0.7,
    ease: 'power3.inOut',
    delay: 0.1,
  });
```

```css
.page-curtain {
  position: fixed;
  inset: 0;
  background: #0d0d0d; /* Or site accent color */
  z-index: 9999;
  transform-origin: left center;
  pointer-events: none;
}
```

### Reveal Wipe (Bottom-Up)
```js
const tl = gsap.timeline();

tl.set('.transition-overlay', { y: '100%' })
  .to('.transition-overlay', {
    y: '0%',
    duration: 0.8,
    ease: 'power3.inOut',
  })
  .call(() => router.push(nextUrl))
  .to('.transition-overlay', {
    y: '-100%',
    duration: 0.8,
    ease: 'power3.inOut',
    delay: 0.1,
  });
```

### Clip-Path Transition
```js
tl.to('.page-container', {
  clipPath: 'circle(0% at 50% 50%)',
  duration: 0.9,
  ease: 'power3.inOut',
})
.call(() => router.push(nextUrl))
.from('.new-page', {
  clipPath: 'circle(0% at 50% 50%)',
  duration: 0.9,
  ease: 'power3.out',
});
```

## Text Reveal Animations

### Character-by-Character Reveal
The single most recognizable SOTD motion pattern. Each character drops/rises into position with stagger.

```js
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

function revealHeadline(selector: string, delay: number = 0) {
  const element = document.querySelector(selector);
  const split = new SplitText(element, {
    type: 'chars,words',
    charsClass: 'char',
  });

  gsap.from(split.chars, {
    y: 80,
    opacity: 0,
    rotateX: -80,
    transformOrigin: '0% 50% -50',
    stagger: 0.025, // 25ms between each character
    duration: 0.8,
    ease: 'power4.out',
    delay,
    onComplete: () => split.revert(), // Clean up after animation
  });
}
```

### Line-by-Line Clip Reveal
Cleaner, more editorial. Each line slides up from behind a clip boundary.

```js
function revealLines(selector: string) {
  const element = document.querySelector(selector);
  const split = new SplitText(element, { type: 'lines' });

  // Wrap lines in overflow: hidden containers
  split.lines.forEach(line => {
    const parent = line.parentNode;
    const wrapper = document.createElement('span');
    wrapper.style.display = 'block';
    wrapper.style.overflow = 'hidden';
    parent.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.from(split.lines, {
    y: '102%', // Slightly past container height for clean reveal
    duration: 1.0,
    ease: 'power3.out',
    stagger: 0.1, // 100ms between lines
  });
}
```

### Word-by-Word Fade Up
```js
const split = new SplitText('.body-text', { type: 'words' });

gsap.from(split.words, {
  opacity: 0,
  y: 20,
  stagger: 0.04,
  duration: 0.6,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.body-text',
    start: 'top 80%',
  }
});
```

## Cursor

Custom cursor is a near-mandatory SOTD feature. The default browser cursor disappears, replaced by a custom element.

### Standard Custom Cursor
```css
/* Hide default cursor everywhere */
*, *::before, *::after {
  cursor: none !important;
}

.custom-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  mix-blend-mode: difference; /* Inverts colors underneath — creates inversion effect */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
  transition: width 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              height 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Hover state — cursor expands */
.custom-cursor.is-hovered {
  width: 60px;
  height: 60px;
}
```

```js
// Cursor position with lerp (smooth follow)
let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

// Hover detection
document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('is-hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovered'));
});

function animateCursor() {
  cursorX += (targetX - cursorX) * 0.1; // lerp 0.1
  cursorY += (targetY - cursorY) * 0.1;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();
```

### Cursor with Label
On portfolio sites, cursor shows project name on hover.

```jsx
// React cursor with label
const [label, setLabel] = useState('');
const [isHovered, setIsHovered] = useState(false);

// On project card hover: setLabel(projectName), setIsHovered(true)

<div
  className="custom-cursor"
  style={{ width: isHovered ? 80 : 12, height: isHovered ? 80 : 12 }}
>
  {isHovered && (
    <span className="text-[10px] font-[500] tracking-[0.1em] uppercase">
      {label}
    </span>
  )}
</div>
```

## Loading Screen

Almost universal for SOTD sites. A branded animation plays while assets load, then an exit animation reveals the site.

```jsx
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate/track actual load progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          // Exit animation
          gsap.to(overlayRef.current, {
            yPercent: -100, // Slide up and out
            duration: 1.2,
            ease: 'power3.inOut',
            delay: 0.3,
            onComplete,
          });
        }
        return Math.min(p + Math.random() * 8, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] bg-[#0d0d0d] flex items-center justify-center">
      <div className="text-center">
        {/* Progress counter */}
        <div className="text-[80px] font-[700] leading-none text-white tabular-nums">
          {Math.round(progress)}
        </div>
        {/* Progress bar */}
        <div className="w-[200px] h-[1px] bg-white/20 mt-8 mx-auto">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

## Scroll Behavior

### Lenis with Awwwards Settings
```js
const lenis = new Lenis({
  lerp: 0.07,           // Slower than MDX (0.10) — more theatrical
  smoothWheel: true,
  wheelMultiplier: 0.75, // Slower scroll encourages exploration
  touchMultiplier: 1.5,
  infinite: false,
});
```

### Pinned Scroll Sequences
SOTD sites frequently use ScrollTrigger.pin to hold a section in place while content animates within it:

```js
// Pin a section while content transitions through states
ScrollTrigger.create({
  trigger: '.pinned-section',
  pin: true,
  start: 'top top',
  end: '+=300%', // Pin for 3x viewport heights of scroll
  scrub: true,
});

// Within the pinned section, animate content panels
gsap.to('.panel-2', {
  xPercent: -100,
  scrollTrigger: {
    trigger: '.pinned-section',
    start: 'top top',
    end: '+=100%',
    scrub: 1,
  }
});
```

## Hover — Image Follow Cursor

Portfolio-standard: hovering over a project title makes a preview image appear and follow the cursor.

```jsx
function ProjectRow({ title, imageUrl }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  let currentX = 0, currentY = 0;

  const handleMouseMove = (e: React.MouseEvent) => {
    const targetX = e.clientX;
    const targetY = e.clientY;

    gsap.to(imageRef.current, {
      x: targetX + 20, // Offset from cursor
      y: targetY - 80,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <div
      className="relative border-b border-white/10 py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="text-[clamp(24px,3vw,48px)] font-[400]">{title}</span>

      {/* Following image */}
      <div
        ref={imageRef}
        className={`fixed pointer-events-none z-50 w-[200px] h-[140px] rounded-lg overflow-hidden
          transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ top: 0, left: 0 }}
      >
        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
```

## Scroll Progress Indicators

Awwwards replaces browser scrollbar with custom progress indicators.

```jsx
// Thin line progress bar at top of viewport
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[1px] z-50 bg-white/10">
      <div
        className="h-full bg-white origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
```
