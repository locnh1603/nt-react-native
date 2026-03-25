import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ListItemProps {
  item: {
    title: string;
    body: string;
    imageUrl: string;
  };
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
    const placeholderImage = require('../assets/images/logo.png');

  return (
    <View style={styles.listItem}>
      <Image
        source={item.imageUrl ? { uri: item.imageUrl } : placeholderImage}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Title: {item.title}</Text>
        <Text style={styles.body}>{item.imageUrl}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
});

export default ListItem;
