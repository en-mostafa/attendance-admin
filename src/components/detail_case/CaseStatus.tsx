'use client'
import { useTranslations } from "next-intl"

const statusClasses: Record<string, string> = {
  done: 'badge-light-success',
  created: 'badge-light-success',
  pending: 'badge-light-warning',
  awaiting_payment: 'badge-light-warning',
  unsuccessfull: 'badge-light-success',
  uncertain: 'badge-light-danger',
  settled: 'badge-light-success',
  un_settled: 'badge-light-warning',
  incomplete: 'badge-light-danger',
  todo: 'badge-light-primary',
  planned: 'badge-light-primary',
  waiting_start: 'badge-light-warning',
  running: 'badge-light-primary',
  processing: 'badge-light-warning',
  awaiting_review: 'badge-light-warning',
  need_check: 'badge-light-warning',
  blocked: 'badge-light-danger',
  obstructed: 'badge-light-primary',
  waiting_prerequisite: 'badge-light-warning',
  completed: 'badge-light-success',
  discredited: 'badge-light-danger',
  finished: 'badge-light-danger',
}

const statusLabels: Record<string, string> = {
  created: "created",
  done: "done",
  pending: "pending",
  awaiting_payment: "awaiting_payment",
  unsuccessfull: "unsuccessfull",
  uncertain: "uncertain",
  settled: "settled",
  un_settled: "un_settled",
  incomplete: "incomplete",
  todo: "todo",
  planned: "planned",
  waiting_start: "waiting_start",
  running: "running",
  processing: "processing",
  awaiting_review: "awaiting_review",
  need_check: "need_check",
  blocked: "blocked",
  obstructed: "obstructed",
  waiting_prerequisite: "waiting_prerequisite",
  completed: "completed",
  discredited: "discredited",
  finished:"finished"
}

export const CaseStatus = ({ status }: { status: string }) => {
  const t = useTranslations("Public.Status.Case")
  const badgeClass = statusClasses[status] || "badge-light-primary"
  const labelKey = statusLabels[status] || "finished"

  return (
    <span className={`badge ${badgeClass}`}>
      {t(labelKey)}
    </span>
  )
}
