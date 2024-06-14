


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

    } else if(pageId === 'lesson-management'){
        loadKeci()
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




// 课次管理相关函数
// 示例数据，课程和课次信息
const courses = [
    { id: 1, name: "计算机科学", teacher: "张老师" },
    { id: 2, name: "数学", teacher: "李老师" },
    { id: 3, name: "英语", teacher: "王老师" }
  ];
  
  const sessions = [
    { id: 101, courseId: 1, name: "计算机科学课程1", date: "2024-06-15", location: "教室A" },
    { id: 102, courseId: 1, name: "计算机科学课程2", date: "2024-06-17", location: "教室B" },
    { id: 103, courseId: 2, name: "数学课程1", date: "2024-06-16", location: "教室C" },
    { id: 104, courseId: 3, name: "英语课程1", date: "2024-06-18", location: "教室D" }
  ];
  

function loadKeci() {
    const courseTable = document.getElementById('keci-table').getElementsByTagName('tbody')[0];
    //TODO(qhr) 从后端获得所有课程数据存到courses
     //TODO(qhr) 从后端获得所有课次数据存到sessions
    // 填充课程表格
    courses.forEach(course => {
        const row = courseTable.insertRow();
        row.insertCell(0).textContent = course.id;
        row.insertCell(1).textContent = course.name;
        row.insertCell(2).textContent = course.teacher;
        row.onclick = () => filterSessions(course.id);
        row.style.cursor = 'pointer'; // 鼠标悬停效果
    });

    // 默认显示第一个课程的课次
    filterSessions(courses[0].id);
}
  
  // 根据课程ID筛选课次并填充表格
  function filterSessions(courseId) {
    const sessionTable = document.getElementById('session-table').getElementsByTagName('tbody')[0];
    sessionTable.innerHTML = ''; // 清空课次表格
   
    const filteredSessions = sessions.filter(session => session.courseId === courseId);
    filteredSessions.forEach(session => {
      const row = sessionTable.insertRow();
      row.insertCell(0).textContent = session.id;
      row.insertCell(1).textContent = courses.find(course => course.id === session.courseId).name;
      row.insertCell(2).textContent = session.date;
      row.insertCell(3).textContent = session.location;
      row.onclick = () => showSessionDetails(session);
      row.style.cursor = 'pointer'; // 鼠标悬停效果
    });
  }
  
  // 显示课次详情
  function showSessionDetails(session) {
    alert(`课次名称：${session.name}\n日期：${session.date}\n地点：${session.location}`);
  }
  
  // 显示添加课次表单模态框
  function showAddForm() {
    const modal = document.getElementById('add-modal');
    modal.style.display = 'block';
  }
  
  // 关闭添加课次表单模态框
  function closeAddForm() {
    const modal = document.getElementById('add-modal');
    modal.style.display = 'none';
  }
  
  // 提交添加课次表单
  const addSessionForm = document.getElementById('add-session-form');
  addSessionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const sessionName = document.getElementById('session-name').value;
    const sessionDate = document.getElementById('session-date').value;
    const sessionLocation = document.getElementById('session-location').value;
  
    //TODO(qhr) 后端新增课次 并且更新sessions
    const newSession = {
      id: sessions.length + 1,
      courseId: 1, // 这里假设默认为第一个课程，实际应根据用户选择课程
      name: sessionName,
      date: sessionDate,
      location: sessionLocation
    };
  
    sessions.push(newSession);
    closeAddForm();
    filterSessions(newSession.courseId); // 刷新课次表格
  });
  



// 示例数据，资源信息
const resources = [
    { id: 1, sessionName: "课程A", name: "课件1", content: "这是课件1的内容...", issue: "关于课件1的问题..." },
    { id: 2, sessionName: "课程A", name: "视频教程", content: "视频教程内容...", issue: "视频教程中的疑问..." },
    { id: 3, sessionName: "课程B", name: "课堂讨论记录", content: "讨论记录内容...", issue: "讨论中的问题..." }
  ];
  
  // 页面加载完毕后初始化资源列表
  window.onload = function() {
    //TODO(qhr) 从后端获得所有资源数据存到resources
    const resourceTable = document.getElementById('resource-table').getElementsByTagName('tbody')[0];
    populateResourceTable(resources);
  };
  
  // 填充资源表格
  function populateResourceTable(resources) {
    const resourceTable = document.getElementById('resource-table').getElementsByTagName('tbody')[0];
    resourceTable.innerHTML = ''; // 清空表格
  
    resources.forEach(resource => {
      const row = resourceTable.insertRow();
      row.insertCell(0).textContent = resource.id;
      row.insertCell(1).textContent = resource.name;
      row.insertCell(2).textContent = resource.issue;
      row.insertCell(3).textContent = resource.content;
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '删除';
      deleteButton.onclick = () => deleteResource(resource.id);
      
      const cell = row.insertCell(4);
      cell.appendChild(deleteButton);
    });
  }
  
  // 搜索特定课次的资源
  function filterBySession() {
    const sessionNameInput = document.getElementById('session-name-input');
    const sessionName = sessionNameInput.value.trim();
    
    if (sessionName === '') {
      populateResourceTable(resources); // 如果输入为空，则显示所有资源
      return;
    }
    
    const filteredResources = resources.filter(resource => resource.sessionName === sessionName);
    populateResourceTable(filteredResources);
  }
  
  // 显示添加资源模态框
  function showAddForm() {
    const modal = document.getElementById('add-resource-modal');
    modal.style.display = 'block';
  }
  
  // 关闭添加资源模态框
  function closeAddForm() {
    const modal = document.getElementById('add-resource-modal');
    modal.style.display = 'none';
  }
  
  // 提交添加资源表单
  const addResourceForm = document.getElementById('add-resource-form');
  addResourceForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const resourceName = document.getElementById('resource-name').value;
    const resourceContent = document.getElementById('resource-content').value;
    const resourceIssue = document.getElementById('resource-issue').value;
  
    //TODO(qhr)
    const newResource = {
      id: resources.length + 1,
      sessionName: "新课程", // 模拟新增资源时无课次名称，默认设定为新课程
      name: resourceName,
      content: resourceContent,
      issue: resourceIssue
    };
  
    resources.push(newResource);
    closeAddForm();
    populateResourceTable(resources); // 刷新资源表格
  });
  
  // 删除资源
  function deleteResource(resourceId) {
    const confirmed = confirm('确定要删除此资源吗？');
    if (confirmed) {
        //TODO(qhr)
      const index = resources.findIndex(resource => resource.id === resourceId);
      if (index !== -1) {
        resources.splice(index, 1);
        populateResourceTable(resources); // 刷新资源表格
      }
    }
  }
  
  