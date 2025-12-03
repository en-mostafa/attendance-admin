
export const caseStatus = (t:any) => {
    const status = [
        { value: 'created', label: t("Status.Case.created") },
        { value: 'done', label: t("Status.Case.done") },
        { value: 'awaiting_payment', label: t("Status.Case.awaiting_payment") },
        { value: 'unsuccessfull', label: t("Status.Case.unsuccessfull") },
        { value: 'pending', label: t("Status.Case.pending")},
        { value: 'uncertain', label: t("Status.Case.uncertain") },
        { value: 'settled', label: t("Status.Case.settled") },
        { value: 'un_settled', label: t("Status.Case.un_settled") },
        { value: 'todo', label: t("Status.Case.todo") },
        { value: 'planned', label: t("Status.Case.planned") },
        { value: 'waiting_start', label: t("Status.Case.waiting_start") },
        { value: 'running', label: t("Status.Case.running") },
        { value: 'processing', label: t("Status.Case.processing") },
        { value: 'awaiting_review', label: t("Status.Case.awaiting_review") },
        { value: 'need_check', label: t("Status.Case.need_check") },
        { value: 'blocked', label: t("Status.Case.blocked") },
        { value: 'obstructed', label: t("Status.Case.obstructed") },
        { value: 'waiting_prerequisite', label: t("Status.Case.waiting_prerequisite") },
        { value: 'completed', label: t("Status.Case.completed") },
        { value: 'discredited', label: t("Status.Case.discredited") },
        { value: 'abandoned', label: t("Status.Case.abandoned") },
        { value: 'finished', label: t("Status.Case.finished") }
    ] 
    return status
}