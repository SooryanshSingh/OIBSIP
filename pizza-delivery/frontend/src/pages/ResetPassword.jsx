import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                `/auth/reset-password/${token}`,
                { password }
            );

            setMessage(response.data.message);
            setPassword("");

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Password reset failed"
            );
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <br /><br />

                <button type="submit">
                    Reset Password
                </button>
            </form>

            <p>{message}</p>

            <Link to="/login">
                Go to Login
            </Link>
        </div>
    );
}

export default ResetPassword;
