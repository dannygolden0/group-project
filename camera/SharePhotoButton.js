import * as React from 'react';
import { Button, Share } from 'react-native';
import { captureRef } from "react-native-view-shot";
import * as Sharing from 'expo-sharing';

export default function SharePhotoButton({ memeView }) {
  return(
    <Button title="Share Photo" onPress={() => sharePhotoAsync(memeView)} />
  )
}

async function sharePhotoAsync(memeView) {
  if (!memeView.current) {
    console.log("The memeView is not rendered yet, cannot share");
    return;
  }

  const imgUri = await captureRef(memeView, {
    format: "png",
    quality: 0.5,
    result: "data-uri",
  });

  await Sharing.sharePhotoAsync(imgUri);
}