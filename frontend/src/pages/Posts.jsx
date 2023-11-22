import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { allPosts } from "../store/actions/postActions";
import { useDispatch, useSelector } from "react-redux";

const Posts = () => {
  const allPostData = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/getPosts');
      const data = await response.json();
      const postss = data.Posts;
      dispatch(allPosts(postss));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledPosts = shuffleArray(allPostData);

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
      <div className="container-fluid  postContainer d-flex flex-wrap">
        <Box sx={{ width: '100%', maxHeight: 600 }}>
          <Masonry columns={getColumnCount()} spacing={2}>
            {shuffledPosts.map((post) => (
              <div key={post._id} className="card postCard">
                <Link to={`/pin/${post.title}`}>
                  <div className="card-image">
                    <img src={`http://localhost:8000/${post?.image.replace(/\\/g, '/')}`} alt="" />
                  </div>
                  <div className="overlay"></div>
                  <div className="savebtn">Save</div>
                  <div className="details"></div>
                  <div className="postIcons">
                    <TbDownload className="downloadIcon" />
                    <HiOutlineDotsHorizontal />
                  </div>
                </Link>
              </div>
            ))}
          </Masonry>
        </Box>
      </div>
    </>
  );
};

export default Posts;
