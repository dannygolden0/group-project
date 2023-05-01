import React from "react";
import { Button, Share } from "react-native";

export default function SharePhotoButton({ imgUri }) {
  const sharePhoto = async () => {
    try {
      const result = await Share.share({
        message: "Check out my photo!",
        url: imgUri,
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          // Shared
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log("Share dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return <Button title="Share Photo" onPress={sharePhoto} />;
}
/*
import * as React from 'react';
import { Button, Share } from 'react-native';
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import {useEffect, useRef, useState } from 'react';
import {StatusBar} from 'expo-status-bar';

export default function SharePhotoButton({ photoView }) {
const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

useEffect (() => {
    (async () => {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
    })();
}, []);

if (photo) {
    let sharePic = 
}

  return(
    <Button title="Share Photo" onPress={() => sharePhotoAsync(photoView)} />
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
} */