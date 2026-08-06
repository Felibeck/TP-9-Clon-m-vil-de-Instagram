import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const ComentarioItem = ({ msj, cantLikes, user }) => {
    return (
        <View style={styles.comentario}>
            <View style={styles.user}>
                <Image source={user.fotoPerfil} style={styles.fotoUser} contentFit="cover" />
                <Text style={styles.userName}>{user.username}</Text>
            </View>
            <Text style={styles.msj}>{msj}</Text>
            <View style={styles.cantLikes}>
                <Text style={styles.cantLikesText}>{cantLikes}</Text>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="#000">
                    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </Svg>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    comentario: {
        gap: 4,
        paddingVertical: 6,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    fotoUser: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    userName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
    },
    msj: {
        fontSize: 14,
        color: '#000',
        marginLeft: 32,
    },
    cantLikes: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginLeft: 32,
    },
    cantLikesText: {
        fontSize: 12,
        color: '#8e8e8e',
    },
})

export default ComentarioItem
