<template>
  <div class="about">
    <h3>Overview</h3>
    <button v-on:click="getData()">Get Data</button>
    <b-row>
      <b-row class="table-container">
        <table class="table-style">
          <tr class="table-header">
            <th></th>
            <th>Erfasst</th>
            <th>Id</th>
            <th>Name</th>
            <th>Location</th>
            <th>Zustand</th>
            <th>Beschreibung</th>
            <th>Verpackung</th>
            <th>Zubehör</th>
            <th>Order Id</th>
          </tr>
          <td class="table-time-col">
            <tr class="table-row" v-for="product in checkedProducts">
              <b-button variant="outline-primary" v-on:click="deleteProduct(product.id)">Delete</b-button>
            </tr>
          </td>
          <td class="table-time-col">
            <tr class="table-row" v-for="product in checkedProducts[0]">{{ product.erfasst }}</tr>
          </td>
          <td class="table-id-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.id }}</tr>
          </td>
          <td class="table-title-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.title }}</tr>
          </td>
          <td class="table-location-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.location }}</tr>
          </td>
          <td class="table-condition-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.zustand }}</tr>
          </td>
          <td class="table-description-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.zustandsbeschreibung }}</tr>
          </td>
          <td class="table-package-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.originalverpackung }}</tr>
          </td>
          <td class="table-access-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.zubehoer }}</tr>
          </td>
          <td class="table-access-col">
            <tr class="table-row" v-for="product in checkedProducts">{{ product.orderId }}</tr>
          </td>
        </table>
      </b-row>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import firebase from 'firebase';
import Home from './Home';

let oR = Home.props.orderRef


export default {
  name: 'Home',
  components: {},
  data() {
    return {
      products: '',
      storeArray: [],
      checkedProducts: [0]
    }
  },
  mounted() {


  },
  methods: {
    getData: function () {
      console.log("inside getAllCheckedProducts")
      //this.getMaxOrderIdFromFirebase();
      /**
       oR.once("value", function (snapshot) {
        // console.log(snapshot.val());
        console.log('Firebase call fired')
      } , function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }).then (response => {
        // console.log(response.node_.children_.root_.value.value_);
        this.setOrderId(response.node_.children_.root_.value.value_);
      })
       */


      let arr = [];

      for (let i = 0; i < 2; ++i) {
        console.log("Tabelle " + i + " gefetcht");
        let a = i + 1;
        this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-2v2-checked-' + a + '/Tabellenblatt1?').then((response) => {
          // console.log(response.data);
          // console.log(this.checkedProducts);
          arr[i] = response.data;

          console.log("arr 0: " + arr[i] +  arr[0])


        }).catch((error) => {
          console.log(error)
        })
      }

      let combined = [].concat(arr[0], arr[1]);
      console.log(arr[1]);


    }
  }
}
</script>
