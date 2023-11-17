import { useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
        console.log(data.message); // Log success message
        // You may want to reset the form or redirect the user after successful post creation
      } else {
        const errorData = await response.json();
        console.error(errorData.message); // Log error message
      }
    } catch (error) {
      console.error("Error creating post:", error);
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
                  ></textarea>
                </div>
                <button type="submit" onClick={handleCreatePost}>
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
