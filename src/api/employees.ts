export const getAllEmployees = async () => {
    return await fetch(`http://localhost:8080/employees`, {
        mode: "cors",
    }).then(function (response) {
        console.log("API URL:", `${process.env.REACT_APP_API_HOST}/employees`);
        console.log("Response status:", response.status); // Логируем статус ответа
        console.log("Response headers:", response.headers);
        return response.json();
    });
};