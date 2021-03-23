import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as RNIap from "react-native-iap";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;

const itemSkus = Platform.select({
  ios: [
    "com.mb.item1",
    "com.mb.item2",
    // 'wk1iap001',
  ],
  android: ["iap_01", "iap_02"],
});

const BuyProductComponent = (props) => {
  const { state } = props.navigation;
  const [consumableArray, setConsumableArray] = useState([]);
  const [NonConsumableArray, setNonConsumableArray] = useState([]);

  useEffect(() => {
    initilizeIAPConnection();

    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            if (Platform.OS === "ios") {
              RNIap.finishTransactionIOS(purchase.transactionId);
            }
            console.log("ackErr INAPP>>>>", receipt);
          } catch (ackErr) {
            console.log("ackErr INAPP>>>>", ackErr);
          }
        }
      }
    );
    purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
      console.log("purchaseErrorListener INAPP>>>>", error);
    });
    return () => {};
  }, []);

  const initilizeIAPConnection = async () => {
    await RNIap.initConnection()
      .then(async (connection) => {
        getItems();
      })
      .catch((error) => {
        console.warn(`IAP ERROR ${error.code}`, error.message);
      });
  };

  const getItems = async () => {
    try {
      console.log("itemSubs ", itemSkus);
      const Products = await RNIap.getProducts(itemSkus);
      console.log(" IAP Su", Products);

      setConsumableArray(Products[0]);
      setNonConsumableArray(Products[1]);
      if (Products.length !== 0) {
        if (Platform.OS === "android") {
        } else if (Platform.OS === "ios") {
        }
      }
    } catch (err) {
      console.warn("IAP error", err.code, err.message, err);
    }
  };

  const requestConsumablePurchase = async (sku) => {
    try {
      await RNIap.requestPurchase(sku)
        .then(async (result) => {
          console.log("IAP req sub", result);

          if (Platform.OS === "android") {
            //If product is non consumable
            await RNIap.consumePurchaseAndroid(result.purchaseToken);
          } else if (Platform.OS === "ios") {
            await RNIap.finishTransactionIOS(result.transactionId);
            console.log(result.transactionReceipt);
          }
        })
        .catch((err) => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
        });
    } catch (err) {
      console.warn(`err ${err.code}`, err.message);
    }
  };
  const requestNonConsumablePurchase = async (sku) => {
    try {
      await RNIap.requestPurchase(sku)
        .then(async (result) => {
          console.log("IAP req sub", result);

          if (Platform.OS === "android") {
            //If product is non consumable
            await RNIap.acknowledgePurchaseAndroid(result.purchaseToken);
          } else if (Platform.OS === "ios") {
            await RNIap.finishTransactionIOS(result.transactionId);
            console.log(result.transactionReceipt);
          }
          await RNIap.finishTransaction(result, false);
        })
        .catch((err) => {
          console.warn(`IAP req ERROR %%%%% ${err.code}`, err.message);
        });
    } catch (err) {
      console.warn(`err ${err.code}`, err.message);
    }
  };

  return (
    <View style={localStyles.Container}>
      <ScrollView contentContainerStyle={localStyles.subContainer}>
        <Text style={localStyles.headerText}>
          Buy the gems and coins in the game as much as you want. {"\n"}{" "}
          (consumable)
        </Text>

        <TouchableOpacity
          onPress={() => requestConsumablePurchase(consumableArray.productId)}
          style={localStyles.cardStyle1}
        >
          <Image
            style={{
              height: 50,
              width: 50,
              resizeMode: "contain",
            }}
            source={require("../images/coins.png")}
          />

          <Text style={localStyles.textStyle}>Get coins</Text>
          <View
            style={{
              alignItems: "flex-end",
              flex: 1,
              flexDirection: "column",
              alignSelf: "center",
              alignContent: "center",
              marginRight: 20,
            }}
          >
            <Text style={localStyles.textStyle}>$11.99</Text>
          </View>
        </TouchableOpacity>

        <Text style={[localStyles.headerText, { marginTop: 20 }]}>
          Buy the product only at once. {"\n"} (Non-consumable)
        </Text>

        <TouchableOpacity
          onPress={() =>
            requestNonConsumablePurchase(NonConsumableArray.productId)
          }
          style={localStyles.cardStyle2}
        >
          <Image
            style={{
              height: 50,
              width: 50,
              resizeMode: "contain",
            }}
            source={require("../images/cards.png")}
          />
          <Text style={localStyles.textStyle}>
            Purchase once & {"\n"}play the game
          </Text>
          <View
            style={{
              alignItems: "flex-end",
              flex: 1,
              flexDirection: "column",
              alignSelf: "center",
              alignContent: "center",
              marginRight: 20,
            }}
          >
            <Text style={localStyles.textStyle}>$11.99</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFF",
    marginLeft: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFF",
    marginLeft: 10,
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  subContainer: {
    flex: 1,
    marginTop: 50,
  },
  cardStyle: {
    flex: 0.15,
    marginLeft: 10,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#80ff80",
  },
  cardStyle1: {
    flex: 0.15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#0066CC",
  },
  cardStyle2: {
    flex: 0.15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#ffb366",
  },
});

export default BuyProductComponent;
