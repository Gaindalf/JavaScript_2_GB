class Hamburger {
    constructor(size, topping, addition) {
        this.size = size;
        this.topping = topping;
        this.addition = addition;
        this.allPrice = [];
        this.allCal = [];
        this.goods = [];
        this._fetchProducts();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Маленький гамбургер', price: 50, calories: 20 },
            { id: 2, title: 'Большой гамбургер', price: 100, calories: 40 },
            { id: 3, title: 'Сыр', price: 10, calories: 20 },
            { id: 4, title: 'Салат', price: 20, calories: 5 },
            { id: 5, title: 'Картофель фри', price: 15, calories: 10 },
            { id: 6, title: 'Приправа', price: 15, calories: 0 },
            { id: 7, title: 'Майонез', price: 20, calories: 5 }
        ];
    }
    getSize() {
        let getSizeOfBurdeg = document.getElementsByName('burger');
        for (let i = 0; i < getSizeOfBurdeg.length; i++) {
            if (getSizeOfBurdeg[i].checked) {
                return this.goods[i].title;
            }
        }
    }
    getTopping() {
        let getToppingOfBurdeg = document.getElementsByName('topping');
        for (let i = 0; i < getToppingOfBurdeg.length; i++) {
            if (getToppingOfBurdeg[i].checked) {
                return this.goods[i + 2].title;
            }
        }
    }
    getAddition() {
        let idOfAdditions = [];
        let getAdditionOfBurdeg = document.getElementsByName('addition');
        for (let i = 0; i < getAdditionOfBurdeg.length; i++) {
            if (getAdditionOfBurdeg[i].checked) {
                idOfAdditions.push(this.goods[i + 5].title);
            } else {
                idOfAdditions.push(" ");
            }

        }
        if (idOfAdditions[0] == " " && idOfAdditions[1] != " ") {
            idOfAdditions[0] = idOfAdditions[1];
            idOfAdditions[1] = ' ';
        }
        return idOfAdditions;
    }
    addCalories(value) {
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].title == value) {
                this.allCal.push(this.goods[i].calories);
                return "(" + this.goods[i].calories + " Калорий)";
            }
        }
        return ' ';

    }
    addPrice(value) {
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].title == value) {
                this.allPrice.push(this.goods[i].price);
                return "Цена: " + this.goods[i].price;
            }
        }
        return ' ';
    }
    getAllprice() {
        let element = 0;
        for (let i = 0; i < this.allPrice.length; i++) {
            element += this.allPrice[i];
        }
        return element;
    }
    getAllCal() {
        let element = 0;
        for (let i = 0; i < this.allCal.length; i++) {
            element += this.allCal[i];
        }
        return element;
    }
}
class ViewOfOrder extends Hamburger {
    constructor(container = '.viewOfItems') {
        super();
        this.container = container;;
    }
    setItemsInWindow() {
        let form = document.querySelector(this.container);
        form.innerHTML = " ";
        this.allPrice = [];
        this.allCal = [];
        form.insertAdjacentHTML('beforeend', this.render());
    }
    render() {
        return `<div class="itemsInbasket"><p id="first">${this.getSize()} </p><p id="second">${this.addCalories(this.getSize())}</p><p id="third">${this.addPrice(this.getSize())}</p></div>
        <div class="itemsInbasket "><p id="first">${this.getTopping()} </p><p id="second">${this.addCalories(this.getTopping())}</p><p id="third">${this.addPrice(this.getTopping())}</p></div>
        <div class="itemsInbasket"><p id="first">${this.getAddition()[0]} </p><p id="second">${this.addCalories(this.getAddition()[0])}</p><p id="third">${this.addPrice(this.getAddition()[0])}</p></div>
        <div class="itemsInbasket"><p id="first">${this.getAddition()[1]} </p><p id="second">${this.addCalories(this.getAddition()[1])}</p><p id="third">${this.addPrice(this.getAddition()[1])}</p></div>
        <div class="itemsInbasket allSum"><p id="first"></p><p id="second">Всего калорий: ${this.getAllCal()}</p><p id="third allPrice">Сумма чека: ${this.getAllprice()}</p></div>
        `;
    }
}
let chooseYourFood = new ViewOfOrder;
chooseYourFood.getAddition();
chooseYourFood.setItemsInWindow();

