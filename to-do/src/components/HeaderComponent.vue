<template>
  <div class="wrapper">
    
    <div class="viewTasks">
      <div class="button">
        <a href="#/create">
          <input type="button" value="Добавить задачу">
        </a>
      </div>
      
      <div class="sort">
        <div class="sort__radio">
          <h2 class="header">
            СОРТИРОВКА
          </h2>
          <ul>
            <li>
              <input type="radio" id="new" name="data">
              <label for="new">Новые</label>
            </li>
            <li>
              <input type="radio" id="old" name="data">
              <label for="old">Старые</label>
            </li>
          </ul>
        </div>

        <div class="sort__wrapper">
          <div class="sort__checkbox">
            <h2 class="header">
              ПРИОРИТЕТ
            </h2>
            <ul>
              <li>
                <input type="checkbox" id="Low">
                <label for="Low">Low</label>
              </li>
              <li>
                <input type="checkbox" id="Normal">
                <label for="Normal">Normal</label>
              </li>
              <li>
                <input type="checkbox" id="High">
                <label for="High">High</label>
              </li>
            </ul>
          </div>
          <div class="sort__checkbox">
            <h2 class="header">
              ОТМЕТКА
            </h2>
            <ul>
              <li>
                <input type="checkbox" id="Research">
                <label for="Research">Research</label>
              </li>
              <li>
                <input type="checkbox" id="Design">
                <label for="Design">Design</label>
              </li>
              <li>
                <input type="checkbox" id="Development">
                <label for="Development">Development</label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="tasks">
        <div class="task" @click='redirect()' v-for="(toDo, idx) in toDoList" :key="idx">
          <ul>

            <li>

              <h2>
                {{ toDo.name }}
              </h2>

              <ul>
                <li>
                  <p>
                    Создано: {{ toDo.date }}
                  </p>
                </li>
                <li>
                  <p>
                    Приоритет: {{ toDo.priority }}
                  </p>
                </li>
                <li>
                  <p>
                    Отметки: {{ toDo.marks[0] + " " + toDo.marks[1] + " " + toDo.marks[2] }}
                  </p>
                </li>
              </ul>

            </li>

          </ul>

        </div>
      </div>  
    </div>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'HeaderComponent',

  data(){
    return{
      toDoList: []
    }
  },

  created(){
    this.fetchData()
  },

  watch: {
    $route: 'fetchData'
  },

  methods: {

    fixToDoListMarks(marks){
      for (let i = 0; i < 3; i++){
        if (marks[i] == undefined){
          marks[i] = "";
        }
      }
      
      return marks;
    },

    fetchData(){
      axios
        .get("http://localhost:3001/tasks")
        .then(response =>{
            response.data.forEach((value) => {
              if (!this.toDoList.includes(value)) {
                value.marks = this.fixToDoListMarks(value.marks);
                this.toDoList.push(value);
              }
            })
            console.log("Массив data: ", this.toDoList);
        })
        .catch(error => {
            console.log(error);
        });
    },

    redirect(){
      this.$router.push('view');
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

body{
  background-color: #F9FAFE;
}

$blueColor: #0091DC;

$btnTextColor: #ffffff;
$btnFontSize: 16px;

.button{
  display: flex;
  justify-content: center;

  input{
    padding: 15px;
    border: 0;
    border-radius: 6px;  
    
    background-color: $blueColor;

    font-size: $btnFontSize;
    color: $btnTextColor;

    cursor: pointer;
    
    &:hover{
      opacity: 0.9;
    }
  }
}

$headerFontSize: 18px;
$headerFontColor: #808080;

$inputFontSize: 16px;
$inputFontColor: #414141;

.sort{
  display: flex;
  flex-direction: column;
  justify-content: center;
  // &__wrapper{
  //   display: flex;
  //   justify-content: center;
  // }
  h2{
    font-size: $headerFontSize;
    color: $headerFontColor;
  }
  
  ul{
    list-style: none;
    li{
      margin-top: 8px;

      font-size: $inputFontSize;
      color: $inputFontColor;

      display: flex;
      align-items: center;

      input{
      width: 18px;
      height: 18px;

  //#D1D1D1
      border: 20px solid #000000;
      }
      label{
        margin-left: 5px;
        margin-top: 2px;

        cursor: pointer;
      }
    }
    
  }
  &__radio{
    margin-top: 30px;
  }
  &__wrapper{
    margin-top: 30px;

    display: flex;
    gap: 30px;
  }
}

.tasks{
  margin-top: 30px;

  .task{
    margin-top: 30px;
  }

  ul{
    list-style: none;
  }
}

</style>
