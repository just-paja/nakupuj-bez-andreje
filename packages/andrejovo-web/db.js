import agrofert from "agrofert-list";

import { createPatternList, matchBrand } from "agrofert-list/matcher";

export const db = createPatternList(agrofert);
export function matchBlacklistedBrand(text) {
  return matchBrand(db, text);
}
