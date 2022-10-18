import { uploadImagesApi } from "../api/CallApi";


const handleUploadImages = async (files) => {
    try {
        const getWithPromiseAll = async () => {
            let listUrlUploaded = await Promise.all(files.map(async (file) => {
                const response = await uploadImagesApi(file.name);
                const result = response.data?.data;
                // console.log('result', result);
                const presignedUrl = result.url;
                // const imageUrl = result.urlImage;
                const requestOptions = {
                    method: 'PUT',
                    body: file
                };
                const upload = await fetch(presignedUrl, requestOptions);
                const urlImageUploaded = result.urlImage;
                // return urlImageUploaded;
                return urlImageUploaded;
            }))
            return listUrlUploaded;
        }
        const allUrlResponse = await getWithPromiseAll();
        return allUrlResponse;
        // console.log('allUrlResponse', allUrlResponse);

    } catch (error) {
        console.log(error);
    }
}

export default handleUploadImages;