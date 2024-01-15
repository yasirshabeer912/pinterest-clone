import axios from "axios";
import { useState } from "react";
import { FaPinterest } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import CircularProgress from '@mui/material/CircularProgress';
import ContinueWithGoogle from "../firebase/ContinueWithGoogle";

// eslint-disable-next-line react/prop-types
const Signup = ({showW,setShowW}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const apiUrl = "https://pinterest-clone-one-mocha.vercel.app/api/users/";
      // const apiUrl = "http://localhost:5000/api/users/";
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(apiUrl, {
        name,
        email,
        password,
        confirmPassword,
      });
      setShowW(false)
      setLoading(false)
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };

  return (
    <>
      <Modal show={showW} onHide={() => setShowW(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
              <div className="modelAuth px-md-5 px-0 pb-5">
                <FaPinterest className="pinSVG" />
                <div className="h my-4">
                  <div className="h1 text-nowrap">Welcome To Pinterest</div>
                  <div className="p text-secondary text-center">
                    Find New Ideas To Try
                  </div>
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                    className="form-control w-100"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Name"
                  />
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
                    value={email}
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
                    value={password}
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
                    value={confirmPassword}
                  />
                </div>
                
                
                <button type="submit" className="btn authBtn">
                  {loading? <CircularProgress color="success" /> : 'REGISTOR'}
                </button>
                <div className="or text-center my-2">OR</div>
                <ContinueWithGoogle setShow={setShowW}/>
              </div>
          </form>
        </Modal.Body>
      </Modal>
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
    </>
  );
};

export default Signup;
