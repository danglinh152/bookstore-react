import React from "react";

function Carousel() {
    return (

        <div className="container p-5">
            <div id="carouselBook" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselBook" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselBook" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselBook" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={require('./../../../images/Sach-Dac-Nhan-Tam-1.jpeg')} className="d-block w-100" alt="Slide 1" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item">
                        <img src={require('./../../../images/Sach-Dac-Nhan-Tam-1.jpeg')} className="d-block w-100" alt="Slide 2" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item">
                        <img src={require('./../../../images/Sach-Dac-Nhan-Tam-1.jpeg')} className="d-block w-100" alt="Slide 3" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselBook" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselBook" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

    )
}

export default Carousel;