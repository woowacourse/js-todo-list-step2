export default function createUser(baseUrl, renderUser) {
    this.userCreateButton = document.querySelector('.user-create-button');
    this.renderUser = renderUser;
    this.baseURL = baseUrl;

    this.inputUserName = () => {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
        if (userName.length < 2) {
            alert("User의 이름은 최소 2글자 이상이어야 한다.");
            return this.inputUserName();
        }
        return userName;
    }

    this.onUserCreateHandler = () => {
        const userName = this.inputUserName();
        fetch(`${this.baseURL}/api/users`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            'name': `${userName}`
            })
        })
        .then(response => response.json())
        .then(result => {
            this.renderUser(result);
        })
        .catch(err => alert(err));
    }

    this.userCreateButton.addEventListener('click', this.onUserCreateHandler);
}

