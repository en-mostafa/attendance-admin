import { z } from "zod";

export const loginFormSchema = (t: any) => z.object({
    phone: z.string().min(1, { message: t('email') }),
    password: z.string().min(1, { message: t('password') }).trim()
});

export const addTourSchema = () => z.object({
    capacity: z.string().min(1, { message: 'capacity' }),
    originCityId: z.string().min(1, { message: 'originCityId' }),
    title: z.string().min(1, { message: 'title' }),
    price: z.string().min(1, { message: 'price' }),
    startDate: z.string().min(1, { message: 'Start date' }),
    endDate: z.string().min(1, { message: 'end date' }),
    code: z.string().min(1, { message: 'code' }),
    stay: z.string().min(1, { message: 'stay' }),
    transportation: z.string().min(1, { message: 'transportation' }),
    meals: z.string().min(1, { message: 'meals' }),
    period: z.string().min(1, { message: 'period' }),
    description: z.string().min(1, { message: 'description' }),
    discount: z.string(),
    tax: z.string(),
    countries: z.string(),
    files: z.any()
})

export const translateTourSchema = () => z.object({
    title: z.string().min(1, { message: 'title' }),
    stay: z.string().min(1, { message: 'stay' }),
    transportation: z.string().min(1, { message: 'transportation' }),
    meals: z.string().min(1, { message: 'meals' }),
    period: z.string().min(1, { message: 'period' }),
    description: z.string().min(1, { message: 'description' }),
    lang: z.string().min(1, { message: 'description' })
})

export const addHotelFormSchema = () => z.object({
    name: z.string().min(1, { message: 'name' }),
    stars: z.string().min(1, { message: 'stars' }),
    locationCityId: z.string().min(1, { message: 'locationCityId' }),
    locationCountryId: z.string().min(1, { message: 'locationCountryId' }),
    address: z.string().min(1, { message: 'address' }),
})

export const translateHotelSchema = () => z.object({
    name: z.string().min(1, { message: 'name' }),
    address: z.string().min(1, { message: 'address' }),
    description: z.string().min(1, { message: 'description' }),
    lang: z.string().min(1, { message: 'description' })
})

export const translateHotelRoomSchema = () => z.object({
    type: z.string().min(1, { message: 'type' }),
    lang: z.string().min(1, { message: 'description' }),
    options: z.any()
})

export const editHotelRoomSchema = () => z.object({
    type: z.string().min(1, { message: 'type' }),
    numberOfGuests: z.string().min(1, { message: 'numberOfGuests' }),
    price: z.string().min(1, { message: 'price' }),
    discount: z.string(),
    tax: z.string(),
    options: z.any()
})

export const addUserSchema = () => z.object({
    name: z.string().min(1, { message: 'name' }),
    family: z.string().min(1, { message: 'family' }),
    phone: z.string().min(1, { message: 'phone' }),
    password: z.string().min(1, { message: 'password' }),
    nationalCode: z.string().min(1, { message: 'nationalCode' }),
    baseSalary: z.string().transform((val) => Number(val)),
    emergencyPhone: z.string().min(1, { message: 'emergencyPhone' }),
    insurance: z.string().min(1, { message: 'insurance' }),
    address: z.string().min(1, { message: 'address' }),
    shiftId: z.string().transform((val) => Number(val))
})


export const updateUserSchema = () => z.object({
    firstName: z.string(),
    lastName: z.string(),
    displayName: z.string().optional(),
    birthDate: z.string().optional(),
    nationalCode: z.string().optional(),
    gender: z.any().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    postCode: z.string().optional(),
    issuingCountry: z.string().optional(),
    nationality: z.string().optional(),
    passportNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cellphone: z.any(),
    email: z.any(),
    firstNamePassport: z.string().optional(),
    lastNamePassport: z.string().optional(),
})

export const ticketSchema = () => z.object({
    userId: z.string().min(1, "User not selected"),
    department: z.string().min(1, "Department is required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    text: z.string().min(6, "Ticket must be at least 6 characters"),
    status: z.string().min(1, "Status is required"),
    files: z.array(z.any()).min(0, "At least one file must be uploaded")
});

export const translateAccessSchema = () => z.object({
    name: z.string().min(1, { message: 'name' }),
    lang: z.string().min(1, { message: 'lang' })
})

export const addAdminSchema = () => z.object({
    firstName: z.string().min(1, { message: 'firstName' }),
    lastName: z.string().min(1, { message: 'lastName' }),
    email: z.string().min(1, { message: 'email' }),
    cellphone: z.string().min(1, { message: 'cellphone' }),
    password: z.string().min(1, { message: 'password' }),
    level: z.string().min(1, { message: 'level' }),
    accessId: z.string().min(1, { message: 'accessId' }),
    salary: z.string().min(1, { message: 'salary' }),
    reward: z.string(),
    insurance: z.string().min(1, { message: 'insurance' }),
})

export const updateAdminSchema = () => z.object({
    firstName: z.string().min(1, { message: 'firstName' }),
    lastName: z.string().min(1, { message: 'lastName' }),
    cellphone: z.any(),
    email: z.any(),
    level: z.string().min(1, { message: 'level' }),
    accessId: z.string().min(1, { message: 'accessId' }),
    salary: z.string().min(1, { message: 'salary' }),
    insurance: z.string().min(1, { message: 'insurance' }),
    password: z.any(),
    reward: z.string(),
    file: z.any()
})

export const updateProfileAdminSchema = () => z.object({
    firstName: z.string().min(1, { message: 'firstName' }),
    lastName: z.string().min(1, { message: 'lastName' }),
    cellphone: z.any(),
    email: z.any(),
    password: z.any(),
})

export const transferSalarySchema = () => z.object({
    userId: z.string().min(1, { message: 'admin is required' }),
    amount: z.string()
        .transform(val => val.replace(/,/g, ''))
        .refine(val => !isNaN(Number(val)), { message: "مقدار عددی معتبر نیست" })
        .transform(val => Number(val)),
    description: z.string(),
    transformType: z.string()
})

export const updateSalarySchema = () => z.object({
    amount: z.string()
        .transform(val => val.replace(/,/g, ''))
        .refine(val => !isNaN(Number(val)), { message: "مقدار عددی معتبر نیست" })
        .transform(val => Number(val)),
    description: z.string(),
    transformType: z.string()
})

export const expenseseAddSchema = () => z.object({
    amount: z.string()
        .transform(val => val.replace(/,/g, ''))
        .refine(val => !isNaN(Number(val)), { message: "مقدار عددی معتبر نیست" })
        .transform(val => Number(val)),
    description: z.string(),
    textId: z.string(),
    paiedAt: z.string(),
    file: z.any(),
})

export const addWalletSchema = () => z.object({
    amount: z.string()
        .transform(val => val.replace(/,/g, ''))
        .refine(val => !isNaN(Number(val)), { message: "مقدار عددی معتبر نیست" })
        .transform(val => Number(val)),
    description: z.string(),
    transformType: z.string()
})

export const addLegalSchema = () => z.object({
    companyName: z.string().min(1, { message: "نام شرکت الزامی است" }),
    addressCompany: z.string().min(1, { message: "آدرس الزامی است" }),
    registrationNumber: z.string().min(1, { message: "شماره ثبت الزامی است" }),
    nationalNumber: z.string().min(1, { message: "شناسه ملی الزامی است" }),
    economicCode: z.string().min(1, { message: "کد اقتصادی الزمی است" }),
    postCode: z.string().min(1, { message: 'کد پستی الزامی است' })
})