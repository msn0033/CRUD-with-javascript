const title = document.getElementById("title");
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');

let count = document.getElementById('count');

let category = document.getElementById('category');

let submit = document.getElementById('submit');

// console.log(title,price,taxes,ads,discount,total,count,category,search,submit);

//GLOBAL
let dataproduct;
let mood = "Create";
let tmp;

//local storage
if (localStorage.product != null) {
    dataproduct = JSON.parse(localStorage.product)
} else {
    dataproduct = []
}

//function total
function getTotal() {
    if (price.value != '') {
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.background = "green";
    } else {
        total.innerHTML = '';
        total.style.background = "red";
    }


}

// click submit 
submit.addEventListener('click', CreateOrUpdate);

//function Create & Update
function CreateOrUpdate() {
    let newobject = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value

        }
     //Create &
    if (mood === "Create") {
        if (count.value > 1) {
            for (let i = 0; i < count.value; i++)
                dataproduct.push(newobject);
        } else {
            dataproduct.push(newobject);
        }
    }
    //update
    else {

        dataproduct[tmp] = newobject;
        mood = "Create";
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    //save LocalStorge
    localStorage.setItem('product', JSON.stringify(dataproduct));
    showData();
    InputClear();
}

//showdata
function showData() {
    getTotal();
    let tables = '';
    for (let i = 0; i < dataproduct.length; i++) {
        tables += ` 
                <tr>
                    <td>${i+1}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    
                    <td><div class="button"><button onclick="UpdateRow(${i})">Update</button></div></td>
                    <td><div class="button"><button onclick="DeleteRow(${i})">Delete</button></div></td>
                </tr>`;
    }
    let tbody = document.getElementById("tbody").innerHTML = tables;

    //show btn Delete All
    let btnDeleteAll = document.getElementById('btnDeleteAll');
    if (dataproduct.length > 0) {
        btnDeleteAll.innerHTML = `<div class="button"><button onclick="DeleteAll()">Delete All</button></div> `;
        //btnDeleteAll.addEventListener('click',DeleteAll);
    } else {
        btnDeleteAll.innerHTML = '';
    }
}
showData();

//Delete All
function DeleteAll() {
    console.log("Dlete All");
    dataproduct.splice(0);
    localStorage.clear();
    showData();
}

//Delete Row 
function DeleteRow(i) {
    console.log(i);

    dataproduct.splice(i, 1);

    localStorage.setItem('product', JSON.stringify(dataproduct));
    showData();
}
//InputClear
function InputClear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '00';
    category.value = '';
}
//update
function UpdateRow(i) {
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    taxes.value = dataproduct[i].taxes;
    ads.value = dataproduct[i].ads;
    discount.value = dataproduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataproduct[i].category;

    scroll({ top: 0, behavior: "smooth" })
    submit.innerHTML = 'Update';
    mood = "Update";
    tmp = i;
}


//search mood
let SearchMood="title";
function getSearchMood(id)
{
    let search = document.getElementById('search');

    if(id=="Searchtitle")
    {
        SearchMood="title";

    }

    else{
        SearchMood="category";
    }

    search.focus();   
    search.placeholder="Search By "+SearchMood;
   
}

//Serach Data
function SearchData(value)
{
    let table = '';
    for(let i=0 ;i<dataproduct.length;i++)
    {
        if(SearchMood=="title")
        {
          if(dataproduct[i].title.includes(value))
          {
            table += ` 
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataproduct[i].title}</td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].taxes}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].discount}</td>
                        <td>${dataproduct[i].total}</td>
                        <td>${dataproduct[i].category}</td>
                        
                        <td><div class="button"><button onclick="UpdateRow(${i})">Update</button></div></td>
                        <td><div class="button"><button onclick="DeleteRow(${i})">Delete</button></div></td>
                    </tr>`;
            }
            let tbody = document.getElementById("tbody").innerHTML = table;
          }
        if(SearchMood=="category")
        {
            if(dataproduct[i].category.includes(value))
            {
            table += ` 
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataproduct[i].title}</td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].taxes}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].discount}</td>
                        <td>${dataproduct[i].total}</td>
                        <td>${dataproduct[i].category}</td>
                        
                        <td><div class="button"><button onclick="UpdateRow(${i})">Update</button></div></td>
                        <td><div class="button"><button onclick="DeleteRow(${i})">Delete</button></div></td>
                    </tr>`;
            }
            let tbody = document.getElementById("tbody").innerHTML = table;
        }
           
      
    }
    
}