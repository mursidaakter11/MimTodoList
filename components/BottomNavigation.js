import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { name: 'Today', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Tasks', icon: 'list-outline', activeIcon: 'list' },
  { name: 'Done', icon: 'checkmark-circle-outline', activeIcon: 'checkmark-circle' },
];

export default function BottomNavigation({ activeTab, onChange }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.item}
            onPress={() => onChange(tab.name)}
          >
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={23}
              color={active ? '#E85D91' : '#B5AAB8'}
            />

            <Text style={[styles.label, active && styles.activeLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 13,
    paddingBottom: 22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    justifyContent: 'space-around',
    elevation: 12,
  },

  item: {
    alignItems: 'center',
    gap: 5,
    minWidth: 65,
  },

  label: {
    fontSize: 11,
    color: '#AFA4B2',
    fontWeight: '600',
  },

  activeLabel: {
    color: '#E85D91',
    fontWeight: '900',
  },
});