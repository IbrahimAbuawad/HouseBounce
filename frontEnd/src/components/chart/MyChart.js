import React, { useContext,useState,useEffect } from 'react'
import { Chart } from 'react-charts'
import { Prop } from "../../context/PropContext";

function MyChart() {
  const PropObject = useContext(Prop);
  const [rejectNumbers, setRejectNumbers] = useState(0);
  const [approvedNumber, setApprovedNumber] = useState(0);
  const [pendingNumber, setPendingNumber] = useState(0);
  const [allReqNumber, setAllReqNumber] = useState(0)


  useEffect(() => {
  
    PropObject.renderData?.map(e => {
      if (e.reqStatus === 'approved') {
          setApprovedNumber(approvedNumber + 1);
          setAllReqNumber(allReqNumber + 1);
          console.log(approvedNumber);
  
      }
      else if (e.reqStatus === 'rejected') {
  
          setRejectNumbers(rejectNumbers + 1);
          setAllReqNumber(allReqNumber + 1);
          console.log(rejectNumbers);
  
      }
      else if (e.reqStatus === 'pending') {
  
          setPendingNumber(pendingNumber + 1);
          setAllReqNumber(allReqNumber + 1);
          console.log(pendingNumber);
  
      }
  
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PropObject])


const data = React.useMemo(
  () => [
    {
      label: 'Approved',
      data: [[approvedNumber, allReqNumber]]
    },
    {
      label: 'Rejected',
      data: [[rejectNumbers, allReqNumber]]
    },
    {
      label: 'Pending',
      data: [[pendingNumber, allReqNumber]]
    }
  ],
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []
)

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{

        width: '100%',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  )
  return lineChart;
}
export default MyChart