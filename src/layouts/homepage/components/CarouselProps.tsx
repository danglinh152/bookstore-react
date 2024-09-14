import React, { useState, useEffect } from "react";
import Image from "./../../../models/Image"
import BookProps from "../../products/components/BookProps";
import { getAllImages } from "../../../api/ImageAPI";


const Carousel: React.FC<BookProps> = ({ book }) => {
    const bookId = book.getBookId();

    const [ListImage, setListImage] = useState<Image[]>([]);
    const [isLoad, setIsLoad] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);
    useEffect(() => {
        getAllImages(bookId).then(
            (imageData) => {
                setListImage(imageData);
                setIsLoad(false);
            }
        ).catch(
            (imageData) => {
                const error = new Error('Error');
                setIsError(error.message);
            }
        )

    }, [])

    if (isLoad) {
        return (
            <div>
                <h1> Loading... </h1>
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                <h1> Báo lỗi </h1>
            </div>
        )
    }


    return (
        <div className="row d-flex">
            {ListImage && ListImage.length > 0 ? (
                <div className="img-block">
                    <a href="" className="link">
                        <img
                            src={ListImage[0].getData()}
                            className="d-block w-100 rounded"
                            alt="Slide 1"
                            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                        />
                    </a>
                </div>
            ) : (
                <div className="img-block">
                    <a href="" className="link">
                        <img
                            src="./images/image-pending.jpg"
                            className="d-block w-100 rounded"
                            alt="Slide 1"
                            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                        />
                    </a>
                </div>
            )}
            <div className="d-flex flex-column caption text-white justify-content-center align-items-center mt-3">
                <h2 className="fs-5">{book.getTitle()}</h2>
                <p className="fs-6">{book.getDescription()}</p>
            </div>
        </div>
    );


}

export default Carousel;



