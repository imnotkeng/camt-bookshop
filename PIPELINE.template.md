# PIPELINE.md — CAMT Bookshop

Rename this file to `PIPELINE.md` and fill every section. Links must be clickable URLs to
runs in **your** repository. Screenshots go in `docs/` and are linked from here.

Student ID: __________   Name: ______________________   Repository: ______________________

Production URL: ____________________________________________

## 1. Pipeline at a glance

Draw your pipeline as a Mermaid flowchart: the three workflows, their triggers, their jobs,
the `needs:` arrows between jobs, and where Vercel receives a deployment.

```mermaid
flowchart LR
  %% replace with your pipeline
```

## 2. Evidence

| AC | What | Link / screenshot |
|---|---|---|
| AC-03.2 | screenshot of the Vercel dashboard's deployment list — every entry made by Actions | |
| AC-03.4 | screenshot of Deployment Protection: Vercel Authentication on, bypass created | |
| AC-04.3–4 | a green `PR gate` run: smoke → deploy-preview → test-preview, with the preview URL | |
| AC-04.6 | the same run's duration, warm cache | |
| AC-05.1–3 | screenshot of the branch protection / ruleset settings | |
| AC-05.4 | the pull request whose merge was blocked by a red required check | |
| AC-06.3–4 | a green `Main pipeline` run: test → deploy-production → verify | |
| AC-06.7 | the `Main pipeline` run with the test job red and the deploy skipped | |
| AC-07.2 | three `Nightly` runs started by hand — one per target — each with its merged report | |
| AC-08.2 | the quarantine issue | |

## 3. Timings

| Run | Cold cache | Warm cache | Budget | Within? |
|---|---|---|---|---|
| PR gate (all three jobs) | | | 8 min | |
| Main pipeline (all three jobs) | | | 10 min | |
| Nightly, target = production (start to merged report) | | | 20 min | |
| Nightly, target = local (start to merged report) | | | 20 min | |

Which step did the browser cache save the most time on, and how much? ______________

Nightly against production vs. against a local build — which was faster, and why? ______

## 4. Triage record — the quarantined test

| | |
|---|---|
| Symptom | |
| Local measurement (`--repeat-each=10`) | ___ passed / ___ failed |
| Classification (regression / flaky / environment) | |
| Evidence that decided it | |
| Containment applied | |
| Cure (planned or done) | |
| Expiry date | |

## 5. The teammate's pull request (PR-42)

1. What the PR gate reported (all three jobs), and why: ________________________________
2. What the main pipeline reported, and which test(s) caught it: ______________________
3. What the Vercel dashboard and the production URL showed while `main` was red: _______
4. How you restored `main`: _______________________________________________________
5. Your decision on Think first #10, with the reason: _____________________________

## 6. Think-first answers

Copy all ten answers here, with the correction you made after running the command where
your first answer was wrong.

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.

## 7. One thing I would change

If you had a second week on this pipeline, what one change would make it more trustworthy
or cheaper, and how would you measure that it worked?
