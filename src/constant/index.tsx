
export const dayoff = [
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' }
]


export const lnags = [
    { value:'fa', label:'Persian' },
    { value:'en', label:'English' },
    { value:'tr', label:'Turkey' },
    { value:'ru', label:'Russia' },
    { value:'ar', label:'Arabic' },
]
export const defaultValueQuill = {
    ops: [
        { insert: 'توضیحات تور  ...\n' },
    ]
};
export const defaultValueQuillHotel = {
    ops: [
        { insert: 'توضیحات هتل  ...\n' },
    ]
};

export const genderOptin = [
    {value:'male', label:'مرد'},
    {value:'female', label:'زن'},
]
export const maritalStatus = [
    {value:'Single', label:'مجرد'},
    {value:'Married', label:'متاهل'},
]

export const access = {
    full_access: false,
    tour: {
        create_tour: false,
        get_tour: false,
        delete_tour: false,
        update_tour: false,
        get_booked_product_tour: false
    },
    hotel: {
        create_hotel: false,
        get_hotel: false,
        delete_hotel: false,
        update_hotel: false,
        get_booked_product_hotel: false
    },
    message: {
        get_message: false,
    },
    ticket: {
        create_ticket: false,
        send_ticket: false,
        get_ticket: false
    },
    card: {
        add_card: false,
    },
    user: {
        create_user: false,
        get_user: false,
        login_as_user: false,
        update_user: false,
        get_sessions: false,
        get_marketer_invoice: false,
        set_marketer_invoice: false
    },
    access: {
        create_access: false,
        update_access: false,
        get_access: false
    },
    admin: {
        create_admin: false,
        get_admin: false,
        update_admin: false
    },
    attendance: {
        define_shift: false,
        get_attendance: false,
        get_shift: false,
        update_shift: false,
        get_leave: false,
        update_leave: false
    },
    product: {
        create_product: false,
        get_product: false,
        update_product: false,
        delete_product: false
    },
    case: {
        create_case: false,
        get_case: false,
        update_case: false,
        delete_case: false
    },
    ip: {
        add_ip: false,
        delete_ip: false,
        get_ip: false
    },
    transaction: {
        get_transaction: false,
        update_transaction: false
    },
    salary: {
        create_salary: false,
        get_salary: false
    },
    expense: {
        create_expenses: false,
        update_expenses: false,
        delete_expense: false,
        get_expense: false
    },
    treasury: {
        create_treasury: false,
        get_treasury: false
    },
    task: {
        create_task: false,
        update_task: false,
        get_task: false
    },
    notification: {
        send_notification: false,
        get_notification: false
    },
    category: {
        create_category: false,
        get_category: false,
        update_category: false,
        delete_category: false
    },
    log: {
        get_log: false
    },
    imprest: {
        get_imprest: false,
        update_imprest: false,
        delete_imprest: false
    },
    suggestion: {
        get_suggestion: false,
        delete_suggestion: false
    }
}

