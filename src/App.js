import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Chats from './Components/Chats';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Users from './Components/Users';
import { UserContext } from './Components/UserContext';
import { ColorContext } from './Components/ColorContext';
import { useState } from 'react';
// import Footer from './Components/Footer';

function App() {
    const [user, setUser] = useState('');
    const [color, setColor] = useState('dark');

    return (
        <ColorContext.Provider value={{color, setColor}}>
            <UserContext.Provider value={{ user, setUser }}>
                <div className="App">
                    <Header />

                    <Switch>
                        <Route path='/' component={Home} exact={true} />
                        <Route path='/users' component={Users} />
                        <Route path='/chats' component={Chats} />
                        <Route path='/login' component={Login} />
                    </Switch>
                    
                    {/* <Footer /> */}
                </div>
            </UserContext.Provider>
        </ColorContext.Provider>
    );
}

export default App;
