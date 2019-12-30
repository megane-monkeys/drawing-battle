import React from 'react';
import Timer from "../Timer/Timer"
import { predictionSelectors } from "../../modules/prediction"
import { useSelector } from "react-redux";

const Header: React.FC = () => {
    const state = useSelector(predictionSelectors);
    return (
        <div className="Header">
            <h2>お題 「{state.answer || "???"}」</h2>
            <Timer />
            <p>AIによる判定... {state.prediction} ?</p>
        </div>
    );
};

export default Header;

