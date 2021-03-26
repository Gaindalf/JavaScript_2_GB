Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products">
                    <div class="ifNothingFound invisible">
                        <h3 class="ifNothingFoundH3">Ничего не найдено!</h3>
                    </div>
                    <product v-for="item of products"
                    :key="item.id_product"
                    :img="item.img_name"
                    :product="item"
                    :id="item.id_product"></product>
                    </div>`
});

Vue.component('product', {
    props: ['product', 'img'],

    template: `<div class="product-item">
                    <div class="desc">
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ product.price }}</p>
                        <button class="buy-btn" @click="$parent.$emit('add-product', 
                        product)">Купить</button>
                    </div>
                    <img :src=img  alt="some img">
                </div>`
});