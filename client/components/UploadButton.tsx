// UploadButtonWithIcon.tsx
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const UploadButtonWithIcon: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: '#007aff', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
    <Image source={require('../assets/upload_white.png')} style={{ width: 24, height: 24 }} />
  </TouchableOpacity>
);

export default UploadButtonWithIcon;