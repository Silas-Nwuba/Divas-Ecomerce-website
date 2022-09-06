if(window.location.reload){
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = "none";
  const cart_container = document.querySelector(".cart-container");
}
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
 //sideshow hide and show  sidebar
try {
  const showIcon = document.getElementById("showIcon");
 const cancelIcon = document.getElementById("cancelIcon");
  const sidebar = document.getElementById("sidebar");
  showIcon.addEventListener("click",function(e){
    if(showIcon.contains(e.target)){
        sidebar.style.display="block";
        sidebar.style.transition = "0.5s";
    }
    else{
        sidebar.style.display = "none";
    }
  });
    cancelIcon.addEventListener("click",function(){
    sidebar.style.display = "none";
  });
}
catch (error) {
    console.log(error);
}
try {
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
       width:"500px",
      });
      return false;
 }
 else{
  return true;
 }
 }
  }
catch(error){
  console.log(error)

}
//show cart sidebar
try{
  const showCart = document.querySelector(".cart-show");
  showCart.addEventListener("click", showcart);
  function showcart(){
    cart_container.style.right = "0";
    cart_container.style.display = "block";
    cart_container.style.transition = "1s";
    background_overly.style.display = "block";
  }
  //close cart sidebar
  const background_overly = document.querySelector(".background-overly");
  const cart_container = document.querySelector(".cart-container");
  const closeCart = document.querySelector("#closeCart");
  closeCart.addEventListener("click",Closeclose);
  function Closeclose(){
    cart_container.style.right = "-500px";
    cart_container.style.transition = "1s";
    background_overly.style.display = "none";
  }
  //shopping cart
  const AddButton = document.getElementsByClassName("btn-primary");
  const Update_quantity = document.getElementsByClassName("quantity");
  const cart_message = document.getElementsByClassName("cart-message")[0];
  
  let all_product_item_container = document.querySelector(".all-cart-item");
  for (let index = 0; index < AddButton.length; index++)  {
    AddButton[index].addEventListener("click",addToCart)
  }
   //AddCart Item
   function addToCart(event){
    if(event){
      let btn = event.target.parentElement;
      let GrandParent = btn.parentElement;
      let ProductImage = GrandParent.children[0].src;
      let ProductName = btn.children[0].innerText;
      let ProductPriceDiv = btn.children[1];
      let productPrice = ProductPriceDiv.children[0].innerText.replace(",","");
    
      const cartDiv = document.createElement("div");
      cartDiv.classList.add("row");
      cartDiv.innerHTML = `
      <img src="${ProductImage}">
      <div>
        <p style="font-weight: 500;font-size:12px">${ProductName}</p>
         <p style="position: relative;bottom:10px">status - 1 item</p>
     </div>
      <div style="position: relative;left:10px">
       <input type="number" class="quantity" min="1" max="1000" value="1">
         <h5 class="total">${productPrice}</h5>
       </div>
       <div>
         <i class="bi bi-x-lg"></i>
     </div>
      `
      all_product_item_container.append(cartDiv);
      if(addToCart){
        swal.fire({
          icon:"success",
          title:`<p style="font-size:13px"> ${ProductName} has been added to cart </p>`,
          width:"500px",
        })
      }
      for (let index = 0; index < Update_quantity.length; index++)  {
        Update_quantity[index].addEventListener("change",UpdateCart)
      }
  //cart message
  cart_message.style.display= "none"; 
     } 
    
    }
}
catch(error){
  console.log(error);
}
//updating the cart
  function UpdateCart(event){ 
   let number_of_item = event.target;
   let number_of_item_parent = number_of_item.parentElement;
   let Quality_field = number_of_item_parent.getElementsByClassName("quantity")[0].value;
   let total_price = number_of_item_parent.getElementsByClassName("total")[0].innerText;
   let  price_item_content  = total_price.replace("₦","");
   price_item_content = "₦" + price_item_content * Quality_field; 
   console.log(total_price);
  }























// totalCart.innerHTML = 0;
// const item = document.querySelectorAll(".item");
// item.forEach(function(btn){
//   btn.addEventListener("click",function(e){
//     if(e.target.classList.contains('AddCartFunction')){
//       const productImg = btn.querySelector("img").src;
//       const productName = btn.querySelector(".productName").innerHTML;
//       const productPrice = btn.querySelector(".productPrice").innerHTML;

//       total += productPrice;

//       let  obj = {
//         img:productImg,
//         name : productName,
//         price : productPrice,  
//         totalprice : price,
//       }
//       var localstorage = JSON.parse( localStorage.getItem("localItem"));
//       if(localstorage === null ){
//         cartitem =  [];
//       }
//       else{
//         cartitem = localstorage;
//       }
//       cartitem.push(obj);
//       localStorage.setItem("localItem",JSON.stringify(cartitem));
//       showCart();
//       }
//   });
// });
// //to get the toatl price 
// function price(productPrice)
// {
//   return + productPrice;
// }
































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