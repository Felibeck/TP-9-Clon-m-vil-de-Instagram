import { StyleSheet, TextInput, View } from 'react-native'
import Svg, { Circle, Line } from 'react-native-svg'

const SearchBar = () => {
    return (
        <View style={styles.searchBar}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8e8e8e" strokeWidth={2}>
                <Circle cx="11" cy="11" r="8" />
                <Line x1="21" y1="21" x2="16.65" y2="16.65" />
            </Svg>
            <TextInput
                style={styles.searchInput}
                placeholder="Username, hashtag and story search"
                placeholderTextColor="#8e8e8e"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#efefef',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
})

export default SearchBar
