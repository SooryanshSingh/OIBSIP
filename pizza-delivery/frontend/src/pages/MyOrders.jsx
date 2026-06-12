import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/orders/my-orders",
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

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script =
                document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const payNow = async (order) => {
        try {
            const scriptLoaded =
                await loadRazorpayScript();

            if (!scriptLoaded) {
                alert("Razorpay SDK failed to load");
                return;
            }

            const razorpayOrderRes =
                await api.post(
                    "/payments/create-order",
                    {
                        amount: order.totalPrice
                    }
                );

            const razorpayOrder =
                razorpayOrderRes.data;

            const options = {
                key: "rzp_test_T0p2THDW643vUW",
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Pizza Delivery App",
                description: "Pizza Order Payment",
                order_id: razorpayOrder.id,

                handler: async function (response) {
                    try {
                        await api.post(
                            "/payments/verify",
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,

                                orderId: order._id
                            }
                        );

                        alert("Payment successful");

                        fetchOrders();

                    } catch (error) {
                        alert(
                            error.response?.data?.message ||
                            "Payment verification failed"
                        );
                    }
                },

                prefill: {
                    name: "Pizza Customer",
                    email: "customer@example.com",
                    contact: "9999999999"
                },

                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();

        } catch (error) {
            console.log(error);

            alert("Payment failed");
        }
    };

    return (
        <div>
            <h1>My Orders</h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <p>
                        Price: ₹{order.totalPrice}
                    </p>

                    <p>
                        Payment: {order.paymentStatus}
                    </p>

                    <p>
                        Status: {order.orderStatus}
                    </p>

                    {order.paymentStatus === "pending" && (
                        <button
                            onClick={() =>
                                payNow(order)
                            }
                        >
                            Pay Now
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MyOrders;
