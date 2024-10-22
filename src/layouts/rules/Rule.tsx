import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RuleProps from "./components/RuleProps";

function Rule() {
    const reqParam = useParams<{ ruleNum: string }>();
    const [reqNum, setReqNum] = useState<number | null>(null);

    useEffect(() => {
        setReqNum(parseInt(reqParam.ruleNum + '', 10));
    }, [reqParam.ruleNum]);

    return (
        <div className="container-fluid bg-warning text-dark p-5">
            <div className="container bg-dark p-5">
                {reqNum !== null && <RuleProps reqNum={reqNum} />}
            </div>
        </div>
    );
}

export default Rule;
