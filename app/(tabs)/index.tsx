import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState<{ safe: boolean; message: string } | null>(null);
  const [history, setHistory] = useState<{ url: string; safe: boolean }[]>([]);

  // Load history from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('scanHistory');
      if (saved) setHistory(JSON.parse(saved));
    })();
  }, []);

  // Save updated history whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('scanHistory', JSON.stringify(history));
  }, [history]);

  // Select API URL based on platform (iOS Simulator, Android Emulator, or Physical Device)
  const API_BASE = Platform.select({
    ios: 'http://localhost:5000', // For iOS Simulator
    android: 'http://10.0.2.2:5000', // For Android Emulator
    default: 'http://10.12.95.96:5000', // For physical devices (replace with your local IP)
  });

  const checkLink = async () => {
    if (!link) return;
    setResult({ safe: true, message: 'Checking...' });

    try {
      const { data } = await axios.post<{ safe: boolean; message: string }>(
        `${API_BASE}/api/check-link`,
        { url: link }
      );

      setResult(data);

      // Append to history
      setHistory(prev => [{ url: link, safe: data.safe }, ...prev]);
      setLink('');
    } catch {
      setResult({ safe: false, message: 'Error contacting API' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SafeClicks Scanner</Text>

      <TextInput
        placeholder="Enter URL"
        style={styles.input}
        value={link}
        onChangeText={setLink}
      />
      <Button title="Check Link" onPress={checkLink} />

      {result && (
        <Text style={[styles.result, { color: result.safe ? 'green' : 'red' }]}>
          {result.message}
        </Text>
      )}

      <Text style={styles.subheader}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, i) => `${item.url}-${i}`}
        renderItem={({ item }) => (
          <Text style={{ color: item.safe ? 'green' : 'red', marginVertical: 2 }}>
            {item.url} — {item.safe ? 'Safe' : 'Unsafe'}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, marginBottom: 12, textAlign: 'center' },
  subheader: { fontSize: 18, marginTop: 20, marginBottom: 8 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  result: { marginTop: 10, fontSize: 16, textAlign: 'center' },
});
