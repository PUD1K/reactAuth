import axios from 'axios'
import React, {useState} from 'react'
import MD5 from "crypto-js/md5";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Auth = function() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registation = () => {
        const apiUrl = `http://localhost:7000/auth/registration`
        const user = {
            email: email,
            password: password
        }

        if(!user.email || !user.password){
            alert(`Не введено имя пользователя или пароль`)
        } else {
            axios.post(apiUrl, user)
            .then((response) => {
                // alert(`Вы успешно зарегистрировались!\nEmail: ${response.data.email}\nПароль: ${response.data.password}\nТокен:\n${response.data.token}`)
                alert('Регистрация прошла успешно')
            })
            .catch((err) => {
                const errorMessage = JSON.parse(err.request.response).message
                alert(errorMessage)
            })
        }
    }
    
    const login = async () => {
        const apiUrl = `http://localhost:7000/auth/login`
        const user = {
            email: email,
            password: password
        }
        if(!user.email || !user.password){
            alert(`Не введено имя пользователя или пароль`)
        } else{
            axios.post(apiUrl, user)
            .then((response) => {
                alert(`Вы успешно авторизовались! Ваш токен: \n${response.data.token}`)
            })
            .catch((err) => {
                const errorMessage = JSON.parse(err.request.response).message
                alert(errorMessage)
            })
        }
    }

    const newLogin = async () => {
        let user = {
            email: email,
            password: null,
            H: null
        }
        if(!email || !password){
            alert(`Не введено имя пользователя или пароль`)
        } else{
            // отправляем на сервер логин
            axios.post(`http://localhost:7000/auth/login1`, user)
            .then((response) => {
                // получаем H
                console.log(response.data.H);
                const passwordHash = MD5(password).toString();
                const hHash = MD5(response.data.H).toString();
                const H = MD5(hHash+passwordHash).toString();
                user.H = H;
                console.log(passwordHash);                
                console.log(hHash);
                console.log(H);

                // отправляем на сервер захешированный H
                axios.post(`http://localhost:7000/auth/login2`, user)
                .then((response) =>{
                    alert(`Вы успешно авторизовались!`)
                })
                .catch((err) => {
                    const errorMessage = JSON.parse(err.request.response).message
                    alert(errorMessage)
                })

            })
            .catch((err) => {
                const errorMessage = JSON.parse(err.request.response).message
                alert(errorMessage)
            })
        }
    }

    return (
    <div className="container d-flex justify-content-center align-items-center">
        <form>
            <div className="mb-4 ">                
                <label className="form-label">Почта</label>
                <input 
                    value={email} 
                    onChange={event => setEmail(event.target.value)} 
                    type="email" 
                    placeholder='Email'
                    className="form-control" />
            </div>

            <div className="mb-4">
                <label className="form-label">Пароль</label>
                <input 
                    value={password} 
                    onChange={event => setPassword(event.target.value)} 
                    type="password" 
                    placeholder='Пароль'
                    className="form-control" />
            </div>

            <button type="button" onClick={newLogin} className="btn btn-outline-primary mb-4 me-4">Логин</button>
            <button type="button" onClick={registation} className="btn btn-outline-primary mb-4">Регистрация</button>
        </form>
    </div>
  )
}
