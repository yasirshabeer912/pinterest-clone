import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState,useEffect } from "react";
const Posts = () => {
  const [posts, setPosts] = useState([]);

const getPosts = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/getPosts');
    const data = await response.json();
    setPosts(data.Posts); // Assuming data is an array of posts
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

useEffect(() => {
  getPosts();
}, []);

console.log('postdata',posts);

  
  const isLargeScreen = useMediaQuery("(min-width: 800px)");
  const isMediumScreen = useMediaQuery("(min-width: 576px)");
  const getColumnCount = () => {
  
    if (isLargeScreen) {
      return 6; // 6 columns for large screens
    } else if (isMediumScreen) {
      return 3; // 3 columns for medium screens
    } else {
      return 2; // 2 columns for smaller screens
    }
  };
  return (
    <>
    <div className="container-fluid  postContainer d-flex flex-wrap">
      <Box sx={{ width: '100%', maxHeight: 600 }}>
        <Masonry 
        columns={getColumnCount()}
        spacing={2}>
          {
            posts.map((post)=>(

          <div key={post._id} className="card postCard">
            <div className="card-image">
            <img src={`http://localhost:8000/${post?.image.replace(/\\/g, '/')}`} alt="" />

            </div>
            <div className="overlay"></div>
            <div className="savebtn">Save</div>
            <div className="details "></div>
            <div className="postIcons">
              <TbDownload className="downloadIcon" />
              <HiOutlineDotsHorizontal />
            </div>
          </div>
            ))
          }
          
       
        </Masonry>
      </Box>
    </div>

</>
  );
};

export default Posts;
