# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

---

<br/>

제출자: 양지영

<br/>

- 실행

  - `git clone ${URL}`후 디렉토리 최상단에서 `npm install` 합니다.
  - `npm run dev` 명령어를 실행합니다.
  - `http://localhost:3000`에서 로컬 웹 페이지를 확인할 수 있습니다.

* SSR 관련

  - 홈(상품리스트) 페이지(`/` or `/?page=${id}`)와 상품상세 페이지(`/products/${id}`)를 getServerSideProps를 사용하였습니다.
  - 외부 데이터 fetch는 React Query를 사용하였습니다.
  - 홈 페이지(`/`) 진입 시 `/?page=1` 로 리다이렉트 시켜 모든 리스트 페이지가 일관된 URL을 가지도록 하였습니다. (홈 페이지에서 onRedirectToFirstPage useEffect를 사용하여 컴포넌트 마운트 후 처리되도록 함)
  - URL query(page) 값에 직접 입력할 경우 최초 진입으로 판단하여 서버사이드 렌더링된 1페이지를 반환합니다.

<br/>

- 로그인 관련

  - MSW의 mock api를 사용하고 있어, 실제 입력한 아이디/비밀번호 값을 보내지 않고 유효성만 검사하고 로그인 성공하도록 처리하였습니다.
  - sessionStorage를 사용하여 저장하여 새로고침 시에도 로그인 상태를 유지했습니다.
  - 로그인 상태값을 포함하고 있는 `<Header/>` 컴포넌트를 dynamic import를 사용하여 CSR로 구현하였습니다.

<br/>

- 스타일 관련

  - 페이지네이션, 상품 썸네일 등 next의 Link 컴포넌트나 routing 액션을 걸어준 경우 `cursor: pointer` 를 적용하였습니다.
  - login 컴포넌트 하위 아이디/비밀번호 Input을 재사용 가능한 공통 컴포넌트로 분리하도록 리팩토링하고, useRef를 사용하여 개선하면 좋을 것 같습니다.

  <br/>

- custom hook 관련 외

  - `usePagination`을 구현하였고 `<Pagination />` 컴포넌트에서 사용합니다. 아이템 전체 개수(totalCount)만을 필수로 합니다.
  - 정규식 등을 이용한 아이디/비밀번호 유효성 검사를 처리하는 `useValidation` hook을 구현하였습니다.
  - 금액 표시 형식(`,`)처리는 상품 리스트 useQuery에서 처리해서 반환해주어 컴포넌트에서는 UI를 그려주기만 하도록 처리하였습니다.
