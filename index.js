// + Controllers for theme (its dark initially)
const themeIcon = document.getElementById('theme-icon')
const themeSwitch = document.getElementById('theme-switch')
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        themeIcon.src = 'icon/sun.svg'
        document.documentElement.style.setProperty('--background', '#f6f3f9');
        document.documentElement.style.setProperty('--text', '#0d0a10');
        document.documentElement.style.setProperty('--primary', '#9566d1');
        document.documentElement.style.setProperty('--secondary', '#b091d7');
        document.documentElement.style.setProperty('--accent', '#7d51b4');
    } else {
        themeIcon.src = "icon/moon.svg"
        document.documentElement.style.setProperty('--background', '#0a070e');
        document.documentElement.style.setProperty('--text', '#f2eff5');
        document.documentElement.style.setProperty('--primary', '#784baf');
        document.documentElement.style.setProperty('--secondary', '#46276d');
        document.documentElement.style.setProperty('--accent', '#5cc2e99');
    }
})


// + Controllers for tab selection (between calendar and reminders)
const calendarTab = document.getElementById('calendar-tab')
const reminderTab = document.getElementById('reminders-tab')
const calendarTabTrigger = document.getElementById('show-calendar')
const reminderTabTrigger = document.getElementById('show-reminders')
const calendarDisplay = document.querySelector('.calendario')
const remindersDisplay = document.querySelector('.reminders')
calendarTabTrigger.addEventListener('change', () => {
    if (calendarTabTrigger.checked) {
        calendarTab.style.color = 'var(--text)'
        calendarTab.style.backgroundColor = 'var(--secondary)'
        reminderTab.style.backgroundColor = 'var(--primary)'
        remindersDisplay.style.display = 'none'  
        calendarDisplay.style.display = 'flex'
    }
})

reminderTabTrigger.addEventListener('change', () => {
    if (reminderTabTrigger.checked) {
        reminderTab.style.color = 'var(--text)'
        reminderTab.style.backgroundColor = 'var(--secondary)'
        calendarTab.style.backgroundColor = 'var(--primary)'
        calendarDisplay.style.display = 'none'
        remindersDisplay.style.display = 'block'
        createReminders()
    }
})

// + Calendar section

const months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
}
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth()
const calendarTable = document.getElementById('calendar-table')
const monthHeader = document.querySelector('.month')
const yearHeader = document.querySelector('.year')
const next = document.querySelector('.next-month').addEventListener('click', () => {
    month++
    createCalendar(year, month)
})
const prev = document.querySelector('.previous-month').addEventListener('click', () => {
    month--
    createCalendar(year, month)
})
let daySelected = 0
const preview = document.querySelector('.event-preview')
function createCalendar() {
    if(month < 0){
        year--
        month = 11
    }else if (month > 11){
        year++;
        month = 0
    }
    let calendarDate = new Date(year, month);

    let table = '<table><tr><th>LUN</th><th>MAR</th><th>MIE</th><th>JUE</th><th>VIE</th><th>SAB</th><th>DOM</th></tr><tr>';

    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(calendarDate); i++) {
        table += '<td></td>';
    }
    let currentDay = 1
    // <td> with actual dates
    while (calendarDate.getMonth() == month) {
        // console.log(`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${calendarDate.getDate()}`)
        if(localStorage.getItem(`${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${calendarDate.getDate()}`) !== null){
            table += `<td class="${currentDay++}">
                        ${calendarDate.getDate()}
                        <svg fill="#5c2e99" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"/></svg>
                      </td>`;
        }else {
            table += `<td class="${currentDay++}">
                    ${calendarDate.getDate()}
                  </td>`;
        }

        if (getDay(calendarDate) % 7 == 6) { // sunday, last day of week - newline
            table += '</tr><tr>';
        }

        calendarDate.setDate(calendarDate.getDate() + 1);
    }

    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(calendarDate) != 0) {
        for (let i = getDay(calendarDate); i < 7; i++) {
            table += '<td></td>';
        }
    }

    // close the table
    table += '</tr></table>';

    yearHeader.innerHTML = year
    monthHeader.innerHTML = months[month]
    calendarTable.innerHTML = table;
    
const previewHour = document.querySelector('.event-preview-hour')
const previewText = document.querySelector('.event-preview-text')
const cells = document.querySelectorAll('td')
cells.forEach(td => {
    td.addEventListener('click', () => {
        console.log('clicked')
        if(td.childElementCount === 0){
            return
        }
        daySelected = td.className
        console.log(`${year}-${month}-${td.className}`)
        const hour = localStorage.getItem(`${year}-${month}-${td.className}`)
        const text = localStorage.getItem(hour)
        console.log(hour)
        console.log(text)
        previewHour.innerHTML = hour
        previewText.innerHTML = text
        overlayBlur.style.display = 'block'
        preview.style.display = 'block'
    })
})
};

function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
}
// Load the calendar when page loads
window.onload = createCalendar(year, month)



// + New event form section

const newEventForm = document.querySelector('.new-event-form')
const overlayBlur = document.querySelector('.overlay')
const cancelForm = document.querySelector('.cancelForm').addEventListener('click', () => {
    newEventForm.style.display = 'none'
    overlayBlur.style.display = 'none'
})
const addButton = document.querySelector('.add').addEventListener('click', () => {
    newEventForm.style.display = 'block'
    overlayBlur.style.display = 'block'
    const textInput = document.getElementById('titulo-evento')
    textInput.focus()
})

function addEvent() {
    const dateInput = document.getElementById('fecha-evento')
    const hour = document.getElementById('hora-evento')
    const text = document.getElementById('titulo-evento')
    if(dateInput.value === '' || hour.value === '' || text.value === ''){
        return
    }
    const date = new Date(dateInput.value)
    localStorage.setItem(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()+1}`,hour.value)
    localStorage.setItem(hour.value,text.value)
    createCalendar()
    newEventForm.style.display = 'none'
    overlayBlur.style.display = 'none'
    console.log('added')
    dateInput.value = ''
    hour.value = ''
    text.value = ''
}

// For showing the event in a window
function closePreview(){
    overlayBlur.style.display = 'none'
    preview.style.display = 'none'
}
const closePreviewButton = document.querySelector('.close-preview').addEventListener('click',closePreview)
const deleteEvent = document.querySelector('.delete-event').addEventListener('click', () => {
    const hour = localStorage.getItem(`${year}-${month}-${daySelected}`)
    console.log(daySelected)
    localStorage.removeItem(`${year}-${month}-${daySelected}`)
    localStorage.removeItem(hour)
    console.log("deez")
    createCalendar()
    closePreview()
})

// + Reminders

const listReminders = document.querySelector('.list-reminders')
function createReminders() {
    const date = new Date()
    let remindersConstruct = ''
    let day = date.getDate()
    for (let i = date.getDay(); i < 6; i++){ 
        console.log(`${year}-${month}-${day}`)
        let hour = localStorage.getItem(`${year}-${month}-${day}`)
        if (hour === null) {
            continue
        }else{
            let text = localStorage.getItem(hour)
            remindersConstruct += `<li>
                                        <p>${day}/${month}/${year}</p>
                                        <p>${hour}</p>
                                        <p>${text}</p>
                                    </li>`
        }
        day++
    }
    listReminders.innerHTML = remindersConstruct
}
