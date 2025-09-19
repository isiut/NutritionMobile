import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import NavigationBar from "../navigation/NavigationBar";
import { useAuth } from '../contexts/AuthContext';
import apiService, { FoodInfo } from '../services/apiService';

const ScannedFoodScreen = ({ navigation, route }: { navigation: any; route: any }) => {
    const { user } = useAuth();
    const { barcode } = route.params || {};
    const [foodInfo, setFoodInfo] = useState<FoodInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState('1');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (barcode) {
            fetchFoodInfo(barcode);
        } else {
            setLoading(false);
            Alert.alert('Error', 'No barcode provided');
        }
    }, [barcode]);

    const fetchFoodInfo = async (barcode: string) => {
        try {
            setLoading(true);
            // Try to get user-specific food info first, fallback to general food info
            const data = await apiService.getFoodInfoByBarcodeForUser(barcode);
            setFoodInfo(data);
        } catch (error) {
            try {
                // Fallback to general food info endpoint
                const data = await apiService.getFoodInfoByBarcode(barcode);
                setFoodInfo(data);
            } catch (fallbackError) {
                console.error('Failed to fetch food info:', fallbackError);
                Alert.alert('Error', 'Could not find information for this barcode');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddFoodEntry = async () => {
        if (!user?.id || !foodInfo || !quantity) {
            Alert.alert('Error', 'Missing required information');
            return;
        }

        const quantityNum = parseFloat(quantity);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            Alert.alert('Error', 'Please enter a valid quantity');
            return;
        }

        try {
            setAdding(true);
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
            
            await apiService.addFoodEntry(user.id, {
                foodBarcode: foodInfo.barcode,
                quantity: quantityNum,
                date: today,
            });

            Alert.alert('Success', 'Food entry added successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Today'),
                },
            ]);
        } catch (error) {
            console.error('Failed to add food entry:', error);
            Alert.alert('Error', 'Failed to add food entry');
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#50ae2b" />
                <Text style={styles.loadingText}>Loading food information...</Text>
                <View style={styles.bottomBarContainer}>
                    <NavigationBar currentScreen="ScannedFood" navigation={navigation} />
                </View>
            </View>
        );
    }

    if (!foodInfo) {
        return (
            <View style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorTitle}>Food Not Found</Text>
                    <Text style={styles.errorText}>
                        We couldn't find information for barcode: {barcode}
                    </Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Scan Again</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomBarContainer}>
                    <NavigationBar currentScreen="ScannedFood" navigation={navigation} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.foodName}>{foodInfo.name}</Text>
                    <Text style={styles.barcode}>Barcode: {foodInfo.barcode}</Text>
                    
                    <View style={styles.nutritionGrid}>
                        <View style={styles.nutritionItem}>
                            <Text style={styles.nutritionValue}>{foodInfo.calories}</Text>
                            <Text style={styles.nutritionLabel}>Calories</Text>
                        </View>
                        <View style={styles.nutritionItem}>
                            <Text style={[styles.nutritionValue, styles.proteinColor]}>
                                {foodInfo.protein}g
                            </Text>
                            <Text style={styles.nutritionLabel}>Protein</Text>
                        </View>
                        <View style={styles.nutritionItem}>
                            <Text style={[styles.nutritionValue, styles.carbColor]}>
                                {foodInfo.carbs}g
                            </Text>
                            <Text style={styles.nutritionLabel}>Carbs</Text>
                        </View>
                        <View style={styles.nutritionItem}>
                            <Text style={[styles.nutritionValue, styles.fatColor]}>
                                {foodInfo.fat}g
                            </Text>
                            <Text style={styles.nutritionLabel}>Fat</Text>
                        </View>
                    </View>

                    {foodInfo.servingSize && (
                        <Text style={styles.servingSize}>Serving Size: {foodInfo.servingSize}</Text>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Add to Today's Meals</Text>
                    
                    <View style={styles.quantityContainer}>
                        <Text style={styles.quantityLabel}>Quantity:</Text>
                        <TextInput
                            style={styles.quantityInput}
                            value={quantity}
                            onChangeText={setQuantity}
                            keyboardType="numeric"
                            placeholder="1"
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.addButton, adding && styles.addButtonDisabled]}
                        onPress={handleAddFoodEntry}
                        disabled={adding}
                    >
                        <Text style={styles.addButtonText}>
                            {adding ? 'Adding...' : 'Add Food Entry'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomBarContainer}>
                <NavigationBar currentScreen="ScannedFood" navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 120,
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    errorTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#EF4444',
        marginBottom: 16,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 32,
    },
    backButton: {
        backgroundColor: '#50AE2B',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    foodName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 8,
    },
    barcode: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    nutritionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    nutritionItem: {
        alignItems: 'center',
        minWidth: 70,
    },
    nutritionValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    nutritionLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
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
    servingSize: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    quantityLabel: {
        fontSize: 16,
        color: '#374151',
        marginRight: 12,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#F9FAFB',
        width: 80,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#50AE2B',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    addButtonDisabled: {
        backgroundColor: '#9CA3AF',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
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
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
});

export default ScannedFoodScreen;
