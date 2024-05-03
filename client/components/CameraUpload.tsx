import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import CameraButton from './CameraButton';
import * as ImagePicker from 'expo-image-picker';

interface Props {
    endpoint: string; // Define the type of the onPress prop
    onPress: (imageUri: string, result: string) => void;
}

const CameraUpload: React.FC<Props> = ({endpoint, onPress}) => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');
    })();
  }, []);

  const openCamera = async () => {
    if (cameraPermission === false) {
      Alert.alert('Permission Required', 'Please enable camera permissions to use this feature.');
      return;
    }

    console.log('before');

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log('after');

    if (!result.canceled) {
      Alert.alert('Picture Taken', `URI: ${result.assets[0].uri}`);
      uploadPhotoToServer(result.assets[0].uri);
    }
  };

  const uploadPhotoToServer = async (photoUri: string) => {
    console.log('upload started');
    const formData = new FormData();
    formData.append('file', { uri: photoUri, name: 'photo.jpg', type: 'image/jpeg' } as any);
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('upload done');
      
      if (response.ok) {
        const responseData = await response.json();
        if(photoUri) {
            onPress(photoUri, responseData.prediction)
          } else {
            onPress("", responseData.prediction)
          }
      } else {
        throw new Error('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      onPress("", "Upload failed.. Please try again");
    }
  };

  return (
    <View>
      <CameraButton onPress={openCamera} />
    </View>
  );
};

export default CameraUpload;
