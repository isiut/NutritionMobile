import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated, Alert} from 'react-native';
import NavigationBar from "../navigation/NavigationBar";
import { useAuth } from '../contexts/AuthContext';
import ScrollView = Animated.ScrollView;

const YouScreen = ({navigation}: { navigation: any }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Logout', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        }
                    }
                },
            ]
        );
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.name || 'User'}</Text>
                        <Text style={styles.userEmail}>{user?.email || 'No email'}</Text>
                    </View>
                    <View style={styles.preferencesBox}>
                        <Text>Preferences: Vegetarian, Kosher</Text>
                        <Text>Allergies: Soy, Eggs, Fish</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionItem}
                                          onPress={() => console.log('Account Settings pressed')}>
                            <View style={styles.optionContent}>
                                <Text style={styles.optionText}>Account Settings</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionItem} onPress={() => console.log('App Settings pressed')}>
                            <View style={styles.optionContent}>
                                <Text style={styles.optionText}>App Settings</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionItem} onPress={() => console.log('Privacy pressed')}>
                            <View style={styles.optionContent}>
                                <Text style={styles.optionText}>Privacy</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionItem} onPress={() => console.log('Support pressed')}>
                            <View style={styles.optionContent}>
                                <Text style={styles.optionText}>Support</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomBarContainer}>
                <NavigationBar currentScreen="You" navigation={navigation}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    card: {
        width: '95%',
        maxWidth: 420,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    preferencesBox: {
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 8,
        padding: 8,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 32,
    },
    userName: {
        marginTop: 16,
        fontSize: 30,
        fontWeight: '900',
        color: '#111827',
    },
    userEmail: {
        color: '#4B5563',
    },
    optionsContainer: {
        gap: 15,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        color: '#1F2937',
        fontSize: 18,
        marginLeft: 12,
    },
    logoutButton: {
        width: '100%',
        backgroundColor: '#EF4444',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomBarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
});

export default YouScreen;