let lmsURL = 'https://lms1210.azurewebsites.net/';
let accessToken = 'oC6iSuoiwRWdf3LkzkVh6b39qXl8r2DREfcg5snGx-BBPG9GGl4AMqDaMBsNefIBH9Ysgnc7mHEC69ZBtyHTstlFH_ODLSZxoc1Pp5Q9-Dni_z71h64JERcUibu17FnYxTZ3nP9sXYw232DIEnkVd3L8GmPGueVrd3lOh-IyaYhOTvVm9xX3Cd3XydRUJAO6rd7scZw2v1CT9D11iU9hZlYNluAR-A4ChhmJEeZA_I0';
let BearerAccessToken = 'Bearer ' + accessToken;

let LmsApi = {
  getAllCourse: async () => {
      let endpoint = `${lmsURL}api/courses`;
      try {
          const response = await fetch(endpoint,{
              headers: {
                  'Authorization': BearerAccessToken,
              }
          });
          const jsonResponse = await response.json();
          console.log(jsonResponse)
      } catch (e) {
          console.log(e)
      }


  }
};

export default LmsApi;