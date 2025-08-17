import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Calendar, User, FileText } from 'lucide-react';

export default function ClientTaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    client: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  // เพิ่มงานใหม่
  const addTask = () => {
    if (newTask.title.trim() === '') return;
    
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date().toLocaleDateString('th-TH')
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', client: '', description: '', dueDate: '', priority: 'medium' });
    setIsAddingTask(false);
  };

  // อัปเดตสถานะงาน (เสร็จ/ไม่เสร็จ)
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // ลบงาน
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // เริ่มแก้ไขงาน
  const startEditTask = (task) => {
    setEditingTask(task.id);
    setNewTask({
      title: task.title,
      client: task.client,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority
    });
  };

  // บันทึกการแก้ไข
  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask ? { ...task, ...newTask } : task
    ));
    setEditingTask(null);
    setNewTask({ title: '', client: '', description: '', dueDate: '', priority: 'medium' });
  };

  // ยกเลิกการแก้ไข
  const cancelEdit = () => {
    setEditingTask(null);
    setNewTask({ title: '', client: '', description: '', dueDate: '', priority: 'medium' });
    setIsAddingTask(false);
  };

  // กรองงานตามสถานะ
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'สำคัญมาก';
      case 'medium': return 'สำคัญปานกลาง';
      case 'low': return 'สำคัญน้อย';
      default: return 'ปานกลาง';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FileText className="text-blue-600" />
            ระบบจดบันทึกงานลูกค้า
          </h1>
          <p className="text-gray-600">จัดการงานที่ต้องส่งมอบให้ลูกค้าอย่างเป็นระบบ</p>
          
          {/* สถิติ */}
          <div className="flex gap-4 mt-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-600 font-medium">รอดำเนินการ: </span>
              <span className="font-bold text-blue-800">{pendingTasks.length}</span>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <span className="text-sm text-green-600 font-medium">เสร็จแล้ว: </span>
              <span className="font-bold text-green-800">{completedTasks.length}</span>
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
              <span className="text-sm text-purple-600 font-medium">ทั้งหมด: </span>
              <span className="font-bold text-purple-800">{tasks.length}</span>
            </div>
          </div>
        </div>

        {/* ปุ่มเพิ่มงานใหม่ */}
        {!isAddingTask && !editingTask && (
          <div className="mb-6">
            <button
              onClick={() => setIsAddingTask(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              เพิ่มงานใหม่
            </button>
          </div>
        )}

        {/* ฟอร์มเพิ่ม/แก้ไขงาน */}
        {(isAddingTask || editingTask) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingTask ? 'แก้ไขงาน' : 'เพิ่มงานใหม่'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่องาน *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="ระบุชื่องานที่ต้องทำ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ลูกค้า</label>
                <input
                  type="text"
                  value={newTask.client}
                  onChange={(e) => setNewTask({ ...newTask, client: e.target.value })}
                  placeholder="ชื่อลูกค้าหรือบริษัท"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">วันที่ส่งมอบ</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ระดับความสำคัญ</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">สำคัญน้อย</option>
                  <option value="medium">สำคัญปานกลาง</option>
                  <option value="high">สำคัญมาก</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="รายละเอียดของงาน เช่น ขอบเขตงาน ข้อกำหนดพิเศษ"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={editingTask ? saveEdit : addTask}
                disabled={!newTask.title.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Check size={16} />
                {editingTask ? 'บันทึกการแก้ไข' : 'เพิ่มงาน'}
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <X size={16} />
                ยกเลิก
              </button>
            </div>
          </div>
        )}

        {/* รายการงานที่รอดำเนินการ */}
        {pendingTasks.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-orange-600" />
              งานที่รอดำเนินการ ({pendingTasks.length})
            </h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                  onEdit={startEditTask}
                  getPriorityColor={getPriorityColor}
                  getPriorityText={getPriorityText}
                />
              ))}
            </div>
          </div>
        )}

        {/* รายการงานที่เสร็จแล้ว */}
        {completedTasks.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Check className="text-green-600" />
              งานที่เสร็จแล้ว ({completedTasks.length})
            </h2>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                  onEdit={startEditTask}
                  getPriorityColor={getPriorityColor}
                  getPriorityText={getPriorityText}
                />
              ))}
            </div>
          </div>
        )}

        {/* ข้อความเมื่อไม่มีงาน */}
        {tasks.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">ยังไม่มีงานในระบบ</h3>
            <p className="text-gray-500">เริ่มต้นโดยการเพิ่มงานแรกของคุณ</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Component สำหรับแสดงงานแต่ละรายการ
function TaskItem({ task, onToggleComplete, onDelete, onEdit, getPriorityColor, getPriorityText }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  
  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
      task.completed 
        ? 'bg-green-50 border-green-200 opacity-75' 
        : isOverdue
          ? 'bg-red-50 border-red-300 shadow-md'
          : 'bg-gray-50 border-gray-200 hover:shadow-md'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          {task.completed && <Check size={14} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
              {getPriorityText(task.priority)}
            </span>
            {isOverdue && (
              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full border border-red-200">
                เกินกำหนด
              </span>
            )}
          </div>
          
          {task.client && (
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <User size={14} />
              ลูกค้า: {task.client}
            </p>
          )}
          
          {task.dueDate && (
            <p className={`text-sm flex items-center gap-1 mb-1 ${
              isOverdue ? 'text-red-600' : 'text-gray-600'
            }`}>
              <Calendar size={14} />
              ส่งมอบ: {new Date(task.dueDate).toLocaleDateString('th-TH')}
            </p>
          )}
          
          {task.description && (
            <p className={`text-sm ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          
          <p className="text-xs text-gray-400 mt-2">
            สร้างเมื่อ: {task.createdAt}
          </p>
        </div>
        
        <div className="flex gap-1">
          {!task.completed && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="แก้ไข"
            >
              <Edit2 size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="ลบ"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}