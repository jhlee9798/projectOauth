// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');



// cart
let cart = [];

//buttons
let buttonsDOM = [];

// getting the products


// class Products{
//     fields;
//     async getProducts(){
//         try{
//             let result = fetch('/js/products.json');
//             let data = await (await result).json();
//
//             let products = data.items;
//             products = products.map(item =>{
//                 const {title,price} = item.fields;
//                 const {id} = item.sys
//                 const image =item.fields.image.fields.file.url;
//                 return {title,price,id,image};
//             })
//             console.log(products);
//             return products;
//         } catch(error){
//             console.log(error);
//         }
//     }
// }

class Products{

    async getProducts(){

        let products;
        $.ajax({
            type : 'GET',
            url : '/products/mypage',
            dataType : 'json',
            contentType : 'application/json; charset=utf-8',
            async:false
        }).done(function (resp) {

            products = resp;
            products = products.map(product =>{
                const {title, price, id, image} = product;
                return {title,price,id,image};
            })
            console.log(products);
            console.log("먼저나와줘")


        }).fail(function (error) {
            alert(JSON.stringify(error));
        })
        return products;
    }
}

// display products
class UI{
    displayProducts(products){
        console.log(products);
        let result ='';
        products.forEach(product =>{
            result += `
            <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${product.image}
                    alt="product" class="product-img">
<!--                    
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
-->

                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
            <!-- end of single product -->
            `;

        });
        productsDOM.innerHTML = result;

    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        console.log(buttons);
        buttonsDOM = buttons;
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item =>{
                String(item.id) === id;
            })
            if(inCart){
                button.innerText = "In Cart"
                button.disabled = true;
            }
            button.addEventListener('click', (event) =>{
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // get product from products
                console.log("id: ", id);
                let cartItem = {...Storage.getProduct(id), amount: 1};
                // add product to the cart
                cart = [...cart, cartItem];
                console.log(cart);
                // save cart in local storage
                Storage.saveCart(cart);
                // set cart values
                this.setCartValues(cart);
                // add cart values
                // display cart item
                this.addCartItem(cartItem);
                // show the cart
                this.showCart();
            });

        });
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
        console.log(cartTotal, cartItems);
    }
    addCartItem(item){

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
        <img src=${item.image} alt="product">
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
        `;
        cartContent.appendChild(div);

    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }
    setupApp() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart);

    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));

    }
    hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }

    // 장바구니 clear버튼 클릭 동작 실행
    cartLogic() {
        // clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });
        // cart functionality
        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains("fa-chevron-up")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => String(item.id) === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
                tempItem.amount;
            } else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => String(item.id) === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        })


    }

    // 장바구니 비우기
    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        console.log(cartContent.children);

        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }

    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        console.log("button: ", button);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"</i>add to cart`
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => String(button.dataset.id) === String(id));
    }
}

//local storage
class Storage{
    static saveProducts(products){
        console.log(products);
        localStorage.setItem("products", JSON.stringify(products));
        console.log(localStorage.getItem('products'));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => String(product.id) === id);
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    const ui = new UI();
    const products = new Products();
    // setup app
    ui.setupApp();

    // get all products
    products.getProducts().then(products => {
        console.log("나오지마" + products)
        ui.displayProducts(products);
        Storage.saveProducts(products);

    }).then(()=>{
        ui.getBagButtons();
        ui.cartLogic();
    });


});