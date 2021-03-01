const products = [
    { id: 1, title: 'Notebook', price: 2000, img: "img/Keyboard.jpg" },
    { id: 2, title: 'Mouse', price: 20, img: "img/Keyboard.jpg" },
    { id: 3, title: 'Keyboard', price: 200, img: "img/Keyboard.jpg" },
    { id: 4, title: 'Gamepad', price: 50, img: "img/Keyboard.jpg" },
];
//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<div class="product-item" style="background-image: url(${item.img});">
                <div><h3>${item.title}</h3></div>
                <div><p>${item.price}</p></div>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log("length " + productsList.length);
    for (i = 0; i < productsList.length; i++) {
        document.querySelector('.products').innerHTML += productsList[i];
    }
};

renderPage(products);