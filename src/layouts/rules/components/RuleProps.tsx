import React, { useEffect, useState } from "react";

interface RuleProps {
    reqNum: number;
}

const RuleProps: React.FC<RuleProps> = ({ reqNum }) => {
    return (
        <div className="container-fluid bg-light text-dark p-5">
            <div className="container p-5">
                day la {reqNum}
            </div>
        </div>
    );
}

export default RuleProps;