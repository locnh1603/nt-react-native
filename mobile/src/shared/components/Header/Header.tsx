import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';
import {FontAwesome} from '@react-native-vector-icons/fontawesome';
import {styles} from './Header.styles';

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>['name'];

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightIconName?: FontAwesomeIconName;
  onRightPress?: () => void;
}

export const Header: FC<HeaderProps> = ({
  title,
  onBack,
  rightIconName,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.sideButton}
        onPress={onBack}
        hitSlop={8}
        disabled={!onBack}>
        {onBack && (
          <FontAwesome name="arrow-left" size={18} color="#0D1B2A" />
        )}
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <Pressable
        style={styles.sideButton}
        onPress={onRightPress}
        hitSlop={8}
        disabled={!rightIconName}>
        {rightIconName && (
          <FontAwesome name={rightIconName} size={18} color="#0D1B2A" />
        )}
      </Pressable>
    </View>
  );
};

export default Header;
