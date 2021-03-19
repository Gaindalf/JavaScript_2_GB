Vue.component('cart', {
    props: ["items", 'all-sum'],
    template: `<div class="formForBasket-item">
                    <div class="ifBasketEmpty invisible">
                        <h3 class="ifBasketEmptyH3">Корзина пустая</h3>
                    </div>
                    <div v-for="item of items" :key="item.id_product"
                    :product="item">
                    <h3>{{item.product_name}}</h3>
                    <p>{{ item.price }} </p>
                    <input type='number' min=1 :value="item.quantity" size=6 @click="$emit('show-sum')"
                        v-model="item.quantity">
                    <p class="getAllPrice">{{ item.quantity*item.price }}</p>
                    <button class="delete-btn" @click="$emit('delete-item', item)">X</button>
                    </div>
                    <div class='sum'>
                    <p id="allSum">Общая сумма: {{ allSum }} $</p>
                    <button class="buy-btn-in-basket">Купить</button>
                </div>
                </div>`
});
