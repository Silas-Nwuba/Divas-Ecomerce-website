//show cart sidebar
const showCartDiv = document.querySelector(".showIcon");
const CartOverly = document.querySelector(".CartOverly");
const cartContainer = document.querySelector(".showCart-container");
showCartDiv.addEventListener("click", showcart);
function showcart() {
  cartContainer.style.right = "0";
  cartContainer.style.display = "block";
  cartContainer.style.transition = "0.5s";
  CartOverly.style.display = "block";
}
//close cart sidebar
try {
  const closeCart = document.querySelector("#closeCart");
  closeCart.addEventListener("click", Closeclose);
  function Closeclose(event) {
    event.preventDefault();
    cartContainer.style.right = "-500px";
    cartContainer.style.transition = "0.5s ";
    CartOverly.style.display = "none";
  }
  CartOverly.addEventListener("click", () => {
    cartContainer.style.right = "-500px";
    CartOverly.style.display = "none";
  });
} catch (error) {
  console.log(error)
}
class LocalCart {
  static key = "localItem";
  static getLocalItemFromCart() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap
    return new Map(Object.entries(JSON.parse(cart)));
  };
  static updateCartByIncreasement(id) {
    const getCartId = LocalCart.getLocalItemFromCart();
    if (getCartId.has(id));
    {
      let mapItem = getCartId.get(id);
      let updateQuantity = parseInt(mapItem.productQuantity) + 1;
      updateQuantity = updateQuantity.toString();
      mapItem.productQuantity = updateQuantity;
      getCartId.set(id, mapItem);
      localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(getCartId)));

    }
  }
  static updateCartBydecreament(id) {
    const getCartId = LocalCart.getLocalItemFromCart();
    if (getCartId.has(id));
    {
      let mapItem = getCartId.get(id);
      if (mapItem.productQuantity != 1) {
        let updateQuantity = parseInt(mapItem.productQuantity) - 1;
        updateQuantity = updateQuantity.toString();
        mapItem.productQuantity = updateQuantity;
        getCartId.set(id, mapItem);
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(getCartId)));

      }

    }
  }
  
  static removeItemFromLocalCart(id){
    const removeItem = LocalCart.getLocalItemFromCart();
    if(removeItem.has(id)){
    removeItem.delete(id);
    }
    if(removeItem.length === 0){
      localStorage.clear();
    }
    else{
      localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(removeItem)));
     updateCartUi();
     displayProductDetails() 
    }

  }
}
function updateCartUi() {
  const cartItem = LocalCart.getLocalItemFromCart("localItem");
  const showCartItem = document.querySelector(".cart-display");
  showCartItem.innerHTML = "";
  if (cartItem === null) return
  let count = 0;
  let priceTotal = 0
  let subTotal;
  for (const [key, value] of cartItem.entries()) {
    const displayCart = document.createElement("div");
    displayCart.classList.add("show-cart-item");
    let Quality = value.productQuantity;
    let price = Math.round(value.productPrice.replace(",", "") * 100) / 100;
    let totalPrice = (Math.round(Quality * price * 100) / 100);
    count += 1;
    priceTotal += totalPrice;
    subTotal = priceTotal.toLocaleString();
    displayCart.innerHTML = `
    <div class="row"style="display:flex;justify-content:space-around">
             <div>
               <img src="${value.productImage}">
             </div>
              <div>
                   <p style="font-weight: 500;font-size:14px">${value.productName}</p>
                  <div>
                       <h4 class="totalPrice"style="font-weight:550;font-size:16px">${value.productQuantity} <i class="bi bi-x"></i><l style="color:#0796f5e3">  ₦ ${value.productPrice}</l></h4>
                   </div>
              </div>
                   <div>
                         <i class="bi bi-x-lg"style="position: relative;left:20px" id="cancel"></i>
                   </div> 
   </div>
`
    displayCart.getElementsByClassName("bi-x-lg")[0].addEventListener("click", () => {
      LocalCart.removeItemFromLocalCart(key);
    })
    showCartItem.append(displayCart);

  }
  if (count > 0) {
    const showCartIcon = document.querySelector(":root");
    showCartIcon.style.setProperty("--after-content", `"${count}"`)
    const subTotalPrice = document.getElementsByClassName("subTotalPrice")[0];
    subTotalPrice.innerText = `₦${subTotal}`;
    const emptyCartMessage = document.getElementsByClassName("emptyCartMessage")[0];
    emptyCartMessage.style.display = "none";
    showCartItem.style.display = "block";
  }
  else {
    const showCartIcon = document.querySelector(":root");
    showCartIcon.style.setProperty("--after-content", `"${count}"`)
    const subTotalPrice = document.getElementsByClassName("subTotalPrice")[0];
    subTotalPrice.innerText = "₦0.00";
    showCartItem.style.display = "none";
    const emptyCartMessage = document.getElementsByClassName("emptyCartMessage")[0];
    emptyCartMessage.style.display = "block";
  }
}


function displayProductDetails() {
  const getLocalItem = LocalCart.getLocalItemFromCart("localItem");
  for (const [key, value] of getLocalItem.entries()) {
    const item = document.createElement("div");
    item.classList.add("cart-container");
    const itemParentElement = document.querySelector(".cart-all-container");
    const price = Math.round(value.productPrice.replace(",", "") * 100) / 100;
    let total = parseInt(value.productQuantity) * parseInt(price);
    total = total.toLocaleString();
    item.innerHTML = ` <div class="all-item">
    <img src="${value.productImage}">
    <div class="product-Detail">
         <div style="display:none">
         <h4 class="ProductId">${key}</h4>
         </div>
        <div class="productNameAndPrice">
            <p>${value.productName}</p>
            <strong class="price">₦${value.productPrice}</strong>
        </div>
        <div class="quantity">
            <button type="button" class="decreasement">-</button>
            <input type="text" value="${value.productQuantity}"class="quantityInput">
            <button type="button" class="increasement">+</button>
        </div>
 
        <div class="totalPrice">
            <strong>₦${total}</strong>
        </div>
        <div class="deleteIcon">
            <i class="bi bi-x-lg"></i>
        </div>
    </div>
 </div>`
    itemParentElement.append(item);
    const increasement = document.getElementsByClassName("increasement");
    for (let index = 0; index < increasement.length; index++) {
      increasement[index].addEventListener("click", increasementFunction);
    }
    const decreasement = document.getElementsByClassName("decreasement");
    for (let index = 0; index < decreasement.length; index++) {
      decreasement[index].addEventListener("click", decreasementFunction);
    }
  }

}
// quality  
function increasementFunction(event) {
  const qualityParentElement = event.target.parentElement.parentElement;
  let qualityId = qualityParentElement.getElementsByClassName("ProductId")[0].innerHTML;
  LocalCart.updateCartByIncreasement(qualityId);
  let InputValue = qualityParentElement.getElementsByClassName("quantityInput")[0];
  InputValue.value = parseInt(InputValue.value) + 1;
  let price = qualityParentElement.getElementsByClassName("price")[0].innerHTML.replace("₦", "").replace(",", "");
  let totalPrice = parseInt(price) * parseInt(InputValue.value);
  totalPrice = totalPrice.toLocaleString();
  let totalSum = qualityParentElement.getElementsByClassName("totalPrice")[0];
  totalSum.innerHTML = `₦${totalPrice}`
}
function decreasementFunction(event) {
  const qualityParentElement = event.target.parentElement.parentElement;
  let qualityId = qualityParentElement.getElementsByClassName("ProductId")[0].innerHTML;
  LocalCart.updateCartBydecreament(qualityId);
  let InputValue = qualityParentElement.getElementsByClassName("quantityInput")[0];
  InputValue.value = parseInt(InputValue.value) - 1;
  if (isNaN(InputValue.value) || InputValue.value == 0) {
    InputValue.value = 1
  }
  else {
    let price = qualityParentElement.getElementsByClassName("price")[0].innerHTML.replace("₦", "").replace(",", "");
    let totalPrice = parseInt(price) * parseInt(InputValue.value);
    totalPrice = totalPrice.toLocaleString();
    let totalSum = qualityParentElement.getElementsByClassName("totalPrice")[0];
    totalSum.innerHTML = `₦${totalPrice}`
  }





}
document.addEventListener("DOMContentLoaded", () => {
  displayProductDetails();
  updateCartUi();
})