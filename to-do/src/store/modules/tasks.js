import axios from "axios";

export default {
    actions: {
        async fetchTasks(ctx){
            axios
            .get("http://localhost:3001/tasks")
            .then(response =>{
            
                const data = response.data;

                ctx.commit('updateTasks', data)

            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    mutations: {
        
        // Обновить массив задач
        updateTasks(state, data){
            state.tasks = data
        },

        // Добавить или изменить задачу
        async addTask(state, newTask){

            // Если айдишник меньше айдишника последнего элемента
            const path = "http://localhost:3001/tasks/" + newTask.id
            const time = new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString();
            if (state.tasks[state.tasks.length - 1].id >= newTask.id){
                axios.put( path, {
                    name: newTask.name,
                    priority: newTask.priority,
                    marks: newTask.marks,
                    description: newTask.description,
                    date: newTask.date
                });
                
                const index = state.tasks.find((value, index) => {
                    if(value.id === newTask.id){
                        return index;
                    }
                    
                })
                state.tasks[state.tasks.indexOf(index)] = newTask
            }
            else{
                axios
                .post("http://localhost:3001/tasks", {
                    name: newTask.name,
                    priority: newTask.priority,
                    marks: newTask.marks,
                    description: newTask.description,
                    date: time
                });
                newTask.date = time;
                state.tasks.push(newTask);
            }
        },

        // удалить задачу
        deleteTask(state, taskId){
            const delIndex = state.tasks.find((value, index) => {
                if(value.id === taskId){
                    return index;
                }
            })
            state.tasks.splice(state.tasks.indexOf(delIndex), 1)
            const path = "http://localhost:3001/tasks/" + taskId;
            axios.delete(path);
        }
    },
    state: {
        tasks: []
    },
    getters: {
        allTasks(state){
            return state.tasks
        }
    },

}