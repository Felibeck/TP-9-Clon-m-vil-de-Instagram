import { Image } from 'expo-image'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Line, Path, Polygon } from 'react-native-svg'

const Post = ({ post, mostrarHeader = true }) => {
    const [liked, setLiked] = useState(false)

    const handleLikeClick = () => {
        setLiked((prev) => !prev)
    }

    return (
        <View style={styles.post}>
            {mostrarHeader && (
                <View style={styles.postHeader}>
                    <Image source={post.usuario.fotoPerfil} style={styles.headerAvatar} contentFit="cover" />
                    <Text style={styles.headerUsername}>{post.usuario.username}</Text>
                </View>
            )}

            <Image source={post.foto} style={styles.postFoto} contentFit="cover" />

            <View style={styles.postAcciones}>
                <Image source={post.usuario.fotoPerfil} style={styles.miniAvatar} contentFit="cover" />

                <Pressable onPress={handleLikeClick} hitSlop={8}>
                    <Svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill={liked ? '#e1306c' : 'none'}
                        stroke={liked ? '#e1306c' : '#000'}
                        strokeWidth={2}
                    >
                        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </Svg>
                </Pressable>

                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2}>
                    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </Svg>
                <Text style={styles.comentariosCount}>{post.comentarios?.length}</Text>

                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2}>
                    <Line x1="22" y1="2" x2="11" y2="13" />
                    <Polygon points="22 2 15 22 11 13 2 9 22 2" />
                </Svg>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: '#fff',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    headerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    headerUsername: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    postFoto: {
        width: '100%',
        aspectRatio: 1,
    },
    postAcciones: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    miniAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    comentariosCount: {
        fontSize: 13,
        color: '#000',
    },
})

export default Post
