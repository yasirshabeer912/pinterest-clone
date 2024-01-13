import { IoIosNotifications } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Dropdown } from "react-bootstrap";
import { logout } from "../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { searchResults } from "../store/actions/postActions";
import { FaHome, FaSearch } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';

const MainHeader = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [slug, setSlug] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const user = useSelector((state) => state.auth.userDetails);
    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const UserName = user.name
            const formattedSlug = UserName.toLowerCase().replace(/\s+/g, '-');
            setSlug(formattedSlug)
        }, 3000);

        return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount or when user changes
    }, [user]);
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/')
    }



    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/search?q=${searchTerm}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            // console.log(response);
            const data = response.data;
            console.log(data);
            dispatch(searchResults(data.data, searchTerm));
            navigate('/search')
        } catch (error) {
            console.error('Error during search:', error);
        }
    };
    return (
        <>
            <div className="container-fluid fixed-top header__ d-none d-md-block">
                <div className=" d-flex gap-2 justify-content-between align-items-center py-4 px-3 ">
                    <div className="left d-flex gap-3  align-items-center">
                        <div className="logo d-flex align-items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="32"
                                height="32"
                                viewBox="0 0 48 48"
                            >
                                <circle cx="24" cy="24" r="20" fill="#E60023"></circle>
                                <path
                                    fill="#FFF"
                                    d="M24.4439087,11.4161377c-8.6323242,0-13.2153931,5.7946167-13.2153931,12.1030884	c0,2.9338379,1.5615234,6.5853882,4.0599976,7.7484131c0.378418,0.1762085,0.581543,0.1000366,0.668457-0.2669067	c0.0668945-0.2784424,0.4038086-1.6369019,0.5553589-2.2684326c0.0484619-0.2015381,0.0246582-0.3746338-0.1384277-0.5731201	c-0.8269653-1.0030518-1.4884644-2.8461304-1.4884644-4.5645752c0-4.4115601,3.3399658-8.6799927,9.0299683-8.6799927	c4.9130859,0,8.3530884,3.3484497,8.3530884,8.1369019c0,5.4099731-2.7322998,9.1584473-6.2869263,9.1584473	c-1.9630737,0-3.4330444-1.6238403-2.9615479-3.6153564c0.5654297-2.3769531,1.6569214-4.9415283,1.6569214-6.6584473	c0-1.5354004-0.8230591-2.8169556-2.5299683-2.8169556c-2.006958,0-3.6184692,2.0753784-3.6184692,4.8569336	c0,1.7700195,0.5984497,2.9684448,0.5984497,2.9684448s-1.9822998,8.3815308-2.3453979,9.9415283	c-0.4019775,1.72229-0.2453003,4.1416016-0.0713501,5.7233887l0,0c0.4511108,0.1768799,0.9024048,0.3537598,1.3687744,0.4981079l0,0	c0.8168945-1.3278198,2.0349731-3.5056763,2.4864502-5.2422485c0.2438354-0.9361572,1.2468872-4.7546387,1.2468872-4.7546387	c0.6515503,1.2438965,2.5561523,2.296936,4.5831299,2.296936c6.0314941,0,10.378418-5.546936,10.378418-12.4400024	C36.7738647,16.3591919,31.3823242,11.4161377,24.4439087,11.4161377z"
                                ></path>
                            </svg>

                        </div>
                        <Link to={'/'} className="nav__link fw-bold">Home</Link>
                        <Link to={'/create'} className="nav__link fw-bold">Create</Link>
                    </div>
                    <form className="w-75" onSubmit={handleSearch}>

                        <div className="formHeader w-100 d-flex align-items-center">
                            <input type="text" className="w-100 headerInput" placeholder="Search Here....." onChange={(e) => setSearchTerm(e.target.value)} />

                        </div>
                    </form>
                    <div className="rightmain d-flex gap-md-3 gap-1 align-items-center">
                        <IoIosNotifications />
                        <Link to={'/chat'}><IoChatbubbleEllipsesSharp /></Link>
                        <Dropdown>
                            <Tooltip title="Profile Info">
                                <Dropdown.Toggle className="awwwwww">
                                    <div className="w-100 h-100 rounded-circle">
                                        {user?.image ?
                                            <img className="w-100 rounded-circle h-100" src={`http://localhost:5000/${user.image.replace(/\\/g, '/')}`} alt="" />

                                            :

                                            <img className="w-100 rounded-circle h-100" src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" alt="" />
                                        }
                                    </div>
                                </Dropdown.Toggle>
                            </Tooltip>

                            <Dropdown.Menu>
                                <Link to={`/${slug}`} className="dropdown-item">Profile</Link>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>
            </div>


            <div className="container-fluid fixed-top header__ d-flex align-items-center d-block d-md-none px-4 py-3">
                <div className="d-flex justify-content-between flex-row align-items-center w-100 ">
                    <Link to={'/'} >
                        <FaHome className={location.pathname === '/' ? 'Iconactive' : ''} />
                    </Link>
                    <Link
                        to={'/mobileSearch'}

                    >
                        <FaSearch className={location.pathname === '/mobileSearch' ? 'Iconactive' : ''} />
                    </Link>

                    <Link to={'/chat'}><IoChatbubbleEllipsesSharp className={location.pathname === '/chat' ? 'Iconactive' : ''} /></Link>
                    <Dropdown>
                        <Tooltip title="Profile Info">
                            <Dropdown.Toggle className="awwwwww">
                                <div className="w-100 h-100 rounded-circle">
                                    {user?.image ?
                                        <img className="w-100 rounded-circle h-100" src={`http://localhost:5000/${user.image.replace(/\\/g, '/')}`} alt="" />

                                        :

                                        <img className="w-100 rounded-circle h-100" src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" alt="" />
                                    }
                                </div>
                            </Dropdown.Toggle>
                        </Tooltip>

                        <Dropdown.Menu>
                            <Link to={`/${slug}`} className="dropdown-item">Profile</Link>
                            <Link to={`/create`} className="dropdown-item">Create Post</Link>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
            </div>




        </>
    )
}

export default MainHeader



