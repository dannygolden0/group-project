import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import {shareAsyc} from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();


  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

const takePicture = async () => {
  if (camera){
    const data=await camera.takePictureAsync(null)
    setImage(data.uri);
  }
}

if (hasCameraPermission === false){
  return <Text>No Camera Access</Text>
}

if (photo) {
  let sharePic =() => {
    shareAsyc(photo.uri).then(() => {
      setPhoto(undefinied);
    });
  };

let savePhoto = () => {
  MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    setPhoto(undefined);
  });
};

}

return (
  <SafeAreaView style={styles.container}>
    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
    <Button title="Share" onPress={sharePic} />
    {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
    <Button title="Discard" onPress={() => setPhoto(undefined)} />
  </SafeAreaView>
);
}

  return (
    <View style={{flex:1}}>
      <View style ={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)}
        style = {styles.fixedRatio}
        type={type}
        ratio={'1:1'}
        />
      </View>
      <Button
      title="Flip Camera"
      onPress={() => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
      }}></Button>
      <Button title = "Take Picture"
      onPress={() => takePicture()}
      />
      {image && <Image source={{uri: image}} style = {{flex:1}} />}
    </View>
  );

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection:'row'
  },
  fixedRatio: {
    flex:1,
    aspectRatio:1
  }
});
