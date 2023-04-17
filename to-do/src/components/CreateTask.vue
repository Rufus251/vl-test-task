<template>
    <div class="wrapper">
        <div class="button">
            <router-link to="/">
                <input type="button" class="back" value="Назад">
            </router-link>
        </div>

        <div class="taskData">
                <ul>
                    <li>
                        <h2>НАЗВАНИЕ ЗАДАЧИ</h2>
                        <input v-model="newTask.name" type="text" name="taskName" id="taskName" placeholder="Новая задача" required>
                    </li>
                    <li>
                        <h2>ПРИОРИТЕТ</h2>
                        <select v-model="newTask.priority" name="prioritySelect" id="prioritySelect" required>

                            <option name="priorityLow" id="priorityLow">Low</option>

                            <option name="priorityNormal" id="priorityNormal">Normal</option>

                            <option name="priorityHigh" id="priorityHigh">High</option>

                        </select>
                    </li>
                    <li>
                        <h2>ОТМЕТКИ</h2>
                        <div class="marks">
                            <ul>
                                <li>
                                    <input v-model="newTask.marks" value="Research" type="checkbox" id="Research" name="Research">
                                    <label for="Research">Research</label>
                                </li>
                                <li>
                                    <input v-model="newTask.marks" value="Design" type="checkbox" id="Design" name="Design">
                                <label for="Design">Design</label>
                                </li>
                                <li>
                                    <input v-model="newTask.marks" value="Development" type="checkbox" id="Development" name="Development">
                                <label for="Development">Development</label>
                                </li>
                            </ul>

                        </div>

                    </li>
                    <li>
                        <h2>ОПИСАНИЕ</h2>
                        <textarea v-model="newTask.description" name="description" id="description" required placeholder="...">Description</textarea>
                    </li>
                </ul>
                <button type="submit" @click="sendData()" name="saveBtn" id="saveBtn"> Сохранить </button>

        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'CreateTask',

  data(){
    return{
        newTask: {
            name: "",
            priority: "",
            marks: [],
            description: "",
            date: "",
        },
        
        toDoList: []
    }
  },

    monted(){
    this.getTask()
    },

    watch: {
        $route: 'getTask'
    },
  methods: {
    printDate() {
        return new Date().toLocaleDateString();
    },
    printTime() {
        return new Date().toLocaleTimeString();
    },

    add(){
        // Проверка на заполненность полей
        if (this.newTask.name === "" || this.newTask.priority == "" || this.newTask.description === "") {
            return;
        }

        //console.log(this.newTask, this.toDoList)

        this.newTask.date = this.printDate() + ", " + this.printTime();

        // Добавляем в массив задач
        this.toDoList.push(this.newTask.name);

        // Выставляем базовые значения
        this.newTask.name="";
        this.newTask.priority="";
        this.newTask.marks=[];
        this.newTask.description="";

        //console.log(this.toDoList);

        // Переход на главную страницу
        this.$router.push('/');
    },

    sendData(){
        this.add();

        const path = "http://localhost:3001/tasks/" + this.taskId()
        if (this.newTask.date === ""){
            this.newTask.date = this.printDate() + ", " + this.printTime()
            axios
            .post("http://localhost:3001/tasks", {
                name: this.newTask.name,
                priority: this.newTask.priority,
                marks: this.newTask.marks,
                description: this.newTask.description,
                date: this.newTask.date
        })
        }
        else{
            axios.put( path, {
                name: this.newTask.name,
                priority: this.newTask.priority,
                marks: this.newTask.marks,
                description: this.newTask.description,
                date: this.newTask.date
            })
        }
        

        
    },

    taskId(){
            return parseInt(this.$route.params.id);
        },

    getTask(){
        axios
        .get("http://localhost:3001/tasks", {
            params: {
                id: this.taskId(),
            }
        })
        .then(response =>{
            console.log(response.data[0].marks),
            this.newTask.name =  response.data[0].name,
            this.newTask.priority =  response.data[0].priority,
            this.newTask.marks = response.data[0].marks,
            this.newTask.description =  response.data[0].description,
            this.newTask.date =  response.data[0].date
        })
        .catch(error => {
            console.log(error);
        });
    },

  }

};

</script>

<style scoped lang="scss">
    @import "@/assets/main.module.scss";
    .button{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            padding: 15px;
            border: 0;
            border-radius: 6px;  

            font-size: $whiteBtnFontSize;

            cursor: pointer;
            
            &:hover{
            opacity: 0.9;
            }
        }
        .back{
            color: $whiteBtnFontColor;
            background-color: $whiteBtnBackgroundColor;
        }
    }

    .taskData{
        background-color: #ffffff;

        margin-top: 20px;
        padding: 1px 30px 1px 30px;

        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        ul{
            list-style: none;

            li{        
                margin-top: 30px;

                h2{
                    font-size: $headerFontSize;
                    color: $createHeaderFontColor;
                    font-weight: 400;
                }
                
                input{
                    margin-top: 10px;

                    width: 100%;

                    font-size: 16px;

                    border: 1px solid #F1F1F1;
                    padding: 5px;
                    
                    outline: none;
                }

                p{
                    font-size: $pFontSize;
                    color: $createTextFontColor;
                    font-weight: 400;
                }

                .marks{
                    li{
                        margin-top: 8px;
                        
                        display: flex;
                        align-items: center;
                    }
                    input{
                        border: 1px solid #F1F1F1;

                        margin-top: 0;
                        width: 18px;
                        height: 18px;
                    }
                    label{
                        margin-top: 1px;
                        margin-left: 8px;
                    }
                }

                textarea{
                    margin-top: 10px;

                    padding: 5px;

                    resize: none;

                    width: 100%;
                    height: 120px;

                    border: 1px solid #F1F1F1;

                    font-size: $pFontSize;
                    color: $createTextFontColor;
                    font-weight: 400;

                    outline: none;
                }
            }
        }

        button{
            margin: 30px auto;
            padding: 15px;
            border: 0;
            border-radius: 6px;  

            font-size: $blueBtnFontSize;
            color: $blueBtnFontColor;
            background-color: $blueBtnBackgroundColor;


            cursor: pointer;
            &:hover{
                opacity: 0.9;
            }
        }
    }

    @media (min-width: 768px) {
        .wrapper{
            width: 90%;

            
        }

        .button{
            display: block;

            margin-top: 20px;
        }

        .taskData{
            width: 100%;
            
            display: block;
        }
    }
</style>
