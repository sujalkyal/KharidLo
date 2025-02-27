// make wishlist atom with recoil

import { atom } from "recoil";

export const wishlistAtom = atom({
  key: "wishlistAtom",
  default: [],
});