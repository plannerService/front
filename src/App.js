import { DateProvider } from './contexts/contexts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './page/MainPage/MainPage'
import LoginPage from './page/LoginPage/LoginPage'
import SignUpPage from './page/SignUpPage/SignUpPage'
import PlanningPage from './page/PlanningPage/PlanningPage'
import Redirect from './components/redirect/Redirect'
import GroupPage from './page/GroupPage/GroupPage'
import DeleteId from './page/DeleteIdPage/DeleteIdPage'

function App() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '75%',
                margin: '0 auto',
            }}
        >
            <DateProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<MainPage />}></Route>
                        <Route path='/login' element={<LoginPage />}></Route>
                        <Route path='/signup' element={<SignUpPage />}></Route>
                        <Route
                            path='/planning'
                            element={<PlanningPage />}
                        ></Route>
                        <Route path='/group' element={<GroupPage />}></Route>
                        <Route
                            path='/google/callback'
                            element={<Redirect />}
                        ></Route>
                        <Route path='/deleteId' element={<DeleteId />}></Route>
                    </Routes>
                </Router>
            </DateProvider>
        </div>
    )
}

export default App
