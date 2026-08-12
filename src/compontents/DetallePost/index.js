import { Image } from 'expo-image'
import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { IconBookmark, IconComment, IconHeart, IconShare } from '../Home/icons'
import ComentarioItem from '../ComentarioItem'
import { generarComentarios, generarEtiquetas } from '../../utils/contenidoSimulado'

const DetallePost = ({ route, navigation }) => {
    const { post } = route.params
    const [liked, setLiked] = useState(false)
    const likes = post.likesBase + (liked ? 1 : 0)
    const comentarios = generarComentarios(post.id)
    const etiquetas = generarEtiquetas(post.descripcion)

    return (
        <View style={styles.pantalla}>
            <View style={styles.topBar}>
                <Pressable hitSlop={12} onPress={() => navigation.goBack()}>
                    <Text style={styles.cerrar}>✕</Text>
                </Pressable>
                <Text style={styles.titulo} numberOfLines={1}>
                    {post.username}
                </Text>
                <View style={styles.espaciador} />
            </View>

            <FlatList
                data={comentarios}
                keyExtractor={(comentario) => comentario.id}
                renderItem={({ item }) => <ComentarioItem comentario={item} />}
                contentContainerStyle={styles.lista}
                ListHeaderComponent={
                    <View>
                        <View style={styles.postHeader}>
                            {post.avatar ? (
                                <Image source={{ uri: post.avatar }} style={styles.avatar} contentFit="cover" />
                            ) : (
                                <View style={styles.avatarPlaceholder} />
                            )}
                            <View>
                                <Text style={styles.username}>{post.username}</Text>
                                {post.ubicacion && <Text style={styles.ubicacion}>{post.ubicacion}</Text>}
                            </View>
                        </View>

                        <View style={styles.fotoWrapper}>
                            {post.foto ? (
                                <Image source={{ uri: post.foto }} style={styles.foto} contentFit="cover" />
                            ) : (
                                <View style={styles.fotoPlaceholder} />
                            )}
                        </View>

                        <View style={styles.acciones}>
                            <View style={styles.accionesIzquierda}>
                                <Pressable hitSlop={8} onPress={() => setLiked((prev) => !prev)}>
                                    <IconHeart filled={liked} />
                                </Pressable>
                                <IconComment />
                                <IconShare />
                            </View>
                            <IconBookmark />
                        </View>

                        <Text style={styles.likes}>{likes.toLocaleString('en-US')} likes</Text>

                        <Text style={styles.caption}>
                            <Text style={styles.captionUsername}>{post.username} </Text>
                            {post.descripcion}
                        </Text>

                        {etiquetas.length > 0 && <Text style={styles.etiquetas}>{etiquetas.join('  ')}</Text>}

                        <Text style={styles.comentariosTitulo}>Comentarios</Text>
                    </View>
                }
            />
        </View>
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
        flex: 1,
        textAlign: 'center',
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
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1c2026',
    },
    username: {
        fontSize: 14,
        fontWeight: '700',
        color: '#dfe2eb',
    },
    ubicacion: {
        fontSize: 10,
        color: '#bfc7d4',
        marginTop: 2,
    },
    fotoWrapper: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#1c2026',
    },
    foto: {
        width: '100%',
        height: '100%',
    },
    fotoPlaceholder: {
        width: '100%',
        height: '100%',
    },
    acciones: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    accionesIzquierda: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    likes: {
        fontSize: 14,
        fontWeight: '700',
        color: '#dfe2eb',
        paddingHorizontal: 16,
    },
    caption: {
        fontSize: 14,
        color: '#dfe2eb',
        lineHeight: 18,
        paddingHorizontal: 16,
        marginTop: 6,
    },
    captionUsername: {
        fontWeight: '700',
    },
    etiquetas: {
        fontSize: 13,
        color: '#4a9eff',
        paddingHorizontal: 16,
        marginTop: 6,
    },
    comentariosTitulo: {
        fontSize: 13,
        fontWeight: '700',
        color: '#bfc7d4',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 4,
    },
})

export default DetallePost
