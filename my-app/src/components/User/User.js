import React from 'react'
import '../../App.css';

const User = ({ user }) => {
    return (
        <div className="User">
            <h2> Users:  </h2>
            { (user) => (
                <div key={user.id} className="User_states">
                    <hr />
                    <div> Role: {user.role} </div>
                    <div> Name: {user.name} </div>
                    <div> Birth day: {user.birth_day.year} {user.birth_day.mounth} {user.birth_day.day} </div>
                    <div> User name: {user.user_name} </div>
                    <div> Password: {user.password} </div>
                </div>
            )}
        </div>
    )
}

export default User;