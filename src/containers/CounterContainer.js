import React from 'react'
import Counter from '../components/Counter'
import { connect } from 'react-redux'
// import { increase, decrease } from '../modules/counter'
import { increaseAsync, decreaseAsync} from '../modules/counter'

/**
 * 액션 생성 함수 호출 #1
 */
// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   )
// }
// export default connect(
//   state => ({
//     number: state.counter
//   }),
//   {
//     increase,
//     decrease
//   }
// )(CounterContainer)


/**
 * #2
 */
const CounterContainer = ({ number, increaseAsync, decreaseAsync})=> {
  return (
    <Counter 
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  )
}

export default connect(
  state => ({
    number: state.counter
  }),
  {
    increaseAsync,
    decreaseAsync
  }
)(CounterContainer)