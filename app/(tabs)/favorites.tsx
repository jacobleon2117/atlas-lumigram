import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { favoritesFeed } from '@/placeholder';
import { Ionicons } from '@expo/vector-icons';

interface FeedItem {
  image: string;
  caption: string;
  id: string;
  createdBy: string;
}

const { width } = Dimensions.get('window');

const Post: React.FC<{ item: FeedItem }> = ({ item }) => {
  const [showCaption, setShowCaption] = useState(false);

  const handleLongPress = () => {
    setShowCaption(true);
  };
  
  const handlePressOut = () => {
    setShowCaption(false);
  };

  let lastTap = 0;
  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      Alert.alert('Double Tap', 'Image liked!');
    } else {
      lastTap = now;
    }
  };

  return (
    <View style={styles.postContainer}>
      <TouchableWithoutFeedback
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.image }}
            style={styles.postImage} 
            resizeMode="cover"
          />
          {showCaption && (
            <View style={styles.captionOverlay}>
              <Text style={styles.captionText}>{item.caption}</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Ionicons name="exit-outline" size={24} color="#5fecc0" />
      </View>
      <FlashList
        data={favoritesFeed}
        renderItem={({ item }: { item: FeedItem }) => <Post item={item} />}
        estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  postContainer: {
    marginBottom: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  postImage: {
    width: width - 20,
    height: width - 20,
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  captionText: {
    color: 'white',
    fontSize: 16,
  },
});