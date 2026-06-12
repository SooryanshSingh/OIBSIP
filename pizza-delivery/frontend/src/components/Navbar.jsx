import { Link, useNavigate }
from "react-router-dom";

function Navbar() {
    const navigate =
        useNavigate();

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const isAdmin =
        user?.isAdmin;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav
            style={{
                display: "flex",
                gap: "15px",
                padding: "15px",
                borderBottom:
                    "1px solid black"
            }}
        >
            <Link to="/">
                Home
            </Link>

            {token && (
                <Link to="/my-orders">
                    My Orders
                </Link>
            )}

            {isAdmin && (
                <Link to="/admin">
                    Admin
                </Link>
            )}

            {!token && (
                <>
                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>
                </>
            )}

            {token && (
                <button onClick={logout}>
                    Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;
