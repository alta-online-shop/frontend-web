<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form v-model="isValid">

        <v-text-field
          v-model="user.email"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Password"
        ></v-text-field>

        <div class="text-center">
          <v-btn color="primary">Login</v-btn>
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
export default {
  data: () => ({
    isValid: false,
    user: {
      email: '',
      password: '',
    },
  }),
};
</script>
