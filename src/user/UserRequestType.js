const ObjectType = require('../common/ObjectType')

class UserRequestType extends ObjectType {
  constructor (value) {
    super(value)
  }

  static name (value) {
    return super.name(value)
  }
}

class UserRequestTypeLogin extends UserRequestType {
  constructor () {
    super('1')
  }
}

class UserRequestTypeLogout extends UserRequestType {
  constructor () {
    super('2')
  }
}

class UserRequestTypeChangePassword extends UserRequestType {
  constructor () {
    super('3')
  }
}

class UserRequestTypeStatus extends UserRequestType {
  constructor () {
    super('4')
  }
}

UserRequestType.Login = new UserRequestTypeLogin()
UserRequestType.Logout = new UserRequestTypeLogout()
UserRequestType.ChangePassword = new UserRequestTypeChangePassword()
UserRequestType.Status = new UserRequestTypeStatus()

module.exports = {
  UserRequestType,
  UserRequestTypeLogin,
  UserRequestTypeLogout,
  UserRequestTypeChangePassword,
  UserRequestTypeStatus,
}
