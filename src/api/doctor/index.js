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

export const getDoctorAllAppointmentsHandler = async (token) => {
  try {
    const { data } = await client.get(`/doctors/appointments`, {
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

export const getAllApprovedDoctorsHandler = async (token) => {
  try {
    const { data } = await client.get(`/doctors/approved`, {
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

export const getSingleDoctorProfileHandler = async (doctorId, token) => {
  try {
    const { data } = await client.get(`/doctors/${doctorId}`, {
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

export const updateDoctorAppointmentStatusHandler = async (
  status,
  appointmentId,
  token
) => {
  try {
    const { data } = await client.put(
      `/doctors/appointments/${appointmentId}`,
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

export const updateDoctorProfileHandler = async (values, doctorId, token) => {
  try {
    const { data } = await client.put(
      `/doctors/update-profile/${doctorId}`,
      values,
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

export const bookAppointmentHandler = async (values, token) => {
  try {
    const { data } = await client.post(`/doctors/book-appointment`, values, {
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

export const checkAvailabilityHandler = async (values, token) => {
  try {
    const { data } = await client.post(
      `/doctors/check-booking-appointment-availability`,
      values,
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
