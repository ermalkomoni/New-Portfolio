# Email Setup for Contact Form

This project includes a contact form that emails `ermalkomonidev@gmail.com` when users submit it. Email delivery is handled by [Resend](https://resend.com) over its HTTP API, which works reliably in serverless (Netlify Functions) environments.

## 1. Create a Resend account and API key

1. Sign up at [resend.com](https://resend.com) using `ermalkomonidev@gmail.com`.
2. Go to **API Keys** and create a key (e.g. "Portfolio").
3. Copy the key (starts with `re_`).

> The form sends from Resend's built-in test sender `onboarding@resend.dev`, which can deliver to the email that owns the Resend account. Since the account is registered with `ermalkomonidev@gmail.com`, messages arrive in that inbox with no domain setup needed. To send from a custom address later, verify a domain in Resend and update `FROM_ADDRESS` in `server/routes/contact.ts`.

## 2. Local development

Create a `.env` file in the project root:

```env
RESEND_API_KEY=re_your_real_key_here
```

Then run `pnpm dev` and submit the form.

## 3. Production (Netlify)

The contact form posts to `/api/contact`, which `netlify.toml` routes to the serverless function in `netlify/functions/api.ts`.

Set the API key in Netlify:

1. Open your site in the Netlify dashboard.
2. **Site configuration -> Environment variables -> Add a variable**.
3. Key: `RESEND_API_KEY`, Value: your Resend key.
4. Trigger a redeploy so the function picks up the new variable.

## How It Works

1. User submits the contact form.
2. Form data is POSTed to `/api/contact`.
3. The server validates the fields and calls the Resend API.
4. An email is sent to `ermalkomonidev@gmail.com` with `reply-to` set to the sender, so replying goes straight back to them.
5. The user receives success/error feedback.

## Testing

1. Start the dev server: `pnpm dev`
2. Navigate to the contact section.
3. Fill out and submit the form.
4. Verify the email is received at `ermalkomonidev@gmail.com`.
