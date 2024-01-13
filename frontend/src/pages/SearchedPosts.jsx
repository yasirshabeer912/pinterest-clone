import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import handleDownload from "../utils/functions";

const SearchedPosts = () => {
    const searcheddata = useSelector((state) => state.posts.searchedPosts.posts);



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
                        {searcheddata.map((post) => (
                            <div key={post._id} className="card postCard">
                                <Link to={`/pin/${post.title}`}>
                                    <div className="card-image">
                                        <img src={`http://localhost:5000/${post?.image.replace(/\\/g, '/')}`} alt="" />
                                    </div>
                                    <div className="overlay"></div>
                                    <Link to='/' className="savebtn">Save</Link>
                                    <div className="details"></div>
                                    <div className="postIcons">
                                        <Link to='/' >
                                            <TbDownload
                                                className="downloadIcon"
                                                onClick={() => handleDownload(post)}
                                            />
                                        </Link>
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

export default SearchedPosts;
