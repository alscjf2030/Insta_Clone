import {useEffect} from "react";
import { Reset } from "styled-reset";
import { Route, Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import Singup from "./Singup";
import Detail from "./Detail";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import Upload from "./Upload";
import EditPost from "./EditPost";
import ChatRoom from "./chat/ChatRoom";

function App() {
    const dispatch = useDispatch();
    const is_session = !!sessionStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        if (is_session) {
            dispatch(actionCreators.loginCheck(token));
        }
    }, []);

    return (
        <>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Singup />
                    </Route>
                    <Route path="/home">
                        <Header />
                        <Home />
                    </Route>
                    <Route path="/upload">
                        <Upload />
                    </Route>
                    <Route path="/detail/:id">
                        <Detail />
                    </Route>
                    <Route path="/edit/:id">
                        <EditPost />
                    </Route>
                    <Route path="/chat" exact>
                        <ChatRoom />
                    </Route>
                </Switch>
            </ConnectedRouter>
        </>
    );
}

export default App;