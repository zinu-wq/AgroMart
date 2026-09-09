 // Get All Products

fetch("http://localhost:5000/products")
.then(response => response.json())
.then(data => {

    const productContainer = document.getElementById("products");

    if(!productContainer) return;

    productContainer.innerHTML = "";

    data.forEach(product => {

        productContainer.innerHTML += `

<div class="card">


<img src="${product.image}" class="product-image">


<h3>${product.name}</h3>


<div class="rating">
${product.rating || "⭐⭐⭐⭐⭐"}
</div>


<h2>
৳${product.price} / kg
</h2>

<button class="view-btn" onclick="viewDetails(${product.id})">
View Details
</button>
</div>
`;

    });

})
.catch(error => {
    console.log("Error:", error);
});

function addProduct(){

    const category = document.getElementById("category").value;


const product = {

    name: document.getElementById("name").value,

    price: document.getElementById("price").value,

    category: category,

    location: document.getElementById("location").value,

    image: getCategoryImage(category),

    farmer: document.getElementById("farmer").value,
    ownerEmail: JSON.parse(localStorage.getItem("user")).email,

    quantity: document.getElementById("quantity").value,

    description: document.getElementById("description").value,

    rating: "⭐⭐⭐⭐⭐"

};


    fetch("http://localhost:5000/products", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    })


    .then(response => response.json())

    .then(data => {
     console.log(data);
    alert("Product Added Successfully!");

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("location").value = "";
    document.getElementById("farmer").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("description").value = "";

})


    .catch(error => {

        console.log("Error:", error);

    });

}



function deleteProduct(id){

    fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE"
    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        alert("Product Deleted!");

        window.location.href = window.location.href;

    })

    .catch(error => {

        console.log("Delete Error:", error);

    });

}
// Edit Product Function

function editProduct(id){

    const name = prompt("Enter product name");

    const price = prompt("Enter price");

    const category = prompt("Enter category");

    const location = prompt("Enter location");


    fetch(`http://localhost:5000/products/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,
            price: price,
            category: category,
            location: location

        })

    })


    .then(response => response.json())


    .then(data => {

        console.log(data);

        alert("Product Updated!");

        location.reload();

    })


    .catch(error => {

        console.log("Update Error:", error);

    });

}
function getCategoryImage(category){

    category = category.toLowerCase();


    if(category.includes("vegetable")){

        return "https://images.unsplash.com/photo-1542838132-92c53300491e";

    }


    if(category.includes("fruit")){

        return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b";

    }
    if(category.includes("rice")){

        return "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6";

    }
if(category.includes("fish")){

    return "https://images.unsplash.com/photo-1544943910-4c1dc44aab44";

}
    return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085";

}
const searchInput = document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("input", function(){

        const searchText = searchInput.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const productName = card
            .querySelector("h3")
            .innerText
            .toLowerCase();

            if(productName.includes(searchText)){
                card.style.display = "block";
            }
            else{
                card.style.display = "none";
            }

        });

    });

}
// Farmer Dashboard Products

fetch("http://localhost:5000/products")
.then(response => response.json())
.then(data => {

    const productContainer = document.getElementById("farmerProducts");

    if(!productContainer) return;

    const user = JSON.parse(localStorage.getItem("user"));

data = data.filter(product =>
    user && product.ownerEmail === user.email
); 
 productContainer.innerHTML = "";

    data.forEach(product => {

        productContainer.innerHTML += `

        <div class="card">

        <img src="${product.image}" class="product-image">

        <h3>${product.name}</h3>

        <h2>৳${product.price}</h2>

        <p>Category: ${product.category}</p>

        <p>Location: ${product.location}</p>

        <p>Quantity: ${product.quantity}</p>


        <button onclick="editProduct(${product.id})">
        ✏️ Edit
        </button>


        <button onclick="deleteProduct(${product.id})">
        🗑️ Delete
        </button>


        </div>

        `;


    });


});
function registerUser(){

    const user = {

        username: document.getElementById("username").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        role: document.getElementById("role").value

    };


    fetch("http://localhost:5000/register", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(user)

    })


    .then(response => response.json())


    .then(data => {

        alert("Registration Successful!");

        console.log(data);

        document.querySelector("form").reset();

    })


    .catch(error => {

        console.log("Register Error:", error);

    });


}
function loginUser(){

    const user = {

        email: document.getElementById("loginEmail").value,

        password: document.getElementById("loginPassword").value

    };


    fetch("http://localhost:5000/login", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(user)

    })


    .then(response => response.json())


    .then(data => {


        if(data.user){


            alert("Login Successful!");


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            if(data.user.role === "farmer"){

                window.location.href = "farmer-dashboard.html";

            }


            else if(data.user.role === "customer"){

                window.location.href = "index.html";

            }
           else if(data.user.role === "admin"){

    window.location.href = "admin-dashboard.html";

      }

        }

        else{

            alert(data.message);

        }


    })


    .catch(error => {

        console.log("Login Error:", error);

    });

}
function logoutUser(){

    localStorage.removeItem("user");

    alert("Logged out successfully!");

    window.location.href = "login.html";

}
// Admin Dashboard Products

fetch("http://localhost:5000/products")
.then(response => response.json())
.then(data => {


    const adminContainer = document.getElementById("adminProducts");


    if(!adminContainer) return;


    adminContainer.innerHTML = "";


    data.forEach(product => {


        adminContainer.innerHTML += `

        <div class="card">

        <img src="${product.image}" class="product-image">


        <h3>${product.name}</h3>


        <h2>
        ৳${product.price}
        </h2>


        <p>
        Category: ${product.category}
        </p>


        <p>
        Farmer: ${product.farmer}
        </p>


        <p>
        Location: ${product.location}
        </p>


        <button onclick="deleteProduct(${product.id})">

        🗑️ Delete

        </button>


        </div>

        `;


    });


});
function checkLogin(role){

    const user = JSON.parse(localStorage.getItem("user"));


    if(!user){

        window.location.href = "login.html";

    }


    if(role && user.role !== role){

        alert("Access Denied!");

        window.location.href = "index.html";

    }

}
function viewDetails(id){

    window.location.href = "product-details.html?id=" + id;

}
