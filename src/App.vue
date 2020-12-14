<template>
  <div id="app">
    <nav class="navigation">

      <b-row>
      <img class="logo" src="https://morfalto.sirv.com/Stock%20Logo.png" width="270px" height="auto">

          <router-link class="link" to="/">CHECK</router-link>
          <router-link class="link" to="/about">OVERVIEW</router-link>

      </b-row>


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
  max-height: 100px;
  padding: 20px 10% 20px 10%;
  background-color: white;
  text-align: left;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
}

.logo {
  margin-right: 30px;
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

</style>
