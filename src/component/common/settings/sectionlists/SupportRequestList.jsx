import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getSupportRequest } from '../../../../api/users/request';
import { useSelector } from 'react-redux';

const SupportRequestList = () => {
  const token = useSelector((state) => state.auth?.token?.token);
  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const res = await getSupportRequest(token);
        setSupportRequests(res.data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchSupportRequests();
  }, [token]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View className={`p-4`}>
        <Text className={`text-red-500`}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View className={`bg-white rounded-lg shadow p-4 m-2`}>
      <Text className={`text-lg font-semibold mb-1`}>Subject: {item.subject}</Text>
      <Text className={`text-gray-700`}>Message: {item.message}</Text>
      <Text className={`text-gray-500`}>Username: {item.username}</Text>
      <Text className={`text-gray-500`}>Email: {item.email}</Text>
      <Text className={`text-gray-500`}>Status: {item.status}</Text>
      <Text className={`text-gray-400 text-xs`}>Created At: {new Date(item.created_at).toLocaleString()}</Text>
      <Text className={`text-gray-400 text-xs`}>Updated At: {new Date(item.updated_at).toLocaleString()}</Text>
    </View>
  );

  return (
    <View className={`p-4`}>
      <Text className={`text-xl font-bold mb-4`}>Support Request List</Text>
      <FlatList
        data={supportRequests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SupportRequestList;
