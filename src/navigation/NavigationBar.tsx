import {TouchableOpacity, View, StyleSheet, Text} from "react-native";

export function NavigationBar({currentScreen, navigation}: { currentScreen: any, navigation: any }) {
    return (
        <View style={styles.navigationIcons}>
            <TouchableOpacity style={[styles.navItem, currentScreen == "Today" ? styles.navItemActive : null]}
                              onPress={() => navigation.navigate("Today")}>
                <Text style={styles.navIcon}>☀️</Text>
                <Text style={currentScreen == "Today" ? styles.navTextActive : null}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.navItem, currentScreen == "Scan" ? styles.navItemActive : null]}
                              onPress={() => navigation.navigate("Scan")}>
                <Text style={styles.navIcon}>📷</Text>
                <Text style={currentScreen == "Scan" ? styles.navTextActive : null}>Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.navItem, currentScreen == "You" ? styles.navItemActive : null]}
                              onPress={() => navigation.navigate("You")}>
                <Text style={styles.navIcon}>👤</Text>
                <Text style={currentScreen == "You" ? styles.navTextActive : null}>You</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navigationIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    navItemActive: {
        backgroundColor: '#F0F0F0', // Light background for active item
    },
    navIcon: {
        fontSize: 24,
        color: '#888', // Default icon color
        marginBottom: 5,
    },
    navIconActive: {
        color: '#FFA500', // Orange color for active icon
    },
    navText: {
        fontSize: 12,
        color: '#888', // Default text color
        fontWeight: '500',
    },
    navTextActive: {
        color: '#FFA500', // Orange color for active text
        fontWeight: 'bold',
    },
});

export default NavigationBar;