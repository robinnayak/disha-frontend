import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import {
  faUser,
  faBriefcase,
  faPercentage,
  faGift,
  faLanguage,
  faPhone,
  faQuestionCircle,
  faFileAlt,
  faStar,
  faInfoCircle,
  faSignOutAlt,
  faCommentDots,
  faFileMedicalAlt,
} from "@fortawesome/free-solid-svg-icons";
import Section from "../../component/common/settings/Section";
import BottomMenu from "../../component/menu/BottomMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../api/auth/request";
import { useNavigation } from "@react-navigation/native";
import { MEDIA_URL } from "../../api/base"; // Assuming you have this for full image URLs

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth?.token?.token);
  const user = useSelector((state) => state.auth?.user?.user);
  // const profile_image = useSelector((state) => state.auth?.profile_image); // Get the profile image from the user
  const user_type = useSelector((state) => state.auth?.user_type);
  const { email, username } = user || {};
  // Construct the full URL for the profile image if it exists
  const profileData = useSelector((state) => state.profile?.profile);
  const profile_image = profileData?.profile_image;
  const profileImageUrl = profile_image ? `${MEDIA_URL}${profile_image}` : null;
  console.log("settings profile image", profile_image);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4 mb-5">
        {/* Profile Section */}
        <View className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-lg">
          {/* Profile Image */}
          <View className="mr-6">
            {profileImageUrl ? (
              <Image
                source={{ uri: profileImageUrl }}
                className="w-20 h-20 rounded-full"
                style={{ backgroundColor: "#f0f0f0" }} // Fallback background color
              />
            ) : (
              <View
                className="w-20 h-20 rounded-full bg-secondary-text"
                style={{ backgroundColor: "#f0f0f0" }} // Fallback background color if no image
              />
            )}
          </View>

          {/* Username and Email */}
          <View className="flex-1">
            <Text className="text-primary text-xl font-semibold mb-1">
              {username}
            </Text>
            <Text className="text-primary text-base">{email}</Text>
          </View>
        </View>

        {/* Sections */}
        <Section
          title="Account"
          items={[
            { icon: faUser, label: "Profile" },
            { icon: faBriefcase, label: "Business Profile" },
          ]}
          profileData={profileData}
          user_type={user_type}
          navigation={navigation}
        />
        <Section
          title="Offers"
          items={[
            { icon: faPercentage, label: "Promos" },
            { icon: faGift, label: "Refer & Get Discount" },
          ]}
          navigation={navigation}
          dispatch={dispatch}
        />

        <Section
          title="Settings"
          items={[{ icon: faLanguage, label: "Language" }]}
          navigation={navigation}
          dispatch={dispatch}
        />

        <Section
          title="Help & Legal"
          items={[
            { icon: faPhone, label: "Emergency Support" },
            { icon: faQuestionCircle, label: "Help" },
            { icon: faFileAlt, label: "Support Request" },
            { icon: faFileAlt, label: "Policies" },
            { icon: faCommentDots, label: "Feedback" },
            { icon: faFileMedicalAlt, label: "Terms and Conditions" },
          ]}
          navigation={navigation}
          dispatch={dispatch}
        />

        <Section
          title="More"
          items={[
            { icon: faStar, label: "Rate us" },
            { icon: faInfoCircle, label: "About Disha" },
          ]}
          navigation={navigation}
          dispatch={dispatch}
        />

        <Section
          navigation={navigation}
          dispatch={dispatch}
          token={token}
          items={[{ icon: faSignOutAlt, label: "Logout" }]}
        />

        <View className="p-4">
          <Text className="text-secondary-text text-center">Version 0.0.1</Text>
        </View>
      </ScrollView>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default SettingsScreen;
