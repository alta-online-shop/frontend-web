<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>

      <v-alert v-if="error" border="top" colored-border type="error" elevation="2">
        {{ errorMessage }}
      </v-alert>

      <v-form v-model="isValid" @submit.prevent.native="onLogin">

        <v-text-field
          v-model="user.email"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Password"
        ></v-text-field>

        <div class="text-center">
          <v-btn color="primary" @click="onLogin" :disabled="loading">Login</v-btn>
        </div>

      </v-form>

      <div class="mt-3 text-center">
        Belum memiliki akun?
        <router-link :to="{ name: 'AuthRegister' }">Register</router-link>
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
import { call, get } from 'vuex-pathify';

export default {
  data: () => ({
    isValid: false,
    errorMessage: '',
    user: {
      email: '',
      password: '',
    },
  }),
  computed: {
    loading: get('auth/loading'),
    error: get('auth/error'),
  },
  methods: {
    login: call('auth/login'),
    async onLogin() {
      try {
        await this.login(this.user);

        const route = { name: this.$route.query.next || 'Home' };
        if (this.$route.query.data) {
          route.query = { data: this.$route.query.data };
        }
        this.$router.push(route);
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
};
</script>
