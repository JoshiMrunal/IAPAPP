import React, { Fragment, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as RNIap from "react-native-iap"
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;

const itemSkus = Platform.select({
    ios: [
        'wk1iap001',
    ],
    android: [
        'sub_001',
        'sub_002',
    ],
});

const SubscribeProductComponent = (props) => {

    const { state } = props.navigation;
    const [subscribeProductsArray, setSubscribeProductsArray] = useState('');



    useEffect(() => {
        initilizeIAPConnection();

        purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
            async (purchase) => {
                const receipt = purchase.transactionReceipt;
                if (receipt) {
                    try {
                        if (Platform.OS === 'ios') {
                            RNIap.finishTransactionIOS(purchase.transactionId);
                        }
                        console.log('ackErr INAPP>>>>', receipt);
                    } catch (ackErr) {
                        console.log('ackErr INAPP>>>>', ackErr);
                    }
                }
            },
        );
        purchaseErrorSubscription = RNIap.purchaseErrorListener(
            (error) => {
                console.log('purchaseErrorListener INAPP>>>>', error);
            },
        );
        return () => {
        };


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
            const Products = await RNIap.getSubscriptions(itemSkus);
            console.log(' IAP Su', Products);



            setSubscribeProductsArray(Products)
            if (Products.length !== 0) {
                if (Platform.OS === 'android') {

                } else if (Platform.OS === 'ios') {

                }
            }
        } catch (err) {
            console.warn("IAP error", err.code, err.message, err);

        }
    };



    const requestSubscription = async (sku) => {

        console.log("sku ===> ", sku)

        try {
            await RNIap.requestSubscription(sku)
                .then(async (result) => {

                    console.log('IAP req sub', result);

                    if (Platform.OS === 'android') {

                        await RNIap.acknowledgePurchaseAndroid(result.purchaseToken);
                        await RNIap.finishTransaction(result, false);

                    } else if (Platform.OS === 'ios') {
                        await RNIap.finishTransactionIOS(result.transactionId);
                        console.log(result.transactionReceipt)
                    }

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

                <Text style={localStyles.headerText}>Select the plan and Buy the Subscription.</Text>

                <TouchableOpacity onPress={() => requestSubscription(subscribeProductsArray[0].productId)} style={localStyles.cardStyle1}>
                    <Image
                        style={{
                            height: 50,
                            width: 50,
                            resizeMode: 'contain',
                        }}
                        source={require('../images/smiley.png')}
                    />

                    <Text style={localStyles.textStyle}>Subscription for 6 {"\n"} months</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, flexDirection: 'column', alignSelf: 'center', alignContent: 'center', marginRight: 20 }}>
                        <Text style={localStyles.textStyle}>Rs.200.00</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => requestSubscription(subscribeProductsArray[1].productId)} style={localStyles.cardStyle2}>
                    <Image
                        style={{
                            height: 50,
                            width: 50,
                            resizeMode: 'contain',
                        }}
                        source={require('../images/happy.png')}
                    />
                    <Text style={localStyles.textStyle}>Subscription for 1 {"\n"} year</Text>
                    <View style={{ alignItems: 'flex-end', flex: 1, flexDirection: 'column', alignSelf: 'center', alignContent: 'center', marginRight: 20 }}>
                        <Text style={localStyles.textStyle}>Rs.200.00</Text>
                    </View>
                </TouchableOpacity>

                <View style={{
                    alignContent: 'center',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    {/* <View style={{ width: 90, marginTop: 30 }}>
                        <Button
                            style={{ width: 30, }}
                            title="Restore"
                        />
                    </View> */}
                </View>
            </ScrollView>

        </View>


    );
};

const localStyles = StyleSheet.create({
    Container: {
        flex: 1,
        alignContent: 'center',
        marginTop: 80
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFF',
        marginLeft: 10
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFF',
        marginLeft: 10,
        textAlign: 'center',
        color: 'black',
        marginBottom: 20

    },
    subContainer: {
        flex: 1,
        marginTop: 50
    },

    cardStyle1: {
        flex: 0.15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor: 'green',
    },
    cardStyle2: {
        flex: 0.15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor: '#0066CC',
    }
});

export default SubscribeProductComponent
