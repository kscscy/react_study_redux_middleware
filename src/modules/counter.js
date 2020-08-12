import { createAction, handleActions } from "redux-actions"
import { delay, put, takeEvery, takeLatest, select, throttle } from 'redux-saga/effects'

const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)

/**
 * redux-thunk는 액션 생성 함수에서 일반 액션 객체를 반환하는 대신에 함수를 반환합니다.
 * increaseAsync와 decreaseAsync 함수를 만들어 카운터 값을 비동기적으로 한번 변경시켜 봅시다.
 */

// 1초 뒤에 increase 혹은 decrease 함수를 디스패치함
// export const increaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(increase())
//   }, 1000)
// }
// export const decreaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(decrease())
//   }, 1000)
// }

/**
 * redux-saga 적용하기
 */
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC'
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC'

// redux-saga 적용하기
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined 를 두 번째 파라미터로 넣어줍니다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined)
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined)

function* increaseSaga() {
  yield delay(1000) // 1초를 기다립니다.
  yield put(increase()) // 특정 액션을 디스패치합니다.
  const number = yield select(state => state.counter) // 스토어 상태를 의미함
  //만약 사가 내부에서 현재 상태를 참조해야 하는 상황이 생기면 이렇게 select를 사용하면 됩니다.
  console.log(`현재 값은 ${number} 입니다.`)
}

function* decreaseSaga() {
  yield delay(1000)
  yield put(decrease())
}

export function* counterSaga() {
  // 첫 번째 파라미터: n초 * 1000
  yield throttle(3000,INCREASE_ASYNC, increaseSaga)
  // takeEvery 는 들어오는 모든 액션에 대해 특정 작업을 처리해 줍니다.
  // yield takeEvery(INCREASE_ASYNC, increaseSaga)
  // takeLatest 는 기존에 진행 중이던 작업이 있다면 취소 처리하고
  // 가장 마지막으로 실행된 작업만 수행합니다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga)
}



const initialState = 0 // 상태는 꼭 객체일 필요가 없습니다. 숫자도 작동함 기존 내용 initialState = { number: 0}

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
  },
  initialState
)

export default counter