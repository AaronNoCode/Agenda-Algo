// Controllers for theme 
const themeIcon = document.getElementById('theme-icon')
const themeSwitch = document.getElementById('theme-switch')

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked){
        themeIcon.src = 'icon/sun.svg'
        document.documentElement.style.setProperty('--background', '#f0f4f9');
        document.documentElement.style.setProperty('--font-color', '#0d1016');
        document.documentElement.style.setProperty('--primary', '#1a3970');
        document.documentElement.style.setProperty('--secondary', '#6a9cf0');
        document.documentElement.style.setProperty('--accent', '#005cfa');
    } else{
        themeIcon.src = "icon/moon.svg"
        document.documentElement.style.setProperty('--background', '#060a0f');
        document.documentElement.style.setProperty('--font-color', '#e9ecf2');
        document.documentElement.style.setProperty('--primary', '#8fafe5');
        document.documentElement.style.setProperty('--secondary', '#0f4095');
        document.documentElement.style.setProperty('--accent', '#0561ff');
    }

})

