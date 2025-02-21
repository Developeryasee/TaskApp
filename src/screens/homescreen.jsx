import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../navigation/AppNavigator";
import CustomBottomBar from "../components/UI/CustomBottomBar";
import CustomHeader from "../components/UI/CustomHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "../redux/slices/taskSlices";
import CustomButton from "../components/UI/CustomButton";
import CustomFlatlist from "../components/UI/CustomFlatlist";

export default function HomeScreen({ navigation }) {
    const { top } = useSafeAreaInsets();
    const { updateLogin } = useAuth();
    const { tasklist, loading,userdata } = useSelector(state => state.task);
    const dispatch = useDispatch();

    const getAllTask = () => {
        dispatch(fetchAllTasks());

    }
    useEffect(() => {
        getAllTask();
    }, [])

    const editTask = (item) => {
        navigation.navigate("editTask", { title: item.title, description: item.description, taskId: item._id })
    }

    const renderItem = ({ item }) => (
        <CustomButton
            style={styles.itemCard}
            onPress={() => editTask(item)}
        >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
        </CustomButton>
    )
    
    return (
        <View style={[globalStyles.container, { paddingTop: top ? top : 20 }]}>

            <CustomHeader screen={"home"} title={userdata?.username} navigation={navigation}/>
            <View style={styles.listcontainer}>
                {
                    
                    tasklist.length>0?
                    <CustomFlatlist
                        length={tasklist.length}
                        data={tasklist}
                        emptyMessage="No Ongoing Task"
                        renderItem={renderItem}
                        onRefresh={getAllTask}
                        refreshing={loading === "pending"}
                    />:<>
                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#fff',fontFamily: 'Poppins-Regular', }}>No Ongoing Task</Text>
                    <CustomButton onPress={getAllTask} style={{marginTop:20}}>
                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#FED36A',fontFamily: 'Poppins-Regular', }} >Refresh</Text>

                    </CustomButton>
                    </>
                }


            </View>
            <CustomBottomBar navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    listcontainer: {
        flex: 1,
        marginBottom: 97,
        marginTop: 34,
    },
    loader: {
        marginBottom: 97
    },
    itemCard: {
        flexDirection: 'column',
        backgroundColor: '#455A64',
        padding: 10, width: '100%',
        justifyConten: 'flex-start',
        alignItems: 'flex-start',
    },
    itemTitle: {
        fontFamily: 'PilatExtended-DemiBold',
        fontSize: 21,
        color: '#fff'
    },
    itemDesc: {
        fontFamily: 'Poppins-Regular',
        color: '#fff',
        marginTop: 7,
    }
})