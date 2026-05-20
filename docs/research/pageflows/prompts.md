# Pageflows: AI Prompts

These prompts generate production-quality user flow components based on patterns observed across
top shipping products. Each prompt is immediately actionable for React + TypeScript + Framer Motion
+ Tailwind CSS v4 code generation.

---

## Prompt: Multi-Step Onboarding Flow

```
Build a multi-step onboarding flow component in React + TypeScript + Framer Motion + Tailwind CSS v4.

Flow structure: 4–7 steps, each step is a self-contained screen component.

Top-level OnboardingFlow component manages:
  const [[currentStep, direction], setStep] = useState<[number, number]>([0, 1]);
  const totalSteps = steps.length;

  const goNext = () => setStep(([s]) => [s + 1, 1]);
  const goBack = () => setStep(([s]) => [s - 1, -1]);

Shared layout for every step:
  - Position: fixed or full-height container
  - Progress bar: top, 3px height, full width, brand primary fill color
    - Animates from previous % to new % on step change, 500ms ease-in-out
  - Back button: top-left, appears on step 2+, 44px × 44px touch target
  - Skip button (when step is optional): top-right, text only, 14px weight 500 #6B7280
  - Content area: vertically centered, horizontal padding 24px
  - CTA: fixed bottom bar, safe area aware (padding-bottom: env(safe-area-inset-bottom, 16px))

Step content layout (focus-screen variant):
  [Illustration or icon, centered, max-height 40vh]
  [margin-top: 32px]
  [Headline: 26px, weight 700, #111827, centered, max-width 280px]
  [margin-top: 12px]
  [Body: 16px, weight 400, #6B7280, centered, max-width 280px, max 2 sentences]
  [margin-top: auto] (pushes CTA to bottom)

CTA button:
  - Width: 100% (minus 32px total horizontal margin)
  - Height: 52px
  - Border-radius: 12px
  - Background: brand primary (#6366F1 as default, override with prop)
  - Text: 16px, weight 600, white
  - Loading state: spinner replaces text, button width unchanged

Step transition animation (Framer Motion AnimatePresence):
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  <AnimatePresence custom={direction} mode="wait">
    <motion.div
      key={currentStep}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    />
  </AnimatePresence>

Component API:
  interface OnboardingFlowProps {
    steps: Array<{
      id: string;
      component: React.ComponentType<{ onNext: () => void }>;
      optional?: boolean;
    }>;
    onComplete: (collectedData: Record<string, unknown>) => void;
    primaryColor?: string; // hex, default #6366F1
  }

Data collection:
  - Each step can call onNext(stepData) to pass collected data up
  - FlowController merges stepData into a Record<string, unknown>
  - Final object passed to onComplete

State management (no external library):
  const [stepData, setStepData] = useState<Record<string, unknown>>({});
  const handleStepNext = (data?: Record<string, unknown>) => {
    if (data) setStepData(prev => ({ ...prev, ...data }));
    goNext();
  };

Accessibility:
  - aria-label="Onboarding, step {currentStep + 1} of {totalSteps}" on main container
  - progress element or role="progressbar" aria-valuenow={currentStep} aria-valuemax={totalSteps}
  - Focus management: on step change, focus moves to the new step's first focusable element
  - Announce step change with aria-live="polite" visually-hidden element

prefers-reduced-motion:
  - Replace slide transition with instant opacity fade (duration: 0.15s, no transform)
  - Progress bar fill is instant (no animation)
  - useReducedMotion() from framer-motion
```

---

## Prompt: Sign Up Form (Email + Social Auth)

```
Build a sign up form component in React + TypeScript + Tailwind CSS v4 following patterns from
Airbnb, Notion, Spotify, and Linear.

Layout structure (single screen, vertically stacked):
  [Logo/brand mark, 32px, centered] margin-bottom: 32px
  [Title: "Create your account", 26px weight 700 #111827, centered] margin-bottom: 8px
  [Subtitle: "Join 10,000+ teams...", 15px weight 400 #6B7280, centered] margin-bottom: 32px

  [Google button]    margin-bottom: 12px
  [Apple button]     margin-bottom: 20px

  [Divider with "or" text]   margin-bottom: 20px

  [Email input field]        margin-bottom: 16px
  [Password input field]     margin-bottom: 8px
  [Password strength bar]    margin-bottom: 24px

  [Submit CTA button]        margin-bottom: 16px

  ["Already have an account? Sign in" link]

Social auth buttons:
  Google button:
    height: 52px, width: 100%, border-radius: 10px
    background: #FFFFFF, border: 1px solid #D1D5DB
    Google "G" SVG logo (exact SVG, left-aligned, 20px, 16px from left)
    Text: "Continue with Google", 15px weight 500 #1F2937, gap from logo: 12px
    Hover: background #F9FAFB, transition 150ms
    onClick: calls googleSignIn() (OAuth flow, not inline component)

  Apple button:
    Same dimensions as Google
    background: #000000, border: none
    Apple logo SVG (white, 20px), left-aligned
    Text: "Continue with Apple", 15px weight 500 #FFFFFF
    Hover: background #1A1A1A

Divider:
  <div style="display:flex; align-items:center; gap:12px">
    <hr style="flex:1; border-color:#E5E7EB" />
    <span style="font-size:13px; font-weight:500; color:#9CA3AF">or</span>
    <hr style="flex:1; border-color:#E5E7EB" />
  </div>

Email field:
  label: "Email address", 13px weight 500 #374151, margin-bottom: 6px
  input: height 52px, padding 14px 16px, border-radius: 10px
  border: 1px solid #D1D5DB at rest, 2px solid #6366F1 on focus (or brand primary)
  background: #FFFFFF
  input type: "email", autoComplete: "email", required

Password field:
  label: "Password", same label spec
  input: type="password" (toggleable), same height/padding as email
  trailing show/hide button: 24px eye icon, 44px touch target, aria-label="Show/hide password"
  
Password strength bar: (appears after first character typed)
  4 equal segments, full-width, height: 4px, border-radius: 2px, gap: 4px between segments
  Inactive segment: #E5E7EB
  Active segment color by level: #EF4444 (1/4), #F97316 (2/4), #EAB308 (3/4), #22C55E (4/4)
  Label to the right of bar: 12px weight 500, same color as highest active segment
  Labels: "Weak" / "Fair" / "Good" / "Strong"
  Segment transitions: background-color 200ms ease-in-out

Submit button:
  height: 52px, width: 100%, border-radius: 10px
  background: brand primary (#6366F1), hover: 8% darker
  text: "Create account", 16px weight 600, white
  loading state: spinner, same height, no layout shift

Form state management:
  interface SignUpFormState {
    email: string;
    password: string;
    isLoading: boolean;
    errors: { email?: string; password?: string; general?: string };
    passwordStrength: 0 | 1 | 2 | 3 | 4;
  }

Validation (onSubmit, not onChange for email; onChange for password strength):
  Email: must match /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  Password: minimum 8 characters
  On error: shake animation on the relevant field (translateX keyframes), inline error text below field
  General error (server): banner above the form, background #FEF2F2, border #FECACA, text #991B1B

Accessibility:
  - <form> with aria-label="Create account"
  - Each input has id + htmlFor on label
  - aria-describedby pointing to error message id when error exists
  - aria-invalid="true" on invalid fields
  - Password strength: aria-live="polite" region announces strength level
  - Submit button: aria-busy="true" when loading
  - Error summary: aria-live="assertive" for server errors

Tailwind CSS v4:
  - Define color tokens in @theme: --color-primary, --color-primary-hover
  - Use bg-[var(--color-primary)] pattern for brand colors
```

---

## Prompt: Email Verification Screen (OTP Input)

```
Build an email verification OTP screen in React + TypeScript + Tailwind CSS v4.

Screen layout (single full-screen focus view):
  [Email icon or lock icon, 56px, centered, brand primary color]  margin-bottom: 24px
  [Headline: "Check your email", 26px weight 700 #111827, centered]  margin-bottom: 8px
  [Body: "We sent a 6-digit code to {email}", 15px weight 400 #6B7280, centered]  margin-bottom: 32px

  [6-box OTP input row]  margin-bottom: 8px

  [Helper: "Didn't receive a code?" + resend link]  margin-bottom: 32px
  [Verify button, conditionally enabled]

6-Box OTP Input:
  Row: display flex, justify-content center, gap: 8px
  Each box:
    width: 48px, height: 56px
    border: 2px solid #D1D5DB (inactive), 2px solid #6366F1 (focused/active)
    border-radius: 8px
    background: #FFFFFF
    font: 24px weight 700 #111827, text-align center
    transition: border-color 150ms ease

  inputMode="numeric", pattern="[0-9]*", maxLength={1}
  autoComplete="one-time-code" on first input

Box focus/fill behavior:
  - Focus the next box automatically when a digit is entered
  - On Backspace in empty box: focus the previous box
  - Paste handling: if 6-digit numeric string pasted, distribute across all boxes, focus box 6
  - When all 6 digits filled: brief 150ms pause, then auto-submit
  - All-filled visual: all borders turn brand primary, slight scale: 1.0 → 1.03 → 1.0 spring

useOTP hook:
  function useOTP(length: number = 6) {
    const [values, setValues] = useState<string[]>(Array(length).fill(''));
    const refs = Array.from({ length }, () => useRef<HTMLInputElement>(null));
    
    const handleChange = (val: string, idx: number) => {
      const digit = val.replace(/\D/g, '').slice(-1);
      const newValues = [...values];
      newValues[idx] = digit;
      setValues(newValues);
      if (digit && idx < length - 1) refs[idx + 1].current?.focus();
    };
    
    const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
      if (e.key === 'Backspace' && !values[idx] && idx > 0) {
        refs[idx - 1].current?.focus();
      }
    };
    
    const handlePaste = (e: React.ClipboardEvent) => {
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (pasted.length === length) {
        setValues(pasted.split(''));
        refs[length - 1].current?.focus();
      }
    };
    
    const isComplete = values.every(v => v !== '');
    const code = values.join('');
    return { values, refs, handleChange, handleKeyDown, handlePaste, isComplete, code };
  }

Resend timer:
  Initial state: 60 seconds countdown, resend link disabled
  Display: "Resend code in 0:{seconds.toString().padStart(2, '0')}"
  Color: #9CA3AF while counting, #6366F1 when active
  After timer: "Resend code" is clickable, calls resendOTP(), resets timer to 60
  aria-live="polite" on the resend element to announce state change to screen readers

Error state (wrong code entered):
  All 6 boxes: border-color #EF4444 (red)
  Shake animation on the OTP row: translateX [0, 8, -8, 6, -4, 2, 0], 400ms
  Error text below boxes: "Incorrect code. Please try again.", 13px #EF4444
  Clear all boxes and focus box 1 after 800ms

Verify button:
  Disabled (opacity 50%) until isComplete is true
  Enabled with full brand primary background
  Loading state on submit: spinner, same button dimensions
  aria-disabled (not HTML disabled) so button remains focusable

Component API:
  interface OTPVerificationProps {
    email: string;
    onVerified: (code: string) => Promise<void>;
    onResend: () => Promise<void>;
    resendCooldown?: number; // seconds, default 60
  }

Accessibility:
  - Group labeled: <fieldset> with <legend>Enter verification code</legend>
    (visually hidden legend is fine)
  - Each input: aria-label="Digit {n} of 6"
  - Error: aria-live="assertive" region for wrong code error
  - Focus trap not needed (full screen, no other interactive elements)
```

---

## Prompt: Password Strength Indicator Component

```
Build a standalone PasswordStrengthIndicator component in React + TypeScript + Tailwind CSS v4.

This component is used below a password input field and provides real-time visual feedback.

Props:
  interface PasswordStrengthIndicatorProps {
    password: string;
    className?: string;
  }

Strength calculation logic:
  type StrengthLevel = 0 | 1 | 2 | 3 | 4;

  function calculateStrength(password: string): StrengthLevel {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(4, score) as StrengthLevel;
  }

Strength level config:
  const levels = [
    { label: '', color: '#E5E7EB', bgColor: '#E5E7EB' },           // 0: empty
    { label: 'Weak', color: '#EF4444', bgColor: '#FEE2E2' },       // 1: weak
    { label: 'Fair', color: '#F97316', bgColor: '#FED7AA' },       // 2: fair
    { label: 'Good', color: '#EAB308', bgColor: '#FEF08A' },       // 3: good
    { label: 'Strong', color: '#22C55E', bgColor: '#BBF7D0' },     // 4: strong
  ];

Visual structure:
  [4-segment bar row] + [strength label, right-aligned]
  [criteria list below, optional]

Segment bar:
  Container: display flex, gap: 4px, width: 100%, height: 4px
  Each segment: flex: 1, height: 4px, border-radius: 2px
  Segment color logic:
    segmentIndex < strength: use levels[strength].color (all filled segments same color)
    segmentIndex >= strength: use #E5E7EB (unfilled)
  Transition: background-color 200ms ease-in-out per segment

Strength label:
  Font: 12px weight 500, color matches levels[strength].color
  Position: right-aligned, same row as bar (use flex between bar and label)
  Animate between labels with Framer Motion:
    <AnimatePresence mode="wait">
      <motion.span
        key={strength}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.15 }}
        style={{ color: levels[strength].color }}
      >
        {levels[strength].label}
      </motion.span>
    </AnimatePresence>

Criteria list (optional, shown below bar when password field is focused):
  Criteria items:
    - At least 8 characters
    - Uppercase and lowercase letters
    - At least one number
    - At least one special character
  Each item:
    Checkmark (✓) or dot (•) on left: green (#22C55E) when met, gray (#9CA3AF) when unmet
    Text: 12px weight 400, #374151, transition color 200ms

  <AnimatePresence>
    {showCriteria && (
      <motion.ul
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        {criteria.map(c => <li key={c.id}>...</li>)}
      </motion.ul>
    )}
  </AnimatePresence>

Accessibility:
  - aria-live="polite" on strength label (screen reader announces level changes)
  - Segments: aria-hidden="true" (decorative, conveyed by label)
  - The component should also be usable without color (icons/text communicate strength)

Tailwind CSS v4:
  - Use inline style for dynamic colors from the levels config (not Tailwind color names)
  - Static structure classes use Tailwind: flex gap-1 h-1 rounded-sm etc.
```

---

## Prompt: Pricing Section with Monthly/Annual Toggle

```
Build a pricing section with monthly/annual toggle in React + TypeScript + Tailwind CSS v4.
Optimized for conversion based on patterns from Spotify, Linear, Notion, Vercel.

Layout:
  [Section header]
  [Monthly / Annual toggle]   ← includes "Save 40%" badge on Annual
  [Pricing tier cards]        ← 3 columns desktop, 1 column mobile (stacked)
  [Footer trust line]

Monthly/Annual Toggle:
  Appearance: pill-shaped tab switcher (not a checkbox/switch)
  Container: display inline-flex, background #F3F4F6, border-radius 9999px, padding: 4px
  Each tab: padding 8px 20px, border-radius 9999px, font: 14px weight 500
  Active tab: background white, box-shadow: 0 1px 3px rgba(0,0,0,0.1), text #111827
  Inactive tab: transparent background, text #6B7280
  Sliding indicator: use Framer Motion layoutId="billing-tab-indicator" for smooth slide
  "Save 40%" badge: positioned to the right of "Annual" label
    background #DCFCE7, color #15803D, font 11px weight 700, border-radius 9999px, padding 2px 8px

  State: const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  Default: annual (shows lower per-month cost, higher conversion)

  Framer Motion tab indicator:
    {isActive && (
      <motion.div
        layoutId="billing-tab-indicator"
        style={{ position: 'absolute', inset: 0, borderRadius: 9999, background: 'white' }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
      />
    )}

Pricing tier data structure:
  interface PricingTier {
    id: string;
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number; // per month when billed annually
    isPopular?: boolean;
    features: string[];
    cta: { label: string; href: string };
    highlighted?: boolean; // renders with colored border + subtle background
  }

Tier card (for each plan):
  Width: equal columns, border-radius: 16px, padding: 28px
  Default: border 1px solid #E5E7EB, background white
  Highlighted/popular: border 2px solid brand primary, background #FAFAF9 or very light tint
  
  "Most popular" badge (on highlighted tier):
    Position: absolute, top: -14px, left: 50%, transform: translateX(-50%)
    background: brand primary, text white, font: 12px weight 700, border-radius: 9999px
    padding: 4px 16px

  Price display:
    [Currency symbol $, 20px weight 600, vertical-align top, color #111827]
    [Amount, 48px weight 700, color #111827]
    ["/mo" text, 14px weight 400, color #6B7280, align bottom]
    [Annual note: "billed annually" or "per year", 12px weight 400, #9CA3AF, below price]
    
    Price change animation (monthly ↔ annual toggle):
      <AnimatePresence mode="wait">
        <motion.span
          key={`${billing}-${tier.id}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.15 }}
        >
          {billing === 'annual' ? tier.annualPrice : tier.monthlyPrice}
        </motion.span>
      </AnimatePresence>

  Feature list:
    Each feature: 14px weight 400 #374151, with green checkmark (✓ #22C55E) leading icon
    Spacing: 12px between items
    Key features: weight 600 for the plan's headline differentiator

  CTA button:
    Highlighted tier: filled, brand primary background, 52px height, full width, border-radius 10px
    Other tiers: outlined, border brand primary, transparent background, brand primary text
    Label examples: "Start free trial" / "Get started" / "Contact sales"

Conversion optimization principles applied:
  1. Annual is the default selection (lower price shown, better LTV for business)
  2. "Most popular" badge on recommended tier (social proof, anchors decision)
  3. Price is the most prominent element (not features) — 48px font size
  4. CTA copies are action-forward ("Start" not "Buy")
  5. Feature list highlights differentiators for that tier, not everything

Accessibility:
  - Section aria-label="Pricing plans"
  - Toggle: role="tablist", each option role="tab", aria-selected
  - Selected tab: aria-selected="true"
  - Price change: aria-live="polite" region announces new price after toggle
  - Cards are not interactive by default (CTA button inside is the action)

Mobile layout (< 768px):
  - Toggle stays centered
  - Tier cards stack vertically, full-width
  - Highlighted card appears first in DOM order (most important first on mobile)
  - "Most popular" badge still shows but card has top margin to prevent overlap

Tailwind CSS v4:
  - Grid: grid-cols-1 md:grid-cols-3 gap-6
  - Card padding: p-7
  - Transitions via CSS custom properties in @theme
```

---

## Prompt: Checkout Flow Step Component

```
Build a checkout flow step component in React + TypeScript + Tailwind CSS v4.
Based on patterns from Stripe, Airbnb Payments, and Shopify Checkout.

The CheckoutStep component is a single step in a multi-step checkout. It renders its own
fields and calls onComplete() when its data is valid.

Step variants:
  1. Contact step (email, optional phone)
  2. Shipping step (name, address, city, state, zip, country)
  3. Payment step (card number, expiry, CVV, billing name)
  4. Review step (summary of all data, confirm button)

Shared step wrapper layout:
  Header: step name + step number indicator, e.g., "Payment · Step 3 of 4"
    Font: 13px weight 500 #9CA3AF
  Heading: "Payment details", 22px weight 700 #111827
  Form fields (step-specific)
  Continue button: "Continue →", 52px, full-width, brand primary
  Back link: "← Back", text only, 14px weight 500 #6B7280

Payment step — credit card fields:

  Card number field:
    label: "Card number"
    Auto-detect card brand from first digits:
      Visa: starts with '4'
      Mastercard: starts with '51'-'55' or '2221'-'2720'
      Amex: starts with '34' or '37'
    Brand icon: appears in trailing position of field (16px × 16px icon)
    Formatting: groups of 4 with spaces ('4242 4242 4242 4242')
    maxLength: 19 (16 digits + 3 spaces), or 17 for Amex (15 digits + 2 spaces)
    inputMode: "numeric", autoComplete: "cc-number"
    
    const formatCardNumber = (value: string, brand: string): string => {
      const digits = value.replace(/\D/g, '');
      if (brand === 'amex') {
        return digits.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
      }
      return digits.replace(/(\d{4})/g, '$1 ').trim();
    };

  Expiry + CVV row (side by side, 50/50):
    Expiry:
      label: "Expiry date"
      placeholder: "MM / YY"
      Auto-format: add " / " after 2nd digit
      Validation: future date, valid month (01-12)
      inputMode: "numeric", autoComplete: "cc-exp"
    
    CVV:
      label: "Security code"
      Type: "password" (obscured)
      maxLength: 3 (4 for Amex)
      Info tooltip icon: "ⓘ" opens a tooltip "3-digit code on back of card"
      inputMode: "numeric", autoComplete: "cc-csc"

  Billing name:
    label: "Name on card"
    autoComplete: "cc-name"

Card brand detection:
  const detectBrand = (number: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' => {
    const digits = number.replace(/\D/g, '');
    if (/^4/.test(digits)) return 'visa';
    if (/^5[1-5]|^2[2-7]/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    if (/^6(?:011|5)/.test(digits)) return 'discover';
    return 'unknown';
  };

Trust signals (visible on payment step):
  - Lock icon + "Secured by SSL" text below CVV field, 12px #6B7280
  - Accepted cards row: small card brand logos (Visa, Mastercard, Amex, Discover), 24px each

Validation:
  - Luhn algorithm check on card number
  - Real-time format validation, error only shown after field loses focus (onBlur)
  - Error: inline red text below field, #EF4444, 12px, margin-top: 4px

Field styling (applies to all steps):
  Height: 52px, padding: 14px 16px, border-radius: 10px
  Border: 1px solid #D1D5DB (rest), 2px solid #6366F1 (focus), 2px solid #EF4444 (error)
  Background: #FFFFFF
  Font: 16px weight 400 (prevents iOS zoom — always 16px or larger for inputs)
  Transition: border-color 150ms ease

Continue button state machine:
  - Disabled (opacity 60%): until all required fields in step are valid
  - Enabled: all fields valid, aria-disabled="false"
  - Loading: after click, spinner, no dimension change
  - Error: button returns to enabled, server error shown as banner above form

Accessibility:
  - <form> with aria-labelledby pointing to step heading
  - All inputs: id + htmlFor label pairs
  - Card number: aria-label="Credit card number" (in addition to visible label)
  - CVV: aria-label="Card security code, 3 digits"
  - Error messages: aria-live="polite", linked via aria-describedby
  - Payment step should NOT use autocomplete="off" — let the browser help users

Tailwind CSS v4:
  - Side-by-side fields: grid grid-cols-2 gap-3
  - Full-width: col-span-2
  - Error state: border-[#EF4444] focus:ring-[#EF4444]
```

---

## Prompt: Success/Completion Screen with Celebration Animation

```
Build a success/completion screen component in React + TypeScript + Framer Motion + Tailwind CSS v4.
Based on patterns from Stripe, Airbnb, Duolingo, and Cash App.

Use cases: onboarding complete, payment confirmed, form submitted, verification successful.

Screen layout (full-height, vertically and horizontally centered):
  [Confetti animation layer, absolute positioned behind content]
  [Success icon, centered]
  [Headline]
  [Subtext]
  [CTA button]
  [Secondary action]

Success icon:
  Circle background: 96px × 96px, background brand primary at 10% opacity
  Checkmark SVG inside: 48px, brand primary color
  
  Entrance animation (Framer Motion):
    Circle: scale 0 → 1, spring, stiffness: 300, damping: 20
    Checkmark: draws itself using SVG pathLength 0 → 1, duration: 0.5s, delay: 0.2s
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
        strokeWidth={3}
        stroke="var(--color-primary)"
        fill="none"
        d="M20 40 L38 58 L68 28"
      />
    After completion: brief scale pulse 1.0 → 1.08 → 1.0, spring, delay: 0.7s

Headline:
  Font: 28px weight 700 #111827
  Centered
  Animate: opacity 0 → 1 + translateY 12px → 0, duration: 0.4s, delay: 0.4s
  Examples: "You're all set!" / "Payment confirmed" / "Welcome aboard!"

Subtext:
  Font: 16px weight 400 #6B7280
  Centered, max-width: 280px
  Animate: opacity 0 → 1 + translateY 12px → 0, duration: 0.4s, delay: 0.55s

CTA button:
  Same spec as flow CTA (52px, full-width on mobile, auto-width centered on desktop)
  Animate: opacity 0 → 1 + translateY 12px → 0, duration: 0.4s, delay: 0.7s
  Examples: "Go to dashboard" / "Start exploring" / "Done"

Confetti animation (canvas-based, lightweight):
  Library: use canvas-confetti (npm package, 3KB gzipped)
  Trigger: 300ms after component mounts
  Config:
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
    });
  Duration: single burst, not continuous
  Fallback: if confetti library not available, skip (not essential, just delightful)

Alternative to confetti (simpler, pure CSS):
  3–5 colored dots, absolutely positioned, animate outward from icon center:
  Each dot: 8px × 8px, brand or accent colors
  Animation: scale 0 → 1 + translateX/Y outward, opacity 1 → 0, 600ms, stagger 80ms each
  Directions: 45° increments (top, top-right, right, bottom-right, bottom, etc.)

Auto-advance (optional):
  If autoAdvance prop is true, navigate to next destination after 2000ms
  Show a thin linear progress bar at bottom: fills over 2000ms
  "Going to dashboard in 2s..." in small text below CTA
  Clicking CTA cancels auto-advance and navigates immediately

Component API:
  interface SuccessScreenProps {
    headline: string;
    subtext?: string;
    ctaLabel: string;
    onCTA: () => void;
    secondaryLabel?: string;
    onSecondary?: () => void;
    autoAdvance?: boolean;
    autoAdvanceDelay?: number; // ms, default 2000
    showConfetti?: boolean;
    iconColor?: string; // hex, default brand primary
  }

Accessibility:
  - aria-live="assertive" announcement when screen appears: "Success: {headline}"
    Use a visually-hidden div with role="status" aria-live="assertive" that sets its text on mount
  - Focus management: on mount, focus the CTA button (primary action)
  - Confetti: aria-hidden="true" on canvas element (decorative)
  - Auto-advance: announce "Redirecting in {n} seconds" via aria-live

prefers-reduced-motion:
  - No scale animations on icon — icon appears instantly (opacity 0→1 only)
  - Checkmark path: draws instantly (pathLength jumps to 1)
  - Scale pulse: removed
  - Confetti: not shown
  - Staggered text animations: all appear simultaneously at 150ms
  - Auto-advance still works (functional, not decorative)

Tailwind CSS v4:
  - Success screen: min-h-screen flex flex-col items-center justify-center px-6
  - Icon container: w-24 h-24 rounded-full flex items-center justify-center
  - CTA: w-full max-w-xs (centers and constrains width on desktop)
```
