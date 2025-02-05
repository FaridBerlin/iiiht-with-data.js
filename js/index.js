// shop items html generated here

let shop = document.getElementById('shop');



let generateShop = () => {

    return (shop.innerHTML = shopItemData.map((x)=>{

        let {id, name, disc, price, img} = x;
        let search = basket.find((x) => x.id === id) || [];

        return`<div id=product-id-${id} class="item">
                    <img src=${img} alt="Car Charger 1">

                    <div class="details">
                        <h3>${name}</h3>
                        <p>${disc}</p>
                        <div class="price-quantity">

                            <h2>$ ${price}</h2>

                            <div class="buttons">
                                <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                                <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                                <i onclick="increment(${id})" class="fa-solid fa-plus"></i>

                            </div>
                            
                        </div>

                

                    </div>
                    
                
                </div>

    `
    }).join(""));
};


// create a basket array to store the items selected by the user

let basket = JSON.parse(localStorage.getItem("data")) || [];




generateShop();


let increment = (id) => {

    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){

        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }

    // console.log(basket);

    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));


};

let decrement = (id) => {

    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;


    else if(search.item === 0) return;


    else{
        search.item -= 1;
    }

    update(selectedItem.id);



    basket = basket.filter((x) => x.item !== 0);

    // console.log(basket);


    localStorage.setItem("data", JSON.stringify(basket));
   
};

let update = (id) => {

    let search = basket.find((x) => x.id === id);

    console.log(search.item);

    document.getElementById(id).innerHTML = search.item;

    calculation();

};

let calculation = () => {


    let cartIcon = document.getElementById('cartAmount');

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((a,b) => a + b, 0);

};

calculation();