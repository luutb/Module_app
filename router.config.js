
import CalendarController from "./components/calendar/Calendar.controler";
import MainController from './components/mainCenter/Main.controler';
import JourneysController from './components/journeys/Journeys.controler';
import EnvironmentController from './components/environment/Environment.controler'
import CurrencyController from './components/currencyConversion/Currency.controler'
import MenuLeft from './components/menuLeft/menuLeftCenter'

export default
[
    {
        name:"Main",
        component: MainController,
       
    },
    {
        name:"Currency",
        component: CurrencyController,
       
    },
    {
        name:"Environment",
        component: EnvironmentController,
       
    },
    {
        name:"Journeys",
        component: JourneysController,
       
    },
    {
        name:"Calendar",
        component: CalendarController,
       
    },
    {
        name:"MenuLeft",
        component: MenuLeft,
       
    }
    
   
   
   
    
    
]