import { useState, useEffect } from "react";
import axios from "axios";

// axios setup
import axios from 'axios';

const BASE_URL = axios.create({
  baseURL: 'https://backendserver-twkl.onrender.com', // <-- your deployed backend URL
  withCredentials: true // if backend uses cookies/auth
});




function Home() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    exam: {
      jamb: false,
      waec: false,
      neco: false
    },
    examCode: {
      jamb: "",
      waec: "",
      neco: ""
    }
  });

  // FETCH USERS
  const getUsers = () => {
    axios.get(`${BASE_URL}/users`)
      .then(res => setUsers(res.data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE EXAM CHECKBOX
  const handleExamChange = (e) => {
    setForm({
      ...form,
      exam: {
        ...form.exam,
        [e.target.name]: e.target.checked
      }
    });
  };

  // HANDLE EXAM CODE
  const handleExamCode = (e) => {
    setForm({
      ...form,
      examCode: {
        ...form.examCode,
        [e.target.name]: e.target.value
      }
    });
  };

  // CREATE USER
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/users`, form)
      .then(() => {
        getUsers();
        alert("User Added");
      });
  };

  // DELETE USER
  const deleteUser = (id) => {
    axios.delete(`${BASE_URL}/users/${id}`)
      .then(() => getUsers());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CBT User CRUD</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="phoneNumber" placeholder="Phone" onChange={handleChange} /><br />
        <input name="password" placeholder="Password" onChange={handleChange} /><br />

        <h3>Exam</h3>
        <label>
          <input type="checkbox" name="jamb" onChange={handleExamChange} /> JAMB
        </label>
        <label>
          <input type="checkbox" name="waec" onChange={handleExamChange} /> WAEC
        </label>
        <label>
          <input type="checkbox" name="neco" onChange={handleExamChange} /> NECO
        </label>

        <h3>Exam Codes</h3>
        <input name="jamb" placeholder="JAMB Code" onChange={handleExamCode} /><br />
        <input name="waec" placeholder="WAEC Code" onChange={handleExamCode} /><br />
        <input name="neco" placeholder="NECO Code" onChange={handleExamCode} /><br />

        <button type="submit">Add User</button>
      </form>

      <hr />

      {/* DISPLAY USERS */}
      <h2>Users List</h2>

      {users.map(user => (
        <div key={user._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phoneNumber}</p>

          <p><b>Exam:</b>
            JAMB: {user.exam?.jamb ? "Yes" : "No"} |
            WAEC: {user.exam?.waec ? "Yes" : "No"} |
            NECO: {user.exam?.neco ? "Yes" : "No"}
          </p>

          <p><b>Codes:</b>
            JAMB: {user.examCode?.jamb} |
            WAEC: {user.examCode?.waec} |
            NECO: {user.examCode?.neco}
          </p>

          <button onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default Home;
