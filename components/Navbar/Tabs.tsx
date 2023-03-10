import {faHouse, faRepeat, faTag, faComment} from '@fortawesome/free-solid-svg-icons';
import { Tab } from './Tab';





export const Tabs = ()=> {

    return(
                <div className='w-full flex flex-wrap border-solid border-black border-y'>
                    <div className="section-layout flex items-center justify-between">
                        <Tab tabLink="/dash" tabName="Home" tabIcon={faHouse}/>
                        <Tab tabLink="/recuring" tabName="Subscriptions" tabIcon={faRepeat}/>
                        <Tab tabLink="/trials" tabName="Free Trials" tabIcon={faTag}/>
                        <Tab tabLink="/deals" tabName="Deals" tabIcon={faComment}/>
                    </div>
                </div>
               
    )
}