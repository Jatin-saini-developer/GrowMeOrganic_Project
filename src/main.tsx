
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'primereact/resources/themes/lara-light-blue/theme.css';  // You can change theme later
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; // optional but useful
import { PrimeReactProvider } from 'primereact/api';



createRoot(document.getElementById('root')!).render(

    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
 

)
