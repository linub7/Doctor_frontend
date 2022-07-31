import client from 'api/client';

export const seenNotificationHandler = async (token) => {
  try {
    const { data } = await client.put(
      `/users/seen-notification`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const removeAllNotificationHandler = async (token) => {
  try {
    const { data } = await client.put(
      `/users/remove-all-notifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getAllUsersHandler = async (token) => {
  try {
    const { data } = await client.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getUserUnseenNotificationsHandler = async (token) => {
  try {
    const { data } = await client.get(`/users/unseen-notifications-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};

export const getUserSeenNotificationsHandler = async (token) => {
  try {
    const { data } = await client.get(`/users/seen-notifications-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const { response } = error;
    return { err: response?.data };
  }
};
