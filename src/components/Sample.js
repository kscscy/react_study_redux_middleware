import React from 'react'

/**
 * 데이터를 불러와서 렌더링해 줄 때는 유효성 검사를 해 주는 것이 중요합니다. 
 * 예를 들어 post &&를 사용하면 post 객체가 유효할 때만 그 내부의 post.title 혹은 post.body 값을 보여 줍니다. 
 * 만약 데이터가 없는 상태라면 post.title을 조회하려고 할 때 자바스크립트 오류가 발생하니 반드시 유효성을 검사해 주어야 합니다.
 */
const Sample = ({ loadingPost, loadingUsers, post, users }) => {
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && '포스트 로딩중...'}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자 목록</h1>
        {loadingUsers && '사용자 목록 로딩중...'}
        {!loadingUsers && users && (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Sample
