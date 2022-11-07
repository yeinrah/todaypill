import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { fetchAllSupplements } from "../../API/supplementAPI";
import PillItem, { PillProps } from "../Pills/PillItem";

// const dummyPills: PillProps[] = [
//   {
//     // image: require("../../assets/images/pills/sample1.png"),
//     image:
//       "http://www.ckdhc.com/upload/images/2022/09/23/4780647029480112efc3f69ab03891713bc1d2a29134a323adf20e5619dbf5d9",
//     brand: "종근당건강",
//     pill: "락토핏 생유산균 코어",
//   },
//   {
//     image: "https://cdn.pillyze.io/products/v1/10k/f7ac75f0-10992/1000",
//     // image: require("../../assets/images/pills/sample2.png"),
//     brand: "닥터스베스트",
//     pill: "킬레이트 마그네슘",
//   },
//   {
//     image: "https://dimg.donga.com/wps/NEWS/IMAGE/2014/09/27/66754815.1.jpg",
//     // image: require("../../assets/images/pills/sample3.png"),
//     brand: "고려은단",
//     pill: "비타민C 1000",
//   },
//   {
//     image:
//       "https://contents.lotteon.com/itemimage/LO/14/19/59/10/62/_1/41/95/91/06/3/LO1419591062_1419591063_1.jpg",
//     // image: require("../../assets/images/pills/sample4.png"),
//     brand: "종근당건강",
//     pill: "칼슘 앤 마그네슘",
//   },
//   {
//     image:
//       "https://contents.lotteon.com/itemimage/LO/14/19/59/10/62/_1/41/95/91/06/3/LO1419591062_1419591063_1.jpg",
//     // image: require("../../assets/images/pills/sample4.png"),
//     brand: "종근당건강",
//     pill: "칼슘 앤 마그네슘",
//   },
//   {
//     image:
//       "https://contents.lotteon.com/itemimage/LO/14/19/59/10/62/_1/41/95/91/06/3/LO1419591062_1419591063_1.jpg",
//     // image: require("../../assets/images/pills/sample4.png"),
//     brand: "종근당건강",
//     pill: "칼슘 앤 마그네슘",
//   },
// ];

export default function MyPickPills() {
  const [pickedPills, setPickedPills] = useState([]);
  const [userId, setUserId] = useState(0);

  const getAllSupplements = async () => {
    const currentUserId = await AsyncStorage.getItem("@storage_UserId");
    setUserId(parseInt(currentUserId));
    const allSupplements = await fetchAllSupplements();
    setPickedPills(allSupplements);
  };

  useEffect(() => {
    getAllSupplements();
  }, []);

  return (
    <View style={styles.likeContainer}>
      <View style={styles.myPickContainer}>
        <View style={styles.heartContainer}>
          <Image
            // source={require("../../assets/images/hearton.png")}
            source={require("../../assets/images/heartOn1.png")}
            style={styles.heart}
          />
        </View>
        <Text style={styles.name}>나의 Pick</Text>
      </View>

      <View style={styles.outerContainer}>
        <ScrollView style={styles.cardsContainer} horizontal={true}>
          {pickedPills.map((pill, idx) => (
            <PillItem
              key={pill.supplementId}
              pillId={pill.supplementId}
              userId={userId}
              image={pill.image}
              brand={pill.brand}
              pill={pill.name}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  likeContainer: {
    marginVertical: 10,
    // // flex: 2,
    // width: "100%",
    // // height: "30%",
    // height: 150,
    // alignItems: "center",
    // justifyContent: "center",
  },

  myPickContainer: {
    flexDirection: "row",
  },
  heartContainer: {
    // width: 50,
    // height: 50,
    // paddingBottom: 10,
    // marginBottom: 5,
    // position: "absolute",
    // bottom: 0,
    // right: -5,
  },
  heart: {
    width: 45,
    height: 45,
    // paddingBottom: 20,
    // width: "100%",
    // height: "100%",
    // resizeMode: "contain",
  },
  name: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 5,
  },
  outerContainer: {
    marginHorizontal: 5,

    marginVertical: 5,
    // overflow: "hidden",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 5,
    backgroundColor: "#ECF6F4",
    borderRadius: 10,
    elevation: 5,
  },
});
