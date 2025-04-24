import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Educate() {
  const tips = [
    {
      title: 'Check URLs Carefully',
      icon: 'link',
      description: 'Avoid clicking on suspicious links. Look for misspellings or strange domain names.',
    },
    {
      title: 'Don’t Share OTPs',
      icon: 'lock-closed',
      description: 'Never share your OTPs or passwords with anyone, even if they claim to be from a trusted source.',
    },
    {
      title: 'Use Two-Factor Authentication',
      icon: 'shield-checkmark',
      description: 'Always enable 2FA for your accounts to add an extra layer of security.',
    },
    {
      title: 'Avoid Public Wi-Fi',
      icon: 'wifi',
      description: 'Avoid making transactions or logging into accounts over public Wi-Fi networks.',
    },
    {
      title: 'Stay Updated',
      icon: 'refresh-circle',
      description: 'Keep your apps and operating systems updated to protect against vulnerabilities.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Stay Safe Online</Text>

      {/* Classic Tips */}
      {tips.map((tip, index) => (
        <View key={index} style={styles.card}>
          <Ionicons name={tip.icon as any} size={28} color="#007AFF" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{tip.title}</Text>
            <Text style={styles.description}>{tip.description}</Text>
          </View>
        </View>
      ))}

      {/* Graphical Highlight Section */}
      <View style={styles.graphicCard}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6195/6195700.png' }}
          style={styles.graphicIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.graphicTitle}>Hover Before You Click</Text>
          <Text style={styles.description}>
            Always hover over links to preview the real destination before clicking.
          </Text>
        </View>
      </View>

      {/* Different Icon Library */}
      <View style={styles.cardAlt}>
        <MaterialCommunityIcons name="email-alert" size={28} color="#FF3B30" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Verify Suspicious Emails</Text>
          <Text style={styles.description}>
            Don’t trust urgent messages. Double-check the sender’s email and ask someone you trust.
          </Text>
        </View>
      </View>

      {/* Illustration-Based Tip */}
      <View style={styles.imageTip}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2099/2099071.png' }}
          style={styles.largeIcon}
        />
        <Text style={styles.tipHeader}>Keep Your Devices Locked</Text>
        <Text style={styles.descriptionCenter}>
          Use strong passwords and auto-lock settings to secure your devices from unauthorized access.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f4f6f9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardAlt: {
    flexDirection: 'row',
    backgroundColor: '#fff3f3',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderColor: '#ffdcdc',
    borderWidth: 1,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  graphicCard: {
    flexDirection: 'row',
    backgroundColor: '#e7f7f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderColor: '#b4e5eb',
    borderWidth: 1,
  },
  graphicIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  graphicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00797e',
  },
  imageTip: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  largeIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  tipHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  descriptionCenter: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});
