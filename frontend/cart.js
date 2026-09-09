const container = document.getElementById("cartItems");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;


if(cart.length === 0){

container.innerHTML = `
<h2>Your cart is empty 🛒</h2>
`;

}


cart.forEach(product=>{


total += Number(product.price);


container.innerHTML += `


<div class="card">


<img src="${product.image}" class="product-image">


<h2>
${product.name}
</h2>


<h3>
৳${product.price}/kg
</h3>


<p>
Farmer: ${product.farmer}
</p>


<button onclick="removeCart(${product.id})">
Remove
</button>


</div>


`;


});



document.getElementById("totalPrice").innerText = total;



function removeCart(id){


cart = cart.filter(product => product.id !== id);


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


location.reload();


}

function checkout(){

    let user = JSON.parse(localStorage.getItem("user"));


    if(!user){

        alert("Please login first!");

        return;

    }


    let order = {

        customer: user.email,

        products: cart

    };


    fetch("http://localhost:5000/orders",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body: JSON.stringify(order)

    })


    .then(response => response.json())


    .then(data=>{

    document.getElementById("successModal").style.display="flex";


})


    .catch(error=>{

        console.log(error);

    });


}
function closeModal(){

    localStorage.removeItem("cart");

    window.location.href="index.html";

}
