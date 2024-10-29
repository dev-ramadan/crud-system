

let title = document.querySelector('#title');
let Price = document.querySelector('#Price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let Count = document.querySelector('#Count');
let Category = document.querySelector('#Category');
let Submit = document.querySelector('#Submit');
let Creat = document.querySelector('#Creat');
let Search = document.querySelector('#Search');
let tbody = document.querySelector('#tbody');
let deleteAll = document.querySelector('#deleteAll');


let mood = "Create"
let tmp;

// dark mode 
function dark_mode() {
    document.body.classList.toggle('mode')
}

// get Total
function getTotal() {
    if (Price.value != '') {

        let result = (+Price.value + +taxes.value + +ads.value) - +discount.value
        Submit.innerHTML = result
        document.querySelector('#alert').classList.add('d-none')
    }
    else {
        Submit.innerHTML = ''
        document.querySelector('.alert').classList.remove('d-none')

    }
}



// creat Product
if (localStorage.product != null) {


    Newdata = JSON.parse(localStorage.product)
}
else {
    Newdata = []
}


Creat.addEventListener('click', function () {

    let newProduct = {

        title: title.value.toLowerCase(),
        Price: Price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        Count: Count.value,
        Category: Category.value.toLowerCase(),
        Submit: Submit.innerHTML,
    }




    if (mood === "Create") {
        if (newProduct.Count > 1) {
            for (let i = 0; i < newProduct.Count; i++) {
                Newdata.push(newProduct)
            }
        } else {
            Newdata.push(newProduct)
        }
    }
    else {
        Newdata[tmp] = newProduct
        mood = "Create"
        Creat.innerHTML = "Create"
        Count.style.display = "block"
    }





    localStorage.setItem('product', JSON.stringify(Newdata)) //save in local Storage


    clearInputs()
    displayData()
})


// clear inputs

function clearInputs() {
    title.value = ''
    Price.value = ''
    taxes.value = ''
    Submit.innerHTML = ''
    ads.value = ''
    discount.value = ''
    Count.value = ''
    Category.value = ''
    Submit.value = ''
}

// read and show data

function displayData() {

    let tabel = ''

    for (let i = 0; i < Newdata.length; i++) {


        tabel += `
<tr>

         <td>${i + 1}</td>
         <td>${Newdata[i].title}</td>
         <td>${Newdata[i].Price}</td>
         <td>${Newdata[i].taxes}</td>
         <td>${Newdata[i].ads}</td>
         <td>${Newdata[i].discount}</td>
         <td>${Newdata[i].Count}</td>
         <td>${Newdata[i].Category}</td>
         <td><button onclick="updateData(${i})" class="btn  rounded-4 btn-info mt-2">update</button></td>
         <td><button onclick="deleteProduct(${i})" class="btn rounded-4 btn-danger mt-2">delete</button></td>
         </tr>
         `
    }
    tbody.innerHTML = tabel

    if (Newdata.length > 0) {
        deleteAll.innerHTML = `
         <button onclick="DeleteAll()" class="btn rounded-4 btn-danger w-100 mt-2">Delete All (${Newdata.length})</button>
        `

    } else
        deleteAll.innerHTML = ''

}

// delete Product


function deleteProduct(i) {


    Newdata.splice(i, 1)
    localStorage.product = JSON.stringify(Newdata)
    displayData()
}


function DeleteAll() {
    localStorage.clear()
    Newdata.splice(0)
    displayData()
}



// Update

function updateData(i) {
    title.value = Newdata[i].title
    Price.value = Newdata[i].Price
    taxes.value = Newdata[i].taxes
    ads.value = Newdata[i].ads
    discount.value = Newdata[i].discount
    Category.value = Newdata[i].Category
    getTotal()
    Count.style.display = 'none'
    Creat.innerHTML = "update"
    mood = "Update"
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//Serch

let searchmood = "title"
function getSearchMood(id) {


    if (id == 'SearchTitle') {
        searchmood = "title"
        Search.placeholder = "Search by Title"

    } else {
        searchmood = "Category"
        Search.placeholder = "Search by Category"


    }
    Search.focus()
    Search.value = ''


}

function searchData(value) {

    if (searchmood == "title") {
        let tabel = ''
        for (let i = 0; i < Newdata.length; i++) {
            if (Newdata[i].title.includes(value)) {
                console.log(i);
                tabel += `
                <tr>
                         <td>${i + 1}</td>
                         <td>${Newdata[i].title}</td>
                         <td>${Newdata[i].Price}</td>
                         <td>${Newdata[i].taxes}</td>
                         <td>${Newdata[i].ads}</td>
                         <td>${Newdata[i].discount}</td>
                         <td>${Newdata[i].Count}</td>
                         <td>${Newdata[i].Category}</td>
                         <td><button onclick="updateData(${i})" class="btn  rounded-4 btn-info mt-2">update</button></td>
                         <td><button onclick="deleteProduct(${i})" class="btn rounded-4 btn-danger mt-2">delete</button></td>
                 </tr>
                         `



            }

        }

        tbody.innerHTML = tabel
    }
    if (searchmood !== "title") {
        let tabel = ''
        for (let i = 0; i < Newdata.length; i++) {
            if (Newdata[i].Category.includes(value)) {
                console.log(i);
                tabel += `
                <tr>
                         <td>${i + 1}</td>
                         <td>${Newdata[i].title}</td>
                         <td>${Newdata[i].Price}</td>
                         <td>${Newdata[i].taxes}</td>
                         <td>${Newdata[i].ads}</td>
                         <td>${Newdata[i].discount}</td>
                         <td>${Newdata[i].Count}</td>
                         <td>${Newdata[i].Category}</td>
                         <td><button onclick="updateData(${i})" class="btn  rounded-4 btn-info mt-2">update</button></td>
                         <td><button onclick="deleteProduct(${i})" class="btn rounded-4 btn-danger mt-2">delete</button></td>
                 </tr>
                         `



            }

        }

        tbody.innerHTML = tabel
    }









}