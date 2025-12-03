export const replaceName = (key: string) => {
    switch (key) {
        case 'tour':
            return 'تور'
        case 'ticket':
            return 'تیکت'
        case 'message':
            return 'چت درون سازمانی'
        case 'admin':
            return 'ادمین'
        case 'card':
            return 'کارت بانکی'
        case 'attendance':
            return 'حضور غیاب'
        case 'access':
            return 'دسترسی ها'
        case 'full_access':
            return 'دسترسی کامل'
        case 'client_side':
            return 'ورود به پنل کاربر'
        case 'user':
            return 'کاربران'
        case 'product':
            return 'خدمات'
        case 'case':
            return 'پرونده ها'
        case 'ip':
            return 'آی پی ها'
        case 'transaction':
            return 'تراکنش ها'
        case 'salary':
            return 'حقوق و دستمزد'
        case 'expense':
            return 'مخارج'
        case 'treasury':
            return 'خزانه'
        case 'task':
            return 'تسک'
        case 'notification':
            return 'اعلانات'
        case 'category':
            return 'دسته بندی'
        case 'log':
            return 'لاگ'
        case 'imprest':
            return 'مساعده'
        case 'suggestion':
            return 'انتقادات'
        default:
            return 'هتل'
    }
}

export const replaceValueName = (value: string) => {
    switch (value) {
        case 'create_tour':
            return 'ایجاد'
        case 'create_hotel':
            return 'ایجاد'
        case 'create_ticket':
            return 'ایجاد'
        case 'create_user':
            return 'ایجاد'
        case 'create_access':
            return 'ایجاد'
        case 'create_admin':
            return 'ایجاد'
        case 'add_card':
            return 'ایجاد'
        case 'get_tour':
            return 'مشاهده'
        case 'get_hotel':
            return 'مشاهده'
        case 'get_message':
            return 'مشاهده'
        case 'login_as_user':
            return 'ورود به کاربری'
        case 'get_ticket':
            return 'مشاهده'
        case 'get_user':
            return 'مشاهده'
        case 'get_access':
            return 'مشاهده'
        case 'get_admin':
            return 'مشاهده'
        case 'get_attendance':
            return 'لیست حضور غیاب'
        case 'send_ticket':
            return 'پاسخ'
        case 'send_message':
            return 'پاسخ'
        case 'showList':
            return 'مشاهده '
        case 'delete_tour':
            return 'حذف'
        case 'delete_hotel':
            return 'حذف'
        case 'delete_card':
            return 'حذف'
        case 'delete_user':
            return 'حذف'
        case 'delete_access':
            return 'حذف'
        case 'delete_admin':
            return 'حذف'
        case 'update_tour':
            return 'ویرایش'
        case 'update_hotel':
            return 'ویرایش'
        case 'update_ticket':
            return 'ویرایش'
        case 'update_user':
            return 'ویرایش'
        case 'update_access':
            return 'ویرایش'
        case 'update_admin':
            return 'ویرایش'
        case 'delete_user':
            return 'غیرفعال کردن'
        case 'enable_user':
            return 'فعال کردن'
        case 'enable_admin':
            return 'فعال کردن'
        case 'get_sessions':
            return 'فعالیت ها'
        case 'define_shift':
            return 'تعریف شیفت'
        case 'get_booked_product_tour':
            return 'رزرو شده ها'
        case 'get_booked_product_hotel':
            return 'رزرو شده ها'
        case 'get_marketer_invoice':
            return 'درخواست تسویه ها'
        case 'set_marketer_invoice':
            return 'ثبت درخواست تسویه'
        case 'get_shift':
            return 'شیفت ها'
        case 'update_shift':
            return 'ویرایش شیفت'
        case 'get_leave':
            return 'مرخصی ها'
        case 'update_leave':
            return 'ویرایش مرخصی'
        case 'create_product':
            return 'ایجاد'
        case 'get_product':
            return 'مشاهده'
        case 'update_product':
            return 'ویرایش'
        case 'delete_product':
            return 'حذف'
        case 'create_case':
            return 'ایجاد '
        case 'get_case':
            return 'مشاهد'
        case 'update_case':
            return 'ویرایش'
        case 'delete_case':
            return 'حذف'
        case 'add_ip':
            return 'ایجاد'
        case 'delete_ip':
            return 'حذف'
        case 'get_ip':
            return 'مشاهده'
        case 'get_transaction':
            return 'مشاهد'
        case 'update_transaction':
            return 'تایید تراکنش ها'
        case 'create_salary':
            return 'ایجاد'
        case 'get_salary':
            return 'مشاهده'
        case 'create_expenses':
            return 'ایجاد'
        case 'update_expenses':
            return 'ویرایش'
        case 'delete_expense':
            return 'حذف'
        case 'get_expense':
            return 'مشاهد'
        case 'create_treasury':
            return 'ایجاد'
        case 'get_treasury':
            return 'مشاهد'
        case 'create_task':
            return 'ایجاد'
        case 'update_task':
            return 'ویرایش'
        case 'get_task':
            return 'مشاهد'
        case 'send_notification':
            return 'ایجاد'
        case 'get_notification':
            return 'مشاهده'
        case 'create_category':
            return 'ایجاد'
        case 'get_category':
            return 'مشاهده'
        case 'update_category':
            return 'ویرایش'
        case 'delete_category':
            return 'حذف'
        case 'get_log':
            return 'مشاهده'
        case 'get_imprest':
            return 'مشاهده'
        case 'update_imprest':
            return 'ویرایش'
        case 'delete_imprest':
            return 'حذف'
        case 'get_suggestion':
            return 'مشاهده'
        case 'delete_suggestion':
            return 'حذف'

        default:
            break;
    }
}