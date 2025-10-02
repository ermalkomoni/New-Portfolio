# Email Setup for Contact Form

This project includes a contact form that sends emails to `ermalkomonidev@gmail.com` when users submit the form.

## Environment Variables Required

Create a `.env` file in the root directory with the following variables:

```env
# Email Configuration
EMAIL_USER=ermalkomonidev@gmail.com
EMAIL_PASS=your_app_password_here
# Alternative: You can also use APP_PASSWORD instead of EMAIL_PASS
# APP_PASSWORD=your_app_password_here

# Other environment variables
PING_MESSAGE=ping
```

## Gmail Setup

Since this uses Gmail SMTP, you'll need to:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Navigate to Security > 2-Step Verification
   - Scroll down to "App passwords"
   - Generate a new app password for "Mail"
   - Use this app password in your `.env` file as `EMAIL_PASS`

## How It Works

1. User fills out the contact form on the website
2. Form data is sent to `/api/contact` endpoint
3. Server validates the data and sends an email using Nodemailer
4. Email is sent to `ermalkomonidev@gmail.com` with the form details
5. User receives success/error feedback

## Email Template

The email includes:
- Contact person's name and email
- Subject and message
- Timestamp
- Professional HTML formatting

## Testing

To test the contact form:
1. Start the development server: `pnpm dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check the console for any errors
5. Verify the email is received at `ermalkomonidev@gmail.com`
