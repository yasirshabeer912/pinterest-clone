/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const ProfilePage = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector((state) => state.auth.userDetails);
  const token = useSelector((state) => state.auth.token);

  const [createdPosts, setCreatedPosts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [savedPostss, setSavedPosts] = useState([]);

  const handleCreated = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://pinterest-clone-one-mocha.vercel.app/api/getPostsByUser/${user._id}`, // Updated URL
        headers: {
          'Authorization': token,
        },
      };

      const response = await axios.request(config);
      const createdData = response.data.posts;
      // console.log(createdData);
      setCreatedPosts(createdData);

    } catch (error) {
      console.log(error);
    }
  };
  const handleSaved = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://pinterest-clone-one-mocha.vercel.app/api/getSavedPosts/${user._id}`, // Updated URL
        headers: {
          'Authorization': token,
        },
      };

      const response = await axios.request(config);
      const createdData = response.data.savedPosts;
      console.log('savedResponse', createdData);
      setSavedPosts(createdData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('saved',savedPostss);


  useEffect(() => {
    handleCreated();
    handleSaved()
  }, []); // Empty dependency array ensures that the effect runs only once on mount
  console.log(createdPosts);
  const isLargeScreen = useMediaQuery("(min-width: 800px)");
  const isMediumScreen = useMediaQuery("(min-width: 576px)");
  const getColumnCount = () => {

    if (isLargeScreen) {
      return 6;
    } else if (isMediumScreen) {
      return 3;
    } else {
      return 2;
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="userdetails">
          <div className="avatar">
            {
              user.image ?
                <img className="w-100 h-100" src={user?.image} alt="" />

                :
                <img className="w-100 h-100" src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" alt="" />


            }
          </div>
          <div className="name h4 fw-bold text-nowrap pt-4">
            {user.name}
          </div>
          <div className="pinterest-username text-secondary"><FaPinterest /> {user.email}</div>

          <div className="profileButtons d-flex gap-2 my-5">
            <div className="share">Share</div>
            <Link to={'/profile'} className="share text-decoration-none">Edit Profile</Link>
          </div>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Created" value="1" />
                <Tab label="Saved" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">

              <div className="container-fluid  postContainer d-flex flex-wrap">
                <Box sx={{ width: '100%', maxHeight: 600 }}>
                  <Masonry
                    columns={getColumnCount()}
                    spacing={2}>
                    {
                      createdPosts.map((post) => (

                        <div key={post._id} className="card postCard">
                          <Link to={`/pin/${post.title}`}>
                            <div className="card-image">
                              <img src={post?.image} alt="" />

                            </div>
                            <div className="overlay"></div>
                            <div className="savebtn">Save</div>
                            <div className="details "></div>
                            <div className="postIcons">
                              <TbDownload className="downloadIcon" />
                              <HiOutlineDotsHorizontal />
                            </div>
                          </Link>
                        </div>
                      ))
                    }


                  </Masonry>
                </Box>
              </div>
            </TabPanel>

            
            <TabPanel value="2">
              <div className="container-fluid  postContainer d-flex flex-wrap">
                <Box sx={{ width: '100%', maxHeight: 600 }}>
                  <Masonry
                    columns={getColumnCount()}
                    spacing={2}>
                    {
                      savedPostss.map((post) => (

                        <div key={post._id} className="card postCard">
                          <Link to={`/pin/${post.title}`}>
                            <div className="card-image">
                              <img src={post?.image} alt="" />

                            </div>
                            <div className="overlay"></div>
                            <div className="savebtn">Save</div>
                            <div className="details "></div>
                            <div className="postIcons">
                              <TbDownload className="downloadIcon" />
                              <HiOutlineDotsHorizontal />
                            </div>
                          </Link>
                        </div>
                      ))
                    }


                  </Masonry>
                </Box>
              </div>

            </TabPanel>
          </TabContext>
        </div>
      </div>
    </>
  );
}

export default ProfilePage