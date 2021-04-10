export const templateUser = (_id, name) => {
    return `<button class="ripple" data-id="${_id}">${name}</button>`;
}

export const templateTodoItem = (_id, contents) => {
    return '<li class="" data-id="' + _id + '"><div class="view">'
        + '<input class="toggle" type="checkbox" data-action="toggleTodo" toggletodo="click">'
        + '<label class="label" data-action="toggleEditingTodo" toggleeditingtodo="dblclick">'
        + '<select class="chip select" data-action="selectPriority" selectpriority="change">'
        + '<option value="NONE" selected="">순위</option>'
        + '<option value="FIRST">1순위</option>'
        + '<option value="SECOND">2순위</option>'
        + '</select>' + contents + '</label>'
        + '<button class="destroy" data-action="deleteTodo" deletetodo="click"></button>'
        + '</div>'
        + '<input class="edit" value="' + contents + '">'
        + '</li>';
}

export const templateChipFirst = '<span class="chip primary">1순위</span>';

export const templateChipSecond = '<span class="chip secondary">2순위</span>';