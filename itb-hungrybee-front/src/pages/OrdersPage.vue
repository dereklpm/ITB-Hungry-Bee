<template>
  <div class="container">
    <h2 class="orders-page__heading">Order</h2>
    <div class="orders-page__content">
      <div class="orders-page__left-column">
        <h3 class="orders-page__content-title">Deliver Location</h3>
        <div class="orders-page__content-item">
          <table>
            <tr v-if="!editAddress" class="orders-page__content-address">
              <td>
                <p>{{ address }}</p>
              </td>
              <!-- <td><button class="btnEditAddr" @click="editAddress = true">Edit</button></td> -->
            </tr>
            <tr v-else class="orders-page__content-address">
              <td><input id="address" v-model="newAddress" /></td>
              <!-- <td><button class="btnConfirmAddr" @click="updateAddress">Confirm</button></td> -->
            </tr>
          </table>
        </div>
        <h3 class="orders-page__content-title">Payment Method</h3>
        <div class="orders-page__content-item">
          <div>
            <table>
              <tr>
                <td v-if="payment.type == 'Visa'" rowspan="2">
                  <img src="../assets/visa.png" alt="Visa" />
                </td>
                <td v-else-if="payment.type == 'MasterCard'" rowspan="2">
                  <img src="../assets/mastercard.png" alt="MasterCard" />
                </td>
                <td class="cardType">{{ payment.type }}</td>
              </tr>
              <tr>
                <td>{{ "Ending " + getlastfour(payment.cardnum) }}</td>
              </tr>
            </table>
            <!-- <div v-for="(card, index) in payment" :key="index">
              <p>{{ card.cardNumber }}</p>
              <p>{{ card.cardHolderName }}</p>
              <p>{{ card.expiryDate }}</p>
              <p>{{ card.cvv }}</p>
            </div> -->
          </div>
        </div>
      </div>
      <div class="orders-page__right-column">
        <div class="orders-page__cart">
          <h3>Cart</h3>
          <div v-for="(product, index) in cart" :key="index">
            <p>{{ product.name }} x {{ product.quantity }}</p>
            <p>{{ product.price }}</p>
          </div>
          <hr />
          <BasketCard :subTotal="subTotal" :deliveryFee="deliveryFee" :serviceFee="serviceFee" :totalPrice="totalPrice" />
        </div>
      </div>
    </div>
    <button class="orders-page__submit-button" @click="submit">Submit Order</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "OrdersPage",
  computed: {
    ...mapState("cart", ["cartCount", "cart"]),
    ...mapGetters("auth", ["getUser"]),
  },
  data() {
    return {
      userData: null,
      editAddress: false,
      address: "",
      newAddress: "",
      payment: {},
      subTotal: 0,
      deliveryFee: 0,
      serviceFee: 0,
      totalPrice: 0,
      selectedCard: ""
    };
  },
  methods: {
    ...mapActions({
      submitOrder: "order/submitOrder"
    }),
    ...mapMutations("user", ["setUserAddress", "setNewPaymentMethod"]),
    ...mapMutations("cart", ["clearCart"]),
    updateAddress() {
      this.setUserAddress(this.newAddress);
      this.newAddress = "";
      this.editAddress = false;
    },
    addPaymentMethod() {
    },
    updateTotal() {
      this.subTotal = this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      this.deliveryFee = 20;
      this.serviceFee = this.subTotal * 0.025;
      this.totalPrice = this.subTotal + this.deliveryFee + this.serviceFee;
    },
    updateUserAddress() {
      this.address = this.userData.address;
    },
    updateUserpayment() {
      this.payment = this.userData.payment;
      console.log("payment info: ")
      console.log(this.payment);
      // this.selectedCard = this.payment.find(p => p.default == true).cardNumber;
    },
    getlastfour(cardNumber) {
      return cardNumber ? cardNumber.slice(-4) : "";
    },
    submit() {
      var payload = {
        userId: this.getUser.id,
        cart: this.cart,
        address: this.address,
        payment: this.selectedCard,
        basket: {
          subTotal: this.subTotal,
          deliveryFee: this.deliveryFee,
          serviceFee: this.serviceFee,
          totalPrice: this.totalPrice,
        }
      }

      this.submitOrder(payload)
        .then((response) => {
          console.log("submit order: ")
          console.log(response);
          this.clearCart();
          this.$router.push(`/trackOrder/${response.data.data.orderId}`);
        });
    }
  },
  mounted() {
    this.userData = this.getUser;
    this.updateTotal();
    this.updateUserAddress();
    this.updateUserpayment();
  },
};
</script>

<style lang="scss">
.orders-page {
  &__heading {
    font-size: 28px;
    margin-bottom: 10px;
  }

  &__content {
    display: flex;
    justify-content: space-between;
  }

  &__left-column {
    flex: 0 1 65%;
  }

  &__right-column {
    flex: 0 1 33%;
  }

  &__submit-button {
    width: 100%;
  }

  &__content-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__content-item {
    background: $color-white;
    border: 1px solid $color-grey-lightest;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
  }


}

.btnEditAddr,
.btnConfirmAddr {
  background: none;
  border: none;
  color: $color-primary;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.cardType {
  font-size: 20px;
  font-weight: 700;
}
</style>