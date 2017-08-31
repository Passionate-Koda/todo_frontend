//IIFE
(function(){
//colaborators to pic from html
    var todoHandle = document.getElementsByClassName("todolist")[0],
        taskHandle = document.getElementsByClassName("create-task")[0],
        writeBtn = document.getElementsByClassName("write-button")[0],
        closeBtn = document.getElementsByClassName("close-icon")[0],
        formHandler = document.getElementsByClassName("create-task-form")[0];

        closeBtn.addEventListener('click', function(e) {
          taskHandle.classList.toggle("create-task-active");
          todoHandle.classList.toggle("todolist-inactive");


           var http = new XMLHttpRequest(),
              token = localStorage.getItem('token'),
              elements = this.elements;
              var data = {},
              i, len;

              http.open('GET', "http://192.168.33.58:8888/api/v1/todos")
              http.setRequestHeader("Content-Type", "application/json")
              http.setRequestHeader("Authorization", "bearer " + token)





                http.onreadystatechange = function() {


                  //is the server ready?
                  if(http.readyState === 4){
                    //is result okay?
                    if(http.status === 200 || http.status === 304){
                      //console.log(http.responseText);//response fromthe server
                      var res = JSON.parse(http.responseText);
                      console.log(res.todos)
                      foreach(function(todos, i){
                        var mnth = document.getElementsByClassName("month")[0],
                            day = document.getElementsByClassName("day")[0],
                            year= document.getElementsByClassName("year")[0],
                            taskTime = document.getElementsByClassName("time")[0],
                            taskDetail = document.getElementsByClassName("task-detail")[0],
                            taskList = document.getElementsByClassName("task-list")[0];

                        var li = document.createElement("li"),
                            closeDiv = document.createElement("div"),
                            taskInfoDiv = document.createElement("div"),
                            hdate = document.createElement("h3"),
                            htime = document.createElement("h3"),
                            pDetail = document.createElement("p"),
                            hdateVal, htimeVal, pDetailVal;



                        li.setAttribute("class", "card task");
                        closeDiv.setAttribute("class", "delete-icon delete-task");
                        taskInfoDiv.setAttribute("class", "task-info")
                        hdate.setAttribute("class", "task-date")
                        htime.setAttribute("class", "task-time")

                        hdateVal = document.createTextNode(i)
                        hdate.appendChild(hdateVal);

                        htimeVal = document.createTextNode(i)
                        htime.appendChild(htimeVal);

                        pDetailVal= document.createTextNode(i)
                        pDetail.appendChild(pDetailVal)

                        taskInfoDiv.appendChild(hdate)
                        taskInfoDiv.appendChild(htime)

                        li.appendChild(closeDiv);
                        li.appendChild(taskInfoDiv);
                        li.appendChild(pDetail);

                        taskList.appendChild(li);

                      })


                      }
                    }
                  }


          http.send(JSON.stringify(data));//converting to json as agains send(data);


              taskHandle.classList.toggle("create-task-active");
              todoHandle.classList.toggle("todolist-inactive");

              e.preventDefault();


        }, false)










          writeBtn.addEventListener('click', function(e) {
            taskHandle.classList.toggle("create-task-active");
          }, false)

        formHandler.addEventListener('submit', function(e){
         var http = new XMLHttpRequest(),
            token = localStorage.getItem('token'),
            elements = this.elements;
            var data = {},
            i, len;

            http.open('POST', "http://192.168.33.58:8888/api/v1/todos")
            http.setRequestHeader("Content-Type", "application/json")
            http.setRequestHeader("Authorization", "bearer " + token)

            data.task = document.getElementsByClassName('task-detail')[0].value

            data.date = document.getElementsByClassName('day')[0] + " " +
            document.getElementsByClassName('month')[0].value + ", " +
            document.getElementsByClassName('year')[0].value

            data.time = document.getElementsByClassName('time')[0].value;

            http.onreadystatechange = function(){
              addTodo(http);

            }
            http.send(JSON.stringify(data));//converting to json as agains send(data);

            appendTodo()
            taskHandle.classList.toggle("create-task-active");
            todoHandle.classList.toggle("todolist-inactive");

            e.preventDefault();

          }, false)


          function appendTodo(frm){
            var mnth = document.getElementsByClassName("month")[0],
                day = document.getElementsByClassName("day")[0],
                year= document.getElementsByClassName("year")[0],
                taskTime = document.getElementsByClassName("time")[0],
                taskDetail = document.getElementsByClassName("task-detail")[0],
                taskList = document.getElementsByClassName("task-list")[0];

            var li = document.createElement("li"),
                closeDiv = document.createElement("div"),
                taskInfoDiv = document.createElement("div"),
                hdate = document.createElement("h3"),
                htime = document.createElement("h3"),
                pDetail = document.createElement("p"),
                hdateVal, htimeVal, pDetailVal;



            li.setAttribute("class", "card task");
            closeDiv.setAttribute("class", "delete-icon delete-task");
            taskInfoDiv.setAttribute("class", "task-info")
            hdate.setAttribute("class", "task-date")
            htime.setAttribute("class", "task-time")

            hdateVal = document.createTextNode(day.value + " "+ mnth.value+ ", " + year.value)
            hdate.appendChild(hdateVal);

            htimeVal = document.createTextNode(taskTime.value)
            htime.appendChild(htimeVal);

            pDetailVal= document.createTextNode(taskDetail.value)
            pDetail.appendChild(pDetailVal)

            taskInfoDiv.appendChild(hdate)
            taskInfoDiv.appendChild(htime)

            li.appendChild(closeDiv);
            li.appendChild(taskInfoDiv);
            li.appendChild(pDetail);

            taskList.appendChild(li);

          }

          function addTodo(xhr){
            if(xhr.readyState === 4){
              //is result okay?
              if(xhr.status === 200 || xhr.status === 304){
              console.log(xhr.responseText)
              }
            }
          }





})()
