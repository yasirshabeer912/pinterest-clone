import React from "react";
import { TbDownload } from "react-icons/tb";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
const SinglePost = () => {
  return (
    <>
      <div className="SingleContainer border container-fluid">
        <div className="container ">
          <div className="row">
            <div className="col-md-6 postImage">
              <img
                className="w-100 h-100 img-fluid"
                src="https://images.unsplash.com/photo-1682686580036-b5e25932ce9a?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="postDetails ">
                <div className="post__nav  d-flex  align-items-center justify-content-between py-4">
                  <div className="Icons d-flex">
                    <TbDownload className="downloadIcon" />
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
                      <div className="name">Yasir</div>
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
