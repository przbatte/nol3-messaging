const chai = require('chai')
const expect = chai.expect
const {oneLineTrim} = require('common-tags')

const UserRequest = require('../src/user/UserRequest')
const parseXmlString = require('../src/common/parseXmlString')
const {UserRequestType} = require('../src/user/UserRequestType')

describe('UserRequest', () => {
  it('should produce same XML string', async () => {
    const message = new UserRequest({
      userRequestId: 0,
      userRequestType: UserRequestType.Login.value,
      username: 'BOS',
      password: 'BOS',
    })

    expect(message.build()).to.equal(oneLineTrim`
      <FIXML v="5.0" r="20080317" s="20080314">
        <UserReq UserReqID="0" UserReqTyp="1" Username="BOS" Password="BOS"/>
      </FIXML>`)
  })

  it('should read provided XML', async () => {
    const xmlString = `
      <FIXML v="5.0" r="20080317" s="20080314">
        <UserReq UserReqID="9" UserReqTyp="1" Username="BOS" Password="BOS"/>
      </FIXML>
    `

    const parsedXmlString = await parseXmlString(xmlString)
    const message = await UserRequest.read(parsedXmlString['$$'])

    expect(message).to.be.an.instanceof(UserRequest)
    expect(message.toJSON()).to.eql({
      userRequestId: 9,
      userRequestType: {
        value: '1',
        name: 'Login',
      },
      username: 'BOS',
      password: 'BOS',
      newPassword: undefined,
    })
  })
})
