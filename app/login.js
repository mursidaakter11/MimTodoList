
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { login } from '../utils/auth';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Required', 'Please enter email and password.');
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

    if (result.success) {
      router.replace('/');
    } else {
      Alert.alert('Login Failed', result.message);
    }
  };

  const demoLogin = () => {
    setEmail('demo@mimtodo.com');
    setPassword('123456');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.brand}>Mim Todo List</Text>
          <Text style={styles.tagline}>
            Organize your day, beautifully.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Welcome Back!</Text>

          <Text style={styles.description}>
            Login to continue your productivity journey.
          </Text>

          <Text style={styles.label}>Email Address</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#C18AA5" />

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#B9ACB8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password</Text>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#C18AA5" />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#B9ACB8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={21}
                color="#A995A5"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgot}
            onPress={() =>
              Alert.alert(
                'Demo Account',
                'Demo password is 123456. This demo app does not have password recovery.'
              )
            }
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#EB76A4', '#C17CE0']}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>
                {loading ? 'Please wait...' : 'Login'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={demoLogin}
          >
            <Ionicons name="person-circle-outline" size={20} color="#D65E91" />
            <Text style={styles.demoText}>Use Demo Account</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account? 
            </Text>

            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signupText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.bottomText}>
          Made with love for a better day ❤️
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7FB',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 23,
    paddingVertical: 35,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    width: 85,
    height: 85,
  },

  brand: {
    fontSize: 25,
    fontWeight: '900',
    color: '#403044',
    marginTop: 10,
  },

  tagline: {
    fontSize: 13,
    color: '#A99BA9',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
    padding: 23,
    elevation: 5,
    shadowColor: '#D8A7C1',
    shadowOpacity: 0.12,
    shadowRadius: 15,
  },

  heading: {
    fontSize: 25,
    fontWeight: '900',
    color: '#403044',
  },

  description: {
    fontSize: 13,
    color: '#A99BA9',
    marginTop: 8,
    marginBottom: 23,
  },

  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#5B4A60',
    marginBottom: 9,
    marginTop: 13,
  },

  inputBox: {
    height: 54,
    borderWidth: 1,
    borderColor: '#F1E3EC',
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#403044',
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },

  forgotText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D65E91',
  },

  loginButton: {
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 23,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  demoButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#F0D7E5',
    borderRadius: 14,
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  demoText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D65E91',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  footerText: {
    color: '#A99BA9',
    fontSize: 13,
  },

  signupText: {
    color: '#D65E91',
    fontSize: 13,
    fontWeight: '900',
  },

  bottomText: {
    textAlign: 'center',
    color: '#B8A8B6',
    fontSize: 11,
    marginTop: 25,
  },
});
