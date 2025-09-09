import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Tabs, router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ColdRoomTabsLayout() {
  const pathname = usePathname();

  const getTabIndex = (pathname: string) => {
    if (pathname.includes('/index')) return 0;
    if (pathname.includes('/product')) return 1;
    if (pathname.includes('/miscellaneous')) return 2;
    if (pathname.includes('/results')) return 3;
    return 0;
  };

  const getCurrentTabIndex = () => getTabIndex(pathname);

  const navigateToTab = (direction: 'left' | 'right') => {
    const currentIndex = getCurrentTabIndex();
    const tabs = ['/', '/product', '/miscellaneous', '/results'];

    let newIndex;
    if (direction === 'left') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }

    router.push(`(tabs)${tabs[newIndex]}` as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1e40af" />
        </TouchableOpacity>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateToTab('left')}
          >
            <Ionicons name="chevron-back" size={28} color="#f97316" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cold Room Calculator</Text>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateToTab('right')}
          >
            <Ionicons name="chevron-forward" size={28} color="#f97316" />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#1e40af',
          tabBarInactiveTintColor: '#6b7280',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Room Details',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="product"
          options={{
            title: 'Product',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="leaf-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="miscellaneous"
          options={{
            title: 'Miscellaneous',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            title: 'Results',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 80,
  },
  backButton: {
    padding: 8,
    minWidth: 40,
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 4,
  },
  spacer: {
    width: 40,
  },
});