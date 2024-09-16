import React, { useState } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import DishaLogo from "../../images/dishalogo.gif";
import MenuItem from "./MenuItem";
import { useNavigation } from "@react-navigation/native";
import { handleLogout } from "../../api/auth/request";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ profileData }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const token = useSelector((state) => state.auth.token.token);
  const dispatch = useDispatch();

  const navigateToProfileForm = () => {
    setMenuVisible(false);
    navigation.navigate("ProfileForm", { profileData });
  };

  return (
    <View className="flex-row items-center justify-between px-4 bg-primary rounded-md shadow z-50">
      <Image source={DishaLogo} className="w-24 h-20" />

      <View className="relative">
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <FontAwesomeIcon
            icon={faEllipsisV}
            size={26}
            style={{color:'white'}}
            className="text-background"
          />
        </TouchableOpacity>

        {menuVisible && (
          <View className="absolute right-0 top-6 mt-2 bg-white shadow-lg rounded-lg w-48 z-50">
            <ScrollView style={{ maxHeight: 220 }}>
              {/* Conditionally render "Edit Profile" only if profileData exists */}
              {profileData && (
                <MenuItem title="Edit Profile" onPress={navigateToProfileForm} />
              )}
              <MenuItem title="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
              <MenuItem title="Settings" onPress={() => navigation.navigate('Settings')} />
              <MenuItem title="Logout" onPress={() => handleLogout(token, dispatch, navigation)} />
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;
