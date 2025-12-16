type ContactBody = {
  name: string;
  email: string;
  reason: string;
  message: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: {
    SENDGRID_API_KEY: string;
    SENDGRID_FROM_EMAIL: string;
  };
}) => {
  try {
    let body: ContactBody;

    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      body = (await request.json()) as ContactBody;
    } else {
      const form = await request.formData();
      body = {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        reason: String(form.get("reason") ?? ""),
        message: String(form.get("message") ?? ""),
      };
    }

    const { name, email, reason, message } = body;

    if (!name || !email || !reason || !message) {
      return json({ error: "Missing required fields" }, 400);
    }

    const sg = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: env.SENDGRID_FROM_EMAIL }],
            reply_to: { email },
          },
        ],
        from: { email: env.SENDGRID_FROM_EMAIL },
        subject: `Contact: ${reason.toUpperCase()}`,
        content: [
          {
            type: "text/plain",
            value: `Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\n${message}`,
          },
        ],
      }),
    });

    if (!sg.ok) {
      const text = await sg.text();
      return json({ error: "SendGrid error", details: text }, 500);
    }

    return json({ success: true });
  } catch (err) {
    return json({ error: "Server error", details: String(err) }, 500);
  }
};
