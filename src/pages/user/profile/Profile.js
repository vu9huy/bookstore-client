import Footer from '../../../layouts/footer/Footer';
import Header from '../../../layouts/header/Header';
import Upload from '../../../utils/upload-image/Upload';
import handleUploadImages from '../../../utils/upload-image/Upload-func';
import './Profile.scss';
import { useRef, useState } from "react";


const Profile = () => {
    const [gender, setGender] = useState('male');
    const [listUrlUploaded, setListUrlUpload] = useState([]);
    const [listUrlImage, setListUrlImage] = useState([]);
    console.log('listUrlUploaded', listUrlUploaded);
    console.log('listUrlImage', listUrlImage);

    const childFunc = useRef(null);

    async function handleUpload() {
        const test = await handleUploadImages(listUrlUploaded)
        childFunc.current();
    }



    const handleChangeGender = (event) => {
        setGender(event.target.value)
    }


    return (
        <>
            <Header />
            <div className='body'>
                <div className="profile">
                    <div className='profile-username profile-input'>
                        <label className="form-label">Username</label>
                        <input
                            disabled={true}
                            className="form-control"
                            value={'username'}
                        />
                    </div>
                    <div className='profile-email profile-input'>
                        <label className="form-label">Email</label>
                        <input className="form-control" value={'email'} />
                    </div>
                    <div className='profile-avatar'>
                        <div className='profile-avatar-wrapper'>
                            <div className='profile-avatar-image' style={{ backgroundImage: "url(" + listUrlImage[0] + ")", }}>
                            </div>
                        </div>
                        <div className='profile-avatar-upload'>
                            <Upload multiple={false} setListUrlUpload={setListUrlUpload} childFunc={childFunc} setListUrlImage={setListUrlImage} />
                        </div>
                        {/* <button onClick={(e) => handleUpload(e)} type='submit' >Submit</button> */}
                    </div>
                    <div className='profile-phone profile-input'>
                        <label className="form-label" >Phone Number</label>
                        <input className="form-control" value={'phone number'} />
                    </div>
                    <div className='profile-gender'>
                        <label className="form-label">Gender</label>
                        <div className='profile-gender-male radio-input'>
                            <input type="radio" id="male" name="gender" value="male"
                                checked={gender === 'male'}
                                onChange={(e) => handleChangeGender(e)} />
                            <label className="radio-label" for="male">Male</label>
                        </div>
                        <div className='profile-gender-female radio-input'>
                            <input type="radio" id="female" name="gender" value="female"
                                checked={gender === 'female'}
                                onChange={(e) => handleChangeGender(e)} />
                            <label className="radio-label" for="female">Female</label>
                        </div>
                        <div className='profile-gender-female radio-input'>
                            <input type="radio" id="orther" name="gender" value="orther"
                                checked={gender === 'orther'}
                                onChange={(e) => handleChangeGender(e)} />
                            <label className="radio-label" for="orther">Orther</label>
                        </div>

                    </div>
                    <div className='profile-birthday'>

                    </div>
                    <div className='profile-address'>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile;
