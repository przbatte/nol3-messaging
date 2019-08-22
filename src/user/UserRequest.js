const _ = require('lodash')
const FixMLMessage = require('../common/FixMLMessage')
const {UserRequestType} = require('./UserRequestType')

const userRequestIdSymbol = Symbol('userRequestId')
const userRequestTypeSymbol = Symbol('userRequestType')
const usernameSymbol = Symbol('username')
const passwordSymbol = Symbol('password')
const newPasswordSymbol = Symbol('newPassword')
const xmlSymbol = Symbol('xml')

const ROOT_DESCENDANT_NAME = 'UserReq'

class UserRequest extends FixMLMessage {
  constructor ({
    userRequestId,
    userRequestType = UserRequestType.Login,
    username = 'BOS',
    password = 'BOS',
    newPassword,
  } = {}) {
    super(ROOT_DESCENDANT_NAME)

    this[userRequestIdSymbol] = userRequestId
    this[userRequestTypeSymbol] = userRequestType instanceof UserRequestType ? userRequestType.value : userRequestType
    this[usernameSymbol] = username
    this[passwordSymbol] = password
    this[newPasswordSymbol] = newPassword
  }

  get userRequestId () {
    return this[userRequestIdSymbol]
  }

  get userRequestType () {
    const value = this[userRequestTypeSymbol]

    if (!value) {
      return
    }

    return {
      value,
      name: UserRequestType.name(value),
    }
  }

  get username () {
    return this[usernameSymbol]
  }

  get password () {
    return this[passwordSymbol]
  }

  get newPassword () {
    return this[newPasswordSymbol]
  }

  get xml () {
    return this[xmlSymbol]
  }

  toJSON () {
    return {
      userRequestId: this.userRequestId,
      userRequestType: this.userRequestType,
      username: this.username,
      password: this.password,
      newPassword: this.newPassword,
    }
  }

  build () {
    let childNode = {
      $: _.omitBy({
        UserReqID: this.userRequestId,
        UserReqTyp: this.userRequestType ? this.userRequestType.value : undefined,
        Username: this.username,
        Password: this.password,
        NewPassword: this.newPassword,
      }, _.isUndefined),
    }

    return super.build(childNode)
  }

  static read (xmlObject) {
    const {UserReqID, UserReqTyp, Username, Password, NewPassword} = xmlObject[ROOT_DESCENDANT_NAME][0]['$']

    return new UserRequest({
      userRequestId: UserReqID && parseInt(UserReqID),
      userRequestType: UserReqTyp,
      username: Username,
      password: Password,
      newPassword: NewPassword,
    })
  }
}

module.exports = UserRequest
