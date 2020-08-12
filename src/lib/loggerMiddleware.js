const loggerMiddleware = store => next => action => {
  // 미들웨어 기본 구조
  console.group(action && action.type) // 액션 타입으로 log를 그룹화함
  console.log('이전 상태', store.getState())
  console.log('액션', action)
  next(action) // 다음 미들웨어 혹은 리듀서에게 전달
  console.log('다음 상태', store.getState()) // 업데이트된 상태
  console.groupEnd() // 그룹 끝
}

export default loggerMiddleware

/**
 * 위 코드에서 리덕스 미들웨어의 구조를 볼 수 있습니다. 화살표 함수를 연달아서 사용했는데, 일반 function 키워드로 풀어서 쓴다면 다음과 같은 구조입니다.

const loggerMiddleware = function loggerMiddleware(store) {
  return function(next) {
    return function(action) {
      // 미들웨어 기본 구조
    };
  };
};

미들웨어에서는 여러 종류의 작업을 처리할 수 있습니다. 
특정 조건에 따라 액션을 무시하게 할 수도 있고, 
특정 조건에 따라 액션 정보를 가로채서 변경한 후 리듀서에게 전달해 줄 수도 있습니다. 
아니면 특정 액션에 기반하여 새로운 액션을 여러 번 디스패치할 수도 있죠.

이러한 미들웨어 속성을 사용하여 네트워크 요청과 같은 비동기 작업을 관리하면 매우 유용합니다.
 */