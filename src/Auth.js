import axios from 'axios'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export class Auth extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        // this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleChangeEmail(event) {
        const {value} = event.target
        this.setState({email: value});
      }

      handleChangePassword(event) {
        const {value} = event.target
        this.setState({password: value});
      }

    loginOrReg = (param) => {
        const apiUrl = `http://localhost:7000/auth/${param}`
        axios.post(apiUrl, {
            email: this.state.email,
            password: this.state.password
        })
        .then((response) => {
            if(param === 'login')
                alert(`Вы успешно авторизовались! Ваш токен: \n${response.data.token}`)
            else 
                alert(`Вы успешно зарегистрировались!\nEmail: ${response.data.email}\nПароль: ${response.data.password}\nТокен:\n${response.data.token}`)
            console.log(response.data.token)
        })
        .catch((err) => {
            const errorMessage = JSON.parse(err.request.response).message
            alert(errorMessage)
        })
    }

  render() {
    return (
    <div className="container d-flex justify-content-center align-items-center">
        <form>
            <div className="mb-4 ">                
                <label className="form-label">Почта</label>
                <input value={this.state.email} onChange={this.handleChangeEmail} type="email" className="form-control" />
            </div>

            <div className="mb-4">
                <label className="form-label" >Пароль</label>
                <input value={this.state.password} onChange={this.handleChangePassword} type="password" className="form-control" />
            </div>

            <button type="button" onClick={() => this.loginOrReg('login')} className="btn btn-outline-primary mb-4 me-4">Логин</button>
            <button type="button" onClick={() => this.loginOrReg('registration')} className="btn btn-outline-primary mb-4">Регистрация</button>
        </form>
    </div>
  )}
}
