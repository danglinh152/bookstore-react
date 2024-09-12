import React from "react";
import Banner from "./components/Banner";
import List from "../products/List";
function Homepage() {
    return (
        <div>
            <Banner />
            <div className="p-5 my-5">
                <List />
            </div>
        </div>
    );
}

export default Homepage;