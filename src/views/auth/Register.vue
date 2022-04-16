<template>
  <v-card>
    <v-card-title>Register</v-card-title>
    <v-card-text>

      <v-alert v-if="error" border="top" colored-border type="error" elevation="2">
        {{ errorMessage }}
      </v-alert>

      <v-form v-model="isValid">

        <v-text-field
          v-model="user.fullname"
          label="Nama Lengkap"
        ></v-text-field>


        <v-text-field
          v-model="user.email"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Password"
        ></v-text-field>

        <div class="text-center">
          <v-btn color="primary" @click="onRegister" :disabled="loading">Register</v-btn>
        </div>

      </v-form>

      <div class="mt-3 text-center">
        Sudah memiliki akun?
        <router-link :to="{ name: 'AuthLogin' }">Login</router-link>
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
import { call, get } from 'vuex-pathify';

export default {
  data: () => ({
    isValid: false,
    user: {
      fullname: '',
      email: '',
      password: '',
    },
  }),
  computed: {
    loading: get('auth/loading'),
    error: get('auth/error'),
  },
  methods: {
    register: call('auth/register'),
    async onRegister() {
      try {
        await this.register(this.user);
        this.$router.push({ name: 'AuthLogin' });
      } catch (error) {
        this.errorMessage = error;
      }
    },

  },
};
</script>
