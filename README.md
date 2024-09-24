# MyTripPick

멋쟁이 사자처럼 프론트엔드 스쿨 9조 파이널 프로젝트 저장소

## 리액트에서\_9해조

### [PPT](https://www.canva.com/design/DAGRd5nlkUw/l98Ozh1U4EMEQsj_2_2OkQ/view?utm_content=DAGRd5nlkUw&utm_campaign=designshare&utm_medium=link&utm_source=editor)

### [배포사이트](https://mytrippick.netlify.app/)

<div align="center" style="width: 100%;">
  
<h3>🎩 프로젝트 소개 🎩</h3>
<table >
<tr><th style="text-align: center; ">프로젝트 개요</th></tr>
<tr><td>
MyTripPick<br/>
나만의 인생 여행지를 올려 다른 사람들과 공유하고<br/>
가장 많은 사랑을 받은 여행지 후기 순위를 선정
</td></tr>
</table>
<br />
<hr />
<br />

<h3>🗺 프로젝트 User Flow 🗺</h3>
<img src='https://media.discordapp.net/attachments/1276470850177990716/1287997118950281227/image.png?ex=66f3944a&is=66f242ca&hm=b844e51e66c150a6f083ea906e1c5cfe11fe31d34b2b5af89a9732b0b20ceba5&=&format=webp&quality=lossless&width=1422&height=578' alt='프로젝트 Flow Chart 사진'>
<hr/>
<br/>

<h3>🎨 프로젝트 디자인 🎨</h3>
<img src='' alt='프로젝트 Flow Chart 사진'>
<hr/>
<br/>

<h3>🎥 프로젝트 기능 소개 🎥</h3>

<table>
<tr><th style="text-align: center; ">주요 기능</th></tr>
<tr><td>
<ul>
  <li>여행지 순위를 보고 인기있는 여행지 확인</li>
  <li>카테고리별 인기 여행지 확인</li>
  <li>내 주변 여행지 후기 확인</li>
  <li>마음에 드는 여행지 후기 저장해 큐레이션 목록 확인</li>
  <li>여행지 후기 댓글 소통</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">상세 기능</th></tr>
<tr><th style="text-align: center; ">헤더</th></tr>
<tr><td>
<ul>
  <li>스크롤 감지 함수를 제작하여 사용자가 스크롤 다운 할 때는 헤더를 숨기고, 스크롤 업 할 때는 나타나도록 함</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">홈</th></tr>
<tr><td>
<ul>
  <li>상단에 좋아요 수가 가장 많은 게시글 3개 노출(스와이퍼 적용)</li>
  <li>게시글 카드 컴포넌트에서 바로 좋아요/북마크 가능</li>
  <li>카테고리 탭 스와이퍼 적용</li>
  <li></li>카테고리 버튼으로 게시글 필터링</li>
  <li>게시글 8개씩 노출 후 더보기 버튼 클릭 시 데이터 추가</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">메뉴</th></tr>
<tr><td>
<ul>
  <li>우측 햄버거 버튼으로 접근 가능</li>
  <li>비로그인 상태에서 상단부 로그인/회원가입 링크 표시</li>
  <li>비로그인 상태에서 게시글 등록하기, 큐레이션 페이지 비활성화</li>
  <li>비활성화된 링크 클릭 시 모달 오픈</li>
  <li>로그인 상태에서 상단부 회원정보 표시, 모든 메뉴 이용 가능</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">회원가입</th></tr>
<tr><td>
<ul>
  <li>이메일 주소, 비밀번호, 비밀번호 확인, 닉네임을 입력받아 유저 데이터 생성</li>
  <li>조건식과 일치하지 않는 입력이 있을 때 입력창 하단에 경고 문구 표시</li>
  <li>모든 조건을 만족하도록 입력했을 때 가입하기 버튼 활성화</li>
  <li>회원가입 성공 시 모달창을 통해 성공 여부 확인 가능하며, 확인 클릭 시 로그인 페이지로 이동</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">로그인</th></tr>
<tr><td>
<ul>
  <li>이메일 주소, 비밀번호를 입력받아 로그인 처리</li>
  <li>조건식과 일치하지 않는 입력이 있을 때 입력창 하단에 경고 문구 표시</li>
  <li>모든 조건을 만족하도록 입력했을 때 로그인 버튼 활성화</li>
  <li>로그인 실패 시 비밀번호 입력창 하단에 경고 문구 표시</li>
  <li>로그인 성공 시 모달창이 나타나며, 확인 클릭 시 메인 페이지로 이동</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">마이페이지</th></tr>
<tr><td>
<ul>
  <li>상단 톱니바퀴 모양 버튼 클릭 시 비밀번호 확인 페이지로 이동</li>
  <li>작성한 게시글이 없을 때 안내문구와 함께 게시글 작성 페이지로 이동하는 버튼 표시</li>
  <li>작성한 게시글이 있을 때 피드에 작성한 게시글 사진 리스트 렌더링</li>
  <li>게시글 사진 클릭 시 각 게시글 상세 페이지로 이동</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">회원 정보 수정</th></tr>
<tr><td>
<ul>
  <li>프로필 영역 클릭 시 이미지 업로드 가능</li>
  <li>프로필 이미지 업로드하지 않으면 기본 이미지로 프로필 이미지 설정</li>
  <li>닉네임과 소개글을 입력받아 유저 데이터 업데이트</li>
  <li>기존 DB에 저장되어있는 데이터를 표시하고 수정할 수 있도록 설정</li>
  <li>입력창의 연필 버튼 클릭 시 기존 입력된 내용을 모두 삭제</li>
  <li>비밀번호 변경 버튼과 회원 탈퇴 버튼 클릭 시 각각 비밀번호 변경 페이지/회원 탈퇴 페이지로 이동</li>
  <li>취소 버튼 클릭 시 마이페이지로 이동</li>
  <li>확인 버튼 클릭 시 사용자가 입력한 유저 데이터를 업데이트하고, 성공 시 모달창으로 성공 여부 확인 가능</li>
</ul>

</td></tr>
<tr><th style="text-align: center; ">게시글 등록하기</th></tr>
<tr><td>
<ul>
  <li>장소 사진, 여행지명, 방문 날짜, 카테고리, 후기를 입력받아 게시글 데이터 등록</li>
  <li>여행지 사진 확장자는 webp, png, jpg로 제한</li>
  <li>여행지 장소는 모달창에서 검색할 때 카카오맵 API에서 가져온 데이터를 선택</li>
  <li>방문 날짜는 데이트피커 라이브러리를 활용하여 캘린더 UI에서 날짜 선택 가능</li>
  <li>카테고리는 한 가지만 선택 가능</li>
  <li>후기를 한 글자 이상 작성해야 하며, 모든 조건 만족 시 게시글 등록 버튼 활성화</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">게시글 수정</th></tr>
<tr><td>
<ul>
  <li>기존에 저장한 데이터를 불러와 표시</li>
  <li>새로운 사진 등록 시 새로 등록한 사진으로 미리보기 대체</li>
  <li>수정 버튼 클릭 시 변경한 데이터로 게시글 데이터 업데이트</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">내 주변 여행지 찾기(지도)</th></tr>
<tr><td>
<ul>
  <li>카카오 API 사용</li>
  <li>위치 정보 차단 시 서울 지하철 시청역 부근으로 중심 좌표 이동</li>
  <li>위치 정보 허용 시 기기 GPS 정보를 받아 중심 좌표 이동</li>
  <li>서버 게시글 좌표를 받아 지도에 마커 표시</li>
  <li>마커 클릭 시 카드 컴포넌트가 포함된 모달 오픈</li>
  <li>상단 검색 컴포넌트에서 검색한 위치로 좌표 이동</li>
  <li>우측 하단 리스트 토글 버튼 클릭 시 리스트 페이지로 토글</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">내 주변 여행지 찾기(리스트)</th></tr>
<tr><td>
<ul>
  <li>지도 페이지에서 현재 중심 좌표 기준으로 거리 계산</li>
  <li>반경 10km 이내 리뷰를 거리순으로 출력</li>
  <li>하단 토글 버튼을 통해 지도 페이지로 토글</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">인기 여행지 랭킹</th></tr>
<tr><td>
<ul>
  <li>로그인한 유저의 ID를 전역 상태에서 가져옴</li>
  <li>로그인한 유저의 좋아요 데이터를 서버에서 가져와 전역 상태에 저장</li>
  <li>토글 버튼 컴포넌트에서 좋아요 활성화 UI 변경</li>
  <li>좋아요 상태를 전역에서 관리하고, 상태가 변경될 때마다 좋아요 상태 업데이트</li>
  <li>좋아요 핸들러 컴포넌트를 활용하여 좋아요 버튼을 클릭한 유저 ID에 게시글 ID 데이터 업데이트</li>
  <li>한 페이지에 게시글이 5개씩 표시되며, 더보기 버튼 클릭 시 리스트를 더 불러옴(최대 15개까지 노출)</li>
  <li>로그인 전 좋아요 버튼 클릭 시 로그인 유도 모달 오픈</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">나만의 큐레이션</th></tr>
<tr><td>
<ul>
  <li>로그인한 유저의 ID를 전역 상태에서 가져옴</li>
  <li>로그인한 유저의 북마크 데이터를 서버에서 가져와 전역 상태에 저장</li>
  <li>토글 버튼 컴포넌트에서 북마크 활성화 UI 변경</li>
  <li>북마크 상태를 전역에서 관리하고, 상태가 변경될 때마다 북마크 상태 업데이트</li>
  <li>북마크 핸들러 컴포넌트를 활용하여 북마크 버튼을 클릭한 유저 ID에 게시글 ID 데이터 업데이트</li>
  <li>유저가 새로운 게시글을 북마크하거나 취소했을 때, 그 상태를 서버에 반영하여 데이터를 최신 상태로 유지</li>
  <li>북마크한 게시글이 없을 경우 메세지로 안내</li>
</ul>
</td></tr>
<tr><th style="text-align: center; ">게시글 상세 페이지</th></tr>
<tr><td>
<ul>
  <li>로그인한 유저가 작성한 게시글에만 더보기 버튼 표시</li>
  <li>더보기 버튼 클릭 후 수정하기 선택 시 게시글 수정 페이지로 이동</li>
  <li>더보기 버튼 클릭 후 삭제하기 선택 시 게시글 데이터 및 게시글에 연결된 댓글 데이터 삭제 후 마이페이지로 이동</li>
  <li>좋아요와 북마크 버튼 토글 전역 상태 저장</li>
  <li>댓글 입력창은 로그인 상태에서만 활성화</li>
  <li>로그인한 유저가 작성한 댓글에만 더보기 버튼 표시</li>
  <li>댓글 입력 시 실시간으로 화면에 반영</li>
  <li>더보기 버튼 클릭 후 삭제하기 선택 시 댓글 데이터 삭제 후 곧바로 화면에 반영</li>
</ul>
</td></tr>
</table>
<br /><hr /><br />
<h3>🕹️ 테스트 계정 🕹️</h3>
<h4>ID</h4>

```
saveus9@fromreact.com
```

<h4>PASSWORD</h4>

```
likelion10th*
```

</code>
<br />
<hr />
<br />
<h3>🏃 팀 소개 🏃</h3>
<h4>과정을 즐기며, 함께 배우고, 최선을 다하자!</h4>
<br />

<strong>운영 규칙</strong><br />

<table width="100%">
  <tr>
    <td>
    데일리 스크럼
    </td>
    <td>
    매일 오전 공지/조례 직후
    </td>
  </tr>
  <tr>
    <td>
    스프린트 회고
    </td>
    </td>
    <td>
    프로젝트 기간 내 4회 <span style="color: #c0c0c0;">(2일/9일/19일/23일)</span>
    </td>
  </tr>
  <tr>
    <td>
    규칙
    </td>
    </td>
    <td>
    <ul>
    <li>할 수 있는 선에서 최선을 다해서 구현하기</li>
    <li>적극적인 참여와 소통</li>
    <li>결과보다 과정을 중시</li>
    <li>모르는 것이 있다면 적극적으로 물어보기</li>
    </ul>
    </td>
  </tr>
</table>

<br />
<strong>팀원 소개</strong>
<table>
<tr>
<td align="center">
<img src='https://avatars.githubusercontent.com/u/130888050?v=4' alt='정혜수 프로필 사진'/>
</td>
<td align="center"><img src='https://media.discordapp.net/attachments/1276470458463686760/1287994777215827988/2024-06-25_20_53_57.png?ex=66f3921c&is=66f2409c&hm=cda29f22073f320875d53c18c221051046cc7d953d7c549027bec854e3209dc5&=&format=webp&quality=lossless&width=500&height=500' alt='김가현 프로필 사진'/>
</td>
<td align="center">
<img src='https://avatars.githubusercontent.com/u/80378694?v=4' alt='손승우 프로필 사진'/>
</td>
<td align="center"><img src='https://media.discordapp.net/attachments/1276470458463686760/1287994192445964388/image_2.png?ex=66f39191&is=66f24011&hm=651087106984b21df5bac84bb97df9d24bd59c7ca4b72332669cc12155d0ddec&=&format=webp&quality=lossless&width=275&height=278' alt='오성훈 프로필 사진'/></td>
</tr>
<tr>
<td align="center" width="25%">
정혜수
<br/>
<strong>조장/디자인 총괄</strong>
<br/>
<br/>
주어진 상황에 최선을 다하기!
</td>
<td align="center" width="25%">
김가현
<br/>
<strong>스크럼마스터</strong>
<br/>
<br/>
포기하지 말고 할 수 있는 일을 찾아서 할 것
</td>
<td align="center" width="25%">
손승우
<br/>
<strong>발표</strong>
<br/>
<br/>
사용자 입장에서 한번 더 생각하기
</td>
<td align="center" width="25%">
오성훈
<br/>
<strong>기획 총괄</strong>
<br/>
<br/>
포기하지 않고 리액트의 다양한 기능을 사용해 좀더 완성도 있는 프로젝트 수행하기
</td>
</tr>
<tr>
<td align="center">
<ul>
  <li>헤더</li>
  <li>푸터</li>
  <li>홈</li>
  <li>여행지 랭킹 보기</li>
</ul>
</td>
<td align="center">
<ul>
  <li>마이페이지</li>
  <li>게시글 상세</li>
  <li>비밀번호 확인</li>
  <li>회원 탈퇴</li>
</ul>
</td>
<td align="center">
<ul>
  <li>로그인</li>
  <li>내 주변 여행지 찾기</li>
  <li>나만의 큐레이션</li>
</ul>
</td>
<td align="center">
  <ul>
    <li>회원가입 페이지</li>
    <li>게시글 등록 페이지</li>
    <li>게시글 수정 페이지</li>
    <li>회원정보 수정 페이지</li>
    <li>비밀번호 변경 페이지</li>
  </ul>
</td>
</tr>
</table>
<br>
<h3 align="center">♟️ 기술스택 ♟️</h3>

<strong>프론트엔드</strong>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/CSSMODULES-1572B6?style=CSSMODULES&logo=CSSMODULES&logoColor=white">
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=flat&logo=JAVASCRIPT&logoColor=black">
<img src="https://img.shields.io/badge/REACT-61DAFB?style=REACT&logo=REACT&logoColor=white">
<img src="https://img.shields.io/badge/REACT ROUTER-CA4245?style=REACT ROUTER&logo=REACT ROUTER&logoColor=white">
<br>
<img src="https://img.shields.io/badge/ZUSTAND-FF6F61?style=ZUSTAND&logo=ZUSTAND&logoColor=white">
<img src="https://img.shields.io/badge/VITE-646CFF?style=VITE&logo=VITE&logoColor=white">
<img src="https://img.shields.io/badge/FRAMER-0055FF?style=FRAMER&logo=FRAMER&logoColor=white">
<img src="https://img.shields.io/badge/SWIPER-6332F6?style=flat&logo=swiper&logoColor=white">
<br><br>

<strong>백엔드</strong>

<img src="https://img.shields.io/badge/POCKETBASE-B8DBE4?style=POCKETBASE&logo=POCKETBASE&logoColor=black">
<br><br>

<strong>버전 관리</strong>

<img src="https://img.shields.io/badge/Git-F05032?style=Git&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=GitHub&logo=GitHub&logoColor=white">
<br><br>

<strong>디자인 도구 & 개발 환경</strong>

<img src="https://img.shields.io/badge/FIGMA-F24E1E?style=FIGMA&logo=FIGMA&logoColor=white">
<img src="https://img.shields.io/badge/Visual_Studio_Code-269FF0?style=flat">
<br><br>

<strong>커뮤니케이션</strong>

<img src="https://img.shields.io/badge/NOTION-000000?style=NOTION&logo=NOTION&logoColor=white">
<img src="https://img.shields.io/badge/DISCORD-5865F2?style=DISCORD&logo=DISCORD&logoColor=white">
<img src="https://img.shields.io/badge/FIGMA-F24E1E?style=FIGMA&logo=FIGMA&logoColor=white">
<br><br>

<strong>배포 도구</strong>

<img src="https://img.shields.io/badge/NETLIFY-00C7B7?style=NETLIFY&logo=NETLIFY&logoColor=white">
</div>

<h3 align="center">♟️ 기술스택 ♟️</h3>
