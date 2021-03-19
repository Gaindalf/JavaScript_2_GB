Vue.component('search', {
    props: ['search'],
    data: function () {
        return { searchText: this.search }
    },
    template: ` <div class="search">
                    <form action="#" class="search-form">
                        <input type="text" class="search-field" v-model="searchText">
                        <button class="btn-search" type="submit" @click="onUserSearch">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                </div>`,
    methods: {
        onUserSearch: function () {
            this.$emit('usersearch', this.searchText);
        }
    }
});
