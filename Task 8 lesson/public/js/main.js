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
        visible: false,
        errorVisible: false
    },
    methods:
        {
            getJson(url) {
                return fetch(url)
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error);
                        this.errorVisible = true;
                    })
            },
            postJson(url, data) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        // console.log(error)
                        this.error.text = error;
                    })
            },
            putJson(url, data) {
                return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        // console.log(error);
                        this.$refs.error.setError(error);
                    })
            },
            deleteJson(url, data) {
                return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        // console.log(error);
                        this.$refs.error.setError(error);
                    })
            },
            addProduct(product) {

                let match = 0;
                this.productsinbasket.forEach(el => {
                    if (el.id_product == product.id_product) {
                        match++;
                    }
                    ;
                });
                if (match == 0) {

                    const prod = Object.assign({quantity: 1}, product);
                    this.postJson(`/api/cart`, prod)
                        .then(data => {
                            if (data.result === 1) {
                                this.productsinbasket.push(prod);
                            }
                        });
                } else {
                    alert("товар уже в корзине");
                }
                this.visible = false;
            },
            moreQuantity(product) {
                let find = this.productsinbasket.find(el => el.id_product === product.id_product);
                if (find) {
                    this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                        .then(data => {
                            if (data.result === 1) {
                                find.quantity++;
                            }
                        })
                }
                setInterval(this.AllSum, 500);
            },
            lessQuantity(product) {

                let find = this.productsinbasket.find(el => el.id_product === product.id_product);
                console.log(find.quantity);
                if (find.quantity != 1) {
                    this.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
                        .then(data => {
                            if (data.result === 1) {
                                find.quantity--;
                                if (find.quantity === 0) {
                                    find.quantity = 1;
                                }
                            }
                        })
                }
                setInterval(this.AllSum, 500);
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
                    if (this.productsinbasket[i].id_product === +product.id_product) {

                        this.deleteJson(`/api/cart/${this.productsinbasket[i].id_product}`, this.productsinbasket[i])
                            .then(data => {
                                if (data.result === 1) {
                                    this.productsinbasket.splice(i, 1)
                                }
                            })
                    }
                }
                if (this.productsinbasket.length == 0) {
                    const block = document.getElementsByClassName("ifBasketEmpty")[0];
                    const buyBtn = document.getElementsByClassName("buy-btn-in-basket")[0];
                    block.classList.remove('invisible');
                    buyBtn.classList.add('invisible');
                }
                    setInterval(this.AllSum, 500);
                this.visible = true;
            },
        AllSum() {
            this.getJson(`/api/cart`)
                .then(data => {
                    this.allSum = 0;
                    for (let elem of data.contents) {
                        this.allSum += +elem.quantity * +elem.price;
                    };
                });
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.productsinbasket.push(el);
                }
            });

    }
})
