# MyTripPick

멋쟁이 사자처럼 프론트엔드 스쿨 9조 파이널 프로젝트 저장소

## 리액트에서\_9해조

### [PPT]()

### [배포사이트]()

<div align="center" style="width: 600px;">
  
<h3>🎩 프로젝트 소개 🎩</h3>
<table>
<tr><th style="text-align: center; ">프로젝트 개요</th></tr>
<tr><td>

- 온라인 쇼핑몰 '마켓칼리'의 웹페이지를 클론 코딩합니다.

</td></tr>
<tr><th style="text-align: center; ">프로젝트 목표</th></tr>
<tr><td>

- HTML, SCSS, Vanilla JavaScript 등의 기술을 활용하여 실제 상용화된 웹페이지를 재현합니다.
- Pocketbase 연동: 데이터베이스를 통해 CRUD에 대한 심화 학습을 진행합니다.
- 협업 및 버전 관리: Git을 활용한 버전 관리와 협업 툴을 통해 팀 프로젝트를 진행합니다.
</td></tr>
</table>
<br />
<hr />
<br />

<h3>🎥 프로젝트 기능 소개 🎥</h3>

<table>
<tr><th style="text-align: center; ">주요 기능</th></tr>
<tr><td>

- 🔍 상품 검색 및 카테고리별 분류
- 💄 추천 상품 및 프로모션 배너
- 🛒 장바구니 및 결제 기능
- 💁 마이페이지 정보 제공
- 📑 회원가입 및 로그인 기능

</td></tr>
<tr><th style="text-align: center; ">상세 기능</th></tr>
<tr><th style="text-align: center; ">헤더(header)</th></tr>
<tr><td>

- 웹 접근성을 고려하여 키보드와 마우스 모두 다 접근 가능
- 로그인시 회원가입에서 마이페이지 로그인에서 로그아웃으로 UI 변경
- 웹 컴포넌트를 사용하여 재사용이 용이하게 만듦
- 스크롤에 따라 화면 레이아웃 변경
- 장바구니에 제품이 추가 됐을때 장바구니에 숫자 카운트
</td></tr>
<tr><th style="text-align: center; ">푸터(Footer)</tr></th>
<tr><td>

- 웹 접근성을 고려하여 키보드와 마우스 모두 다 접근 가능
- 웹 컴포넌트를 사용하여 재사용이 용이하게 만듦</td></tr>
<tr><th style="text-align: center; ">메인(Main)</th></tr>
<tr><td>

- pb와 swiper API를 활용하여 동적으로 슬라이더 추가
- 생성자 함수를 통해 swiper 재사용 가능
- 웹 접근성을 고려하여 키보드와 마우스 모두 다 접근 가능
- 제품 클릭시에 id값과 src값을 저장하여 최근 본 상품 구현
- 장바구니 함수 재사용 용이하게 리팩토링</td></tr>
<tr><th style="text-align: center; ">마이페이지(My Page)</th></tr>
<tr><td>

- 회원 탈퇴를 하게되면 pb에 delete 요청을 통하여 회원 데이터를 삭제시킴
- 로그인 상태에만 보이는 마이페이지에 자신의 정보들이 동적으로 렌더링</td></tr>
<tr><th style="text-align: center; ">회원가입(Register)</th></tr>
<tr><td>

- 키보드로 tap 했을 시 모든 요소에 접근 가능
- 데이터베이스 값과 비교해 아이디 / 이메일 중복확인 기능 구현
- 비밀번호 입력 / 비밀번호 확인 입력 값 비교하여 일치 여부 확인
- 이름에는 한글만 입력 가능하도록 제한
- 다음 주소 API를 사용하여 주소 입력 기능 구현
- 이용약관 전체동의 기능 구현
- 가입 완료 시 로그인으로 리디렉션
</td></tr>
<tr><th style="text-align: center; ">로그인(Login)</th></tr>
<tr><td>

- 키보드로 tap 했을 시 모든 요소에 접근할 수 있도록 보임
- 로그인과 비밀번호를 입력했을 때 로그인 또는 비밀번호가 틀리면 alert 창 띄우고 리로드
- 로그인 성공 시 alert창으로 성공 표시 후 메인 페이지로 이동</td></tr>
<tr><th style="text-align: center; ">제품 리스트(Product List)</th></tr>
<tr><td>

- 신상품/ 베스트/알뜰쇼핑/특가혜택을 눌렀을 시 각각에 요소에 맞게 상품 리스트 제목 변경 보임
- 아코디언 접었다 펼쳤다 하는 화면 또한 아코디언을 펼치면 그 요소에 맞는 상품 갯수 보임
- 체크박스 토글되는 것과 라벨을 눌러도 토글되는 것을 보임
- 페이지네이션 동작 보임(맨 앞, 이전, 다음, 맨 뒤 페이지)
- 상품의 사진이나 글을 클릭시 제품의 상세 페이지로 이동
- 그 다음 페이지도 같이 동작하는 것을 보임</td></tr>
<tr><th style="text-align: center; ">장바구니 추가 모달(Add Cart Modal)</th></tr>
<tr><td>

- 취소 버튼을 누르면 모달창이 사라지는 것을 보임
- 할인 가격이 없는 상품의 장바구니 버튼을 누르면 원가로 나오는 것을 확인시킴
- 상품의 증가 감소 버튼 누르면 숫자가 증가 감소하는 것을 보이고 0보다 작으면 alert 창을 띄우고 1과 원래 가격으로 보이도록 하는것을 보임
- 할인 가격이 있는 상품의 장바구니 버튼을 누르면 원가는 가로줄 처리되고 할인가가 보이도록 하는 것을 보이고 역시 숫자 증가와 감소를 보이고 0보다 작으면 alert 창을 띄우고 1과 원래 가격으로 보이도록 하는것을 보임
- 그 다음 페이지를 넘어가서도 똑같이 동작하는 것을 보임
- 로컬스토리지에 각 상품들이 잘 저장되어 있다는 것을 보임
- 장바구니 페이지로 가서 추가한 상품들이 잘 저장되어 있다는 것을 보임
</td></tr>
<tr><th style="text-align: center; ">팝업(Pop Up)</th></tr>
<tr><td>

- 닫기클릭시 새로고침할때 팝업 다시 띄우기
- 오늘 하루 안보기 클릭시 하루동안 팝업 보이지 않기</td></tr>
<tr><th style="text-align: center; ">장바구니(Cart)</th></tr>
<tr><td>

- 장바구니 상품 담기 기능
- 냉장/ 냉동/ 상온 카테고리 별로 랜더링
- 로그인했을때 주문하기 버튼과 회원 주소로 배송지 랜더링
- 아코디언 토글
- 탭으로 모든 요소 접근가능
- 상품선택/ 전체선택 위아래 체크박스 동기화
- 수량변경시 결제예정금액 반영(30000원 이상 배송비 X)
- 개별삭제/선택삭제
- 상품 클릭시 상품 상세페이지로 이동
- 수량 변경 가능(1개일 경우 마이너스 버튼 비활성화)
- 장바구니 상품이 없는 경우 UI 변경</td></tr>
</th></tr>
</table>
<br /><hr /><br />
<h3>🕹️ 테스트 계정 🕹️</h3>
<h4>ID</h4>

```
test123@testing.com
```

<h4>PASSWORD</h4>

```
testing123
```

</code>
<br />
<hr />
<br />
<table>
<tr>
<td align="center">
<img src='' alt=''/>
</td>
<td align="center"><img src='' alt=''/>
</td>
<td align="center">
<img src='' alt=''/>
</td>
<td align="center"><img src='' alt=''/></td>
</tr>
<tr>
<td align="center" width="250px"><img src="https://img.shields.io/badge/LEE:HEE:JAE-004EEB?style=for-the-badge&logo=waze&logoColor=white">
<br/>
<details><summary><strong>Project Leader</strong></summary>
ISTJ<br/>leeheejaelcode@gmail.com<br/><a href="https://github.com/leeheejaelcode">github.com/leeheejaelcode</a></td>
</details>
<td align="center" width="250px">
<img src="https://img.shields.io/badge/CHOI:SO:HYEON-FA7118?style=for-the-badge&logo=bilibili&logoColor=white">
<br/>
<details>
<summary>
<strong>Project Assistant</strong>
</summary>
ISFJ<br/>chlthgus0901@naver.com<br/><a href="https://github.com/minimumchoi">github.com/minimumchoi</a>
</details>
</td>
<td align="center" width="250px"><img src="https://img.shields.io/badge/OH:SEONG:HUN-9705EB?style=for-the-badge&logo=kuma&logoColor=white">
<br/>
<details>
<summary>
<strong>Project Assistant</strong>
</summary>
ISFJ<br/>osh8137@naver.com<br/><a href="https://github.com/castlehuni">github.com/castlehuni</a>
</details>
</td>
<td align="center" width="250px">
<img src="https://img.shields.io/badge/KIM:HAN:WOOL-F524A5?style=for-the-badge&logo=ethereum&logoColor=white">
<br/>
<details>
<summary>
<strong>Scrum Master</strong>
</summary>
INFP<br/>woolen_h@kakao.com<br/><a href="https://github.com/woolen-h">github.com/woolen-h</a>
</details>
</td>
</tr>
</table>
<br>
<h3 align="center">♟️ 기술스택 ♟️</h3>

<strong>FRONTEND</strong>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=flat&logo=JAVASCRIPT&logoColor=black">
<img src="https://img.shields.io/badge/swiper-6332F6?style=flat&logo=swiper&logoColor=white">
<br><br>

<strong>TOOLS</strong>

<img src="https://img.shields.io/badge/Visual_Studio_Code-269FF0?style=flat">
</div>

<h3 align="center">♟️ 기술스택 ♟️</h3>
