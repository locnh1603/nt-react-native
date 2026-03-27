import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import ImageAssets from '../../../assets/images';
import {styles} from './ListItem.styles';

interface ListItemData {
  title: string;
  body: string;
  imageUrl: string;
}

interface ListItemProps {
  item: ListItemData;
}

export const ListItem: FC<ListItemProps> = ({item}) => {
  return (
    <View style={styles.listItem}>
      <Image
        source={item.imageUrl ? {uri: item.imageUrl} : ImageAssets.logo}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </View>
  );
};

export default ListItem;
