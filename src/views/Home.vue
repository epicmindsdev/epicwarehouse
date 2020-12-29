<template>
  <div class="home">
    <!--<Order msg=""/>-->
    <!-- setting box values -->
    <label class="box-link deal"><a v-if="currentDealBox === ''">Enter Dealbox</a> {{ currentDealBox }} <input
        type="number" class="box-input deal" v-model="currentDealBoxValue"
        placeholder="Ändern">
      <button class="box-input-enter" v-on:click="setCurrentDealBox(currentDealBoxValue)"><img
          src="https://morfalto.sirv.com/back.png?w=128&h=17"></button>
    </label>
    <label class="box-link check"><a v-if="currentCheckBox === ''">Enter Checkbox</a> {{ currentCheckBox }} <input
        type="number" class="box-input check" v-model="currentCheckBoxValue"
        placeholder="Ändern">
      <button class="box-input-enter" v-on:click="setCurrentCheckBox(currentCheckBoxValue)"><img
          src="https://morfalto.sirv.com/back.png?w=128&h=17"></button>
    </label>
    <label class="box-link stock"><a v-if="currentStockBox === ''">Enter Stockbox</a> {{ currentStockBox }} <input
        type="number" class="box-input stock" v-model="currentStockBoxValue"
        placeholder="Ändern">
      <button class="box-input-enter" v-on:click="setCurrentStockBox(currentStockBoxValue)"><img
          src="https://morfalto.sirv.com/back.png?w=128&h=17"></button>
    </label>
    <!-- back button -->
    <b-row class="p-element-layout" v-show="this.viewState !== 1" style="margin-left: auto; margin-right: auto">
      <button class="btn-back" v-on:click="changeToPreviousViewState()"><b>ZURÜCK</b></button>
    </b-row>
    <!-- ID search bar -->
    <b-row class="p-element-layout" v-show="this.viewState === 1" style="margin-left: auto; margin-right: auto">
      <label
          style="min-width: 100%; margin-left: auto; margin-right: auto;">
        <input class="input-top" ref="lookup" v-model="id" v-on:keydown.enter="getProductById(id)"
               placeholder="Enter ID">
      </label>
    </b-row>
    <!-- product check -->
    <b-row class="p-element-layout" v-show="this.selectedProduct !== ''" style="margin-left: auto; margin-right: auto">
      <!-- ProductDetails -->
      <b-col class="card c-left" v-show="this.viewState !== 6 && this.viewState !== 7" style="border-radius: 5px">
        <div class="p-title"><h6 style="font-size: 12px">{{ this.selectedProduct.id }}</h6></div>
        <div class="p-title"><h5>{{ this.selectedProduct.title }}</h5></div>
        <div class="spacer-s"></div>
        <div class="p-price">€ {{ this.selectedProduct.price }}</div>
        <div class="spacer-m"></div>
        <div class="tab-container">
          <b-tabs>
            <b-tab class="img-tab" title="1" active>
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.image_link
                                         alt="image1">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="2">
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.additional_image1
                                         alt="image2">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="3">
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.additional_image2
                                         alt="image3">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="4">
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.additional_image3
                                         alt="image4">
              </div>
            </b-tab>
            <b-tab class="img-tab" title="5">
              <div class="p-images"><img class="p-image-item"
                                         :src=this.selectedProduct.additional_image5
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
        <button class="prime-btn btn-green" v-on:click="setCurrentLocation(currentDealBox)"
                :disabled="currentDealBox === ''"><b> <a v-show="currentDealBox === ''">Enter Dealbox</a>
          {{ currentDealBox }}</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentLocation(currentCheckBox)"
                :disabled="currentCheckBox === ''"><b> <a v-show="currentCheckBox === ''">Enter Checkbox</a>
          {{ currentCheckBox }}</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentLocation(currentStockBox)"
                :disabled="currentStockBox === ''"><b> <a v-show="currentStockBox === ''">Enter Stockbox</a>
          {{ currentStockBox }}</b></button>
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
        <button class="prime-btn btn-yellow" v-on:click="setCurrentDescription('Leichte Gebrauchsspuren')"><b>Leichte
          Gebrauchsspuren</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentDescription('Kleine Kratzer')"><b>Kleine Kratzer</b>
        </button>
        <button class="prime-btn btn-red" v-on:click="setCurrentDescription('Starke Gebrauchsspuren')"><b>Starke
          Gebrauchsspuren</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentDescription('Grosse Kratzer')"><b>Grosse Kratzer</b>
        </button>
        <button class="prime-btn btn-red" v-on:click="setCurrentDescription('Nicht auf Funktion überprüft')"><b>Nicht
          auf Funktion überprüft</b></button>
        <input class="prime-btn custom-input" v-model="currentCustomDescription" placeholder="Eingeben">
        <button class="prime-btn btn-submit" v-on:click="setCurrentDescription(currentCustomDescription)">
          <b>ÜBERNEHMEN</b></button>
        <div class="prime-btn custom-output">{{ this.currentDescription }}</div>
        <button class="prime-btn btn-delete" v-on:click="deleteCurrentDescription()"><b>LÖSCHEN</b></button>
        <button class="prime-btn btn-submit" v-on:click="changeToNextViewState(4)"
                :disabled="this.currentDescription === ''"><b>WEITER</b></button>
      </b-col>
      <!-- Package -->
      <b-col class="card c-right" v-show="this.viewState === 4" style="border-radius: 5px">
        <div class="step-title"><h5>Originalverpackung</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click="setCurrentPackage('Neuwertig')"><b>Neuwertig</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentPackage('Leicht beschädigt')"><b>Leicht
          beschädigt</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentPackage('Stark beschädigt')"><b>Stark beschädigt</b>
        </button>
        <button class="prime-btn btn-red" v-on:click="setCurrentPackage('Nicht vorhanden')"><b>Nicht vorhanden</b>
        </button>
      </b-col>
      <!-- Accessories -->
      <b-col class="card c-right" v-show="this.viewState === 5" style="border-radius: 5px">
        <div class="step-title"><h5>Zubehör vollständig</h5></div>
        <div class="spacer-s"></div>
        <button class="prime-btn btn-green" v-on:click="setCurrentAccess('Ja')"><b>Ja</b></button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentAccess('USB Kabel fehlt')"><b>USB Kabel fehlt</b>
        </button>
        <button class="prime-btn btn-yellow" v-on:click="setCurrentAccess('Ladegerät fehlt')"><b>Ladegerät fehlt</b>
        </button>
        <button class="prime-btn btn-red" v-on:click="setCurrentAccess('USB Dongle fehlt')"><b>USB Dongle fehlt</b>
        </button>
        <button class="prime-btn btn-red" v-on:click="setCurrentAccess('Teile fehlen')"><b>Grosse Kratzer</b></button>
        <button class="prime-btn btn-red" v-on:click="setCurrentAccess('Nicht auf Vollständigkeit überprüft')"><b>Nicht
          auf
          Funktion überprüft</b></button>
        <input class="prime-btn custom-input" v-model="currentCustomAccess" placeholder="Eingeben">
        <button class="prime-btn btn-submit" v-on:click="setCurrentAccess(currentCustomAccess)"><b>ÜBERNEHMEN</b>
        </button>
        <div class="prime-btn custom-output">{{ this.currentAccess }}</div>
        <button class="prime-btn btn-delete" v-on:click="deleteCurrentAccess()"><b>LÖSCHEN</b></button>
        <button class="prime-btn btn-submit" v-on:click="changeToNextViewState(6)"
                :disabled="this.currentAccess === ''"><b>WEITER</b></button>
      </b-col>
      <!-- Confirmation -->
      <b-col class="card" v-show="this.viewState === 6" style="border-radius: 5px">
        <div class="step-title"><h5>Bestätigen</h5></div>
        <div class="spacer-s"></div>
        <b-row>
          <table class="table-style">
            <tr>
              <th>Id</th>
              <th>Location</th>
              <th>Zustand</th>
              <th>Beschreibung</th>
              <th>Verpackung</th>
              <th>Zubehör</th>
            </tr>
            <tr>
              <td>{{ this.selectedProduct.id }}</td>
              <td>{{ this.currentLocation }}</td>
              <td>{{ this.currentCondition }}</td>
              <td>{{ this.currentDescription }}</td>
              <td>{{ this.currentPackage }}</td>
              <td>{{ this.currentAccess }}</td>
            </tr>
          </table>
        </b-row>
        <button class="btn-submit btn-confirm" v-on:click="checkIfAlreadyPushedProduct()"><b>Absenden</b></button>
      </b-col>
    </b-row>
    <!-- Loading -->
    <b-row>
      <span class="loader mid" v-show="this.viewState === 7"></span>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Order from '@/components/Order.vue'
import axios from "axios";
import moment from 'moment'
import App from "@/App";
import firebase from 'firebase'


let config = {
  apiKey: "AIzaSyCG5GqXxoMrDu2rsV1JQ4fbCnAHXqZOEsU",
  authDomain: "epic-warehouse.firebaseapp.com",
  databaseURL: "https://epic-warehouse-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "epic-warehouse",
  storageBucket: "epic-warehouse.appspot.com",
  messagingSenderId: "49399957247",
  appId: "1:49399957247:web:fcae518f50cf77b1f2eeca"
}
// Initialize Firebase
let apps = firebase.initializeApp(config);
let dbs = apps.database();
let textRef = dbs.ref('texts');
let orderRef = dbs.ref('orders');

export default {
  name: 'Home',
  props: {
    orderRef
  },
  components: {
    Order
  },
  data() {
    return {
      text: {
        text: 'ddee'
      },
      currentMaxSheetNo: 1,
      checkedProducts: [],
      orderId: {
        'order': '3'
      },
      fetchedOrderId: '',
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
      currentArrayAccess: [],
      timeStamp: '',
      saveConfirm: false,
      alreadyPushed: false
    }
  },
  mounted() {

    orderRef.once("value", function (snapshot) {
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

    test: function () {
      const headers = {
        "Content-Type": "application/json"
      };
      axios.post("https://sheet2api.com/v1/V61drP5kTxut/output/Tab2", this.selectedProduct, {headers})
          .then(response => console.log(response))
      //axios.get("https://v1.nocodeapi.com/epicminds/google_sheets/CJhmuBUkPujEcsgg?tabId=Tab", {headers})
      //    .then(response => console.log(response))
      //axios.post("https://v1.nocodeapi.com/epicminds/google_sheets/CJhmuBUkPujEcsgg/create?title=joobble", {headers})
      //    .then(response => console.log(response))
    },

    add: function () {
      textRef.push(this.text);
      //firebase.database().ref('texts').get();
      //let test = firebase.database().ref('texts').get();
      console.log('add fired!!');
      //console.log(test);
      /**
       const headers = {
        "Authorization": "v^1.1#i^1#p^1#I^3#r^0#f^0#t^H4sIAAAAAAAAAOVYfWwURRTv9UsqICSimKrJsZUQbe5udq/3tXAXjl5rj9L27F1rWzAwuzvbbru3u+zM2Z4GU89QjDHCHxgiaiiBfyAYhMSEaCIIQQkJBgJoBFFAY/AjKIVIAiru3h3lWkmL9IJN3H/u5r03b977/d6bmV3QX1r21EDdwNXplvsKB/tBf6HFQk8FZaUllQ8UFZaXFIAcA8tg/xP9xamiCwswjMsa24ywpioYWfvisoLZtNBPJXSFVSGWMKvAOMIs4dlosGEJy9gBq+kqUXlVpqzhkJ/ioOgTfQLwMUB0eZHHkCo3fcZUP8VAF+P1Ap8P8hyNaJehxziBwgomUCGGHjDARjM2mo7RNEu7WcZt9zjpDsrainQsqYphYgdUIB0um56r58Q6dqgQY6QTwwkVCAdro03BcKimMbbAkeMrkMUhSiBJ4JGjalVA1lYoJ9DYy+C0NRtN8DzCmHIEMiuMdMoGbwZzF+GnofZ4PC63CzgZD+dFogDyAmWtqschGTsOUyIJNjFtyiKFSCQ5HqIGGlw34kl21Gi4CIes5s8zCShLooR0P1WzKNgejESoANIkPi4pgs380wt1ZIs0h2xVosfr4hmXIRY9HoQQnV0o4y0L86iVqlVFkEzQsLVRJYuQETUajQ3IwcYwalKa9KBIzIhy7ZxZDN2A6TBJzbCYIF2KySuKG0BY08PxGRieTYgucQmChj2MVqQh8lNQ0ySBGq1M12K2fPqwn+oiRGMdjt7eXnuv067qnQ4GANrR1rAkynehOKQMW7PXM/bS+BNsUjoVHhkzscSSpGbE0mfUqhGA0kkFqhifl6nK4j4yrMBo6T8EOTk7RnZEvjqEZnjO60LOKlpwV4lQzEeHBLJF6jDjQBxM2uJQ70FEkyGPbLxRZ4k40iWBdbpExukVkU1w+0RblU8UbZxLcNtoESGAEMfxPu//qVHutNSjiNcRyUut563OOdTeWt3X522siq30tNXjzq7FvmANbG3pFlZ6muVIiHO29sS7KuX6Tv+ddsPtk+dVDUVUWeKTeUDA7PU8ouDUhQjUSTKKZNkQTChRbCY6uUg252PDAdQku9nYdl6NO1Ro7OimaHk64gnlHNS0cDyeIJCTUTg/u/l/tJPfNj3JuOtMqpwM/jJESkLmkmJPs2nHz/N2HWE1oRv3M3uTeWbH1B6kGDsg0VVZRnorPWGi7zW/Zq+Pg8e/PCzuLvf83VQmU23zsmSU0PLJltk9YVSCk+w0pt3A4/a6nF73hPKqTnMaS062c6hOxQQJY6VW/PRdXqsdI1/yAwXph05ZPgApy65CiwU4wFy6AswpLWopLppWjiWC7BIU7VjqVIx3Vx3Ze1BSg5JeWGrRWuBPc3M+Kww+Bx4Z/rBQVkRPzfnKAB67pSmhZ8yezgCaoc3Hzbg7QMUtbTH9cPGs+I3UuaKjdXhNZMm7Z8+EBzYOld8A04eNLJaSguKUpSCwYtuewcNt+39L7YXEF921tP/n1Vvnf31x9cDxKd91n/zi9PU3dwzVXH1n4aEy+ejhzzvuv7ys7Y+K3RXzyY9vffpRYf2lpZf3r3vQR+kXtzBbNg84zrUwv287f6Jl2dS9pTNeX/j+zgNhfp/85VDt6aK3r/y5ef2BLYc+WbWzf9Mu90vl++umdfe0npi3fE/ThlP0tdXczJevg84Vf5189JeFa18JhdTz3y6Y+cPGOZb2115YOaSVNG5qWbfm+w+bAwf9s9tLXuR3bk+h3Z4jVMOZ9w6G1Wd37LtUv/jSuYeW1f8ae7JvVeU13wbu1FfXPtv+xtmPo4XfPH688kLXkVl1U65uvXLw2OCx9atqG16dl6Hvb/CNNZrwEQAA",
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_DE",
        "Content-Type": "application/json",
        "ACCEPT": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Vary": "Origin"
      };

       this.axios.get('https://api.ebay.com/offer?sku=LPNHE179153041', {headers}).then((response) => {
        console.log(response.data)
        console.log("Ebay API Call made")
      })
       */
    },

    setOrderId: function (orderNo) {
      this.fetchedOrderId = orderNo;
      console.log(this.fetchedOrderId + "inside set id")
    },

    getProductById: function (id) {
      console.log(id);
      console.log(this.selectedProduct.id)
      if (this.selectedProduct.id !== '') {
        console.log("inside if statement")
        this.currentLocation = '';
        this.currentCondition = '';
        this.currentDescription = '';
        this.currentArrayDescription = [];
        this.currentPackage = '';
        this.currentAccess = '';
        this.currentArrayAccess = [];
        this.id = '';
      }

      orderRef.once("value", function (snapshot) {
        // console.log(snapshot.val());
        console.log('Firebase call fired')
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }).then(response => {
        this.setOrderId(response.node_.children_.root_.value.value_);
        console.log(this.fetchedOrderId)
      })

      for (let i = 1; i <= this.fetchedOrderId; ++i) {
        this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-1v2-stammdaten-' + i + '/Tabellenblatt1?limit=1000&query_type=and&id=' + id).then((response) => {
          if (response.data.length === 1) {
            console.log(response.data[0])
            console.log("Daten in Stammdaten " + i + " gefunden")
            this.selectedProduct = response.data[0];
            this.orderId = i;
            /**
             if(this.fetchedOrderId < this.orderId) {
              orderRef.set({
                orderId: 1
              });
            }
             */
          }
        }).catch((error) => {
          console.log(error)
        })
      }
      this.id = '';
    },

    setAllProductProperties: function (timeStamp, location, condition, description, pack, access, orderId) {
      this.selectedProduct.erfasst = timeStamp;
      this.selectedProduct.location = location;
      this.selectedProduct.zustand = condition;
      this.selectedProduct.zustandsbeschreibung = description;
      this.selectedProduct.originalverpackung = pack;
      this.selectedProduct.zubehoer = access;
      this.selectedProduct.orderId = orderId;
    },

    checkIfAlreadyPushedProduct: function () {
      this.axios.get('https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-2v2-checked-' + this.orderId + '/Tabellenblatt1?limit=1000&query_type=and&id=' + this.selectedProduct.id).then((response) => {
        if (response.data.length > 0) {
          console.log(response.data[0])
          console.log("Artikel schon in Sheet " + this.orderId + " vorhanden")
          this.alreadyPushed = true
          console.log("if? " + this.alreadyPushed)
          alert('Artikel schon vorhanden!')
          this.viewState = 6;
        } else {
          this.alreadyPushed = false
          this.pushSelectedProduct();
          console.log("Else? " + this.alreadyPushed)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    pushSelectedProduct: function () {
      this.timeStamp = moment().format('DD.MM.YY HH:mm:ss');
      console.log(this.timeStamp)

      this.setAllProductProperties(this.timeStamp, this.currentLocation, this.currentCondition, this.currentDescription, this.currentPackage, this.currentAccess, this.orderId);

      console.log("Inside pushSelectedProduct? " + this.alreadyPushed)

      const headers = {
        "Content-Type": "application/json"
      };
      this.viewState = 7;
      axios.post("https://sheet2api.com/v1/V61drP5kTxut/produktdatenfeed-2v2-checked-" + this.orderId + "/Tabellenblatt1", this.selectedProduct, {headers})
          .then(response => {
            if (response.status === 201) {
              this.saveConfirm = true;
              this.setAllProductProperties('', '', '', '', '', '', '');
              this.selectedProduct = '';
              this.id = '';
              this.viewState = 1;
              this.$nextTick(() => this.$refs.lookup.focus())
            } else {
              alert("Übertragungsfehler")
              this.viewState = 6;
            }
            console.log(response)
          })
      this.saveConfirm = false;
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
      console.log("Zubehoer: " + this.currentAccess)
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
  height: 52px;
  width: 240px;
  align-items: center;
  border-radius: 7px;
  background-color: white;
  margin: 20px 5px 0 5px;
  box-shadow: 1px 2px 3px 1px rgba(43, 43, 43, 0.09);
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
  max-width: 80%;
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
  height: 55px;
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

.btn-confirm {
  margin-top: 10px;
  color: white;
  background-color: #3ABEFF;
  border-color: #3ABEFF;
  border-radius: 4px;
  height: 45px;
}

.btn-submit:disabled {
  border-color: gray;
  color: gray;
}

.custom-input {
  border-width: 2px;
  border-color: dodgerblue;
  padding-left: 10px;
  color: black;
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
  color: black;
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

.table-container {

  margin-left: auto;
  margin-right: auto;
}

.table-style {
  max-width: 80%;
  font-size: 22px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.table-header {
  text-align: left;
}

td {
  text-align: left;
  width: 50px;
  max-width: 15%;
  overflow: hidden;
  padding: 20px 5px 20px 0;
}

.table-time-col {
  max-width: 150px;
}

.table-id-col {
  max-width: 150px;
}

.table-title-col {
  max-width: 200px;
}

.table-location-col {
  max-width: 100px;
}

.table-condition-col {
  max-width: 100px;
}

.table-description-col {
  max-width: 150px;
}

.table-package-col {
  max-width: 100px;
}

.table-access-col {
  max-width: 100px;
}

tr {
  white-space: nowrap;
  text-align: center;
}

.table-row {
  height: 45px;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #D9F2FF;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left: 4px solid #1BB5FF;
  border-bottom: 4px solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.mid {
  max-height: 50px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px 5px 5px 5px;
}

</style>
