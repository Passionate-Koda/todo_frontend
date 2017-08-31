//IIFE
(function() {

  var regForm = document.getElementById("register-form"),
  loginForm = document.getElementById("login-form"),
  loginNav  = document.getElementById("login"),
  regNav = document.getElementById("register"),
  regFormHandler = regForm.getElementsByTagName("form")[0],
  loginFormHandler = loginForm.getElementsByTagName("form")[0];

  loginNav.addEventListener("click", function(e){
    if((loginForm.classList.contains('hide'))){
      loginForm.classList.toggle('hide');
      regForm.classList.toggle('hide');
    }
    e.preventDefault()
  }, false)

  regNav.addEventListener("click", function(e){
    if((regForm.classList.contains("hide"))){

      loginForm.classList.toggle('hide');
      regForm.classList.toggle('hide');
    }
    e.preventDefault()
  }, false)

  // name=taiwo$password=maja
  regFormHandler.addEventListener("submit", function(e) {

    var http = new XMLHttpRequest();
    elements = this.elements;
    var data = "",
    i, len;

    http.open("POST", "http://192.168.33.58:8888/api/v1/users")
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    for( i = 0, len = elements.length; i < len; ++i){
      data += encodeURIComponent(elements[i].name)
      data += "="
      data += encodeURIComponent(elements[i].value)
      data += "&"
    }
    //always reload
    http.onreadystatechange = function() {


      //is the server ready?
      if(http.readyState === 4){
        //is result okay?
        if(http.status === 200 || http.status === 304){
          //console.log(http.responseText);//response fromthe server
          var res = JSON.parse(http.responseText);
          if(res.success){
            loginForm.classList.toggle('hide');
            regForm.classList.toggle('hide');
          }
        }
      }
    }


    //trip trailing ampersand
    data = data.substring(0, data.length - 1)

    console.log(data);
    http.send(data);
    e.preventDefault();

  }, false);




  loginFormHandler.addEventListener("submit", function(e) {
    var http = new XMLHttpRequest();
    elements = this.elements;

    var data = "",
    i, len;

    http.open("POST", "http://192.168.33.58:8888/api/v1/auth/signin")
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    for( i = 0, len = elements.length; i < len; ++i){
      data += encodeURIComponent(elements[i].name)
      data += "="
      data += encodeURIComponent(elements[i].value)
      data += "&"
    }
    //always reload
    http.onreadystatechange = function() {


      //is the server ready?
      if(http.readyState === 4){
        //is result okay?
        if(http.status === 200 || http.status === 304){
          //console.log(http.responseText);//response fromthe server
          var res = JSON.parse(http.responseText);
          if(res._token){
            localStorage.setItem("token", res._token)
            window.location = "todo.html";
          }
        }
      }
    }


    //trip trailing ampersand
    data = data.substring(0, data.length - 1)

    console.log(data);
    http.send(data);

    e.preventDefault();
  }, false);

  //windows.location = 'todo.html'

})()
