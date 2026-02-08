interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  vehicle?: string;
  stockId?: string;
}

export function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
  vehicle,
  stockId,
}: ContactEmailProps) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style={{
          backgroundColor: "#f8f9fa",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Header with brand colors */}
        <div
          style={{
            backgroundColor: "#1a2b3c",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#ffffff", margin: 0, fontSize: "24px" }}>
            Repo Motors
          </h1>
          <p
            style={{
              color: "#e5e7eb",
              margin: "5px 0 0",
              fontSize: "14px",
            }}
          >
            New Contact Form Submission
          </p>
        </div>

        {/* Main content */}
        <div
          style={{
            maxWidth: "600px",
            margin: "20px auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {/* Vehicle highlight if provided */}
          {vehicle && (
            <div
              style={{
                backgroundColor: "#e63946",
                padding: "15px",
                color: "#ffffff",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                🚗 Vehicle Inquiry
              </p>
              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {vehicle}
              </p>
              {stockId && (
                <p style={{ margin: "5px 0 0", fontSize: "14px" }}>
                  Stock ID: {stockId}
                </p>
              )}
            </div>
          )}

          {/* Contact details */}
          <div style={{ padding: "30px" }}>
            <h2
              style={{
                color: "#1a2b3c",
                fontSize: "20px",
                marginTop: 0,
              }}
            >
              Contact Details
            </h2>

            <div style={{ marginBottom: "15px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                Name
              </p>
              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "16px",
                  color: "#1a2b3c",
                }}
              >
                {name}
              </p>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                Email
              </p>
              <p style={{ margin: "5px 0 0", fontSize: "16px" }}>
                <a
                  href={`mailto:${email}`}
                  style={{ color: "#e63946", textDecoration: "none" }}
                >
                  {email}
                </a>
              </p>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                Subject
              </p>
              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "16px",
                  color: "#1a2b3c",
                }}
              >
                {subject}
              </p>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                Message
              </p>
              <div
                style={{
                  margin: "10px 0 0",
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  borderLeft: "4px solid #e63946",
                  fontSize: "14px",
                  color: "#1a2b3c",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              textAlign: "center",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
              This email was sent from the Repo Motors contact form
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
