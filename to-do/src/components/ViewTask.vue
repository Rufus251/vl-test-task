<template>
    <div class="wrapper">
        <div class="button">
            <a href="#/">
                <input type="button" class="back" value="Назад">
            </a>
            <a :href="`#/create/${this.taskId()}`">
                <input @click="editTaskRedirect" type="button" class="edit" value="Редактировать">
            </a>
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
                    <p>
                        {{ this.task.marks[0] + " " + this.task.marks[1] + " " + this.task.marks[2] }}
                    </p>
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
            <input @click="deleteTask()" type="button" class="delete" value="Удалить">
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

    created(){
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
    }
}
</script>



<style scoped lang="scss">
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    $backBtnBgColor: #ffffff;
    $editBtnBgColor: #0091DC;
    
    $backTextColor: #434343;
    $editTextColor: #ffffff;
    
    $btnFontSize: 16px;
    .wrapper{
        width: 270px;
        margin: 0 auto;
    }
    .button{
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        gap: 15px;

        input{
            padding: 15px;
            border: 0;
            border-radius: 6px;  

            font-size: $btnFontSize;

            cursor: pointer;
            
            &:hover{
            opacity: 0.9;
            }
        }
        .back{
            color: $backTextColor;
            background-color: $backBtnBgColor;
        }
        .edit{
            color: $editTextColor;
            background-color: $editBtnBgColor;
        }
    }


    $FontSize: 16px;
    $HeaderFontColor: #808080;
    $ContentFontColor: #464646;
    .taskData{
        background-color: #ffffff;
        padding: 1px 25px 25px 25px;

        margin-top: 30px;

        ul{
            list-style: none;

            li{
                margin-top: 25px;

                h2{
                    font-size: $FontSize;
                    color: $HeaderFontColor;
                    font-weight: 400;
                }
                p{
                    word-break: break-word;

                    font-size: $FontSize;
                    color: $ContentFontColor;
                    font-weight: 400;
                }
            }
        }
    }


    $deleteBtnBgColor: #F34949;
    $deleteTextColor: #ffffff;
    .deleteBtn{
        display: flex;
        justify-content: center;
        input{
            margin-top: 30px;
            margin-left: 15px;
            padding: 15px;

            border: 0;
            border-radius: 6px;  

            font-size: $btnFontSize;
            background-color: $deleteBtnBgColor;
            color: $deleteTextColor;

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

                input{
                    margin: 0;
                }
            }
        }


    }
</style>
