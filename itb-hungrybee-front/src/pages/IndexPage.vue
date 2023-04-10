<template>
  <section>
    <div class="container">
      <div class="index__search">
        <BaseInput id="index__searchinput" placeholder="Dishes..." :value="searchProduct" type="search"
          @onInput="(val) => changeSearch(val)" @searchFunc="(val) => searchProductbyword(val)" />
      </div>

      <div class="category__list" v-if="isLoading">
        <CategoryCardSkeleton v-for="(_, index) in Array.from({ length: 6 }).fill(0)"
          :key="`categorySkeleton__${index}`" />
      </div>

      <div class="category__list" v-if="!isLoading">
        <CategoryCard v-for="(categoryCard, index) in categoryList" :key="`categoryCard__${index}`"
          :title="categoryCard.name" :image="categoryCard.image" :selected="categoryCard.id === selectedCategory"
          @onClick="() => clickCategory(categoryCard)" />
      </div>

      <!-- ============Product card=========== -->
      <div class="products__list" v-if="isLoading">
        <ProductCardSkeleton v-for="(_, index) in Array.from({ length: 6 }).fill(0)" :key="`productSkeleton__${index}`" />
      </div>

      <div class="products__list" v-if="!isLoading">
        <ProductCard v-for="(product) in productList" :key="`productCard__${product.id}`" :product="product"
          :image="product.image" :featured="product.featured" :title="product.name" :minTime="product.minDeliverTime"
          :maxTime="product.maxDeliverTime" :minSum="product.deliveryFee" :tags="product.tags" :ranking="product.ranking"
          :isLogin="isLogin" :category="selectedCategory" :searchProduct="searchProduct" />
      </div>
    </div>
  </section>
</template>

<script>

import client from "../api"
import { mapGetters } from "vuex";

export default {
  name: "IndexPage",
  data() {
    return {
      isLoading: false,
      categoryList: [],
      productList: [],
      selectedCategory: null,
      searchProduct: "",
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/isAuth",
    }),
  },
  methods: {
    changeSearch(val) {
      console.log("changeSearch")
      console.log(val)
      this.searchProduct = val;
    },
    searchProductbyword(val) {
      console.log("searchProduct")
      console.log(this.searchProduct)
      console.log(val)
      this.productList = this.productList.filter((product) => {
        return product.name.toLowerCase().includes(this.searchProduct.toLowerCase());
      });
    },
    loadData() {
      this.isLoading = true

      const promise1 = client.get('/api/product/list')
        .then((response) => {
          console.log("/api/product")
          console.log(response.data)
          this.productList = response.data.data;
        })

      const promise2 = client.get('/api/category/list')
        .then(({ data: { data = [] } = {} }) => {
          console.log("/api/categories")
          console.log(data)
          this.categoryList = data;
        })

      Promise.all([promise1, promise2])
        .finally(() => {
          this.isLoading = false
        })
    },
    clickCategory(categoryObject) {
      const { id } = categoryObject;

      if (this.selectedCategory === id) {
        this.selectedCategory = null
      } else {
        this.selectedCategory = id
      }
    }
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss">
.deals {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 32px;
  }
}

.category {
  &__list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 5px;
    margin-bottom: 20px;
  }
}

.products {
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin-bottom: 100px;
  }
}

@media screen and (max-width: 768px) {
  .deals {
    &__list {
      grid-template-columns: 1fr;
    }
  }

  .category {
    &__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .products {
    &__list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
