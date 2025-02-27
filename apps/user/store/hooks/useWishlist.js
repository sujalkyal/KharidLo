// hook for wishlist

import { useRecoilValue } from "recoil";
import { wishlistAtom } from "../atoms/wishlistAtom";

export const useWishlist = () => {
    const value = useRecoilValue(wishlistAtom);
    return value;
}