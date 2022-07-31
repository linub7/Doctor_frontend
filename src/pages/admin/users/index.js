import { Table, Tag } from 'antd';
import { getAllUsersHandler } from 'api/users';
import CommonLayout from 'components/shared/CommonLayout';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { BiBlock } from 'react-icons/bi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  console.log(users);

  useEffect(() => {
    handleGetAllUsers();

    return () => {
      setUsers([]);
    };
  }, [auth?.token]);

  const handleGetAllUsers = async () => {
    dispatch(showLoading());

    const { err, data } = await getAllUsersHandler(auth?.token);

    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }
    dispatch(hideLoading());
    setUsers(data?.users);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_, { role }) => {
        let color;
        if (role === 'doctor') {
          color = '#2ecc71';
        } else if (role === 'user') {
          color = '#9b59b6';
        } else {
          color = '#e74c3c';
        }
        // return <span style={{ color }}>{role}</span>;
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <BiBlock color="#e74c3c" size={25} className="c-pointer" />
        </div>
      ),
    },
  ];
  return (
    <CommonLayout>
      <h1>Admin Users</h1>
      <Table
        columns={columns}
        dataSource={users}
        key={users.map((user) => user._id)}
        rowKey={(user) => user._id}
      />
    </CommonLayout>
  );
};

export default AdminUsers;
