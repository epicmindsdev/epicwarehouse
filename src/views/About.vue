<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-row>
      <table>
        <tr>
          <th>Erfasst</th>
          <th>Id</th>
          <th>Location</th>
          <th>Zustand</th>
          <th>Beschreibung</th>
          <th>Verpackung</th>
          <th>Zubehör</th>
        </tr>
        <tr>
          <td></td>
          <td>{{ this.products[0].location }}</td>
          <td>{{ this.products[0].zustand }}</td>
          <td>{{ this.products[0].zustandsbeschreibung }}</td>
          <td>{{ this.products[0].originalverpackung }}</td>
          <td>{{ this.products[0].zubehoer }}</td>
        </tr>
      </table>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      products: ''
    }
  },
  mounted() {
    const headers = {
      "Content-Type": "application/json"
    };
    this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/output/Tab', { headers }).then((response) => {
      console.log(response.data)
      this.products = response.data;
      console.log(this.product)
    })
  },
  methods: {
    getProductById: function (id) {
      console.log(id);

      this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-1v3-stammdaten/Tab?limit=1000&query_type=and&id=' + id).then((response) => {
        if (response.data.length === 1) {
          console.log(response.data)
          console.log("Daten in Stammdaten 1 gefunden")
          this.selectedProduct = response.data[0];
        }
      }).catch((error) => {
        console.log(error)
      })

      this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-1v3-stammdaten-2/Tab?limit=1000&query_type=and&id=' + id).then((response) => {
        if (response.data.length === 1) {
          console.log(response.data)
          console.log("Daten in Stammdaten 2 gefunden")
          this.selectedProduct = response.data[0];
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    pushSelectedProduct: function () {
      this.timeStamp = moment().format('DD.MM.YY HH:mm:ss');
      console.log(this.timeStamp)
      this.selectedProduct.location = this.currentLocation;
      this.selectedProduct.zustand = this.currentCondition;
      this.selectedProduct.zustandsbeschreibung = this.currentDescription;
      this.selectedProduct.originalverpackung = this.currentPackage;
      this.selectedProduct.zubehoer = this.currentAccess;
      this.selectedProduct.erfasst = this.timeStamp;
      const headers = {
        "Content-Type": "application/json"
      };
      axios.post("https://sheet2api.com/v1/V61drP5kTxut/output/Tab", this.selectedProduct, {headers})
          .then(response => console.log(response))
    }
  }
}
</script>
