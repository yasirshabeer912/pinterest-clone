import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, setUserDetails } from "../store/actions/authActions";


const EditProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.userDetails);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const openFileInput = () => {
        var fileInput = document.getElementById("fileInput");
        fileInput.click();
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            setImage(selectedImage);

            // Create a preview URL for the selected image
            const previewURL = URL.createObjectURL(selectedImage);
            setImagePreview(previewURL);
        }
    };

    const editProfileApi = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);

            const response = await axios.put(`http://localhost:8000/api/users/updateUser/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Updated User:', response.data);
            const userDetails = response.data;
            
            // console.log('user Details', userDetails);
            dispatch(setUserDetails(userDetails));
            navigate(`/${user.name.toLowerCase().replace(/\s+/g, '-')}`)
            // Optionally, you can dispatch an action to update the user details in Redux store
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="editContainer">
            <div className="container">
                <div className="row">
                    <div className="sidebar col-md-3">
                        <div className="d-flex flex-column gap-3">
                            <Link to="/profile">Profile Management</Link>
                            <div onClick={handleLogout} style={{cursor:'pointer'}}>Logout</div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <div className="h3">EDIT PROFILE</div>
                            <form action="" className="form" onSubmit={(e) => { e.preventDefault(); editProfileApi(); }}>
                                <div className="profilePicture " onClick={openFileInput}>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="preview-image  img-fluid" />
                                            <div className="overlayy profile">
                                                <div className="changeProfileBtn">Change</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                user.image ?
                                                    <img className="preview-image  img-fluid" src={`http://localhost:8000/${user?.image.replace(/\\/g, '/')}`} alt="" />

                                                    :
                                                    <img className="preview-image  img-fluid" src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" alt="" />


                                            }
                                            <div className="overlayy profile">
                                                <div className="changeProfileBtn">Change</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="mb-3 w-50">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        value={name}
                                        className="form-control w-100"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="mb-3 w-50">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        value={email}
                                        className="form-control w-100"
                                        id="emailchange"
                                        aria-describedby="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-3 w-50">
                                    <label className="form-label">Change Password</label>
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}

                                        value={password}
                                        className="form-control w-100"
                                        id="passwordchange"
                                        aria-describedby="password"
                                        placeholder="Change Password"
                                    />
                                </div>


                                <button type="submit" className="createBtn" >
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
