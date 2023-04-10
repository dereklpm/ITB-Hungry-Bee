<template>
  <div class="container">
    <div v-if="!showOrder">
      Order Not Found
    </div>
    <div v-else>
      <div v-for="orderData in orders">
        <div class="order" @click="trackOrder(orderData.orderId)">
          <div class="order-header">
            <h2>Order #{{ orderData.orderId }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "AllOrdersPage",
  data() {
    return {
      showOrder: false,
      orders: null,
      steps: [
        'Waiting restaurant receive order',
        'Restaurant preparing',
        'Delivery boy picked up the order',
        'Finished',
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
  },
  methods: {
    ...mapActions({
      getOrders: 'order/getOrders',
    }),
    getAllOrders() {
      var userId = this.getUser.id;
      console.log("get all order: " + userId)
      var payload = {userId: userId};
      console.log(payload)
      this.getOrders(payload)
        .then(response => {
          this.orders = response.data.data;
          console.log(this.orders)

          this.showOrder = true;
        })
    },
    trackOrder(orderId){
      this.$router.push(`/trackOrder/${orderId}`)
    }
  },
  mounted() {
    this.getAllOrders();
  },
};
</script>

<style lang="scss">
.order{
  cursor:pointer;
}

.order:hover{
  background-color: #ccc;
}

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