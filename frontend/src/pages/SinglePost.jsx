import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import handleDownload from "../utils/functions";
const SinglePost = () => {
  const allPostData = useSelector((state)=>state.posts.posts)
  console.log('all data',allPostData);
  const  title  = useParams();
  console.log(title.id);
  const post = allPostData.find((e) => e.title === title.id);

  // console.log(post);
  return (
    <>
      <div className="SingleContainer border container-fluid">
        <div className="container ">
          <div className="row">
            <div className="col-md-6 postImage">
              <img
                className="w-100 h-100 img-fluid"
                src={`https://pinterest-clone-by-yasir.vercel.app/${post?.image.replace(/\\/g, '/')}`}
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="postDetails ">
                <div className="post__nav  d-flex  align-items-center justify-content-between py-4">
                  <div className="Icons d-flex">
                  <Link to='/' >
                      <TbDownload
                        className="downloadIcon"
                        onClick={() => handleDownload(post)}
                      />
                    </Link>
                    <HiOutlineDotsHorizontal />
                  </div>
                  <div className="buttons  d-flex align-items-center gap-4">
                    <div className="mySaves text-nowrap">My Saves</div>
                    <div className="NavSavebtn">Save</div>
                  </div>
                </div>

                <div className="post__owner d-flex justify-content-between align-items-center mt-5">
                  <div className="ownerDetails d-flex align-items-center">
                    <div className="ownerImage">
                      <CgProfile />
                    </div>
                    <div className="ownerName">
                      <div className="name">{post.title}</div>
                      <div className="followers">500 followers</div>
                    </div>
                  </div>
                  <div className="btn btn-secondary rounded">follow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
