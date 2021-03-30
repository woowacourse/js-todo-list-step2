import * as userList from './component/userList/userList.js';

// 초기 이벤트 설정하기
(function() {
    userList.addEvent();
})();

// 초기 데이터 불러오기
(function() {
    userList.getUsers();
})();




