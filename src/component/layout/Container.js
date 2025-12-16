export function Card({title = '', subTitle, children}) {
  return (
    <>
      {title !== '' && <h2>{title}</h2>}
      <details>
        <summary>{subTitle}</summary>
        <div className="desc_wrap">{children}</div>
      </details>
    </>
  );
}

export default function Container() {
  return (
    <div id="container">
      <a className="github" href="https://github.com/kkahub/next-study" target="_blank" rel="noreferrer">
        github링크 ⨠
      </a>

      <Card title="Next.js 버전 업그레이드 변경점" subTitle="App Router로 변경되면서 Page Router와 차이점">
        <ul>
          <li>헤더, 푸터를 레이아웃으로 관리 가능</li>
          <li>로그인, 비로그인과 같이 권한 문제 해결 됨</li>
          <li>react 18이상으로 서버 컴포넌트 사용 가능(빠른 html 로딩)</li>
          <li>반대로 next.js 서버 부담 증가로 서버 캐시 활용 적극적</li>
        </ul>
      </Card>
      <Card subTitle="버전 15로 변경되면서">
        <ul>
          <li>headers, cookies, params, searchParams가 비동기로 변경되어 await 추가 필요</li>
          <li>클라이언트 컴포넌트 일 때 프로미스 처리 훅인 React.use로 비동기 처리하기도 함</li>
          <li>React.use는 react19버전이라 next.js15버전은 react 19버전과 같이 써야 함</li>
          <li>
            자동 캐싱 정책 변경
            <br />- 이전 버전에서는 30초 자동 클라이언트 라우터 캐시여서 로그아웃 해도 로그인 화면이 캐싱 됐었음.
            <br />
            - /api 디렉토리의 자동 캐싱 GET Route Handlers가 없어지고 각 파일에 export dynamic = 'force-static'으로 각자 캐싱 적용
            <br />- 앞으로가기, 뒤로가기, loading.js는 여전히 자동 캐싱
          </li>
          <li>{`<From>`} 추가되고 서버 action 추가됨</li>
        </ul>
      </Card>
      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>

      <Card title="Keeping Components Pure" subTitle="StrickMode">
        <ul>
          <li>component를 순수하게 유지해야 함</li>
          <li>props, state, context는 항상 읽기전용으로 처리해야 함</li>
          <li>이벤트 핸들러 내부, useEffect의 경우 순수할 필요 없음, 계산 가능</li>
          <li>
            component를 두 번 호출하는 "StrickMode"로 규칙을 어기는 구성 요소를 찾음
            <div className="code">
              <xmp>
                <span className="gry">{'//'} index.js</span>
                {`\n`}
                {`<React.StrictMode> 
  <App />
</React.StrictMode>`}
              </xmp>
            </div>
          </li>
          <li>production 모드에서는 효과 없어서 앱 속도 문제 없음</li>
        </ul>
      </Card>

      <Card title="State as a Snapshot" subTitle="Snapshot처럼 작동하는 state">
        <ul>
          <li>
            아래 코드를 작동하면 +3이 될 것 같지만 +1만 된다.
            <div className="code">
              <xmp>
                {` <button
  onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}
>
  +3
</button>`}
              </xmp>
            </div>
          </li>
          <li>
            '다음 렌더링에서 state값 0에 +1을 준비한다.'를 세 번 갈아끼우며 대체해서 마지막 setNumber만 준비함.
            <br />
            준비과정 코드를 시각화한 모습
            <div className="code">
              <xmp>
                {` <button
  onClick={() => {
    setNumber(0 + 1);
    setNumber(0 + 1);
    setNumber(0 + 1);
  }}
>
  +3
</button>`}
              </xmp>
            </div>
          </li>
          <li>이런 snapshot 처럼 작동하는 state는 이벤트 핸들러 안에서 setTimeout을 사용해 인위적으로 이벤트를 지연시키고 그 사이 상태값을 바꿔도 값이 고정되 바뀌지 않는다.</li>
        </ul>
      </Card>
    </div>
  );
}
