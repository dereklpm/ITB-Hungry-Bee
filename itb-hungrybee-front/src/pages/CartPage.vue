<template>
  <div class="container">
    <h2 class="cart-page__heading"><span>Cart</span><button @click="clearCart">Clear cart</button></h2>


    <div class="cart-page__content">
      <h3 class="cart-page__content-title">Products list</h3>

      <div>
        <CartItemCard v-for="(item, index) in cart" :key="item.id" :item="item" :index="index"
          @updateTotal="updateTotal" />
      </div>
    </div>

    <div class="cart-page__footer">
      <BasketCard
        :subTotal="subTotal"
        :deliveryFee="deliveryFee"
        :serviceFee="serviceFee"
        :totalPrice="totalPrice"
      />
      <div>
        <button class="btnSubmitCart" @click="submitCart">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import BasketCard from "@/components/Cards/BasketCard.vue";
import { mapMutations, mapState } from "vuex";

export default {
    name: "CartPage",
    data() {
        return {
            subTotal: 0,
            deliveryFee: 0,
            serviceFee: 0,
            totalPrice: 0,
        };
    },
    computed: {
        ...mapState("cart", ["cart", "cartCount"]),
    },
    methods: {
        clearCart: function () {
            this.$store.commit("cart/clearCart");
            this.updateTotal();
            this.$router.push("/");
        },
        updateTotal() {
            this.subTotal = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            this.deliveryFee = 20;
            this.serviceFee = this.subTotal * 0.025;
            this.totalPrice = this.subTotal + this.deliveryFee + this.serviceFee;
        },
        submitCart() {
            this.$router.push("/orders");
        }
    },
    mounted() {
        this.updateTotal();
    },
    components: { BasketCard }
};
</script>

<style lang="scss">
.cart-page {
  &__heading {
    color: $color-dark;
    font-size: 20px;
    font-family: $base-font;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.1px;
    margin-bottom: 16px;
    position: relative;
    height: 30px;

    span {
      position: absolute;
      top: 0;
      left: 0;
    }

    button {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: 0px;
      // background: none;
      // border: none;
      // color: $color-primary;
      // font-size: 16px;
      font-family: $base-font;
      font-weight: 600;
      // letter-spacing: 0.1px;
      cursor: pointer;
    }
  }

  &__content {
    border: 1px solid $color-grey-lightest;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
  }

  &__content-title {
    color: $color-dark;
    font-family: $base-font;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.1px;
    margin-bottom: 16px;
  }
}

.btnSubmitCart {
  width: 100%
}
</style>
