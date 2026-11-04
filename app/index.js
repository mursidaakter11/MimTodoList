import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header';
import TodoCard from '../components/TodoCard';
import AddTask from '../components/AddTask';
import BottomNavigation from '../components/BottomNavigation';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert } from 'react-native';
import { getSession } from '../utils/auth';
import { logout } from '../utils/auth';
import { saveTasks, loadTasks } from '../utils/storage';
export default function HomeScreen() {
  const router = useRouter();

const [authReady, setAuthReady] = useState(false);
const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  const checkLogin = async () => {
    const session = await getSession();

    if (!session) {
      router.replace('/login');
      return;
    }

    setCurrentUser(session);
    setAuthReady(true);
  };

  checkLogin();
  
}, []);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Today');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const savedTasks = await loadTasks();
      setTasks(savedTasks);
      setLoaded(true);
    };

    getTasks();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveTasks(tasks);
    }
  }, [tasks, loaded]);

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  const progress = tasks.length
    ? completedCount / tasks.length
    : 0;

  const visibleTasks = useMemo(() => {
    return tasks.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTab =
        activeTab === 'Done'
          ? item.completed
          : activeTab === 'Tasks'
            ? true
            : !item.completed;

      return matchesSearch && matchesTab;
    });
  }, [tasks, search, activeTab]);

  const handleSaveTask = (data) => {
    if (editingTask) {
      setTasks((old) =>
        old.map((item) =>
          item.id === editingTask.id
            ? { ...item, ...data }
            : item
        )
      );
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        ...data,
        completed: false,
      };

      setTasks((old) => [newTask, ...old]);
    }
  };

  const handleEdit = (item) => {
    setEditingTask(item);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setTasks((old) => old.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setTasks((old) =>
      old.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const openAddModal = () => {
    setEditingTask(null);
    setModalVisible(true);
  };
  const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          router.replace('/login');
          } catch (error){
            Alert.alert('Error', error.message)
          }
        },
      },
    ]
  );
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <Header 
              userName={currentUser?.name || 'User'}
              onLogout={handleLogout}
              />
              

              <LinearGradient
                colors={['#E85D91', '#B987E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hero}
              >
                <View style={styles.heroTop}>
                  <View>
                    <Text style={styles.heroLabel}>
                      YOUR DAILY PROGRESS
                    </Text>

                    <Text style={styles.heroTitle}>
                      Keep it up!
                    </Text>
                  </View>

                  <View style={styles.heroIcon}>
                    <Ionicons
                      name="trophy"
                      size={25}
                      color="#FFFFFF"
                    />
                  </View>
                </View>

                <Text style={styles.heroSubtitle}>
                  {completedCount} of {tasks.length} tasks completed
                </Text>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress * 100}%` },
                    ]}
                  />
                </View>

                <Text style={styles.progressText}>
                  {Math.round(progress * 100)}% Completed
                </Text>
              </LinearGradient>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#FFE4EF' }]}>
                    <Ionicons name="time-outline" size={21} color="#E85D91" />
                  </View>

                  <Text style={styles.statNumber}>{pendingCount}</Text>
                  <Text style={styles.statLabel}>Pending</Text>
                </View>

                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#E9E1FF' }]}>
                    <Ionicons name="checkmark-done" size={21} color="#9772D8" />
                  </View>

                  <Text style={styles.statNumber}>{completedCount}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>

                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#DFF7EE' }]}>
                    <Ionicons name="list-outline" size={21} color="#50B995" />
                  </View>

                  <Text style={styles.statNumber}>{tasks.length}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  My Tasks
                </Text>

                <TouchableOpacity onPress={openAddModal}>
                  <Text style={styles.addText}>+ Add New</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.searchBox}>
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#A99EAE"
                />

                <TextInput
                  style={styles.searchInput}
                  placeholder="Search your tasks..."
                  placeholderTextColor="#B8AEBB"
                  value={search}
                  onChangeText={setSearch}
                />

                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <Ionicons name="close-circle" size={19} color="#A99EAE" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.filterRow}>
                {['Today', 'Tasks', 'Done'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.filterButton,
                      activeTab === tab && styles.activeFilter,
                    ]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        activeTab === tab && styles.activeFilterText,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          }
          renderItem={({ item }) => (
            <TodoCard
              item={item}
              onToggle={() => handleToggle(item.id)}
              onDelete={() => handleDelete(item.id)}
              onEdit={() => handleEdit(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons
                name="clipboard-outline"
                size={45}
                color="#D7C8D8"
              />

              <Text style={styles.emptyTitle}>
                No tasks found!
              </Text>

              <Text style={styles.emptySubtitle}>
                Add a new task and start your day.
              </Text>
            </View>
          }
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={openAddModal}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>

        <BottomNavigation
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <AddTask
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          editingTask={editingTask}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8FB',
  },

  container: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 20,
  },
  

  hero: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },

  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heroLabel: {
    fontSize: 10,
    color: '#FFE8F1',
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 7,
  },

  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 20,
    marginBottom: 12,
  },

  progressBackground: {
    height: 9,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  progressText: {
    fontSize: 11,
    color: '#FFFFFF',
    marginTop: 9,
    fontWeight: '700',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
  },

  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#393044',
  },

  statLabel: {
    fontSize: 10,
    color: '#A79BAA',
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#30283D',
  },

  addText: {
    color: '#E85D91',
    fontWeight: '800',
    fontSize: 13,
  },

  searchBox: {
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 17,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#393044',
  },

  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 17,
  },

  filterButton: {
    backgroundColor: '#F1EAF1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  activeFilter: {
    backgroundColor: '#E85D91',
  },

  filterText: {
    fontSize: 12,
    color: '#8F8294',
    fontWeight: '700',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 35,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#51445A',
    marginTop: 12,
  },

  emptySubtitle: {
    fontSize: 12,
    color: '#A99EAE',
    marginTop: 6,
  },

  floatingButton: {
    position: 'absolute',
    right: 22,
    bottom: 92,
    width: 57,
    height: 57,
    borderRadius: 20,
    backgroundColor: '#E85D91',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: '#E85D91',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});