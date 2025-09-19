import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TodayScreen from "./screens/TodayScreen";
import ScanScreen from "./screens/ScanScreen";
import YouScreen from "./screens/YouScreen";
import ScannedFoodScreen from "./screens/ScannedFoodScreen";
import AuthScreen from "./screens/AuthScreen";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const Stack = createNativeStackNavigator();

function AppNavigator() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!isAuthenticated) {
        return <AuthScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{animation: "none", headerShown: false}}>
                <Stack.Screen name={"Today"} component={TodayScreen}/>
                <Stack.Screen name={"Scan"} component={ScanScreen}/>
                <Stack.Screen name={"You"} component={YouScreen}/>
                <Stack.Screen name={"ScannedFood"} component={ScannedFoodScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        fontSize: 18,
        color: '#6B7280',
    },
});

