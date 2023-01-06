'use strict';

//change header-scroll
try {
  var header, navbar, yPos;
  function headerScroll() {
    header = document.querySelector('.header');
    navbar = document.querySelector('.navbar');
    const searchContainer = document.getElementsByClassName('nav-item')[0];
    const HeaderContent = document.getElementsByClassName('Header-content')[0];
    const logo = document.getElementsByClassName('logo')[0];

    yPos = window.pageYOffset;
    if (yPos > 100) {
      header.style.height = '100px';
      header.style.position = 'fixed';
      header.style.padding = '0';
      navbar.style.display = 'none';
      searchContainer.style.bottom = '20px';
      header.style.transition = 'padding 300ms ease';
      HeaderContent.style.position = 'relative';
      header.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.20)';
      HeaderContent.style.bottom = '33px';
      searchContainer.style.position = 'relative';
      searchContainer.style.bottom = '30px';
      header.style.height = '68px';
      logo.style.position = 'relative';
      logo.style.bottom = '20px';
      logo.style.width = '40px';
    } else {
      header.style.height = '155px';
      header.style.position = 'relative';
      header.style.paddingTop = '20px';
      navbar.style.display = 'block';
      navbar.style.position = 'relative';
      navbar.style.bottom = '25px';
      searchContainer.style.bottom = '30px';
      logo.style.bottom = '20px';
      header.style.boxShadow = '0 4px 4px -4px rgb(0 0 0 / 12%)';
    }
  }
  window.addEventListener('scroll', headerScroll);
} catch (error) {
  console.log(error);
}
//navbar Scroll
const menCollection = document.getElementsByClassName('menCollection')[0];
menCollection.addEventListener('click', (e) => {
  if (e.target) {
    window.scrollTo({
      left: 0,
      top: 880,
      behavior: 'smooth',
    });
  }
});
const topSelller = document.getElementsByClassName('topSelller')[0];
topSelller.addEventListener('click', () => {
  window.scrollTo({ top: 2500, behavior: 'smooth' });
});
const ourBlog = document.getElementsByClassName('ourBlog')[0];
ourBlog.addEventListener('click', () => {
  window.scrollTo({ top: 3100, behavior: 'smooth' });
});
const news = document.getElementsByClassName('news')[0];
news.addEventListener('click', () => {
  window.scrollTo({ top: 3800, behavior: 'smooth' });
});
const contactCeo = document.getElementsByClassName('contactUs')[0];
contactCeo.addEventListener('click', () => {
  window.scrollTo({ top: 3960, behavior: 'smooth' });
});
//show sidebar nav
const showIcon = document.querySelector('#showIcon');
const sidebarOverly = document.querySelector('.sidebarOverly');
const sidebar = document.querySelector('.sidebar');
showIcon.addEventListener('click', showSideBar);
function showSideBar() {
  sidebar.style.display = 'block';
  sidebar.style.left = '0';
  sidebar.style.transition = 'left 0.5s';
  sidebarOverly.style.display = 'block';
}
//hide sidebar nav
const cancelIcon = document.querySelector('#cancelIcon');
cancelIcon.addEventListener('click', hideSideBar);
function hideSideBar() {
  sidebar.style.left = '-500px';
  sidebar.style.transition = 'left 0.5s';
  sidebarOverly.style.display = 'none';
}
sidebarOverly.addEventListener('click', () => {
  sidebar.style.left = '-500px';
  sidebarOverly.style.display = 'none';
});
//scroll sidebar nav
const scrollSidebarNav = document.querySelectorAll('.sidebar ul li a');
for (let index = 0; index < scrollSidebarNav.length; index++) {
  scrollSidebarNav[index].addEventListener('click', () => {
    const sidebarOverly = document.querySelector('.sidebarOverly');
    sidebarOverly.style.display = 'none';
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.left = '-500px';
    if (index === 1) {
      document.body.scrollTo({ top: 1200, behavior: 'smooth' });
    } else if (index == 2) {
      document.body.scrollTo({ top: 5565, behavior: 'smooth' });
    } else if (index == 3) {
      document.body.scrollTo({ top: 7760, behavior: 'smooth' });
    } else if (index == 4) {
      document.body.scrollTo({ top: 9220, behavior: 'smooth' });
    } else if (index == 5) {
      document.body.scrollTo({ top: 9500, behavior: 'smooth' });
    }
  });
}
//validation for search
const searchInput = document.querySelector('#searchInput');
const inputsearchbtn = document.querySelector('.inputsearchbtn');
inputsearchbtn.addEventListener('click', (events) => {
  events.preventDefault();
  checkInputEmptyAndNull();
});
//function to check for empty and null
function checkInputEmptyAndNull() {
  if (searchInput.value === null || searchInput.value === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Please enter a value to search..',
      timer: 3000,
      callback: () => {
        document.body.style.overflow = 'hidden';
      },
    });
    return false;
  } else {
    return true;
  }
}
//show cart sidebar
const showCartDiv = document.querySelector('.cart-show');
const CartOverly = document.querySelector('.CartOverly');
const cartContainer = document.querySelector('.cart-container');
showCartDiv.addEventListener('click', showcart);
function showcart() {
  cartContainer.style.right = '0';
  cartContainer.style.display = 'block';
  cartContainer.style.transition = '0.5s';
  CartOverly.style.display = 'block';
}
//close cart sidebar
try {
  const closeCart = document.querySelector('#closeCart');
  closeCart.addEventListener('click', Closeclose);
  function Closeclose(event) {
    event.preventDefault();
    cartContainer.style.right = '-500px';
    cartContainer.style.transition = '0.5s ';
    CartOverly.style.display = 'none';
  }
  CartOverly.addEventListener('click', () => {
    cartContainer.style.right = '-500px';
    CartOverly.style.display = 'none';
  });
} catch (error) {
  console.log(error);
}

//LocalStorage
class Cart {
  constructor(productImage, productName, productPrice, productQuantity) {
    this.productImage = productImage;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
  }
}
class LocalCart {
  static key = 'localItem';
  static getLocalItemFromCart() {
    let cartMap = new Map();
    const cart = localStorage.getItem(LocalCart.key);
    if (cart === null || cart.length === 0) return cartMap;
    return new Map(Object.entries(JSON.parse(cart)));
  }
  static addToLocalCart(id, item) {
    const cartItem = LocalCart.getLocalItemFromCart();
    if (cartItem.has(id)) {
      let mapItem = cartItem.get(id);
      let quantity =
        Number.parseInt(mapItem.productQuantity) +
        Number.parseInt(item.productQuantity);
      let convertToString = quantity.toString();
      mapItem.productQuantity = convertToString;
      cartItem.set(id, mapItem);
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cartItem))
      );
      alertModalFunction();
      updateCartUi();
    } else {
      cartItem.set(id, item);
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(cartItem))
      );
      alertModalFunction();
      updateCartUi();
    }
  }
  static removeItemFromLocalCart(id) {
    const removeItem = LocalCart.getLocalItemFromCart();
    if (removeItem.has(id)) {
      removeItem.delete(id);
    }
    if (removeItem.length === 0) {
      localStorage.clear();
    } else {
      localStorage.setItem(
        LocalCart.key,
        JSON.stringify(Object.fromEntries(removeItem))
      );
      updateCartUi();
    }
  }
}

//add to cart modal
try {
  let temp = [];
  const addcartButton = [...document.getElementsByClassName('AddCartFunction')];
  addcartButton.map((popupBtn) => {
    popupBtn.addEventListener('click', addToDisplayCart);
  });
  function addToDisplayCart(event) {
    const btn = event.target.parentElement.parentElement;
    const id = btn.id;
    const productImage = btn.getElementsByClassName('productImage')[0].src;
    const productName = btn.getElementsByClassName('productName')[0].innerHTML;
    const productPrice =
      btn.getElementsByClassName('productPrice')[0].innerHTML;
    const description = btn.getElementsByClassName('description')[0].innerHTML;
    let cartObject = {
      productBtn: btn,
      id: id,
      names: productName,
      image: productImage,
      price: productPrice,
      desc: description,
    };
    if (temp.length > 0) {
      temp = [];
    }
    temp.push(cartObject);
    temp.forEach((data) => {
      const myModals = document.querySelector('.myModal');
      const modals = document.createElement('div');
      modals.classList.add('modelId');
      modals.innerHTML = `
      <div class="modal fade" id="modelId" tabindex="-1" aria-labelledby="modelTitleId" aria-hidden="true" data-backdrop="static"data-keyboard="false">
          <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                  <i class="bi bi-x-lg closeModal"style="float: right;font-size: 22px;cursor:pointer"></i>
                  </div>
                  <div class="modal-body">
                      <div class="container-fluid">
                          <div class="row">
                              <div class="col-md-6">
                                 <p class="productId"style="display:none">${data.id}"</p>
                                  <div class="productImage">
                                      <img src="${data.image}"class="bigImage">
                                      <img src="${data.image}" class="smallImage">
                                  </div>
                              </div>
  
                              <div class="col-md-6">
                                  <h4 class="productName">${data.names}</h4>
                                  <p>Collection - Mens Collection</p>
                                  <hr>
                                  <div>
                                      <strong class="productPrice"style="font-size:20px"> ${data.price}</strong>
                                  </div>
                                
                                  <div class="description">
                                     <p>${data.desc}</p>
                                  </div>
                                  <div class="product-review">
                                      <span>
                                          <i class="fa fa-star" aria-hidden="true"style="color:darkred"></i>
                                          <i class="fa fa-star" aria-hidden="true"style="color:darkred"></i>
                                          <i class="fa fa-star" aria-hidden="true"style="color:darkred"></i>
                                          <i class="fa fa-star" aria-hidden="true"style="color:darkred"></i>
                                          <i class="fa fa-star" aria-hidden="true"style="color:darkred"></i>
                                      </span>
                                  </div>
                                  <div style="margin-top:20px">
                                     <h4 style="font-family:18px;color:#8b8686">SKU: 00${data.id}00</h4> 
                                  </div>
                              </div>
                              <hr>
                              
                              <div class="modal-footter">
                                  <div class="quantity">
                                      <button type="button"class="decreasement"onclick="decrement()">-</button>
                                    <input type="text" value="1"class="quantityInput">
                                     <button type="button" class="increasement"onclick="increment()">+</button>
                                  </div>
                                  <button type="button" class="proceedCart">PROCEED TO CART</button>
                             <div>
                              <div class="social-icon">
                                  <i class="fa fa-facebook"></i>
                                  <i class="fa  fa-twitter"></i>
                                  <i class="fa fa-youtube"></i>
                                  <i class="fa fa-whatsapp"></i>
                             </div>
                          </div>
                         
                      </div>
                  </div>
                  
              </div>
          </div>
      </div>`;
      myModals.insertAdjacentElement('afterbegin', modals);
      document.body.style.overflowY = 'hidden';
      const closeModal = document.querySelector('.closeModal');
      closeModal.addEventListener('click', closeModalFunction);
    });

    function closeModalFunction(e) {
      if (e.target) {
        const modalDiv =
          target.parentElement.parentElement.parentElement.parentElement;
        modalDiv.remove();
        temp = [];
        const backdrop = document.querySelector('.modal-backdrop');
        backdrop.remove();
        document.body.style.overflowY = 'visible';
      }
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Ecaspe') {
        closeModalFunction();
      }
    });

    const proceedBtn = document.querySelector('.proceedCart');
    proceedBtn.addEventListener('click', proceedToCart);
  }
} catch (error) {
  console.log(error);
}

function increment() {
  let InputValue = document.getElementsByClassName('quantityInput')[0];
  InputValue.value = Number.parseInt(InputValue.value) + 1;
}
function decrement() {
  let InputValue = document.getElementsByClassName('quantityInput')[0];
  InputValue.value = Number.parseInt(InputValue.value) - 1;
  if (isNaN(InputValue.value) || InputValue.value === 0) {
    InputValue.value = 1;
  }
}
//Procedd to cart
function proceedToCart(event) {
  const btn =
    event.target.parentElement.parentElement.parentElement.parentElement;
  const id = btn.getElementsByClassName('productId')[0].innerHTML;
  const productImage = btn.getElementsByClassName('bigImage')[0].src;
  const productName = btn.getElementsByClassName('productName')[0].innerHTML;
  const productPrice = btn
    .getElementsByClassName('productPrice')[0]
    .innerHTML.replace('₦', '');
  const productQuantity = btn.getElementsByClassName('quantityInput')[0].value;

  //this one add the item to local storage
  const item = new Cart(
    productImage,
    productName,
    productPrice,
    productQuantity
  );
  LocalCart.addToLocalCart(id, item);
  alertModalFunction();
}
function alertModalFunction() {
  const modalAlert = document.querySelector('.modalAlert');
  if (modalAlert.classList) {
    modalAlert.classList.add('modalOpen');
  }
  const modalOverly = document.querySelector('.modelOverly');
  modalOverly.style.display = 'block';
}
function alertModalCancelFunction() {
  const modalCancelIcon = document.querySelectorAll('#modalCancel');
  modalCancelIcon.forEach((btn) => {
    btn.addEventListener('click', function (event) {
      if (event.target) {
        const modelDiv = event.target.parentElement.parentElement.parentElement;
        modelDiv.classList.remove('modalOpen');
        modelDiv.style.transition = 'opacity .15s linear';
      }
      const modalOverly = document.querySelector('.modelOverly');
      modalOverly.style.display = 'none';
    });
  });
}
function removeModalOverly() {
  const modalRemove = document.querySelector('.modelOverly');
  modalRemove.addEventListener('click', () => {
    const modalAlert = document.querySelector('.modalAlert');
    modalAlert.classList.remove('modalOpen');
    modalRemove.style.display = 'none';
  });
}
removeModalOverly();
alertModalCancelFunction();

function updateCartUi() {
  const cartItem = LocalCart.getLocalItemFromCart('localItem');
  const showCartItem = document.querySelector('.cart-display');
  showCartItem.innerHTML = '';
  if (cartItem === null) return;
  let count = 0;
  let priceTotal = 0;
  let subTotal;
  for (const [key, value] of cartItem.entries()) {
    const displayCart = document.createElement('div');
    displayCart.classList.add('show-cart-item');
    let Quality = value.productQuantity;
    let price = Math.round(value.productPrice.replace(',', '') * 100) / 100;
    let totalPrice = Math.round(Quality * price * 100) / 100;
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
  `;
    displayCart
      .getElementsByClassName('bi-x-lg')[0]
      .addEventListener('click', () => {
        LocalCart.removeItemFromLocalCart(key);
      });
    showCartItem.insertAdjacentElement('afterbegin', displayCart);
  }
  if (count > 0) {
    const showCartIcon = document.querySelector(':root');
    showCartIcon.style.setProperty('--after-content', `"${count}"`);
    const subTotalPrice = document.getElementsByClassName('subTotalPrice')[0];
    subTotalPrice.innerText = `₦${subTotal}`;
    const emptyCartMessage =
      document.getElementsByClassName('emptyCartMessage')[0];
    emptyCartMessage.style.display = 'none';
    showCartItem.style.display = 'block';
  } else {
    const showCartIcon = document.querySelector(':root');
    showCartIcon.style.setProperty('--after-content', `"${count}"`);
    const subTotalPrice = document.getElementsByClassName('subTotalPrice')[0];
    subTotalPrice.innerText = '₦0.00';
    showCartItem.style.display = 'none';
    const emptyCartMessage =
      document.getElementsByClassName('emptyCartMessage')[0];
    emptyCartMessage.style.display = 'block';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  updateCartUi();
});
