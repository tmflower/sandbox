import axios from "axios";

async function getTodos() {
    const result = await axios.get(`http://localhost:3001/todos`);
    console.log(result.data);
    return result.data;
};

export { getTodos }