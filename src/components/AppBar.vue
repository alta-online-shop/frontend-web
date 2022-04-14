<template>
  <v-app-bar app color="deep-purple accent-4" dark>
    <v-toolbar-title>
      <h3 @click="gotoHome" style="cursor: pointer">AltaShop</h3>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="gotoOrder">
      <v-badge
        bottom
        left
        overlap
        :content="`${ordersLength}`"
        :value="ordersLength > 0"
      >
        <v-icon>fas fa-shopping-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { get } from 'vuex-pathify';

export default {
  data: () => ({c: 0}),
  computed: {
    orders: get('cart/orders'),
    ordersLength() {
      return this.orders.length;
    },
  },
  methods: {
    gotoHome() {
      this.$router.push({ name: 'Home' });
    },
    gotoOrder() {
      this.$router.push({ name: 'Order' });
    },
  },
};
</script>
