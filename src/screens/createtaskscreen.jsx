import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../styles";
import { Alert, StyleSheet, View } from "react-native";
import CustomHeader from "../components/UI/CustomHeader";
import CustomTextInput from "../components/UI/CustomTextInput";
import CustomButton from "../components/UI/CustomButton";
import taskService from "../services/taskService";
import { useDispatch } from "react-redux";
import { insertnewTask } from "../redux/slices/taskSlices";

export default function CreateTaskScreen({ navigation }) {
    const { top } = useSafeAreaInsets();
    const [load, setLoad] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [errorTitle, setErrorTitle] = useState("");
    const [error, setError] = useState(false);
    const dispatch= useDispatch();
    const createTask = async () => {
        try {
            if (title.trim().length === 0 ) {
                setError(true);
                setErrorTitle("Title is required");
            }else{
                setError(false);
                setLoad(true);
                let data = {
                    title: title,
                    description: description
                }
                let responce = await taskService.createTask(data);
    
                if (responce.status === 200) {
                    if (responce.data?.message === "Task created") {
                        dispatch(insertnewTask(responce.data?.task))
                        setTimeout(() => {
                            setLoad(false);
                            setTitle("");
                            setDescription("");
                            Alert.alert("Success", responce.data?.message);
                        }, 1500);
                    }
                } else {
                    setLoad(false);
                    Alert.alert("Error", responce.data?.message);
                }
            }
            
        } catch (error) {
            setLoad(false);

        }
    }
    return (
        <View style={[globalStyles.container, { paddingTop: top ? top : 20 }]}>
            <CustomHeader navigation={navigation} title={"Create a new task"}/>


            <CustomTextInput
                value={title}
                label="Task Title"
                style={styles.inputcontainer}
                onChangeText={(txt) => {
                    setTitle(txt);
                }}
                error={error ?(title.trim().length===0||errorTitle.length!=0)&& errorTitle : null}

            />
            <CustomTextInput
                value={description}
                label="Description"
                style={styles.inputcontainer}
                inputstyle={styles.input}
                multiline={true}
                onChangeText={(txt) => {
                    setDescription(txt);
                }}
            />

            <CustomButton
                title={"Create"}
                style={styles.button}
                textstyle={styles.buttonText}
                onPress={createTask}
                loading={load}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputcontainer: {
        marginTop: 29
    },
    input: {
        height: 82
    },
    button: {
        backgroundColor: '#FED36A',
        height: 58,
        marginTop: 42
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#000000'
    }
})