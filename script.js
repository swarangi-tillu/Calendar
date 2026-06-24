let date = new Date()

let month = date.getMonth()
let year = date.getFullYear()

let selectedDay = null

let events = {}

function renderCalendar(){

    let box = document.querySelector(".dates")

    box.innerHTML = ""

    let months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ]

    document.getElementById("monthYear").innerText =
        months[month] + " " + year

    let currentDate = new Date()

    let today = currentDate.getDate()
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()

    let days = new Date(year, month+1, 0).getDate()

    let firstDay = new Date(year, month, 1).getDay()

    for(let i=0; i<firstDay; i++){

        let empty = document.createElement("div")

        empty.classList.add("empty")

        box.appendChild(empty)
    }

    for(let i=1; i<=days; i++){

        let element = document.createElement("div")

        element.classList.add("date")

        element.innerHTML = `<strong>${i}</strong>`

        let key = `${i}-${month}-${year}`

        if(events[key]){
            element.innerHTML += `<br>${events[key]}`
        }

        if(
            i === today &&
            month === currentMonth &&
            year === currentYear
        ){
            element.classList.add("today")
        }

        element.onclick = function(){

            selectedDay = i

            document.getElementById("modal").style.display = "block"

            document.getElementById("selectedDate").innerText =
                `${i} ${months[month]} ${year}`
        }

        box.appendChild(element)
    }
}

document.getElementById("saveBtn").onclick = function(){

    let text =
        document.getElementById("eventInput").value

    let key =
        `${selectedDay}-${month}-${year}`

    events[key] = text

    document.getElementById("modal").style.display = "none"

    document.getElementById("eventInput").value = ""

    renderCalendar()
}

document.getElementById("closeBtn").onclick = function(){

    document.getElementById("modal").style.display = "none"
}

document.getElementById("next").onclick = function(){

    month++

    if(month > 11){
        month = 0
        year++
    }

    renderCalendar()
}

document.getElementById("prev").onclick = function(){

    month--

    if(month < 0){
        month = 11
        year--
    }

    renderCalendar()
}

renderCalendar()