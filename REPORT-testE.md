# GSAP Motion A/B Report: Test E

Date: 2026-09-18
Prompt: Transform a Weak Hero

## Test Setup

- **With skill:** [runs/testE-with-skill](runs/testE-with-skill), using `gsap-creative-animation`, `@mehshekari/gsap-motion` 4.2.1, and `@gsap/react`.
- **Without skill:** [runs/testE-without-skill](runs/testE-without-skill), using raw GSAP and `gsap.context()` only.
- Both arms started from the same `starter/` snapshot.

## Result

The transformation turns the original generic hero into a focused three-card tableau. The copy establishes the beginning, the staggered cards form the middle, and the featured-card emphasis plus hover/focus state provide the ending. No unrelated content or continuous ambient loops were added.

## Weighted Score

| Category           |   Weight |  With skill | Without skill |
| ------------------ | -------: | ----------: | ------------: |
| Motion quality     |      30% |         8.5 |           8.0 |
| GSAP architecture  |      20% |         9.3 |           7.3 |
| Choreography       |      15% |         8.5 |           8.0 |
| Responsive         |      10% |         8.5 |           7.5 |
| Accessibility      |      10% |         8.5 |           7.3 |
| Performance        |      10% |         9.0 |           8.5 |
| Maintainability    |       5% |         9.2 |           7.5 |
| **Weighted total** | **100%** | **8.78/10** |   **7.72/10** |

## Verification

| Check                         | With skill        | Without skill     |
| ----------------------------- | ----------------- | ----------------- |
| Production build              | Passed            | Passed            |
| GSAP Motion audit             | 0 findings        | 5 warnings        |
| Editor/code errors            | None              | None              |
| Desktop runtime review        | 59.4 FPS          | 59.7 FPS          |
| First observed motion         | 441ms             | 328ms             |
| Elements moved                | 7 GSAP elements   | 7 GSAP elements   |
| Peak screen activity          | 30%               | 49%               |
| Mobile reduced-motion capture | 390x844, 56.3 FPS | 390x844, 54.9 FPS |
| Source LOC                    | 67                | 68                |

## Engineering Evaluation

### With skill

- Uses scoped `useGSAP` lifecycle management.
- Uses one coordinated entrance timeline rather than independent page effects.
- Uses `quickTo`-style bounded interaction only through card state tweens.
- Gates card pointer/focus interactions with `(hover: hover) and (pointer: fine)`.
- Uses abortable listeners and reduced-motion end-state setting.
- GSAP audit returned zero findings.

### Without skill

- Uses `gsap.context()` and manual cleanup.
- Produces similar visual output and frame rate.
- Audit reports an ungated hover path and four dangling card listeners.
- More lifecycle and coarse-pointer risk remains in the interaction layer.

## Refinement Decisions

Removed or avoided:

- Continuous ambient loops
- Decorative parallax
- Animated background effects
- Extra product claims
- Independent motion on every static label
- Additional UI that would compete with the three-card story

## Caveats

- This is one A/B run per arm, not a distribution across repeated independent model runs.
- Both artifacts were produced in the same workspace by the same assistant process; the arm difference is the skill context and dependencies.
- The benchmark checker reports `cleanup_signal: false` for the skill arm because its regex does not recognize `useGSAP`; the package audit correctly reports zero findings.
- The benchmark checker reports `avoids_layout_animation: false` for both because normal CSS layout declarations are present; they are not animated properties.
- Runtime measurements were captured on the same local machine and browser session.

## Runtime URLs

- With skill: http://127.0.0.1:5182/
- Without skill: http://127.0.0.1:5183/

## Artifacts

- [Test E with-skill source](runs/testE-with-skill/src/main.jsx)
- [Test E without-skill source](runs/testE-without-skill/src/main.jsx)
- [Test E prompt](prompts/testE.md)
- [Benchmark rubric](grader/RUBRIC.md)
