class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: "img/Keyboard.jpg" },
            { id: 2, title: 'Mouse', price: 20, img: "img/Keyboard.jpg" },
            { id: 3, title: 'Keyboard', price: 200, img: "img/Keyboard.jpg" },
            { id: 4, title: 'Gamepad', price: 50, img: "img/Keyboard.jpg" },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        console.log(document.querySelector(this.container));
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
            //            block.innerHTML += productObj.render();
            this.allSum();
        }
    }
    allSum() {
        let SumOfAllItems = 0;
        for (let i = 0; i < this.goods.length; i++) {
            SumOfAllItems += this.goods[i].price;
        }
        console.log("Стоимость всех продуктов: " + SumOfAllItems); // Сумма цен всех продуктов выводится в консоль
    }
}
class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;

    }
    render() {
        return `<div class="formForProduct-item">
         <div class="product-item">
             <div><h3>${this.title}</h3></div>
             <div><p>${this.price}</p></div>
             <button class="buy-btn">Купить</button>
         </div>
         <div class="forImg">
         <img src="${this.img}" id="imgOfCatalog">
         </div>
     </div>`
    }
}

class SumOfAllItemsInBasket { //Выводит стоимость всех товаров в корзине
    showAllPrice() { // Выводит стоимость всех товаров

    }
}

class ItemInBasket { // Создаёт вёрстку для товара для корзины и возвращает в класс ListOfItemsInBasket
    constructor(product) {

    }
    render() { // Создаёт и возвращает вёрстку (по образу метода render класса ProductItem)

    }
}

class ListOfItemsInBasket { // Получает вёсртку из класса ItemInBasket, выводит на экран список товаров в корзине
    render() { // Выводит на экран список товаров (по образу метода render класса ProductsList)

    }
}

let list = new ProductsList();
list.render();