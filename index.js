// Controllers for theme (its dark initially)
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


// Controllers for tab selection (between calendar and reminders)
const calendarTab = document.getElementById('calendar-tab')
const reminderTab = document.getElementById('reminders-tab')
const calendarTabTrigger = document.getElementById('show-calendar')
const reminderTabTrigger = document.getElementById('show-reminders')
calendarTabTrigger.addEventListener('change', () => {
    if (calendarTabTrigger.checked) {
        calendarTab.style.color = 'var(--text)'
        calendarTab.style.backgroundColor = 'var(--secondary)'
        reminderTab.style.backgroundColor = 'var(--primary)'

    }
})

reminderTabTrigger.addEventListener('change', () => {
    if (reminderTabTrigger.checked) {
        reminderTab.style.color = 'var(--text)'
        reminderTab.style.backgroundColor = 'var(--secondary)'
        calendarTab.style.backgroundColor = 'var(--primary)'
    }
})

/*
Need control the overlay div when showing the form for new event
*/



