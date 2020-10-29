function main() {
  const darkmode = new window.Darkmode()
  const inp = document.querySelector('#toggle-switch')
  syncDarkMode(darkmode, inp)

  document.querySelector('.dark-mode-switcher input').addEventListener('click', function (evt) {
    evt.stopImmediatePropagation()
    evt.preventDefault()
  })
  document.querySelector('.dark-mode-switcher').addEventListener('click', function (evt) {
    evt.stopPropagation()
    darkmode.toggle()
    syncDarkMode(darkmode, inp)
  })
}

function syncDarkMode(darkmode, input) {
  input.checked = darkmode.isActivated()
}

document.addEventListener('DOMContentLoaded', main)
