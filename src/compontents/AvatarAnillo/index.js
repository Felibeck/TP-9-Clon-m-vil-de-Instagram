import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

const GRADIENT_HISTORIA = ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']

const AvatarAnillo = ({ uri, size, variante, children }) => {
    const contenido = (
        <View style={[styles.anilloBorde, { borderRadius: (size - 4) / 2 }]}>
            {uri ? <Image source={{ uri }} style={styles.anilloFoto} contentFit="cover" /> : <View style={styles.anilloPlaceholder} />}
        </View>
    )

    return (
        <View style={{ width: size, height: size }}>
            {variante === 'gradiente' ? (
                <LinearGradient
                    colors={GRADIENT_HISTORIA}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.anilloFondo, { borderRadius: size / 2 }]}
                >
                    {contenido}
                </LinearGradient>
            ) : (
                <View style={[styles.anilloFondo, { borderRadius: size / 2, backgroundColor: variante === 'vista' ? '#3f4752' : '#1c2026' }]}>
                    {contenido}
                </View>
            )}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    anilloFondo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
    },
    anilloBorde: {
        flex: 1,
        width: '100%',
        borderWidth: 2,
        borderColor: '#0f1419',
        overflow: 'hidden',
    },
    anilloFoto: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    anilloPlaceholder: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1c2026',
    },
})

export default AvatarAnillo
