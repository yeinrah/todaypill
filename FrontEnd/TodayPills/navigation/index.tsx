/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "react-native-vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import CalendarScreen from "../screens/CalendarScreen";
import HomeScreen from "../screens/HomeScreen";
import ModalScreen from "../screens/ModalScreen";
import MyPageScreen from "../screens/MyPageScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#c15c1d" },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MaterialBottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

function MaterialBottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      activeColor="#E881B1"
      barStyle={{ backgroundColor: "white" }}
      // barStyle={{ backgroundColor: "#E2C3DC" }}
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme].tint,
      // }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}

        // options={({ navigation }: RootTabScreenProps<"Home">) => ({
        //   title: "Home",
        //   tabBarIcon: ({ color }) =>
        //   <TabBarIcon name="code" color={color} />,
        //   headerRight: () => (
        //     <Pressable
        //       onPress={() => navigation.navigate("Modal")}
        //       style={({ pressed }) => ({
        //         opacity: pressed ? 0.5 : 1,
        //       })}
        //     >
        //       <FontAwesome
        //         name="info-circle"
        //         size={25}
        //         color={Colors[colorScheme].text}
        //         style={{ marginRight: 15 }}
        //       />
        //     </Pressable>
        //   ),
        // })}
      />
      <BottomTab.Screen
        name="Recommendation"
        component={RecommendationScreen}
        options={{
          tabBarLabel: "추천",
          tabBarIcon: ({ color }) => (
            // <FontAwesome5 name="pills" size={22} color={color} />
            <MaterialCommunityIcons name="pill" size={26} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: "캘린더",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-alt" size={26} color={color} />
            // <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// function CalendarNav(){
//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerShown : false,
//       initialRouteName : 'Calendar'
//     }}
//     >
//       <Stack.Screen name="Calendar" component={CalendarPage} />
//       <Stack.Screen name="Add" component={AlarmAdd} />
//     </Stack.Navigator>
//   );
// }

// function AlarmNav(){
//   return(
//     <Stack.Navigator
//     screenOptions={{
//       headerShown : false,
//       initialRouteName : 'AlarmScreen'
//     }}
//     >
//       <Stack.Screen name="AlarmScreen" component={Alarm} />
//       <Stack.Screen name="AlarmInfo" component={AlarmInfo} />
//     </Stack.Navigator>
//   )
// }

// function TimelineNav(){
//   return(
//     <Stack.Navigator
//     screenOptions={{
//       headerShown : false,
//       initialRouteName : 'TimelineScreen'
//     }}
//     >
//       <Stack.Screen name="TimelineScreen" component={Timeline} />
//       <Stack.Screen name="TimelineDetail" component={TimelineDetail} />
//     </Stack.Navigator>
//   )
// }

// function CalendarTop() {
//   return (
//     <TopTab.Navigator screenOptions={{
//       headerTitleAlign: 'center',
//       tabBarActiveTintColor:'black',
//       tabBarIndicatorStyle:{backgroundColor:'black'},
//       tabBarLabelStyle:{fontSize:15},
//       initialRouteName:'CalendarScreen'
//       }}>
//         <TopTab.Screen name='CalendarScreen' component={CalendarNav}  options={{title:'달력'}}/>
//         <TopTab.Screen name='Alarm' component={AlarmNav} options={{title:'알람'}} />
//         <TopTab.Screen name='Timeline' component={TimelineNav} options={{title:'이력'}}/>
//     </TopTab.Navigator>
//   );
// }

// function CommunityNav() {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerTitleAlign: 'center',
//       initialRouteName:'community'
//       }}>
//       <Stack.Screen name='community' component={CommunityPage} options={{title:'커뮤니티'}}/>
//       <Stack.Screen name='communitysearch' component={CommunitySearchPage} options={{title:'검색 결과'}}/>
//       <Stack.Screen name='communitywrite' component={PostCreatePage} options={{title:'글 작성'}}/>
//       <Stack.Screen name='communityupdate' component={PostUpdatePage} options={{title:'글 수정'}}/>
//       <Stack.Screen name='communitydetail' component={PostDetailPage} options={{title:''}}/>
//     </Stack.Navigator>
//   );
// }

// function TopTabStackScreen(){
//   return(
//     <Stack.Navigator screenOptions={{
//       headerTitleAlign: 'center'
//     }}>
//       <Stack.Screen name="CalendarTab" component={CalendarTop} options={{ title: '복용 일정' }}/>
//     </Stack.Navigator>
//   );
// }

// function MyPillScreen(){
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="MyPillTab" component={MyPillTop} options={{ headerShown : false }}/>
//     </Stack.Navigator>
//   )
// }

// function HomeNav({navigation}) {
//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerTitleAlign: 'center',
//       initialRouteName : 'Homes',
//       headerRight: ()=>(<Icon.Button onPress={()=>navigation.navigate('Search', {navigation:`${navigation}`})} name="magnify" color="black" backgroundColor='white' />),
//     }}>
//       <Stack.Screen name="Homes" component={HomePage} options={{title: '홈'}}/>
//       <Stack.Screen name="Search" component={Search} options={{ title: '검색', headerRight: null }}/>
//       <Stack.Screen name="Info" component={Info} options={{ title: '약 정보' }} />
//     </Stack.Navigator>
//   );
// }

// function MyPageNav() {
//   return (
//     <Stack.Navigator
//     screenOptions={{
//       headerTitleAlign: 'center',
//       initialRouteName:'mypageScreen'
//     }}>
//       <Stack.Screen name='mypageScreen' component={Mypage} options={{ title: '내 정보' }}/>
//       <Stack.Screen name='modifyInfo' component={ModifyInfo} options={{ title: '정보수정' }}/>
//       <Stack.Screen name='mypill' component={MyPillScreen} options={{ title: '마이필' }}/>
//     </Stack.Navigator>
//   )
// }

// function MyPillTop() {
//   return (
//     <TopTab.Navigator screenOptions={{
//         headerTitleAlign: 'center',
//         tabBarActiveTintColor:'black',
//         tabBarIndicatorStyle:{backgroundColor:'black'},
//         tabBarLabelStyle:{fontSize:15},
//         initialRouteName:'NowPill'
//        }}>
//         <TopTab.Screen name='NowPill' component={NowPillNav} options={{title:'복용중인 약'}} />
//         <TopTab.Screen name='PillHistory' component={MyPillHistory} options={{title:'최근 복용 이력'}}/>
//     </TopTab.Navigator>
//   );
// }

// function NowPillNav() {
//   return (
//     <Stack.Navigator screenOptions={{initialRouteName : 'MyPillNowPill'}}>
//         <Stack.Screen name="MyPillNowPill" component={MyPillNowPill} options={{ headerShown : false }}/>
//         <Stack.Screen name="MyPillInfo" component={MyPillInfo} options={{ headerShown : false }} />
//     </Stack.Navigator>
//   )
// }

// function MyAppNav() {
//   return(
//   <Tab.Navigator
//     screenOptions={({route})=>({
//       initialRouteName:'Home',
//       tabBarActiveTintColor: 'black',
//       headerShown : false,
//       tabBarHideOnKeyboard: true,
//       tabBarIcon: ({ color, size }) => {
//         const icons = {
//           Home: 'home',
//           Pharmacy : 'map-marker',
//           CalendarPage: 'calendar-blank',
//           Mypage: 'account',
//           CommunityScreen: 'account-group'
//         }
//         return(
//           <Icon name={icons[route.name]} color={color} size={size} />
//         )},
//     })}>
//       <Tab.Screen name="Home" component={HomeNav} options={{tabBarLabel:'홈'}}/>
//       <Tab.Screen name="Pharmacy" component={Pharmacy} options={{ title: '약국' }} />
//       <Tab.Screen name="CalendarPage" component={TopTabStackScreen} options={{ title: '일정' }} />
//       <Tab.Screen name='CommunityScreen' component={CommunityNav} options={{ title: '커뮤니티' }}/>
//       <Tab.Screen name="Mypage" component={MyPageNav} options={{ title: '내 정보' }}/>
//     </Tab.Navigator>
//     )
// }

// return (
//   <Stack.Navigator
//   screenOptions={{
//     headerShown : false
//     }}>
//       <Stack.Screen name="LoginScreen" component={Login} />
//       <Stack.Screen name="appscreen" component={MyAppNav} />
//   </Stack.Navigator>
// )
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
