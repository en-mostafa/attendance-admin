import Spinner from "./spinner"

export const LoadingList = ({ colSpan }: { colSpan: number }) => {
    return (
        <tr>
            <td colSpan={colSpan} className="text-center py-6">
                <Spinner />
            </td>
        </tr>
    )
}