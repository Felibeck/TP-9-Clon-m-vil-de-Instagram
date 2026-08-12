import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Home from './src/compontents/Home'
import Perfil from './src/compontents/Perfil'
import Comentarios from './src/compontents/Comentarios'
import DetallePost from './src/compontents/DetallePost'
import { IconHome, IconProfile } from './src/compontents/Home/icons'

const logo = require('./assets/splash-icon.png')
const DURACION_SPLASH = 1400

SplashScreen.preventAutoHideAsync().catch(() => {})

const Tab = createBottomTabNavigator()
const RootStack = createNativeStackNavigator()

const iconosPorPantalla = {
    Home: IconHome,
    Perfil: IconProfile,
}

const Tabs = () => {
    const insets = useSafeAreaInsets()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [styles.tabBar, { height: 64 + insets.bottom, paddingBottom: insets.bottom }],
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
}

export default function App() {
    const [listo, setListo] = useState(false)

    useEffect(() => {
        const temporizador = setTimeout(() => {
            setListo(true)
            SplashScreen.hideAsync().catch(() => {})
        }, DURACION_SPLASH)

        return () => clearTimeout(temporizador)
    }, [])

    return (
        <SafeAreaProvider>
            {listo ? (
                <NavigationContainer>
                    <RootStack.Navigator screenOptions={{ headerShown: false }}>
                        <RootStack.Screen name="Tabs" component={Tabs} />
                        <RootStack.Screen name="Comentarios" component={Comentarios} options={{ presentation: 'modal' }} />
                        <RootStack.Screen name="DetallePost" component={DetallePost} options={{ presentation: 'modal' }} />
                    </RootStack.Navigator>
                </NavigationContainer>
            ) : (
                <View style={styles.splash}>
                    <Image source={logo} style={styles.splashLogo} contentFit="contain" />
                </View>
            )}
            <StatusBar style="light" backgroundColor="#0f1419" />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        backgroundColor: '#0f1419',
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashLogo: {
        width: 140,
        height: 140,
    },
    tabBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 90,
        backgroundColor: 'rgba(15,20,25,0.95)',
        borderTopWidth: 0.5,
        borderTopColor: '#31353b',
        elevation: 0,
    },
})
