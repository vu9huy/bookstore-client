import { Link, useParams } from "react-router-dom";
import Footer from "../../../layouts/footer/Footer";
import Header from "../../../layouts/header/Header";
import DetailBook from "../../../components/detail-book/DetailBook";
import { useEffect, useRef, useState } from "react";
import RandomDisplay from "../../../components/random-display/RandomDisplay";
import Upload from "../../../utils/upload-image/Upload";
import handleUploadImages from "../../../utils/upload-image/Upload-func";

const Book = () => {
    const params = useParams()
    const bookId = params.id;
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [bookId])
    const [listUrlUploaded, setListUrlUpload] = useState([]);
    // console.log('listUrlUploaded', listUrlUploaded);

    const childFunc = useRef(null);

    async function handleUpload() {
        const test = await handleUploadImages(listUrlUploaded)
        childFunc.current();
    }

    return (
        <>
            <Header />
            <div className="body">
                {/* <Upload multiple={true} setListUrlUpload={setListUrlUpload} childFunc={childFunc} /> */}
                {/* <button onClick={(e) => handleUpload(e)} type='submit' >Submit</button> */}
                {/* <div onClick={() => setIsEmtyFile()}> CLICK</div> */}
                <DetailBook isCard={false} bookId={bookId} />
                <RandomDisplay />

            </div>
            <Footer />
        </>

    )
}

export default Book;

