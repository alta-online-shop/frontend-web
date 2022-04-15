<template>
  <v-container>

    <v-row v-if="loading && !error">
      <v-col v-for="i in [1,2,3,4,5,6,7,8]" :key="i" cols="6" md="4" lg="3">
        <v-skeleton-loader
          type="article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-alert v-if="!loading && error" border="top" colored-border type="error" elevation="2">
      Can not get products!
    </v-alert>

    <v-row align="stretch" v-if="!loading && !error && products.length > 0">
      <v-col v-for="product in products" :key="product.ID" :id="product.ID" cols="6" md="4" lg="3">
        <v-card>
          <v-card-title class="product-title">
            {{ product.Name }}
          </v-card-title>
          <v-card-subtitle class="product-description">
            {{ product.Description }}&nbsp;
          </v-card-subtitle>

          <v-card-actions class="d-block">
            <div class="product-price text-center">
              Rp {{ product.Price }}
            </div>
            <div>
            <v-btn 
              class="button-beli" block small outlined color="primary"
              @click="setOrders(product)"
            >Beli</v-btn>

            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-if="!loading && !error && products.length <= 0" border="top" colored-border type="info" elevation="2">
      Products is empty!
    </v-alert>

  </v-container>
</template>

<script>
import { get, call, dispatch } from 'vuex-pathify';

export default {
  computed: {
    products: get('product/products'),
    loading: get('product/loading'),
    error: get('product/error'),
    orders: get('cart/orders'),
  },

  mounted() {
    this.getAllProducts();
  },

  methods: {
    getAllProducts: call('product/getAllProducts'),
    setOrders(product) {
      let orders = [];
      if (this.orders.map(order => order.ID).includes(product.ID)) {
        orders = this.orders.map(order => {
          if (order.ID == product.ID) {
            order.qty++;
          }
          return order;
        });
      } else {
        orders = [...this.orders, {
          ...product,
          qty: 1,
        }];
      }

      dispatch('cart/setOrders', orders);
    },
  },
}
</script>
