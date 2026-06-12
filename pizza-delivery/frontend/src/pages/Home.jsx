import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
    const [bases, setBases] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([]);

    const [base, setBase] = useState("");
    const [sauce, setSauce] = useState("");
    const [cheese, setCheese] = useState("");
    const [toppingsSel, setToppingsSel] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const [r1, r2, r3, r4] = await Promise.all([
                api.get("/bases"),
                api.get("/sauces"),
                api.get("/cheeses"),
                api.get("/toppings")
            ]);

            setBases(r1.data);
            setSauces(r2.data);
            setCheeses(r3.data);
            setToppings(r4.data);
        } catch (e) {
            console.log(e);
        }
    };

    const toggle = (id) => {
        if (toppingsSel.includes(id)) {
            setToppingsSel(toppingsSel.filter((x) => x !== id));
        } else {
            setToppingsSel([...toppingsSel, id]);
        }
    };

    const order = async () => {
        if (!base || !sauce || !cheese) {
            alert("Please select base, sauce and cheese");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/orders",
                {base, sauce, cheese,toppings: toppingsSel
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order placed successfully");

            setBase("");
            setSauce("");
            setCheese("");
            setToppingsSel([]);

            load();
        } catch (e) {
            console.log(e);

            alert(
                e.response?.data?.message ||"Order failed");
        }
    };

    const b = bases.find((x) => x._id === base);
    const s = sauces.find((x) => x._id === sauce);
    const c = cheeses.find((x) => x._id === cheese);

    let total = 0;

    if (b) total += b.price;
    if (s) total += s.price;
    if (c) total += c.price;

    toppingsSel.forEach((id) => {
        const t = toppings.find((x) => x._id === id);
        if (t) total += t.price;
    });

    return (
        <div className="page">
            <h1>Build Your Pizza</h1>

            <h2>Bases</h2>

            {bases.map((x) => (
                <div key={x._id}>
                    <inputtype="radio" name="base" value={x._id} checked={base === x._id} disabled={x.stock <= 0} onChange={() => setBase(x._id)}/>

                    {x.name} - ₹{x.price}{" "}
                    {x.stock <= 0 ? (
                        <span className="low-stock">Out of Stock</span>
                    ) : (
                        <span>Stock: {x.stock}</span>
                    )}
                </div>
            ))}

            <h2>Sauces</h2>

            {sauces.map((x) => (
                <div key={x._id}>
                    <input type="radio" name="sauce" value={x._id} checked={sauce === x._id} disabled={x.stock <= 0} onChange={() => setSauce(x._id)}/>

                    {x.name} - ₹{x.price}{" "}
                    {x.stock <= 0 ? (
                        <span className="low-stock">Out of Stock </span>
                    ) : (
                        <span>Stock: {x.stock}</span>
                    )}
                </div>
            ))}

            <h2>Cheeses</h2>

            {cheeses.map((x) => (
                <div key={x._id}>
                    <input type="radio" name="cheese" value={x._id} checked={cheese === x._id} disabled={x.stock <= 0} onChange={() => setCheese(x._id)}/>

                    {x.name} - ₹{x.price}{" "}
                    {x.stock <= 0 ? (
                        <span className="low-stock">Out of Stock </span>
                    ) : (
                        <span>Stock: {x.stock}</span>
                    )}
                </div>
            ))}

            <h2>Toppings</h2>

            {toppings.map((x) => (
                <div key={x._id}>
                    <input
                        type="checkbox"
                        value={x._id}
                        checked={toppingsSel.includes(x._id)}
                        disabled={x.stock <= 0}
                        onChange={() => toggle(x._id)}
                    />

                    {x.name} - ₹{x.price}{" "}
                    {x.stock <= 0 ? (
                        <span className="low-stock">
                            Out of Stock
                        </span>
                    ) : (
                        <span>Stock: {x.stock}</span>
                    )}
                </div>
            ))}

            <hr />

            <h2 className="total">
                Total: ₹{total}
            </h2>

            <button onClick={order}>
                Place Order
            </button>
        </div>
    );
}

export default Home;
