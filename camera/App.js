import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import TakePhotoButton from "./TakePhotoButton";
import ChoosePhotoButton from './ChoosePhotoButton';
import SharePhotoButton from './SharePhotoButton';

const { width: screenWidth } = Dimensions.get("window");

const photoTemplateImageUris = [
  'https://www1.villanova.edu/content/university/student-life/family/visit/_jcr_content/pagecontent/image.img.jpg/1599835358128.jpg',
  'https://www.villanovau.com/wp-content/uploads/2018/11/VU_Header_Image_0000_About-Villanova-Page.jpg',
];

export default function App() {
  const [topText, setTopText] = React.useState("Edit top text");
  const [bottomText, setBottomText] = React.useState("Edit bottom text");

  const placeholderMeme = photoTemplateImageUris[0];
  const [imgUri, setImgUri] = React.useState(placeholderMeme);

  const memeView = React.useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>PHOTO EDITOR</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setTopText(text)}
        value={topText}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setBottomText(text)}
        value={bottomText}
      />
    
    
      <View collapsable={false} ref={memeView}></View>


    <View>
      <Image
        source={{uri: imgUri}}
        style={{height: screenWidth, width: screenWidth}}
      />
      <Text style={[styles.photoText, {top: 5}]}> {topText} </Text>
      <Text style={[styles.photoText, {bottom: 5}]}> {bottomText} </Text>
    </View>

    <TakePhotoButton setImgUri={setImgUri} />
    <ChoosePhotoButton setImgUri={setImgUri} />
    <SharePhotoButton memeView={memeView} />

    <View style={{ flexDirection: 'row' }}>
      {photoTemplateImageUris.map((uri) => {
        return (
          <TouchableOpacity
            key={uri}
            onPress={() => {
              setImgUri(uri);
            }}>
            <Image source={{ uri }} style={styles.templateImage} />
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoText: {
    color: "white",
    fontSize: 38,
    fontWeight: "900",
    textAlign: "center",
    position: "absolute",
    left: 5,
    right: 5,
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { height: 2, width: 2 },
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    width: screenWidth,
  },
  templateImage: {
    height: 60,
    width: 60,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  titleText: {
    height: 40,
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Cochin',
    textAlign: 'center',

    
  }
});
