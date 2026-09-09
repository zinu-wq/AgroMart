const params = new URLSearchParams(window.location.search);


const id = params.get("id");


console.log("Product ID:", id);



fetch("http://localhost:5000/products/" + id)


.then(response => {


    if(!response.ok){

        throw new Error("Product not found");

    }


    return response.json();


})


.then(product => {


    console.log(product);


    const container = document.getElementById("productDetails");



    container.innerHTML = `


    <div class="details-card">


    <img src="${product.image}" class="details-image">


    <h1>
    ${product.name}
    </h1>


    <h2>
    ৳${product.price} / kg
    </h2>


    <p>
    ⭐ Rating: ${product.rating}
    </p>


    <p>
    🌾 Category: ${product.category}
    </p>


    <p>
    📍 Location: ${product.location}
    </p>


    <p>
    👨‍🌾 Farmer: ${product.farmer}
    </p>


    <p>
    📦 Available Quantity: ${product.quantity || "Available"}
    </p>


    <p>
    📝 Description:
    <br>
    ${product.description || "Fresh quality product"}
    </p>


    <button class="primary-btn" onclick="addToCart(${product.id})">
Add To Cart
</button>


    </div>


    `;



})


.catch(error => {


    console.log(error);


    document.getElementById("productDetails").innerHTML =
    "<h2>Product not found</h2>";


});
function addToCart(id){

    fetch("http://localhost:5000/products/" + id)

    .then(response => response.json())

    .then(product => {


        let cart = JSON.parse(localStorage.getItem("cart")) || [];


        cart.push(product);


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        alert("Added to Cart 🛒");


    })


    .catch(error=>{

        console.log(error);

    });

}