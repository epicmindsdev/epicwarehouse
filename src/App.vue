<template>
  <div id="app">
    <nav class="navigation">
      <div class="dropdown">
        <button class="btn-outline-primary"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
          Dropdown button
        </button>
        <div class="dropdown-menu"
             aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">
            <router-link class="link" to="/">Product check</router-link>
          </a>
          <a class="dropdown-item" href="#">
            <router-link class="link" to="/about">Overview</router-link>
          </a>
          <a class="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div>

      <img class="logo" src="https://morfalto.sirv.com/Stock%20Logo.png" width="200px" height="auto">


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
  padding: 6px 6px 6px 6px;
  border-radius: 4px;
  border-color: white;
  margin-left: 10px;
  color: black;
  font-family: "Candara Light";
  border-width: 1px;
  border-style: solid;
}

.link:active {
  border-color: #3ABEFF;
}

.link:focus {
  border-color: #3ABEFF;
  color: black;
  text-decoration-line: none;
}

.m-md-2 {
  background-color: white;
  color: #FD3D71;
}

.dropdown-toggle::after {
  display: none;
}


</style>
