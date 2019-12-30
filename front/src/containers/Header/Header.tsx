import React from 'react';
import Timer from "../Timer/Timer"

const Header: React.FC = () => {
    return (
        <div className="Header">
            <span>お題 「ユニコーン」</span>
            <Timer />
        </div>
    );
};

export default Header;

