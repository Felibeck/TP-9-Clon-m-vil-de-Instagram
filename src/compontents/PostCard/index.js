import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import AvatarAnillo from '../AvatarAnillo'
import { IconBookmark, IconComment, IconHeart, IconMenuDots, IconShare } from '../Home/icons'

const PostCard = ({ post }) => {
    const navigation = useNavigation()
    const [liked, setLiked] = useState(false)
    const cantLikesMostrado = post.likesBase + (liked ? 1 : 0)

    return (
        <View style={styles.post}>
            <View style={styles.postHeader}>
                <Pressable style={styles.postHeaderInfo} onPress={() => navigation.navigate('Perfil')}>
                    <AvatarAnillo uri={post.avatar} size={32} variante={post.tieneHistoria ? 'gradiente' : 'vista'} />
                    <View>
                        <Text style={styles.postUsername}>{post.username}</Text>
                        {post.ubicacion && <Text style={styles.postUbicacion}>{post.ubicacion}</Text>}
                    </View>
                </Pressable>
                <Pressable hitSlop={8} style={styles.postMenuBtn}>
                    <IconMenuDots />
                </Pressable>
            </View>

            <View style={styles.postImagenWrapper}>
                {post.foto ? (
                    <Image source={{ uri: post.foto }} style={styles.postImagen} contentFit="cover" />
                ) : (
                    <View style={styles.postImagenPlaceholder} />
                )}
            </View>

            <View style={styles.postAcciones}>
                <View style={styles.postAccionesFila}>
                    <View style={styles.postAccionesIzquierda}>
                        <Pressable hitSlop={8} onPress={() => setLiked((prev) => !prev)}>
                            <IconHeart filled={liked} />
                        </Pressable>
                        <Pressable hitSlop={8} onPress={() => navigation.navigate('Comentarios', { post })}>
                            <IconComment />
                        </Pressable>
                        <Pressable hitSlop={8}>
                            <IconShare />
                        </Pressable>
                    </View>

                    <Pressable hitSlop={8}>
                        <IconBookmark />
                    </Pressable>
                </View>

                <Text style={styles.postLikes}>{cantLikesMostrado.toLocaleString('en-US')} likes</Text>

                <Text style={styles.postDescripcion} numberOfLines={2}>
                    <Text style={styles.postDescripcionUsername}>{post.username} </Text>
                    {post.descripcion}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        marginTop: 24,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    postHeaderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    postUsername: {
        fontSize: 14,
        fontWeight: '700',
        color: '#dfe2eb',
    },
    postUbicacion: {
        fontSize: 10,
        color: '#bfc7d4',
        marginTop: 2,
    },
    postMenuBtn: {
        padding: 8,
    },
    postImagenWrapper: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#1c2026',
        overflow: 'hidden',
    },
    postImagen: {
        width: '100%',
        height: '100%',
    },
    postImagenPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1c2026',
    },
    postAcciones: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    postAccionesFila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postAccionesIzquierda: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    postLikes: {
        fontSize: 14,
        fontWeight: '700',
        color: '#dfe2eb',
    },
    postDescripcion: {
        fontSize: 14,
        color: '#dfe2eb',
        lineHeight: 18,
    },
    postDescripcionUsername: {
        fontWeight: '700',
    },
})

export default PostCard
