import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import useMediaQuery from "@mui/material/useMediaQuery";


Box;
const Posts = () => {
  const isLargeScreen = useMediaQuery("(min-width: 800px)");
  const getColumnCount = () => {
    if (isLargeScreen) {
      return 6; // 6 columns for large screens
    } else {
      return 3; // 3 columns for smaller screens
    }
  };
  return (
    <>
    <div className="container-fluid  postContainer d-flex flex-wrap">
      <Box sx={{ width: '100%', minHeight: 600 }}>
        <Masonry 
        columns={getColumnCount()}
        spacing={2}>
          <div className="card postCard">
            {/* <div className="card-image">
              <img
                src="https://i.pinimg.com/236x/a6/d4/f9/a6d4f908ddcaa02c1e15e04ac34dab71.jpg"
                alt=""
              />
            </div> */}
            <div className="overlay"></div>
            <div className="savebtn">Save</div>
            <div className="details ">Awwwwwwwwwwwwwww</div>
            <div className="postIcons">
              <TbDownload className="downloadIcon" />
              <HiOutlineDotsHorizontal />
            </div>
          </div>
          <div className="card postCard">
            <div className="card-image">
              <img
                src="https://i.pinimg.com/236x/89/6c/53/896c53c38d448316ad83cb5fdfee519f.jpg"
                alt=""
              />
            </div>
            <div className="overlay"></div>
            <div className="savebtn">Save</div>
            <div className="details "></div>
            <div className="postIcons">
              <TbDownload className="downloadIcon" />
              <HiOutlineDotsHorizontal />
            </div>
          </div>
          <div className="card postCard">
            <div className="card-image">
              <img
                src="https://i.pinimg.com/236x/24/b9/fd/24b9fd04b6952734677e7d9c6a7147ed.jpg"
                alt=""
              />
            </div>
            <div className="overlay"></div>
            <div className="savebtn">Save</div>
            <div className="details "></div>
            <div className="postIcons">
              <TbDownload className="downloadIcon" />
              <HiOutlineDotsHorizontal />
            </div>
          </div>
       
        </Masonry>
      </Box>
    </div>

</>
  );
};

export default Posts;
