
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { logout } from '../utils/auth';

export default function Header({ userName }) {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      router.replace('/');

    } catch (error) {
      console.log('Logout Error:', error);
      Alert.alert('Error', 'Logout failed!');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <Text style={styles.greeting}>
          HELLO, THERE 👋
        </Text>

        <Text style={styles.title}>
          Mim Todo List
        </Text>

        <Text style={styles.subtitle}>
          Welcome, {userName || 'User'} ❤️
        </Text>
      </View>

      <View style={styles.right}>
        <View style={styles.profile}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons
            name="log-out-outline"
            size={17}
            color="#E85D91"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  left: {
    flex: 1,
  },

  greeting: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E4779C',
    letterSpacing: 2,
  },

  title: {
    fontSize: 25,
    fontWeight: '900',
    color: '#30283D',
    marginTop: 6,
  },

  subtitle: {
    fontSize: 12,
    color: '#A49AA9',
    marginTop: 5,
  },

  right: {
    alignItems: 'center',
    gap: 8,
  },

  profile: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#FFE2ED',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  logo: {
    width: 46,
    height: 46,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFE5EF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },

  logoutText: {
    color: '#E85D91',
    fontSize: 11,
    fontWeight: '800',
  },
});
