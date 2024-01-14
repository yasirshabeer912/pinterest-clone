import React, { useState } from 'react'
import { searchResults } from "../store/actions/postActions";
import { useDispatch } from 'react-redux';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MobileSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://pinterest-clone-one-mocha.vercel.app/api/search?q=${searchTerm}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            // console.log(response);
            const data = response.data;
            console.log(data);
            dispatch(searchResults(data.data, searchTerm));
            navigate('/search')
        } catch (error) {
            console.error('Error during search:', error);
        }
    };
  return (
    <div>
      <div className="container-fluid fixed-top  ">
                <div className=" d-flex gap-2 justify-content-between align-items-center py-4 px-3 ">
                    
                    <form className="w-75" onSubmit={handleSearch}>

                        <div className="formHeader w-100 d-flex align-items-center">
                            <input type="text" className="w-100 headerInput" placeholder="Search Here....." onChange={(e) => setSearchTerm(e.target.value)} />

                        </div>
                    </form>
                    <Link to={'/'} className="rightmain d-flex gap-md-3 gap-1 align-items-center">
                        <IoArrowBackSharp/>
                    </Link>
                </div>
            </div>
    </div>
  )
}

export default MobileSearch
