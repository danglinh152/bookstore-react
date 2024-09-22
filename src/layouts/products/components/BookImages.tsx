import React, { useEffect, useState } from "react";
import Image from "../../../models/Image";
import { getAllImages } from "../../../api/ImageAPI";

interface BookImagesInterface {
    bookId: number;
}
const BookImages: React.FC<BookImagesInterface> = ({ bookId }) => {
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

    }, [bookId])

    if (isLoad) {
        return (
            <div className="loading-screen">
                <h1> Loading... </h1>
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                <h1> Báo lỗi: ${isError} </h1>
            </div>
        )
    }
    return (
        <div className="row gap-3 flex-nowrap pb-2" style={{overflowX: 'auto', overflowY: 'hidden'}}>
            {ListImage && ListImage.length > 0 ? (
                ListImage.map((image, index) => (
                    <div className="col-2" key={index}>
                        <img
                            className="object-fit-cover rounded"
                            src={image.getData()}
                            alt="Card image"
                            style={{ height: '50px', width: '50px' }}
                        />
                    </div>
                ))
            ) : (
                <div className="col-2" >
                    <img
                        className="object-fit-cover rounded"
                        src="./images/image-pending.jpg"
                        alt="Card image"
                        style={{ height: '50px', width: '50px' }}
                    />
                </div>
            )}
        </div>
    );

}



export default BookImages;