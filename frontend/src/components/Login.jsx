import axios from "axios";
import { useState } from "react";
import { FaPinterest } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { loginSuccess } from "../store/actions/authActions";
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
// eslint-disable-next-line react/prop-types
const Login = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const apiUrl = "http://localhost:8000/api/users/auth";
      const {data} = await axios.post(apiUrl, { email, password });
        console.log(data);
        const token = data.token
        navigate("/");
        dispatch(loginSuccess(token));
        setShow(false);
        setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };
  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleSubmit}>
            <div className="modelAuth px-5 pb-5">
              <FaPinterest className="pinSVG" />
              <div className="h1 text-nowrap my-4">Welcome To Pinterest</div>
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
              {loading? <CircularProgress color="success" /> : 'LOGIN'}
              </button>
              <div className="or text-center my-2">OR</div>
              <div className="btn authBtn google">Continue With Google</div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
