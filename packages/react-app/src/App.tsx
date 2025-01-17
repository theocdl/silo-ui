import {Home} from './pages/home'
import {Nft} from './pages/nft'
import {IssuerDashboard} from './pages/issuerdashboard'
import {NotFound} from './pages/notFound'
import {Routes, Route} from "react-router-dom";

function App() {

    return (

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/nft/:username' element={<Nft/>}/>
            <Route path='/dashboard' element={<IssuerDashboard/>}/>
            <Route path="*" element={<NotFound/>}/>

        </Routes>

    );
}

export default App;
