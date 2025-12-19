import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const customTheme = {
    ...vscDarkPlus,
    comment: {
      color: '#888',
    },
    prolog: {color: '#888'},
    doctype: {color: '#888'},
    cdata: {color: '#888'},
    punctuation: {color: '#ccc'}, // 구두점 색상 예시
  };

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

      <Card title="부록" subTitle="고차함수">
        <ul>
          <li></li>
          <li></li>
        </ul>
      </Card>

      <Card subTitle="커링함수">
        <ul>
          <li>함수 인자를 고정, 나머지 인자를 받는 함수를 반환하는 함수</li>
          <li>매개변수는 함수 마다 한 개씩만 받을 수 있음</li>
          <li>커링함수는 함수를 반환하기 때문에 고차함수 특성이 있음</li>
          <li>장점 : 재활용, 모듈화, 유연성</li>
          <li>단점 : 성능저하, 러닝커브, 가독성 및 어려운 디버깅</li>
          <li>
            <b>활용1. 함수의 지연 실행</b>
            <div className="code">
              <SyntaxHighlighter language="javascript" style={customTheme}>
                {`function multiply(a) {
  return function(b) {
    return a * b;
  };
}

// a=2라는 상태를 기억하는 클로저다.
const double = multiply(2); 

// 두 번째 인자를 전달해 함수를 지연 실행할 수 있다.
console.log(double(4));  // 8 (2 * 4)`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <b>활용2. 이벤트 핸들러 간소화</b>
            <br />
            <span className="org">{`onClick={(e) => handleItemClick(itemId)}`}</span> 이벤트를 매게변수로 작성할 필요 없어짐
            <div className="code">
              <SyntaxHighlighter language="javascript" style={customTheme}>
                {`function MyComponent() {
  const handleItemClick = itemId => event => {
    console.log(\`Item \${itemId} clicked\`, event);
  };

  return (
    <div>
      {['item1', 'item2', 'item3'].map(itemId => (
        <button key={itemId} onClick={handleItemClick(itemId)}>
          Click {itemId}
        </button>
      ))}
    </div>
  );
}`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <b>활용3. API 호출 처리</b>
            <br />
            <div className="code">
              <SyntaxHighlighter language="javascript" style={customTheme}></SyntaxHighlighter>
              <xmp>
                {`const createAPIEndpoint = base => endpoint => params => {
  const query = new URLSearchParams(params).toString();
  return`}{' '}
                {' ${ '}base{' }'}
                {'/${ '}endpoint{` }{'?${'}query{'}`}`;
                {'};'}
                <br />
                <br />
                <span className="gry">{'//'} 기본 API URL</span>
                <br />
                {`const baseAPI = createAPIEndpoint('https://example.com/api');`}
                <br />
                <br />
                <span className="gry">{'//'} 엔드포인트 확장</span>
                <br />
                {`const fetchUser = baseAPI('user');
const fetchPosts = baseAPI('posts');`}
                <br />
                <br />
                <span className="gry">{'//'} 사용 예시</span>
                <br />
                {`const userAPIPath = fetchUser({ id: '123' });
console.log(userAPIPath);`}
                <span className="gry"> {'//'} "https://example.com/api/user?id=123"</span>
                <br />
                {`const postsAPIPath = fetchPosts({ userId: '123', limit: 10 });
console.log(postsAPIPath);`}
                <span className="gry"> {'//'} "https://example.com/api/posts?userId=123&limit=10"</span>
              </xmp>
            </div>
          </li>
          <li>
            <a href="https://weezip.treefeely.com/post/learn-js-currying-with-6-examples" target="_blank" rel="noreferrer">
              커링, 고차함수 설명
            </a>
          </li>
        </ul>
      </Card>

      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>
    </div>
  );
}
