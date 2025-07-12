import {Scanner} from "./components/Scanner";
import ScanScreen from "./screens/ScanScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Scan"
                    component={ScanScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

