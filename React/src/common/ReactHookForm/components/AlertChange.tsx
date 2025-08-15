import {useEffect} from "react";
import {useFormContext} from "react-hook-form";

const AlertChange = () => {
    const { formState: { isSubmitted, isDirty } } = useFormContext()

    useEffect(() => {
        console.log(isDirty, isSubmitted);
    }, [isDirty, isSubmitted])

    return null
}

export default AlertChange