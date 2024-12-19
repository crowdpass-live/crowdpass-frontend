import * as yup from "yup";

const MAX_FILE_SIZE = 4000000;
const validFileExtensions = { image: ['gif', 'png'] };
function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const CreateEventSchema = yup.object().shape({
    name: yup.string().required("Input your event name"),
    description: yup.string().required("Input event description"),
    city: yup.string().required("Input event host city name"),
    country: yup.string().required("Input event host country name"),
    start_date: yup.date().required("Input event start date"),
    end_date: yup.date().required("Input event end date"),
    expiry_date: yup.date().required("Input event expiry date"),
    image: yup
        .mixed()
        .required("Required")
        .test("is-valid-type", "Not a valid image type",
            value => isValidFileType(value && value.name.toLowerCase(), "image"))
        .test("is-valid-size", "Max allowed size is 100KB",
            value => value && value.size <= MAX_FILE_SIZE),
    email: yup
        .string()
        .email()
        .required()
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            "Invalid email address"
        ),
    start_time: yup.date().required("Input event start time"),
    end_time: yup.date().required("Input event end time"),
})
