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
          <td class="table-col time">
            <tr class="table-row" v-for="product in combinedArr">
              <b-button variant="outline-primary" v-on:click="deleteProduct(product.id, product.orderId)">Delete
              </b-button>
            </tr>
          </td>
          <td class="table-col time">
            <tr class="table-row" v-for="product in combinedArr">{{ product.erfasst }}</tr>
          </td>
          <td class="table-col id">
            <tr class="table-row" v-for="product in combinedArr">{{ product.id }}</tr>
          </td>
          <td class="table-col title">
            <tr class="table-row" v-for="product in combinedArr">{{ product.title }}</tr>
          </td>
          <td class="table-col location">
            <tr class="table-row" v-for="product in combinedArr">{{ product.location }}</tr>
          </td>
          <td class="table-col condition">
            <tr class="table-row" v-for="product in combinedArr">{{ product.zustand }}</tr>
          </td>
          <td class="table-col description">
            <tr class="table-row" v-for="product in combinedArr">{{ product.zustandsbeschreibung }}</tr>
          </td>
          <td class="table-col package">
            <tr class="table-row" v-for="product in combinedArr">{{ product.originalverpackung }}</tr>
          </td>
          <td class="ttable-col access">
            <tr class="table-row" v-for="product in combinedArr">{{ product.zubehoer }}</tr>
          </td>
          <td class="table-col access">
            <tr class="table-row" v-for="product in combinedArr">{{ product.orderId }}</tr>
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
      combinedArr: [],
      checkedProducts: [],
      fetchedOrderId: ''
    }
  },
  mounted() {

    oR.once("value", function (snapshot) {
      // console.log(snapshot.val());
      console.log('Firebase call fired')
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }).then(response => {
      // console.log(response.node_.children_.root_.value.value_);
      this.setOrderId(response.node_.children_.root_.value.value_);
      console.log(this.fetchedOrderId)
    })


  },
  methods: {
    setOrderId: function (id) {
      this.fetchedOrderId = id;
    },

    getData: function () {
      console.log("inside getAllCheckedProducts")

      let arr = [];
      let arrLength = 0;
      this.combinedArr = [];

      for (let i = 1; i <= this.fetchedOrderId; ++i) {
        //console.log(this.fetchedOrderId)
        //console.log("Tabelle " + i + " gefetcht");
        this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-2v2-checked-' + i + '/Tabellenblatt1?').then((response) => {
          arr = response.data;
          arrLength = response.data.length;
        }).then((response) => {
          for (let l = 0; l < arrLength; ++l)
            this.combinedArr.push(arr[l])
        }).catch((error) => {
          console.log(error)
        })
        //console.log(this.combinedArr);
      }
    },

    deleteProduct: function (id, orderId) {
      this.axios.delete('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-2v2-checked-' + orderId + '/Tabellenblatt1?limit=1000&query_type=and&id=' + id).then((response) => {
        console.log(response)
        this.checkedProducts = response.data;
        console.log(id + " gelöscht")
        alert(id + " gelöscht")
      }).then((response) => {
        this.getData();
      }).catch((error) => {
        console.log(error)
      })
    },

  }
}
</script>
<style>

.table-container {

  margin-left: auto;
  margin-right: auto;
}

.table-style {
  max-width: 80%;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.table-header {
  text-align: center;
}

.table-col {
  max-height: 35px;
}

.time{
  max-width: 150px;
}

.id {
  max-width: 150px;
}

.title {
  max-width: 200px;
}

.location {
  max-width: 100px;
}

.condition {
  max-width: 100px;
}

.description {
  max-width: 150px;
}

.package {
  max-width: 100px;
}

.access {
  max-width: 100px;
  padding: 5px 5px 5px 5px;
  background-color: white;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
}

tr {
  white-space: nowrap;
  text-align: center;
}

.table-row {
  height: 45px;
}

</style>
