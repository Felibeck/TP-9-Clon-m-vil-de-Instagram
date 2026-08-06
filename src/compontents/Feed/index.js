import { Pressable, StyleSheet, View } from 'react-native'
import Post from '../Post'

const Feed = ({ listaPosts, onPostClick, mostrarHeader = true }) => {
  return (
    <View style={styles.feed}>
      {listaPosts.map((post, i) => (
        <Pressable key={i} style={styles.postWrapper} onPress={() => onPostClick(post)}>
          <Post post={post} mostrarHeader={mostrarHeader} />
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  feed: {
    gap: 12,
  },
  postWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
})

export default Feed
