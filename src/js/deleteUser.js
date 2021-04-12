export default function deleteUser(baseUrl, renderUserList, userList) {
    this.userDeleteButton = document.querySelector('.user-delete-button');
    this.baseUrl = baseUrl;
    this.renderUserList = renderUserList;
    this.userList = userList;

    this.onUserDeleteHandler = () => {
        const activedUser = Array.prototype.filter.call(this.userList.childNodes, (user) => user.nodeName === 'BUTTON' && user.classList.contains('active'))[0];
        fetch(`${this.baseUrl}/api/users/${activedUser.id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        })
        .then(() => {
            alert(`${activedUser.textContent}를 삭제하였습니다.`);
            this.renderUserList();
        })
        .catch(err => alert(err));
    }

    this.userDeleteButton.addEventListener('click', this.onUserDeleteHandler);
}
