let label = document.getElementById("label");
let shoppingCart = document.getElementById("shoppingCart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// This file is used to calculate the total amount of items in the cart and display it in the cart icon.

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((a, b) => a + b, 0);
};

calculation();

// generate the cart items

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        console.log(x);
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        return `
<div class="cartItem">
<img width="100" src=${search.img} alt="">
<div class="detalsCart">
<div class="titelPriceX">
<h4 class="titel-price">
<p>${search.name}</p>
<p class="cart-item-price">$ ${search.price}</p>
</h4>
<i onclick="removeItem(${id})" class="fa-solid fa-x"></i>
</div>
<div class="buttons">
<i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
<div id=${id} class="quantity">${item}</div>
<i onclick="increment(${id})" class="fa-solid fa-plus"></i>
</div>
<h3 class="cart-item-total">$ ${item * search.price}</h3>
</div>
</div>
`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
<h2>Your cart is empty</h2>
<a href="index.html">
<button class="HomeBtn">Back to Home</button>
</a>
`;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();

  update(selectedItem.id);

  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);

  generateCartItems();

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);

  console.log(search.item);

  document.getElementById(id).innerHTML = search.item;

  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;

  basket = basket.filter((x) => x.id !== selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  totalAmount();
  calculation();
};


let clearCart = () => {
    basket = [];

    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));


    
};

let totalAmount = () => {

    if (basket.length !== 0) {

        let amount = basket.map((x) => {
           let {item, id} = x;  
        let search = shopItemData.find((y) => y.id === id) || [];
        return item * search.price;

            
    }).reduce((x, y) => x + y, 0);

    label.innerHTML = `

    <div class="totalFinal">

    <h2>Total Bill: $ ${amount}</h2>
    <button class="checkoutFinal">Checkout</button>
    <button onclick="clearCart()"  class="removeFinal">Cleare Cart</button>

    
    </div>

    
    
    `

    
    
}else return;

};

totalAmount();
