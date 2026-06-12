import { Link, Navigate } from "react-router-dom";

function AdminDashboard() {
    const user =JSON.parse(localStorage.getItem("user"));

    if (!user?.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <div>
                <Link to="/manage-orders">
                    Manage Orders
                </Link>
            </div>

            <br />

            <div>
                <Link to="/manage-inventory">
                    Manage Inventory
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboard;
