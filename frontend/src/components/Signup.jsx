import axios from "axios";
import { useState } from "react";
import { FaPinterest } from "react-icons/fa";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = "http://localhost:8000/api/users/";
            const { data } = await axios.post(apiUrl, {
                email,
                password,
                confirmPassword,
            });
            console.log(data);
            setSuccess(true)
        } catch (error) {
            console.error(error.response.data.message);
        }
    };
    const closeModal = () => {
        setSuccess(false);
      };

    return (
        <>
            <div
                className={`modal fade py-5 ${success ? "show" : ""}`}
                id="SignUpModel"
                tabIndex={"-1"}
                aria-labelledby="exampleModalLabel"
                aria-hidden={!success}
            >
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-5 border-0 pb-5">
                                <div className="modelAuth px-5">
                                    <FaPinterest className="" />
                                    <div className="h my-4">
                                        <div className="h1 text-nowrap">Welcome To Pinterest</div>
                                        <div className="p text-secondary text-center">
                                            Find New Ideas To Try
                                        </div>
                                    </div>
                                    <div className="mb-3 w-100">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="form-control w-100"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="mb-3 w-100">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control w-100"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div className="mb-3 w-100">
                                        <label className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            required
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="form-control w-100"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                    <button type="submit" className="btn authBtn">
                                        LOGIN
                                    </button>
                                    <div className="or text-center my-2">OR</div>
                                    <div className="btn authBtn google">Continue With Google</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
