document.addEventListener('DOMContentLoaded', () => {
    console.log("1");
    const cartHolder = document.getElementById('container-cart')
    var orders = JSON.parse(localStorage.getItem('Orders'))
    console.log(orders);
    const userEmail = localStorage.getItem('currentUser')
    var cartItems = orders.find(order => order.user == userEmail)
    console.log('cartitems: ',cartItems);
    var totalCost=0;
    for (const product of cartItems.products) {
        totalCost += parseInt(product.price)
        const productDiv = document.createElement('div')
        productDiv.classList.add('cart-holder__cart-item');
        productDiv.innerHTML = `
        <img src="https://m.media-amazon.com/images/I/71a3OycnGYL._SY741_.jpg"
            alt="Product Image" />
        <div class="cart-holder__product-details">
            <h2>${product.name}</h2>
            <span>Cart Value: ${product.price}</span>
            <br />
            <button tabindex="4">Remove</button>
        </div>
        `;
        cartHolder.appendChild(productDiv)
    }
    document.getElementById('total-price').innerHTML = totalCost
});


const Buy = () =>{
    const currentUser = localStorage.getItem('currentUser');
    var orders = JSON.parse(localStorage.getItem('Orders'))
    const currentOrder = orders.find(order => order.user == currentUser)
    console.log(currentOrder);
    const index = orders.indexOf(currentOrder)
    if(index > -1){
        orders.splice(index ,1)
        localStorage.setItem('Orders',JSON.stringify(orders))
    }
    let totalCost = 0;
    for(const product of currentOrder.products){
        totalCost += parseInt(product.price)
    }
    var orderHistory = JSON.parse(localStorage.getItem('OrderHistory')) || []
    orderHistory.push({...currentOrder , orderPrice: totalCost})
    localStorage.setItem('OrderHistory',JSON.stringify(orderHistory))
    alert('Order placed successfully')
    window.location.href = 'Details.html';
}