import React, {useState} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import NavigationBar from "../navigation/NavigationBar";
import ScrollView = Animated.ScrollView;

const TodayScreen = ({navigation}: { navigation: any }) => {
    const [foods, _setFoods] = useState([
        {id: 1, name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3},
        {id: 2, name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0},
        {id: 3, name: 'Chicken Breast (cooked)', calories: 165, protein: 31, carbs: 0, fat: 4},
        {id: 4, name: 'Broccoli', calories: 55, protein: 4, carbs: 11, fat: 1},
        {id: 5, name: 'Rice (cooked)', calories: 205, protein: 4, carbs: 45, fat: 0},
    ]);

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.calorieNumber}>{2000}</Text>
                    <Text style={styles.calorieLabel}>Calories</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.macroGrid}>
                        <View style={styles.macroSection}>
                            <Text style={[styles.macroNumber, styles.proteinColor]}>{250}g</Text>
                            <Text style={styles.macroLabel}>Proteins</Text>
                        </View>
                        <View style={styles.macroSection}>
                            <Text style={[styles.macroNumber, styles.carbColor]}>{250}g</Text>
                            <Text style={styles.macroLabel}>Carbs</Text>
                        </View>
                        <View style={styles.macroSection}>
                            <Text style={[styles.macroNumber, styles.fatColor]}>{250}g</Text>
                            <Text style={styles.macroLabel}>Fats</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, styles.foodsCard]}>
                    <View>
                        <Text style={styles.foodsTitle}>Food Consumed</Text>
                        {foods.map((food) => (
                            <View key={food.id} style={styles.foodItem}>
                                <View style={styles.foodItemDetails}>
                                    <Text style={styles.foodName}>{food.name}</Text>
                                    <Text style={styles.foodMacros}>
                                        P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                    </Text>
                                </View>
                                <Text style={styles.foodCalories}>{food.calories} kcal</Text>
                            </View>
                        ))}
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
    },
    noFoodsText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    foodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    foodItemDetails: {
        flex: 1,
        marginRight: 10,
    },
    foodName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    foodMacros: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
    foodCalories: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4F46E5',
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
