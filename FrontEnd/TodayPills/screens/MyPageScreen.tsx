import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Pressable,
  ImageBackground,
  View,
  Text,
  Button,
  ScrollView,
} from "react-native";
import MyPickPills from "../components/MyPage/MyPickPills";
import RecomNutritions from "../components/MyPage/Recommendations/RecomNutritions";
import Card from "../components/UI/Card";
import CustomBtn from "../components/UI/CustomBtn";
import { accent, primary, secondary } from "../constants/Colors";

// import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import BackgroundScreen from "./BackgroundScreen";

// <Pressable
// onPress={() => {
//   console.log("이름 수정하기!");
//   // setTimesPressed((current) => current + 1);
// }}
// style={styles.modifyContainer}
// >
// {({ pressed }) => (
//   <Text
//     style={[
//       styles.modify,
//       { color: pressed ? "black" : "#B7B7B7" },
//     ]}
//   >
//     수정
//     {/* {pressed ? 'Pressed!' : 'Press Me'} */}
//   </Text>
// )}
// </Pressable>

export default function MyPageScreen({ navigation }: any) {
  // RootTabScreenProps<"MyPage">
  const goMyPillsHandler = () => {
    navigation.navigate("MyPills", { userId: 1 });
  };
  return (
    <BackgroundScreen>
      <Card>
        <ScrollView style={styles.scrollView}>
          <View style={styles.myInfoContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>정서님</Text>
            </View>
            <View style={styles.ageContainer}>
              <Text style={styles.age}>만 26세 남성</Text>
            </View>
          </View>
          <View style={styles.nutrBtnContainer}>
            <View style={styles.nutrBtn}>
              <CustomBtn
                buttonColor={accent}
                title={"내가 섭취중인 영양제"}
                titleColor={"#fff"}
                buttonWidth={"70%"}
                onPress={goMyPillsHandler}
              />
            </View>
          </View>

          <View style={styles.myLikeContainer}>
            <MyPickPills />
          </View>
          <View style={styles.nutrisContainer}>
            <RecomNutritions />
          </View>
          <View style={styles.btnContainer}>
            <CustomBtn
              buttonColor={accent}
              title={"영양성분 추천 다시 받기!"}
              titleColor={"#fff"}
              buttonWidth={"90%"}
              onPress={() => console.log("추천 다시 받기 btn 클릭")}
            />
            <Pressable
              onPress={async () => {
                await AsyncStorage.removeItem("@storage_User");
                navigation.replace("Start");
              }}
            >
              <Text style={styles.logout}>로그아웃</Text>
            </Pressable>
            {/* <CustomBtn
              buttonColor={primary}
              title={"로그아웃"}
              titleColor={"#fff"}
              buttonWidth={"90%"}
              onPress={async () => {
                await AsyncStorage.removeItem("@storage_User");
                navigation.replace("Start");
              }}
            /> */}
          </View>
        </ScrollView>
        {/* <View
            style={styles.separator}
            darkColor="rgba(255,255,255,0.1)"
            lightColor="#eee"
          /> */}
        {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
      </Card>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 10,
    // padding: 20,
  },

  myInfoContainer: {
    // flex: 1,
    width: "100%",
    height: 90,
    // backgroundColor: "yellow",
    // height: 600,
    // borderTopWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    // padding: 10,
  },
  ageContainer: {
    width: "100%",
    // padding: 10,
  },
  nutrBtnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nutrBtn: {
    width: "90%",
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#B7B7B7",
    // alignItems: "center",
    // justifyContent: "center",
  },
  myLikeContainer: {
    // flex: 2,
    width: "100%",
    // height: "30%",
    minHeight: 200,

    paddingVertical: 10,
    paddingHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  nutrisContainer: {
    // flex: 5,
    // flexDirection: "column",
    width: "100%",
    minHeight: 120,
    // alignItems: "center",
    // justifyContent: "center",
  },
  btnContainer: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  modifyContainer: {
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "900",
  },
  modify: {
    fontSize: 15,
    fontWeight: "900",
  },
  age: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#B7B7B7",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  logout: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 13,
    color: "#FF78A3",
  },
});
