# GSAP Motion A/B Report: Test D

Date: 2026-09-18
Prompt: [prompts/testD.md](prompts/testD.md)

## Test Setup

- **With skill:** [runs/testD-with-skill](runs/testD-with-skill), using `gsap-creative-animation`, `@mehshekari/gsap-motion` 4.2.1, and `@gsap/react`.
- **Without skill:** [runs/testD-without-skill](runs/testD-without-skill), using raw GSAP and `gsap.context()` only.
- Both arms started from the same `starter/` snapshot and received the same Test D prompt.

## Weighted Score

| Category           |   Weight |  With skill | Without skill |
| ------------------ | -------: | ----------: | ------------: |
| Motion quality     |      30% |         8.4 |           7.9 |
| GSAP architecture  |      20% |         9.2 |           7.3 |
| Choreography       |      15% |         8.5 |           7.9 |
| Responsive         |      10% |         8.5 |           7.5 |
| Accessibility      |      10% |         8.2 |           7.5 |
| Performance        |      10% |         8.8 |           8.5 |
| Maintainability    |       5% |         9.0 |           7.5 |
| **Weighted total** | **100%** | **8.64/10** |   **7.72/10** |

## Design Result

Both arms replace the starter with a complete premium banking first viewport: an asymmetrical hero, high-contrast trust/intelligence/speed hierarchy, primary and secondary actions, and a smart-account balance panel with activity data.

The visual concept uses a dark banking-console surface with mint action color, editorial scale, a live balance panel, and restrained motion. The content communicates fast digital banking, smart financial management, and personalized service without adding unrelated product claims.

The skill arm uses a scoped `useGSAP` timeline, explicit reduced-motion end state, abortable pointer listeners, and `quickTo` for efficient CTA response. The control arm uses raw GSAP context and manual cleanup, but has less defensive structure around lifecycle and preference changes.

## Verification

| Check                         | With skill                                | Without skill                             |
| ----------------------------- | ----------------------------------------- | ----------------------------------------- |
| Production build              | Passed                                    | Passed                                    |
| GSAP Motion audit             | 0 findings                                | 0 findings                                |
| Benchmark checks              | Passed except known layout false positive | Passed except known layout false positive |
| Editor/code errors            | None                                      | None                                      |
| Desktop runtime review        | 59 FPS                                    | 59.4 FPS                                  |
| First observed motion         | 380ms                                     | 461ms                                     |
| Elements moved                | 12 GSAP elements                          | 12 GSAP elements                          |
| Peak screen activity          | 39%                                       | 39%                                       |
| Mobile reduced-motion capture | 390x844, 54.2 FPS                         | 390x844, 54.1 FPS                         |
| Source LOC                    | 66                                        | 72                                        |

## Findings

The skill arm is the stronger implementation. It begins the entrance sooner, keeps the motion system compact, and uses the React-specific GSAP integration plus abortable input handling. The control arm reaches a similar visual result and frame rate but relies on more manual lifecycle code.

The interaction budget is restrained: one coordinated intro timeline, one reusable CTA pointer response, and no continuous animation loops. The first viewport is conversion-focused, with the CTA visually anchored to the balance panel rather than competing with it.

## Caveats

- This is one A/B run per arm, not a distribution across repeated independent model runs.
- Both artifacts were produced in the same workspace by the same assistant process; the arm difference is the skill context and dependencies.
- The benchmark checker reports `avoids_layout_animation: false` for both because the implementation includes normal layout declarations such as `width`, `height`, and `padding`; this is a static checker limitation for this UI task, not an animated layout property finding.
- The benchmark checker may not recognize `useGSAP` as its cleanup signal; the installed GSAP audit reports zero findings.
- Runtime measurements were captured on the same local machine and browser session.
- The typography uses Google Fonts via CSS import; production deployment should self-host the chosen fonts if offline or privacy-constrained loading is required.

## Runtime URLs

- With skill: http://127.0.0.1:5180/
- Without skill: http://127.0.0.1:5181/

## Artifacts

- [Test D with-skill source](runs/testD-with-skill/src/main.jsx)
- [Test D without-skill source](runs/testD-without-skill/src/main.jsx)
- [Test D prompt](prompts/testD.md)
- [Benchmark rubric](grader/RUBRIC.md)
