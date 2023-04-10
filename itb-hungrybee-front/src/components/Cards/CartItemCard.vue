<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.image" :alt="item.name" />
    </div>
    <div class="item-details">
      <h3>{{ item.name }}</h3>
      <div class="item-counter">
        <CartItemCounter :quantity="item.quantity" @update:quantity="updateQuantity" />
      </div>
    </div>
    <div class="item-total">
      <i class="fas fa-trash-alt" @click="removeItem"></i>
      <h3>${{ itemPrice }}</h3>
    </div>
  </div>
</template>

<script>
import CartItemCounter from "./CartItemCounter.vue"

export default {
  name: "CartItemCard",
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    },
  },
  data() {
    return {
      itemPrice: this.item.price * this.item.quantity
    }
  },
  methods: {
    removeItem() {
      this.$store.commit('cart/removeProduct', this.item);
      this.$emit('updateTotal')
    },
    updateQuantity(quantity) {
      this.itemPrice = this.item.price * quantity;
      this.$store.commit('cart/updateQuantity', { product: this.item, quantity });
      this.$emit('updateTotal');
    }
  },
};
</script>

<style>
.cart-item {
  display: flex;
  margin-bottom: 20px;
}

.item-image {
  width: 20%;
  height: 150px;
  margin-right: 20px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  width: 60%;
  position: relative;
}

.item-details h3 {
  margin-top: 0;
}

.item-counter {
  display: inline-flex;
  align-items: center;
  margin-top: 10px;
  position: absolute;
  bottom: 0;
}

.item-counter button {
  background-color: #f44336;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.item-counter input {
  width: 50px;
  padding: 5px 0;
  margin: 0 10px;
  text-align: center;
}

.categories h4,
.tags h4 {
  margin-top: 10px;
}

.categories ul,
.tags ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.categories ul li,
.tags ul li {
  display: inline-block;
  margin-right: 10px;
  font-size: 14px;
  color: #666;
}

button {
  margin-top: 10px;
  background-color: #f44336;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.item-total {
  position: relative;
}

.item-total removeBtn {
  background-color: #f44336;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 0;
}

.item-total h3 {
  position: absolute;
  bottom: 0;
  right: 0;
}

@media screen and (max-width: 600px) {}
</style>