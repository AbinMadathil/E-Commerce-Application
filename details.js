class Order {
    constructor(user) {
        this.user = user;
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productId) {
        this.products = this.products.filter(product => product.id != productId)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // const urlParams = new URLSearchParams(window.location.search)
    // const userName = urlParams.get('name')
    // if (userName) {
    //     document.getElementById('welcomeMessage').innerText = 'Welcome , ' + userName;
    // } else {
    //     document.getElementById('welcomeMessage').innerText = 'Welcome'
    // }
    const products = JSON.parse(localStorage.getItem('products'));
    console.log('products; ',products);
    paginate(products)
});


const paginate = (items) => {
    let currentPage = 1
    const itemPerPage = 3
    const totalPages = Math.ceil(items.length / itemPerPage)

    function showItems(page) {
        const startIndex = (page - 1) * itemPerPage
        const endIndex = startIndex + itemPerPage
        const pageItems = items.slice(startIndex, endIndex)

        const productElement = document.getElementById('product-listing')
        productElement.innerHTML = ""
        for (const product of pageItems) {
            const productDiv = document.createElement('div')
            productDiv.classList.add('product-container__card');
            // productDiv.addEventListener('click' , function(){window.location.href = 'details.html?productId=' + encodeURIComponent(product.id)})
            productDiv.innerHTML = `
        <img src="https://random.imagecdn.app/v1/image?width=500&height=150" alt="Product Image"/>
        <h2>${product.name}</h2>
        <p>${product.details}</p>
        <span>Cost: ${product.price}$</span>
        <br />
        <button onClick="addToCart(${product.id})">Add to Cart</button>
        <br />
        <a href="details.html">Details</a>
        `;
            productElement.appendChild(productDiv)
        }
    }

    function setupPagination(){
        const pagination = document.getElementById('pagination')
        pagination.innerHTML = ""
        for(let i = 1; i <= totalPages; i++){
            const link = document.createElement("a")
            link.href = "#"
            link.innerText =  " | " + i + " | "

            if(i == currentPage){
                link.classList.add('active')
            }

            link.addEventListener('click' , (event) =>{
                event.preventDefault()
                currentPage = i
                showItems(currentPage)

                const currentActive = pagination.querySelector('.active')
                currentActive.classList.remove('active')
                link.classList.add('active')
            })

            pagination.appendChild(link)
        }
    }

    showItems(currentPage)
    setupPagination()
}

const addToCart = (productId) => {
    console.log("inside cart funcyion");
    var orders = JSON.parse(localStorage.getItem('Orders')) || [];
    var currentUser = localStorage.getItem('currentUser');  
    const products = JSON.parse(localStorage.getItem('products'));
    var productDetails = products.find(product => product.id === productId)
    if (IsCartEmptyForUser(currentUser, orders)) {
        console.log("inside new order creating function");
        var newOrder = new Order(currentUser)
        newOrder.addProduct(productDetails)
        console.log(newOrder.products);
        localStorage.setItem('Orders', JSON.stringify([...orders, newOrder]))
    } else {
        const orderIndex = orders.findIndex(order => order.user === currentUser)
        console.log('orderIndex', orderIndex);
        orders[orderIndex].products.push(productDetails)
        localStorage.setItem('Orders', JSON.stringify([...orders]))
    }
    window.location.href = 'cart.html'
}

const IsCartEmptyForUser = (email, orders) => {
    return !orders.some(order => order.user === email)
}