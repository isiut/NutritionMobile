import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Animated, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import NavigationBar from "../navigation/NavigationBar";
import { useAuth } from '../contexts/AuthContext';
import apiService, { DailyInfo, FoodEntry } from '../services/apiService';
import ScrollView = Animated.ScrollView;

const TodayScreen = ({navigation}: { navigation: any }) => {
    const { user } = useAuth();
    const [dailyInfo, setDailyInfo] = useState<DailyInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDailyInfo();
    }, []);

    const fetchDailyInfo = async () => {
        if (!user?.id) return;
        
        try {
            setLoading(true);
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
            const data = await apiService.getDailyInfo(user.id, today);
            setDailyInfo(data);
        } catch (error) {
            console.error('Failed to fetch daily info:', error);
            Alert.alert('Error', 'Failed to load daily nutrition data');
            // Fallback to mock data if API fails
            setDailyInfo({
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                entries: []
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFoodEntry = async (entryId: string) => {
        if (!user?.id) return;

        Alert.alert(
            'Remove Food Entry',
            'Are you sure you want to remove this food entry?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await apiService.removeFoodEntry(user.id, entryId);
                            // Refresh the daily info after removal
                            await fetchDailyInfo();
                        } catch (error) {
                            console.error('Failed to remove food entry:', error);
                            Alert.alert('Error', 'Failed to remove food entry');
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#50ae2b" />
                <Text style={styles.loadingText}>Loading your nutrition data...</Text>
            </View>
        );
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.calorieNumber}>{dailyInfo?.totalCalories || 0}</Text>
                    <Text style={styles.calorieLabel}>Calories</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.macroGrid}>
                        <View style={styles.macroSection}>
                            <Text style={[styles.macroNumber, styles.proteinColor]}>
                                {dailyInfo?.totalProtein || 0}g
                            </Text>
                            <Text style={styles.macroLabel}>Proteins</Text>
                        </View>
                        <View style={styles.macroSection}>
                            <Text style={[styles.macroNumber, styles.carbColor]}>
                                {dailyInfo?.totalCarbs || 0}g
                            </Text>
                            <Text style={styles.macroLabel}>Carbs</Text>
                        </View>
                        <View style={styles.macroSection}>
                            <Text style={[styles.macroNumber, styles.fatColor]}>
                                {dailyInfo?.totalFat || 0}g
                            </Text>
                            <Text style={styles.macroLabel}>Fats</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, styles.foodsCard]}>
                    <View>
                        <Text style={styles.foodsTitle}>Food Consumed</Text>
                        {dailyInfo?.entries && dailyInfo.entries.length > 0 ? (
                            dailyInfo.entries.map((food) => (
                                <View key={food.id} style={styles.foodItem}>
                                    <View style={styles.foodItemDetails}>
                                        <Text style={styles.foodName}>{food.foodName}</Text>
                                        <Text style={styles.foodMacros}>
                                            P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                        </Text>
                                        <Text style={styles.foodQuantity}>Quantity: {food.quantity}</Text>
                                    </View>
                                    <View style={styles.foodItemActions}>
                                        <Text style={styles.foodCalories}>{food.calories} kcal</Text>
                                        <TouchableOpacity 
                                            style={styles.removeButton}
                                            onPress={() => handleRemoveFoodEntry(food.id)}
                                        >
                                            <Text style={styles.removeButtonText}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={styles.noFoodsContainer}>
                                <Text style={styles.noFoodsText}>No food entries for today</Text>
                                <Text style={styles.noFoodsSubtext}>
                                    Start scanning food to track your nutrition!
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBarContainer}>
                <NavigationBar currentScreen="Today" navigation={navigation}/>
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
    calorieLabel: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    calorieNumber: {
        fontSize: 48,
        fontWeight: '800',
        color: '#50ae2b',
        textAlign: 'center',
        marginBottom: 4,
    },
    macroGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 0,
    },
    macroSection: {
        alignItems: 'center',
        minWidth: 80,
    },
    macroLabel: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 4,
    },
    macroNumber: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    proteinColor: {
        color: '#3361ff',
    },
    carbColor: {
        color: '#c8b32d',
    },
    fatColor: {
        color: '#ff914d',
    },
    foodsCard: {
        marginBottom: 150,
    },
    foodsTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    noFoodsContainer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    noFoodsText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginBottom: 8,
    },
    noFoodsSubtext: {
        fontSize: 14,
        color: '#AAA',
        textAlign: 'center',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6B7280',
    },
    foodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    foodItemDetails: {
        flex: 1,
        marginRight: 12,
    },
    foodItemActions: {
        alignItems: 'flex-end',
    },
    foodName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    foodMacros: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    foodQuantity: {
        fontSize: 12,
        color: '#888',
    },
    foodCalories: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#50ae2b',
        marginBottom: 8,
    },
    removeButton: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
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

export default TodayScreen;
