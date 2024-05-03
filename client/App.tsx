import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, Button } from 'react-native';
import styles from './AppStyles';
import UploadImage from './components/UploadImage';
import CameraUpload from './components/CameraUpload';

const App: React.FC = () => {
  let endpoint = process.env.SEMFD_MODEL_SERVER_URL || 'http://34.135.244.136/predict';
  
  const [result, setResult] = useState("Upload file to detect disease if any.")
  const [imageUri, setImageUri] = useState("")
  const displayResult = (imageUri: string, result: string) => {
    setResult(result)
    setImageUri(imageUri)
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Crop Doctor</Text>
      </View>
      <View style={styles.container}>
        {
          imageUri !== "" ?
            <View>
              <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginHorizontal: "auto" }} />
              <Button
                title="Clear Selection"
                onPress={() => {
                  setImageUri("")
                  setResult("Upload file to detect disease if any.")
                }}
              />
            </View>
            :
            ""
        }
        <Text style={styles.bodyText}>{result}</Text>
      </View>
      <View style={styles.row}>
        <UploadImage endpoint={endpoint} onPress={displayResult} />
        <Text style={{fontSize: 24, marginHorizontal: 20}}>(or)</Text>
        <CameraUpload endpoint={endpoint} onPress={displayResult} />
      </View>
    </SafeAreaView>
  );
};

export default App;
