


const teacher="teacher"
const student="student"

var userType = teacher

async function initializePage() {
    // userType = await getUserType()
    console.log(userType)

    if (userType == 'student') {
        document.getElementById('tea').style.display = 'none';
        document.getElementById('stu').style.display = 'block';
        document.getElementById('lm').style.display = 'none';
        document.getElementById('sa').style.display = 'none';
        document.getElementById('add-course-form').style.display = 'none';
        document.getElementById('add-resource-modal').style.display = 'none';
        document.getElementById('add-modal').style.display = 'none';
        await loadInfo('student');
    } else if (userType == 'teacher') {
        document.getElementById('stu').style.display = 'none';
        document.getElementById('tea').style.display = 'block';
        document.getElementById('sel').style.display = 'none';
        document.getElementById('sl').style.display = 'none';
        await loadInfo('teacher');
    }

}

async function showPage(pageId) {
    const pages = document.querySelectorAll('.info-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'student-info') {
        await loadInfo('student');
    } else if (pageId === 'teacher-info') {
        await loadInfo('teacher');
    } else if (pageId === 'student-archives') {
        await loadArch();
    } else if( pageId === 'leave-management'){
        await loadLeave();
    }else if( pageId === 'course-management'){
        await loadCourse();
    }else if( pageId === 'selected-courses'){
        await loadSelected();
    }else if (pageId=="lesson-management"){
        await loadLesson()
    }else if (pageId=="resource-info"){
        await loadResource()
    }
}


async function loadArch(){
    // 清空之前的数据
    const archTable = document.getElementById('student-archives-table').getElementsByTagName('tbody')[0];
    archTable.innerHTML = '';
    // 从后端获取学生档案数据
    const archs = await getStudentsList();
 
    archs.forEach(arch => {
        const row = archTable.insertRow();
        row.insertCell(0).textContent = arch.studentName;
        row.insertCell(1).textContent = arch.studentGender == 1 ? '男' : '女';
        row.insertCell(2).textContent = arch.studentAcademicInfo;
        row.insertCell(3).textContent = arch.studentFamilyInfo;

        // 创建删除按钮
        const dropButton = document.createElement('button');
        dropButton.textContent = '删除';
        dropButton.onclick = () => dropArch(arch.studentId);
        row.insertCell(4).appendChild(dropButton);

        row.style.cursor = 'pointer'; // 鼠标悬停效果
    });
}

async function dropArch(studentId) {
    await deleteStudentInfo(studentId);
    await loadArch()
}

async function loadSelected() {
    // 清空之前的数据
    const courseTable = document.getElementById('selected-course-table').getElementsByTagName('tbody')[0];
    courseTable.innerHTML = '';
    // 从后端获取已选课程数据
    const courses = [];
    const chooses = await getChooseList(await getUserTargetId());
    chooses.forEach(choose => {
        courses.push(choose.course);
    });

    courses.forEach(course => {
        const row = courseTable.insertRow();
        const teacher = course.teacher;
        row.insertCell(0).textContent = course.courseName;
        row.insertCell(1).textContent = course.courseContent;
        row.insertCell(2).textContent = teacher.teacherName;
        row.insertCell(3).textContent = teacher.teacherPosition;
        row.insertCell(4).textContent = teacher.teacherTeachingInfo;
        // 创建退课按钮
        const dropButton = document.createElement('button');
        dropButton.textContent = '退课';
        dropButton.onclick = () => dropCourse(course.courseId);
        row.insertCell(5).appendChild(dropButton);

        row.style.cursor = 'pointer'; // 鼠标悬停效果
    });

}

async function dropCourse(courseId) {
    // 调用后端API进行退课操作
    await deleteChooseInfo(await getUserTargetId(), courseId)
    await loadSelected()
}



function enableEdit(userType) {
    const fields = document.querySelectorAll(`#${userType}-info input, #${userType}-info textarea`);
    fields.forEach(field => {
        field.disabled = false;
    });
}

async function loadInfo(type) {
    const targetId = 12;//await getUserTargetId();
    if (type === 'student') {
        const info = {
            name: "info.studentName",
            id: "info.studentId",
            gender: '女',
            major: "info.studentAcademicInfo",
            family: "info.studentFamilyInfo"
        }//await getStudentInfo(targetId);
        const studentInfo = {
            name: info.studentName,
            id: info.studentId,
            gender: info.studentGender == 1 ? '男' : '女',
            major: info.studentAcademicInfo,
            family: info.studentFamilyInfo
        };

        // 将数据填充到页面上
        document.getElementById('student-name').value = studentInfo.name;
        
        document.getElementById('student-id').value = studentInfo.id;
        document.getElementById('student-gender').value = studentInfo.gender;
        document.getElementById('student-major').value = studentInfo.major;
        document.getElementById('student-family').value = studentInfo.family;
    }else if (type === 'teacher') {
        const info = {
            name: "info.studentName",
            id: "info.studentId",
            gender: '女',
            major: "info.studentAcademicInfo",
            family: "info.studentFamilyInfo"
        }//await getTeacherInfo(targetId)
        const teacherInfo = {
            name: info.teacherName,
            title: info.teacherPosition,
            major: info.teacherTeachingInfo,
        };

        // 将数据填充到页面上
        document.getElementById('teacher-name').value = teacherInfo.name;
        document.getElementById('teacher-title').value = teacherInfo.title;
        document.getElementById('teacher-major').value = teacherInfo.major;
    }

}

async function saveInfo(userType) {
    const fields = document.querySelectorAll(`#${userType}-info input, #${userType}-info textarea`);
    fields.forEach(field => {
        field.disabled = true;
    });

    if (userType === 'student') {
        const studentName = document.getElementById('student-name').value
        const studentId = document.getElementById('student-id').value;
        const studentGender = document.getElementById('student-gender').value;
        const studentFamily = document.getElementById('student-family').value;
        const studentInfo = await getStudentInfo(studentId);
        await putStudentInfo(studentInfo.studentId, studentName, studentGender == '男' ? true : false, studentInfo.studentAcademicInfo, studentFamily);
    }
    else if (userType === 'teacher') {
        const teacherName = document.getElementById('teacher-name').value;
        const teacherTitle = document.getElementById('teacher-title').value;
        const teacherMajor = document.getElementById('teacher-major').value;
        const teacherInfo = await getTeacherByName(teacherName);
        await putTeacherInfo(teacherInfo.teacherId, teacherName, teacherTitle, teacherMajor);
    }
}

async function searchStudent() {
    const studentName = document.getElementById('search-student-name').value;
    const studentInfoTable = document.getElementById('student-info-table').getElementsByTagName('tbody')[0];

    // 清空之前的搜索结果
    studentInfoTable.innerHTML = '';

    // 通过名称查找匹配的学生
    const student = await getStudentByName(studentName);

    if (student) {
        const newRow = studentInfoTable.insertRow();
        const nameCell = newRow.insertCell(0);
        const genderCell = newRow.insertCell(1);
        const majorCell = newRow.insertCell(2);
        const familyCell = newRow.insertCell(3);

        nameCell.textContent = student.studentName;
        genderCell.textContent = student.studentGender == 1 ? '男' : '女';
        majorCell.textContent = student.studentAcademicInfo;
        familyCell.textContent = student.studentFamilyInfo;
    } else {
        alert('未找到学生信息');
    }
}

async function loadCourse(){
    const courseTable = document.getElementById('course-table').getElementsByTagName('tbody')[0];
    courseTable.innerHTML = '';

    var courses = await getCoursesList();

    if (userType == teacher) { // 教师只能查看自己的课程
        courses = courses.filter(async course => course.teacher.teacherId == await getUserTargetId());
    }

    courses.forEach(course => {
        const localTeacher = course.teacher;
        const row = courseTable.insertRow();
        row.insertCell(0).textContent = course.courseName;
        row.insertCell(1).textContent = course.courseContent;
        row.insertCell(2).textContent = localTeacher.teacherName;
        row.insertCell(3).textContent = localTeacher.teacherTeachingInfo;
        row.insertCell(4).textContent = localTeacher.teacherPosition;

        if (userType == teacher) {
            const dropButton = document.createElement('button');
            dropButton.textContent = '删除';
            dropButton.onclick = () => {
                deleteCourse(course.courseName);
                row.parentNode.removeChild(row);
            };
            row.insertCell(5).appendChild(dropButton);
        }
        else if (userType == student) {
            const selectButton = document.createElement('button');
            selectButton.textContent = '选课';
            selectButton.onclick = () => chooseCourse(course.courseName);
            row.insertCell(5).appendChild(selectButton);
        }
        

    });
}
async function addCourse() {
    
    const courseName = document.getElementById('course-name').value;
    const courseDescription = document.getElementById('course-description').value;
    const teacherName = document.getElementById('teacher-name').value;

    const teacher = await getTeacherByName(teacherName);
    await postCourseInfo(teacher.teacherId, courseName, courseDescription)

    await loadCourse();

    // Clear the form
    document.getElementById('add-course-form').reset();
}

async function deleteCourse(courseName) {
    const course = await getCourseByName(courseName);

    //发送delete请求
    await deleteCourseInfo(course.courseId);
}

async function chooseCourse(courseName) {
    const courses = await getCoursesList();
    const course = courses.find(c => c.courseName === courseName);
    //发送选课请求
    const studentId = await getUserTargetId();
    const student = await getStudentInfo(studentId);
    await chooseCourseInfo(student, course, 0);
}

async function loadLeave() {
    const leaveTable = document.getElementById('leave-management-table').getElementsByTagName('tbody')[0];
    leaveTable.innerHTML = '';

    const leaves = await getAbsenceListByStudent(await getUserTargetId());
    

    leaves.forEach(leave => {
        const row = leaveTable.insertRow();
        const beginTime = leave.absenceInterval.split(' - ')[0];
        const endTime = leave.absenceInterval.split(' - ')[1];
        row.insertCell(0).textContent = leave.absenceStatus == 0 ? '未处理' : leave.absenceStatus == 1 ? '已通过' : '未通过';
        row.insertCell(1).textContent = leave.absenceReason;
        row.insertCell(2).textContent = beginTime;
        row.insertCell(3).textContent = endTime;

        const dropButton = document.createElement('button');
        dropButton.textContent = '删除';
        dropButton.onclick = () => deleteLeave(leave);

        
        const approveButton = document.createElement('button');
        approveButton.textContent = '通过';
        approveButton.onclick = () => approveLeave(leave);

        
        const rejectButton = document.createElement('button');
        rejectButton.textContent = '不通过';
        rejectButton.onclick = () => rejectLeave(leave);

        row.insertCell(4).appendChild(dropButton);
        row.insertCell(5).appendChild(approveButton);
        row.insertCell(6).appendChild(rejectButton);
    });
}
async function submitLeaveRequest() {
    const courseName = document.getElementById('leave-course').value;
    const leaveReason = document.getElementById('leave-reason').value;
    const startTime = document.getElementById('leave-start-time').value;
    const endTime = document.getElementById('leave-end-time').value;

    const leaveTable = document.getElementById('leave-management-table').getElementsByTagName('tbody')[0];
    const courseInfo = await getCourseByName(courseName);
    const teacher = courseInfo.teacher;

    await postAbsenceInfo(await getUserTargetId(), teacher.teacherId, leaveReason, startTime + ' - ' + endTime);
    await loadLeave()

    // Clear the form
    document.getElementById('leave-form').reset();
}


async function approveLeave(leave) {
    await updateAbsenceInfo(leave.absenceId, 1, await getUserTargetId());
    await loadLeave()
}

async function rejectLeave(leave) {
    await updateAbsenceInfo(leave.absenceId, 2, await getUserTargetId());
    await loadLeave()
}

async function deleteLeave(leave) {
    if (userType === student) {
        await deleteAbsenceInfoByStudent(await getUserTargetId(), leave.absenceId);
    }
    else if (userType === teacher) {
        alert('教师无法删除学生请假信息');
    }
    await loadLeave()
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

//Authored by Fleurs

async function getUserType() {
    const userType = fetch('/userType', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            alert('获取用户类型失败');
        }
    }).then(data => {
        return data;
    });
    return userType;
}

async function getUserTargetId() {
    const targetId = fetch('/userTargetId', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            alert('获取用户ID失败');
        }
    }).then(data => {
        return data;
    });
    return targetId;
}

async function getStudentsList() {
    const students = fetch('/students/list', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取学生信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return students;
}

async function getStudentByName(studentName) {
    const students = await getStudentsList();
    return students.find(s => s.studentName === studentName);
}

async function getStudentInfo(studentId) {
    const student = fetch(`/students/${studentId}`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取学生信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return student;
}

function postStudentInfo(studentName, studentGender, studentAcademicInfo, studentFamilyInfo) {
    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            studentId,
            studentName,
            studentGender,
            studentAcademicInfo,
            studentFamilyInfo,
            absences: [],
            chooses: []
        })
    });
}

async function putStudentInfo(studentId, studentName, studentGender, studentAcademicInfo, studentFamilyInfo) {
    fetch(`/students/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            studentId,
            studentName,
            studentGender,
            studentAcademicInfo,
            studentFamilyInfo,
            absences: [],
            chooses: []
        })
    }).then(response => {
        if (response.ok) {
            alert('信息已保存');
            return response.json()
        }
        else {
            alert(JSON.stringify(response.json()));
            alert('更新学生信息失败');
        }
    });
}

async function deleteStudentInfo(studentId) {
    fetch(`/students/${studentId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            alert('学生已删除');
            return response.json();
        } else {
            alert('删除学生信息失败');
        }
    });
}

async function getTeachersList() {
    const teachers = fetch('/teachers/list', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取教师信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return teachers;
}

async function getTeacherByName(teacherName) {
    const teachers = await getTeachersList();
    return teachers.find(t => t.teacherName === teacherName);
}

async function getTeacherInfo(teacherId) {
    const teacher = fetch(`/teachers/${teacherId}`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取教师信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return teacher;
}

function postTeacherInfo(teacherName, teacherPosition, teacherTeachingInfo) {
    fetch('/teachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacherName,
            teacherPosition,
            teacherTeachingInfo
        })
    });
}

async function putTeacherInfo(teacherId, teacherName, teacherPosition, teacherTeachingInfo) {
    fetch(`/teachers/${teacherId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacherId,
            teacherName,
            teacherPosition,
            teacherTeachingInfo
        })
    }).then(response => {
        if (response.ok) {
            alert('信息已保存');
            return response.json();
        } else {
            alert('更新教师信息失败');
        }
    });
}

function deleteTeacherInfo(teacherId) {
    fetch(`/teachers/${teacherId}`, {
        method: 'DELETE'
    });
}

async function getCoursesList() {
    const courses = fetch('/courses/list', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取课程信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return courses;
}

async function getCourseByName(courseName) {
    const courses = await getCoursesList();
    return courses.find(c => c.courseName === courseName);
}

function getCourseInfo(courseId) {
    const course = fetch(`/courses/${courseId}`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取课程信息失败');
        }
    }).then(data => {
        return data;
    });
    return course;
}

async function postCourseInfo(teacherId, courseName, courseContent) {
    fetch('/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacherId,
            courseName,
            courseContent,
            chooses: [],
            classes: []
        })
    }).then(response => {
        if (response.ok) {
            alert('课程已添加');
            return response.json();
        } else {
            alert('添加课程失败');
        }
    });
}

function putCourseInfo(courseId, teacherId, courseName, courseContent) {
    fetch(`/courses/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacherId,
            courseName,
            courseContent
        })
    });
}

async function deleteCourseInfo(courseId) {
    fetch(`/courses/${courseId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            alert('课程已删除');
            return response.json();
        }
        else {
            alert('删除课程失败');
        }
    });
}

function getClassesList() {
    const classes = fetch('/classes/list', {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取课次信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return classes;
}

function getClassesByCourse(courseId) {
    fetch(`/classes/course/${courseId}`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取课次信息失败');
        }
    }).then(data => {
        return data;
    });
}

async function postClassInfo(courseId, classStartTime, classEndTime) {
    fetch('/classes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseId,
            classStartTime,
            classEndTime
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('创建课次失败')
        }
    })
}

function deleteClassInfo(classId) {
    fetch(`/classes/${classId}`, {
        method: 'DELETE'
    });
}

async function getChooseList(studentId) {
    const chooses = fetch(`/students/${studentId}/courses`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取选课信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return chooses;
}

async function chooseCourseInfo(student, course, chooseScore) {
    fetch(`/students/${student.studentId}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student,
            course,
            chooseScore
        })
    }).then(response => {
        if (response.ok) {
            alert('选课成功');
            return response.json();
        } else {
            alert('选课失败');
        }
    });
}

async function deleteChooseInfo(studentId, courseId) {
    fetch(`/students/${studentId}/courses/${courseId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            alert('退课成功');
            return response.json();
        } else {
            alert('退课失败');
        }
    });
}

async function getAbsenceListByStudent(studentId) {
    const absences = fetch(`/absences/student/${studentId}/absences`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取请假信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return absences;
}

async function getAbsenceListByTeacher(teacherId) {
    const absences = fetch(`/absences/teacher/${teacherId}/absences`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取请假信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return absences;
}

async function postAbsenceInfo(studentId, teacherId, absenceReason, absenceInterval) {
    fetch(`/absences/student/${studentId}/absences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacherId,
            absenceReason,
            absenceInterval,
            absenceStatus: 0
        })
    }).then(response => {
        if (response.ok) {
            alert('请假成功');
            return response.json();
        } else {
            alert('请假失败');
        }
    });
}

async function updateAbsenceInfo(absenceId, absenceStatus, teacherId) {
    const absences = await getAbsenceListByTeacher(await getUserTargetId());
    const absence = absences.find(a => a.absenceId === absenceId);
    fetch(`/absences/teacher/${teacherId}/absences/${absenceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            teacherId: absence.teacherId,
            absenceReason: absence.absenceReason,
            absenceInterval: absence.absenceInterval,
            absenceStatus
        })
    }).then(response => {
        if (response.ok) {
            alert('请假状态已更新');
            return response.json();
        } else {
            alert('更新请假状态失败');
        }
    });
}

async function deleteAbsenceInfoByStudent(studentId, absenceId) {
    fetch(`/absences/student/${studentId}/absences/${absenceId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            alert('请假已删除');
            return response.json();
        } else {
            alert('删除请假信息失败');
        }
    });
}

async function deleteAbsenceInfoByTeacher(teacherId, absenceId) {
    fetch(`/absences/teacher/${teacherId}/absences/${absenceId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            alert('请假已删除');
            return response.json();
        } else {
            alert('删除请假信息失败');
        }
    });
}

async function getClassList() {
    const classes = fetch('/classes/list',{
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取课次信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return classes;
}

async function getResourcesByClassId(classId) {
    const resources = fetch(`/resources/class/${classId}`, {
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert('获取资源信息失败');
        }
    }).then(data => {
        return data.data;
    });
    return resources;
}

async function postResourceInfo(classId, resourceName, resourceProblems, resourceContent) {
    const classes = await getClassList();
    const clazz = classes.find(c => c.classId === classId);
    fetch(`/resources/class/${classId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            class: clazz,
            resourceName,
            resourceProblems,
            resourceContent
        })
    }).then(response => {
        if (response.ok) {
            alert('资源已添加');
            return response.json();
        } else {
            alert('添加资源失败');
        }
    });
}

async function deleteResourceInfo(resourceId) {
    fetch(`/resources/${resourceId}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            alert('资源已删除');
            return response.json();
        } else {
            alert('删除资源失败');
        }
    });

}



// 课次管理相关函数
// 示例数据，课程和课次信息
var courses = [];

var sessions = [];


async function loadLesson() {
    const courseTable = document.getElementById('keci-table').getElementsByTagName('tbody')[0];
    courseTable.innerHTML = ''
    courses = await getCoursesList();
    sessions = await getClassesList();
    // 填充课程表格
    courses.forEach(course => {
        const row = courseTable.insertRow();
        row.insertCell(0).textContent = course.courseId
        row.insertCell(1).textContent = course.courseName;
        row.insertCell(2).textContent = course.teacher.teacherName;
        row.onclick = async () => await filterSessions(course.courseId);
        row.style.cursor = 'pointer'; // 鼠标悬停效果
    });

    // 默认显示第一个课程的课次
    await filterSessions(courses[0].courseId);
}

// 根据课程ID筛选课次并填充表格
async function filterSessions(courseId) {
    const sessionTable = document.getElementById('session-table').getElementsByTagName('tbody')[0];
    sessionTable.innerHTML = ''; // 清空课次表格
    sessions = await getClassesList();
    const filteredSessions = sessions.filter(session => session.course.courseId === courseId);
    filteredSessions.forEach(session => {
        const row = sessionTable.insertRow();
        row.insertCell(0).textContent = session.classId;
        row.insertCell(1).textContent = courses.find(course => course.courseId === session.course.courseId).courseName;
        row.insertCell(2).textContent = session.classStartTime;
        row.onclick = () => showSessionDetails(session);
        row.style.cursor = 'pointer'; // 鼠标悬停效果
    });
}

// 显示课次详情
function showSessionDetails(session) {
    alert(`课次名称：${session.course.courseName}\n日期：${session.classStartTime}\n`);
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
addSessionForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const courseName = document.getElementById('course-name-l').value;
    const sessionDate = document.getElementById('session-date').value;

    const course = await getCourseByName(courseName);

    const newSession = {
        courseId: course.courseId,
        classStartTime: sessionDate.toString(),
        classEndTime: sessionDate.toString()
    };
    await postClassInfo(course.courseId, sessionDate.toString(), sessionDate.toString(),)
    // closeAddForm();
    await filterSessions(newSession.courseId); // 刷新课次表格
});


// 示例数据，资源信息
var resources = [];

async function loadResource() {
}

// 填充资源表格
async function populateResourceTable(resources) {
    const resourceTable = document.getElementById('resource-table').getElementsByTagName('tbody')[0];
    resourceTable.innerHTML = ''; // 清空表格

    resources.forEach(resource => {
        const row = resourceTable.insertRow();
        row.insertCell(0).textContent = resource.resourceId;
        row.insertCell(1).textContent = resource.resourceName;
        row.insertCell(2).textContent = resource.resourceProblems;
        row.insertCell(3).textContent = resource.resourceContent;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.onclick = () => deleteResource(resource.resourceId);
        
        const cell = row.insertCell(4);
        if (userType==teacher){
            cell.appendChild(deleteButton);
        }
    
    });
}

// 搜索特定课次的资源
async function filterBySession() {
    const sessionNameInput = document.getElementById('session-name-input');
    const sessionName = sessionNameInput.value.trim();
    resources = []
    if (sessionName === '') {
        populateResourceTable(resources); // 如果输入为空，则显示所有资源
        return;
    }
    resources = await getResourcesByClassId(sessionName);
    populateResourceTable(resources);
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
addResourceForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('resource-id').value;
    const resourceName = document.getElementById('resource-name').value;
    const resourceContent = document.getElementById('resource-content').value;
    const resourceIssue = document.getElementById('resource-issue').value;

    await postResourceInfo(id, resourceName, resourceIssue, resourceContent);
    //TODO(qhr)

    // closeAddForm();
    populateResourceTable([]); // 刷新资源表格
});

// 删除资源
async function deleteResource(resourceId) {
    const confirmed = confirm('确定要删除此资源吗？');
    if (confirmed) {
        await deleteResourceInfo(resourceId);
        await populateResourceTable([]); // 刷新资源表格
    }
}