
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { signup } from '../utils/auth';

export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Required', 'Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    const result = await signup(name.trim(), email.trim(), password);

    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Account Created!',
        'Welcome to Mim Todo List!',
        [{ text: 'Continue', onPress: () => router.replace('/') }]
      );
    } else {
      Alert.alert('Signup Failed', result.message);
    }
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={23} color="#514354" />
        </TouchableOpacity>

        <View style={styles.headingContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Let's start your productive journey!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>

          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={20} color="#C18AA5" />

            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#B9ACB8"
              value={name}
              onChangeText={setName}
            />
          </View>

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
              placeholder="Create password"
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

          <Text style={styles.label}>Confirm Password</Text>

          <View style={styles.inputBox}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#C18AA5" />

            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#B9ACB8"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#EB76A4', '#C17CE0']}
              style={styles.signupButton}
            >
              <Text style={styles.signupButtonText}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>

            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={styles.loginText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.bottomText}>
          Welcome to Mim Todo List ❤️
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

  backButton: {
    width: 45,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  headingContainer: {
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#403044',
  },

  subtitle: {
    color: '#A99BA9',
    fontSize: 13,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 23,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#D8A7C1',
    shadowOpacity: 0.12,
    shadowRadius: 15,
  },

  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#5B4A60',
    marginBottom: 9,
    marginTop: 15,
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
    color: '#403044',
    fontSize: 14,
  },

  signupButton: {
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 30,
  },

  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  footerText: {
    fontSize: 13,
    color: '#A99BA9',
  },

  loginText: {
    fontSize: 13,
    color: '#D65E91',
    fontWeight: '900',
  },

  bottomText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#B8A8B6',
    marginTop: 25,
  },
});
