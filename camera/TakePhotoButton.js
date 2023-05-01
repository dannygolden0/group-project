import * as React from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function TakePhotoButton({ setImgUri }) {
  return (
    <Button title="Take a Photo" onPress={() => takePhotoAsync(setImgUri)} />
  );
}

async function takePhotoAsync(setImgUri) {
  
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  const isSuccessful = status === "granted";
  if (!isSuccessful) {
    alert("Camera permissions not granted");
    return;
  }

  const image = await ImagePicker.launchCameraAsync();
  if (!image.cancelled) {
    
    setImgUri(image.uri);
  }
}