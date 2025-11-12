// ============================================
// Email Template for Chat App
// File: src/emails/emailTemplate.js
// 
// IMPORTANT: When importing this file, use:
// import { createWelcomeEmailTemplate } from './emailTemplate.js'
// Notice the .js extension - it's required for ES6 modules!
// ============================================

// ============================================
// Base Email Layout Component
// ============================================

const EmailLayout = ({ previewText, children }) => {
  return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>${previewText}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    img { max-width: 100%; height: auto; display: block; border: 0; }
    a { color: #0066cc; text-decoration: none; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 30px 20px 20px !important; }
      .footer { padding: 30px 20px !important; }
      h1 { font-size: 24px !important; }
      .hero-image { height: 200px !important; }
    }
  </style>
</head>
<body style="background-color: #f0f2f5; margin: 0; padding: 0;">
  <span style="display: none; font-size: 1px; color: #f0f2f5; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;">
    ${previewText}
  </span>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f2f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" align="center" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          ${children}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

// ============================================
// Email Components
// ============================================

const EmailHeader = (logoUrl, appName = 'Chat App') => {
  return `
  <tr>
    <td class="header" style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      ${logoUrl 
        ? `<img src="${logoUrl}" alt="${appName}" style="height: 50px; margin: 0 auto;">` 
        : `<h2 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">${appName}</h2>`
      }
    </td>
  </tr>`;
};

const WelcomeHeroImage = (userName) => {
  // SVG illustration for welcome message
  return `
  <tr>
    <td style="padding: 0; background-color: #f8f9fa;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 40px; text-align: center;">
            <svg class="hero-image" width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto; display: block;">
              <!-- Background Circle -->
              <circle cx="140" cy="120" r="100" fill="#E0E7FF" opacity="0.5"/>
              
              <!-- Chat Bubbles -->
              <rect x="60" y="70" width="100" height="60" rx="20" fill="#667eea"/>
              <rect x="120" y="110" width="100" height="60" rx="20" fill="#764ba2"/>
              
              <!-- Message Lines in First Bubble -->
              <line x1="75" y1="85" x2="145" y2="85" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              <line x1="75" y1="100" x2="130" y2="100" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              <line x1="75" y1="115" x2="140" y2="115" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              
              <!-- Message Lines in Second Bubble -->
              <line x1="135" y1="125" x2="205" y2="125" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              <line x1="135" y1="140" x2="190" y2="140" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              <line x1="135" y1="155" x2="200" y2="155" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              
              <!-- Person Icon -->
              <circle cx="140" cy="180" r="25" fill="#10b981"/>
              <circle cx="140" cy="172" r="8" fill="white"/>
              <path d="M 125 195 Q 125 185 140 185 Q 155 185 155 195" fill="white"/>
              
              <!-- Decorative Stars -->
              <text x="50" y="50" font-size="24" fill="#fbbf24">✨</text>
              <text x="220" y="60" font-size="20" fill="#fbbf24">⭐</text>
              <text x="200" y="200" font-size="18" fill="#fbbf24">💬</text>
            </svg>
            
            <h1 style="color: #1f2937; font-size: 32px; font-weight: 700; margin: 30px 0 15px; letter-spacing: -0.5px;">
              Welcome, ${userName}! 👋
            </h1>
            <p style="color: #6b7280; font-size: 18px; margin: 0; line-height: 1.5;">
              You're all set to start chatting
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
};

const EmailContent = (content) => {
  return `
  <tr>
    <td class="content" style="padding: 40px; color: #374151; font-size: 16px; line-height: 1.7;">
      ${content}
    </td>
  </tr>`;
};

const MessengerButton = (url) => {
  return `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 35px auto;">
    <tr>
      <td style="border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
        <a href="${url}" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 40px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 14L11 11L14 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 11V18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Open Messenger
        </a>
      </td>
    </tr>
  </table>`;
};

const EmailFooter = (appName = 'Chat App') => {
  return `
  <tr>
    <td class="footer" style="padding: 40px; text-align: center; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px; line-height: 1.5;">
        © ${new Date().getFullYear()} ${appName}. All rights reserved.
      </p>
      <p style="color: #9ca3af; font-size: 13px; margin: 0; line-height: 1.5;">
        You received this email because you signed up for ${appName}.<br>
        If you have any questions, feel free to reply to this email.
      </p>
    </td>
  </tr>`;
};

// ============================================
// Welcome Email Template
// ============================================

export const createWelcomeEmailTemplate = (name, clientURL, logoUrl) => {
  const content = `
    <p style="margin: 0 0 20px; font-size: 17px;">
      We're thrilled to have you join our community! 🎉
    </p>
    <p style="margin: 0 0 20px;">
      Your account is ready, and you can now connect with friends, share moments, and enjoy seamless conversations.
    </p>
    
    <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 20px; margin: 25px 0; border-radius: 6px;">
      <p style="margin: 0; color: #0369a1; font-weight: 600; font-size: 15px;">
        🚀 Get started in seconds:
      </p>
      <ul style="margin: 12px 0 0 0; padding-left: 20px; color: #075985;">
        <li style="margin: 8px 0;">Click the button below to open your messenger</li>
        <li style="margin: 8px 0;">Start a conversation with your friends</li>
        <li style="margin: 8px 0;">Explore all the amazing features</li>
      </ul>
    </div>
    
    ${MessengerButton(clientURL)}
    
    <p style="margin: 25px 0 0; color: #6b7280; font-size: 14px; text-align: center;">
      Ready to chat? We can't wait to see you there! 💬
    </p>
  `;

  return EmailLayout({
    previewText: `Welcome to Chat App, ${name}! Start chatting now 🎉`,
    children: 
      EmailHeader(logoUrl, 'Chat App') + 
      WelcomeHeroImage(name) + 
      EmailContent(content) + 
      EmailFooter('Chat App')
  });
};

// Export individual components if needed for custom templates
export {
  EmailLayout,
  EmailHeader,
  WelcomeHeroImage,
  EmailContent,
  MessengerButton,
  EmailFooter
};