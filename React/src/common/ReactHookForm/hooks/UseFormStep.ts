import {isFunction, isUndefined} from "lodash";
import {useCallback, useMemo, useRef, useState} from "react";

export type Step = {
    title: string
    step: number
    stepRequired?: number[] | number
    valid: boolean
    current: boolean
}

export type FormStep<T = any> = {
    steps: Step[],
    setStep: (step: number, valid: boolean) => void,
    setCurrentStep: (step: number) => void,
    next: () => void,
    back: () => void,
    setValues: (state: Partial<T> | T | ((previous: T) => T)) => void,
    getValues: () => T,
    valid: boolean,
    activeStep: number,
    checkCanGoto: (step: number) => boolean,
    getStepValidStatus: (step: number) => boolean
}


function useFormStep<T>(initSteps: Step[], initValue: T): FormStep<T> {

    const values = useRef<T>(initValue)

    const [steps, setSteps] = useState<Step[]>(initSteps)

    const setValues = useCallback((state: Partial<T> | T | ((previous: T) => T)) => {
        if (isFunction(state)) {
            values.current = (state as (previous: T) => T)(values.current)
            return
        }

        values.current = state as T
    }, [])

    const setStep = useCallback((step: number, valid: boolean) => {
        setSteps(
            state => {
                const steps = [...state]
                const indexStep = steps.findIndex(item => item.step === step)

                if (indexStep === -1) {
                    return steps
                }

                const update = {
                    ...steps.at(indexStep)!,
                    valid
                }

                steps.splice(indexStep, 1, update)
                return steps
            }
        )
    }, [])

    const setCurrentStep = useCallback((step: number) => {
        setSteps(
            state => {
                return state.map(
                    item => (
                        {
                            ...item,
                            current: item.step === step
                        }
                    )
                )
            }
        )
    }, [])

    const activeStep = useMemo(
        () => {
            const index = steps.findIndex(item => item.current)
            return (Math.max(0, index)) + 1
        }, [steps]
    )

    const valid = useMemo(
        () => steps.every(({valid}) => valid), [steps]
    )

    const getStepValidStatus = (step: number) => {
        const find = steps.find(item => item.step === step)
        if (isUndefined(find)) {
            return false
        }
        return find.valid
    }

    const checkCanGoto = (step: number) => {
        const find = steps.find(item => item.step === step);
        if (!find || !find.stepRequired) return !!find;

        const requiredSteps = Array.isArray(find.stepRequired) ? find.stepRequired : [find.stepRequired];
        const stepRequired = steps.filter(item => requiredSteps.includes(item.step));

        return requiredSteps.length === stepRequired.length && stepRequired.every(({valid}) => valid);
    }

    const getValues = useCallback(() => values.current, [])

    const next = useCallback(() => {
        setSteps(
            (steps) => {
                const updateSteps = [...steps].map(
                    step => (
                        {
                            stepRequired: undefined,
                            ...step,
                            current: false
                        }
                    )
                )

                const indexActive = steps.findIndex(step => step.current)

                if ((indexActive + 1) >= updateSteps.length) {
                    return steps
                }

                updateSteps.splice(
                    Math.max(0, indexActive),
                    2,
                    {
                        ...updateSteps[indexActive],
                        current: false,
                        valid: true
                    },
                    {
                        ...updateSteps[indexActive + 1],
                        current: true,
                        valid: true
                    }
                )
                return updateSteps
            }
        )
    }, [])

    const back = useCallback(() => {
        setSteps((steps) => {
            const updateSteps = [...steps].map((step) => (
                    {
                        stepRequired: undefined,
                        ...step,
                        current: false,

                    }
                )
            );

            const indexActive = steps.findIndex((step) => step.current);

            if (indexActive === 0) {
                return steps;
            }

            updateSteps.splice(
                Math.max(0, indexActive - 1),
                2,
                {
                    ...updateSteps[indexActive - 1],
                    current: true,
                    valid: true,
                },
                {
                    ...updateSteps[indexActive],
                    current: false,
                    valid: true,
                }
            );
            return updateSteps;
        });
    }, []);

    return {
        steps,
        setStep,
        setCurrentStep,
        next,
        back,
        setValues,
        getValues,
        valid,
        activeStep,
        checkCanGoto,
        getStepValidStatus
    }
}

export default useFormStep