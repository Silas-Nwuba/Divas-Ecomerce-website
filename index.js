
var currentSlide = 1;
displaySlide(currentSlide);
function setslide(number){
  displaySlide(currentSlide += number)

}
function displaySlide(num){
  var imageslide = document.getElementsByClassName("sildeimage")
  if(num > imageslide.length){
    currentSlide = 1;
  }
  if(num < 1){
    currentSlide += imageslide.length;
  }
  for (let index = 0; index < imageslide.length; index++) {
    imageslide[index].style.display = "none";
  }
  imageslide[currentSlide - 1].style.display = "block";
  setTimeout(displaySlide,1000);
}
 //sideshow hide and show  
try {
  const showIcon = document.getElementById("showIcon");
 const cancelIcon = document.getElementById("cancelIcon");
  const sidebar = document.getElementById("sidebar");
  showIcon.addEventListener("click",function(e){
    if(showIcon.contains(e.target)){
        sidebar.style.display="block"
        sidebar.style.transition = "0.5s";
    }
    else{
        sidebar.style.display = "none";
    }
  });
    cancelIcon.addEventListener("click",function(){
    sidebar.style.display = "none";
  });
//validation for search 
const searchInput = document.getElementById("searchInput");
var regex =  /^[A-Za-z. ]{100}/;
 function searchFunction(){
    if(searchInput.value.trim() === ""){
        Swal.fire({
          icon: 'warning',
          title: 'Please enter a value to search..',
        });
    }
   else if(!regex.test(searchInput.value.trim())){
     Swal.fire({
       icon: 'warning',
       text: 'search not found',
     })
    }
}
} catch (error) {
    console.log(error);
}
//add item to the cart
var cartCollection = [];
const item = document.querySelectorAll(".item");
item.forEach(function(btn){
  btn.addEventListener("click",function(e){
    if(e.target.classList.contains('AddCartFunction')){
      const productImg = btn.querySelector("img").src;
      const productName = btn.querySelector(".productName").innerHTML;
      const productPrice = btn.querySelector(".productPrice").innerHTML;
      const totalPrice = productPrice;
      let  obj = {
        img:productImg,
        name : productName,
        price : productPrice,
        total : totalPrice,                                                                                                                                                                                                        
      }
      cartCollection.push(obj);
      cartCollection.forEach((data) => {
        console.log(data)
        var  cartConntent = document.createElement("section");
        cartConntent.className = "cart-content";
        cartConntent = ` ${data.img}">
        <div class="cart-summary">
            <p>${data.name}</p>
             <p>Quality : 1</p>
             <p>Price : ${data.price}</p>
             <h4>Total:${data.total}</h4>
             <button class="btn btn-sucesss">Checkout</button>
        </div>
      `
      })

      
      //document.getElementsByClassName("totalCart").innerHTML = detailsCart;

      }
  });
 
});





