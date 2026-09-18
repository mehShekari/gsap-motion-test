# Hero Transformation — Reimagine the Experience

Completely rethink and redesign the existing hero section.

Do **not** treat the current hero as a layout that needs polishing. Treat it as a starting point and redesign the entire experience from first principles.

The goal is to create a hero that feels **premium, cinematic, modern, distinctive, and memorable** while remaining usable and conversion-focused.

## Core Objective

The hero should immediately communicate:

* What the product is
* Why it matters
* What the user should do next

The first viewport should have a strong visual hierarchy and a clear focal point.

The experience should feel intentional rather than like a collection of UI components and animations.

## UI / UX

You may completely change:

* Layout
* Grid structure
* Element positioning
* Typography hierarchy
* Spacing
* Visual composition
* CTA placement
* Supporting content placement
* Card composition
* Decorative elements
* Visual relationships between elements

You may introduce new visual structures when they improve the experience.

You may remove existing elements when they do not contribute to the hero's purpose.

Do not preserve the current composition merely for the sake of preserving it.

However:

* Do not change the product's core identity.
* Do not invent unrelated product features.
* Do not turn the hero into a generic template.
* Preserve the existing brand language, content meaning, and overall product context.

## Visual Direction

Aim for the level of polish expected from a high-end modern product website.

The composition should have:

* Strong visual hierarchy
* Clear focal point
* Intentional negative space
* Depth
* Contrast
* Typography with personality
* Sophisticated proportions
* Strong desktop composition
* Thoughtful mobile composition

Avoid:

* Generic centered hero layouts
* Excessive gradients
* Random floating elements
* Decorative animation without purpose
* Excessive glassmorphism
* Overuse of shadows
* UI clutter
* "Template-like" compositions

The final result should have a recognizable visual idea.

## Interaction Design

Design the hero as an interactive experience rather than a static section.

Determine which elements should respond to:

* Scroll
* Pointer movement
* Hover
* Focus
* User progression

Interactions should reinforce hierarchy and affordance.

Do not add interactions simply because they are technically possible.

Pointer-based interactions must gracefully degrade for touch and coarse-pointer devices.

Keyboard interaction and focus states must remain clear.

## Motion Design

Use GSAP to create a cohesive motion system.

You decide:

* What should move
* What should remain stable
* When movement should occur
* Which elements should lead
* Which elements should follow
* How much movement is appropriate
* Which animation techniques best communicate the intended experience

Motion should establish:

**Entry → Focus → Discovery → Action**

The hero should have a clear motion narrative.

Use relationships between elements rather than isolated animations.

Consider:

* hierarchy
* anticipation
* easing
* velocity
* continuity
* depth
* scale
* opacity
* spatial transformation
* temporal rhythm

Avoid animation overload.

Every significant movement should have a purpose.

## Cinematic Quality

Create a sense of depth and progression.

The first few seconds should feel choreographed rather than instantaneous.

Transitions should feel connected.

The user's attention should be deliberately guided through the composition.

The hero should have a clear visual "moment" that makes the experience memorable.

Do not sacrifice usability for spectacle.

## Responsive Design

Do not simply make the desktop hero smaller on mobile.

Design the mobile composition independently when necessary.

Decide which:

* elements should move
* interactions should remain
* interactions should disappear
* content should reorder
* animations should simplify

Mobile should feel intentionally designed, not like a fallback.

## Accessibility

Support reduced-motion preferences.

Reduced motion should preserve:

* hierarchy
* content visibility
* interaction meaning
* CTA prominence
* important state changes

Maintain usable keyboard navigation and visible focus states.

Do not make essential information dependent on animation.

## Engineering Quality

Implement the result as production-quality React code.

Use GSAP for the motion system.

The implementation should be:

* Maintainable
* Properly scoped
* Lifecycle-safe
* Responsive
* Resize-safe
* Efficient
* Free from unnecessary React state updates for animation
* Free from unnecessary animation loops
* Cleanly removable/unmountable

Do not optimize for minimum LOC.

Optimize for clarity, robustness, and quality.

## Validation Loop

Do not stop after the first implementation.

Follow this process:

### 1. Inspect

Understand the existing hero, its content, brand language, and current UX.

### 2. Reimagine

Define a substantially different composition and interaction model.

### 3. Build

Implement the redesigned hero.

### 4. Observe

Review the result at:

* Desktop
* Tablet
* Mobile

Pay particular attention to the first viewport and the first interaction.

### 5. Critique

Identify:

* Weak hierarchy
* Unnecessary motion
* Visual clutter
* Poor spacing
* Weak CTA emphasis
* Awkward transitions
* Responsive problems
* Accessibility problems

### 6. Refine

Make a second pass based on your observations.

Remove anything that does not improve the experience.

## Final Quality Bar

The result should make someone feel:

> "This is a deliberately designed product experience."

Not:

> "Someone added animations to a hero section."

Prioritize **concept, hierarchy, interaction, motion, and refinement** over the number of effects.

Do not explain your implementation before building it.

First transform the hero.

Then inspect it.

Then refine it.

Finally provide a concise explanation of the design concept, interaction model, motion strategy, and key engineering decisions.
