function localStorageCart(size, buttons, productId, name, price, image) {

    if (!size) {
      console.error('No size assigned ❌ ');
      throw new Error('No size assigned ❌ ')
    }
  

    const carGet = localStorage.getItem('cart');
    const arrayCart = JSON.parse(carGet) || [];
    console.log(arrayCart);
    
    
    

    const mached = arrayCart.find((product) => product.productId === productId && product.size === size);

    if(mached) {
      mached.quantity++;
    } else {
      arrayCart.push({productId, size, name, price, image, quantity: 1});
    }
  
    const arrayJSON = JSON.stringify(arrayCart);
    localStorage.setItem('cart', arrayJSON);

    buttons.forEach((btn) => {
      btn.classList.remove('div__button--active');
    })
  
  
  }
  
  export default localStorageCart