# GSAP Motion A/B Report: Full testB

Date: 2026-09-18
Prompt: [prompts/testB.md](prompts/testB.md)

This is the corrected full testB run. The earlier shorter testB summary and `card-animation.md` are excluded.

## Setup

- **With skill:** [runs/with-skill](runs/with-skill), using `gsap-creative-animation`, `@mehshekari/gsap-motion` 4.2.1, and `@gsap/react`.
- **Without skill:** [runs/without-skill](runs/without-skill), using raw GSAP and `gsap.context()` only.
- Both arms were reset to the same `starter/` snapshot and given the full attached prompt.

## Score

| Category | Weight | With skill | Without skill |
|---|---:|---:|---:|
| Motion quality | 30% | 8.5 | 8.2 |
| GSAP architecture | 20% | 9.3 | 7.3 |
| Choreography | 15% | 8.8 | 8.5 |
| Responsive | 10% | 9.0 | 7.8 |
| Accessibility | 10% | 8.8 | 7.8 |
| Performance | 10% | 8.8 | 8.6 |
| Maintainability | 5% | 9.2 | 7.8 |
| **Weighted total** | **100%** | **8.87/10** | **7.99/10** |

## Requirement Coverage

Both implementations include a cinematic hero, a scroll-triggered card reveal, three distinct card stages, a primary CTA with MotionPath pointer interaction, reduced-motion support, and GSAP-only animation.

The skill arm adapts by device class: desktop and tablet use the pinned scrub narrative, while mobile uses a normal-flow reveal without pinning. Its `useGSAP` scope, `matchMedia` branches, refresh-safe ScrollTrigger settings, and gated fine-pointer interaction address lifecycle, resize, and input concerns from the prompt.

The control arm implements the same visual idea with raw GSAP, but without the skill arm's React integration and defensive refresh/input patterns.

## Verification

| Check | With skill | Without skill |
|---|---|---|
| Production build | Passed | Passed |
| GSAP Motion audit | 0 findings | 0 findings |
| Editor/code errors | None | None |
| Desktop scroll review | 59.5 FPS | 59.5 FPS |
| First scroll motion | 255ms | 288ms |
| Scroll sequence | 10 GSAP elements over 2745ms | 10 GSAP elements over 2726ms |
| Peak screen activity | 98% while pinned scrub runs | 98% while pinned scrub runs |
| Mobile reduced-motion capture | 390x844, 58.3 FPS | 390x844, 59.1 FPS |
| Source LOC | 95 | 86 |

## Findings

The skill arm is the stronger implementation overall. Its motion begins sooner in the live scroll review, its mobile strategy explicitly removes pinning, and its lifecycle and media-query handling are more robust. Both arms achieved comparable frame rates and the same broad visual narrative.

The pinned sequence reaches 98% screen activity at its busiest. This is consistent with the requested cinematic progression but remains the main visual restraint risk. The CTA interaction is intentionally subtle and does not run on coarse pointers.

## Caveats

- This is one A/B run per arm, not a distribution across repeated independent model runs.
- Both artifacts were produced in the same workspace by the same assistant process; the arm difference is the skill context and dependencies.
- The benchmark checker reports `cleanup_signal: false` for the skill arm because its regex does not recognize `useGSAP`; the package audit recognizes the implementation as clean.
- The benchmark checker reports `avoids_layout_animation: false` for both because the unchanged starter CSS contains layout declarations such as `width`, `height`, and `padding`.
- Runtime measurements were captured on the same local machine and browser session.

## Artifacts

- [With-skill source](runs/with-skill/src/main.jsx)
- [Without-skill source](runs/without-skill/src/main.jsx)
- [Full testB prompt](prompts/testB.md)
- [Benchmark rubric](grader/RUBRIC.md)
