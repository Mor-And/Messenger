import { useRef } from 'react';


const Auth = () => {

    const refLogin = useRef(null);
    const refPassword = useRef(null);

    const Login = (e) => {
        e.preventDefault();
        console.log(refLogin.current.value, refPassword.current.value)
    }

    return (
        <>
            <form onSubmit={Login}>
                <input name='login' ref={refLogin} />
                <input name='password' ref={refPassword} />
                <input type='submit'/>
            </form>
        </>
    )
}

export default Auth;