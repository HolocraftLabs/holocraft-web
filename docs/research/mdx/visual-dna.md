# MDX Visual DNA

## Color System

### Background Colors
The canonical MDX background is near-black with a slight blue or purple bias — never pure black (#000000) which reads flat under monitors.

| Role | Hex | Usage |
|------|-----|-------|
| Primary background | `#0a0a0f` | Full-page base, hero backgrounds |
| Deeper background | `#050508` | Behind floating panels, depth layers |
| Surface elevated | `#12121a` | Card backgrounds, modal backdrops |
| Surface high | `#1a1a28` | Hovered card, active states |

### Foreground Colors
| Role | Hex | Usage |
|------|-----|-------|
| Primary text | `#ffffff` | Headlines, key values |
| Secondary text | `#9999aa` | Body copy, subheadings |
| Tertiary text | `#666680` | Labels, metadata, fine print |
| Disabled/muted | `#444455` | Inactive states |
| Foreground tinted | `#e8e8f0` | Light body on dark surfaces |

### Accent Colors
| Role | Hex | Usage |
|------|-----|-------|
| Electric blue | `#4f9eff` | Primary accent, CTA highlights, glow source |
| Soft blue | `#3b82f6` | Tailwind blue-500 equivalent, buttons |
| Violet | `#8b5cf6` | Secondary accent, gradient terminus |
| Violet deep | `#7c3aed` | Hover states on violet elements |
| Cyan | `#06b6d4` | Tertiary accent, data visualization |
| Cyan bright | `#22d3ee` | Highlights on cyan-accented elements |

### Gradient Recipes

**Hero headline gradient (last word):**
```css
background: linear-gradient(135deg, #4f9eff 0%, #8b5cf6 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

**Hero radial glow backdrop:**
```css
background: radial-gradient(ellipse 80% 50% at 50% 40%, rgba(79, 158, 255, 0.15) 0%, transparent 70%);
```

**Card border gradient:**
```css
background: linear-gradient(135deg, rgba(79,158,255,0.3) 0%, rgba(139,92,246,0.3) 100%);
```

**Section transition gradient:**
```css
background: linear-gradient(180deg, #0a0a0f 0%, #0d0d1a 50%, #0a0a0f 100%);
```

**Feature icon glow:**
```css
box-shadow: 0 0 40px rgba(79, 158, 255, 0.25), 0 0 80px rgba(79, 158, 255, 0.1);
```

**Mesh gradient background (subtle):**
```css
background: 
  radial-gradient(ellipse at 20% 50%, rgba(79,158,255,0.08) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%),
  #0a0a0f;
```

### Border Colors
| Role | Value | Usage |
|------|-------|-------|
| Subtle divider | `rgba(255,255,255,0.06)` | Section dividers, card borders |
| Glass border | `rgba(255,255,255,0.10)` | Interactive cards, panels |
| Active border | `rgba(79,158,255,0.40)` | Focused inputs, active cards |

**Gradient border CTA technique:**
```css
/* Wrapper approach */
.cta-wrapper {
  background: linear-gradient(135deg, #4f9eff, #8b5cf6);
  padding: 1px;
  border-radius: 8px;
}
.cta-inner {
  background: #0a0a0f;
  border-radius: 7px;
  padding: 12px 24px;
}
```

## Grid System

### Layout Grid
- **Columns:** 12-column grid
- **Max-width:** 1280px standard, 1440px for full-width hero treatments
- **Gutters:** 40px at desktop (1024px+), 24px at tablet (768px–1023px), 16px at mobile
- **Side padding:** 80px at 1440px, 40px at 1280px, 24px at mobile

### Tailwind Config Values
```js
// tailwind.config.js
theme: {
  container: {
    center: true,
    padding: {
      DEFAULT: '1rem',
      sm: '1.5rem',
      lg: '2.5rem',
      xl: '5rem',
    },
    screens: {
      xl: '1280px',
    }
  }
}
```

### Content Width Constraints
| Content type | Max width |
|-------------|-----------|
| Hero heading | `760px` |
| Body paragraph | `560-600px` |
| Feature grid | `1100px` |
| Testimonial card | `480px` |
| Full-bleed section | `100vw` |

## Density and Spacing

MDX-class sites are sparse. They use space as a design element, not empty space waiting to be filled.

### Vertical Section Padding
| Section type | Desktop | Mobile |
|-------------|---------|--------|
| Hero section | `160px-200px` top/bottom | `80px-100px` |
| Standard feature section | `120px-160px` | `60px-80px` |
| Testimonials | `100px-140px` | `60px` |
| Footer | `80px-100px` | `40px-60px` |

### Component Spacing Scale
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 40px;
--space-xl: 64px;
--space-2xl: 96px;
--space-3xl: 160px;
```

### Breathing Room Rules
- Between headline and subheadline: `16-24px`
- Between subheadline and CTA: `32-40px`
- Between section label and heading: `12-16px`
- Between feature cards: `24-32px`
- Between nav links: `32-40px`

## Surface Aesthetic

### Dark Glass Cards
The signature MDX surface treatment. Creates depth without heavy visual weight.

```css
/* Full dark glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

/* Elevated glass card (hover state) */
.glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(79, 158, 255, 0.08);
}
```

**Tailwind equivalents:**
- Base: `bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl`
- Hover: `hover:bg-white/[0.06] hover:border-white/[0.14]`

### Noise/Grain Texture
Adds tactility to flat dark surfaces. Applied as an SVG filter or CSS pseudo-element overlay.

```css
.noisy-surface::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  border-radius: inherit;
  pointer-events: none;
}
```

### Glow Effects
```css
/* Hero section glow — fixed position background element */
.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79,158,255,0.12) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Feature icon glow */
.icon-glow {
  box-shadow: 0 0 30px rgba(79, 158, 255, 0.3);
}
```

## Imagery Standards

### 3D Renders — Preferred
MDX-class sites use zero or near-zero photography. All visual content is:
- 3D renders created in Blender, Cinema 4D, or via Three.js at runtime
- Abstract geometry: torus knots, parametric surfaces, custom meshes
- Product models displayed as 3D objects (not flat screenshots)
- UI mockups shown inside 3D device frames (Three.js or CSS 3D transforms)

### WebGL Canvas Backgrounds
The hero background is always a live WebGL canvas, not an image:
- Three.js scene rendered to a `<canvas>` element
- Canvas positioned as `position: fixed; inset: 0; z-index: 0`
- UI content is `position: relative; z-index: 10`
- Canvas remains fixed while content scrolls over it

### Material Treatments for 3D Objects
```js
// Metallic glass material (Three.js)
const material = new THREE.MeshPhysicalMaterial({
  color: 0x4f9eff,
  metalness: 0.9,
  roughness: 0.1,
  transmission: 0.3,
  thickness: 2.0,
  envMapIntensity: 1.5,
  emissive: new THREE.Color(0x4f9eff),
  emissiveIntensity: 0.15,
});
```

### No Stock Photography Rules
- No lifestyle photography (people using products, office environments)
- No flat icons — 3D-rendered or CSS-animated iconography only
- No generic gradient blobs unless part of a mesh gradient system
- Screenshots only as 3D-transformed device mockups
