# GSAP Motion A/B Report

Date: 2026-09-18

## Prompt

1. Fade the feature cards up as they scroll into view.
2. Make the hero feel more cinematic.
3. Pin the section and scrub three steps while scrolling.
4. Use MotionPath to nudge a button on hover.

## Arms

- **With skill:** `runs/with-skill/`, using `@mehshekari/gsap-motion` 4.2.1 and the installed `gsap-creative-animation` skill.
- **Without skill:** `runs/without-skill/`, using raw GSAP only.
- Both arms were reset from the same `starter/` snapshot and given the same prompt.

## Weighted Scores

| Category | Weight | With skill | Without skill |
|---|---:|---:|---:|
| Motion quality | 30% | 7.8 | 7.8 |
| GSAP architecture | 20% | 9.0 | 7.5 |
| Choreography | 15% | 8.4 | 8.4 |
| Responsive | 10% | 8.0 | 7.5 |
| Accessibility | 10% | 7.8 | 7.5 |
| Performance | 10% | 8.5 | 8.4 |
| Maintainability | 5% | 8.8 | 8.0 |
| **Total** | **100%** | **8.27/10** | **7.87/10** |

## Verification

| Check | With skill | Without skill |
|---|---|---|
| Production build | Passed | Passed |
| GSAP Motion audit | 0 findings | 0 findings |
| Editor/code errors | None | None |
| Mobile runtime capture | 390x844, 57.4 FPS | 390x844, 56.4 FPS |
| Desktop scroll review | 59.5 FPS, 10 GSAP elements | 59.3 FPS, 10 GSAP elements |
| First motion during scroll review | 295ms | 290ms |
| Peak screen activity | 98% while pinned scrub runs | 98% while pinned scrub runs |
| Source LOC | 93 | 84 |

## Findings

The visual output and choreography are intentionally close because both arms implement the same requested motion language: hero entrance, card reveal, pinned three-step scrub, and MotionPath hover.

The skill arm scores higher on engineering quality. It uses `useGSAP`, scoped selectors, `invalidateOnRefresh`, `anticipatePin`, hover capability gating, and explicit listener cleanup. The control arm uses `gsap.context()` and manual cleanup, but lacks the skill arm's refresh and input safeguards.

The pinned sequence can move most of the viewport at once. That is expected for the requested full-section pin and scrub, but it is the main restraint risk in the visual score. The MotionPath nudge is deliberately small.

## Benchmark Caveats

- This was one A/B run per arm, not a distribution across repeated independent model runs.
- The benchmark static checker reports `avoids_layout_animation: false` for both arms because the unchanged starter CSS contains layout declarations such as `width`, `height`, and `padding`.
- The same checker does not recognize `useGSAP` as a cleanup signal, although the package audit does.
- Runtime measurements were captured on the same local machine and browser session; they are comparative evidence, not device-wide performance proof.

## Artifacts

- [With-skill implementation](runs/with-skill/src/main.jsx)
- [Without-skill implementation](runs/without-skill/src/main.jsx)
- [Benchmark prompt](prompts/card-animation.md)
- [Benchmark rubric](grader/RUBRIC.md)
