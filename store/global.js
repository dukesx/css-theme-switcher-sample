import { action } from "easy-peasy";

export const Global = {
  getStarted: false,
  setGetStarted: action((state, payload) => {
    state.getStarted = payload;
  }),
};
