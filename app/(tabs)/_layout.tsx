import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LogoutComponent } from "@/components/LogoutComponent";

function TabBarIcon({ 
  name, 
  color 
}: { 
  name: keyof typeof Ionicons.glyphMap; 
  color: string 
}) {
  return <Ionicons name={name} size={24} color={color} />;
}

export default function TabLayout() {
  const tintColor = '#5fecc0';

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerRight: () => <LogoutComponent />,
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: 'white',
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          zIndex: 999,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home Feed',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ), 
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ), 
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
            />
          ), 
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ), 
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'My Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          title: 'User Profile',
          href: null,
        }}
      />
      
      <Tabs.Screen
        name="profile/edit"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}