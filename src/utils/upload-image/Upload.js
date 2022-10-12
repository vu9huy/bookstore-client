import { useEffect, useState } from 'react';
import axios from 'axios';
import './Upload.scss'
import { uploadImagesApi } from '../api/CallApi';
import handleUploadImages from './Upload-func';

const baseUrl = process.env.REACT_APP_API_URL

const Upload = ({ multiple, setListUrlUpload, childFunc, setListUrlImage }) => {
    const [files, setFiles] = useState([])
    const [fileLinks, setFileLinks] = useState([])

    const handleChange = async (e) => {
        if (e.target.files) {
            const fileSubmitObj = e.target.files;
            const fileLinkCreateArrayRaw = [];

            for (const fileSubmit in fileSubmitObj) {
                fileLinkCreateArrayRaw.push(fileSubmitObj[fileSubmit])
            }
            const fileSubmitArray = fileLinkCreateArrayRaw.slice(0, -2)

            const fileLinkCreateArray = fileSubmitArray.map(fileSubmit => URL.createObjectURL(fileSubmit));
            // console.log('fileSubmit', fileSubmitArray);
            // console.log('fileLinkCreateArray', fileLinkCreateArray);

            setFileLinks(fileLinkCreateArray);
            setListUrlImage(fileLinkCreateArray);

            setFiles(fileSubmitArray);
            setListUrlUpload(fileSubmitArray)
        }

    }

    // const handleSubmit = async (e) => {
    //     const test = await handleUploadImages(files)
    // }

    const setEmtyFile = () => {
        setFiles([])
    }

    useEffect(() => {
        childFunc.current = setEmtyFile;
    }, [])

    return (
        <div className="upload">
            <div className='upload-top'>
                <div className="file-drop-area" >
                    <span className="fake-btn">Choose files</span>
                    {files.length == 0 && <span className="file-msg">or drag and drop files here</span>}
                    {files.length > 1 && <span className="file-msg">{`${files.length} files selected`}</span>}
                    {files.length == 1 && <span className="file-msg">{`${files[0]?.name}`}</span>}
                    <input type="file" multiple={multiple} accept="image/*" onChange={(e) => handleChange(e)} className="file-input" />
                </div >
            </div >

            {
                // multiple && <div className='list-images-upload'>
                //     {fileLinks.map((fileLink, index) => {
                //         return (
                //             <div key={index} className='image-upload' style={{ backgroundImage: "url(" + fileLink + ")", }}>
                //                 {/* <img key={index} src={fileLink} /> */}
                //             </div>
                //         )
                //     })}
                // </div>
            }

        </div >
    )
}

export default Upload;