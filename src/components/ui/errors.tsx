
export default function Errors({ data } : { data: any }) {
    return (
        <ul>
            <li className="text-danger">{data}</li>
        </ul> 
    )
}