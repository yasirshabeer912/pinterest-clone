
import { setUserDetails } from '../store/actions/authActions';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react/prop-types
const ContinueWithGoogle = ({ setShow }) => {
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        try {
            window.open('http://localhost:5000/auth/google/callback', '_self')

        } catch (error) {
            console.error('Error aa gya bhai', error);
        }
    };

    return (
        <>
            <div className="btn authBtn google" onClick={handleGoogleLogin}>Continue With Google</div>
        </>
    );
}

export default ContinueWithGoogle;
