<template>
  <div class="home">
    <HelloWorld msg=""/>
    <b-row class="p-element-layout" style="margin-left: auto; margin-right: auto">
      <button class="btn-back"><b><b>ZURÜCK</b></b></button>
    </b-row>
    <b-row class="p-element-layout" style="margin-left: auto; margin-right: auto">
      <label
          style="min-width: 100%; margin-left: auto; margin-right: auto;">
        <input class="input-top" placeholder="LPN Code einscannen">
      </label>
    </b-row>

    <b-row class="p-element-layout" style="margin-left: auto; margin-right: auto">
      <b-col class="card c-left" style="border-radius: 5px">
        <div class="p-title"><h5>Productname</h5></div>
        <div class="spacer-s"></div>
        <div class="p-price">€ 29.48</div>
        <div class="spacer-m"></div>
        <div class="tab-container">
          <b-tabs>
            <b-tab class="img-tab" title="1" active>
              <div class="p-images"><img class="p-image-item"
                                         src="https://morfalto.sirv.com/Images/31Lw%2BzKJUgL._AC_SX355_.jpg"
                                         alt="image1">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="2" active>
              <div class="p-images"><img class="p-image-item"
                                         src="https://morfalto.sirv.com/Images/31Lw%2BzKJUgL._AC_SX355_.jpg"
                                         alt="image2">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="3" active>
              <div class="p-images"><img class="p-image-item"
                                         src="https://morfalto.sirv.com/Images/31Lw%2BzKJUgL._AC_SX355_.jpg"
                                         alt="image3">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="4" active>
              <div class="p-images"><img class="p-image-item"
                                         src="https://morfalto.sirv.com/Images/31Lw%2BzKJUgL._AC_SX355_.jpg"
                                         alt="image4">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="5" active>
              <div class="p-images"><img class="p-image-item"
                                         src="https://morfalto.sirv.com/Images/31Lw%2BzKJUgL._AC_SX355_.jpg"
                                         alt="image5">
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </b-col>
      <b-col class="card c-right" style="border-radius: 5px">
        <div class="step-title"><h5>Location</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click=""><b>Dealbox</b></button>
        <button class="prime-btn btn-yellow" v-on:click=""><b>Checkbox</b></button>
        <button class="prime-btn btn-red" v-on:click=""><b>Stockbox</b></button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">

.spacer-s {
  height: 10px;
}

.spacer-m {
  height: 30px;
}

.spacer-l {
  height: 50px;
}

.p-element-layout {
  width: 80%;
  margin-top: 10px;
}

.card {
  background-color: white;
  padding: 20px 20px 20px 20px;
  min-width: 40%;
  max-width: 40%;
  height: fit-content;
  border-radius: 5px;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
}

.c-left {
  margin-right: 2.5%;
}

.c-right {
  margin-left: 2.5%;
}

.p-title {
  padding-left: 10px;
  text-align: left;
}

.p-price {
  padding-right: 10px;
  text-align: right;
  border-style: solid;
  border-width: 1px;
  border-color: #3ABEFF;
  border-radius: 10px 0 10px 0;
}

.p-images {
  padding-left: 10px;
  padding-right: 10px;
}

.p-image-item {
  width: auto;
  max-width: 250px;
  height: auto;
  max-height: 300px;
}

.tab-container {
  margin-left: auto;
  margin-right: auto;
}

.img-tab {
  padding: 20px 20px 20px 20px;
}

.prime-btn {
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border-width: 0;
  color: white;
  height: 45px;
}

.btn-green {
  background-color: #05D68F;
}

.btn-yellow {
  background-color: #FFAA01;
}

.btn-red {
  background-color: #FD3D71;
}

.search-bar {

}

.btn-back {
  border-width: 2px;
  border-style: solid;
  border-radius: 10px 0 10px 0;
  border-color: #3ABEFF;
  background-color: white;
  color: #3ABEFF;
  width: 100%;
  height: 45px;
  font-size: 18px;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
}

.btn-back:active {
  color: white;
  background-color: #3ABEFF;

}

.input-container {

}

.input-top {
  border-width: 2px;
  border-style: solid;
  border-radius: 10px 0 10px 0;
  border-color: #3ABEFF;
  background-color: white;
  color: #3ABEFF;
  font-size: 18px;
  height: 45px;
  min-width: 100%;
  padding: 10px 10px 10px 20px;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
}

.btn-input-top {
  position: absolute;
}
</style>
