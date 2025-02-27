import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TextInput,
  Dimensions, 
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { profileFeed } from '@/placeholder';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface FeedItem {
  image: string;
  caption: string;
  id: string;
  createdBy: string;
}

const { width } = Dimensions.get('window');
const numColumns = 3;
const tileSize = (width - 40) / numColumns;

export default function ProfileScreen() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState('pink-flowers23131');
  const [profileImage, setProfileImage] = useState('https://placedog.net/400x400?id=11');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      const savedProfileImage = await AsyncStorage.getItem('profileImage');
      
      if (savedUsername) {
        setUsername(savedUsername);
      }
      
      if (savedProfileImage) {
        setProfileImage(savedProfileImage);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('profileImage', profileImage);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving profile data:', error);
      Alert.alert('Error', 'Failed to save profile data');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const renderPost = ({ item }: { item: FeedItem }) => {
    return (
      <View style={styles.postContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.postImage} 
          resizeMode="cover"
        />
      </View>
    );
  };

  if (isEditMode) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Ionicons name="exit-outline" size={24} color="#5fecc0" />
        </View>
        
        <View style={styles.editContent}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
            <Image 
              source={{ uri: profileImage }} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
          
          <TextInput
            style={styles.usernameInput}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          
          <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
            <Text style={styles.saveButtonText}>Save profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="exit-outline" size={24} color="#5fecc0" />
      </View>
      
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => setIsEditMode(true)}>
          <Image 
            source={{ uri: profileImage }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <Text style={styles.usernameText}>{username}</Text>
      </View>
      
      <FlatList
        data={profileFeed}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.postsGrid}
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  usernameText: {
    fontSize: 18,
    marginTop: 15,
    color: '#333',
  },
  postsGrid: {
    padding: 10,
  },
  postContainer: {
    margin: 5,
    width: tileSize,
    height: tileSize,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  editContent: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 50,
  },
  profileImageContainer: {
    marginBottom: 30,
  },
  usernameInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5fecc0',
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 16,
  },
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#5fecc0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});