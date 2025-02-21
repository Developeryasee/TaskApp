import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Home from "../../assets/icons/home.svg";
import Chat from "../../assets/icons/chat.svg";
import AddTask from "../../assets/icons/addtask.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Notification from "../../assets/icons/notification.svg";
import CustomButton from "./CustomButton";

export default function CustomBottomBar({ navigation }) {
    const { width } = Dimensions.get('screen');
    const tabWidth = (width-20)/5;
    const navs = [{
        title: 'Home',
        icon: <Home />
    },
    {
        title: 'Chat',
        icon: <Chat />
    },
    {
        title: 'add',
        icon: <AddTask />
    },
    {
        title: 'Calendar',
        icon: <Calendar />
    },
    {
        title: 'Notification',
        icon: <Notification />
    },
    ]

    const moveToCreateTask=()=>{
        navigation.navigate('createTask');
    }
    return (
        <View style={[styles.container, { width: width }]}>
            {
                navs.map((item, index) => (
                    <CustomButton key={index}
                    style={item.title==="add"?{width:54,height:54,backgroundColor:'#FED36A'}:{width:tabWidth,height:tabWidth,}}
                    onPress={item.title==="add"?moveToCreateTask:null}
                    >
                        <View style={styles.iconcontainer}>
                            {item.icon}
                            {
                                item.title!="add"&&<Text style={{fontSize:10,marginTop:3,fontFamily:'Poppins-Regular',color:item.home?"#FED36A":"#617D8A"}}>{item.title}</Text>
                            }
                            
                        </View>

                    </CustomButton>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 97,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: '#263238',
        paddingHorizontal:10,
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        paddingBottom:5
    },
    iconcontainer:{
        alignItems:'center',
        justifyContent:'center'
    }
})