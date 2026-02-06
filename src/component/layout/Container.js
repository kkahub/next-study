import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {a11yDark, materialLight} from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const codeTheme = {
    ...a11yDark,
    comment: {
      color: '#888',
    },
    prolog: {color: '#888'},
    doctype: {color: '#888'},
    cdata: {color: '#888'},
    punctuation: {color: '#ccc'},
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
          <li>
            headers, cookies, params, searchParams가 비동기로 변경되어 await 추가 필요<br />
            *Next.js의 useParams, useSearchParams는 비동기로 변경 필요 없음
          </li>
          <li>클라이언트 컴포넌트 일 때 프로미스 처리 훅인 React.use로 비동기 처리하기도 함</li>
          <li>React.use는 react19버전이라 next.js15버전은 react 19버전과 같이 써야 함</li>
          <li>
            <b>searchParams - React.use 예시</b>
            <div className="code">
              <SyntaxHighlighter language="javascript" style={codeTheme}>
                {`'use client';
import * as React from 'react';

export default function Page({ params }) {
  const {id} = React.use(params);
  return <p>ID: {id}</p>
}`}
                </SyntaxHighlighter>
                </div>
                <b>searchParams - async/await 예시</b>
                <p>타입에 Promise, 함수에 async, 변수할당에 await</p>
            <div className="code">
              <SyntaxHighlighter language="javascript" style={codeTheme}>
                {`'use client';

type Props = {
  params: Promise<{ id: string }>;
}

export default async function Page({ params } : Props) {
  const {id} = await params;
  return <p>ID: {id}</p>
}`}
                </SyntaxHighlighter>
                </div>  
            </li>
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

      <Card title="부록 자바스크립트" subTitle="고차함수">
        <ul>
          <li>함수를 인자로 받거나 함수를 반환하는 함수</li>
          <li>
            이미 익숙하게 알고 있는 고차함수.
            <br />
            .filter(): 전달한 함수가 true면 반환하는 로직을 인자로 받음
            <br />
            .map(): 각 요소를 변환하는 로직(함수)을 인자로 받음
            <br />
            .reduce(): 배열을 하나의 값으로 합치는 로직(함수)을 인자로 받음
            <br />
            .forEach(): 각 요소에 대해 실행할 작업(함수)을 인자로 받음
            <br />
            .sort(): 정렬 기준이 되는 비교 로직(함수)을 인자로 받음
            <br />
          </li>
        </ul>
      </Card>

      <Card subTitle="커링함수">
        <ul>
          <li>여러 개 인자를 하나씩 받아 고정하고 함수들을 체인으로 만드는 기술</li>
          <li>매개변수는 함수 마다 한 개씩만 받을 수 있음</li>
          <li>커링함수는 함수를 반환하기 때문에 고차함수 특성이 있음</li>
          <li>장점 : 재활용, 모듈화, 유연성</li>
          <li>단점 : 성능저하, 러닝커브, 가독성 및 어려운 디버깅</li>
          <li>
            <b>활용1. 함수의 지연 실행</b>
            <div className="code">
              <SyntaxHighlighter language="javascript" style={a11yDark}>
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
              <SyntaxHighlighter language="javascript" style={codeTheme}>
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
              <SyntaxHighlighter language="javascript" style={codeTheme}>
                {`const createAPIEndpoint = base => endpoint => params => {
const query = new URLSearchParams(params).toString();
return \${ base } \${ endpoint }?\${query};

// 기본 API URL
const baseAPI = createAPIEndpoint('https://example.com/api');
                
// 엔드포인트 확장
const fetchUser = baseAPI('user');
const fetchPosts = baseAPI('posts');
                
// 사용 예시
const userAPIPath = fetchUser({ id: '123' });
console.log(userAPIPath);

// "https://example.com/api/user?id=123"
const postsAPIPath = fetchPosts({ userId: '123', limit: 10 });
console.log(postsAPIPath); // "https://example.com/api/posts?userId=123&limit=10"`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <b>활용4. 고차 컴포넌트(HOC)</b>
            <br />
            컴포넌트를 인자로 받아 재사용에 용이 함
            <div className="code">
              <SyntaxHighlighter language="javascript" style={codeTheme}>
                {`// 커링 함수를 이용한 HOC 선언
function withLoading(WrappedComponent) {
  return function({ isLoading, ...rest }) {
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return <WrappedComponent {...rest} />;
    }
  };
}

// 예시 컴포넌트 선언
function MyComponent({ data }) {
  return (
    <div>
      <h1>My Component</h1>
      <p>{data}</p>
    </div>
  );
}

// 사용 예시
const MyComponentWithLoading = withLoading(MyComponent);

function App() {
  // 데이터를 가져오는 상태 시뮬레이션
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  return (
    <MyComponentWithLoading isLoading={loading} data={data} />
  );
}`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <b>활용5. 팩토리 패턴</b>
            <br />
            객체 지향 프로그래밍에서 객체 생성을 캡슐화하는 디자인 패턴
            <br />* 하단 링크 참조
          </li>
          <li>
            <b>활용6. Reducer 간소화</b>
            <br />
            간결하게 표현 가능. 예시로만 볼 것.
            <br />
            리듀서 안에서 액션 처리가 기본 원칙
            <br />* 하단 링크 참조
          </li>
          <li>
            <a href="https://weezip.treefeely.com/post/learn-js-currying-with-6-examples" target="_blank" rel="noreferrer">
              커링, 고차함수 참고 설명
            </a>
          </li>
        </ul>
      </Card>

      <Card title="파일구조 차이점" subTitle="layout.tsx와 template.tsx 사용">
        <ul>
          <li>기존 react환경 처럼 이어가는 것이 아닌 template.tsx는 매번 새롭게 마운트 됨</li>
          <li>구글 에널리틱스 처럼 페이지를 넘나 들면서 저장해야 하는 부분이 있을 때 layout.tsx대신 template.tsx사용</li>
        </ul>
      </Card>

      <Card title="그 외 모음" subTitle="a와 <LINK /> 차이점">
        a태그는 새로고침하면서 넘어가고 {`<LINK />`}는 새로고침 하지 않으면서 넘어감
      </Card>

      <Card subTitle="router.push와 router.replace 차이점">
        <p>상황에 맞는 라우터 주소 변경 방법 사용</p>
        <div className="code">
          <SyntaxHighlighter language="javascript" style={codeTheme}>
            {`// localhost:3000/detail 페이지 코드
const router = useRouter();
                
router.push('localhost:3000/detail/123'); // 1. push 사용
router.replace('localhost:3000/detail/123');  // 2. replace 사용`}
          </SyntaxHighlighter>
        </div>
        <br />
        <ul>
          <li>
            <b>router.push일 경우</b>
            <br />
            한 단계 한 단계 씩 아래와 같이 히스토리가 쌓임
            <br />
            <div className="code">localhost:3000 -> localhost:3000/detail -> localhost:3000/detail/123</div>
            <span className="org">localhost:3000/detail/123</span>
            에서 뒤로가기를 하면 <span className="org">localhost:3000/detail</span>로 가지만 detail페이지의 router.push가 실행되면서 다시 <span className="org">localhost:3000/detail/123</span>로 가버리는 상황 발생
            <br />
            <br />
          </li>
          <li>
            <b>router.replace일 경우</b>
            <br />
            <div className="code">localhost:3000 -> localhost:3000/detail</div>
            /detail에서 <span className="org">localhost:3000/detail/123</span>로 넘어갈 때 replace로 <span className="org">localhost:3000/detail</span>를 덮어쓰기 때문에
            <div className="code">localhost:3000 -> localhost:3000/detail/123</div> 위와 같이 되며 뒤로가기 하면 <span className="org">localhost:3000</span>로 이동
          </li>
        </ul>
      </Card>

      <Card subTitle="VS Code에서 export 함수와 import 옮겨주는 기능">
        export할 함수 우클릭 -> Refactor/리팩토링(Ctrl+Shift+R) -> Move<br />
        import와 export를 자동으로 다른 곳으로 옮겨줌
      </Card>

      <Card title="라우트" subTitle="패러렐 라우트 (Parallel Routes)">
        <ul>
          <li>한 레이아웃에 동시에 두 가지 라우트(페이지)를 보여주거나 조건부 렌더링 할 수 있음</li>
          <li>매우 동적인 앱 섹션에 유용</li>
          <li>
            <b>사용 규칙 및 방법</b>
            <ul>
              <li>layout.tsx에서 쓸 수 있고 layout.tsx와 위치가 같아야 함</li>
              <li>@modal과 같이 폴더에 @를 붙임</li>
              <li>
                layout.tsx가 위치한 곳과 @를 붙인 폴더 안에 모두 default.tsx가 필요
                <br />
                패러렐 라우트가 활성화되지 않았거나, 현재 URL과 일치 하지 않을 경우 띄울 기본 화면으로 폴백 UI 제공 용도
                <br />
                기본설정으로 아래는 가장 기본 세팅 화면
                <div className="code">
                  <SyntaxHighlighter language="javascript" style={codeTheme}>
                    {`export default function Default() {
  return null
}`}
                  </SyntaxHighlighter>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </Card>

      <Card subTitle="인터셉트 라우트 (Intercepting Routes)">
        <ul>
          <li>클라이언트에서 라우팅 할 때 만 사용 할 수 있음</li>
          <li>현재 레이아웃에서 다른 부분의 라우트를 로드 할 수 있음</li>
          <li>사용자가 다른 컨텍스트로 전환하지 않고도 다른 라우트의 콘텐츠를 표시하기에 유용</li>
          <li>
            예를 들어 <span className="org">https://url.com/feed</span>라는 URL을 가진 리스트 화면에서 모달을
            <SyntaxHighlighter language="javascript" style={materialLight}>{`<Link href='/photo/123'>...</Link>`}</SyntaxHighlighter>과 같은 코드로 띄울 때 <span className="org">/photo/123</span> 라우트를 가로채고 URL을 마스킹해 <span className="org">/feed</span> 위에 오버레이 하여 <span className="org">https://url.com/photo/123</span>로 표시 할 수 있음.
          </li>
          <li>
            하지만 https://url.com/photo/123로 직접 들어간 경우 모달대신 전체 페이지로 렌더링 되어 라우트 가로채기가 발생하지 않음
            <br />
            인터셉트 라우트 디렉토리만 필요한 것이 아니라 일반 디렉토리도 같이 만들어서 직접 입력 시 전체 페이지로 접근 할 수 있게 만들 수 있음
            <span className="gry">※ (.)photo/[id]/page.tsx</span>와 <span className="gry">※ photo/[id]/page.tsx</span>를 같이 만듬
          </li>
          <li>
            <b>라우트 디렉토리명 사용 규칙</b>
            <ul>
              <li>(.) : 동일 레밸 세그먼트 매칭</li>
              <li>(..) : 한 레밸 위 세그먼트 매칭</li>
              <li>(..)(..) : 두 레밸 위 세그먼트 매칭</li>
              <li>(...) : app 디렉토리(root) 세그먼트 매칭</li>
            </ul>
            <span className="gry">※ (.)photo/[id]/page.tsx</span>
          </li>
          <li>redirect(next/navigation)는 클라이언트에서 페이지 넘어갈 때 관여. 서버에서 하면 인터셉팅이 잘 작동하지 않음</li>
        </ul>
        <span className="gry">
          참고 : <a href="https://nextjs-ko.org/docs/app/building-your-application/routing/intercepting-routes#modals">모달 코드 예시</a>
        </span>
      </Card>

      <Card subTitle="패러렐, 인터셉트 라우트를 같이 사용">
        <p>두 가지를 접목하면 기존 모달의 문제점을 해결 할 수 있음</p>
        <ul>
          <li>모달 콘텐츠 URL 생성으로 공유 가능</li>
          <li>모달을 닫아도 페이지 새로고침 없이 컨텍스트를 유지할 수 있음</li>
          <li>뒤로가기 하면 모달 닫기 가능</li>
          <li>앞으로 가기 하면 모달 열기 가능</li>
        </ul>
      </Card>

      <Card title="Private 폴더" subTitle="공통 컴포넌트 숨기기">
        <ul>
          <li>인터셉트 라우트와 일반 라우트의 모달이 같기 때문에 공통 컴포넌트로 묶음</li>
          <li>_component와 같은 디렉토리로 만들면 특정 기능 없이 프라이빗 폴더로 라우트 생성 안함</li>
        </ul>
      </Card>

      <Card title="서버, 클라이언트 컴포넌트" subTitle="서버 컴포넌트">
        <ul>
          <li>layout.tsx, page.tsx는 기본적으로 서버 컴포넌트임</li>
          <li>async로 비동기화 할 수 있는 장점이 있음</li>
          <li>서버 컴포넌트는 모두 데이터와 관련있음.</li>
        </ul>
      </Card>

      <Card subTitle="클라이언트 컴포넌트">
        <ul>
          <li>클라이언트 컴포넌트는 서버에서 실행 될 수 있지만 훅은 실행 안됨</li>
          <li>클라이언트 컴포넌트 명시는 'use client';로 하고 layout, page에서 사용하기 보단 컴포넌트 안에서 사용 권장</li>
        </ul>
      </Card>

      <Card title="segment 접근 hook" subTitle="useSelectedLayoutSegment, useSelectedLayoutSegments">
        <div className="code">
                  <SyntaxHighlighter language="javascript" style={codeTheme}>
            {`app  
  └ board
      └ qna
           └ page.tsx
  └ home
  └ layout.tsx
}`}
                  </SyntaxHighlighter>
                </div>
        <b>useSelectedLayoutSegment</b>
        <ul>
          <li>layout.tsx를 기준으로 .tsx파일이 속하는 형제 segment 네임을 가져옴</li>
          <li>board/qna/page.tsx에서 useSelectedLayoutSegment을 사용하면 <span className="org">board</span>가 결과로 나옴</li>
        </ul>
        <br />
        <b>useSelectedLayoutSegments</b>
        <ul>
          <li>layout.tsx를 기준으로 .tsx파일이 속하는 형제, 자식 segment 네임을 배열로 가져옴</li>
          <li>board/qna/page.tsx에서 useSelectedLayoutSegment을 사용하면 <span className="org">["board", "qna"]</span>가 결과로 나옴</li>
        </ul>
      </Card>

      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>
      <Card title="제목" subTitle="부제목"></Card>
    </div>
  );
}
