import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './routes/routes';
import AppRoute from './router/AppRoute';
import { ApolloProvider } from '@apollo/client';
import client from './config/client';
import { getToken } from './helpers/token';
import AuthContext from './context/AuthContext';
import './App.css';
import { CartProvider } from './context/Cart/CartState';
import reducer, { initialState } from './context/Cart/cartReducer';




function App() {

        const [ auth, setAuth ] = useState(undefined);

        useEffect(() => {
             const token = getToken();
             if(!token){
                     setAuth(null);
             }else{
                     setAuth(token);
             } 
             console.log("DESDE APP.JS", token);
        }, []);

        const setUserSeller = (userSeller) => {
                setAuth(userSeller);
        };

        //console.log("DESDE APP.JS", auth);

        const authData = useMemo(
                () => ({
                        auth,
                        setUserSeller
                }),
                [auth]
        );

  return (
    <ApolloProvider client={client} >
                <AuthContext.Provider value={authData}>
                        <CartProvider reducer={reducer} initialState={initialState}>
                                <Suspense fallback="Cargando...">
                                        <Router>
                                                <Switch>
                                                        {routes.map(route => (
                                                        <AppRoute
                                                                key={route.path}
                                                                path={route.path}
                                                                exact={route.exact}
                                                                component={route.component}
                                                                isPrivate={route.isPrivate}
                                                                isLogin={route.isLogin}
                                                        /> 
                                                        ))}
                                                </Switch>
                                        </Router>
                                </Suspense>
                        </CartProvider>
                </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
