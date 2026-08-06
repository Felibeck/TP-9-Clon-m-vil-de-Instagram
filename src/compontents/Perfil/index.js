import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

const Perfil = ({ usuario }) => {
    return (
        <View style={styles.perfil}>
            <View style={styles.fotoWrapper}>
                <Image source={usuario.fotoPerfil} style={styles.foto} contentFit="cover" />
            </View>

            <View style={styles.info}>
                <View style={styles.nombreRow}>
                    <Text style={styles.nombre}>{usuario.nombreCompleto}</Text>
                    <Svg width={22} height={22} viewBox="0 0 24 24" fill="#4a9eff">
                        <Path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4a9eff" strokeWidth={2} fill="none" />
                    </Svg>
                </View>
                <Text style={styles.username}>@{usuario.username}</Text>
                <Text style={styles.bio}>"{usuario.biografia}"</Text>
                <View style={styles.stats}>
                    <Text style={styles.statText}>
                        <Text style={styles.statNumber}>{usuario.cantSeguidores}</Text> seguidores
                    </Text>
                    <Text style={styles.statText}>
                        <Text style={styles.statNumber}>{usuario.cantSeguidos}</Text> seguidos
                    </Text>
                </View>
                <Text style={styles.postsCount}>{usuario.cantPublicaciones} posts</Text>
            </View>

            <Pressable style={styles.editarBtn} accessibilityLabel="Editar perfil">
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2}>
                    <Circle cx="12" cy="8" r="4" />
                    <Path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
                    <Path d="M16.5 14.5l4 4M20.5 14.5l-4 4" />
                </Svg>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    perfil: {
        padding: 16,
        gap: 12,
    },
    fotoWrapper: {
        alignSelf: 'center',
    },
    foto: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    info: {
        alignItems: 'center',
        gap: 4,
    },
    nombreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    nombre: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    username: {
        fontSize: 14,
        color: '#8e8e8e',
    },
    bio: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    },
    stats: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 4,
    },
    statText: {
        fontSize: 13,
        color: '#000',
    },
    statNumber: {
        fontWeight: '700',
    },
    postsCount: {
        fontSize: 13,
        color: '#8e8e8e',
    },
    editarBtn: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 8,
        padding: 8,
    },
})

export default Perfil
