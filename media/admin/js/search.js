function myFunction() {

  var input, filter, table, tr, str, i, j, n;
  n = 4;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("zapros_table");
  tr = table.getElementsByTagName("tr");

	for(i = 0; i < tr.length; i++)
		tr[i].style.display = "none"; 
	
 for(j = 0; j < n; j++){ 
  for (i = 0; i < tr.length; i++) {
    str = tr[i].getElementsByTagName("td")[j];
    if (str) {
      if (str.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } 
    } 
  }
  }
}

function myFunction1() {

  var input, filter, table, tr, str, i, j, n;
  n = 4;
  input = document.getElementById("myInput1");
  filter = input.value.toUpperCase();
  table = document.getElementById("user_table");
  tr = table.getElementsByTagName("tr");

	for(i = 0; i < tr.length; i++)
		tr[i].style.display = "none"; 
	
 for(j = 0; j < n; j++){ 
  for (i = 0; i < tr.length; i++) {
    str = tr[i].getElementsByTagName("td")[j];
    if (str) {
      if (str.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } 
    } 
  }
  }
}



function myFunction2() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  table = document.getElementById("table_admin");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

function addRow(r)
{
var i = r.parentNode.parentNode.rowIndex; //берем индекс строки по нажатию кнопки
var x = document.getElementById('user_table').insertRow(1); //добавляем строку в начало таблицы
var m = document.getElementById('zapros_table');
var g = document.getElementById('user_table');
var tr = m.getElementsByTagName("tr")[i];
td = tr.getElementsByTagName("td")[0].innerHTML;
td1 = tr.getElementsByTagName("td")[1].innerHTML;
td2 = tr.getElementsByTagName("td")[2].innerHTML;
td3 = tr.getElementsByTagName("td")[3].innerHTML;
td4 = g.getElementsByTagName("td")[4].innerHTML;
var y=x.insertCell(0);
var z=x.insertCell(1);
var b=x.insertCell(2);
var c=x.insertCell(3);
var a=x.insertCell(4);
y.innerHTML=td;
z.innerHTML=td1;
b.innerHTML=td2;
c.innerHTML=td3;
a.innerHTML=td4;

document.getElementById("zapros_table").deleteRow(i); //удаляем строку из таблицы запросов
}

function deleteRow(r)
{
var i = r.parentNode.parentNode.rowIndex;
document.getElementById("zapros_table").deleteRow(i);
}

function deleteRow1(r)
{
var i = r.parentNode.parentNode.rowIndex;
document.getElementById("user_table").deleteRow(i);
}

function deleteRow2(r)
{
var i = r.parentNode.parentNode.rowIndex;
document.getElementById("table_admin").deleteRow(i);
}