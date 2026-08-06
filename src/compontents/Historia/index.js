import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'

const Historia = ({ fotoPerfil, username }) => {
    return (
        <View style={styles.historia}>
            <View style={styles.fotoWrapper}>
                <Image source={fotoPerfil} style={styles.foto} contentFit="cover" />
            </View>
            <Text style={styles.username} numberOfLines={1}>{username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    historia: {
        alignItems: 'center',
        width: 72,
        gap: 4,
    },
    fotoWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        padding: 2,
        borderWidth: 2,
        borderColor: '#e1306c',
    },
    foto: {
        flex: 1,
        borderRadius: 28,
    },
    username: {
        fontSize: 12,
        color: '#000',
    },
})

export default Historia
