<template>
    <div class="register-box ui container">
      <h2>Register</h2>
      <form class="ui form" @submit.prevent="handleRegister">
        <div class="field">
          <label>Username</label>
          <input v-model="username" placeholder="Choose a username" required />
        </div>
        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="At least 6 characters" required />
        </div>
        <div class="field">
          <label>Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="Repeat your password" required />
        </div>
        <button class="ui green button" type="submit">Register</button>

        <div v-if="error" class="ui red message" style="margin-top: 10px;">{{ error }}</div>
      </form>

      <p style="margin-top: 1em">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      error: ''
    };
  },
  methods: {
    async handleRegister() {
      if (this.password.length < 6) {
        this.flash('❌ Password must be at least 6 characters', 'error');
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.flash('❌ Passwords do not match', 'error');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
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
        this.flash('🎉 Registration successful!', 'success');
        this.$router.push('/intro');
      } catch (err) {
        const message = err.message || 'Registration failed';

        if (message === 'Username already exists') {
        this.flash('❌ This username is already taken.', 'error');
        } else {
        this.flash(message, 'error');
        }
      }
    }
  }
};
</script>

<style scoped>
.register-box {
  margin-top: 200px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
</style>
