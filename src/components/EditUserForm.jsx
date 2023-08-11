import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import DashboardMenu from '../Dashboard/DashboardMenu';

const EditUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Admin');
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getUserById = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/${id}`);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setRole(response.data.role);
        } catch (error) {
          if(error.response){
            setMsg(error.response.data.msg);
          }
        }
    };
    getUserById();
    },[id]);

    const updateUser = async (e) =>{
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`, {
              username: username,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              role: role,
            });
            navigate("/userlist");
        } catch (error) {
            if (error.response) {
              setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div className="columns">
      <div className="column">
        <h1 className="daftaruser">Edit User</h1>
        <form onSubmit={updateUser}>
          <p>{msg}</p>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <div className="select">
                <select
                  className="option"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <Link to={`/userlist`} className="save">
              Kembali
            </Link>
            <button type="submit" className="save">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser