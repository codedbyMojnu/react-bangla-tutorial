import Image from "next/image";

const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Image
        src="/icons/react-bangla-icon.png"
        alt="React Bangla Tutorial Logo"
        width={32}
        height={32}
        style={{ borderRadius: "6px" }}
        priority // ensures logo loads immediately (good for header)
      />
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span
          style={{
            fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            color: "#2563EB",
            letterSpacing: "0.04em",
          }}
        >
          React
        </span>
        <span
          style={{
            fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
            fontSize: "20px",
            letterSpacing: "0.02em",
            color: "#D93334",
          }}
        >
          বাংলা
        </span>
      </div>
    </div>
  );
};

export default Logo;
