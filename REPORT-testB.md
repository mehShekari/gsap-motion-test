# GSAP Motion A/B Report: testB

Date: 2026-09-18
Prompt source: [prompts/testB.md](prompts/testB.md)

This report covers `testB.md` only. The earlier `card-animation.md` prompt is excluded.

## Test Setup

- **With skill:** `runs/with-skill/`, using the installed `gsap-creative-animation` skill, `@mehshekari/gsap-motion` 4.2.1, and `@gsap/react`.
- **Without skill:** `runs/without-skill/`, using raw GSAP only.
- Both arms started from the same `starter/` snapshot and received the same testB prompt.

## Weighted Score

| Category | Weight | With skill | Without skill |
|---|---:|---:|---:|
| Motion quality | 30% | 8.0 | 7.8 |
| GSAP architecture | 20% | 9.2 | 7.0 |
| Choreography | 15% | 8.5 | 8.3 |
| Responsive | 10% | 8.5 | 7.5 |
| Accessibility | 10% | 8.5 | 7.5 |
| Performance | 10% | 8.7 | 8.5 |
| Maintainability | 5% | 9.0 | 7.5 |
| **Total** | **100%** | **8.54/10** | **7.71/10** |

## Requirements Coverage

Both arms implement:

- Cinematic hero entrance
- Scroll-triggered feature-card reveal
- Pinned section with three scrubbed visual stages
- Primary CTA with MotionPath pointer interaction
- Mobile layout and reduced-motion branch
- GSAP-only animation work

The skill arm adds scoped `useGSAP`, plugin registration, `invalidateOnRefresh`, `anticipatePin`, and `(hover: hover) and (pointer: fine)` gating. The control arm uses `gsap.context()` but omits those skill-guided safeguards.

## Verification

| Check | With skill | Without skill |
|---|---|---|
| Production build | Passed | Passed |
| GSAP Motion audit | 0 findings | 0 findings |
| Editor/code errors | None | None |
| Desktop scroll review | 59.3 FPS | 59.1 FPS |
| First scroll motion | 398ms | 523ms |
| Scroll sequence | 10 GSAP elements over 2636ms | 10 GSAP elements over 2506ms |
| Peak screen activity | 98% while pinned scrub runs | 98% while pinned scrub runs |
| Mobile reduced-motion capture | 390x844, 57.7 FPS | 390x844, 57.9 FPS |
| Source LOC | 93 | 84 |

## Findings

The two artifacts are visually close because both implement the same motion idea and the same GSAP primitives. The skill arm is stronger in lifecycle and responsive interaction architecture, especially around scoped React cleanup, refresh-safe pinning, and fine-pointer gating.

The control arm remains functional and performant, but its implementation is less defensive around component lifecycle, viewport refresh, and pointer modality. The pinned sequence moves approximately 98% of the screen at peak, which is the main visual restraint risk in both arms. The CTA nudge is intentionally subtle.

## Caveats

- This is one A/B run per arm, not a distribution across repeated independent model runs.
- Both artifacts were produced in the same workspace by the same assistant process; the arm difference is the installed skill context and dependencies, not different model instances.
- The benchmark static checker reports `avoids_layout_animation: false` for both because the unchanged starter CSS includes layout declarations such as `width`, `height`, and `padding`.
- Runtime measurements were captured on the same local machine and browser session.

## Artifacts

- [With-skill implementation](runs/with-skill/src/main.jsx)
- [Without-skill implementation](runs/without-skill/src/main.jsx)
- [testB prompt](prompts/testB.md)
- [Benchmark rubric](grader/RUBRIC.md)
