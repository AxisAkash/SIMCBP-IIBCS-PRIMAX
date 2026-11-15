/**
 * Bangladesh administrative hierarchy — the backbone of geographic authorization
 * (NFR / §9). Every data record that is place-bound carries a jurisdiction path;
 * every user carries a jurisdiction scope. Access = role permission ∩ scope.
 *
 *   National > Division > District > Upazila > Union (> Ward, optional)
 */

export const JurisdictionLevel = {
  NATIONAL: 'national',
  DIVISION: 'division',
  DISTRICT: 'district',
  UPAZILA: 'upazila',
  UNION: 'union',
  WARD: 'ward',
} as const;

export type JurisdictionLevelKey = (typeof JurisdictionLevel)[keyof typeof JurisdictionLevel];

/** Depth order — lower index = broader authority. */
export const JURISDICTION_ORDER: readonly JurisdictionLevelKey[] = [
  JurisdictionLevel.NATIONAL,
  JurisdictionLevel.DIVISION,
  JurisdictionLevel.DISTRICT,
  JurisdictionLevel.UPAZILA,
  JurisdictionLevel.UNION,
  JurisdictionLevel.WARD,
];

/** A node in the administrative tree. */
export interface JurisdictionNode {
  readonly id: string;
  readonly level: JurisdictionLevelKey;
  readonly code: string; // official geo-code (e.g. BBS code)
  readonly nameEn: string;
  readonly nameBn: string;
  readonly parentId: string | null;
}

/**
 * A user's authorization scope: the node they are anchored to. Authority covers
 * that node and everything beneath it. `national` with a null anchor = whole country.
 */
export interface JurisdictionScope {
  readonly level: JurisdictionLevelKey;
  readonly anchorId: string | null;
  /** Materialised ancestor path (ids, broad -> narrow) for fast containment checks. */
  readonly path: readonly string[];
}

/** Returns true if `scope` is authorised to act on a record at `targetPath`. */
export function scopeContains(scope: JurisdictionScope, targetPath: readonly string[]): boolean {
  if (scope.level === JurisdictionLevel.NATIONAL && scope.anchorId === null) return true;
  if (scope.anchorId === null) return false;
  return targetPath.includes(scope.anchorId);
}

export function levelRank(level: JurisdictionLevelKey): number {
  return JURISDICTION_ORDER.indexOf(level);
}
