
export interface SelectOption {
    value: string,
    label: string,
}

export type Access = {
    full_access: boolean,
    tour: {
        create_tour: boolean,
        get_tour: boolean,
        delete_tour: boolean,
        update_tour: boolean,
        get_booked_product_tour: boolean
    },
    hotel: {
        create_hotel: boolean,
        get_hotel: boolean,
        delete_hotel: boolean,
        update_hotel: boolean,
        get_booked_product_hotel: boolean
    },
    message: {
        get_message: boolean,
    },
    ticket: {
        create_ticket: boolean,
        send_ticket: boolean,
        get_ticket: boolean
    },
    card: {
        add_card: boolean,
    },
    user: {
        create_user: boolean,
        get_user: boolean,
        login_as_user: boolean,
        update_user: boolean,
        get_sessions: boolean,
        get_marketer_invoice: boolean,
        set_marketer_invoice: boolean
    },
    access: {
        create_access: boolean,
        update_access: boolean,
        get_access: boolean
    },
    admin: {
        create_admin: boolean,
        get_admin: boolean,
        update_admin: boolean
    },
    attendance: {
        define_shift: boolean,
        get_attendance: boolean,
        get_shift: boolean,
        update_shift: boolean,
        get_leave: boolean,
        update_leave: boolean
    },
    product: {
        create_product: boolean,
        get_product: boolean,
        update_product: boolean,
        delete_product: boolean
    },
    case: {
        create_case: boolean,
        get_case: boolean,
        update_case: boolean,
        delete_case: boolean
    },
    ip: {
        add_ip: boolean,
        delete_ip: boolean,
        get_ip: boolean
    },
    transaction: {
        get_transaction: boolean,
        update_transaction: boolean
    },
    salary: {
        create_salary: boolean,
        get_salary: boolean
    },
    expense: {
        create_expenses: boolean,
        update_expenses: boolean,
        delete_expense: boolean,
        get_expense: boolean
    },
    treasury: {
        create_treasury: boolean,
        get_treasury: boolean
    },
    task: {
        create_task: boolean,
        update_task: boolean,
        get_task: boolean
    },
    notification: {
        send_notification: boolean,
        get_notification: boolean
    },
    category: {
        create_category: boolean,
        get_category: boolean,
        update_category: boolean,
        delete_category: boolean
    },
    log: {
        get_log: boolean
    },
    imprest: {
        get_imprest: boolean,
        update_imprest: boolean,
        delete_imprest: boolean
    },
    suggestion: {
        get_suggestion: boolean,
        delete_suggestion: boolean
    }
} 