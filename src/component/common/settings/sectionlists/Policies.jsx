import React from "react";
import { View, Text, ScrollView } from "react-native";

const Policies = () => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-4 bg-white">
        <Text className="text-xl font-bold mb-4">Privacy Policy</Text>
        <Text className="mb-4">
          This privacy policy applies to the disha app (hereby referred to as
          "Application") for mobile devices that was created by Robin Nayak
          (hereby referred to as "Service Provider") as a Free service. This
          service is intended for use "AS IS".
        </Text>

        <Text className="font-bold mb-2">Information Collection and Use</Text>
        <Text className="mb-4">
          The Application collects information when you download and use it.
          This information may include information such as:
        </Text>
        <Text className="mb-4">
          - Your device's Internet Protocol address (e.g. IP address)
        </Text>
        <Text className="mb-4">
          - The pages of the Application that you visit, the time and date of
          your visit, the time spent on those pages
        </Text>
        <Text className="mb-4">- The time spent on the Application</Text>
        <Text className="mb-4">
          - The operating system you use on your mobile device
        </Text>

        <Text className="mb-4">
          The Application collects your device's location, which helps the
          Service Provider determine your approximate geographical location and
          make use of in below ways:
        </Text>
        <Text className="mb-4">
          - Geolocation Services: The Service Provider utilizes location data to
          provide features such as personalized content, relevant
          recommendations, and location-based services.
        </Text>
        <Text className="mb-4">
          - Analytics and Improvements: Aggregated and anonymized location data
          helps the Service Provider to analyze user behavior, identify trends,
          and improve the overall performance and functionality of the
          Application.
        </Text>
        <Text className="mb-4">
          - Third-Party Services: Periodically, the Service Provider may
          transmit anonymized location data to external services. These services
          assist them in enhancing the Application and optimizing their
          offerings.
        </Text>

        <Text className="mb-4">
          The Service Provider may use the information you provided to contact
          you from time to time to provide you with important information,
          required notices and marketing promotions.
        </Text>

        <Text className="font-bold mb-2">Third Party Access</Text>
        <Text className="mb-4">
          Only aggregated, anonymized data is periodically transmitted to
          external services to aid the Service Provider in improving the
          Application and their service. The Service Provider may share your
          information with third parties in the ways that are described in this
          privacy statement.
        </Text>

        <Text className="font-bold mb-2">Opt-Out Rights</Text>
        <Text className="mb-4">
          You can stop all collection of information by the Application easily
          by uninstalling it. You may use the standard uninstall processes as
          may be available as part of your mobile device or via the mobile
          application marketplace or network.
        </Text>

        <Text className="font-bold mb-2">Data Retention Policy</Text>
        <Text className="mb-4">
          The Service Provider will retain User Provided data for as long as you
          use the Application and for a reasonable time thereafter. If you'd
          like them to delete User Provided Data that you have provided via the
          Application, please contact them at robinnayak86@gmail.com and they
          will respond in a reasonable time.
        </Text>

        <Text className="font-bold mb-2">Children</Text>
        <Text className="mb-4">
          The Service Provider does not use the Application to knowingly solicit
          data from or market to children under the age of 13. If you are a
          parent or guardian and you are aware that your child has provided us
          with personal information, please contact the Service Provider
          (robinnayak86@gmail.com) so that they will be able to take the
          necessary actions.
        </Text>

        <Text className="font-bold mb-2">Security</Text>
        <Text className="mb-4">
          The Service Provider is concerned about safeguarding the
          confidentiality of your information. The Service Provider provides
          physical, electronic, and procedural safeguards to protect information
          the Service Provider processes and maintains.
        </Text>

        <Text className="font-bold mb-2">Changes</Text>
        <Text className="mb-4">
          This Privacy Policy may be updated from time to time for any reason.
          The Service Provider will notify you of any changes to the Privacy
          Policy by updating this page with the new Privacy Policy. You are
          advised to consult this Privacy Policy regularly for any changes, as
          continued use is deemed approval of all changes.
        </Text>

        <Text className="mb-4">
          This privacy policy is effective as of 2024-09-20.
        </Text>

        <Text className="font-bold mb-2">Your Consent</Text>
        <Text className="mb-4">
          By using the Application, you are consenting to the processing of your
          information as set forth in this Privacy Policy now and as amended by
          us.
        </Text>

        <Text className="font-bold mb-2">Contact Us</Text>
        <Text>
          If you have any questions regarding privacy while using the
          Application, or have questions about the practices, please contact the
          Service Provider via email at robinnayak86@gmail.com.
        </Text>
        <View className="bg-gray-100 p-4 mb-2">
          <Text className="text-center text-sm text-gray-600">
            Disha App - Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Policies;
