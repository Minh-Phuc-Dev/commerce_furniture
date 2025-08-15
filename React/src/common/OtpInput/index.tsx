import {isEmpty} from "lodash";
import {
    ChangeEvent,
    ClipboardEvent,
    FC,
    HTMLAttributes,
    KeyboardEvent,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react"
import {twMerge} from "tailwind-merge";

type OtpInputProps = {
    digits: number
    inputSize?: number
    onValueChange?: (otp: string) => void
    placeholder?: string
} & HTMLAttributes<HTMLDivElement>

const OtpInput: FC<OtpInputProps> = ({ placeholder , digits, inputSize, onValueChange, className, ...props }) => {
    const [otp, setOtp] = useState<string[]>(Array(digits).fill(""))
    const inputRefs = useRef<HTMLInputElement[]>([])

    const handelOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const target = event.currentTarget
        const digitIndex = parseInt(target.dataset.digitIndex ?? "0")
        const value = target.value.split("").at(-1) ?? ""

        const isNumber = /[0-9]/.test(value)

        if (!isNumber) {
            setOtp(
                currentOtp => {
                    const otp = [...currentOtp]
                    otp.splice(digitIndex, 1, "")
                    return otp
                }
            )
            return
        }

        setOtp(
            currentOtp => {
                const otp = [...currentOtp]
                otp.splice(digitIndex, 1, value)
                return otp
            }
        )

        if (digitIndex < digits - 1) {
            inputRefs.current[digitIndex + 1].focus()
        }

    }, [digits])


    const handelOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        const target = event.currentTarget
        const value = target.value
        const digitIndex = parseInt(target.dataset.digitIndex ?? "0")

        if (event.key === "Backspace" && digitIndex > 0 && !value) {
            inputRefs.current[digitIndex - 1].focus()
            return
        }

        if (event.key === "ArrowLeft" && digitIndex > 0) {
            inputRefs.current[digitIndex - 1].focus()
        }

        if (event.key === "ArrowRight" && digitIndex < digits - 1) {
            inputRefs.current[digitIndex + 1].focus()
        }
    }, [digits])

    const handelOnPaste = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        const text = event.clipboardData.getData('text').trim()
        const regex = new RegExp(`^[0-9]{1,${digits}}$`)

        if (!regex.test(text)) {
            return
        }

        setOtp(
            () => {
                const otp = Array(digits).fill("")
                text.split("").forEach(
                    (digit, index) => {
                        otp.splice(index, 1, digit)
                    }
                )
                return otp
            }
        )

        inputRefs.current[text.length - 1].focus()
    }, [digits])

    useEffect(() => {
        if (typeof onValueChange !== "function") {
            return
        }

        onValueChange(otp.join(""))
    }, [onValueChange, otp])


    return (
        <div
            className={twMerge(
                "flex gap-5",
                className
            )}
            {...props}
        >
            {
                otp.map(
                    (value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onPaste={handelOnPaste}
                            data-digit-index={index}
                            placeholder={placeholder}
                            aria-invalid={isEmpty(value)}
                            onChange={handelOnChange}
                            onKeyDown={handelOnKeyDown}
                            style={{ width: inputSize, height: inputSize }}
                            ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
                            className="text-center outline-none border-2 focus:border-sky-700 rounded aria-invalid:bg-slate-600 text-white bg-slate-700 transition-colors"
                        />
                    )
                )
            }
        </div>
    )
}

export default memo(OtpInput)