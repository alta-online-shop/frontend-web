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
    <v-menu
      top
      :close-on-click="true"
      v-if="isAuthenticated"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>fas fa-user</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="gotoTransaction" >
          <v-list-item-icon>
            <v-icon>fas fa-history</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            Transaksi
          </v-list-item-title>
        </v-list-item>

        <v-list-item @click="gotoLogin" >
          <v-list-item-icon>
            <v-icon>fas fa-sign-in</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            Logout
          </v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>
    <v-btn icon @click="gotoLogin" v-else>
      <v-icon>fas fa-sign-in</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
import { get, call } from 'vuex-pathify';

export default {
  data: () => ({c: 0}),
  computed: {
    isAuthenticated: get('auth/isAuthenticated'),
    orders: get('cart/orders'),
    ordersLength() {
      return this.orders.length;
    },
  },
  methods: {
    logout: call('auth/logout'),
    gotoHome() {
      this.$router.push({ name: 'Home' });
    },
    gotoOrder() {
      this.$router.push({ name: 'Order' });
    },
    gotoTransaction() {
      this.$router.push({ name: 'Transaction' });
    },
    async gotoLogin() {
      await this.logout();
      this.$router.push({ name: 'AuthLogin' });
    },
  },
};
</script>
