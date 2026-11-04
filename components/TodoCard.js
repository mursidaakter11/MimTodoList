import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TodoCard({
  item,
  onToggle,
  onDelete,
  onEdit,
}) {
  const priorityColor = {
    High: '#F16B83',
    Medium: '#E7A844',
    Low: '#6DBFA3',
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={onToggle}
        style={styles.checkButton}
      >
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={25}
          color={item.completed ? '#E85D91' : '#B9AEBB'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            item.completed && styles.completed,
          ]}
        >
          {item.title}
        </Text>

        <View style={styles.details}>
          <Text style={styles.category}>{item.category}</Text>

          <View
            style={[
              styles.priorityDot,
              { backgroundColor: priorityColor[item.priority] || '#999' },
            ]}
          />

          <Text style={styles.priority}>
            {item.priority}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onEdit} style={styles.action}>
        <Ionicons name="create-outline" size={19} color="#8C7D98" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} style={styles.action}>
        <Ionicons name="trash-outline" size={19} color="#E4779C" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#BDA5B7',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  checkButton: {
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#393044',
  },

  completed: {
    textDecorationLine: 'line-through',
    color: '#B4AAB7',
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  category: {
    fontSize: 11,
    color: '#A096A8',
    marginRight: 10,
  },

  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  priority: {
    fontSize: 11,
    color: '#A096A8',
  },

  action: {
    padding: 6,
  },
});