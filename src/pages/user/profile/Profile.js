import Footer from '../../../layouts/footer/Footer';
import Header from '../../../layouts/header/Header';
import Upload from '../../../utils/upload-image/Upload';
import handleUploadImages from '../../../utils/upload-image/Upload-func';
import './Profile.scss';
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import Button from '../../../element/button/Button';
import { editUserDataApi, getUserDataApi } from '../../../utils/api/CallApi';

const Profile = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [listUrlUploaded, setListUrlUpload] = useState([]);
    const [listUrlImage, setListUrlImage] = useState([]);
    const [userData, setUserData] = useState({});
    const childFunc = useRef(null);

    useEffect(async () => {
        const response = await getUserDataApi();
        const userData = response.data?.data;
        // console.log('userData', userData);

        setListUrlImage([userData.avatarUrl]);
        const userBirthday = userData.birthday ? new Date(userData.birthday) : new Date();

        setStartDate(userBirthday);

        const initialValues = {
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            gender: userData.gender,
            country: userData.address.country,
            city: userData.address.city,
            zipCode: userData.address.zipCode,
            detailAddress: userData.address.detailAddress,
            avatarUrl: userData.avatarUrl,
        };
        setUserData(initialValues);
    }, [])



    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };
    // console.log('userData', userData);

    async function handleSaveUserData() {
        const response = await handleUploadImages(listUrlUploaded);
        // console.log('response', response);

        childFunc.current();
        const userDataObj = {
            ...userData,
            avatarUrl: response[0] || userData.avatarUrl,
            birthday: startDate,
            address: {
                country: userData.country,
                city: userData.city,
                zipCode: userData.zipCode,
                detailAddress: userData.detailAddress,
            },

        }
        delete userDataObj.country;
        delete userDataObj.city;
        delete userDataObj.zipCode;
        delete userDataObj.detailAddress;

        // console.log('userDataObj', userDataObj);
        const result = await editUserDataApi(userDataObj);
        // console.log('result', result);

    }


    return (
        <>
            <Header />
            <div className='body'>
                <div className='profile-wrapper'>
                    <div className="profile">
                        <div className='profile-username profile-input profile-item'>
                            <label className="form-label">Username</label>
                            <input
                                disabled={true}
                                className="form-control"
                                value={userData.username}
                            />
                        </div>
                        <div className='profile-email profile-input profile-item'>
                            <label className="form-label">Email</label>
                            <input
                                className="form-control"
                                value={userData.email}
                                name='email'
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className='profile-avatar profile-item'>
                            <div className='profile-avatar-wrapper'>
                                <div className='profile-avatar-image' style={{ backgroundImage: "url(" + listUrlImage[0] + ")", }}>
                                </div>
                            </div>
                            <div className='profile-avatar-upload'>
                                <Upload multiple={false} setListUrlUpload={setListUrlUpload} childFunc={childFunc} setListUrlImage={setListUrlImage} />
                            </div>
                            {/* <button onClick={(e) => handleUpload(e)} type='submit' >Submit</button> */}
                        </div>
                        <div className='profile-phone profile-input profile-item'>
                            <label className="form-label" >Phone Number</label>
                            <input
                                className="form-control"
                                value={userData.phone}
                                name='phone'
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className='profile-gender profile-item'>
                            <label className="form-label">Gender</label>
                            <div className='profile-gender-male radio-input'>
                                <input type="radio" id="male" name="gender" value="male"
                                    checked={userData.gender === 'male'}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <label className="radio-label" htmlFor="male">Male</label>
                            </div>
                            <div className='profile-gender-female radio-input'>
                                <input type="radio" id="female" name="gender" value="female"
                                    checked={userData.gender === 'female'}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <label className="radio-label" htmlFor="female">Female</label>
                            </div>
                            <div className='profile-gender-female radio-input'>
                                <input type="radio" id="other" name="gender" value="other"
                                    checked={userData.gender === 'other'}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <label className="radio-label" htmlFor="other">Other</label>
                            </div>

                        </div>
                        <div className='profile-birthday profile-item'>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                maxDate={addDays(new Date(), 0)}
                            />
                        </div>
                        <div className='profile-country profile-input profile-item'>
                            <label className="form-label">Country</label>
                            <input
                                onChange={(e) => handleInputChange(e)}
                                className="form-control"
                                name='country'
                                value={userData.country}
                            />
                        </div>
                        <div className='profile-city profile-input profile-item'>
                            <label className="form-label">City</label>
                            <input
                                onChange={(e) => handleInputChange(e)}
                                className="form-control"
                                name='city'
                                value={userData.city}
                            />
                        </div>
                        <div className='profile-zipcode profile-input profile-item'>
                            <label className="form-label">Zip code</label>
                            <input
                                onChange={(e) => handleInputChange(e)}
                                className="form-control"
                                name='zipCode'
                                value={userData.zipCode}
                            />
                        </div>
                        <div className='profile-detail-address profile-input profile-item'>
                            <label className="form-label">Detail Address</label>
                            <input
                                onChange={(e) => handleInputChange(e)}
                                className="form-control"
                                name='detailAddress'
                                value={userData.detailAddress}
                            />
                        </div>
                        <div className='profile-button-wrapper profile-item'>
                            <div className='profile-button' onClick={() => handleSaveUserData()}>
                                <Button content={`SAVE`} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile;
