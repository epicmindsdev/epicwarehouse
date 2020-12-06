<template>
  <div class="home">
    <!--<HelloWorld msg=""/>-->
    <!-- setting box values -->
    <label class="box-link deal">{{ currentDealBox }} <input class="box-input deal" v-model="currentDealBoxValue" placeholder="Ändern"><button class="box-input-enter" v-on:click="setCurrentDealBox(currentDealBoxValue)"><img src="https://morfalto.sirv.com/back.png?w=128&h=17"></button></label>
    <label class="box-link check">{{ currentCheckBox }} <input class="box-input check" v-model="currentCheckBoxValue" placeholder="Ändern"><button class="box-input-enter" v-on:click="setCurrentCheckBox(currentCheckBoxValue)"><img src="https://morfalto.sirv.com/back.png?w=128&h=17"></button></label>
    <label class="box-link stock">{{ currentStockBox }} <input class="box-input stock" v-model="currentStockBoxValue" placeholder="Ändern"><button class="box-input-enter" v-on:click="setCurrentStockBox(currentStockBoxValue)"><img src="https://morfalto.sirv.com/back.png?w=128&h=17"></button></label>
  <!-- back button -->
    <b-row class="p-element-layout" v-show="this.viewState !== 1" style="margin-left: auto; margin-right: auto">
      <button class="btn-back" v-on:click="changeToPreviousViewState()"><b><b>ZURÜCK</b></b></button>
    </b-row>
    <!-- ID search bar -->
    <b-row class="p-element-layout" v-show="this.viewState === 1" style="margin-left: auto; margin-right: auto">
      <label
          style="min-width: 100%; margin-left: auto; margin-right: auto;">
        <input class="input-top" v-model="id" v-on:keydown.enter="getProductById(id)" placeholder="LPN Code einscannen">
      </label>
    </b-row>
    <!-- product check -->
    <b-row class="p-element-layout" style="margin-left: auto; margin-right: auto">
      <!-- ProductDetails -->
      <b-col class="card c-left" v-show="this.viewState !== 6" style="border-radius: 5px">
        <div class="p-title"><h5>{{ this.selectedProduct.name }}</h5></div>
        <div class="spacer-s"></div>
        <div class="p-price">€ {{ this.selectedProduct.price }}</div>
        <div class="spacer-m"></div>
        <div class="tab-container">
          <b-tabs>
            <b-tab class="img-tab" title="1" active>
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.image1
                                         alt="image1">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="2" active>
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.image2
                                         alt="image2">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="3" active>
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.image3
                                         alt="image3">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="4" active>
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.image4
                                         alt="image4">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="5" active>
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.image5
                                         alt="image5">
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </b-col>
      <!-- Location -->
      <b-col class="card c-right" v-show="this.viewState === 1" style="border-radius: 5px">
        <div class="step-title"><h5>Location</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click="setCurrentLocation(currentDealBox)" :disabled="currentDealBox === ''"><b> <a v-show="currentDealBox === ''">Dealbox eingeben</a> {{ currentDealBox }}</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentLocation(currentCheckBox)" :disabled="currentCheckBox === ''"><b> <a v-show="currentCheckBox === ''">Checkbox eingeben</a> {{ currentCheckBox }}</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentLocation(currentStockBox)" :disabled="currentStockBox === ''"><b> <a v-show="currentStockBox === ''">Stockbox eingeben</a> {{ currentStockBox }}</b></button>
      </b-col>
      <!-- Condition -->
      <b-col class="card c-right" v-show="this.viewState === 2" style="border-radius: 5px">
        <div class="step-title"><h5>Zustand</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click="setCurrentCondition('1000')"><b>Neu</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentCondition('3000')"><b>Gebraucht</b></button>
      </b-col>
      <!-- Description -->
      <b-col class="card c-right" v-show="this.viewState === 3" style="border-radius: 5px">
        <div class="step-title"><h5>Zustandsbeschreibung</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click="setCurrentDescription('Neuwertig')"><b>Neuwertig</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentDescription('Leichte Gebrauchsspuren')"><b>Leichte Gebrauchsspuren</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentDescription('Kleine Kratzer')"><b>Kleine Kratzer</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentDescription('Starke Gebrauchsspuren')"><b>Starke Gebrauchsspuren</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentDescription('Grosse Kratzer')"><b>Grosse Kratzer</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentDescription('Nicht auf Funktion überprüft')"><b>Nicht auf Funktion überprüft</b></button>
        <input class="prime-btn custom-input" v-model="currentCustomDescription" placeholder="Eingeben">
        <button class="prime-btn btn-submit" v-on:click="setCurrentDescription(currentCustomDescription)"><b>ÜBERNEHMEN</b></button>
        <div class="prime-btn custom-output">{{ this.currentDescription }}</div>
        <button class="prime-btn btn-delete" v-on:click="deleteCurrentDescription()"><b>LÖSCHEN</b></button>
        <button class="prime-btn btn-submit" v-on:click="changeToNextViewState(4)" :disabled="this.currentDescription === ''"><b>WEITER</b></button>
      </b-col>
      <!-- Package -->
      <b-col class="card c-right" v-show="this.viewState === 4" style="border-radius: 5px">
        <div class="step-title"><h5>Originalverpackung</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click="setCurrentPackage('Neuwertig')"><b>Neuwertig</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentPackage('Leicht beschädigt')"><b>Leicht beschädigt</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentPackage('Stark beschädigt')"><b>Stark beschädigt</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentPackage('Nicht vorhanden')"><b>Nicht vorhanden</b></button>
      </b-col>
      <!-- Accessories -->
      <b-col class="card c-right" v-show="this.viewState === 5" style="border-radius: 5px">
        <div class="step-title"><h5>Zubehör vollständig</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click="setCurrentAccess('Neuwertig')"><b>Neuwertig</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentAccess('Leichte Gebrauchsspuren')"><b>Leichte Gebrauchsspuren</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentAccess('Kleine Kratzer')"><b>Kleine Kratzer</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentAccess('Starke Gebrauchsspuren')"><b>Starke Gebrauchsspuren</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentAccess('Grosse Kratzer')"><b>Grosse Kratzer</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentAccess('Nicht auf Funktion überprüft')"><b>Nicht auf Funktion überprüft</b></button>
        <input class="prime-btn custom-input" v-model="currentCustomAccess" placeholder="Eingeben">
        <button class="prime-btn btn-submit" v-on:click="setCurrentAccess(currentCustomAccess)"><b>ÜBERNEHMEN</b></button>
        <div class="prime-btn custom-output">{{ this.currentAccess }}</div>
        <button class="prime-btn btn-delete" v-on:click="deleteCurrentAccess()"><b>LÖSCHEN</b></button>
        <button class="prime-btn btn-submit" v-on:click="changeToNextViewState(6)" :disabled="this.currentAccess === ''"><b>WEITER</b></button>
      </b-col>
      <!-- Confirmation -->
      <b-col class="card" v-show="this.viewState === 6" style="border-radius: 5px">
        <div class="step-title"><h5>Bestätigen</h5></div>
        <div class="spacer-s"></div>
        <table>
          <tr><th>Id</th><th>Location</th><th>Zustand</th><th>Beschreibung</th><th>Verpackung</th><th>Zubehör</th></tr>
          <tr><td>{{  }}</td><td>{{  }}</td><td>{{  }}</td><td>{{  }}</td><td>{{  }}</td><td>{{  }}</td></tr>
        </table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      viewState: 1, // 1: Location
      id: '',
      currentDealBoxValue: '',
      currentDealBox: '',
      currentCheckBoxValue: '',
      currentCheckBox: '',
      currentStockBoxValue: '',
      currentStockBox: '',
      selectedProduct: '',
      currentLocation: '',
      currentCondition: '',
      currentDescription: '',
      currentDescriptionValue: '',
      currentCustomDescription: '',
      currentPackage: '',
      currentAccess: '',
      currentAccessValue: '',
      currentCustomAccess: '',
      currentArrayDescription: [],
      currentArrayAccess: []
    }
  },
  methods: {
    getProductById: function (id) {
      console.log(id);
      this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-1v3-stammdaten/Tab?limit=1000&query_type=and&id=' + id).then((response) => {
        console.log(response.data)
        this.selectedProduct = response.data[0];
      })
    },
    setCurrentDealBox: function (dealBox) {
      if (dealBox !== "") {
        this.currentDealBox = "DEALBOX " + dealBox;
        this.currentDealBoxValue = "";
        console.log(this.currentDealBox)
      }
    },
    setCurrentCheckBox: function (checkBox) {
      if (checkBox !== "") {
        this.currentCheckBox = "CHECKBOX " + checkBox;
        this.currentCheckBoxValue = "";
        console.log(this.currentCheckBox)
      }
    },
    setCurrentStockBox: function (stockBox) {
      if (stockBox !== "") {
        this.currentStockBox = "STOCKBOX " + stockBox;
        this.currentStockBoxValue = "";
        console.log(this.currentStockBox)
      }
    },
    changeToNextViewState: function (state) {
      this.viewState = state;
    },
    changeToPreviousViewState: function () {
      this.viewState = this.viewState - 1;
    },
    setCurrentLocation: function (location) {
      this.currentLocation = location;
      this.changeToNextViewState(2); // 2: Condition
      console.log("Location: " + this.currentLocation + " | View State: " + this.viewState)
    },
    setCurrentCondition: function (condition) {
      this.currentCondition = condition;
      this.changeToNextViewState(3); // 3: Description
      console.log("Zustand: " + this.currentCondition + " | View State: " + this.viewState)
    },
    setCurrentDescription: function (description) {
      if (description !== '') {
        this.currentDescriptionValue = "";
        this.currentArrayDescription.push(description);
        for (var i = 0; i < this.currentArrayDescription.length; i++) {
          if (this.currentArrayDescription[i] != null) {
            this.currentDescriptionValue = this.currentDescriptionValue + this.currentArrayDescription[i] + ", ";
          }
        }
        this.currentDescription = this.currentDescriptionValue.slice(0, -2);
        this.currentCustomDescription = "";
      }
      console.log("Beschreibung: " + this.currentDescription)
    },
    deleteCurrentDescription: function () {
      this.currentDescription = "";
      this.currentArrayDescription = [];
    },
    setCurrentPackage: function (pack) {
      this.currentPackage = pack;
      this.changeToNextViewState(5)
    },
    setCurrentAccess: function (access) {
      if (access !== '') {
        this.currentAccessValue = "";
        this.currentArrayAccess.push(access);
        for (var i = 0; i < this.currentArrayAccess.length; i++) {
          if (this.currentArrayAccess[i] != null) {
            this.currentAccessValue = this.currentAccessValue + this.currentArrayAccess[i] + ", ";
          }
        }
        this.currentAccess = this.currentAccessValue.slice(0, -2);
        this.currentCustomAccess = "";
      }
      console.log("Beschreibung: " + this.currentDescription)
    },
    deleteCurrentAccess: function () {
      this.currentAccess = "";
      this.currentArrayAccess = [];
    }
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

.box-link {
  padding: 10px 10px 10px 10px;
  height:52px;
  width: 240px;
  align-items: center;
  border-radius: 7px;
  background-color: white;
  margin: 10px 5px 0 5px;
  box-shadow: 1px 2px 3px 1px rgba(43,43,43,0.09);
}

.deal {
  border-width: 1px;
  border-color: #05D68F;
  border-style: solid;
}

.check {
  border-width: 1px;
  border-color: #FFAA01;
  border-style: solid;
}

.stock {
  border-width: 1px;
  border-color: #FD3D71;
  border-style: solid;
}

.box-input {
  width: 45px;
  text-align: center;
  font-size: 10px;
  height: auto;
  padding-top: 10px;
  padding-bottom: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: #3ABEFF;
  border-radius: 4px;
  margin-left: 5px;
}

.box-input-enter {
  border-width: 0;
  background-color: white;
  width: 45px;
  text-align: center;
  font-size: 10px;
  height: 32px;
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
  font-size: 18px;
}

.prime-btn:disabled {
  opacity: 0.6;
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

.btn-delete {
  background-color: white;
  border-width: 2px;
  border-style: solid;
  border-color: #FD3D71;
  color: #FD3D71;
}

.btn-submit {
  background-color: white;
  border-width: 2px;
  border-style: solid;
  border-color: dodgerblue;
  color: dodgerblue;
}

.btn-submit:disabled {
  border-color: gray;
  color: gray;
}

.custom-input {
  border-width: 2px;
  border-color: dodgerblue;
  padding-left: 10px;
  color: black
;
}

.custom-output {
  background-color: whitesmoke;
  border-radius: 5px;
  color: black;
  font-size: 12px;
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
  margin-top: 10px;
  margin-bottom: 8px;
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
  margin-top: 10px;
  padding: 10px 10px 10px 45px;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
  background-image: url(https://morfalto.sirv.com/suchen-2.png?w=18&h=18);
  background-position: 15px center;
  background-repeat: no-repeat;
}

.btn-input-top {
  position: absolute;
}
</style>
