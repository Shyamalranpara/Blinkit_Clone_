const verifyEmailTemplate = (user) => {
    return ` 
    <p>Dear ${user.name},</p>
    <p>Thank you for registering at Blinkit.</p>
    <a href="${user.url}" style="color:white; background: blue; margin-top:30px; display:inline-block; padding:10px 20px; text-decoration:none;">
    Verify Email
    </a>
    `;
};

module.exports = verifyEmailTemplate;
