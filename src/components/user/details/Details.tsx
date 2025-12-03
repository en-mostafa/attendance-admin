'use client'
import { useState } from "react"
import Sidebar from "./Sidebar";
import General from "./General";
import Activity from "./activity/Activity";
import Legal from "./Legal";
import ListClearing from "./clearing/List";

export default function Details({ data }: { data: any }) {
    const [activeTab, setActiveTabe] = useState('general');
    
    return (
        <div className="d-flex flex-column flex-xl-row">
            <Sidebar activeTab={activeTab} setActiveTabe={setActiveTabe} data={data}/>
            {activeTab === 'general' && <General data={data}/>}
            {activeTab === 'activity' && <Activity id={data?.id}/>}
            {activeTab === 'legal' && <Legal data={data}/>}
            {activeTab === 'clearing' && <ListClearing id={data?.id}/>}
        </div>
    )
}