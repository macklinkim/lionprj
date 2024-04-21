import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: 'cart',
  storage: undefined,
});

export const saveCart = atom({
  key: 'saveCart',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
export const userId = atom({
  key: 'userId',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
