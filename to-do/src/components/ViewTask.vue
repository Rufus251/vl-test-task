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
                    <span v-for="marks in task.marks" :key="marks"> {{marks}}, </span>
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
            <button @click="delTask()" type="button" class="delete"> Удалить </button>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default{
    data(){
        return{
            task: {
                name: "",
                priority: "",
                marks: [],
                description: "",
                date: "",
            }
        }
    },

    mounted(){
        this.getTask()
    },

    computed: mapGetters(['allTasks']),

    methods: {
        ...mapMutations(['deleteTask']),
        
        // Получение таска для просмотра
        getTask(){
            const requiredTask = this.allTasks.find( value => {
                if(value.id === this.taskId()){
                    return value
                }
            })

            this.task.name =  requiredTask.name,
            this.task.priority =  requiredTask.priority,
            this.task.marks = requiredTask.marks,
            this.task.description =  requiredTask.description,
            this.task.date =  requiredTask.date,
            this.task.id = requiredTask.id
        },

        taskId(){
            return parseInt(this.$route.params.id);
        },

        delTask(){
            this.deleteTask(this.taskId())
            this.$router.back()
        },

        routerToEdit(){
            const id = this.taskId()
            const path = "/create/" + id;
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
