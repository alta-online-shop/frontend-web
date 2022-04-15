<template>
  <v-container>
    <v-alert v-if="orders.length <= 0" border="top" colored-border type="info" elevation="2">
      Order is empty!
    </v-alert>
    <v-card v-else>
      <v-card-text>
        <v-list-item v-for="order in orders" :key="order.ID" :id="`order-${order.ID}`" style="border-bottom: .3px solid #ddd">
          <v-list-item-content>
            <v-list-item-title class="label-name">{{ order.Name }}</v-list-item-title>
            <v-list-item-subtitle>Rp <b class="label-price">{{ order.Price }}</b></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon outlined @click="decQty(order.ID)">-</v-btn>
            <span style="font-size: 1.5rem; line-height: 2.3rem" class="mx-3 label-quantity">{{ order.qty }}</span>
            <v-btn icon outlined @click="incQty(order.ID)">+</v-btn>
          </v-list-item-icon>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Total Qty</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <span style="font-size: 2rem;" id="label-total-quantity">{{ total }}</span>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Total Bayar</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <span style="font-size: 2rem;" id="label-total-bayar">{{ totalBayar }}</span>
          </v-list-item-icon>
        </v-list-item>

      </v-card-text>
    </v-card>

    <div v-if="total > 0" class="text-right mt-3">
      <v-btn color="primary" large id="button-bayar" @click="gotoBayar">
        Bayar
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { dispatch, get } from 'vuex-pathify';

export default {
  computed: {
    orders: get('cart/orders'),
    isAuthenticated: get('auth/isAuthenticated'),
    total() {
      const total = this.orders.reduce((acc, curr) => {
        return acc + curr.qty;
      }, 0);
      return total;
    },
    totalBayar() {
      const total = this.orders.reduce((acc, curr) => {
        return acc + (curr.Price * curr.qty);
      }, 0);
      return total;
    },
  },
  methods: {
    incQty(id) {
      const orders = this.orders.map(order => {
        if (order.ID == id) {
          order.qty++;
        }
        return order;
      });
      dispatch('cart/setOrders', orders);
    },
    decQty(id) {
      const orders = this.orders.map(order => {
        if (order.ID == id) {
          order.qty--;
        }
        return order;
      }).filter(order => order.qty > 0);
      dispatch('cart/setOrders', orders);
    },
    gotoBayar() {
      if (this.isAuthenticated) {
        this.$router.push({ name: 'Transaction' });
      } else {
        this.$router.push({ name: 'AuthLogin', query: { next: 'Transaction', data: JSON.stringify(this.orders) } });
      }
    },
  },
};
</script>
