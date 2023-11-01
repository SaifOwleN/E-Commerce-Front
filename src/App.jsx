import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { useQuery } from '@tanstack/react-query'
import loginService from './services/login'
import NavBar from './components/NavBar'

const App = () => {
  useEffect(() => {
    const getToken = async () => {
      const user = await loginService.login({
        username: 'xdd user',
        password: '1234',
      })
      blogService.setToken(user.Token)
      window.localStorage.setItem('userToken', user.Token)
    }
    getToken()
  }, [])

  const items = useQuery({
    queryKey: ['items'],
    queryFn: blogService.getAll,
  })
  if (items.isSuccess) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          {items.data.map((item) => (
            <div className="card w-40 h-96" key={item.id}>
              <figure>
                <img src={item.img} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default App
