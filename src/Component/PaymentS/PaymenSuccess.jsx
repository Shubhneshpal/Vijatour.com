import React from 'react'
import { useSearchParams } from "react-router-dom"


const PaymenSuccess = () => {
    
    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
  return (
    <>
      <p>{referenceNum} </p>
    </>
  )
}

export default PaymenSuccess
