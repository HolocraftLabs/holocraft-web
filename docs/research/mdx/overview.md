# MDX Design System — Overview

## What MDX Represents

MDX (mdx.so) sits at the absolute cutting edge of commercial web design — specifically the intersection of WebGL-first aesthetics and premium SaaS/product marketing. It is not an experimental art project; it is cinematic web design in service of conversion. Every creative decision — the dark backgrounds, the floating 3D geometry, the weighted motion — is calibrated to make visitors feel they are encountering technology that is ahead of its time.

MDX represents the design frontier for high-budget product launches and SaaS companies that use visual sophistication as a market signal. The implicit message is: if the website looks this advanced, imagine what the product can do. This is design-as-trust-building at the highest level.

## Core Design Philosophy

**Immersion before information.** The first 3–5 seconds of a MDX-class site are purely sensory — a 3D scene loads, light rays shift, geometry rotates slowly. The visitor has not read a single word yet but has already formed an emotional impression. This is intentional. The site earns the right to deliver its message by first creating awe.

**Motion as the primary communication tool.** Typography announces a value proposition. Motion communicates that this company is premium, technical, and meticulous. A 600ms ease-out on a headline that slides 40px into place communicates more brand personality than any tagline.

**Deliberate scarcity.** MDX-class sites resist the urge to fill space. One hero object. One gradient glow. One CTA. Density is the enemy. Each element gets the full viewport's attention before the next is introduced.

**Dark-first as a creative statement.** Dark backgrounds are not a trend adoption — they are a deliberate signal. Dark = night = premium = technology = focus. It also allows 3D objects and glowing elements to read with maximum contrast and luminance.

**Precision in every value.** These sites are not designed loosely. Padding values are exact. Animation curves are custom-tuned. Color stops are precisely chosen. The care is detectable even if the user cannot name what they are noticing.

## Industries Served

- **Premium SaaS products** — especially developer tools, AI platforms, data infrastructure, security software
- **Creative/design agencies** showcasing technical execution capability
- **Product launch campaigns** — hardware reveals, software v2 announcements, limited releases
- **Tech startups at Series A–C** using design to establish category leadership
- **AI companies** where visual sophistication mirrors perceived intelligence

MDX-class design is inappropriate for e-commerce general retail, local services, healthcare-focused informational sites, or any context where trust comes from familiarity rather than aspiration.

## Emotional Direction

The emotional target is a specific sequence:

1. **Awe** — "How did they build this?"
2. **Aspiration** — "I want to be the type of person/company that uses this"
3. **Trust** — "If they have this level of craft, the product is serious"
4. **Curiosity** — "What else is on this page?"

This emotional arc is engineered through the combination of cinematic 3D, precise motion, and controlled information release. Nothing is revealed all at once.

## What Holocraft Extracts and Applies

Holocraft should treat MDX as the **gold standard template for premium SaaS and product landing pages**. Specific patterns to extract:

- **The dark glass card system** — bg-white/5, backdrop-blur-sm, border border-white/10. This is immediately usable in React/Tailwind and creates premium layering without complex CSS.
- **The scroll-linked 3D camera pattern** — GSAP ScrollTrigger driving Three.js camera Z position. This single pattern creates immersive scroll experiences that feel categorically different from standard scroll animations.
- **Gradient text on headline last word** — The technique of making one word in a display headline gradient (bg-clip-text + linear-gradient) is a high-signal sophistication marker that costs nothing to implement.
- **The radial glow backdrop** — A single radial gradient (rgba(79,158,255,0.15) at center, transparent at 70%) on the hero background creates depth and focal point with one CSS rule.
- **Sequential entrance timing** — Hero loads at 0ms, heading at 600ms, subheading at 800ms, CTA at 1000ms. This rhythm creates a cinematic reveal instead of everything appearing at once.
- **The magnetic hover CTA** — Mouse position tracking that offsets button position 10–15px creates the feeling of premium interaction without WebGL.

## Patterns to Use Sparingly

The following MDX-adjacent patterns have become overused and now signal imitation rather than excellence. Holocraft agents should flag these as defaults to avoid unless specifically requested:

- **Particle storm backgrounds** — Thousands of floating dots connected by lines. Originated in Three.js tutorials circa 2019. Now ubiquitous and low-signal.
- **Generic floating sphere/icosphere** — The smooth-shaded, slowly rotating sphere in hero sections. Unless it is a specific product visualization, replace with abstract geometry (torus knot, Klein bottle, custom mesh).
- **Blue gradient everywhere** — Electric blue on dark is still excellent but should be an accent, not the total palette. Over-saturation reads as generic.
- **Scroll hijacking** — Full-scroll-jacking (preventing natural scroll and controlling position programmatically) causes nausea and accessibility failures. Lenis smooth scroll with scroll-linked animations is the correct approach.
- **WebGL for its own sake** — A spinning cube that serves no communication purpose degrades load performance and communicates nothing. 3D elements must justify their performance cost through visual or conceptual meaning.

## Holocraft Application Priority

**Use in:** SaaS hero sections, product launch pages, AI/tech company sites, developer tool marketing
**Use selectively:** agency portfolio headers, premium e-commerce product reveals
**Do not use:** informational sites, healthcare, government, e-commerce general, local business
