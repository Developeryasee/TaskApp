import React, { memo } from 'react';
import { FlatList, View, Text, ActivityIndicator, RefreshControl } from 'react-native';

const CustomFlatList = ({
  length,
  data,
  renderItem,
  keyExtractor = (item, index) => index.toString(),
  onRefresh,
  refreshing = false,
  emptyMessage = 'No data available',
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{
        flexGrow: 1,

      }, length === 0 && {
        justifyContent: "center",
        alignItems: "center"
      }]}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
      ListHeaderComponent={length != 0 && <View style={{ paddingBottom: 15, backgroundColor: '#212832' }}><Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 20, }}>Ongoing Tasks</Text></View>}
      ListEmptyComponent={<Text style={{ textAlign: 'center', alignSelf: 'center', color: '#fff',fontFamily: 'Poppins-Regular', }}>{emptyMessage}</Text>}
      refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : null}
    />
  );
};

export default memo(CustomFlatList);
