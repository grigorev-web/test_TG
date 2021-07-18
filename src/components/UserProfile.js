export default function UserProfile(props) {
  return (
    <div className="card user-profile">
      <img
        className="card-img-top"
        src={props.user.picture.large}
        alt={props.user.login.username}
      />
      <div className="card-body">
        <h5 className="card-title">
          {props.user.name.title +
            " " +
            props.user.name.first +
            " " +
            props.user.name.last +
            " " +
            props.user.dob.age}
        </h5>
        <p className="card-text">
          {props.user.location.country + " " + props.user.location.city}
        </p>
        <div className="btn btn-info" onClick={() => props.back(false)}>
          back{" "}
        </div>
      </div>
    </div>
  );
}
