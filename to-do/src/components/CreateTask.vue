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
                <button type="submit" @click="add()" name="saveBtn" id="saveBtn"> Сохранить </button>

        </div>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

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
                id: 1,
            },
        }
    },

    mounted(){
        this.getTask()
    },

    computed: mapGetters(['allTasks']),
    
    methods: {
        ...mapMutations(['addTask']),

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

            // Редактируем id
            if (this.$route.params.id === 'new' && this.allTasks.length){
                this.newTask.id = this.allTasks[this.allTasks.length - 1].id + 1
            }

            // Отправка на сервер и в vuex массив
            this.addTask({
                name: this.newTask.name,
                priority: this.newTask.priority,
                marks: this.newTask.marks,
                description: this.newTask.description,
                date: this.newTask.date,
                id: this.newTask.id
            });

            // Выставляем базовые значения
            this.newTask.name="";
            this.newTask.priority="";
            this.newTask.marks=[];
            this.newTask.description="";

            // Переход на главную страницу
            this.$router.push('/');
        },

        taskId(){
            return parseInt(this.$route.params.id);
        },

        getTask(){
            if (this.$route.params.id === "new"){
                return
            }
            const requiredTask = this.allTasks.find( value => {
                if(value.id === this.taskId()){
                    return value
                }
            })

            this.newTask.name =  requiredTask.name,
            this.newTask.priority =  requiredTask.priority,
            this.newTask.marks = requiredTask.marks,
            this.newTask.description =  requiredTask.description,
            this.newTask.date =  requiredTask.date,
            this.newTask.id = requiredTask.id
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
