# Pageflows: Interactions

## Multi-Step Form Navigation

### Back Button Behavior
- Always visible on steps 2+; never on step 1 (no "back" to go to)
- Position: top-left of screen (consistent with iOS back convention) OR left of progress indicator
- Appearance: left-pointing chevron icon OR text "Back" (14px, weight 500, `#374151`)
- Touch target: 44px × 44px minimum
- On press: navigates to previous step, updates progress indicator, direction reversal on transition

### Progress Always Visible
- Progress indicator appears on step 1 and persists through all steps
- Never disappear progress during a loading state — keep it visible even if the step is processing
- "Skip" appears only on optional steps; never on steps collecting essential data
- Skip is always right-aligned, text-only (no button border), "Skip" at 14px weight 500 `#6B7280`

### No Hidden Required Fields
- All required fields are present on their step — never reveal a required field after the user
  believes the step is complete
- If a field is conditional (appears based on a previous answer), make the condition obvious
  ("If yes, we'll ask about your team size on the next screen")

### Step Data Preservation
- User data entered in previous steps is preserved during back navigation
- Pre-fill form fields when returning to a step
- Never wipe progress on back navigation

## Phone Number Input

Documented across Cash App, WhatsApp, Airbnb, and others:

### Auto-Formatting
Format applies as user types — no need for a "Format" button:
- US: `(555) 123-4567` — parentheses and hyphen inserted automatically
- International: `+1 555 123-4567`
- Input type: `tel`
- Keyboard: triggers numeric keypad on mobile

```tsx
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}
```

### Country Code Picker
- Trigger: flag emoji + country code prefix (e.g., "🇺🇸 +1") on left side of field
- Height matches field: 52–56px
- Opens a bottom sheet (mobile) or dropdown (desktop) with search
- Search filters by country name
- Flags: use unicode flag emojis or a lightweight flag icon library
- Auto-detect on first load: `Intl.DateTimeFormat().resolvedOptions().timeZone` provides timezone,
  infer country from timezone for default selection

## Password Input

### Show/Hide Toggle
- Eye icon: 24px, right side of input, 48px touch target (with padding)
- Default state: `type="password"` (masked)
- After toggle: `type="text"` (visible), eye-slash icon replaces eye
- Toggle is instant — no animation required
- `aria-label`: "Show password" / "Hide password" (update dynamically)

### Password Strength Indicator
- Appears below password field as user types (not before)
- Visible after first character entered
- 4-segment horizontal bar: each segment fills as criteria are met

Strength levels (common implementation):
| Level | Color | Label | Criteria |
|---|---|---|---|
| Very weak | `#EF4444` | "Weak" | <8 chars |
| Weak | `#F97316` | "Fair" | 8+ chars, 1 type |
| Fair | `#EAB308` | "Good" | 8+ chars, 2 types |
| Strong | `#22C55E` | "Strong" | 12+ chars, 3+ types |

Character types: lowercase, uppercase, number, special character.

Bar fill animation: each segment transitions color when its threshold is crossed, 200ms ease-in-out.

```tsx
function getStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(4, score) as 0 | 1 | 2 | 3 | 4;
}
```

## Social Auth Buttons

### Ordering Convention
From documented apps (Airbnb, Notion, Spotify, Linear, Figma):

1. **Continue with Google** (first, broadest reach)
2. **Continue with Apple** (second, iOS/Mac users)
3. Divider: "or"
4. Email form (always available as fallback)

Never reorder based on your preferences. This ordering is the result of years of A/B testing across
the industry. Users have learned to expect it.

### Implementation Notes
- Google OAuth: use `@react-oauth/google` or server-side OAuth flow (never client-only)
- Apple Sign In: requires `apple-signin-auth` or built-in AppleID.auth JavaScript API
- Social auth should be available even on the "Create Account" path — do not force email signup
- Error from social auth: display as a toast/banner, not inline (user did not fill a field)

## Email Verification (OTP Input)

Used after email submission to verify ownership. Standard pattern from Stripe, Linear, and others:

### Single Large OTP Input (Modern)
- One wide input field, 6-digit numeric code
- Font: 24–28px, letter-spacing: 0.3em, monospace
- Width: 100%, height: 64px
- Auto-submits when 6 digits are entered (no "Verify" button tap required)
- `inputMode="numeric"`, `pattern="[0-9]*"`, `autoComplete="one-time-code"`

### 6-Separate-Box OTP (Traditional)
- 6 individual 1-character inputs in a row
- Each box: 48px × 56px, centered digit
- Border: 1px solid `#D1D5DB` at rest, 2px solid brand primary when focused
- Border-radius: 8px
- Auto-advance: when a digit is entered, focus moves to the next box automatically
- Backspace: if box is empty and backspace pressed, focus moves to previous box
- Paste: if a 6-digit code is pasted, it fills all 6 boxes at once

```tsx
const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && !otp[index] && index > 0) {
    refs[index - 1].current?.focus();
  }
};

const handleChange = (value: string, index: number) => {
  const newOtp = [...otp];
  newOtp[index] = value.slice(-1); // only last character
  setOtp(newOtp);
  if (value && index < 5) refs[index + 1].current?.focus();
};

const handlePaste = (e: React.ClipboardEvent, index: number) => {
  const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
  if (pasted.length === 6) {
    setOtp(pasted.split(''));
    refs[5].current?.focus();
  }
};
```

### Resend Timer
- Resend link: disabled for 60 seconds after code is sent
- Shows countdown: "Resend code in 0:42"
- After 60 seconds: link becomes active, "Resend code" (brand primary color, tappable)
- `aria-live="polite"` on countdown so screen readers announce when it becomes available

## Billing and Checkout Fields

### Credit Card Number Auto-Formatting
- Input groups of 4 digits with a space: `4242 4242 4242 4242`
- Card brand detected after 1–2 digits, brand icon appears in leading position
- Max length: 19 characters (16 digits + 3 spaces)
- `inputMode="numeric"`, `autoComplete="cc-number"`

### Card Brand Detection (Stripe's documented logic)
| Prefix | Brand |
|---|---|
| `4` | Visa |
| `51`–`55` or `2221`–`2720` | Mastercard |
| `34`, `37` | Amex (15 digits, format: 4-6-5) |
| `60`, `65`, `6011` | Discover |

### Expiry Field
- Format: `MM/YY` — slash inserted automatically after 2 digits
- `inputMode="numeric"`, `autoComplete="cc-exp"`

### CVV Field
- 3 digits (Visa/Mastercard) or 4 digits (Amex)
- Masked with `type="password"` preferred for security perception
- Tooltip/helper text: "3 digits on back of card" with card illustration

## Paywall / Upgrade Flow

### Monthly / Annual Toggle
- Default selected: Annual (because it converts better and shows lower per-month cost)
- Toggle position: above pricing cards, centered
- Annual label includes savings: "Annual (Save 40%)"
- Toggle animation: sliding indicator beneath text tabs, 200ms ease-in-out
- Price display updates when toggle switches (animate the price text: fade out → new value → fade in)

### "Most Popular" Badge
- Position: top of recommended tier card (centered above card top edge, negative margin)
- Background: brand primary color
- Text: "Most popular" or "Recommended", 12px, weight 600, white
- Border-radius: 9999px (pill), padding: 4px 12px
- This badge increases conversion on the highlighted tier measurably; always include it

### Feature Comparison Layout
- Three-column grid (Free / Pro / Enterprise) for B2B pricing
- Feature rows: checkmark (present) or dash (absent) for each tier
- Checkmark: `#22C55E`, dash: `#D1D5DB`
- Highlight the recommended column with a subtle `#F0FDF4` background or border
- Most-important features at the top of the list

## Permission Request Patterns

### Pre-Permission Education Screen
Before the system permission dialog appears, show an explanation screen:
- Illustration or icon related to the permission type (camera icon, notification bell)
- Headline: "Allow access to [X]" — specific, not vague
- Body: 1–2 sentences explaining the specific benefit ("So you can scan documents directly from your camera")
- CTA: "Allow [Permission]" — triggers the actual system permission dialog
- Secondary: "Not now" — users who tap this are not ready; do not force

Timing: show this screen at the moment the feature is first used, not on app launch.

### Permission Request Order (if multiple permissions needed)
Show the most valuable permission first. If the user grants it, they are more likely to grant
subsequent ones. If they decline, you have at least captured the most important one.

### Post-Decline Recovery
If permission is denied:
- Do not repeatedly prompt (system will lock out the prompt)
- Show a gentle "How to enable" guidance: "You can enable camera access in Settings → Privacy → Camera → [App Name]"
- Provide a "Open Settings" button that deep-links to `App-Prefs:root=Privacy&path=CAMERA` (iOS)
  or `android.settings.APPLICATION_DETAILS_SETTINGS` (Android)
