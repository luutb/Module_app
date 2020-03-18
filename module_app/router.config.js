
import CalendarController from "./components/calendar/Calendar.controler";
import MainController from './components/mainCenter/Main.controler';
import JourneysController from './components/journeys/Journeys.controler';
import EnvironmentController from './components/environment/Environment.controler'
import CurrencyController from './components/currencyConversion/Currency.controler'


export default
[
    {
        name:"MainView",
        component: MainController,
       
    },
    {
        name:"CurrencyView",
        component: CurrencyController,
       
    },
    {
        name:"EnvironmentView",
        component: EnvironmentController,
       
    },
    {
        name:"JourneysView",
        component: JourneysController,
       
    },
    {
        name:"CalendarView",
        component: CalendarController,
       
    },
   
   
   
    
    
]