<template>
  <div class="about">
    <b-row></b-row>
    <b-row style="margin: auto">
      <b-button variant="outline-primary" v-on:click="getData()"
                style="margin: 30px auto 20px; border-radius: 70px; padding: 10px 10px 10px 10px"><img
          src="https://morfalto.sirv.com/blue_web-pict-30.png_64.png?w=27" width="27" height="26"></b-button>
      <b-row class="table-container" v-show="combinedArr.length !== 0">

        <table class="table-style">
          <tr class="table-header">
            <th class="table-col time"></th>
            <th class="table-col time">Erfasst</th>
            <th class="table-col id">Id</th>
            <th class="table-col title">Name</th>
            <th class="table-col location">Location</th>
            <th class="table-col condition">Zustand</th>
            <th class="table-col description">Beschreibung</th>
            <th class="table-col package">Verpackung</th>
            <th class="table-col access">Zubehör</th>
            <th class="table-col access">Order Id</th>
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
          <td class="table-col access">
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
import Apps from '@/App';
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
      fetchedOrderId: '',
    }
  },
  mounted() {

    oR.once("value", function (snapshot) {
      // console.log(snapshot.val());
      console.log('Firebase call fired')
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }).then(response => {
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
        this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-2v2-checked-' + i + '/Tabellenblatt1?').then((response) => {
          arr = response.data;
          arrLength = response.data.length;
        }).then((response) => {
          for (let l = 0; l < arrLength; ++l) {
            this.combinedArr.push(arr[l])
          }
          console.log(this.combinedArr)
        }).catch((error) => {
          console.log(error)
        })
      }
    },

    deleteProduct: function (id, orderId) {
      this.axios.delete('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-2v2-checked-' + orderId + '/Tabellenblatt1?limit=1000&query_type=and&id=' + id).then((response) => {
        console.log(response)
        console.log(id + " gelöscht")
      }).then((response) => {
        this.getData();
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style>

.table-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.table-style {
  max-width: 80%;
  font-size: 8px;

}

.table-header {
  text-align: center;
}

.table-col {
  background-color: white;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
  padding: 35px 5px 20px 5px;
  text-align: center;
}

.time {
  max-width: 150px;
  padding-left: 15px;
  padding-right: 15px;
}

.id {
  max-width: 150px;
}

.title {
  max-width: 200px;
}

.location {
  max-width: 130px;
}

.condition {
  max-width: 100px;
}

.description {
  max-width: 100px;
}

.package {
  max-width: 100px;
}

.access {
  max-width: 100px;
}

tr {
  white-space: nowrap;
  text-align: left;
}

.table-row {
  min-height: 75px;
}

</style>
