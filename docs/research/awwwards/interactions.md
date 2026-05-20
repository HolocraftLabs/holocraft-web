# Awwwards Interaction Patterns

## Navigation

### Minimal Persistent Nav
The most common SOTD navigation pattern: almost nothing is visible until needed.

```
[Logo]                                          [Menu ≡]
```

The entire navigation collapses to logo + hamburger. Links are hidden in a fullscreen overlay.

```css
.minimal-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 24px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* No background — transparent over content */
  mix-blend-mode: difference; /* Optional: inverts against background */
}

.hamburger-button {
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  cursor: none; /* Custom cursor takes over */
}

.hamburger-line {
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: transform 400ms cubic-bezier(0.76, 0, 0.24, 1),
              opacity 300ms ease;
}

/* Open state */
.hamburger-button.is-open .hamburger-line:first-child {
  transform: translateY(3.5px) rotate(45deg);
}
.hamburger-button.is-open .hamburger-line:last-child {
  transform: translateY(-3.5px) rotate(-45deg);
}
```

### Fullscreen Navigation Overlay

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export function FullscreenNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-10 z-[200] w-10 h-10 flex flex-col justify-center gap-1.5"
      >
        <span
          className={`block h-px bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            ${isOpen ? 'w-8 translate-y-[3.5px] rotate-45' : 'w-8'}`}
        />
        <span
          className={`block h-px bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            ${isOpen ? 'w-8 -translate-y-[3.5px] -rotate-45' : 'w-6'}`}
        />
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[150] bg-[#0d0d0d] flex flex-col justify-end p-10 pb-16"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-[clamp(48px,8vw,96px)] font-[400] text-white leading-[1.0]
                    tracking-[-0.03em] hover:text-[#888888] transition-colors duration-300
                    block overflow-hidden"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '110%' }}
                  transition={{
                    duration: 0.7,
                    ease: [0.65, 0, 0.35, 1],
                    delay: i * 0.07, // 70ms stagger between links
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Footer row */}
            <motion.div
              className="flex justify-between items-end mt-auto pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="text-[12px] tracking-[0.1em] uppercase text-[#555555]">
                Est. 2019
              </div>
              <div className="flex gap-6 text-[12px] tracking-[0.1em] uppercase text-[#555555]">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

## Custom Cursor (Full Implementation)

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'click' | 'hidden';

export function AWWCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [label, setLabel] = useState('');
  let x = 0, y = 0;

  useEffect(() => {
    const cursor = cursorRef.current!;
    let raf: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12; // lerp
      currentY += (targetY - currentY) * 0.12;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    const onLinkEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setState('hover');
      setLabel(el.dataset.cursorLabel || '');
    };
    const onLinkLeave = () => {
      setState('default');
      setLabel('');
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onLinkEnter);
      el.addEventListener('mouseleave', onLinkLeave);
    });
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const sizes = {
    default: 'w-3 h-3',
    hover: 'w-16 h-16',
    click: 'w-8 h-8',
    hidden: 'w-0 h-0',
  };

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full
        flex items-center justify-center
        mix-blend-difference bg-white
        transition-[width,height] duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        ${sizes[state]}`}
    >
      {state === 'hover' && label && (
        <span className="text-[9px] font-[500] tracking-[0.1em] uppercase text-black text-center leading-tight px-1">
          {label}
        </span>
      )}
    </div>
  );
}
```

**Usage with label:**
```html
<a href="/work" data-cursor-label="View">Our Work</a>
```

## Project Grid — Image Follow Cursor

The signature portfolio interaction: hovering a project row/title makes a preview image appear and trail the cursor.

```tsx
'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  year: string;
  category: string;
  imageUrl: string;
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  // Smooth follow with spring
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX + 20);
    cursorY.set(e.clientY - 80);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {/* Floating image */}
      <motion.div
        className="fixed pointer-events-none z-50 w-[280px] h-[180px] rounded-xl overflow-hidden"
        style={{ x: springX, y: springY, top: 0, left: 0 }}
        animate={{
          opacity: hoveredId !== null ? 1 : 0,
          scale: hoveredId !== null ? 1 : 0.9,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {projects.map(p => (
          <motion.img
            key={p.id}
            src={p.imageUrl}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: hoveredId === p.id ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>

      {/* Project rows */}
      <div className="divide-y divide-white/[0.06]">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="py-6 flex items-center justify-between cursor-none"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-baseline gap-6">
              <span className="text-[11px] font-[500] tracking-[0.1em] uppercase text-[#555555] w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[clamp(24px,3.5vw,52px)] font-[400] text-white tracking-[-0.02em] leading-none">
                {project.title}
              </span>
            </div>
            <div className="flex items-center gap-8 text-[12px] tracking-[0.08em] uppercase text-[#555555]">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

## Loading Screen

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + (Math.random() * 6 + 2);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 400);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0d0d0d] flex flex-col"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Brand mark */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white/20 text-[12px] tracking-[0.3em] uppercase">
              Loading
            </div>
          </div>

          {/* Progress counter + bar at bottom */}
          <div className="p-10 flex items-end justify-between">
            <div className="text-[clamp(64px,12vw,160px)] font-[700] leading-none text-white tabular-nums">
              {Math.round(Math.min(progress, 100))}
            </div>
            <div className="w-[200px] pb-3">
              <div className="w-full h-[1px] bg-white/10">
                <motion.div
                  className="h-full bg-white origin-left"
                  style={{ scaleX: progress / 100 }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Scroll Progress Indicator

```tsx
'use client';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrollTop / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* Top line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] z-[90] bg-white/[0.06]">
        <div
          className="h-full bg-white/60 origin-left transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Percentage counter — optional */}
      <div className="fixed bottom-8 right-10 z-[90] text-[11px] font-[500] tracking-[0.1em] text-white/30 tabular-nums">
        {Math.round(progress * 100)}%
      </div>
    </>
  );
}
```

## Page Transition System (Next.js App Router)

```tsx
// components/PageTransition.tsx
'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Curtain overlay */}
      <motion.div
        key={pathname + '-curtain'}
        className="fixed inset-0 z-[9000] bg-[#0d0d0d] pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
```
