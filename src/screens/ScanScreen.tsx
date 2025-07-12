import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Scanner from '../components/Scanner';
import {NavigationContainer} from "@react-navigation/native";
import NavigationBar from "../navigation/NavigationBar";
// Get screen dimensions for responsive design
const {width, height} = Dimensions.get('window');

const ScanScreen = ({navigation}: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <Scanner/>

            {/* Bottom Bar Container */}
            <View style={styles.bottomBarContainer}>
                {/* Search Input Section */}
                <View style={styles.searchInputWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for food or enter barcode"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.clearButton}>
                        {/* Using a simple 'X' for the clear icon */}
                        <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>
                <NavigationBar currentScreen="Scan"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Light background for the whole screen
    },
    cameraViewText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    bottomBarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30, // Rounded top corners
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30, // Extra padding at the bottom for safe area
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10, // For Android shadow
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 50,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 5,
    },
    clearButtonText: {
        fontSize: 18,
        color: '#888',
        fontWeight: 'bold',
    },
});

export default ScanScreen;
