import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import UploadButtonWithIcon from './UploadButton';

interface Props {
  endpoint: string;
  onPress: (imageUri: string, result: string) => void; // Define the type of the onPress prop
}

const UploadButton: React.FC<Props> = ({ onPress, endpoint }) => {
  const handleUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: '*/*', // you can specify the file types you want to allow, e.g., 'application/pdf'
      });

      if (file.canceled !== true) {
        // You can perform further actions with the selected file here, like uploading it to a server.
        // For now, we'll just show an alert with the file details.
        Alert.alert(
          'File Selected',
          `Name: ${file.assets[0].name}\nSize: ${file.assets[0].size} bytes`
        );
        uploadFileToServer(file);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };



  const uploadFileToServer = async (file: DocumentPicker.DocumentPickerResult) => {
    if (file.assets && file.assets[0].uri) {
      const formData = new FormData();
      const fileToUpload = {
        uri: file.assets[0].uri,
        type: file.assets[0].mimeType || 'application/octet-stream', // or any other MIME type you want to use
        name: file.assets[0].name || 'uploaded_file'
      };

      formData.append('file', fileToUpload as any);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const responseJson = await response.json();
        if(file?.assets && file.assets.length > 0) {
          onPress(file.assets[0].uri, responseJson.prediction);
        } else {
          onPress("", responseJson.prediction);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        onPress("", error as string);
        // onPress("", "Upload failed.. Please try again");
      }
    }
  };

  return (
    <View>
      <UploadButtonWithIcon onPress={handleUpload} />
      {/* <Button title="Upload  Image" onPress={handleUpload} /> */}
    </View>
  );
};

export default UploadButton;
