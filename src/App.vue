<template>

  <div id="app">
    <div class="login-container" v-show="this.loginView === 1 || this.loginView === 2">
      <div class="login-card" v-show="this.loginView === 1">
        <b-row><img class="logo" src="https://morfalto.sirv.com/Stock%20Logo.png" width="185px" height="26px"></b-row>
        <b-row class="spacer-m"></b-row>
        <b-row class="card-title">
          Username
        </b-row>
        <b-row><label>
          <b-input v-model="username"></b-input>
        </label></b-row>
        <div class="spacer-s"></div>
        <b-row class="card-title">
          Password
        </b-row>
        <b-row><label>
          <b-input type="password" v-model="password"></b-input>
        </label></b-row>
        <b-row>
          <b-button variant="outline-primary" style="margin-top: 15px; margin-left: auto; margin-right: auto"
                    v-on:click="login(username, password)">Submit
          </b-button>
        </b-row>

      </div>
      <span class="loader mid" v-show="this.loginView === 2"></span>
    </div>
    <div v-show="this.loginView === 3">
      <nav class="navigation">
        <b-row>
          <img class="logo" src="https://morfalto.sirv.com/Stock%20Logo.png" width="185px" height="26px">
          <router-link class="link" to="/">CHECK</router-link>
          <router-link class="link" to="/about">OVERVIEW</router-link>
        </b-row>
      </nav>
      <router-view/>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loginView: 1,
      username: '',
      password: ''
    }
  },
  methods: {
    login: function (username, password) {
      if (username === 'admin' && password === 'admin') {
        this.loginView = 2
        setTimeout(() => this.loginView = 3, 2000);
      }
    }

  }

}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: whitesmoke;
  height: 100vh;
}

.navigation {
  width: 100%;
  max-height: 100px;
  padding: 20px 10% 20px 10%;
  background-color: white;
  text-align: left;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
  border-radius: 0 0 15px 15px;
}

.logo {
  margin-right: 30px;
  margin-top: 5px;
}

.link {
  align-content: center;
  padding: 6px 10px 6px 10px;
  border-radius: 4px;
  border-color: lightblue;
  margin-left: 20px;
  color: black;
  border-width: 1px;
  border-style: solid;
  list-style-type: none;
}

.link:active {
  border-color: #3ABEFF;
}

.link:focus {
  border-color: #3ABEFF;
  color: black;
  text-decoration-line: none;
}

.link:hover {
  text-decoration-line: none;
}

.login-container {
  background-image: radial-gradient(circle, #74D2FF, #48C3FF, #1BB5FF);
  width: 100%;
  height: 100vh;
  background-color: lightskyblue;
  padding-top: 20vh;
  padding-bottom: 20vh;
}

.login-card {
  width: 350px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  box-shadow: 3px 3px 4px 2px rgba(43, 43, 43, 0.09);
  padding: 50px 95px 95px 95px;
}

.spacer-m {
  height: 6px;
}

.spacer-m {
  height: 10px;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #FFF;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left: 4px solid #1BB5FF;
  border-bottom: 4px solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.mid {
  margin-top: 25vh;

}
</style>
