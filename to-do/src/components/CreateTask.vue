<template>
    <div class="wrapper">
        <div class="button">
            <a href="#/">
                <input type="button" class="back" value="Назад">
            </a>
        </div>

        <div class="taskData">
            <form method="POST" action="">
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
                                    <input v-model="newTask.marks" value="markResearch" type="checkbox" id="markResearch" name="markResearch">
                                    <label for="markResearch">Research</label>
                                </li>
                                <li>
                                    <input v-model="newTask.marks" value="markDesign" type="checkbox" id="markDesign" name="markDesign">
                                <label for="markDesign">Design</label>
                                </li>
                                <li>
                                    <input v-model="newTask.marks" value="markDevelopment" type="checkbox" id="markDevelopment" name="markDevelopment">
                                <label for="markDevelopment">Development</label>
                                </li>
                            </ul>

                        </div>

                    </li>
                    <li>
                        <h2>ОПИСАНИЕ</h2>
                        <textarea v-model="newTask.description" name="description" id="description" required>Description</textarea>
                    </li>
                </ul>
                {{ newTask.name }} <br>
                {{ newTask.priority }} <br>
                {{ newTask.description }} <br>
                {{ newTask.marks }} <br>
                <br>
                <button @click="add()" name="saveBtn" id="saveBtn"> Сохранить </button>
            </form>
        </div>
    </div>
</template>

<script>



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

  methods: {
    printDate: function () {
        return new Date().toLocaleDateString();
    },
    printTime: function () {
        return new Date().toLocaleTimeString();
    },

    add(){
        // Проверка на заполненность полей
        if (this.newTask.name === "" || this.newTask.priority === "" || this.newTask.description === "") {
            return;
        }

        console.log(this.newTask, this.toDoList)

        // Добавляем в массив задач
        this.toDoList.push(this.newTask.name);

        // Выставляем базовые значения
        this.newTask.name="";
        this.newTask.priority="";
        this.newTask.marks=[];
        this.newTask.description="";
        this.newTask.date=0;

        console.log(this.toDoList);

        // Переход на главную страницу
        this.$router.push('/');
    },
  }

};

</script>

<style scoped lang="scss">
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }


    $backBtnBgColor: #ffffff;
    $backTextColor: #434343;
    
    $btnFontSize: 16px;
    .wrapper{
        width: 100%;
    }
    .button{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
    }


    $FontSize: 16px;
    $HeaderFontColor: #808080;
    $ContentFontColor: #464646;
    .taskData{

        ul{
            list-style: none;

            li{
                margin-top: 25px;

                
                h2{
                    font-size: $FontSize;
                    color: $HeaderFontColor;
                    font-weight: 400;
                }
                
                input{
                    margin-top: 10px;

                    width: 100%;

                    font-size: 16px;

                    border: none;
                    outline: none;
                }
                
                p{
                    font-size: $FontSize;
                    color: $ContentFontColor;
                    font-weight: 400;
                }

                .marks{
                    li{
                        margin-top: 8px;
                        
                        display: flex;
                        align-items: center;
                    }
                    input{
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

                    resize: none;

                    width: 100%;
                    height: 120px;

                    border: none;

                    font-size: $FontSize;
                    color: $ContentFontColor;
                    font-weight: 400;

                    outline: none;
                }
            }
        }



        $saveBtnBgColor: #0091DC;
        $saveBtnTextColor: #ffffff;
        button{
            margin-top: 30px;
            padding: 15px;
            border: 0;
            border-radius: 6px;  

            font-size: $btnFontSize;
            color: $saveBtnTextColor;
            background-color: $saveBtnBgColor;


            cursor: pointer;
            &:hover{
                opacity: 0.9;
            }
        }
    }
</style>
