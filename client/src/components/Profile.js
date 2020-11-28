import React from 'react';

function Profile(props) {
  return (
    <div className="form-container">
      Profile Page:
      <form action="#" method="POST" enctype="multipart/form-data">
        <div class="form-group">
          <label>Name</label>
          <input class="form-control" type="text" />
          <label>Email</label>
          <input type="text" />
          <label>Contact No</label>
          <input type="number" />
          <label>Profile Picture</label>
          <input type="file" />
          <input type="submit" />
          Submit
        </div>
      </form>
    </div>
  );
}

export default Profile;
