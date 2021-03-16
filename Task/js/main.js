const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
        this.allSum();
    }
    allSum() {
        let SumOfAllItems = 0;
        for (let i = 0; i < this.goods.length; i++) {
            SumOfAllItems += this.goods[i].price;
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
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
    constructor(container = '.sum', sum) {
        this.sum = sum;
        this.container = container;
    }

    showAllPrice(sum) { // Выводит стоимость всех товаров
        this.sum = sum;
        const block = document.querySelector(this.container);
        if (block != null) {
            block.innerText = " ";
            block.insertAdjacentHTML('afterbegin', this.render())
        }
    }
    render() {
        return `<h3 class='allSum'>Общая сумма: ${this.sum}</h3>`;
    }
}

class ItemInBasket { // Создаёт вёрстку для товара для корзины и возвращает в класс ListOfItemsInBasket
    constructor(product, value, allSum) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.value = value = 1;
        this.allSum = allSum;
    }
    render(id) { // Создаёт и возвращает вёрстку (по образу метода render класса ProductItem)
        return `<div class="formForBasket-item">
            <h3>${this.title}</h3>
            <p class='forPriceInBasket'>${this.price}</p>
            <input type='number' min=1 max=10 value=${this.value} size=4 class="inputNumber" id=${id} data-price=${this.price}
            onclick='showBasket._getValueFromInput()'>
            <p id="getAllPrice_${id}" class='getAllPrice'>${this.allSum}</p>
            <button class='deleteButton' onClick='showBasket.deleteItem(${id})' id=${id}>Х</button>
        </div>`;
    }
}

class ListOfItemsInBasket {// Получает вёсртку из класса ItemInBasket, выводит на экран список товаров в корзине
    constructor(container = '.basket') {
        this.container = container;
        this.goodsInBasket = [];
        this._getItems()
            .then(data => { //data - объект js
                this.goodsInBasket = [...data.contents];
                this.render()
            });
    }
    _getItems() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    _getValueFromInput() {
        let sum = 0;
        if (this.goodsInBasket.length == 0) {
            let sumOfAllItemsInBasket = new SumOfAllItemsInBasket();
            sumOfAllItemsInBasket.showAllPrice(sum);
            console.log(sum);
        } else {
            for (let i = 0; i < this.goodsInBasket.length; i++) {
                this.value = document.getElementsByClassName('inputNumber')[i].value;
                let id = document.getElementsByClassName('inputNumber')[i].id;
                this.price = 0;
                for (let j = 0; j < this.goodsInBasket.length; j++) {
                    if (this.goodsInBasket[j].id_product == id) {
                        this.price = this.goodsInBasket[j].price;
                        this.allSum = this.value * this.price;
                        document.getElementById('getAllPrice_' + id).innerText = this.allSum;
                        sum += +document.getElementById('getAllPrice_' + id).innerText;
                    }
                }
            }
            let sumOfAllItemsInBasket = new SumOfAllItemsInBasket();
            sumOfAllItemsInBasket.showAllPrice(sum);
            console.log(sum);
        }
    }
    deleteItem(id) {
        console.log("Here " + id);
        for (let i = 0; i < this.goodsInBasket.length; i++) {
            console.log(this.goodsInBasket);
            if (this.goodsInBasket[i].id_product == id) {
                this.goodsInBasket.splice(i, 1);
                console.log(this.goodsInBasket);
            }
        }
        this.render();
    }
    render() { // Выводит на экран список товаров (по образу метода render класса ProductsList)
        const block = document.querySelector(this.container);
        if (block != null) {
            block.innerHTML = `<div class="formForBasket-item"><p>Название</p>
        <p>Стоимость</p>
        <p>Количество</p>
        <p>Сумма</p>
        <p></p>
        </div>`;
        }
        for (let product of this.goodsInBasket) {
            const productObj = new ItemInBasket(product);
            block.insertAdjacentHTML('beforeend', productObj.render(product.id_product));
        }
        this._getValueFromInput();
    }
}

let list = new ProductsList();
list.render();

let showBasket = new ListOfItemsInBasket();
showBasket.render();
