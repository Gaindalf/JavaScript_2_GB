Vue.component('cart', {
    props: ["items", 'all-sum'],
    template: `<div class="formForBasket-item">
                    
                    <div v-for="item of items" :key="item.id_product"
                    :product="item" class="vForFormInBasket" >
                    <h3>{{item.product_name}}</h3>
                    <p>{{ item.price }} $</p>
                   
                        <p>{{ item.quantity }} шт.</p>
                        <button class="arrowButton" @click="$emit('more-quantity', item)"><img src="img/arrowUp.jpg" class="arrowImg"></button>
                        <button class="arrowButton" @click="$emit('less-quantity', item)"><img src="img/arrowDown.jpg" class="arrowImg"></button>
                   
                    <p class="getAllPrice">{{ item.quantity*item.price }} $</p>
                    <button class="delete-btn" @click="$emit('delete-item', item)">X</button>
                    </div>
                    <div class='sum'>
                    <p id="allSum">Общая сумма: {{ allSum }} $</p>
                    <button class="buy-btn-in-basket">Купить</button>
                </div>
                </div>`
});
