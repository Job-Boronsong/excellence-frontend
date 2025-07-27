const TeacherCard = ({ teacher }) => (
    <div className="card">
      <h3 className="font-bold">{teacher.name}</h3>
      <p>{teacher.subject}</p>
      <p>{teacher.email}</p>
    </div>
  );
  
  export default TeacherCard;
  