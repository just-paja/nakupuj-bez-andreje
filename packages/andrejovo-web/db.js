import agrofert from "agrofert-list";

import { createPatternList, matchBrand } from "agrofert-matchmaker";

export const db = createPatternList(agrofert);
export function matchBlacklistedBrand(text) {
  return matchBrand(db, text);
}
