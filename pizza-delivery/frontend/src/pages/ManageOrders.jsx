import { useEffect, useState } from "react";
import api from "../services/api";

import { Navigate } from "react-router-dom";
function ManageOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get("/orders",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setOrders(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (orderId,status) => {
        try {

            const token =
                localStorage.getItem("token");

            await api.patch(`/orders/${orderId}/status`, { status },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchOrders();

        } catch (error) {
            console.log(error);
        }
    };

    const markPaid = async ( orderId ) => {
        try {

            const token = localStorage.getItem("token");

            await api.patch(`/orders/${orderId}/pay`,{},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchOrders();

        } catch (error) {
            console.log(error);
        }
    };
    const user =
    JSON.parse(localStorage.getItem("user"));

if (!user?.isAdmin) {
    return <Navigate to="/" />;
}

    return (
        <div>
            <h1>Manage Orders</h1>

            {orders.map((order) => (
                <div  key={order._id} style={{ border: "1px solid black",padding: "10px", marginBottom: "10px"}}
                >
                    <p>
                        Customer:
                        {" "}
                        {order.user.name}
                    </p>

                    <p>
                        Email:
                        {" "}
                        {order.user.email}
                    </p>

                    <p>
                        Total:
                        ₹{order.totalPrice}
                    </p>

                    <p>
                        Status:
                        {" "}
                        {order.orderStatus}
                    </p>

                    <p>
                        Payment:
                        {" "}
                        {order.paymentStatus}
                    </p>

                    <button
                        onClick={() =>
                            updateStatus( order._id, "in_kitchen") }
                    >
                        Kitchen
                    </button>

                    <button
                        onClick={() =>updateStatus( order._id, "out_for_delivery"
                            )
                        }
                    >
                        Out For Delivery
                    </button>

                    <button
                        onClick={() => updateStatus( order._id, "delivered"
                            )
                        }
                    >
                        Delivered
                    </button>

                    <button
                        onClick={() => markPaid(order._id) }
                    >
                        Mark Paid
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ManageOrders;
