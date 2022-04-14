<template>
  <v-container>
    <v-row align="stretch">
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
  </v-container>
</template>

<script>
import { get, call, dispatch } from 'vuex-pathify';

export default {
  computed: {
    products: get('product/products'),
    orders: get('cart/orders'),
  },

  mounted() {
    this.getAllProducts();
  },

  methods: {
    getAllProducts: call('product/getAllProducts'),
    setOrders(product) {
      dispatch('cart/setOrders', [...this.orders, product]);
    },
  },
}
</script>
