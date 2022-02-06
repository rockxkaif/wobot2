
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import './login.css';
import { Formik } from 'formik';
import app_config from './config';
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';

const myStyles = makeStyles(() => ({
    mycard: {
        marginTop: '10rem',
        boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)'
    }
}))

const Login = () => {

    const url = app_config.api_url;
    const classes = myStyles();

    const loginform = {
        email: '',
        password: ''
    }

    const formSubmit = (values) => {

        fetch(url + 'user/getbyemail/' + values.email)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data);

                    if (data.password == values.password) {
                        console.log('login success');

                        Swal.fire({
                            icon: 'success',
                            title: 'Login Success',
                        })

                        sessionStorage.setItem('user', JSON.stringify(data));
                        window.location.replace('/product');

                        return
                    }
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Email or Password Incorrect'
                })

            })


    }

    const handleLogin = async googleData => {
        fetch(url + 'googleauth', {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div>
            <div className="col-md-3 mx-auto" >
                <div className={clsx('card', classes.mycard)} style={{ marginTop: '10rem' }}>
                    <div className="card-body">

         

                        <GoogleLogin
                            clientId={'552817724530-itaeb1gsnpj82isbhqll5m73t6old9fd.apps.googleusercontent.com'}
                            buttonText="Log in with Google"
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                        />

                        <Formik
                            initialValues={loginform}
                            onSubmit={formSubmit}
                        >{({
                            values,
                            handleChange,
                            handleSubmit
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <label className="mt-5 w-100">Email</label>
                                <input className="form-control" onChange={handleChange} value={values.email} name="email" />

                                <label className="mt-4">Password</label>
                                <input className="form-control" onChange={handleChange} value={values.password} type="password" name="password" />

                                <button type="submit" className="mt-5 btn btn-primary w-100">Login Now</button>
                            </form>
                        )}


                        </Formik>




                    </div>
                </div>
            </div>

        </div>
    )
}


export default Login;