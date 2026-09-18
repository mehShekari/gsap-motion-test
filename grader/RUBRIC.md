# Blind Grading Rubric

Score each implementation independently from 0–10. Do not reveal whether the artifact came from the skill arm.

## Motion quality — 30%
- 0–2: broken, distracting, or barely animated
- 3–4: functional but generic/jarring
- 5–6: polished baseline
- 7–8: strong restraint, timing, easing, and tactile response
- 9–10: exceptionally coherent motion language with excellent micro-interactions

## GSAP architecture — 20%
Look for lifecycle safety, cleanup, sensible targets, reusable timelines/context, no per-frame/per-event tween accumulation, and correct GSAP APIs.

## Choreography — 15%
Assess sequencing, anticipation, hierarchy, featured-card emphasis, and whether motion communicates structure.

## Responsive — 10%
Check desktop and 390px mobile behavior. Motion should remain appropriate without clipping or overflow.

## Accessibility — 10%
Check `prefers-reduced-motion`, focus/interaction behavior, and whether motion remains non-essential.

## Performance — 10%
Prefer transform/opacity, bounded timelines, no layout thrashing, and no unnecessary continuous work.

## Maintainability — 5%
Clear React integration, limited surface area, understandable code, no unnecessary dependencies.

### Automated evidence
Record build status, runtime console errors, GSAP audit findings, files changed, LOC, and test duration separately from the visual score.
