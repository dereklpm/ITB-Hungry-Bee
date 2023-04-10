<template>
  <div class="card" v-if="isRelatedCategory && isRelatedSearch">
    <div class="card__image" :style="{ 'background-image': 'url(' + image + ')' }">
      <span v-if="featured" class="card__featured">{{ featured }}</span>
    </div>
    <div class="card__body">
      <div>
        <div class="card__title">{{ title }}</div>
        <div class="card__count" v-if="isLogin" @click="addProduct()">
          <img class="card_count-shop" width="50" src="@/assets/product/icons/shopping_hover.svg" />
          <span v-if="counter" class="card__count-counter">{{ counter }}</span>
        </div>
      </div>
      <div class="card__text">
        <img src="@/assets/product/icons/clock.svg" />
        <p>{{ minTime + "-" + maxTime + " mins" }}</p>
        <span class="card__tag-dot">{{ cardTextDot }}</span>
        <p>{{ "$" + minSum + " delivery" }}</p>
      </div>
      <div class="card__text">
        <div class="ranking" v-if="ranking >= 4.5" style="color:green">
          <i class="fas fa-star"></i>
          <span class="value">&nbsp;{{ ranking }} Excellent</span>
        </div>
        <div class="ranking" v-else-if="ranking >= 4" style="color:rgb(0, 126, 138)">
          <i class="fas fa-star"></i>
          <span class="value">&nbsp;{{ ranking }} Good</span>
        </div>
        <div class="ranking" v-else>
          <i class="fas fa-star"></i>
          <span class="value">&nbsp;{{ ranking }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
    },
    image: {
      type: String,
      default: 'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
    },
    featured: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    counter: {
      type: Number,
      default: 0,
    },
    minTime: {
      type: Number,
      default: "",
    },
    maxTime: {
      type: Number,
      default: "",
    },
    minSum: {
      type: Number,
      default: "",
    },
    cardTextDot: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: () => [],
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    ranking: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: ""
    },
    searchProduct: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState("cart", ['cartCount', 'products']),
    isRelatedCategory() {
      return this.category == null || this.product.categories.some(c => c == this.category);
    },
    isRelatedSearch() {
      return this.searchProduct == null || this.product.name.toLowerCase().includes(this.searchProduct.toLowerCase());
    }
  },
  methods: {
    ...mapMutations("cart", ["addToCart"]),
    addProduct() {
      this.addToCart(this.product);
    }
  }
};
</script>

<style lang="scss">
.card {
  border: 1px solid $color-grey-lightest;
  border-radius: 16px;

  &__image {
    position: relative;
    height: 160px;
    border-radius: 16px 16px 0 0;
    background-size: cover;
  }

  &__featured {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    padding: 8px 16px;
    font-family: $base-font;
    font-weight: bold;
    font-size: 11px;
    color: $color-white;
    text-transform: uppercase;
    border-radius: 0 16px;
    background-color: $color-primary;
  }

  &__body {
    padding: 16px;

    div {
      display: flex;
      align-items: center;

      &:nth-child(1) {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  &__title {
    color: $color-dark;
    font-family: $base-font;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 6px;
  }

  &__count {
    position: relative;
    cursor: pointer;

    img:hover {
      src: url("../../assets/product/icons/shopping_hover.svg");
      // background-color: $color-primary;
    }

    &-shop {
      src: url("../../assets/product/icons/shopping_hover.svg");

    }

    &-counter {
      color: $color-white;
      position: absolute;
      top: -12px;
      right: 0;
      font-family: $base-font;
      font-size: 10px;
      line-height: 1;
      font-weight: bold;
      background-color: $color-primary;
      padding: 3px;
      min-width: 14px;
      text-align: center;
      border-radius: 6px;
    }
  }

  &__text {
    margin-bottom: 14px;

    p {
      color: $color-grey;
      font-family: $base-font;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      margin-left: 7px;
    }
  }

  &__tag {
    &-dot {
      width: 3px;
      height: 3px;
      background-color: $color-primary;
      border-radius: 50%;
      margin-left: 8px;
    }
  }

  &__tags {
    display: grid;
    grid-template-columns: auto;
    gap: 6px;
  }

  &__tag {
    color: $color-grey-dark;
    cursor: pointer;
    font-family: $base-font;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    padding: 4px 10px;
    background: $color-grey-lightest;
    border-radius: 100px;

    img {
      margin-right: 8px;
    }
  }
}
</style>
