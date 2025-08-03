<template>
    <div class="login-box ui container">
      <h2>Login</h2>
      <form class="ui form" @submit.prevent="handleLogin">
        <div class="field">
          <label>Username</label>
          <input v-model="username" placeholder="Enter username" required />
        </div>
        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Enter password" required />
        </div>
        <button class="ui green button" type="submit">Login</button>

        <div v-if="error" class="ui red message">{{ error }}</div>
      </form>
      <p style="margin-top: 1em">
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', this.username);
      this.flash('✅ Login successful!', 'success');

      this.$router.push('/intro');
    } catch (err) {
      this.flash(err.message || 'Login failed', 'error');
    }
    }
  }
};
</script>
<style scoped>
.h2{
  text-align: center ;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-top: 250px;
}
</style>
