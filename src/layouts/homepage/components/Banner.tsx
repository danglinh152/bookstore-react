import React from "react";

function Banner() {
    return (
        <div className="p-2 mb-2 bg-dark">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold"> Trên con đường thành công, <br /> không có dấu chân của kẻ lười biếng. </h1>
                    <p className="fw-bold mt-3 me-5"> <i>Lỗ Tấn</i> </p>
                    <button className="btn btn-primary float-end"> Khám phá sách ngay </button>
                </div>
            </div>
        </div>
    );
}

export default Banner;