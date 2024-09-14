import React from "react";
import Banner from "./components/Banner";
import List from "../products/List";

interface Homepage {
    keyword: string;
}


function Homepage({ keyword }: Homepage) {
    return (
        <div>
            <Banner />
            <div className="p-5 my-5">
                <List keyword={keyword} />
            </div>
        </div>
    );
}

export default Homepage;