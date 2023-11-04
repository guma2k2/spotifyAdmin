import axios from "axios" ;

export const makeRequest = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    // headers: {"Authorization" : "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaGlwaGlAZ21haWwuY29tIiwiaWF0IjoxNjk0Njk4OTE0LCJleHAiOjE2OTQ2OTk1MTR9.uuSkE_ERq_VQlKxVTFs1ekEgP-GqZOfBs7rlt7-LrYY"}
});

