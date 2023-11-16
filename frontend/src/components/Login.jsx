import axios from "axios";
import { useState } from "react";
import { FaPinterest } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:8000/api/users/auth";
      const response = await axios.post(apiUrl, { email, password });
      if (response && response.data) {
        navigate("/posts");
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        className="modal fade py-5"
        id="exampleModal"
        tabIndex={"-1"}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="modal-body px-5 border-0 pb-5">
                <div className="modelAuth px-5">
                  <FaPinterest className="" />
                  <div className="h1 text-nowrap my-4">
                    Welcome To Pinterest
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
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
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control w-100"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Password"
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
    </div>
  );
};

export default Login;
