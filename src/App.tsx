import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TodayScreen from "./screens/TodayScreen";
import ScanScreen from "./screens/ScanScreen";
import YouScreen from "./screens/YouScreen";
import ScannedFoodScreen from "./screens/ScannedFoodScreen";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{animation: "none", headerShown: false}}>
                <Stack.Screen name={"Today"} component={TodayScreen}/>
                <Stack.Screen name={"Scan"} component={ScanScreen}/>
                <Stack.Screen name={"You"} component={YouScreen}/>
                <Stack.Screen name={"ScannedFood"} component={ScannedFoodScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

