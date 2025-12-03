import Spinner from "./spinner";

export default function LodaingTableList({ colSpan } : { colSpan: number }) {
    return (
        <tr>
            <td colSpan={colSpan}>
                <Spinner />
            </td>
        </tr>
    )
}