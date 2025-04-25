// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

export default function Home() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState<string>('');

  const API_BASE = Platform.select({
    ios: 'http://localhost:5000',
    android: 'http://10.0.2.2:5000',
    default: 'http://10.12.95.96:5000',
  });

  interface ApiResponse {
    message: string;
  }

  const checkLink = async () => {
    if (!link.trim()) return;
    Keyboard.dismiss();
    setResult('Checking...');
    try {
      const { data } = await axios.post<ApiResponse>(
        `${API_BASE}/api/check-link`,
        { url: link.trim() }
      );
      setResult(data.message);
    } catch {
      setResult('Error contacting API');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SafeClicks</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste link here"
        value={link}
        onChangeText={setLink}
        autoCapitalize="none"
      />
      <Button title="Check" onPress={checkLink} />
      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  header: { fontSize:24, textAlign:'center', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:10, borderRadius:5 },
  result: { textAlign:'center', marginTop:20, fontSize:18 }
});
