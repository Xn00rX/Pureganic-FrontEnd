import React, { useState } from 'react'
import firebase from '../services/firebase'
import axios from 'axios'

const PasswordChange = ({ user }) => {
  console.log(user)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
  const [isOTPVerified, setIsOTPVerified] = useState(false)

  const handleVerifyOTP = () => {
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: function (response) {}
    })

    let number = user.phonenumber
    if (!number.toString().startsWith('+')) {
      number = `+${number}`
    }
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        let code = prompt('Enter the OTP')
        if (code === null) return
        e.confirm(code)
          .then(function (result) {
            setIsOTPVerified(true)
          })
          .catch((error) => {
            console.log(error)
          })
      })
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password must match.')
      return
    } else {
      axios
        .post(`http://localhost:4000/updatepassword/${user.id}`, {
          currentPassword,
          newPassword
        })
        .then((response) => {
          console.log('Password updated successfully')
        })
        .catch((error) => {
          console.error('Password update failed:', error)
        })
      setError('')
      setNewPassword('')
      setCurrentPassword('')
      setConfirmNewPassword('')
    }
  }

  return (
    <div>
      <div id="recaptcha-container"></div>
      {isOTPVerified ? (
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <div style={{ color: 'red' }}>{error}</div>
          <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
      ) : (
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      )}
    </div>
  )
}

export default PasswordChange
