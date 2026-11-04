import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = ['Personal', 'Work', 'Study'];
const priorities = ['Low', 'Medium', 'High'];

export default function AddTask({
  visible,
  onClose,
  onSave,
  editingTask,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    if (visible) {
      setTitle(editingTask?.title || '');
      setCategory(editingTask?.category || 'Personal');
      setPriority(editingTask?.priority || 'Medium');
    }
  }, [visible, editingTask]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      category,
      priority,
    });

    setTitle('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.heading}>
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={27} color="#B8A8B6" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Task Name</Text>

          <TextInput
            style={styles.input}
            placeholder="What do you need to do?"
            placeholderTextColor="#B8AFBA"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Category</Text>

          <View style={styles.options}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  category === item && styles.selected,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    category === item && styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Priority</Text>

          <View style={styles.options}>
            {priorities.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  priority === item && styles.selected,
                ]}
                onPress={() => setPriority(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    priority === item && styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>
              {editingTask ? 'Update Task' : 'Add Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(38,25,42,0.4)',
    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor: '#FFF9FC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#30283D',
  },

  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#62566B',
    marginBottom: 10,
    marginTop: 15,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: '#30283D',
  },

  options: {
    flexDirection: 'row',
    gap: 9,
    flexWrap: 'wrap',
  },

  option: {
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 12,
    backgroundColor: '#F0EAF0',
  },

  selected: {
    backgroundColor: '#F5C7D9',
  },

  optionText: {
    fontSize: 13,
    color: '#85788A',
    fontWeight: '700',
  },

  selectedText: {
    color: '#B83F72',
  },

  saveButton: {
    backgroundColor: '#E85D91',
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
});