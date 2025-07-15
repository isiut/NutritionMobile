import {Scanner} from "./components/Scanner";
import ScanScreen from "./screens/ScanScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import YouScreen from "./screens/YouScreen";
import TodayScreen from "./screens/TodayScreen";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Today"} component={TodayScreen}/>
                <Stack.Screen name={"Scan"} component={ScanScreen}/>
                <Stack.Screen name={"You"} component={YouScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

