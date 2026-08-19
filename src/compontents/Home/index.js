import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IconSend } from './icons'
import { fetchFeed } from '../../services/unsplashApi'
import HistoriaItem from '../HistoriaItem'
import PostCard from '../PostCard'

const logo = require('../../../assets/logo-mark.png')

export const BUSQUEDA = 'luxury watches'
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
})

export default Home
