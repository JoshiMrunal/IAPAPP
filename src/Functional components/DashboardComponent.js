import React, { Fragment, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Button,
} from 'react-native';



const DashboardComponent = (props) => {

    const { state } = props.navigation;


    useEffect(() => {
        return () => {
        };
    }, []);

    return (


        <View style={localStyles.Container}>
            <View style={localStyles.subContainer}>
                <View>
                    <Button
                        title="Buy Products"
                        onPress={() => props.navigation.navigate('Buy Product')}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Subscribe products"
                        onPress={() => props.navigation.navigate('Subscribe Product')}
                    />
                </View>


            </View>

        </View>


    );
};

const localStyles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
});

export default DashboardComponent
