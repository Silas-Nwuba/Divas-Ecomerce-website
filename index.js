
// //slide background-image
// var currentSlide = 1;
// displaySlide(currentSlide);
// function setslide(number){
//   displaySlide(currentSlide += number)
// }
// function displaySlide(num){
//   var imageslide = document.getElementsByClassName("sildeimage")
//   if(num > imageslide.length){
//     currentSlide = 1;
//   }
//   if(num < 1){
//     currentSlide += imageslide.length;
//   }
//   for (let index = 0; index < imageslide.length; index++) {
//     imageslide[index].style.display = "none";
//   }
//   imageslide[currentSlide - 1].style.display = "block";
//   setTimeout(displaySlide,1000);
// }
//change header-scroll
try {
  var header,navbar,yPos;
	function headerScroll(){
	  header = document.querySelector(".header");
	  navbar = document.querySelector(".navbar");
    const searchContainer = document.getElementsByClassName("nav-item")[0];
    const HeaderContent = document.getElementsByClassName("Header-content")[0];
    const logo = document.getElementsByClassName("logo")[0];
   
	   yPos = window.pageYOffset;
	   if(yPos > 100){
      header.style.height = "100px";
      header.style.position = "fixed";
      header.style.padding = "0";
      navbar.style.display = "none";
      searchContainer.style.bottom = "20px";
      header.style.transition = "padding 300ms ease";
      HeaderContent.style.position = "relative";
      header.style.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.20)";
      HeaderContent.style.bottom = "33px";
      searchContainer.style.position = "relative";
      searchContainer.style.bottom = "30px";
      header.style.height = "68px";
      logo.style.position = "relative";
      logo.style.bottom = "23px";
      logo.style.width = "40px";
    
     }
     else{
      header.style.height = "155px";
      header.style.position = "static";
      header.style.paddingTop = "5px";
      navbar.style.display = "block";
      searchContainer.style.bottom = "15px";
      HeaderContent.style.bottom = "10px";
      logo.style.bottom = "0";
      header.style.boxShadow = "0 4px 4px -4px rgb(0 0 0 / 12%)";
     
    
     }
	}
	window.addEventListener("scroll",headerScroll);
} catch (error) {  
	console.log(error);
}
//navbar Scroll
const topLink = document.getElementsByClassName("topLink")[0];
topLink.addEventListener("click",()=>{
 window.scrollTo({top:980,behavior:"smooth",})
 
});
const RecommededLink = document.getElementsByClassName("RecommededLink")[0];
RecommededLink.addEventListener("click",()=>{
 window.scrollTo({top:1800,behavior:"smooth",})
 
});
const sellerLink = document.getElementsByClassName("sellerLink")[0];
sellerLink.addEventListener("click",()=>{
 window.scrollTo({top:2400,behavior:"smooth",})
 
});
const contactLink = document.getElementsByClassName("contactLink")[0];
contactLink.addEventListener("click",()=>{
 window.scrollTo({top:2900,behavior:"smooth",})
 
});
const contactCeo = document.getElementsByClassName("contactCeo")[0];
contactCeo.addEventListener("click",()=>{
 window.scrollTo({top:2900,behavior:"smooth",})
 
});
 //show sidebar nav
  const showIcon = document.querySelector("#showIcon");
  const sidebarOverly = document.querySelector(".sidebarOverly");
  const sidebar = document.querySelector(".sidebar");
  showIcon.addEventListener("click",showSideBar);
   function showSideBar(){
    sidebar.style.display = "block";
    sidebar.style.left = "0";
    sidebar.style.transition = "left 0.5s"
    sidebarOverly.style.display = "block";
   }
   //hide sidebar nav
    const cancelIcon = document.querySelector("#cancelIcon");
    cancelIcon.addEventListener("click",hideSideBar)
    function hideSideBar(){
      sidebar.style.left = "-500px";
      sidebar.style.transition = "left 0.5s"
      sidebarOverly.style.display="none";
    }
    sidebarOverly.addEventListener("click",()=>{
      sidebar.style.left = "-500px";
      sidebarOverly.style.display = "none";
    });
  //validation for search
const searchInput = document.querySelector("#searchInput");
const inputsearchbtn = document.querySelector(".inputsearchbtn");
inputsearchbtn.addEventListener("click",(events) =>{
  events.preventDefault();
  checkInputEmptyAndNull();
})
//function to check for empty and null 
 function checkInputEmptyAndNull(){
  if(searchInput.value === null || searchInput.value === ""){
    Swal.fire({
        icon: 'warning',
        title: 'Please enter a value to search..',
       timer:3000,
       callback : () => {
        document.body.style.overflow = "hidden"
       }
      });
      return false;
 }
 else{
  return true;
 }
 }
//LocalStorage
class Cart{
 constructor(productImage,productName,productPrice,productQuantity){
  this.productImage = productImage;
  this.productName = productName;
  this.productPrice= productPrice;
  this.productQuantity = productQuantity;
 }
}
class LocalCart{
  static key = "localItem";
  static getLocalItemFromCart(){
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if(cart === null || cart.length === 0)return cartMap
      return new Map(Object.entries(JSON.parse(cart)));
  };
  static addToLocalCart(id,item){
    const cartItem = LocalCart.getLocalItemFromCart();
    if(cartItem.has(id)){
     let mapItem = cartItem.get(id);
      let quantity =  parseInt(mapItem.productQuantity) + parseInt(item.productQuantity);
       let convertToString = quantity.toString();
       mapItem.productQuantity = convertToString;
      cartItem.set(id,mapItem);
      localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cartItem)));
      updateCartUi();
      showToast();
    }
    else{
       cartItem.set(id,item);
      localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cartItem)));
      updateCartUi();
      showToast();
    }
  };
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
     updateCartUi()
    }

  }
}
try {
  let temp = [];
  const cartPopupAll = document.querySelector(".cart-popup");
  const addcartButton = [...document.getElementsByClassName("AddCartFunction")];
  const popupOverlay = document.querySelector(".popup-overlay")
  addcartButton.map(popupBtn =>{
  popupBtn.addEventListener("click",addToDisplayCart)
  });
   function addToDisplayCart(event){
    const btn = event.target.parentElement.parentElement;
    const id = btn.id;
    const  productImage = btn.getElementsByClassName("productImage")[0].src;
    const productName = btn.getElementsByClassName("productName")[0].innerHTML;
      let productPrice = btn.getElementsByClassName("productPrice")[0].innerHTML     
       let cartObject = {
        productBtn:btn,
        id:id,
        names:productName,
        image:productImage,
        price: productPrice,
      }
      if(cartObject.id){
        if(temp.length > 0){
          temp = [];
        }
        temp.push(cartObject);
        temp.map(data =>{
              const cartPopup  = document.createElement("div");
              cartPopup.classList.add("row");
               cartPopup.innerHTML = `
               <div class="col-12 mx-auto">
               <div class="card" id="pop-content">
                   <div class="card-body">
                       <div class="pop-detail">
                           <i class="fa fa-times"style="float:right;cursor: pointer;font-size:18px"></i><br><br>
                           <div class="row d-flex justify-content-space-between w-100% mx-auto">
                              <h2 class="productId"style="display:none">${data.id}</h2>
                               <div class="col-6 col-md-6 mb-4 mb-md-0">
                                   <img src="${data.image}" style="width:100%"class="prodctImage">
                                   <img src="${data.image}" style="width:100px;margin-top:10px">
                               </div>
                               <div class="col-6 col-md-6"id="popup-scroll">
                                   <div>
                                       <h1 style="font-size: 2.5rem;font-family: Poppins, sans-serif;color: black"class="productName">${data.names}
                                       </h1>
                                       <p>Categories: Mens Collection</p>
                                   </div>
                                   <hr>
                                   <div class="price-content">
                                       <strong>
                                           <h1 style="font-family: bold"class="productPrice">${data.price}</h1>
                                       </strong>
                                       <i class="fa-solid fa-star"style="color:#F3CF11"></i></i>
                                       <i class="fa-solid fa-star" style="color:#F3CF11"></i>
                                       <i class="fa-solid fa-star"style="color:#F3CF11"></i>
                                       <i class="fa-solid fa-star"style="color:#F3CF11"></i>
                                       <i class="fa-solid fa-star"style="color:#F3CF11"></i>
                                       <p>Status:Excellent</p>
                                   </div>
                                   <hr>
                                   <div class="Quality">
                                       <button type="button"
                                           style="float: left;height:40px;padding:6px;border-radius:none;background-color:#eee;border:1px solid #eee">Qty</button>
                                       <input type="text" value="1" style="height:40px;width:150px" class="quantity">
                                       <i class="fa fa-minus" aria-hidden="true"
                                           style="background-color: #eee;padding:6px;height:30px;right:80px;position: relative;bottom: 2px;border-radius:24px;cursor: pointer;"
                                           onclick="decrement()"></i>
                                       <i class="fa fa-plus" aria-hidden="true"
                                           style="background-color: #eee;padding:6px;height:30px;right:70px;position: relative;bottom: 2px;border-radius:24px;cursor: pointer;"
                                           onclick="increment()"></i><br>
                                       <button type="button" class="proceedCart"
                                           style="margin-top:40px;width:200px;padding:7px;font-size:17px;font-weight:500;background-color:#0796f5e3;border:none;color:white;border-radius:5px">Proceed To Cart</button>
                                   </div>
                                   <div style="margin-top:20px;font-size: 20px;padding: 5px;" class="review">
                                       <strong><i class="fab fa-facebook"></i></strong>
                                       <strong>  <i class="fab fa-twitter"></i></strong>
                                       <strong><i class="fab fa-linkedin"></i></strong>
                                       <strong><i class="fab fa-whatsapp"></i></strong>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                 </div>
               </div>
               </div>`
               cartPopupAll.append(cartPopup);
               popupOverlay.style.display = "block";
               cartPopupAll.style.display = "block";
               document.body.style.overflowY = "hidden";
          });
            //cancel the popup
        const cancelIcon = document.getElementsByClassName("fa-times");
        for (let index = 0; index < cancelIcon.length; index++) {
            cancelIcon[index].addEventListener("click",(event) =>{
                const removeDiv = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
                removeDiv.remove();
                temp = [];
                popupOverlay.style.display = "none";
                cartPopupAll.style.display = "none"; 
                document.body.style.overflowY = "auto";     
            })

          }
        }
        const proceedBtn = document.querySelector(".proceedCart");
        proceedBtn.addEventListener("click",proceedToCart)
   }
  }
catch(error){
  console.log(error)
}    
function increment(){
  let InputValue = document.querySelector(".quantity");
  InputValue.value = parseInt(InputValue.value) +1;
}
function decrement(){
  let InputValue = document.querySelector(".quantity");
  InputValue.value = parseInt(InputValue.value) -1;
  if(isNaN(InputValue.value) ||  InputValue.value == 0){
    InputValue.value = 1
  }
}
//show cart sidebar
const showCart = document.querySelector(".cart-show");
const CartOverly = document.querySelector(".CartOverly");
const cartContainer = document.querySelector(".cart-container");
showCart.addEventListener("click", showcart);
function showcart(){
  cartContainer.style.right = "0";
  cartContainer.style.display = "block";
  cartContainer.style.transition = "0.5s";
  CartOverly.style.display = "block";
}
//close cart sidebar
const closeCart = document.querySelector("#closeCart");
closeCart.addEventListener("click",Closeclose);
function Closeclose(event){
  event.preventDefault();
  cartContainer.style.right = "-500px";
  cartContainer.style.transition = "0.5s ";
  CartOverly.style.display = "none";
}
CartOverly.addEventListener("click",() =>{
  cartContainer.style.right = "-500px";
  CartOverly.style.display = "none";
})
//Procedd to cart
try {
  function proceedToCart(event){
    const btn = event.target.parentElement.parentElement.parentElement.parentElement;
    const id = btn.getElementsByClassName("productId")[0].innerHTML;
    const  productImage = btn.getElementsByClassName("prodctImage")[0].src;
    const productName = btn.getElementsByClassName("productName")[0].innerHTML;
    const productQuantity = btn.getElementsByClassName("quantity")[0].value;
    const productPrice = btn.getElementsByClassName("productPrice")[0].innerHTML.replace("₦","");
    const item = new Cart(productImage,productName,productPrice,productQuantity);
    LocalCart.addToLocalCart(id,item);
    
   }
   function showToast(){
      const toastAlert = document.querySelector(".toast-alert");
      toastAlert.style.display = "block";
      const toastOverly = document.querySelector(".toastoverly");
      toastOverly.style.display = "block";
      toastAlert.style.transition = "all 0.5s";
      toastOverly.addEventListener("click",()=>{
        toastAlert.style.display = "none";
        toastOverly.style.display = "none";
      });
     // setTimeout(showToast,1000)
    }
  
  
} catch (error) {
  console.log(error);
}

function updateCartUi() {
    const cartItem = LocalCart.getLocalItemFromCart("localItem");
    const showCartItem = document.querySelector(".cart-display");
    showCartItem.innerHTML = "";
    if(cartItem === null)return
    let count = 0;
    let priceTotal = 0
    let  subTotal;
    for (const [key,value] of cartItem.entries()) {
      const displayCart = document.createElement("div");
      displayCart.classList.add("show-cart-item");
      let Quality  = value.productQuantity;
      let price = Math.round(value.productPrice.replace(",","") * 100)/100;
      let totalPrice = (Math.round(Quality * price * 100)/100)
      count += 1;
      priceTotal += totalPrice;
      subTotal = priceTotal.toLocaleString();
      displayCart.innerHTML = `
      <div class="row"style="display:flex;justify-content:space-around">
               <div>
                 <img src="${value.productImage}">
               </div>
                <div>
                     <p style="font-weight: 600">${value.productName}</p>
                    <div>
                         <h4 class="totalPrice"style="font-weight:550;font-size:16px">${value.productQuantity} <i class="bi bi-x"></i><l style="color:#0796f5e3">  ₦ ${value.productPrice}</l></h4>
                     </div>
                </div>
                     <div>
                           <i class="bi bi-x-lg"style="position: relative;left:20px" id="cancel"></i>
                     </div> 
     </div>
  `
  displayCart.getElementsByClassName("bi-x-lg")[0].addEventListener("click",()=>{
    LocalCart.removeItemFromLocalCart(key);
  })
     showCartItem.append(displayCart); 
}
if(count > 0){
  const showCartIcon = document.querySelector(":root");
  showCartIcon.style.setProperty("--after-content",`"${count}"`)
  const subTotalPrice = document.getElementsByClassName("subTotalPrice")[0];
  subTotalPrice.innerText = `₦${subTotal}`;
  const emptyCartMessage = document.getElementsByClassName("emptyCartMessage")[0];
  emptyCartMessage.style.display = "none";
  showCartItem.style.display = "block";
}
else{
  const showCartIcon = document.querySelector(":root");
  showCartIcon.style.setProperty("--after-content",`"${count}"`)
  const subTotalPrice = document.getElementsByClassName("subTotalPrice")[0];
  subTotalPrice.innerText = "₦0.00";
  showCartItem.style.display = "none";
  const emptyCartMessage = document.getElementsByClassName("emptyCartMessage")[0];
  emptyCartMessage.style.display = "block";
}
}
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartUi();
});


























































//recommendation product
// try {
// let slideIcon = document.getElementsByTagName("button");
// let prevIcon = document.querySelector(".prev")
// let nextIcon = document.querySelector(".next");

// let product = document.getElementsByClassName("recommend-item");
// let product_Page = product.length / 2;
// let i = 0;
// let movePer = 25.34;
// let maxMove = 203;
// //mobile view
// let mobile = window.matchMedia("(max-width:768px)");
// if(mobile.matches){
//   movePer = 50.34;
//   maxMove = 504;
// }
// let nextbtn = () =>{
//   i = i + movePer;
//   if(product == i){i=0}
//   for(const x of product){
//     i = i- movePer;
//     x.style.left = "-" + i + "%"; 

//   }};
//   let prevbtn = () => {
//     i = i- movePer;
//     if(i <= 0){
//       i = 0;
//     }
//     for(const x of product){
//       i = i - maxMove;
//       if(product_Page > 1)
//       {i = i - movePer};
//       x.style.left = '-' + i + '%';
     
//     }
//   }
//    prevIcon.onclick = () => {prevbtn();};
//    nextIcon.onclick = () => {nextbtn()};

// }
// catch (error) {
  
//}























// var left = 1;
// var right = 4;
// function show(){
//   for (let index = left; index <= right; index++) {
//     document.getElementById("recommenditem" + index).style.display = "inline-block";
//   }
// }
// function nextBtn(){
//   document.getElementById("recommenditem" + index).style.display = "none";
//   left += 1,
//   right +1;
//   for (let index = left; index <= right; index++) {
//     document.getElementById("recommenditem"+left).style.display = "inline-block";
//   }

// }




















// left += 1;
// right += 1;
//   for (let index = left; index <= right; index++) {
//    document.getElementById("recommenditem"+ index).style.display = "inline-block";
    
//   }

// let containerDimension = item.getBoundingClientRect();
// let containerWidth = containerDimension.width;
// item.scrollLeft -= containerWidth;
//   //   Recommendednexticon[index].addEventListener("click",() =>{
  //     let productDimension = item.getBoundingClientRect();
  //     let productWidth = productDimension.width;
  //     if(item.scrollLeft += productWidth){
  //       item.append(recommendedTime[0]);
  //     }
  // })
  // 