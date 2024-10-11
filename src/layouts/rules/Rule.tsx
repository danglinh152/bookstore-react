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
        <div className="container-fluid bg-light text-dark p-5">
            <div className="container p-5">
                {reqNum !== null && <RuleProps reqNum={reqNum} />}
            </div>
        </div>
    );
}

export default Rule;
