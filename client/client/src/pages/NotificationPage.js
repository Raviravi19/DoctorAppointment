import React, { useEffect } from 'react';
import Layout from './../components/Layout';
import { message, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TabPane } = Tabs;

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = () => {
    // Logic for marking all notifications as read
  };

  const handleDeleteAllRead = () => {
    // Logic for deleting all read notifications
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user && user._id) {
        try {
          dispatch(showLoading());
          const res = await axios.post(
            '/api/v1/user/get-all-notification',
            { userId: user._id },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          dispatch(hideLoading());

          if (res.data.success) {
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          message.error('Something went wrong');
        }
      }
    };

    fetchNotifications();
  }, [dispatch, user]);

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <TabPane tab="Unread" key="unRead">
          <div>
            <div className="d-flex justify-content-end">
              <h4 className="p-2" onClick={handleMarkAllRead}>
                Mark All Read
              </h4>
            </div>
            {user &&
              user.notification &&
              user.notification.map((notificationMsgs) => (
                <div
                  className="card"
                  onClick={() => navigate(notificationMsgs.onClickPath)}
                  key={notificationMsgs.id} // Assuming each notification has a unique ID
                >
                  <div className="card-text">{notificationMsgs.message}</div>
                </div>
              ))}
          </div>
        </TabPane>
        <TabPane tab="Read" key="read">
          <div>
            <div className="d-flex justify-content-end">
              <h4 className="p-2" onClick={handleDeleteAllRead}>
                Delete All Read
              </h4>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;





