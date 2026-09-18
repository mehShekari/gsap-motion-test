# GSAP Motion A/B Report: Test C

Date: 2026-09-18
Prompt: [prompts/testC.md](prompts/testC.md)

## Test Setup

- **With skill:** [runs/testC-with-skill](runs/testC-with-skill), using `gsap-creative-animation`, `@mehshekari/gsap-motion` 4.2.1, and `@gsap/react`.
- **Without skill:** [runs/testC-without-skill](runs/testC-without-skill), using raw GSAP and `gsap.context()` only.
- Both arms started from the same `starter/` snapshot and received the exact Test C prompt.
- The earlier `card-animation.md` and `re-desing.md` runs are excluded.

## Weighted Score

| Category | Weight | With skill | Without skill |
|---|---:|---:|---:|
| Motion quality | 30% | 8.0 | 7.5 |
| GSAP architecture | 20% | 9.2 | 7.0 |
| Choreography | 15% | 7.8 | 7.5 |
| Responsive | 10% | 8.5 | 7.5 |
| Accessibility | 10% | 8.5 | 7.0 |
| Performance | 10% | 8.8 | 8.2 |
| Maintainability | 5% | 9.0 | 7.2 |
| **Weighted total** | **100%** | **8.44/10** | **7.41/10** |

## Implementation Summary

Both arms preserve the starter composition and content, adding only a hero-to-CTA entrance, scroll-triggered card discovery, subtle card hover/focus feedback, and a pointer-responsive CTA.

The skill arm uses scoped `useGSAP`, capability-gated pointer interaction, abortable listeners, and a reduced-motion branch. The control arm uses raw `gsap.context()` and manual listener cleanup, but reads the preference once and has less defensive responsive/lifecycle handling.

## Verification

| Check | With skill | Without skill |
|---|---|---|
| Production build | Passed | Passed |
| GSAP Motion audit | 0 findings | 0 findings |
| Editor/code errors | None | None |
| Desktop runtime review | 59.1 FPS | 59 FPS |
| First observed motion | 408ms | 541ms |
| Elements moved | 7 GSAP elements | 7 GSAP elements |
| Peak screen activity | 59% | 59% |
| Mobile reduced-motion capture | 390x844, 58.9 FPS | 390x844, 58.5 FPS |
| Source LOC | 71 | 75 |

## Findings

The skill arm produced the stronger implementation for the ambiguous brief. It establishes a clearer attention path from hero to CTA to cards and has more reliable input and lifecycle boundaries. The control arm is visually functional and similarly performant, but its one-time media-query read and manually managed event path are more vulnerable to preference changes, pointer modality changes, and remount edge cases.

Both implementations remain restrained: there are no loops, no React state updates for animation, and no unnecessary animation plugins. The card reveal is intentionally triggered as the feature content enters the viewport rather than animating every element independently.

## Caveats

- This is one A/B run per arm, not a distribution across repeated independent model runs.
- Both artifacts were produced in the same workspace by the same assistant process; the arm difference is the skill context and dependencies.
- The benchmark checker reports `cleanup_signal: false` for the skill arm because its regex does not recognize `useGSAP`; the package audit reports zero findings.
- The benchmark checker reports `avoids_layout_animation: false` for both because the unchanged starter CSS includes layout declarations such as `width`, `height`, and `padding`.
- Runtime measurements were captured on the same local machine and browser session.

## Artifacts

- [Test C with-skill source](runs/testC-with-skill/src/main.jsx)
- [Test C without-skill source](runs/testC-without-skill/src/main.jsx)
- [Test C prompt](prompts/testC.md)
- [Benchmark rubric](grader/RUBRIC.md)
