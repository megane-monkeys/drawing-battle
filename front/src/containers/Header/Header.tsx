import React from 'react';
import Timer from "../Timer/Timer"
import predictionSelector from "../../modules/prediction/selector"
import { useSelector } from "react-redux";

const Header: React.FC = () => {
    const state = useSelector(predictionSelector);
    return (
        <div className="Header">
            <h2>お題 「ユニコーン」</h2>
            <Timer />
            <p>AIによる判定... {state.result}?</p>
        </div>
    );
};

export default Header;

