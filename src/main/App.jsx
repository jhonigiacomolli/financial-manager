import './App.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import { BrowserRouter, Switch, Redirect , Route } from 'react-router-dom'
import Header from '../Pages/Header'
import Nav from '../Pages/Nav'
import Content from '../Pages/Content'
import New from '../Pages/NewEntry'


export default function App(props) {
    return(
        <BrowserRouter basename="/financeiro">
            <div className="app">
                <Header />
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <Content />
                    </Route>
                    <Route exact path="/lancamento"> 
                        <New />
                    </Route>
                    <Redirect from="*" to="" />
                </Switch>
            </div>
        </BrowserRouter>
    )
}


