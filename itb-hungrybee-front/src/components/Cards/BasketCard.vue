<template>
  <table class="basket">
    <tr>
      <td>Subtotal:</td>
      <td>{{ subTotal.toFixed(2) }}</td>
    </tr>
    <tr>
      <td>Delivery Fee</td>
      <td>{{ deliveryFee.toFixed(2) }}</td>
    </tr>
    <tr>
      <td>Service Fee</td>
      <td>{{ serviceFee.toFixed(2) }}</td>
    </tr>
    <tr>
      <td>Total:</td>
      <td>{{ totalPrice.toFixed(2) }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "BasketCard",
  props: {
    subTotal: Number,
    deliveryFee: Number,
    serviceFee: Number,
    totalPrice: Number,
  },
};
</script>

<style lang="scss">
table.basket {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
  font-weight: 700;

  td {
    text-align: left;
    padding: 8px;
  }

  td:last-child {
    text-align: right;
  }
}
</style>
