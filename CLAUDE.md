# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Santiago Norena, hosted on Google Cloud Storage (GCS) as a CNAME bucket. No build step, no package manager, no framework — plain HTML/CSS with CDN-loaded Bootstrap 4.5.2 and Font Awesome 4.7.

## Deployment

Files are pushed to GCS using `gsutil`. The bucket name matches the domain (`www.santiagonorena.tech`).

**Deploy the full site:**
```bash
gsutil rsync -R website gs://www.santiagonorena.tech
```

**Deploy a single file:**
```bash
gsutil cp website/index.html gs://www.santiagonorena.tech
```

**Set main page and error page (one-time / after bucket recreation):**
```bash
gsutil web set -m index.html -e 404.html gs://www.santiagonorena.tech
```

All deployment reference commands are in `utils/using_gsutil.txt`.

## Repository Layout

| Path | Purpose |
|------|---------|
| `website/` | Production site — the only directory deployed to GCS |
| `website-test/` | Sandbox for testing layout changes before deploying to `www.techineer.xyz` |
| `utils/` | GCS helper scripts and gsutil command reference |
| `deployment/` | Screenshot assets for README |

## CSS Architecture

`website/css/custom.css` is the only custom stylesheet. It uses a single background image served from GCS (`gs://www.santiagonorena.tech/images/mountain-road.jpeg`). Bootstrap is loaded via CDN and is the primary layout system; `custom.css` only overrides or extends it.

There is no `bootstrap-social.css` file in the repo — `index.html` references it via a relative path but it must be present in the bucket separately or the social buttons will lose their styling.

## Local Preview

Open any HTML file directly in a browser — no server required. CDN assets (Bootstrap, Font Awesome) load over the network, so internet access is needed to render correctly.
