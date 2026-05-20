# MDX Interaction Patterns

## Navigation

### Structure
Dark, semi-transparent navbar. Always visible (fixed position). Extremely minimal.

```
[Logo]                    [Features] [Pricing] [Docs]    [Sign in] [Get Started →]
```

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  padding: 0 40px;
}
```

**Tailwind:**
```html
<nav class="fixed top-0 inset-x-0 z-50 h-16 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/[0.06] flex items-center px-10">
```

### Scroll Behavior
Navbar is always visible — no hide-on-scroll, no shrinking. Some MDX sites add a subtle border after 20px of scroll:

```js
useEffect(() => {
  const handleScroll = () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

```css
.navbar.scrolled {
  background: rgba(10, 10, 15, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}
```

### Nav Link Hover
```css
.nav-link {
  font-size: 14px;
  font-weight: 450;
  color: #9999aa;
  transition: color 200ms ease;
  position: relative;
}

.nav-link:hover {
  color: #ffffff;
}

/* Optional: subtle underline on hover */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: #4f9eff;
  transform: scaleX(0);
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  transform: scaleX(1);
}
```

### CTA Button in Nav
```html
<button class="px-4 py-2 text-sm font-[500] rounded-lg bg-white text-[#0a0a0f] hover:bg-[#e8e8f0] transition-colors duration-200">
  Get Started
</button>
```

Or gradient border variant:
```html
<div class="p-[1px] rounded-lg bg-gradient-to-r from-[#4f9eff] to-[#8b5cf6]">
  <button class="px-4 py-2 text-sm font-[500] rounded-[7px] bg-[#0a0a0f] text-white hover:bg-white/5 transition-colors duration-200">
    Get Started
  </button>
</div>
```

## Custom Cursor

MDX sites optionally use a custom cursor for premium feel. Simpler than Awwwards — no blend-mode difference effect by default.

```tsx
'use client';
import { useEffect, useRef } from 'react';

export function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const moveMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

      // Ring follows with lerp
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveMouse);
    animate();

    // Scale up ring on interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.opacity = '0.6';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.opacity = '0.4';
      });
    });

    return () => window.removeEventListener('mousemove', moveMouse);
  }, []);

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999]"
        style={{ transition: 'width 200ms, height 200ms' }}
      />
      {/* Ring — lerp follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[99998]"
        style={{ transition: 'width 300ms cubic-bezier(0.25,0.46,0.45,0.94), height 300ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 200ms' }}
      />
    </>
  );
}
```

## Smooth Scroll Integration

```tsx
// app/providers.tsx — Lenis provider for Next.js App Router
'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.10,
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

## Button Interactions

### Primary CTA — Gradient Fill on Hover
```tsx
<motion.button
  className="relative px-8 py-3.5 rounded-lg font-[500] text-sm overflow-hidden"
  style={{ background: 'linear-gradient(135deg, #4f9eff, #8b5cf6)' }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  <span className="relative z-10 text-white">Get Started Free</span>
  {/* Hover shimmer overlay */}
  <motion.div
    className="absolute inset-0 bg-white"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 0.1 }}
    transition={{ duration: 0.2 }}
  />
</motion.button>
```

### Secondary CTA — Ghost with Gradient Border
```tsx
<div className="p-[1px] rounded-lg bg-gradient-to-r from-[#4f9eff]/40 to-[#8b5cf6]/40 hover:from-[#4f9eff] hover:to-[#8b5cf6] transition-all duration-300">
  <motion.button
    className="w-full px-8 py-3.5 rounded-[7px] bg-[#0a0a0f] text-white text-sm font-[500]"
    whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
    whileTap={{ scale: 0.98 }}
  >
    View Documentation
  </motion.button>
</div>
```

## Card Interactions

### Dark Glass Card — Full Pattern
```tsx
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: string;
}

export function FeatureCard({ icon, title, description, accentColor = '#4f9eff' }: FeatureCardProps) {
  return (
    <motion.div
      className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden"
      whileHover={{
        y: -6,
        backgroundColor: 'rgba(255,255,255,0.055)',
        borderColor: 'rgba(255,255,255,0.14)',
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accentColor}15 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
        style={{
          background: `${accentColor}18`,
          border: `1px solid ${accentColor}30`,
        }}
      >
        {icon}
      </div>

      <h3 className="text-[17px] font-[600] text-white mb-2 tracking-[-0.01em]">
        {title}
      </h3>
      <p className="text-[14px] text-[#9999aa] leading-[1.6]">
        {description}
      </p>
    </motion.div>
  );
}
```

## 3D Scene Interaction

### Mouse-Driven Tilt
```tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4f9eff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color(0x4f9eff),
      emissiveIntensity: 0.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light = new THREE.PointLight(0x4f9eff, 3, 20);
    light.position.set(3, 3, 3);
    scene.add(light);

    // Mouse tracking
    let targetRotY = 0;
    let targetRotX = 0;
    const MAX_ROT = 0.087; // 5 degrees

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = x * MAX_ROT;
      targetRotX = y * MAX_ROT;
    };
    window.addEventListener('mousemove', handleMouse);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.001; // Idle rotation
      mesh.rotation.y += (targetRotY - mesh.rotation.y % (Math.PI * 2)) * 0.05; // Mouse tilt lerp
      mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
```

## Scroll Depth Indicators

MDX sites typically do not use explicit scroll indicators. The visual indicator is the hero itself — elements shift as user scrolls, communicating that scrolling changes something. A minimal "scroll" label may appear below the hero CTA:

```html
<div class="flex flex-col items-center gap-2 mt-12 opacity-40">
  <div class="w-[1px] h-8 bg-white/40 animate-pulse" />
  <span class="text-[11px] font-[500] tracking-[0.12em] uppercase text-white/40">Scroll</span>
</div>
```

## Tooltip / Popover

```tsx
<div className="relative group">
  <button className="text-[#9999aa] hover:text-white transition-colors">
    {/* Trigger */}
  </button>

  {/* Tooltip */}
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
    opacity-0 group-hover:opacity-100 pointer-events-none
    transition-all duration-200 translate-y-1 group-hover:translate-y-0">
    <div className="px-3 py-1.5 rounded-lg bg-[#1a1a28] border border-white/10
      text-[12px] text-white whitespace-nowrap shadow-xl">
      Tooltip text
    </div>
  </div>
</div>
```

## Input / Form Fields

```css
.input-field {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  transition: border-color 200ms ease, background 200ms ease;
}

.input-field::placeholder {
  color: #444455;
}

.input-field:focus {
  border-color: rgba(79, 158, 255, 0.50);
  background: rgba(79, 158, 255, 0.04);
  box-shadow: 0 0 0 3px rgba(79, 158, 255, 0.10);
}
```
