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
} from "@fortawesome/free-solid-svg-icons";
// import { faGoogle } from '@fortawesome/free-brands-svg-icons'

//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const icons = [    faBullseye, 
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
]

for(let i = 0; i < icons.length; i++){
    library.add(icons[i])
}

// library.add(faBullseye);
// library.add(faHouse);
// library.add(faFireFlameCurved);
// library.add(faChartPie);
// library.add(faGear);
// library.add(faCircleCheck);
// library.add(faCheck);
// library.add(faArrowRightToBracket);
// library.add(faRightFromBracket);
// library.add(faAngleDown);
// library.add(faEye);
// library.add(faMagnifyingGlass)
// library.add(faUser)
// library.add(faArrowLeft)
// library.add(faDove),
// library.add(faXmark)

// library.add(faGoogle);


