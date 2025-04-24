import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        tabBarLabel: 'Home',
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="history" options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="time" size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="educate" options={{
        tabBarLabel: 'Educate',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="book" size={size} color={color} />
        )
      }} />
    </Tabs>
  );
}
