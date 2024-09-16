import React from "react";
import Banner from "./components/Banner";
import List from "../products/List";
import { useParams } from "react-router-dom";

interface Homepage {
    keyword: string;
}


function Homepage({ keyword }: Homepage) {

    const { genreId } = useParams<{ genreId: string }>(); // Đảm bảo genreId là chuỗi
    let genreIdNumber = 0;

    try {
        // Kiểm tra nếu genreId có tồn tại và không phải là undefined
        if (genreId) {
            genreIdNumber = parseInt(genreId, 10); // Chỉ định hệ cơ số 10
        }
    } catch (error) {
        console.log(error);
    }

    if (Number.isNaN(genreIdNumber)) {
        genreIdNumber = 0; // Nếu không phải là số, gán lại là 0
    }

    return (
        <div>
            <Banner />
            <div className="p-5 my-5">
                <List keyword={keyword} genreIdNumber={genreIdNumber} />
            </div>
        </div>
    );
}

export default Homepage;