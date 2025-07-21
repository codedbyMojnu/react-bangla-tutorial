const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          color: "#2563EB",
          letterSpacing: "0.04em",
        }}
      >
        React JS
      </span>
      <span
        style={{
          marginLeft: "10px",
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
          fontWeight: 500,
          fontSize: "19px",
          letterSpacing: "0.02em",
        }}
      >
        Bangla Tutorial
      </span>
    </div>
  );
};

export default Logo;
