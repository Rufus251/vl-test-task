<template>
    <div class="wrapper">
        <div class="button">
            <a href="#/">
                <input type="button" class="back" value="Назад">
            </a>
            <a href="#/create">
                <input type="button" class="edit" value="Редактировать">
            </a>
        </div>

        <div class="taskData">
            <ul>
                <li>
                    <h2>
                        НАЗВАНИЕ ЗАДАЧИ
                    </h2>
                    <p>
                        Lorem, ipsum.
                    </p>
                </li>
                <li>
                    <h2>
                        ДАТА СОЗДАНИЯ
                    </h2>
                    <p>
                        Lorem, ipsum.
                    </p>
                </li>
                <li>
                    <h2>
                        ПРИОРИТЕТ
                    </h2>
                    <p>
                        Lorem, ipsum.
                    </p>
                </li>
                <li>
                    <h2>
                        ОТМЕТКИ
                    </h2>
                    <p>
                        Lorem, ipsum.
                    </p>
                </li>
                <li>
                    <h2>
                        ОПИСАНИЕ
                    </h2>
                    <p>
                        Lorem, ipsum.
                    </p>
                </li>
                <li>
                    <h2>
                        TO DO
                    </h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nostrum illo blanditiis deserunt, neque, culpa quod adipisci ea eius alias assumenda. Similique, delectus nam maiores voluptatum, magnam natus aliquam, autem alias numquam deleniti est! Quo nesciunt quidem quis libero corrupti vitae sit distinctio illo dignissimos vel iure, laborum doloremque nostrum!
                    </p>
                </li>
            </ul>
        </div>

        <div class="deleteBtn">
            <input type="button" class="delete" value="Удалить">
        </div>
    </div>
</template>

<script>
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
        width: 100%;
    }
    .button{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            margin-left: 15px;
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

        ul{
            list-style: none;

            li{
                margin-top: 30px;

                
                h2{
                    font-size: $FontSize;
                    color: $HeaderFontColor;
                    font-weight: 400;
                }
                p{
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
</style>
