import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function Home() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState('');

  const checkLink = () => {
    // Placeholder for link-checking logic
    if (link) {
      setResult('Checking...');
      // Call the backend to check the link here
      setTimeout(() => {
        setResult(link.includes('phishing') ? 'Unsafe Link' : 'Safe Link');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SafeClicks - Home Screen</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Link to Check"
        value={link}
        onChangeText={setLink}
      />
      <Button title="Check Link" onPress={checkLink} />
      
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});
