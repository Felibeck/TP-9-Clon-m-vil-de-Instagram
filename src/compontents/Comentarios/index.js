import { Image } from 'expo-image'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ComentarioItem from '../ComentarioItem'
import { generarComentarios } from '../../utils/contenidoSimulado'

const Comentarios = ({ route, navigation }) => {
    const { post } = route.params
    const comentarios = generarComentarios(post.id)

    return (
        <SafeAreaView style={styles.pantalla} edges={['top', 'bottom']}>
            <View style={styles.topBar}>
                <Pressable hitSlop={12} onPress={() => navigation.goBack()}>
                    <Text style={styles.cerrar}>✕</Text>
                </Pressable>
                <Text style={styles.titulo}>Comentarios</Text>
                <View style={styles.espaciador} />
            </View>

            <FlatList
                data={comentarios}
                keyExtractor={(comentario) => comentario.id}
                renderItem={({ item }) => <ComentarioItem comentario={item} />}
                contentContainerStyle={styles.lista}
                ListHeaderComponent={
                    <View style={styles.postRef}>
                        {post.avatar ? (
                            <Image source={{ uri: post.avatar }} style={styles.postRefAvatar} contentFit="cover" />
                        ) : (
                            <View style={styles.postRefAvatarPlaceholder} />
                        )}
                        <Text style={styles.postRefTexto} numberOfLines={2}>
                            <Text style={styles.postRefUsername}>{post.username} </Text>
                            {post.descripcion}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: '#0f1419',
    },
    topBar: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(38,42,48,0.6)',
    },
    cerrar: {
        fontSize: 18,
        color: '#dfe2eb',
    },
    titulo: {
        fontSize: 15,
        fontWeight: '700',
        color: '#dfe2eb',
    },
    espaciador: {
        width: 18,
    },
    lista: {
        paddingBottom: 24,
    },
    postRef: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(38,42,48,0.6)',
    },
    postRefAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    postRefAvatarPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#1c2026',
    },
    postRefTexto: {
        flex: 1,
        fontSize: 13,
        color: '#dfe2eb',
        lineHeight: 17,
    },
    postRefUsername: {
        fontWeight: '700',
    },
})

export default Comentarios
