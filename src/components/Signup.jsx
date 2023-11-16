import React from 'react'
import { FaPinterest } from "react-icons/fa";
const Signup = () => {
  return (
    <div>
    <div
        className="modal fade py-5"
        id="SignUpModel"
        tabIndex={"-1"}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body px-5 border-0 pb-5">
                    <div className="modelAuth px-5">
                        <FaPinterest className=""/>
                        <div className="h my-4">
                        <div className="h1 text-nowrap">Welcome To Pinterest</div>
                        <div className="p text-secondary text-center">Find New Ideas To Try</div>
                        </div>
                        <div className="mb-3 w-100" >
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="mb-3 w-100" >
                            <label className="form-label">Password</label>
                            <input type="email" className="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password"/>
                        </div>
                        <div className="mb-3 w-100" >
                            <label className="form-label">Confirm Password</label>
                            <input type="email" className="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Confirm Password"/>
                        </div>
                        <div className="btn authBtn">LOGIN</div>
                        <div className="or text-center my-2">OR</div>
                        <div className="btn authBtn google">Continue With Google</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Signup