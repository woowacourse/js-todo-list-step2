import * as UserList from './component/userList/UserListComponent.js';
import * as TodoListInput from './component/userList/TodoListInputComponent.js';

// 초기 이벤트 설정하기
(function() {
    UserList.addEvent();
    TodoListInput.addEvent();
})();

// 초기 데이터 불러오기
(function() {
    UserList.getUsers();
})();

