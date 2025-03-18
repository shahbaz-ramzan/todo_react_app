import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, Col, Row, Dropdown, Menu, Typography } from "antd";
import "antd/dist/reset.css";
import "./TodoDragDrop.css";
import Todo from "../../services/api_servises/todo";
import { fetchFormattedData, getCategoryList } from "../../model/task";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MoreOutlined } from "@ant-design/icons";
import EditTaskModal from "../edit/edit";
import CreateSubTask from "../subTask/CreateSubTask";

const TodoDragDrop = () => {
  const tasksList = useSelector((state) => state?.tasks?.taskList);
  const [tasks, setTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [subTaskModal, setSubTaskModal] = useState(false);
  const [taskTitles, setTaskTitles] = useState("");

  const onAddSubtask = (task) => {
    setEditedTaskId(task.id);
    setTaskTitles(task.title);
    setSubTaskModal(true);
  };
  const onEdit = (taskId) => {
    setEditedTaskId(taskId);
    setIsModalOpen(true);
  };
  const onDelete = async (taskId) => {
    await Todo.deleteTask({ id: taskId });
    const res = await fetchFormattedData(dispatch);
    setTasks(res);
  };
  // const onUpdateStatus = async () => {};

  const getMenu = (task) => (
    <Menu>
      <Menu.Item key="addSubtask" onClick={() => onAddSubtask(task)}>
        Add Subtask
      </Menu.Item>
      {/* <Menu.Item key="updateStatus" onClick={() => onUpdateStatus(task.id)}>
        Update Status
      </Menu.Item> */}
      <Menu.Item key="editTask" onClick={() => onEdit(task.id)}>
        Edit Task
      </Menu.Item>
      <Menu.Item key="deleteTask" danger onClick={() => onDelete(task.id)}>
        Delete Task
      </Menu.Item>
    </Menu>
  );

  const updateStatus = async (movedTask) => {
    const payload = {
      id: movedTask?.id,
      status: movedTask?.status?.toLowerCase(),
    };
    try {
      await Todo.updateTask(payload);
      // fetchListData();
      const res = await fetchFormattedData(dispatch);
      setTasks(res);
    } catch (error) {
      console.error("Error updating tasks status:", error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = [...tasks[source.droppableId]];
    const destColumn = [...tasks[destination.droppableId]];

    const [movedTask] = sourceColumn.splice(source.index, 1);

    const updatedTask = { ...movedTask, status: destination.droppableId };

    destColumn.splice(destination.index, 0, updatedTask);

    const newTasks = {
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    };

    setTasks(newTasks);

    await updateStatus(updatedTask);
  };

  const fetchListData = async () => {
    const res = await fetchFormattedData(dispatch);
    setTasks(res);
  };
  const fetchCategoryList = async () => {
    await getCategoryList(dispatch);
  };

  useEffect(() => {
    fetchListData();
    fetchCategoryList();
  }, []);

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={16} className="todo-container">
        {Object.entries(tasks)?.map(([columnId, columnTasks]) => (
          <Col key={columnId} span={8} className="todo-column">
            <h3 className="todo-header">
              {columnId.toUpperCase()} {columnTasks.length}
            </h3>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-card"
                        >
                          <div className="card-header">
                            <Typography.Title level={5} className="title">
                              {task.title}
                            </Typography.Title>
                            <Dropdown
                              overlay={getMenu(task)}
                              trigger={["click"]}
                            >
                              <MoreOutlined className="more-options" />
                            </Dropdown>
                          </div>

                          <Typography.Paragraph
                            ellipsis={{ rows: 2, expandable: true }}
                          >
                            {task.description || "No description available"}
                          </Typography.Paragraph>

                          <Typography.Text type="secondary">
                            Status: {task.status}
                          </Typography.Text>

                          {/* Display Date and Time */}
                          <div className="task-time">
                            <Typography.Text type="secondary">
                              {task.date} - {task.time}
                            </Typography.Text>
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        ))}
      </Row>
      {isModalOpen && (
        <EditTaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editedTaskId={editedTaskId}
        />
      )}
      {subTaskModal && (
        <CreateSubTask
          subTaskModal={subTaskModal}
          setSubTaskModal={setSubTaskModal}
          editedTaskId={editedTaskId}
          taskTitles={taskTitles}
        />
      )}
    </DragDropContext>
  );
};

export default TodoDragDrop;
