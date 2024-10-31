import React, {type FC, useEffect, useState} from 'react';
import './App.css';
import { LoginPage } from "./components/LoginPage/LoginPage";
import { Preloader } from "./components/Preloader/Preloader";
import { login } from "./utils/API";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./components/ProtectedRouteElement/ProtectedRouteElement";
import { ProductsPage } from "./components/ProductsPage/ProductsPage";

function App(): React.JSX.Element {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isTokenChecked, setIsTokenChecked] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [currentUser,setCurrentUser] = useState({})
    const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenChecked) {
       <Preloader />;
    }
    setLoggedIn(false);
    tokenCheck();
  }, []);

    async function handleLoginClick(email: string, password: string) {
        setIsLoading(true)
        try {
            const res = await login(email, password);
            if (res) {
                setErrorMessage('');
                setLoggedIn(true);
                setCurrentUser({name: res.name, surname: res.surname})
                localStorage.setItem('jwt', res.token);
                localStorage.setItem('user', JSON.stringify({name: res.name, surname: res.surname}));
                navigate('/products', { replace: true })
            }
        } catch (err) {
            setSuccessful(false);
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage('Что-то пошло не так');
            }
            console.error(err);
        }

        finally {
            setIsLoading(false)
        }
    }

  const tokenCheck = async () => {
    const jwt = localStorage.getItem('jwt');
    try {
    if (jwt && jwt !== 'undefined') {
        setIsTokenChecked(true)
          setLoggedIn(true);
          navigate('/products', { replace: true });
        }
      }
      catch (err) {
        console.log(err);
      }
  }

  return (
      <Routes>
        <Route
            path="/"
            element={
              <ProtectedRouteElement
                  element={LoginPage}
                  loggedIn={!loggedIn}
                  handleLoginClick={handleLoginClick}
                  errorMessage={errorMessage}
                  isLoading={isLoading}
              />
            }
        />
        <Route
            path="/products"
            element={
              <ProtectedRouteElement
                  element={ProductsPage}
                  loggedIn={loggedIn}
                  currentUser={currentUser}
                  isLoading={isLoading}
              />
            }
        />
        {/*<Route path="*" element={<NoPage />} />*/}
      </Routes>
  );
}

export default App;
