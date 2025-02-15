export const handleError = (error) => {
  if (error.response) {
    return `Error: ${error.response.status} - ${error.response.data.message || 'Server error'}`;
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  } else {
    return `Error: ${error.message}`;
  }
};