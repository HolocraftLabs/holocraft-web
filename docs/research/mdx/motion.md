# MDX Motion System

## Motion Personality

**Cinematic, weighted, immersive, deliberate, premium.**

MDX motion never feels reactive or snappy. Every animation feels like it has physical mass — things ease into place rather than snap. The pacing communicates that this product is serious, confident, and unhurried. Fast animations signal anxiety. MDX motion signals control.

The reference point is not UI animation — it is cinema. Specifically: title card sequences from prestige film trailers. Weighted fades, deliberate reveals, elements that breathe rather than jump.

## Library Stack

| Purpose | Library | Why |
|---------|---------|-----|
| UI component animation | **Framer Motion** | Declarative, React-native, handles layout animations |
| 3D scene animation | **GSAP** | Precise timeline control, Three.js integration |
| Scroll-linked animation | **GSAP ScrollTrigger** | Most capable scroll animation tool available |
| Smooth scroll | **Lenis** | Lerp-based smooth scroll, native-feeling |
| Complex UI sequences | **GSAP** | When Framer Motion's declarative model is limiting |

**Never use:** CSS animation alone for anything interactive, anime.js (limited Three.js integration), Velocity.js (outdated).

## Easing Library

The easing choices are critical to the MDX personality. Wrong easing makes professional animations look amateur.

```js
// The canonical MDX easing values

// Standard UI entrance — fast in, slow out
const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'; // Expo out-ish

// Page transitions — aggressive S-curve
const easeInOut = 'cubic-bezier(0.87, 0, 0.13, 1)'; // Expo in-out

// Hover micro-interactions — quick, responsive
const easeHover = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Quad out

// Spring-like — for elements that need bounce character
const easeSpring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Back out

// GSAP equivalents
const gsapEaseOut = 'expo.out';
const gsapEaseInOut = 'expo.inOut';
const gsapPower = 'power3.out';
const gsapBack = 'back.out(1.7)';
```

**Framer Motion spring config (for UI elements):**
```js
const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
};

// Softer spring for large elements
const softSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1.5,
};
```

## Duration Scale

| Category | Duration | Usage |
|----------|---------|-------|
| Micro | `100ms` | Hover color changes, opacity flickers |
| Fast | `200ms` | Hover scale, button press feedback |
| Base | `400ms` | Card hover lift, nav item transitions |
| Standard | `600ms` | Entrance animations, section reveals |
| Cinematic | `800ms` | Hero element appearances |
| Narrative | `1200ms` | Page transitions, scene reveals |
| Epic | `1800–2000ms` | 3D scene initialization, loading screen exits |

## Smooth Scroll (Lenis)

Lenis is the standard smooth scroll library for MDX-class sites. It wraps native scroll events with a lerp (linear interpolation) buffer that creates the characteristic "weighted" scroll feeling.

```js
// Standard Lenis initialization (Next.js app)
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.10,           // Lower = smoother/slower. MDX range: 0.08–0.12
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly slower scroll speed
      infinite: false,
      orientation: 'vertical',
    });

    // Integrate with GSAP ticker for ScrollTrigger sync
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // If using GSAP ScrollTrigger, connect Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, []);
}
```

**Lerp values by feel:**
- `0.06` — Very silky, almost floaty. Premium/editorial feel.
- `0.10` — Standard MDX. Smooth but responsive.
- `0.14` — Slightly snappier. Good for content-heavy sites.
- `0.20+` — Barely noticeable smoothing.

## Page Load Sequence

The MDX page load is a precisely choreographed sequence. Never show everything at once.

```
0ms        → Black screen / loading state
0–800ms    → Three.js scene initializes and renders first frame
800ms      → Canvas fades in (opacity 0→1, 800ms, ease linear)
800ms      → Loader exit animation begins
1000ms     → Navigation bar fades in (opacity 0→1, 400ms, ease out)
1200ms     → Hero headline animates in: y(40px→0) + opacity(0→1), 600ms, expo.out
1400ms     → Subheadline animates in: y(30px→0) + opacity(0→1), 600ms, expo.out
1600ms     → CTA button fades in: opacity(0→1), 400ms, ease out
1600ms+    → Any secondary hero elements (badge, scroll indicator) fade in
```

**GSAP timeline implementation:**
```js
const tl = gsap.timeline({ delay: 0.8 }); // Start after 800ms

tl.from('.hero-heading', {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: 'expo.out',
}, 0)
.from('.hero-subtext', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: 'expo.out',
}, 0.2) // 200ms after heading
.from('.hero-cta', {
  opacity: 0,
  duration: 0.4,
  ease: 'power2.out',
}, 0.4); // 400ms after heading
```

## Scroll-Linked Animations

### 3D Camera Movement (GSAP ScrollTrigger + Three.js)
The signature MDX pattern: scrolling moves the camera through the 3D scene.

```js
// ScrollTrigger driving Three.js camera Z position
gsap.to(camera.position, {
  z: 3, // Camera starts at z:5, moves to z:3 on scroll
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top', // First 100vh
    scrub: 1.5, // 1.5s lag behind scroll — smooth
    invalidateOnRefresh: true,
  },
});

// Y-axis tilt on scroll
gsap.to(camera.rotation, {
  x: -0.1, // Slight tilt down as user scrolls
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 2,
  },
});
```

### Section Reveal on Scroll
```js
// Elements animate in when section enters viewport
gsap.from('.feature-card', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'expo.out',
  scrollTrigger: {
    trigger: '.features-section',
    start: 'top 75%', // Trigger when section top is 75% down viewport
    toggleActions: 'play none none reverse',
  },
});
```

### Parallax Text on Scroll
```js
// Headline moves at different speed than scroll (parallax)
gsap.to('.hero-headline', {
  y: -80, // Move 80px up as user scrolls 100vh
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});
```

## Hover Interactions

### Magnetic Hover (CTA Buttons)
The cursor pulls the button toward it — button moves 10–15px in cursor direction.

```js
// Magnetic hover implementation
function magneticHover(element: HTMLElement, strength: number = 0.3) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  });
}
```

### Card Hover (Framer Motion)
```jsx
<motion.div
  className="glass-card"
  whileHover={{
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(79,158,255,0.12)',
    borderColor: 'rgba(255,255,255,0.16)',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  }}
  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  {/* card content */}
</motion.div>
```

### Button Hover (scale + glow)
```jsx
<motion.button
  whileHover={{
    scale: 1.03,
    boxShadow: '0 0 30px rgba(79,158,255,0.4)',
  }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  Get Started
</motion.button>
```

## 3D Animation (Three.js + GSAP)

### Model Idle Rotation
```js
// In Three.js animation loop
function animate() {
  requestAnimationFrame(animate);

  // Continuous idle rotation
  mesh.rotation.y += 0.001;    // 0.001 rad/frame ≈ 3.4°/s
  mesh.rotation.x += 0.0003;  // Slight X axis wobble

  renderer.render(scene, camera);
}
```

### Mouse-Driven 3D Rotation
```js
// Scene tilts toward cursor position
let targetRotationX = 0;
let targetRotationY = 0;
const maxRotation = 0.087; // 5 degrees in radians

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;  // -1 to +1
  const y = (e.clientY / window.innerHeight) * 2 - 1; // -1 to +1

  targetRotationY = x * maxRotation;
  targetRotationX = y * maxRotation;
});

// In animation loop: lerp toward target
function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.05; // lerp
  mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.05;

  renderer.render(scene, camera);
}
```

## Entrance Animation Patterns (Framer Motion)

### Staggered List Items
```jsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // 100ms between each child
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // expo.out
    }
  }
};

// Usage
<motion.ul variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### Section Reveal (useInView)
```jsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

## Three.js Scene Initialization

```js
// Standard MDX Three.js scene setup sequence
async function initScene(canvas: HTMLCanvasElement) {
  // 1. Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,  // Transparent background — CSS bg shows through
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // 2. Scene
  const scene = new THREE.Scene();

  // 3. Camera
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  // 4. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  const pointLight = new THREE.PointLight(0x4f9eff, 2, 20);
  pointLight.position.set(3, 3, 3);
  const fillLight = new THREE.PointLight(0x8b5cf6, 1, 20);
  fillLight.position.set(-3, -2, 2);
  scene.add(ambientLight, pointLight, fillLight);

  // 5. Fade in canvas (cinematic reveal)
  gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.2 });

  return { renderer, scene, camera };
}
```
