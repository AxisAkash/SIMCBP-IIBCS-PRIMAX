# Branding Assets

This directory centralizes all logo/identity artwork for SIMCBP / MCBP-MIS.

## Current state: PLACEHOLDERS ONLY

`placeholders/` contains neutral, clearly-labelled frames — **not** designed
logos and **not** alternative brand marks. They exist so the UI renders with
correctly-proportioned slots until the official files arrive.

## Supplying the official logos

1. Obtain the two official files (unaltered — original colors, proportions,
   typography):
   - **Project logo** → save as `official/mcbp-project-logo.png`
     (Mother and Child Benefit Programme — the pink/magenta মা ও শিশু mark)
   - **Company logo** → save as `official/ibcs-primax-logo.png`
     (IBCS-PRIMAX — "who made this")
2. Create the `official/` folder here and place the files in it.
3. In [`../src/index.ts`](../src/index.ts), set `useOfficialAssets = true`
   (or set `BRAND_USE_OFFICIAL=true` in the app environment).

That is the **only** change required — every surface (login, sidebar, header,
reports, documentation) reads from `@simcbp/branding`.

## Rules

- Do not distort: respect each asset's `aspectRatio` in `src/index.ts`.
- Do not recolor, crop, or recreate the official logos.
- Do not commit the official files until you are authorized to; they are
  organizational assets.
