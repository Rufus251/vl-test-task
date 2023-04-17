<template>

    <div class="wrapper">
      
      <div class="viewTasks">
        <div class="button">
          <button @click="createNewTask()"> Добавить задачу </button>
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
                checked
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
                      Отметки: 
                    </p>
                    <pre v-for="marks in toDo.marks" :key="marks"> {{marks}}</pre>
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

import {mapGetters} from 'vuex';

export default {
  name: 'HeaderComponent',

  data(){
    return{
      filterParams: {
        oldest: "old",
        priority: [],
        marks: []
      },
      filteredList: [],

      // Для сортировки по новизне
      flagForFilter: false,

      // До какой задачи подгружать
      taskCounter: 15,

      // Для радиокнопок
      previusValue: "old"
    }
  },

  mounted(){
    this.filterList()
    this.whereIsScroll()
  },

  computed: mapGetters(['allTasks']),

  methods: {
    // Редиректы
    createNewTask(){
      if (this.previusValue === 'new'){
        this.allTasks.reverse()
      }
      this.$router.push(`/create/new`)
    },

    redirect(id){
      if (this.previusValue === 'new'){
        this.allTasks.reverse()
      }
      let path = "view/" + id;
      this.$router.push(path);
    },

    // Фильтрация списка
    filterList(){
      setTimeout(() => {

        // Если нет фильтров, то весь список или до 15
        if (this.filterParams.marks.length === 0 && this.filterParams.priority.length === 0){
          this.filteredList = this.allTasks;

          this.filteredList = this.filteredList.slice(0, this.taskCounter)

          return
        }

        // Если фильтры есть
        this.filteredList = [];


        this.allTasks.map( value => {

          this.flagForFilter = false

          // Проверка по меткам
          value.marks.forEach( (mark) => {

            // Если метка не нулевая
            if (mark === ""){
              return 
            }
    
            // Если в фильтрах есть эта метка или меток нет
            if ((this.filterParams.marks.includes(mark) ||  this.filterParams.marks.length === 0)){
              this.flagForFilter = true
            }
            else{
              return
            }
          })

          // Если в таске есть нужный приоритет и отметка
          if ((this.filterParams.priority.includes(value.priority) || this.filterParams.priority.length === 0) && this.flagForFilter === true){
            this.filteredList.push(value);
          }

          // Отсекаем нужное кол-во задач
          this.filteredList = this.filteredList.slice(0, this.taskCounter)

          
        });

      }, 200);
    },

    fixTasksMarks(marks){
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

    // Фильтрация по дате
    switchOldest(){
      
      setTimeout(() => {
        
        if (this.filterParams.oldest !== this.previusValue){
          this.allTasks.reverse()
          this.filterList()
          
          this.previusValue = this.filterParams.oldest
        }
      }, 200);
    },

    // Подгрузка при прокрутке странцы вниз
    whereIsScroll(){
      setInterval(() => {
        var scrollHeight=document.documentElement.scrollHeight;
        var clientHeight=document.documentElement.clientHeight;
        var currentScrollHeight = document.documentElement.scrollTop;
  
        if (currentScrollHeight >= scrollHeight - clientHeight - 400){
          this.taskCounter += 15;

          if (this.taskCounter >= this.allTasks.length){
            this.taskCounter = this.allTasks.length;
          }
          
          this.filterList();

        }
      }, 500);
    }
  }

};

</script>

<style scoped lang="scss">
  @import "@/assets/main.module.scss";

  .button{
    display: flex;
    justify-content: center;

    button{
      padding: 15px;
      border: 0;
      border-radius: 6px;  
      
      background-color: $blueBtnBackgroundColor;
      color: $blueBtnFontColor;

      font-size: $blueBtnFontSize;
      
      cursor: pointer;
      
      &:hover{
        opacity: 0.9;
      }
    }
  }

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

      ul li ul li{
        display: flex;
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
