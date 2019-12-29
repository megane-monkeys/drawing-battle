import { RootState } from "../reducer";

const timerSelector = (state: RootState) => state.timer;

export default timerSelector;
