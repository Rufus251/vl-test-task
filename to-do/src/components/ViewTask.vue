<template>
    <div class="wrapper">
        <div class="button">
            <button @click="$router.back()" class="back"> Назад </button>
            <button @click="routerToEdit()" type="button" class="edit"> Редактировать</button>
        </div>

        <div class="taskData">
            <ul>
                <li>
                    <h2>
                        НАЗВАНИЕ ЗАДАЧИ
                    </h2>
                    <p>
                        {{ this.task.name }}
                    </p>
                </li>
                <li>
                    <h2>
                        ДАТА СОЗДАНИЯ
                    </h2>
                    <p>
                        {{ this.task.date }}
                    </p>
                </li>
                <li>
                    <h2>
                        ПРИОРИТЕТ
                    </h2>
                    <p>
                        {{ this.task.priority }}
                    </p>
                </li>
                <li>
                    <h2>
                        ОТМЕТКИ
                    </h2>
                    <span v-for="marks in task.marks" :key="marks"> {{marks}}</span>
                </li>
                <li>
                    <h2>
                        ОПИСАНИЕ
                    </h2>
                    <p>
                        {{ this.task.description }}
                    </p>
                </li>
            </ul>
        </div>
        <div class="deleteBtn">
            <button @click="deleteTask()" type="button" class="delete"> Удалить </button>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default{
    data(){
        return{
            task: {
                name: "",
                priority: "",
                marks: ["", "", ""],
                description: "",
                date: "",
            }
        }
    },

    mounted(){
        this.getTask()
    },

    watch: {
        $route: 'getTask'
    },

    methods: {
        
        taskId(){
            return parseInt(this.$route.params.id);
        },

        deleteTask(){
            const path = "http://localhost:3001/tasks/" + this.taskId();
            axios.delete(path);
            this.$router.go(-1)
        },

        getTask(){
            axios
            .get("http://localhost:3001/tasks", {
                params: {
                    id: this.taskId(),
                }
            })
            .then(response =>{
                this.task.name =  response.data[0].name,
                this.task.priority =  response.data[0].priority,
                this.task.marks = this.fixToDoListMarks(response.data[0].marks),
                this.task.description =  response.data[0].description,
                this.task.date =  response.data[0].date
            })
            .catch(error => {
                console.log(error);
            });
        },

        fixToDoListMarks(marks){
            for (let i = 0; i < 3; i++){
                if (marks[i] == undefined){
                marks[i] = "";
                }
                if (marks[i+1] != undefined){
                marks[i] = marks[i] + ", "
                }
            }
      
            return marks;
        },

        routerToEdit(){
            console.log(this.taskId());
            const id = this.taskId()
            const path = "/create/" + id;
            console.log(path)
            this.$router.push(path);

        }
    }
}
</script>

<style scoped lang="scss">
    @import "@/assets/main.module.scss";
    .button{
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        gap: 15px;

        button{
            padding: 15px;
            border: 0;
            border-radius: 6px;  

            cursor: pointer;
            
            &:hover{
            opacity: 0.9;
            }
        }
        .back{
            color: $whiteBtnFontColor;
            background-color: $whiteBtnBackgroundColor;
            font-size: $whiteBtnFontSize;
        }
        .edit{
            color: $blueBtnFontColor;
            background-color: $blueBtnBackgroundColor;
            font-size: $blueBtnFontSize;
        }
    }

    .taskData{
        background-color: #ffffff;
        padding: 1px 25px 25px 25px;

        margin-top: 30px;

        ul{
            list-style: none;

            li{
                margin-top: 25px;

                h2{
                    font-size: $headerFontSize;
                    color: $viewHeaderFontColor;
                    font-weight: 400;
                }
                p{
                    word-break: break-word;

                    font-size: $pFontSize;
                    color: $viewTextFontColor;
                    font-weight: 400;
                }
            }
        }
    }

    .deleteBtn{
        display: flex;
        justify-content: center;
        .delete{
            margin-top: 30px;
            margin-left: 15px;
            padding: 15px;

            border: 0;
            border-radius: 6px;  

            font-size: $redBtnFontSize;
            background-color: $redBtnBackgroundColor;
            color: $redBtnFontColor;

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
        
        .wrapper{
            display: grid;
            gap: 10px;

            grid-template-columns: (80% , );
            grid-template-rows: (100px, );

            .button{
                margin-top: 40px;

                justify-content: left;

                grid-column-start: 1;
                grid-column-end: 2;

                grid-row-start: 1;
                grid-row-end: 2;
            }

            .taskData{
                grid-column-start: 1;
                grid-column-end: 3;

                grid-row-start: 2;
                grid-row-end: 3;
            }

            .deleteBtn{
                margin-top: 40px;

                grid-column-start: 2;
                grid-column-end: 3;

                grid-row-start: 1;
                grid-row-end: 2;

                justify-content: right;

                .delete{
                    margin: 0;
                }
            }
        }


    }
</style>
