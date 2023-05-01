import * as React from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
//import { GLImage, SaturationFilter } from "react-native-gl-image-filters";

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

    

    // { cancelled: false, type: 'image', uri, width, height, exif, base64 }
    /*const glImage = new GLImage();
    glImage.setImage(image.uri);

    const saturationFilter = new SaturationFilter();
    saturationFilter.setIntensity(1.5);
    glImage.setFilter(saturationFilter);

    const result = await glImage.capture(); */

    setImgUri(image.uri);
  }
}