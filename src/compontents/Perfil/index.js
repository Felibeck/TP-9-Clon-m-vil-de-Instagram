import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { fetchFeed, fetchUsuario } from '../../services/unsplashApi'
import { BUSQUEDA, CANTIDAD_POSTS, mapearFotoAPost } from '../Home'

const BIO_POR_DEFECTO = '📸 Compartiendo lo mejor de watchGram'

const formatearNumero = (numero) => {
    if (!numero) return '0'
    if (numero >= 1000) return `${(numero / 1000).toFixed(1)}K`
    return `${numero}`
}

const Perfil = ({ navigation }) => {
    const [posts, setPosts] = useState([])
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        let cancelado = false

        const cargarPerfil = async () => {
            try {
                const fotosFeed = await fetchFeed(CANTIDAD_POSTS, BUSQUEDA)
                if (cancelado) return
                setPosts(fotosFeed.map(mapearFotoAPost))

                const username = fotosFeed[0]?.user?.username
                if (username) {
                    const usuarioCompleto = await fetchUsuario(username)
                    if (!cancelado) setUsuario(usuarioCompleto)
                }
            } catch (error) {
                console.error('No se pudo cargar el perfil de Unsplash', error)
            } finally {
                if (!cancelado) setCargando(false)
            }
        }

        cargarPerfil()

        return () => {
            cancelado = true
        }
    }, [])

    return (
        <View style={styles.pantalla}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitulo}>{usuario?.username ? `@${usuario.username}` : 'Perfil'}</Text>
            </View>

            {cargando ? (
                <ActivityIndicator style={styles.cargandoIndicador} color="#dfe2eb" />
            ) : (
                <ScrollView contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
                    <View style={styles.encabezado}>
                        {usuario?.profile_image?.large ? (
                            <Image source={{ uri: usuario.profile_image.large }} style={styles.avatar} contentFit="cover" />
                        ) : (
                            <View style={styles.avatarPlaceholder} />
                        )}

                        <Text style={styles.nombre}>{usuario?.name ?? 'Usuario watchGram'}</Text>
                        <Text style={styles.username}>@{usuario?.username ?? 'watchgram'}</Text>
                        <Text style={styles.bio}>{usuario?.bio || BIO_POR_DEFECTO}</Text>

                        <View style={styles.metricas}>
                            <View style={styles.metrica}>
                                <Text style={styles.metricaNumero}>{posts.length}</Text>
                                <Text style={styles.metricaLabel}>Publicaciones</Text>
                            </View>
                            <View style={styles.metrica}>
                                <Text style={styles.metricaNumero}>{formatearNumero(usuario?.total_likes)}</Text>
                                <Text style={styles.metricaLabel}>Seguidores</Text>
                            </View>
                            <View style={styles.metrica}>
                                <Text style={styles.metricaNumero}>{formatearNumero(usuario?.total_collections)}</Text>
                                <Text style={styles.metricaLabel}>Seguidos</Text>
                            </View>
                        </View>

                        <Pressable style={styles.editarBtn}>
                            <Text style={styles.editarBtnTexto}>Editar perfil</Text>
                        </Pressable>
                    </View>

                    <View style={styles.grilla}>
                        {posts.map((post) => (
                            <Pressable key={post.id} style={styles.grillaItem} onPress={() => navigation.navigate('DetallePost', { post })}>
                                <Image source={{ uri: post.foto }} style={styles.grillaItemFoto} contentFit="cover" />
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            )}
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
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(15,20,25,0.92)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(38,42,48,0.6)',
    },
    topBarTitulo: {
        fontSize: 16,
        fontWeight: '700',
        color: '#dfe2eb',
    },
    cargandoIndicador: {
        marginTop: 40,
    },
    contenido: {
        paddingBottom: 80,
    },
    encabezado: {
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 8,
    },
    avatarPlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 8,
        backgroundColor: '#1c2026',
    },
    nombre: {
        fontSize: 18,
        fontWeight: '700',
        color: '#dfe2eb',
    },
    username: {
        fontSize: 13,
        color: '#bfc7d4',
    },
    bio: {
        fontSize: 13,
        color: '#dfe2eb',
        textAlign: 'center',
        marginTop: 8,
    },
    metricas: {
        flexDirection: 'row',
        gap: 32,
        marginTop: 16,
    },
    metrica: {
        alignItems: 'center',
        gap: 2,
    },
    metricaNumero: {
        fontSize: 15,
        fontWeight: '700',
        color: '#dfe2eb',
    },
    metricaLabel: {
        fontSize: 11,
        color: '#bfc7d4',
    },
    editarBtn: {
        marginTop: 16,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#31353b',
    },
    editarBtnTexto: {
        fontSize: 13,
        fontWeight: '600',
        color: '#dfe2eb',
    },
    grilla: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
        paddingHorizontal: 2,
    },
    grillaItem: {
        width: '32.6%',
        aspectRatio: 1,
        backgroundColor: '#1c2026',
    },
    grillaItemFoto: {
        width: '100%',
        height: '100%',
    },
})

export default Perfil
