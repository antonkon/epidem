//APPEARANCE SWITCHERS

function validateName(id,classname)
{
    var name = document.getElementById(id);
    if (!checkName(id))
    {
        name.parentNode.classList.add(classname);
        name.tooltip();
        setSubmitEnabled();
    }
    else{
        name.parentNode.classList.remove(classname);
        name.parentNode.classList.add("has-success");
        setSubmitEnabled();
    }
}

function validateEmail(classname)
{
   var email = document.getElementById('email');
   if(!checkEmail()){
       email.parentNode.classList.add(classname);
       $("[data-toggle='tooltip']").tooltip();
       setSubmitEnabled();
   }
   else{
        email.parentNode.classList.remove(classname);
        email.parentNode.classList.add("has-success");
        setSubmitEnabled();
   } 
}

function validatePassword(classname)
{
   var pw_c = document.getElementById('pw_c');
   if(!checkPassword()){
        pw_c.parentNode.classList.add(classname);
        setSubmitEnabled();
   }
   else{
        pw_c.parentNode.classList.remove(classname);
        pw_c.parentNode.classList.add("has-success");
        setSubmitEnabled();
   }
}
/*
function setSubmitEnabled(){
   
   var button = document.getElementById("submit");
   if(checkButton()){
       button.classList.remove("disabled");
   }
   else{
       button.classList.add("disabled");
   }
}

function setSubmitEnabledLogin(){
   var button = document.getElementById("submit");
   if(checkButtonLogin()){
       button.classList.remove("disabled");
   }
   else{
       button.classList.add("disabled");
   }
}
*/
//CHECKERS
function checkName(id)
{
    var name = document.getElementById(id);
    var val = name.value;
    if(val === ""){
        return false;
    }
    else{
        return true;
    }
}

function checkEmail()
{
    var email = document.getElementById('email');
    var val = email.value;
    if (val == "")
    {
        return false;
    }
    else
    {
        var valid = /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[a-z]{2,6}$/.test(email.value);
        if(!valid)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}

function checkPassword()
{
    var pw = document.getElementById('password');
    var pw_c = document.getElementById('pw_c');
    var val = pw.value;
    var val_c = pw_c.value;
    if (val == "")
    {
        return false;
    }
    else
    {
        if(val == val_c)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

function checkButton()
{
   var result = true;
   
   if(!checkName('password'))
   {
       result = false;
   }
   if(!checkEmail())
   {
       result = false;
   }
   if(!checkPassword())
   {
       result = false;
   }
   return result;
}

function checkButtonLogin()
{
   var result = true;
   if(!checkEmail())
   {
       result = false;
   }
   if(!checkName('password'))
   {
       result = false;
   }
   return result;
}


//FOCUS
function focusName(id)
{
    var name = document.getElementById(id);
    name.parentNode.classList.remove("has-error");
    name.parentNode.classList.remove("has-success");
}

function focusEmail()
{
    var email = document.getElementById('email');
    email.parentNode.classList.remove("has-error");
    email.parentNode.classList.remove("has-success");
}