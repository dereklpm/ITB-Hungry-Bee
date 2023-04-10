<template>
  <div class="cart-counter">
    <button class="decrement" @click="decreaseQuantity">
      <i class="fas fa-minus"></i>
    </button>
    <input type="number" v-model="counter" @input="updateQuantity" />
    <button class="increment" @click="increaseQuantity">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "CartItemCounter",
  props: {
    quantity: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      counter: this.quantity
    }
  },
  methods: {
    increaseQuantity() {
      this.counter++;
      this.emitUpdate();
    },
    decreaseQuantity() {
      if (this.counter > 1) {
        this.counter--;
        this.emitUpdate();
      }
    },
    updateQuantity() {
      this.emitUpdate();
    },
    emitUpdate() {
      this.$emit('update:quantity', this.counter);
    }
  }
};
</script>