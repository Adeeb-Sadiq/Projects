//variables
const input = document.querySelector('.addvalue')
const button = document.querySelector('.additem')
const content = document.querySelector('.container')
const dcontent = document.querySelector('.dcontainer')
const editbutton = document.querySelector('#edit')
editbutton.style = 'display: none'

const list = []
const dlist = []

let idofelementtodelete = null

//functions
const handleadd = () => {
    const item = input.value
    input.value = ''
    if(item!=null && item!=''){
        list.push({
            text:item,
            completed: false,
            id: Date.now(),
        })
        renderlist()
        return
    }
    else{
        return window.alert("Empty value can't be added")
    }
}

const renderlist = () => {
    content.innerHTML = 'Your List'
    list.forEach((ele) => {
        const li = document.createElement('li')
        li.innerHTML = ele.text
        content.appendChild(li)

        const dbutton = document.createElement('button')
        dbutton.innerHTML = 'Delete'
        li.appendChild(dbutton)

        dbutton.addEventListener('click', () => {
            li.remove()
            const id = ele.id
            const index = list.findIndex(ele => ele.id == id)
            list.splice(index,1)
        })

        const ebutton = document.createElement('button')
        ebutton.innerHTML = 'Edit'
        li.appendChild(ebutton)

        ebutton.addEventListener('click', () => {
            showedit(ele.id)
        })

        const done = document.createElement('button')
        done.innerHTML = 'Done'
        li.appendChild(done)

        done.addEventListener('click', () => {
            li.remove()
            const id = ele.id
            const index = list.findIndex(ele => ele.id == id)
            list.splice(index,1)
            handledone(ele)
        })

        // styles
        li.style = `
        position: relative;
        `

        dbutton.style = `
        border: 3px solid #432371;
        background-color: #432371;
        color: #fff;
        position: absolute;
        right: 1px;
        `

        ebutton.style = `
        border: 3px solid #432371;
        background-color: #432371;
        color: #fff;
        position: absolute;
        right: 45px;
        `

        done.style= `
        border: 3px solid green;
        background-color: green;
        color: #fff;
        position: absolute;
        right: 73px;
        `
    })
}

const showedit = (id) => {
    const element = list.find(element => element.id === id)
    input.value = element.text
    button.style = 'display: none'
    editbutton.style = 'display: inline'
    idofelementtodelete = id
}

const handleedit = (e) => {
    const newvalue = input.value
    const element = list.find(element => element.id === idofelementtodelete)
    element.text = newvalue
    renderlist()
    button.style = 'display: inline'
    editbutton.style = 'display: none'
    input.value = ''
}

const handledone = (ele) => {
    dlist.push({
        text:ele.text,
        completed: false,
        id: Date.now(),
    })
    renderdlist()
}

const renderdlist = () => {
    // dcontent.innerHTML = ''
    dcontent.innerHTML = 'Done List'
    dlist.forEach((ele) => {
        const li = document.createElement('li')
        li.innerHTML = ele.text
        dcontent.appendChild(li)

        const dbutton = document.createElement('button')
        dbutton.innerHTML = 'Delete'
        li.appendChild(dbutton)

        dbutton.addEventListener('click', () => {
            li.remove()
            const id = ele.id
            const index = dlist.findIndex(ele => ele.id == id)
            dlist.splice(index,1)
        })
            // styles
        li.style = `
        position: relative;
        color: red
        `
        dbutton.style = `
        border: 3px solid red;
        background-color: red;
        color: #fff;
        position: absolute;
        right: 1px;
        `
    })
}

//main
button.addEventListener('click',handleadd)
editbutton.addEventListener('click', handleedit)