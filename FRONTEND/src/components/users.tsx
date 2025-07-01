import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("Token missing, skipping user fetch");
        return;
    }

    axios.get(`http://localhost:3000/api/v1/bulk?username=${filter}`, {
        headers: {
            token:`Bearer ${token}` // token is already "Bearer <token>"
        }
    })
    .then(response => {
        setUsers(response.data.user);
    })
    .catch(err => {
        console.error("Failed to fetch users:", err.response?.data || err.message);
    });
}, [filter]);


    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map((user) => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
};

function User({ user }: { user: { username: string; _id: string } }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between my-2 p-2 border-b">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2 text-xl">
                    {user.username[0].toUpperCase()}
                </div>
                <div className="flex flex-col justify-center">
                    <div>{user.username}</div>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <Button
                    onClick={() =>
                        navigate(`/send?id=${user._id}&name=${user.username}`)
                    }
                    text="Send Money"
                />
            </div>
        </div>
    );
}
