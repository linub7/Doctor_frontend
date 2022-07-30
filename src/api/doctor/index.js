import client from 'api/client';

export const applyDoctorHandler = async (values, token) => {
  try {
    const { data } = await client.post(`/doctors/apply`, values, {
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

export const seenNotificationHandler = async (token) => {
  try {
    const { data } = await client.put(
      `/doctors/seen-notification`,
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
      `/doctors/remove-all-notifications`,
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
