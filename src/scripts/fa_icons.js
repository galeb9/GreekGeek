import { library } from "@fortawesome/fontawesome-svg-core";
import { 
    faBullseye, 
    faHouse, 
    faFireFlameCurved, 
    faChartPie, 
    faGear, 
    faCircleCheck, 
    faCheck, 
    faArrowRightToBracket, 
    faRightFromBracket,
    faAngleDown,
    faEye,
    faMagnifyingGlass,
    faUser,
    faArrowLeft,
    faDove,
    faXmark,
    faArrowUpFromBracket,
    faEyeLowVision,
    faArrowDownLong,
    faTrashCan
} from "@fortawesome/free-solid-svg-icons";
// import { faGoogle } from '@fortawesome/free-brands-svg-icons'

//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const icons = [    
    faBullseye, 
    faHouse, 
    faFireFlameCurved, 
    faChartPie, 
    faGear, 
    faCircleCheck, 
    faCheck, 
    faArrowRightToBracket, 
    faRightFromBracket,
    faAngleDown,
    faEye,
    faMagnifyingGlass,
    faUser,
    faArrowLeft,
    faDove,
    faXmark,
    faArrowUpFromBracket,
    faEyeLowVision,
    faArrowDownLong,
    faTrashCan
]

for(let i = 0; i < icons.length; i++){
    library.add(icons[i])
}




