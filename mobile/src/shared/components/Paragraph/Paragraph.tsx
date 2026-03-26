import React, {FC, ReactNode} from 'react';
import {Text} from 'react-native';
import {styles} from './Paragraph.styles';

interface ParagraphProps {
  children?: ReactNode;
}

export const Paragraph: FC<ParagraphProps> = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default Paragraph;
