import axios from 'axios';
const url = 'http://localhost:5000/api/pushups/';

class PushupsService {
    // Get Pushups
    static getPushups() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(pushup => ({
                        ...pushup,
                        createdAt: new Date(pushup.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    // Create Pushups
    static insertPushups(newPushups){
        return axios.post(url, {
            newPushups: newPushups
        });
    }
    // Create single Goal does not work
    static insertGoal(goal){
        return axios.post(url, {
            goal: goal
        });
    }
    // Delete Pushups
    static deletePushups(id){
        return axios.delete(`${url}${id}`);
    }
}

export default PushupsService;