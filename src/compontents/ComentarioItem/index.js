import { Image } from 'expo-image'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { IconHeart } from '../Home/icons'

const ComentarioItem = ({ comentario }) => {
    const [liked, setLiked] = useState(false)
    const likes = comentario.likesBase + (liked ? 1 : 0)

    return (
        <View style={styles.comentario}>
            <Image source={{ uri: comentario.usuario.avatar }} style={styles.avatar} contentFit="cover" />

            <View style={styles.cuerpo}>
                <Text style={styles.texto}>
                    <Text style={styles.username}>{comentario.usuario.username} </Text>
                    {comentario.mensaje}
                </Text>
                {likes > 0 && <Text style={styles.likes}>{likes} me gusta</Text>}
            </View>

            <Pressable hitSlop={8} onPress={() => setLiked((prev) => !prev)}>
                <IconHeart size={13} filled={liked} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    comentario: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    cuerpo: {
        flex: 1,
        gap: 2,
    },
    texto: {
        fontSize: 13,
        color: '#dfe2eb',
        lineHeight: 17,
    },
    username: {
        fontWeight: '700',
    },
    likes: {
        fontSize: 11,
        color: '#bfc7d4',
    },
})

export default ComentarioItem
