import { useState } from "react";
import { useReducer } from "react";

const defaultInput = {
    value: '',
    isTouched: false
}

const inputReducer = (prevState, action) => {
    if (action.type === 'INPUT') {
        return {
            value: action.value,
            isTouched: prevState.isTouched
        }
    }
    if (action.type === 'BLUR') {
        return {
            value: prevState.value,
            isTouched: true
        }
    }
    return inputReducer
}

export const useInput = (validateState) => {
    const [inputState, dispatchEmail] = useReducer(inputReducer, defaultInput)

//   const [enteredValue, setEnteredValue] = useState("");
//   const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateState(inputState.value) // true || false
  const hasError = !valueIsValid && inputState.isTouched 

  const valueChangeHandler = (event) => {
      dispatchEmail({type: 'INPUT', value: event.target.value})
    //   setEnteredValue(event.target.value)
  }

  const inputBlurHandler = (event) => {
      dispatchEmail({type: 'BLUR'})
    //   setIsTouched(true)
  }

  return {
      value: inputState.value,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
  }

};