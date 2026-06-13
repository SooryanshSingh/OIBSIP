import { useEffect, useState } from "react";
import api from "../services/api";
import { Navigate } from "react-router-dom";
function ManageInventory() {
    const [bases, setBases] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [baseForm, setBaseForm] = useState({
	    name: "",
	    price: "",
	    stock: ""
	});

	const [sauceForm, setSauceForm] = useState({
	    name: "",
	    price: "",
	    stock: ""
	});

	const [cheeseForm, setCheeseForm] = useState({
	    name: "",
	    price: "",
	    stock: ""
	});

	const [toppingForm, setToppingForm] = useState({
	    name: "",
	    category: "",
	    price: "",
	    stock: ""
	});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [
                baseRes,
                sauceRes,
                cheeseRes,
                toppingRes
            ] = await Promise.all([
                api.get("/bases"),
                api.get("/sauces"),
                api.get("/cheeses"),
                api.get("/toppings")
            ]);

            setBases(baseRes.data);
            setSauces(sauceRes.data);
            setCheeses(cheeseRes.data);
            setToppings(toppingRes.data);

        } catch (error) {
            console.log(error);
        }
    };

    const editBase = async (base) => {
        try {

            const token =
                localStorage.getItem("token");

            const name = prompt(
                "Enter name",
                base.name
            );

            const price = prompt(
                "Enter price",
                base.price
            );

            const stock = prompt(
                "Enter stock",
                base.stock
            );

            if (!name || !price || !stock) {
                return;
            }

            await api.patch(
                `/bases/${base._id}`,
                {
                    name,
                    price,
                    stock
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    const deleteBase = async (id) => {
        try {

            const token =
                localStorage.getItem("token");

            const confirmed =
                window.confirm(
                    "Delete this base?"
                );

            if (!confirmed) {
                return;
            }

            await api.delete(
                `/bases/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

const editSauce = async (sauce) => {
    try {
        const token = localStorage.getItem("token");

        const name = prompt("Enter name", sauce.name);
        const price = prompt("Enter price", sauce.price);
        const stock = prompt("Enter stock", sauce.stock);

        if (!name || !price || !stock) return;

        await api.patch(
            `/sauces/${sauce._id}`,
            { name, price, stock },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const deleteSauce = async (id) => {
    try {
        const token = localStorage.getItem("token");

        if (!window.confirm("Delete this sauce?")) {
            return;
        }

        await api.delete(
            `/sauces/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const editCheese = async (cheese) => {
    try {
        const token = localStorage.getItem("token");

        const name = prompt("Enter name", cheese.name);
        const price = prompt("Enter price", cheese.price);
        const stock = prompt("Enter stock", cheese.stock);

        if (!name || !price || !stock) return;

        await api.patch(
            `/cheeses/${cheese._id}`,
            { name, price, stock },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const deleteCheese = async (id) => {
    try {
        const token = localStorage.getItem("token");

        if (!window.confirm("Delete this cheese?")) {
            return;
        }

        await api.delete(
            `/cheeses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const editTopping = async (topping) => {
    try {
        const token = localStorage.getItem("token");

        const name = prompt("Enter name", topping.name);
        const category = prompt(
            "Enter category",
            topping.category
        );
        const price = prompt("Enter price", topping.price);
        const stock = prompt("Enter stock", topping.stock);

        if (
            !name ||
            !category ||
            !price ||
            !stock
        ) {
            return;
        }

        await api.patch(
            `/toppings/${topping._id}`,
            {
                name,
                category,
                price,
                stock
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const deleteTopping = async (id) => {
    try {
        const token = localStorage.getItem("token");

        if (!window.confirm("Delete this topping?")) {
            return;
        }

        await api.delete(
            `/toppings/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchData();

    } catch (error) {
        console.log(error);
    }
};
const createBase = async () => {
    try {
        const token = localStorage.getItem("token");

        await api.post(
            "/bases",
            baseForm,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setBaseForm({
            name: "",
            price: "",
            stock: ""
        });

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const createSauce = async () => {
    try {
        const token = localStorage.getItem("token");

        await api.post(
            "/sauces",
            sauceForm,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setSauceForm({
            name: "",
            price: "",
            stock: ""
        });

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const createCheese = async () => {
    try {
        const token = localStorage.getItem("token");

        await api.post(
            "/cheeses",
            cheeseForm,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setCheeseForm({
            name: "",
            price: "",
            stock: ""
        });

        fetchData();

    } catch (error) {
        console.log(error);
    }
};

const createTopping = async () => {
    try {
        const token = localStorage.getItem("token");

        await api.post(
            "/toppings",
            toppingForm,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setToppingForm({
            name: "",
            category: "",
            price: "",
            stock: ""
        });

        fetchData();

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
            <h1>Manage Inventory</h1>
	<h2>Add Base</h2>

	<input placeholder="Name" value={baseForm.name} onChange={(e) =>
		setBaseForm({
		    ...baseForm,
		    name: e.target.value
		})
	    }
	/>

	<input
	    placeholder="Price"
	    value={baseForm.price}
	    onChange={(e) =>
		setBaseForm({
		    ...baseForm,
		    price: e.target.value
		})
	    }
	/>

	<input
	    placeholder="Stock"
	    value={baseForm.stock}
	    onChange={(e) =>
		setBaseForm({
		    ...baseForm,
		    stock: e.target.value
		})
	    }
	/>

	<button onClick={createBase}>
	    Add Base
	</button>

	<hr />
            <h2>Bases</h2>

            {bases.map((base) => (
                <div
                    key={base._id}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <p>Name: {base.name}</p>
                    <p>Price: ₹{base.price}</p>
                    <p>Stock: {base.stock}</p>

                    <button
                        onClick={() =>
                            editBase(base)
                        }
                    >
                        Edit
                    </button>

                    <button
                        onClick={() =>
                            deleteBase(base._id)
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
            <h2>Add Sauce</h2>

		<input
		    placeholder="Name"
		    value={sauceForm.name}
		    onChange={(e) =>
			setSauceForm({
			    ...sauceForm,
			    name: e.target.value
			})
		    }
		/>

		<input
		    placeholder="Price"
		    value={sauceForm.price}
		    onChange={(e) =>
			setSauceForm({
			    ...sauceForm,
			    price: e.target.value
			})
		    }
		/>

		<input
		    placeholder="Stock"
		    value={sauceForm.stock}
		    onChange={(e) =>
			setSauceForm({
			    ...sauceForm,
			    stock: e.target.value
			})
		    }
		/>

		<button onClick={createSauce}>
		    Add Sauce
		</button>

		<hr />

            <h2>Sauces</h2>

            {sauces.map((sauce) => (
                <div
                    key={sauce._id}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <p>Name: {sauce.name}</p>
                    <p>Price: ₹{sauce.price}</p>
                    <p>Stock: {sauce.stock}</p>
           
                <button onClick={() => editSauce(sauce)}>
		    Edit
		</button>

		<button onClick={() => deleteSauce(sauce._id)}>
		    Delete
		</button>
		     </div>
            ))}
            <h2>Add Cheese</h2>

		<input
		    placeholder="Name"
		    value={cheeseForm.name}
		    onChange={(e) =>
			setCheeseForm({
			    ...cheeseForm,
			    name: e.target.value
			})
		    }
		/>

		<input
		    placeholder="Price"
		    value={cheeseForm.price}
		    onChange={(e) =>
			setCheeseForm({
			    ...cheeseForm,
			    price: e.target.value
			})
		    }
		/>

		<input
		    placeholder="Stock"
		    value={cheeseForm.stock}
		    onChange={(e) =>
			setCheeseForm({
			    ...cheeseForm,
			    stock: e.target.value
			})
		    }
		/>

		<button onClick={createCheese}>
		    Add Cheese
		</button>

		<hr />

            <h2>Cheeses</h2>

            {cheeses.map((cheese) => (
                <div
                    key={cheese._id}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <p>Name: {cheese.name}</p>
                    <p>Price: ₹{cheese.price}</p>
                    <p>Stock: {cheese.stock}</p>
            
                <button onClick={() => editCheese(cheese)}>
		    Edit
		</button>

		<button onClick={() => deleteCheese(cheese._id)}>
		    Delete
		</button>
		    </div>
            ))}


		<h2>Add Topping</h2>

		<input
		    placeholder="Name"
		    value={toppingForm.name}
		    onChange={(e) =>
			setToppingForm({
			    ...toppingForm,
			    name: e.target.value
			})
		    }
		/>

		<input
		    placeholder="Category"
		    value={toppingForm.category}
		    onChange={(e) =>
			setToppingForm({
			    ...toppingForm,
			    category: e.target.value
			})
		    }
		/>

		<input
		    placeholder="Price"
		    value={toppingForm.price}
		    onChange={(e) =>
			setToppingForm({
			    ...toppingForm,
			    price: e.target.value
			})
		    }
		/>

		<input
		    placeholder="Stock"
		    value={toppingForm.stock}
		    onChange={(e) =>
			setToppingForm({
			    ...toppingForm,
			    stock: e.target.value
			})
		    }
		/>

		<button onClick={createTopping}>
		    Add Topping
		</button>

		<hr />
            <h2>Toppings</h2>

            {toppings.map((topping) => (
                <div
                    key={topping._id}
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <p>Name: {topping.name}</p>
                    <p>Category: {topping.category}</p>
                    <p>Price: ₹{topping.price}</p>
                    <p>Stock: {topping.stock}</p>
                
                <button onClick={() => editTopping(topping)}>
		    Edit
		</button>

		<button onClick={() => deleteTopping(topping._id)}>
		    Delete
		</button>
		</div>
            ))}
        </div>
    );
}

export default ManageInventory;
