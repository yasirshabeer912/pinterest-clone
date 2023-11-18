import { useSelector } from "react-redux"
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const user = useSelector((state) => state.auth.userDetails)

  return (
    < >
    <div className="container profilePage">
        <div className="userdetails">
            <div className="avatar">
                <img className="w-100 h-100" src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg" alt="" />
            </div>
            <div className="name h4 fw-bold text-nowrap pt-4">
                {user.name}
            </div>
            <div className="pinterest-username text-secondary"><FaPinterest/> {user.email}</div>

            <div className="profileButtons d-flex gap-2 mt-5">
              <div className="share">Share</div>
              <div className="share">Edit Profile</div>
            </div>


            <div className="createdSaved d-flex gap-5 mt-5">
              <Link to={ `/created`} className={location.pathname.endsWith('/created') ? 'created active' : 'created'}>Created</Link>
              <Link to={ `/saved`} className={location.pathname.endsWith('/saved') ? 'created active' : 'created'}>Saved</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProfilePage