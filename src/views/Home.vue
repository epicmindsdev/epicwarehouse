<template>
  <div class="home">
    <HelloWorld msg=""/>
    <b-row class="p-details" style="margin-left: auto; margin-right: auto">
      <b-col class="card-left">wjdjdjdjedjedjejdejdiejdijeidjiwejdewdjewndhkwbgcjvacguvguvacuhbewchbweucbvewbzibebizcbewicbhwbachjlwbchbewh
      </b-col>
      <b-col class="card-left">dd</b-col>
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

.home{

}

.p-details {
  max-width: 80%;
  margin-top: 10px;
}

.card-left {
  background-color: white;
  max-width: 40%;
  height: fit-content;
  margin-right: 2.5%;
}

.card-right {
  background-color: white;
  max-width: 40%;
  height: fit-content;
  margin-left: 2.5%;
}
</style>
