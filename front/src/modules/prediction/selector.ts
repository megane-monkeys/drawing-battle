import { RootState } from "../reducer";

const predictionSelector = (state: RootState) => state.prediction;

export default predictionSelector;
