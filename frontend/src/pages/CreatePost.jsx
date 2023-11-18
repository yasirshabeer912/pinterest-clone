import { useEffect, useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate()
  const email = useSelector((state) => state.auth.userDetails?.email);

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
      setImage(selectedImage);

      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(selectedImage);
      setImagePreview(previewURL);
    }
  };


  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      console.log(formData);

      const response = await fetch("http://localhost:8000/api/createPost", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); 
        toast.success(data.message)
      } else {
        const errorData = await response.json();
        console.error(errorData.message); // Log error message
        toast.error(errorData.message)

      }

      // Reset form fields and state
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);

      // Clear the file input
      const fileInput = document.getElementById("fileInput");
      fileInput.value = null;
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="creatContainer mt-5">
        <hr />
        <div className="container mt-5">
          <div className="row">Create Post</div>
          <hr />
          <div className="row">
            <div className="col-md-5">
            <div className="CreateFile w-md-75 w-100" onClick={openFileInput}>
                <input
                  type="file"
                  id="fileInput"
                  hidden
                  onChange={handleImageChange}
                />
                {imagePreview ? (
                  <>
                  <img src={imagePreview} alt="Preview" className="preview-image  img-fluid" />
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
                <div className="mb-3">
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
                <div className="mb-3">
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
                <button type="submit" className="createBtn" onClick={handleCreatePost}>
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
