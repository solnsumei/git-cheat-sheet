import React from 'react';
import AuthForm from './AuthForm';

/**
 *
 * @class Sidebar
 * @extends {React.Component}
 */
const Sidebar = ({
  user, logout
}) => (
  <div className="container margin-top">
    { !user
      ? <AuthForm />
      : <div className="row">
          <div className="col-12">
            <p>Welcome {user.name}</p>
            <p>You can add code snippets to categories</p>
            <p>
              <button
                onClick={logout}
                className="btn btn-warning btn-lg">Log out</button>
            </p>
          </div>
        </div>
    }
  </div>
);

export default Sidebar;
