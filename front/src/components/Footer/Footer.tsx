import React from 'react';
import styled from "styled-components";

const Footer: React.FC = () => {
    return (
        <div className="Footer">
            <Credit>Drawing Race, 2020 megane-monkeys</Credit>
        </div>
    );
};

export default Footer;

const Credit = styled.p`
    text-align: right;
    margin: 10px;
`;
