import { RiUploadCloudFill } from "react-icons/ri";
const CreatePost = () => {
    function openFileInput() {
        var fileInput = document.getElementById("fileInput");
        fileInput.click();
    }
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
                                <input type="file" id="fileInput" hidden />
                                <RiUploadCloudFill />
                                <div className="p text-disabled">upload picture</div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <form className="form w-100">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="w-md-75 w-100 form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Add a Title"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <textarea
                                        className="form-control w-md-75 w-100"
                                        id="exampleFormControlTextarea1"
                                        placeholder="Add a Detailed Description"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
