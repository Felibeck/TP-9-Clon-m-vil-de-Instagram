import { StyleSheet, Text, View } from 'react-native'
import AvatarAnillo from '../AvatarAnillo'
import { IconPlus } from '../Home/icons'

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

const styles = StyleSheet.create({
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
})

export default HistoriaItem
