import './LoginPage.css';
import logo from '../../images/logo.png';
import { useForm } from 'react-hook-form';
import React, { type FC, useState, useEffect } from 'react';
import {Preloader} from '../Preloader/Preloader';

type Props = {
    errorMessage: string;
    handleLoginClick: (email: string, password: string,) => void;
    isLoading:boolean
}

export const LoginPage: FC<Props> = ({ errorMessage, handleLoginClick, isLoading}) => {
    const [disabled, setDisabled] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitSuccessful },
        getValues,
        reset,
    } = useForm({ mode: 'onChange' });

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful, errorMessage]);

    function handleSubmitLogin() {
        const email:string = getValues('email');
        const password:string = getValues('password');
        handleLoginClick(email, password);
        reset({ email: '', password: '' });
        setDisabled(true);
    }

    return (
        <section className="main-content">
            <img src={logo} alt="логотип" className="main-content__logo" />
            {isLoading ? <Preloader />
                 : (<>
                <form
                    className="form-login__block"
                    onSubmit={handleSubmit(handleSubmitLogin)}
                >
                    <fieldset className="form-login__inputs">
                        <legend className="form-login__heading">Войдите в свой аккаунт</legend>
                        <label className="form-login__labels form-login__labels_email" htmlFor='form-login-email'>
                            Адрес электронной почты<span className="form-login__labels_star">*</span></label>
                        <input
                            type="email"
                            className={`form-login__input form-login__input_email  ${errors.email?.type === 'required' && 'form-login__input_error'}`}
                            id="form-login-email"
                            {...register('email', {
                                required: true,
                            })}
                            />
                        <div className="form-login__input-error">
                            {errors.email?.type === 'required' && (
                                <p className="form-login__input-error-text">Введите адрес электронной почты</p>
                            )}
                        </div>
                        <label className="form-login__labels" htmlFor='form-login-password'>
                            Пароль<span className="form-login__labels_star">*</span>
                        <span className="form-login__icon"/>
                        </label>
                        <input
                            type="password"
                            className={`form-login__input form-login__input_password  ${errors.password?.type === 'required' && 'form-login__input_error'}`}
                            id="form-login-password"
                            autoComplete="current-password"
                           {...register('password', {
                               required: 'Введите пароль',
                           })}
                        />
                        <div className="form-login__input-error">
                            {errors.password?.type === 'required' && (
                                <p className="form-login__input-error-text">Введите пароль</p>
                            )}
                        </div>

                    </fieldset>
                    <button
                    className={`form-login__button`}
                    type="submit"
                    onSubmit={handleSubmit(handleSubmitLogin)}
                >
                    Продолжить
                </button>
                    <a href='#' className="form-login__another-way">
                    Не удается войти в систему?
                </a>
                </form>
            <p className='main-content__error'>{errorMessage}</p></>)
            }
        </section>
    );
}