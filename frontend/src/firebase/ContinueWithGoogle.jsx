import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { setUserDetails } from '../store/actions/authActions';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react/prop-types
const ContinueWithGoogle = ({ setShow }) => {
    const dispatch = useDispatch()
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
            // Fetch additional user details from the authentication response
            const displayName = user.displayName;
            const email = user.email;
            dispatch(setUserDetails({ name: displayName, email }));

            setShow(false);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="btn authBtn google" onClick={handleGoogleLogin}>Continue With Google</div>
        </>
    )
}

export default ContinueWithGoogle