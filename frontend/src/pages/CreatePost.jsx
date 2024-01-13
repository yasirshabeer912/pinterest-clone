import { useEffect, useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.userDetails?.email);
  const token = useSelector((state) => state.auth.token);
  const [image, setImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const openFileInput = () => {
    var fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      postDetails(e.target.files[0]);

      const previewURL = URL.createObjectURL(selectedImage);
      setImagePreview(previewURL);
    }
  };

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pinterest");
      data.append("cloud_name", "dsfr7nm3a");
      fetch("https://api.cloudinary.com/v1_1/dsfr7nm3a/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImage(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {

      const formData ={
        title,description,image
      }
      console.log(formData);

      const response = await fetch("http://localhost:5000/api/createPost", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        toast.error(errorData.message);
      }

      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);

      const fileInput = document.getElementById("fileInput");
      fileInput.value = null;

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="creatContainer mt-5">
        <div className="container mt-5 py-md-5 py-0">
          <hr />
          <div className="row fw-bold h3 ">
            <div className="text-capitalize text-center text-md-start">
              Create Post
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-5">
              <div
                className="CreateFile w-md-75 w-100"
                onClick={openFileInput}
              >
                <input
                  type="file"
                  id="fileInput"
                  hidden
                  onChange={handleImageChange}
                />
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="preview-image img-fluid"
                    />
                    <div className="overlayy">
                      <div className="changeBtn">Change</div>
                    </div>
                  </>
                ) : (
                  <>
                    <RiUploadCloudFill />
                    <div className="p text-disabled">upload picture</div>
                  </>
                )}
              </div>
            </div>
            <div className="col-md-7">
              <form className="form w-100">
                <div className="my-4">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="w-md-75 w-100 form-control"
                    id="exampleInputTitle"
                    aria-describedby="emailHelp"
                    placeholder="Add a Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="my-4">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control w-md-75 w-100"
                    id="exampleFormControlTextarea1"
                    placeholder="Add a Detailed Description"
                    rows="3"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="createBtn"
                  onClick={handleCreatePost}
                >
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CreatePost;
