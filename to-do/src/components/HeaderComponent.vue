<template>

    <div class="wrapper">
      
      <div class="viewTasks">
        <div class="button">
          <a href="#/create/new">
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
                <input 
                v-model="filterParams.oldest" 
                @click="switchOldest()" 
                type="radio" value="new" id="new" name="data">
                <label for="new">Новые</label>
              </li>
              <li>
                <input 
                v-model="filterParams.oldest" 
                @click="switchOldest()" 
                type="radio" value="old" id="old" name="data">
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
                  <input 
                  v-model="filterParams.priority" 
                  @click="filterList()" 
                  value="Low" type="checkbox" id="Low">
                  <label for="Low">Low</label>
                </li>
                <li>
                  <input 
                  v-model="filterParams.priority" 
                  @click="filterList()" 
                  value="Normal" type="checkbox" id="Normal">
                  <label for="Normal">Normal</label>
                </li>
                <li>
                  <input 
                  v-model="filterParams.priority" 
                  @click="filterList()" 
                  value="High" type="checkbox" id="High">
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
                  <input
                  v-model="filterParams.marks"
                  @click="filterList()" 
                  value="Research" type="checkbox" id="Research">
                  <label for="Research">Research</label>
                </li>
                <li>
                  <input
                  v-model="filterParams.marks"
                  @click="filterList()" 
                  value="Design" type="checkbox" id="Design">
                  <label for="Design">Design</label>
                </li>
                <li>
                  <input
                  v-model="filterParams.marks"
                  @click="filterList()" 
                  value="Development" type="checkbox" id="Development">
                  <label for="Development">Development</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tasks">
          <div class="task" @click='redirect(toDo.id)' v-for="(toDo, idx) in filteredList" :key="idx">
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
      toDoList: [],

      filterParams: {
        oldest: "",
        priority: [],
        marks: []
      },
      filteredList: [],


      flagForFilter: false,

      // Для радиокнопок
      previusValue: "old"
    }
  },

  created(){
    this.fetchData(),
    this.filterList()
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {

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

    redirect(id){
      let path = "view/" + id;
      this.$router.push(path);
    },

    filterList(){
      setTimeout(() => {
        if (this.filterParams.marks.length === 0 && this.filterParams.priority.length === 0){
          this.filteredList = this.toDoList;
          return
        }
        this.filteredList = [];


        this.toDoList.map( value => {

          this.flagForFilter = false

          value.marks.forEach( (mark) => {
            if (mark === ""){
              return 
            }
            
            const markPlus = this.filterParams.marks + ", "

            if ((this.filterParams.marks.includes(mark) || markPlus == mark || this.filterParams.marks.length === 0)){
              this.flagForFilter = true
            }
            else{
              return
            }
          })

          if ((this.filterParams.priority.includes(value.priority) || this.filterParams.priority.length === 0) && this.flagForFilter === true){
            this.filteredList.push(value);
          }

        });


      }, 400);
    },

    switchOldest(){
      setTimeout(() => {
        if (this.filterParams.oldest !== this.previusValue){
          this.filteredList.reverse()
        }

        this.previusValue = this.filterParams.oldest;
        
      }, 400);
    }
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

.wrapper{
  width: 270px;
  margin: 0 auto;
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

  &__radio{
    background-color: #ffffff;
    padding: 10px;
  }

  &__wrapper{
    background-color: #ffffff;
    padding: 10px;
  }

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
    background-color: #ffffff;
    padding: 10px;

    margin-top: 30px;
    cursor: pointer;
    

    ul li h2{
      display: block;
      word-wrap: break-word;
    }
  }

  ul{
    list-style: none;
  }
}

@media (min-width: 768px) {
  .wrapper{
    width: 90%;
  }
  .viewTasks{
    display: grid;
    gap: 50px;

    grid-template-columns: (200px, );
    grid-template-rows: (50px, );
    
    .button{
      margin-top: 30px;
      display: block;
      
      grid-column-start: 2;
      grid-column-end: 3;

      grid-row-start: 1;
      grid-row-end: 2;
    }

    .sort{
      display: flex;
      flex-direction: column;
      justify-content: left;

      grid-column-start: 1;
      grid-column-end: 2;

      grid-row-start: 1;
      grid-row-end: 3;

      &__radio{
        background-color: #ffffff;
        padding: 10px;
      }

      &__wrapper{
        background-color: #ffffff;
        padding: 10px;

        display: flex;
        flex-direction: column;
      }
    }

    .tasks{
      margin-top: 0;

      width: 100%;

      grid-column-start: 2;
      grid-column-end: 3;

      grid-row-start: 2;
      grid-row-end: 3;

      .task{
        background-color: #ffffff;
        padding: 10px;

        max-width: 65vw;

        ul li h2{
          max-width: 55vw;

        }
      }
    }
  }
}

</style>
