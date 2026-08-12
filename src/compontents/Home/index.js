import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IconBookmark, IconComment, IconHeart, IconMenuDots, IconPlus, IconSend, IconShare } from './icons'
import { fetchFeed } from '../../services/unsplashApi'

const logo = require('../../../assets/logo-mark.png')

const GRADIENT_HISTORIA = ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']
export const BUSQUEDA = 'luxury cars'
export const CANTIDAD_POSTS = 10
const CANTIDAD_HISTORIAS = 5

const miHistoria = { id: 'yo', username: 'Your Story', esPropia: true }

// La API no siempre trae ubicación real, así que se simula una por posteo (rota entre estas ciudades).
const UBICACIONES_SIMULADAS = [
    'Buenos Aires, AR',
    'Ciudad de México, MX',
    'Madrid, ES',
    'Bogotá, CO',
    'Santiago, CL',
    'Lima, PE',
    'Barcelona, ES',
    'Montevideo, UY',
    'Miami, US',
    'Nueva York, US',
]

export const mapearFotoAPost = (foto, index) => ({
    id: foto.id,
    username: foto.user?.username ? `@${foto.user.username}` : '@watchgram',
    avatar: foto.user?.profile_image?.medium,
    foto: foto.urls?.regular,
    ubicacion: foto.location?.title || foto.location?.name || UBICACIONES_SIMULADAS[index % UBICACIONES_SIMULADAS.length],
    likesBase: foto.likes ?? 0,
    descripcion: foto.alt_description || foto.description || 'Sin descripción',
    tieneHistoria: index % 2 === 0,
})

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

const HistoriaItem = ({ historia }) => (
    <View style={styles.historiaItem}>
        <AvatarAnillo uri={historia.avatar} size={historia.esPropia ? 64 : 68} variante={historia.esPropia ? 'propia' : historia.vista ? 'vista' : 'gradiente'}>
            {historia.esPropia && (
                <View style={styles.historiaPlusBadge}>
                    <IconPlus size={9} />
                </View>
            )}
        </AvatarAnillo>
        <Text style={[styles.historiaUsername, historia.vista && styles.historiaUsernameVista]} numberOfLines={1}>
            {historia.username}
        </Text>
    </View>
)

const PostCard = ({ post }) => {
    const navigation = useNavigation()
    const [liked, setLiked] = useState(false)
    const cantLikesMostrado = post.likesBase + (liked ? 1 : 0)

    return (
        <View style={styles.post}>
            <View style={styles.postHeader}>
                <View style={styles.postHeaderInfo}>
                    <AvatarAnillo uri={post.avatar} size={32} variante={post.tieneHistoria ? 'gradiente' : 'vista'} />
                    <View>
                        <Text style={styles.postUsername}>{post.username}</Text>
                        {post.ubicacion && <Text style={styles.postUbicacion}>{post.ubicacion}</Text>}
                    </View>
                </View>
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

const Home = () => {
    const [historias, setHistorias] = useState([miHistoria])
    const [posts, setPosts] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        let cancelado = false

        const cargarFeed = async () => {
            try {
                const fotos = await fetchFeed(CANTIDAD_POSTS, BUSQUEDA)
                if (cancelado) return

                const postsNuevos = fotos.map(mapearFotoAPost)

                setPosts(postsNuevos)
                setHistorias([
                    miHistoria,
                    ...postsNuevos.slice(0, CANTIDAD_HISTORIAS).map((post, i) => ({
                        id: `historia-${post.id}`,
                        username: post.username,
                        avatar: post.avatar,
                        vista: i % 2 !== 0,
                    })),
                ])
            } catch (error) {
                console.error('No se pudo cargar el feed de Unsplash', error)
            } finally {
                if (!cancelado) setCargando(false)
            }
        }

        cargarFeed()

        return () => {
            cancelado = true
        }
    }, [])

    return (
        <SafeAreaView style={styles.pantalla} edges={['top']}>
            <View style={styles.topBar}>
                <Image source={logo} style={styles.logo} contentFit="contain" />
                <Text style={styles.topBarTitulo}>Instagram</Text>
                <IconSend />
            </View>

            <FlatList
                data={posts}
                keyExtractor={(post) => post.id}
                renderItem={({ item }) => <PostCard post={item} />}
                contentContainerStyle={styles.contenido}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.historiasSection}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.historiasFila}>
                            {historias.map((historia) => (
                                <HistoriaItem key={historia.id} historia={historia} />
                            ))}
                        </ScrollView>
                    </View>
                }
                ListEmptyComponent={cargando ? <ActivityIndicator style={styles.cargandoIndicador} color="#dfe2eb" /> : null}
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
        backgroundColor: 'rgba(15,20,25,0.92)',
    },
    topBarTitulo: {
        fontSize: 20,
        fontWeight: '800',
        fontStyle: 'italic',
        color: '#dfe2eb',
    },
    logo: {
        width: 30,
        height: 30,
    },
    contenido: {
        paddingBottom: 80,
    },
    cargandoIndicador: {
        marginTop: 40,
    },
    historiasSection: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(38,42,48,0.6)',
        paddingVertical: 16,
    },
    historiasFila: {
        gap: 16,
        paddingHorizontal: 16,
    },
    historiaItem: {
        width: 72,
        alignItems: 'center',
        gap: 4,
    },
    historiaUsername: {
        fontSize: 10,
        color: '#dfe2eb',
        textAlign: 'center',
    },
    historiaUsernameVista: {
        color: '#bfc7d4',
    },
    historiaPlusBadge: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0095f6',
        borderWidth: 2,
        borderColor: '#0f1419',
        alignItems: 'center',
        justifyContent: 'center',
    },
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

export default Home
