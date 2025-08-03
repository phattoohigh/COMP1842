<template>
  <div class="intro-container">
    <h1>Welcome to the Vocab Builder app, {{ username }}!</h1>
    <p class="intro">
      Where your dreams take flight and reach the world
    </p>

    <p class="features">
       Add new words with translations in multiple languages<br />
       Edit and manage your word list anytime<br />
       Practice daily and track your learning progress<br />
       Clean interface, fast performance, and easy navigation
    </p>

    <p class="thankyou">
      We're excited to be part of your language journey. 
      <router-link to="/words">Let’s build your vocabulary together!</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    };
  },
  mounted() {
    this.username = localStorage.getItem('username') || 'Guest';
  }
};
</script>

<style scoped>
.intro-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
  font-family: 'Segoe UI', sans-serif;
}
h1 {
  font-size: 2em;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}
.intro {
  font-size: 1.1em;
  margin-bottom: 1rem;
}
.features {
  background: #f9f9f9;
  padding: 1rem;
  border-left: 5px solid #42b983;
  margin-bottom: 1rem;
}
.thankyou {
  font-style: italic;
  color: #555;
}
</style>
