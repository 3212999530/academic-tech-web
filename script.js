


// script.js
document.addEventListener('DOMContentLoaded', function() {
    //TODO(qhr) 根据登录身份修改此处
    const userType = 'teacher'; // or 'teacher', this should be dynamically determined based on login
    if (userType === 'student') {
        document.getElementById('student-info').classList.add('active');
        loadInfo('student');
    } else {
        document.getElementById('teacher-info').classList.add('active');
        loadInfo('teacher');
    }
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.info-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'student-info') {
        loadInfo('student');
    } else if (pageId === 'teacher-info') {
        loadInfo('teacher');
    } else if (pageId === 'student-archives') {

    } 
}

function enableEdit(userType) {
    const fields = document.querySelectorAll(`#${userType}-info input, #${userType}-info textarea`);
    fields.forEach(field => {
        field.disabled = false;
    });
}

function loadInfo(type) {
    //TODO(qhr) 根据登录身份修改此处

    if (type === 'student') {
        //TODO(qhr) 根据登录身份修改此处
        // 模拟数据，可以替换为从服务器获取的数据
        const studentInfo = {
            name: '张三',
            id: '1234567890',
            gender: '男',
            major: '计算机科学111',
            family: '张三的家庭信息'
        };

        // 将数据填充到页面上
        document.getElementById('student-name').value = studentInfo.name;
        
        document.getElementById('student-id').value = studentInfo.id;
        document.getElementById('student-gender').value = studentInfo.gender;
        document.getElementById('student-major').value = studentInfo.major;
        document.getElementById('student-family').value = studentInfo.family;
    }else if (type === 'teacher') {
        //TODO(qhr) 根据登录身份修改此处

        // 模拟数据，可以替换为从服务器获取的数据
        const teacherInfo = {
            name: '李四',
            title: '校长',
            major: '物理',
        };

        // 将数据填充到页面上
        document.getElementById('teacher-name').value = teacherInfo.name;
        document.getElementById('teacher-title').value = teacherInfo.title;
        document.getElementById('teacher-major').value = teacherInfo.major;
    }

}

function saveInfo(userType) {
    const fields = document.querySelectorAll(`#${userType}-info input, #${userType}-info textarea`);
    fields.forEach(field => {
        field.disabled = true;
    });

    //TODO(qhr) 收集信息发送http请求
    alert('信息已保存');
}

function searchStudent() {
    const studentName = document.getElementById('search-student-name').value;
    const studentInfoTable = document.getElementById('student-info-table').getElementsByTagName('tbody')[0];

    // 清空之前的搜索结果
    studentInfoTable.innerHTML = '';

    // 模拟数据，可以替换为从服务器获取的数据
    const students = [
        { name: '张三', gender: '男', major: '计算机科学', family: '张三的家庭信息' },
        { name: '李四', gender: '女', major: '物理', family: '李四的家庭信息' },
        // 添加更多学生数据
    ];

    // 查找匹配的学生
    const student = students.find(s => s.name === studentName);
    if (student) {
        const newRow = studentInfoTable.insertRow();
        const nameCell = newRow.insertCell(0);
        const genderCell = newRow.insertCell(1);
        const majorCell = newRow.insertCell(2);
        const familyCell = newRow.insertCell(3);

        nameCell.textContent = student.name;
        genderCell.textContent = student.gender;
        majorCell.textContent = student.major;
        familyCell.textContent = student.family;
    } else {
        alert('未找到学生信息');
    }
}


function addCourse() {
    
    const courseName = document.getElementById('course-name').value;
    const courseDescription = document.getElementById('course-description').value;
    const teacherName = document.getElementById('teacher-name').value;
    const teacherTitle = document.getElementById('teacher-title').value;
    const teacherMajor = document.getElementById('teacher-major').value;

    const courseTable = document.getElementById('course-table').getElementsByTagName('tbody')[0];

    //TODO(qhr) 发送post，并获得数据库最新数据渲染到前端，以下是为了测试而直接插入

    const newRow = courseTable.insertRow();
    const nameCell = newRow.insertCell(0);
    const descriptionCell = newRow.insertCell(1);
    const teacherNameCell = newRow.insertCell(2);
    const teacherTitleCell = newRow.insertCell(3);
    const teacherMajorCell = newRow.insertCell(4);
    const actionCell = newRow.insertCell(5);

    nameCell.textContent = courseName;
    descriptionCell.textContent = courseDescription;
    teacherNameCell.textContent = teacherName;
    teacherTitleCell.textContent = teacherTitle;
    teacherMajorCell.textContent = teacherMajor;
    actionCell.innerHTML = '<button onclick="deleteCourse(this)">删除</button> <button onclick="chooseCourse(this)">选课</button>';

    // Clear the form
    document.getElementById('add-course-form').reset();
}

function deleteCourse(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    //TODO(qhr)
}

function chooseCourse(button) {
    //TODO(qhr)
}


function submitLeaveRequest() {
    const courseName = document.getElementById('leave-course-name').value;
    const leaveReason = document.getElementById('leave-reason').value;
    const startTime = document.getElementById('leave-start-time').value;
    const endTime = document.getElementById('leave-end-time').value;

    const leaveTable = document.getElementById('leave-management-table').getElementsByTagName('tbody')[0];
    //TODO(qhr) 发送post，并获得数据库最新数据渲染到前端，以下是为了测试而直接插入
    const newRow = leaveTable.insertRow();

    const nameCell = newRow.insertCell(0);
    const reasonCell = newRow.insertCell(1);
    const startTimeCell = newRow.insertCell(2);
    const endTimeCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    nameCell.textContent = courseName;
    reasonCell.textContent = leaveReason;
    startTimeCell.textContent = startTime;
    endTimeCell.textContent = endTime;
    actionCell.innerHTML = '<button onclick="approveLeave(this)">通过</button> <button onclick="rejectLeave(this)">不通过</button>';

    // Clear the form
    document.getElementById('leave-form').reset();
}


function approveLeave(button) {
    const row = button.parentNode.parentNode;
    row.style.backgroundColor = 'lightgreen';
    //TODO(qhr)
}

function rejectLeave(button) {
    const row = button.parentNode.parentNode;
    row.style.backgroundColor = 'lightcoral';
    //TODO(qhr)
}



function addStudentRecord() {
    const studentName = prompt("请输入学生姓名");
    const studentGender = prompt("请输入学生性别");
    const studentMajor = prompt("请输入学生专业");
    const studentFamily = prompt("请输入家庭信息");

    const studentTable = document.getElementById('student-archives-table').getElementsByTagName('tbody')[0];

    const newRow = studentTable.insertRow();

    const nameCell = newRow.insertCell(0);
    const genderCell = newRow.insertCell(1);
    const majorCell = newRow.insertCell(2);
    const familyCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    nameCell.textContent = studentName;
    genderCell.textContent = studentGender;
    majorCell.textContent = studentMajor;
    familyCell.textContent = studentFamily;
    actionCell.innerHTML = '<button onclick="editStudentRecord(this)">编辑</button> <button onclick="deleteStudentRecord(this)">删除</button>';
}

function editStudentRecord(button) {
    const row = button.parentNode.parentNode;
    const nameCell = row.cells[0];
    const genderCell = row.cells[1];
    const majorCell = row.cells[2];
    const familyCell = row.cells[3];

    const newName = prompt("请输入学生姓名", nameCell.textContent);
    const newGender = prompt("请输入学生性别", genderCell.textContent);
    const newMajor = prompt("请输入学生专业", majorCell.textContent);
    const newFamily = prompt("请输入家庭信息", familyCell.textContent);

    nameCell.textContent = newName;
    genderCell.textContent = newGender;
    majorCell.textContent = newMajor;
    familyCell.textContent = newFamily;
}

function deleteStudentRecord(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}



function addScholarship() {
    const name = document.getElementById('scholarship-name').value;
    const recipient = document.getElementById('scholarship-recipient').value;
    const reason = document.getElementById('scholarship-reason').value;
    const date = document.getElementById('scholarship-date').value;

    const table = document.getElementById('scholarship-table').getElementsByTagName('tbody')[0];

    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const recipientCell = newRow.insertCell(1);
    const reasonCell = newRow.insertCell(2);
    const dateCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    nameCell.textContent = name;
    recipientCell.textContent = recipient;
    reasonCell.textContent = reason;
    dateCell.textContent = date;
    actionCell.innerHTML = '<button onclick="editRecord(this)">编辑</button> <button onclick="deleteRecord(this)">删除</button>';

    document.getElementById('scholarship-form').reset();
}

function addGrant() {
    const name = document.getElementById('grant-name').value;
    const recipient = document.getElementById('grant-recipient').value;
    const reason = document.getElementById('grant-reason').value;
    const date = document.getElementById('grant-date').value;

    const table = document.getElementById('grant-table').getElementsByTagName('tbody')[0];

    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const recipientCell = newRow.insertCell(1);
    const reasonCell = newRow.insertCell(2);
    const dateCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    nameCell.textContent = name;
    recipientCell.textContent = recipient;
    reasonCell.textContent = reason;
    dateCell.textContent = date;
    actionCell.innerHTML = '<button onclick="editRecord(this)">编辑</button> <button onclick="deleteRecord(this)">删除</button>';

    document.getElementById('grant-form').reset();
}

function addDisciplineRecord() {
    const recipient = document.getElementById('discipline-recipient').value;
    const reason = document.getElementById('discipline-reason').value;
    const date = document.getElementById('discipline-date').value;

    const table = document.getElementById('discipline-table').getElementsByTagName('tbody')[0];

    const newRow = table.insertRow();

    const recipientCell = newRow.insertCell(0);
    const reasonCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    recipientCell.textContent = recipient;
    reasonCell.textContent = reason;
    dateCell.textContent = date;
    actionCell.innerHTML = '<button onclick="editRecord(this)">编辑</button> <button onclick="deleteRecord(this)">删除</button>';

    document.getElementById('discipline-form').reset();
}

function editRecord(button) {
    const row = button.parentNode.parentNode;
    const cells = row.cells;

    for (let i = 0; i < cells.length - 1; i++) {
        const newValue = prompt("请输入新的值", cells[i].textContent);
        if (newValue !== null) {
            cells[i].textContent = newValue;
        }
    }
}

function deleteRecord(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
