const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        search: "",
        catalogUrl: '/catalogData.json',
        basketgUrl: '/getBasket.json',
        productsinbasket: [],
        products: [],
        filtered: [],
        imgCatalog: 'img/Keyboard.jpg',
        show: false,
        value: 1,
        getAllprice: 1,
        allSum: 0,
        numberOfItemsInBasket: 0,
        visible: false
    },
    methods:
    {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.visible = true;
                })
        },
        addProduct(product) {
            if (this.productsinbasket.length == 0) {
                const block = document.getElementsByClassName("ifBasketEmpty")[0];
                const buyBtn = document.getElementsByClassName("buy-btn-in-basket")[0];
                block.classList.add('invisible');
                buyBtn.classList.remove('invisible');
            }
            let match = 0;
            this.productsinbasket.forEach(el => {
                if (el.id_product == product.id_product) {
                    match++;
                };
            });
            if (match == 0) {
                this.productsinbasket.push({
                    id_product: product.id_product,
                    product_name: product.product_name,
                    price: product.price,
                    quantity: 1
                });
            } else {
                alert("товар уже в корзине");
            }
        },
        searchItem(value) {
            const regexp = new RegExp(value, 'i');
            filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(element => {
                const block = document.getElementById(element.id_product);
                if (!filtered.includes(element)) {

                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            });
            const search = document.getElementsByClassName("ifNothingFound")[0];
            if (filtered.length == 0) {
                search.classList.remove('invisible');
            } else {
                search.classList.add('invisible');
            }
        },
        deleteItemFromBasket(product) {
            for (let i = 0; i < this.productsinbasket.length; i++) {
                if (this.productsinbasket[i].id_product == product.id_product) {
                    this.productsinbasket.splice(i, 1);
                }
            }
            if (this.productsinbasket.length == 0) {
                const block = document.getElementsByClassName("ifBasketEmpty")[0];
                const buyBtn = document.getElementsByClassName("buy-btn-in-basket")[0];
                block.classList.remove('invisible');
                buyBtn.classList.add('invisible');
            }
            this.AllSum();
        },
        AllSum() {
            this.allSum = 0;
            this.productsinbasket.forEach(el => {
                this.allSum += +el.quantity * +el.price;
            });
            //return this.allSum;
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        this.getJson(`${API + this.basketgUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.productsinbasket.push(el);
                }
            });

    }
})
