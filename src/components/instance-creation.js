import React from "react"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { connect } from "react-redux"
import {
  setState,
} from "../state/app"

import AWS from "aws-sdk"

const createInstance = ({
  dispatch,
}) => {
  let instanceParams = {
    ImageId: "ami-09a4a9ce71ff3f20b",
    InstanceType: "t2.micro",
    KeyName: "ubuntu1",
    MinCount: 1,
    MaxCount: 1,
  }

  let instancePromise = new AWS.EC2().runInstances(instanceParams).promise()

  instancePromise
    .then((data) => {
      let instanceId = data.Instances[0].InstanceId
      dispatch(setState("instanceId", instanceId))
      waitForPublicDns(dispatch, instanceId)
    }).catch((err) => {
      alert(err.stack)
    })
}

const waitForPublicDns = (dispatch, instanceId) => {
  let ec2 = new AWS.EC2()

  let params = {
    InstanceIds: [instanceId],
    DryRun: false
  }

  let interval = setInterval(() => waitForPublicDnsName(), 1000)

  let seconds = 0

  const waitForPublicDnsName = () => { 
    ec2.describeInstances(params, (err, data) => {
      if (err) {
        alert(err.stack)
      } else {
        let publicDnsName = data.Reservations[0].Instances[0].PublicDnsName
        if (!!publicDnsName) {
          dispatch(setState("publicDnsName", publicDnsName))
          dispatch(setState("step", "3"))
          clearInterval(interval)
        } else {
          dispatch(setState("publicDnsName", seconds++))
        }
      }
    })
  }
}

const copyToClipboard = (text) => {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  alert("Copied to Clipboard")
}

const InstanceCreation = ({
  dispatch,
  pem,
  publicDnsName,
  instanceId,
}) => (
  <div>
    <Form>
      <Form.Group>
        <div
          style={{fontSize: 7, fontStyle: "italic"}}
          onClick={() => copyToClipboard(pem)}
        >{pem}</div>
      </Form.Group>
      <Form.Group>
        <Button block
          onClick={() => createInstance({
            dispatch
          })}
        >Create Instance</Button>
      </Form.Group>
      <Form.Group>
        <div
          style={{fontSize: 10, fontStyle: "italic"}}
          onClick={() => copyToClipboard(instanceId)}
        >{instanceId}</div>
      </Form.Group>
      <Form.Group>
        <div
          style={{fontSize: 10, fontStyle: "italic"}}
          onClick={() => copyToClipboard(publicDnsName)}
        >{publicDnsName}</div>
      </Form.Group>
    </Form>
    <h3>What's happening?</h3>
    <code>
      {"AWS.Resource.signin(abc@gmail.com, *****)"}
      <br/>
      {"AWS.Resource.create(type: \"instance\")"}
    </code>
  </div>
)

export default connect(state => ({
  pem: state.app.pem,
  publicDnsName: state.app.publicDnsName,
  instanceId: state.app.instanceId,
}), null) (InstanceCreation)
