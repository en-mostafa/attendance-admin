import { Access } from "@/types";
import { replaceName, replaceValueName } from "./helper/replaceName";

interface Props {
    permission: Access,
    setPermission: (permission: any) => void 
}



export const Permission = ({ permission, setPermission } : Props) => {
    if(!permission) return;
    const items = Object.entries(permission).map(([groupKey, groupPermissions]) => {
        if(typeof groupPermissions === 'object') {
            return (
                <li key={groupKey} className="d-flex gap-4 mt-4">
                    <span className="fw-bold">{replaceName(groupKey)} :</span>
                    <div className="d-flex gap-2">
                        {Object.entries(groupPermissions).map(([permKey, permLabel]) => (
                            <label key={permKey} htmlFor={`${groupKey}_${permKey}`} className="d-flex gap-2 cursor-pointer text-gray-700">
                                <input
                                    type="checkbox"
                                    id={`${groupKey}_${permKey}`}
                                    name={`${groupKey}[${permKey}]`}
                                    defaultChecked={permLabel}
                                    onChange={() => {
                                        setPermission((prev: any) => ({
                                            ...prev,
                                            [groupKey]: {
                                                ...prev[groupKey],
                                                [permKey]: !prev[groupKey][permKey]
                                            }
                                        }))
                                    }}
                                />
                                <span>{replaceValueName(permKey)}</span>
                            </label>
                        ))}
                    </div>
                </li>
            )
        } else {
            return (
                <li key={groupKey} className="d-flex gap-4 mt-4">
                    <label key={groupKey} htmlFor={`${groupKey}`} className="d-flex gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            id={`${groupKey}`}
                            name={`${groupKey}`}
                            defaultChecked={groupPermissions}
                            onChange={() => {
                                setPermission((prev:any) => ({
                                    ...prev,
                                    [groupKey]: !prev[groupKey]
                                }));
                            }}
                        />
                        <span className="fw-bold">{replaceName(groupKey)}</span>
                    </label>
                </li>
            )
        }
    });

    return (
        <ul className="p-0">
           {items}
        </ul>
    )
}