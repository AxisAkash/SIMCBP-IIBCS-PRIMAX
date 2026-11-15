/**
 * @simcbp/branding — CENTRALIZED visual identity configuration.
 *
 * This is the single place to swap in the official logos. The repository ships
 * with clearly-labelled PLACEHOLDER artwork only (assets/placeholders/*). When
 * the official IBCS-PRIMAX and MCBP logo files are supplied:
 *
 *   1. Drop the files into `assets/official/` (see assets/README.md).
 *   2. Flip `useOfficialAssets` to `true` (or set env BRAND_USE_OFFICIAL=true in apps).
 *   3. No component code changes — every surface reads from here.
 *
 * NOTE: Placeholders are neutral frames, NOT alternative logos. Do not treat
 * them as brand marks.
 */

export interface LogoAsset {
  /** Logical id consumers reference. */
  readonly id: 'project' | 'company';
  /** Path to the placeholder shipped in this package (relative to package root). */
  readonly placeholder: string;
  /** Expected filename when the official asset is provided. */
  readonly officialFileName: string;
  /** Intrinsic aspect ratio hint (width / height) — do NOT distort. */
  readonly aspectRatio: number;
  readonly altEn: string;
  readonly altBn: string;
}

/** Toggle once official assets are present. */
export const useOfficialAssets = false;

export const PROJECT_LOGO: LogoAsset = {
  id: 'project',
  placeholder: 'assets/placeholders/project-logo.svg',
  officialFileName: 'mcbp-project-logo.png',
  aspectRatio: 2.2,
  altEn: 'Mother and Child Benefit Programme',
  altBn: 'মা ও শিশু সহায়তা কর্মসূচি',
};

export const COMPANY_LOGO: LogoAsset = {
  id: 'company',
  placeholder: 'assets/placeholders/company-logo.svg',
  officialFileName: 'ibcs-primax-logo.png',
  aspectRatio: 3.0,
  altEn: 'IBCS-PRIMAX Software (Bangladesh) Ltd.',
  altBn: 'আইবিসিএস-প্রাইম্যাক্স সফটওয়্যার (বাংলাদেশ) লিমিটেড',
};

export const BRAND = {
  programmeNameEn: 'Mother and Child Benefit Programme',
  programmeNameBn: 'মা ও শিশু সহায়তা কর্মসূচি',
  systemNameEn: 'MCBP-MIS / MoWCA Integrated MIS',
  ministryEn: 'Ministry of Women and Children Affairs',
  ministryBn: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয়',
  vendorEn: 'IBCS-PRIMAX Software (Bangladesh) Ltd.',
  taglineBn: 'যত্নে রাখি শিশু ও মা, গড়ি আগামীর সম্ভাবনা',
} as const;

export const LOGOS = { project: PROJECT_LOGO, company: COMPANY_LOGO } as const;

/** Resolve the asset path a consumer should render, honouring the toggle. */
export function resolveLogoPath(asset: LogoAsset, officialBaseDir = 'assets/official'): string {
  return useOfficialAssets ? `${officialBaseDir}/${asset.officialFileName}` : asset.placeholder;
}
