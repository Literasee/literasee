const show = () => {
  const overlay = document.createElement('div')
  Object.assign(overlay.style, {
    background: 'white',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    'z-index': 2,
    opacity: 0.7,
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  })

  const message = document.createElement('span')
  message.innerHTML = 'Creating your project, please be patient...'
  Object.assign(message.style, {
    'font-size': '2rem',
    padding: '1rem',
  })
  setTimeout(() => {
    message.innerHTML += '<br>✔ Created repository'
  }, 2000)
  setTimeout(() => {
    message.innerHTML += '<br>✔ Created publish branch'
  }, 4000)
  setTimeout(() => {
    message.innerHTML += '<br>✔ Created bootstrap files'
  }, 7000)

  overlay.appendChild(message)
  document.body.appendChild(overlay)
}

const hide = () => {
  document.body.removeChild(document.body.lastChild)
}

export default {
  show,
  hide,
}
