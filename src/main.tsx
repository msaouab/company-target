import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RecoilRoot>
		<Router>
			<App />
		</Router>
	</RecoilRoot>
)
