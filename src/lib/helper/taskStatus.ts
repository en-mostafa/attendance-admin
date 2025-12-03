
export const taskStatus = (t:any) => {
    const status = [
        { value: 'To do', label: t("Status.todo") },
        { value: 'Planned', label: t("Status.planned") },
        { value: 'Waiting to start', label: t("Status.waiting_start") },
        { value: 'Running', label: t("Status.running") },
        { value: 'Processing', label: t("Status.processing")},
        { value: 'Awaiting review', label: t("Status.awaiting_review") },
        { value: 'Need to check', label: t("Status.need_check") },
        { value: 'Waiting for confirmation', label: t("Status.waiting_confirmation") },
        { value: 'Blocked', label: t("Status.blocked") },
        { value: 'Obstructed', label: t("Status.obstructed") },
        { value: 'Waiting for prerequisite', label: t("Status.waiting_prerequisite") },
        { value: 'Done', label: t("Status.done") },
        { value: 'Completed', label: t("Status.completed") },
        { value: 'Cancelled', label: t("Status.cancelled") },
        { value: 'Discredited', label: t("Status.discredited") },
        { value: 'Abandoned', label: t("Status.abandoned") }
    ] 
    return status
}