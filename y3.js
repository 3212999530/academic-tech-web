// 示例数据，资源信息
const resources = [
    { id: 1, sessionName: "课程A", name: "课件1", content: "这是课件1的内容...", issue: "关于课件1的问题..." },
    { id: 2, sessionName: "课程A", name: "视频教程", content: "视频教程内容...", issue: "视频教程中的疑问..." },
    { id: 3, sessionName: "课程B", name: "课堂讨论记录", content: "讨论记录内容...", issue: "讨论中的问题..." }
  ];
  
  // 页面加载完毕后初始化资源列表
  window.onload = function() {
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
      row.insertCell(2).textContent = resource.content;
      row.insertCell(3).textContent = resource.issue;
      
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
  
    // 模拟后端新增资源
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
      const index = resources.findIndex(resource => resource.id === resourceId);
      if (index !== -1) {
        resources.splice(index, 1);
        populateResourceTable(resources); // 刷新资源表格
      }
    }
  }
  