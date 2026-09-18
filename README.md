# GSAP Motion Skill — A/B Benchmark

This benchmark tests whether `@mehshekari/gsap-motion` changes the quality of an AI-generated GSAP card animation.

## Experimental rule
Run two independent agents against the exact same `starter/` snapshot and exact same prompt:

- **Arm A:** skill enabled
- **Arm B:** skill unavailable

The independent grader must evaluate both artifacts without knowing their arm labels.

## Important fairness rules
1. Same model/version.
2. Same temperature/effort/token budget when supported.
3. Same working directory structure.
4. Same prompt (`prompts/card-animation.md`).
5. No human edits before grading.
6. Both agents get the same time/tool budget.
7. The grader runs the same checks on both outputs.
8. Do not score the agent's explanation; score the resulting implementation.
9. For stronger evidence, repeat with 3–5 runs per arm and compare distributions, not one lucky run.

## Manual pilot
Copy `starter/` to `runs/with-skill/` and `runs/without-skill/`, then give each agent the benchmark prompt. Keep the labels hidden from the visual reviewer.

## Independent static check
From each implementation directory:

```bash
node ../grader/checks.mjs .
```

Also run the normal project build and, when available, the GSAP Motion audit/capture tooling.

## Final report
Record:
- build/runtime failures
- audit violations
- visual/motion score using `grader/RUBRIC.md`
- accessibility and responsive observations
- files changed and LOC
- time/tool calls/tokens if the runner exposes them

A single A/B run is a pilot. Five repeated runs are much stronger evidence of whether the skill consistently improves outcomes.
# gsap-motion-test
