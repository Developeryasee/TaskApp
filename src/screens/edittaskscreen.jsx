import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../styles";
import { Alert, StyleSheet, View } from "react-native";
import CustomHeader from "../components/UI/CustomHeader";
import CustomTextInput from "../components/UI/CustomTextInput";
import CustomButton from "../components/UI/CustomButton";
import taskService from "../services/taskService";
import { useDispatch } from "react-redux";
import { deleteTaskByID, updateTaskByID } from "../redux/slices/taskSlices";

export default function EditTaskScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const {  taskId } = route.params;
    const { top } = useSafeAreaInsets();
    const [load, setLoad] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [errorTitle, setErrorTitle] = useState("");
    const [error, setError] = useState(false);

    const editTask = async () => {
        try {
            if (title.trim().length === 0) {
                setError(true);
                setErrorTitle("Title is required");
            } else {
                setError(false);
                setLoad(true);
                let data = {
                    title: title,
                    description: description
                }
                let responce = await taskService.updateTaskbyID(taskId, data);

                if (responce.status === 200) {
                    if (responce.data?.message === "Task updated successfully") {
                    dispatch(updateTaskByID({id:taskId,updatedTask:data}))
                        setTimeout(() => {
                            setLoad(false);
                            setTitle("");
                            setDescription("");
                            Alert.alert("Success", responce.data?.message, [{ text: "OK", onPress: () => { navigation.goBack() } }]);
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
    const deleteTask = async () => {
        try {
            let responce = await taskService.deleteTaskbyID(taskId);

            if (responce.status === 200) {
                if (responce.data?.message === "Task deleted successfully") {
                    dispatch(deleteTaskByID(taskId))
                    Alert.alert("Success" ,responce.data?.message, [{ text: "OK", onPress: () => { navigation.goBack() } }]);

                }
            } else {
                setLoad(false);
                Alert.alert("Error", responce.data?.message);
            }

        } catch (error) {
            setLoad(false);

        }
    }
    
    const getTaskByID=async()=>{
        try {
            let responce = await taskService.getTaskbyID(taskId);
            if (responce.status===200) {
                setTitle(responce.data?.title);
                setDescription(responce.data?.description)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getTaskByID();
    },[])

    return (
        <View style={[globalStyles.container, { paddingTop: top ? top : 20 }]}>
            <CustomHeader navigation={navigation} title={"Task details"} />


            <CustomTextInput
                value={title}
                label="Task Title"
                style={styles.inputcontainer}
                onChangeText={(txt) => {
                    setTitle(txt);
                }}
                error={error ? (title.trim().length === 0 || errorTitle.length != 0) && errorTitle : null}

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
                title={"Edit Task"}
                style={styles.button}
                textstyle={styles.buttonText}
                onPress={editTask}
                loading={load}
            />

            <CustomButton
                title={"Delete"}
                style={styles.deleteButton}
                textstyle={styles.deleteButtonText}
                onPress={deleteTask}
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
    },
    deleteButton: {
        marginTop: 10
    },
    deleteButtonText: {
        color: 'red',
        fontFamily: 'Poppins-SemiBold',
    }
})