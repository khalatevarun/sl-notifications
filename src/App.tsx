import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const getNotification = async() =>{
   await fetch('/api/notifications',{
      method:'GET',
    }).then((response)=> response.json()).then((res)=>console.log(res));


    
  }

  const addNotifications = async() => {
   await fetch('/api/notifications',{
      method:'POST',
      body: JSON.stringify({
        "type": "alert",
        "content": {
          "text": "New notification alerts!"
        },
        "read": false
      }),
    }).then((response)=> response.json()).then((res)=>console.log(res));
    

  }

  const deleteNotifications = async() => {
    await fetch('/api/notifications',{
      method:'DELETE',
    }).then((response)=> response.json()).then((res)=>console.log(res));


  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={getNotification}>
          Get Notifications
        </button>
        <button onClick={addNotifications}>
          Post Notifications
        </button>
        <button onClick={deleteNotifications}>
          Delete Notifications
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
