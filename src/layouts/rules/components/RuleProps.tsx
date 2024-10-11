import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RuleProps {
    reqNum: number;
}

const RuleProps: React.FC<RuleProps> = ({ reqNum }) => {
    return (
        <div className="container-fluid bg-light text-dark p-5">
            <div className="container p-5">
                {reqNum}
            </div>
        </div>
    );
}

export default RuleProps;