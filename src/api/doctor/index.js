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

export const getAllDoctorsHandler = async (token) => {
  try {
    const { data } = await client.get(`/doctors`, {
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

export const updateDoctorStatusHandler = async (status, doctorId, token) => {
  try {
    const { data } = await client.put(
      `/doctors/${doctorId}`,
      { status },
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
