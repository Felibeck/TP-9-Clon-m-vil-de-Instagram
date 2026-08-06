import { Image } from 'expo-image'
import { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Svg, { Line, Path, Polygon } from 'react-native-svg'
import ComentarioItem from '../ComentarioItem'

const comentariosFicticios = [
  { msj: '¡Muy bueno!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=1' } },
  { msj: '¡Muy bueno!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=2' } },
  { msj: '¡Muy bueno!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=3' } },
  { msj: '¡Buen ángulo!', cantLikes: 5, user: { username: 'user_name', fotoPerfil: 'https://i.pravatar.cc/40?img=4' } },
]

const PostDetalleModal = ({ post, onClose }) => {
  const [liked, setLiked] = useState(false)
  const cantLikesMostrado = post.cantLikes + (liked ? 1 : 0)

  const handleLikeClick = () => {
    setLiked((prev) => !prev)
  }

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.contenido} onPress={() => {}}>
          <Pressable style={styles.cerrarBtn} onPress={onClose} hitSlop={8}>
            <Text style={styles.cerrarTexto}>✕</Text>
          </Pressable>

          <View style={styles.header}>
            <Image source={post.usuario.fotoPerfil} style={styles.headerImg} contentFit="cover" />
            <Text style={styles.headerUsername}>@{post.usuario.username}</Text>
          </View>

          <ScrollView style={styles.body}>
            <Image source={post.foto} style={styles.foto} contentFit="cover" />

            <View style={styles.comentarios}>
              <View style={styles.descripcion}>
                <Image source={post.usuario.fotoPerfil} style={styles.descripcionAvatar} contentFit="cover" />
                <Text style={styles.descripcionTexto}>
                  <Text style={styles.descripcionUsername}>{post.usuario.username} </Text>
                  {post.descripcion ?? 'Un reloj que combina elegancia y precisión, perfecto para cualquier ocasión.'}
                </Text>
              </View>

              <View style={styles.comentariosLista}>
                {comentariosFicticios.map((c, i) => (
                  <ComentarioItem key={i} msj={c.msj} cantLikes={c.cantLikes} user={c.user} />
                ))}
              </View>

              <View style={styles.acciones}>
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
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2}>
                  <Line x1="22" y1="2" x2="11" y2="13" />
                  <Polygon points="22 2 15 22 11 13 2 9 22 2" />
                </Svg>
              </View>
              <Text style={styles.likes}>{cantLikesMostrado} likes</Text>

              <TextInput
                style={styles.comentarioInput}
                placeholder="Escribe aquí tu comentario..."
                placeholderTextColor="#8e8e8e"
                multiline
              />
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenido: {
    width: '92%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cerrarBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 6,
  },
  cerrarTexto: {
    fontSize: 16,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  headerImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  body: {
    flexGrow: 0,
  },
  foto: {
    width: '100%',
    aspectRatio: 1,
  },
  comentarios: {
    padding: 12,
    gap: 8,
  },
  descripcion: {
    flexDirection: 'row',
    gap: 8,
  },
  descripcionAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  descripcionTexto: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  descripcionUsername: {
    fontWeight: '600',
  },
  comentariosLista: {
    gap: 4,
  },
  acciones: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  likes: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  comentarioInput: {
    fontSize: 14,
    color: '#000',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#dbdbdb',
    paddingTop: 8,
    minHeight: 40,
  },
})

export default PostDetalleModal
