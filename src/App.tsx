import React, {useEffect, useState} from 'react';
import './App.css';
import LoginBlock from "./components/LoginPage/LoginPage";
import Preloader from "./components/Preloader/Preloader";
import {authorize} from "./utils/API";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRouteElement from "./components/ProtectedRouteElement/ProtectedRouteElement";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTokenChecked, setIsTokenChecked] = useState(true);
  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenChecked) {
      <Preloader />;
    }
    setLoggedIn(false);
    tokenCheck();
  }, []);

  function handleLoginClick(email:string, password:string) {
    authorize(email, password)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            localStorage.setItem('jwt', res.token);
          }
        })
        .catch((err) => {
          setSuccessful(false);
          setErrorMessage(err);
          console.log(err);
        });
  }

  const tokenCheck = async () => {
    const jwt = localStorage.getItem('jwt');
    try {
    if (jwt && jwt !== 'undefined') {
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
                  element={LoginBlock}
                  loggedIn={!loggedIn}
                  handleLoginClick={handleLoginClick}
                  errorMessage={errorMessage}
              />
            }
        />
        <Route
            path="/products"
            // element={
              // <ProtectedRouteElement
                  // element={SavedMovies}
                  // loggedIn={loggedIn}
                  // matches={matchesDevice}
                  // noFilms={noFilms}
                  // handleSetSaveFilms={handleSetSaveFilms}
                  // searchString={searchFilms}
              // />
            //}
        />
        {/*<Route path="*" element={<NoPage />} />*/}
      </Routes>
  );
}

export default App;
