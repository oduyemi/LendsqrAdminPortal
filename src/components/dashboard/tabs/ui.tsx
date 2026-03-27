export const Section = ({ title, children }: any) => (
    <div className="section">
      <h6>{title}</h6>
      <div className="grid">{children}</div>
    </div>
  );
  
  export const Info = ({ label, value }: any) => (
    <div className="info">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );