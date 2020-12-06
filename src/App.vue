<template>
  <div id="app">
    <nav class="navigation">
      <img class="logo" src="https://morfalto.sirv.com/Stock%20Logo.png" width="200px" height="auto">
      <router-link class="link" to="/">Product check</router-link> |
      <router-link class="link" to="/about">Overview</router-link>
    </nav>
    <router-view/>
  </div>
</template>

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
  padding: 30px 10%;
  background-color: white;
  text-align: left;
  box-shadow: 1px 2px 3px 1px rgba(43,43,43,0.09);
}

.logo {
  margin-right: 30px;
}

.link {
  align-content: center;
  padding: 20px 20px 20px 20px;
}

</style>
