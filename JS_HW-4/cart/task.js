document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
  
    products.forEach(product => {
      const quantityControlDec = product.querySelector('.product__quantity-control_dec');
      const quantityControlInc = product.querySelector('.product__quantity-control_inc');
      const quantityValue = product.querySelector('.product__quantity-value');
  
      quantityControlDec.addEventListener('click', () => {
        let quantity = parseInt(quantityValue.textContent);
  
        if (quantity > 1) {
          quantity--;
          quantityValue.textContent = quantity;
        }
      });
  
      quantityControlInc.addEventListener('click', () => {
        let quantity = parseInt(quantityValue.textContent);
        quantity++;
        quantityValue.textContent = quantity;
      });
  
      const addToCartButton = product.querySelector('.product__add');
  
      addToCartButton.addEventListener('click', () => {
        const productId = product.dataset.id;
        const quantity = parseInt(quantityValue.textContent);
  
        addProductToCart(productId, quantity);
      });
    });
  
    const addProductToCart = (productId, quantity) => {
      const cartProduct = document.querySelector('.cart__product[data-id="' + productId + '"]');
      const product = document.querySelector('.product[data-id="' + productId + '"]');
  
      if (cartProduct) {
        const cartProductCount = cartProduct.querySelector('.cart__product-count');
        const currentQuantity = parseInt(cartProductCount.textContent);
        cartProductCount.textContent = currentQuantity + quantity;
      } else {
        const cartProductTemplate = createCartProductTemplate(product, productId, quantity);
        document.querySelector('.cart__products').insertAdjacentHTML('beforeend', cartProductTemplate);
      }
  
      saveCartProductsToLocalStorage();
      moveToCartAnimation(product);
    };
  
    const createCartProductTemplate = (product, productId, quantity) => {
      const productImageSrc = product.querySelector('.product__image').getAttribute('src');
      return `
        <div class="cart__product" data-id="${productId}">
          <img class="cart__product-image" src="${productImageSrc}">
          <div class="cart__product-count">${quantity}</div>
        </div>
      `;
    };
  
    const saveCartProductsToLocalStorage = () => {
      const cartProducts = document.querySelectorAll('.cart__product');
      const cartProductsArray = [];
  
      cartProducts.forEach(cartProduct => {
        const productId = cartProduct.dataset.id;
        const cartProductCount = cartProduct.querySelector('.cart__product-count').textContent;
  
        const productData = {
          id: productId,
          count: cartProductCount
        };
        cartProductsArray.push(productData);
      });
  
      localStorage.setItem('cartProducts', JSON.stringify(cartProductsArray));
    };
  });
    const moveToCartAnimation = (product) => {
        const productImage = product.querySelector('.product__image');
    
        const productImageCopy = productImage.cloneNode(true);
        const productImagePosition = productImage.getBoundingClientRect();
    
        productImageCopy.classList.add('product-shadow');
        productImageCopy.style.position = 'fixed';
        productImageCopy.style.top = productImagePosition.top + 'px';
        productImageCopy.style.left = productImagePosition.left + 'px';
        productImageCopy.style.width = productImagePosition.width + 'px';
        productImageCopy.style.transition = 'all 0.5s ease-out';
    
        document.body.appendChild(productImageCopy);
    
        const cartPosition = document.querySelector('.cart').getBoundingClientRect();
    
        setTimeout(() => {
            productImageCopy.style.top = cartPosition.top + 'px';
            productImageCopy.style.left = cartPosition.left + 'px';
            productImageCopy.style.width = '50px';
            productImageCopy.style.height = '50px';
        }, 100);
    
        setTimeout(() => {
            productImageCopy.remove();
        }, 600);
    };




const restoreCartProductsFromLocalStorage = () => {
    const cartProductsArray = JSON.parse(localStorage.getItem('cartProducts'));

    if (cartProductsArray) {
        cartProductsArray.forEach(productData => {
            const productId = productData.id;
            const cartProductCount = productData.count;

            const product = document.querySelector('.product[data-id="' + productId + '"]');
            const cartProducts = document.querySelector('.cart__products');

            const cartProductTemplate = `
                <div class="cart__product" data-id="${productId}">
                    <img class="cart__product-image" src="${product.querySelector('.product__image').getAttribute('src')}">
                    <div class="cart__product-count">${cartProductCount}</div>
                    <div class="cart__product-remove">x</div>
                </div>
            `;
            cartProducts.insertAdjacentHTML('beforeend', cartProductTemplate);
        });
    }
}; 




restoreCartProductsFromLocalStorage();
