<template>
  <div class="container">
    <div v-if="!showOrder">
      Order Not Found
    </div>
    <div v-else>
      <div class="order">
        <div class="order-header">
          <h2>Order #{{ orderData.orderId }}</h2>
        </div>
        <div></div>
        <div class="process-bar">
          <table>
            <tr>
              <td v-for="(p, i) in steps" class="stepTD">
                <div>
                  <div class="step" :class="{ 'active': i + 1 <= currentStep }">{{ p }}</div>
                  <div class="line" :class="{ 'active': i + 1 < currentStep }"></div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="order-body">
        <div class="order-details">
          <div class="order-detail">
            <i class="fas fa-clock"></i>
            <span class="label">Delivery Time:</span>
            <span class="value">{{ deliveryTime }}</span>
          </div>
          <div class="order-detail">
            <i class="fas fa-map-marker-alt"></i>
            <span class="label">Delivery Place:</span>
            <span class="value">{{ orderData.address }}</span>
          </div>
          <div class="order-detail">
            <i class="fas fa-dollar-sign"></i>
            <span class="label label-width">Total:</span>
            <span class="value">{{ orderData.basket.totalPrice }}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="order-items">
          <h3>Order Items:</h3>
          <ul class="item-list">
            <li v-for="item in orderData.cart" :key="item.id">
              <img :src="item.image" alt="item image" class="item-image">
              <div class="item-details">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-quantity">&nbsp;&nbsp;&nbsp;x{{ item.quantity }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "OrdersPage",
  data() {
    return {
      showOrder: false,
      orders: null,
      currentStep: 1,
      steps: [
        'Waiting restaurant receive order',
        'Restaurant preparing',
        'Delivery boy picked up the order',
        'Finished',
      ],
    };
  },
  computed: {
    deliveryTime() {
      if (!this.orderData)
        return "";
      const deliveryTime = this.orderData.cart[0].minDeliverTime; // Assuming only one item in the cart
      const deliveryTimeInMinutes = deliveryTime; // Extract the delivery time in minutes
      const targetTime = new Date();
      targetTime.setMinutes(targetTime.getMinutes() + deliveryTimeInMinutes); // Calculate the target time by adding the delivery time to the current time
      return targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format the target time as HH:mm
    },
  },
  methods: {
    ...mapActions({
      trackOrder: 'order/trackOrder',
    }),
    trackOrderData() {
      console.log("trackOrderData: " + this.$route.params.orderId);
      this.trackOrder(this.$route.params.orderId)
        .then(response => {
          console.log("trackOrderData")
          console.log(response)
          this.orderData = response.data.data;
          this.currentStep = this.orderData.step;

          console.log(this.orderData)
          this.showOrder = true;
        })
    }
  },
  mounted() {
    this.trackOrderData();
  },
};
</script>

<style lang="scss">
.order,
.order-body,
.order-items,
.order-summary {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.stepTD {
  width: 18%;
  text-align: center;
}

.stepTD .step {
  background-color: #ddd;
  height: 50px;
  padding: 10px;
}

.stepTD .step.active {
  background-color: #4CAF50;
  color: white;
}

.process-step {
  position: relative;
  flex: 1;
  text-align: center;

  &:not(:last-child) {
    margin-right: 10px;
  }
}

.step-name {
  position: relative;
  z-index: 1;
  display: inline-block;
  background-color: white;
  padding: 0 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-transform: capitalize;
}

.step-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ccc;
  z-index: 0;
  transform: translateY(-50%);
}

.step-line.active {
  background-color: green;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}

.order-details {
  flex-basis: 50%;
  margin-right: 20px;

  .order-detail {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 20px;

    i {
      width: 25px;
      color: silver
    }

    .label {
      font-size: 20px;
      font-weight: bold;
      color: grey;
      margin-right: 10px;
    }

    .value {
      font-size: 20px;
      font-weight: bold;
      color: black;
    }
  }
}

.order-items {
  flex-basis: 50%;

  h3 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .item-list {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .item-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        margin-right: 20px;
        border-radius: 10px;
      }

      .item-details {
        flex: 1;

        .item-name {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .item-quantity {
          font-size: 20px;
          color: #666;
        }
      }
    }
  }
}

.order-summary {
  flex-basis: 100%;
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;

  .order-detail {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    i.fas {
      width: 25px;
    }

    .label {
      font-size: 16px;
      font-weight: bold;
      color: #666;
      margin-right: 10px;
    }

    .value {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
}
</style>