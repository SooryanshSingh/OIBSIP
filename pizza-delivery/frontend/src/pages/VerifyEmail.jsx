import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function VerifyEmail() {
    const { token } = useParams();

    const [message, setMessage] = useState(
        "Verifying email..."
    );

    useEffect(() => {
        verifyEmail();
    }, []);

    const verifyEmail = async () => {
        try {
            const response = await api.get(
                `/auth/verify/${token}`
            );

            setMessage(response.data.message);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Email verification failed"
            );
        }
    };

    return (
        <div>
            <h1>Email Verification</h1>

            <p>{message}</p>

            <Link to="/login">
                Go to Login
            </Link>
        </div>
    );
}

export default VerifyEmail;
