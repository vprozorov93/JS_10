const cartList = document.querySelector('.cart__products')


function addToCart(event) {
    const product = event.target.closest('.product')
    const cartProducts = Array.from(cartList.querySelectorAll('.cart__product'))
    const productInCartProducts = cartProducts.filter((element) => {
        return element.getAttribute('data-id') === product.getAttribute('data-id')
    })[0]

    if (productInCartProducts) {
        let countCartProduct = productInCartProducts.querySelector('.cart__product-count')
        countCartProduct.textContent = Number(countCartProduct.textContent) + Number(product.querySelector('.product__quantity-value').textContent)
        return
    } else {
        const divProduct = document.createElement('div')
        divProduct.classList.add('cart__product')
        divProduct.setAttribute('data-id', product.getAttribute('data-id'))
        
        const imgProductImage = document.createElement('img')
        imgProductImage.classList.add('cart__product-image')
        imgProductImage.setAttribute('src', product.querySelector('.product__image').getAttribute('src'))
        
        const divProductCount = document.createElement('div')
        divProductCount.classList.add('cart__product-count')
        divProductCount.textContent = product.querySelector('.product__quantity-value').textContent
        
        divProduct.appendChild(imgProductImage)
        divProduct.appendChild(divProductCount)

        cartList.appendChild(divProduct)
    }
}

function changeCount(event) {
    const count = event.target.closest('.product__quantity-controls').querySelector('.product__quantity-value')
    if (event.target.classList.contains('product__quantity-control_dec')) {
        count.textContent = Number(count.textContent) - 1
        if (Number(count.textContent) < 0) {
            count.textContent = 0
        }
    } else {
        count.textContent = Number(count.textContent) + 1
    }
}

document.addEventListener('click', event=>{
    if (event.target.classList.contains('product__add')) {addToCart(event)}
})

document.addEventListener('click', event=>{
    if (event.target.classList.contains('product__quantity-control')) {changeCount(event)}
})