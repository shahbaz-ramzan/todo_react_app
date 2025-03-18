import { useEffect, useState } from "react";
import { Space, Table, Tag, Button, Popconfirm, message } from "antd";
import "./CategoryList.css";
import CreateCategoryModal from "../createCategory/Category";
import Category from "../../services/api_servises/category";

const CategoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    const res = await Category.getCategoryList();
    setCategoryList(res.data);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const handleDelete = async (key) => {
    await Category.deleteCategory({ id: key?._id });
    fetchCategoryList();
  };

  const columns = [
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Category Management</h2>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create New Category
        </Button>
      </div>
      <Table columns={columns} dataSource={categoryList} />
      {isModalOpen && (
        <CreateCategoryModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          fetchCategoryList={fetchCategoryList}
        />
      )}
    </div>
  );
};

export default CategoryList;
