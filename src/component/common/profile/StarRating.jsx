import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarOutline } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ review = 3 }) => {
  const filledStars = Math.floor(Math.min(Math.max(review, 0), 5));
  const hasHalfStar = review - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <View className="flex-row items-center mb-2">
      {[...Array(filledStars)].map((_, index) => (
        <Text key={`filled-${index}`}>
          <FontAwesomeIcon icon={faStar} size={20} color="#E67E22" />
        </Text>
      ))}
      {hasHalfStar && (
        <Text>
          <FontAwesomeIcon icon={faStarHalfAlt} size={20} color="#E67E22"  />
        </Text>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <Text key={`empty-${index}`}>
          <FontAwesomeIcon icon={faStarOutline} size={20} color="#ECF0F1" />
        </Text>
      ))}
    </View>
  );
};

export default StarRating;
