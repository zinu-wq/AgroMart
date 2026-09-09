const express = require("express");
const fs = require("fs");
const cors = require("cors");
let users = require("./users.json");
const app = express();

app.use(cors());
app.use(express.json());

let products = require("./products.json");

app.get("/", (req, res) => {
    res.send("AgroMart Backend Running 🚜");
});


// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});
let orders = require("./orders.json");


// Create Order

app.post("/orders",(req,res)=>{

    const newOrder = {

        id: orders.length + 1,

        customer: req.body.customer,

        products: req.body.products,

        status: "Pending"

    };


    orders.push(newOrder);


    fs.writeFileSync(
        "./orders.json",
        JSON.stringify(orders,null,2)
    );


    res.json({

        message:"Order placed successfully",

        order:newOrder

    });

});

app.get("/products/:id", (req,res)=>{

    const id = Number(req.params.id);

    const product = products.find(
        p => p.id === id
    );


    if(product){

        res.json(product);

    }

    else{

        res.status(404).json({
            message:"Product not found"
        });

    }

});

// Add product
app.post("/products", (req, res) => {

    const newProduct = { 

    id: products.length + 1,

    name: req.body.name,

    price: req.body.price,

    category: req.body.category,

    location: req.body.location,

    image: req.body.image,

    farmer: req.body.farmer,

    quantity: req.body.quantity,

    description: req.body.description,

    rating: req.body.rating

};

    products.push(newProduct);

fs.writeFileSync(
    "./products.json",
    JSON.stringify(products, null, 2)
);

res.json({
    message: "Product added successfully",
    product: newProduct
    });
});
// Delete product
app.delete("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    products = products.filter(product => product.id !== id);

    fs.writeFileSync(
        "./products.json",
        JSON.stringify(products, null, 2)
    );

    res.json({
        message: "Product deleted successfully"
    });

});
// Update Product

app.put("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);


    if (!product) {

        return res.status(404).json({
            message: "Product not found"
        });

    }


    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;
    product.location = req.body.location;


    fs.writeFileSync(
        "./products.json",
        JSON.stringify(products, null, 2)
    );


    res.json({
        message: "Product updated successfully",
        product: product
    });

});
// Register User

app.post("/register", (req,res)=>{

    const newUser = {

        id: users.length + 1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role

    };


    users.push(newUser);


    fs.writeFileSync(
        "./users.json",
        JSON.stringify(users,null,2)
    );


    res.json({
        message:"Registration successful",
        user:newUser
    });

});

// Login User

app.post("/login", (req,res)=>{


    const email = req.body.email;

    const password = req.body.password;


    const user = users.find(user => 
        user.email === email && user.password === password
    );


    if(!user){

        return res.status(401).json({

            message:"Invalid email or password"

        });

    }


    res.json({

        message:"Login successful",

        user:user

    });


});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

