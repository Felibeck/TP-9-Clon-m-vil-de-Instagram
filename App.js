import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Home from './src/compontents/Home'
import Perfil from './src/compontents/Perfil'
import Comentarios from './src/compontents/Comentarios'
import DetallePost from './src/compontents/DetallePost'
import { IconHome, IconProfile } from './src/compontents/Home/icons'

const Tab = createBottomTabNavigator()
const RootStack = createNativeStackNavigator()

const iconosPorPantalla = {
    Home: IconHome,
    Perfil: IconProfile,
}

const Tabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ focused }) => {
                const Icono = iconosPorPantalla[route.name]
                return <Icono color={focused ? '#fff' : '#6b7280'} />
            },
        })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
)

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name="Tabs" component={Tabs} />
                    <RootStack.Screen name="Comentarios" component={Comentarios} options={{ presentation: 'modal' }} />
                    <RootStack.Screen name="DetallePost" component={DetallePost} options={{ presentation: 'modal' }} />
                </RootStack.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
        </SafeAreaProvider>
    )
}

const styles = {
    tabBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 64,
        paddingHorizontal: 90,
        backgroundColor: 'rgba(15,20,25,0.95)',
        borderTopWidth: 0.5,
        borderTopColor: '#31353b',
        elevation: 0,
    },
}
