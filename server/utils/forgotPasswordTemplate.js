const forgotPasswordTemplate=({name,otp})=>{
return `
<div>
<p>Dear,${name}</p>
<p>You're req a password reset. Please use following OTP code to reset your password.</p>

<div style="background:yellow; font-size:20px; padding:10px; text-align:center;">
  ${otp}
</div>


<p>This otp is valid for 1hour only. enter this otp in the blinkit website to proceed with resetting your password.</p>

<br/>
</br>
<p>Thanks</p>
<p>Blinkit</p>
</div>
`
}
module.exports=forgotPasswordTemplate