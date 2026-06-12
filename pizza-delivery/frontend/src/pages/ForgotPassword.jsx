import { useState } from "react";
import api from "../services/api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/forgot-password",{ email });
            setMessage(response.data.message);
            setEmail("");

        } catch (error) {
            setMessage(error.response?.data?.message ||"Error on this side");
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <br /><br />

                <button type="submit">
                    Send Reset Link
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default ForgotPassword;
