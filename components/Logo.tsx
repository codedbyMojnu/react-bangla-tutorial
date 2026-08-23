import Image from "next/image";

export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Image
        src="/icons/react-bangla-icon.png"
        alt="React Bangla Logo"
        width={32}
        height={32}
        style={{ borderRadius: "6px" }}
        priority
      />
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#006A4E", // green — Bangladesh's nature
            letterSpacing: "0.04em",
          }}
        >
          React
        </span>
        <span
          style={{
            fontSize: "20px",
            letterSpacing: "0.02em",
            color: "#F42A41", // red — blood for freedom
          }}
        >
          বাংলা
        </span>
      </div>
    </div>
  );
}
