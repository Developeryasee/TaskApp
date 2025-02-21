import { configs } from "./apiService";


const { apiInstance } = configs;

class task {

    createTask(body) {
        return new Promise((resolve, reject) => {
            apiInstance.post("tasks",body).then(res => {
                console.log(res);
                
                resolve(res);
            }).catch(ex => {
                reject(ex);
            })
        })
    }
    getAllTask() {
        return new Promise((resolve, reject) => {
            apiInstance.get("tasks").then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            })
        })
    }

    getTaskbyID(taskid) {
        return new Promise((resolve, reject) => {
            apiInstance.get(`tasks/${taskid}`).then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            })
        })
    }
    updateTaskbyID(taskid,body) {
        return new Promise((resolve, reject) => {
            apiInstance.put(`tasks/${taskid}`,body).then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            })
        })
    }
    deleteTaskbyID(taskid){
        return new Promise((resolve, reject) => {
            apiInstance.delete(`tasks/${taskid}`).then(res => {
                resolve(res);
            }).catch(ex => {
                reject(ex);
            })
        })
    }
}

export default new task();