## Task: Create a Premium Cinematic Feature Section

Build a polished, production-quality landing-page section using GSAP for the motion system.

The section contains:

* A strong visual headline and short supporting copy.
* Three feature cards representing three stages of a product or experience.
* One primary CTA that should remain the main conversion focus.

### Motion Direction

The animation should communicate a clear sense of **progression and narrative** as the user moves through the section.

The experience should feel:

* Cinematic
* Premium
* Intentional
* Cohesive
* Responsive
* Physically believable

Avoid making the page feel like a collection of unrelated animations. Motion should establish relationships between the headline, cards, supporting content, and CTA.

The three cards should not simply appear one after another. Their movement should help communicate that the user is progressing through three distinct stages.

The CTA should naturally become more noticeable at the appropriate moment without feeling aggressive or distracting.

Add subtle pointer interaction to an appropriate interactive element. The interaction should enhance the experience rather than become a visual gimmick.

### Interaction & Scroll Experience

The user's scrolling should feel like part of the storytelling.

Create meaningful transitions between the three stages so that the user can understand:

1. Where they are.
2. What is changing.
3. What they should pay attention to next.

Use pacing, hierarchy, continuity, anticipation, and emphasis where appropriate.

The motion should feel deliberate even when the user scrolls quickly or changes direction.

### Responsive Behavior

The experience must work well across:

* Desktop
* Tablet
* Mobile

Do not simply scale the desktop animation down for mobile.

Adapt the motion strategy when the available space, input method, or interaction model changes.

### Accessibility

Respect users who prefer reduced motion.

Reduced-motion behavior should still preserve:

* Content hierarchy
* Visual progression
* Important state changes
* CTA visibility

Do not simply disable all animation and leave the experience broken.

### Engineering Requirements

Use GSAP for animation.

The implementation must be:

* Maintainable
* Properly scoped
* Free from unnecessary React state updates for animation
* Safe during component unmount/remount
* Resistant to resize/orientation changes
* Efficient during scrolling and interaction
* Free from unnecessary animation loops or per-event tween creation

Do not optimize for the number of lines of code. Optimize for clarity, robustness, and quality.

### Quality Bar

Before considering the task complete, inspect the implementation as both:

**A motion designer**

* Does the motion have a clear visual hierarchy?
* Does it tell a coherent story?
* Are transitions connected rather than isolated?
* Is the pacing intentional?
* Does anything move without a clear purpose?

**A senior frontend engineer**

* Is the animation lifecycle handled correctly?
* Are resize and responsive behaviors safe?
* Are interactions efficiently implemented?
* Is cleanup reliable?
* Is the implementation maintainable?

Finally, verify the result at desktop and mobile sizes and make a refinement pass based on what you observe.

Do not explain your animation decisions before implementing them. First build the experience, inspect it, and then document the final motion strategy and engineering decisions.
w